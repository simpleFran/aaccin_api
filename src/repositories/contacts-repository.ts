
import { Contact } from "@prisma/client";

interface CreateContactDTO {
  name: string;
  email: string;
  profession: string;
  city: string;
  state: string;
  phone:string;
  internal_contact: string;
  cultivationIds: string[]; // IDs das Cultivations
}
interface ContactWithCultivations extends Contact {
  cultivations: { cultivation: { name: string } }[];
}
export interface PaginatedContacts{
  contacts: ContactWithCultivations[],
  meta:{
    total:number;
    page:number;
    perPage:number;
    lastPage:number;
  }
}
export interface ContactsRepository {
  create(data: CreateContactDTO): Promise<Contact | void>;
  findByCultivationId(
    cultivationId: string,
    page?: number
  ): Promise<PaginatedContacts>;
  //retorna todos profissionais com paginação
  findByProfessionPaginated(
    query: string,
    page?: number
  ): Promise<ContactWithCultivations[]>;
  //retorna todos profissionais sem paginar
  findByProfessionAll(query: string): Promise<ContactWithCultivations[]>;
  exportContactsToExcel(
    filter: string,
    query: string,
    page: number
  ): Promise<Contact[] | ContactWithCultivations[]>;
  findAllContacts(page: number): Promise<ContactWithCultivations[]>;
  countByProfession(query: string): Promise<number>;
  countAllContacts(): Promise<number>;
  findByCultivationAll(
    cultivationId: string
  ): Promise<ContactWithCultivations[]>;
}
