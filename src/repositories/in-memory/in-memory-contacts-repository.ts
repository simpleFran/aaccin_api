import { Contact } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ContactsRepository } from "repositories/contacts-repository";

interface CreateContactDTO {
  id?: string;
  name: string;
  email: string;
  profession: string;
  internal_contact: string;
  city: string;
  state: string;
  cultivationIds: string[];
}

export class InMemoryContactsRepository implements ContactsRepository {
  public items: Contact[] = [];

  async create(data: CreateContactDTO): Promise<Contact> {
    const contact = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      profession: data.profession,
      internal_contact: data.internal_contact,
      city: data.city,
      state: data.state,
      cultivationIds: data.cultivationIds,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(contact);
    return contact;
  }
  findByCultivationId(
    cultivationId: string
  ): Promise<
    {
      name: string;
      id: string;
      email: string;
      profession: string;
      internal_contact: string | null;
      city: string;
      state: string;
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    throw new Error("Method not implemented.");
  }
  async findByProfessionPaginated(
    query: string,
    page: number
  ): Promise<Contact[] | null> {
    //ajusta paginação (geralmente 20)
    return this.items
      .filter((item) => item.profession.includes(query))
      .slice((page - 1) * 20, page * 20);
  }
}
