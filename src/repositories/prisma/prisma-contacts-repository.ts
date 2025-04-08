import { Contact, Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";
import {
  ContactsRepository,
  PaginatedContacts,
} from "repositories/contacts-repository";
import { sanitizeSearchQuery } from "utils/validate";

interface CreateContactDTO {
  name: string;
  email: string;
  profession: string;
  internal_contact: string;
  city: string;
  state: string;
  phone:string;
  cultivationIds: string[];
}
interface ContactWithCultivations extends Contact {
  cultivations: { cultivation: { name: string } }[];
}

const PER_PAGE = 20;

export class PrismaContactsRepository implements ContactsRepository {
  findById(id: string): Promise<ContactWithCultivations> {
    return prisma.contact.findUnique({
      where: {
        id,
      },
      include: {
        cultivations: {
          include: {
            cultivation: true,
          },
        },
      },
    }) as Promise<ContactWithCultivations>;
  }
  async findByCultivationAll(
    cultivationId: string
  ): Promise<ContactWithCultivations[]> {
    const contacts = await prisma.contact.findMany({
      where: {
        cultivations: {
          some: {
            cultivationId,
          },
        },
      },
      include: {
        cultivations: {
          include: {
            cultivation: true,
          },
        },
      },
    });

    return contacts as ContactWithCultivations[];
  }

  async findByCultivationId(
    cultivationId: string,
    page: number = 1
  ): Promise<PaginatedContacts> {
    const skip = (page - 1) * PER_PAGE;

    const [total, contacts] = await Promise.all([
      prisma.contact.count({
        where: {
          cultivations: {
            some: {
              cultivationId,
            },
          },
        },
      }),
      prisma.contact.findMany({
        where: {
          cultivations: {
            some: {
              cultivationId,
            },
          },
        },
        skip,
        take: PER_PAGE,
        include: {
          cultivations: {
            include: {
              cultivation: true,
            },
          },
        },
      }),
    ]);

    const lastPage = Math.ceil(total / PER_PAGE);

    return {
      contacts: contacts as ContactWithCultivations[],
      meta: {
        total,
        page,
        perPage: PER_PAGE,
        lastPage,
      },
    };
  }

  async countAllContacts(): Promise<number> {
    return prisma.contact.count();
  }
  async countByProfession(profession: string): Promise<number> {
    const safeProfession = sanitizeSearchQuery(profession);
    const totalContacts = await prisma.$queryRawUnsafe<{ count: number }[]>(`
      SELECT COUNT(*)::int AS count FROM contacts  
      WHERE unaccent(profession) ILIKE unaccent('%${safeProfession}%')
      `);

    return totalContacts[0]?.count || 0;
  }

  async findAllContacts(page: number): Promise<ContactWithCultivations[]> {
    const perPage = 20;
    const allContacts = await prisma.contact.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        cultivations: {
          include: {
            cultivation: true,
          },
        },
      },
    });
    // console.log(allContacts);
    return allContacts as ContactWithCultivations[];
  }

  async findByProfessionAll(query: string): Promise<ContactWithCultivations[]> {
    const safeProfession = sanitizeSearchQuery(query);
    const contacts = await prisma.$queryRaw<
      ContactWithCultivations[]
    >(Prisma.sql`
  SELECT c.*, 
    json_agg(
      json_build_object(
        'cultivation', json_build_object('name', cu.name)
      )
    ) AS cultivations
  FROM contacts c
  LEFT JOIN contact_cultivations cc ON cc."contactId" = c.id
  LEFT JOIN cultivations cu ON cu.id = cc."cultivationId"
  WHERE unaccent(c.profession) ILIKE unaccent('%' || ${safeProfession} || '%')
  GROUP BY c.id
`);

    return contacts as ContactWithCultivations[];
  }

  async exportContactsToExcel(
    filter: string,
    query: string
  ): Promise<Contact[] | ContactWithCultivations[]> {
    if (filter === "profession") {
      return await this.findByProfessionAll(query);
    } else if (filter === "cultivation") {
      return  await this.findByCultivationAll(query)
      
    }
    return [];
  }

  async findByProfessionPaginated(
    profession: string,
    page: number
  ): Promise<ContactWithCultivations[]> {
    const offset = (page - 1) * 20;
    const safeProfession = sanitizeSearchQuery(profession);
    const contacts = await prisma.$queryRawUnsafe<any[]>(`
    SELECT
      c.id,
      c.name,
      c.email,
      c.profession,
      c.city,
      c.state,
      c."internal_contact",
      c."createdAt",
      c."updatedAt",
      JSON_AGG(
        JSON_BUILD_OBJECT('cultivation', JSON_BUILD_OBJECT('name', ct.name))
      ) AS cultivations
    FROM contacts c
    INNER JOIN contact_cultivations cc ON c.id = cc."contactId"
    INNER JOIN cultivations ct ON ct.id = cc."cultivationId"
    WHERE unaccent(c.profession) ILIKE unaccent('%${safeProfession}%')
    GROUP BY c.id
    ORDER BY c.name
    LIMIT 20 OFFSET ${offset}
  `);

    return contacts as ContactWithCultivations[];
  }

  async create({
    name,
    email,
    profession,
    internal_contact,
    city,
    state,
    phone,
    cultivationIds,
  }: CreateContactDTO): Promise<Contact | void> {
    //

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        profession,
        city,
        phone,
        internal_contact,
        state,
        cultivations: {
          create: cultivationIds.map((cultivationId) => ({
            cultivation: {
              connect: {
                id: cultivationId,
              },
            },
          })),
        },
      },
      include: {
        cultivations: {
          include: {
            cultivation: true,
          },
        },
      },
    });

    return contact;
  }
}
