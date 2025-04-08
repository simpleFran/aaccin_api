import { Prisma } from "@prisma/client";
import { ContactsRepository } from "repositories/contacts-repository";

interface CreateContactRequest {
  name: string;
  email: string;
  profession: string;
  city: string;
  state: string;
  phone:string;
  internal_contact:string;
  cultivationIds: string[];
}

export class CreateContactUseCase{
  constructor(private contactsRepository:ContactsRepository){}


  async execute({name,email,profession,phone,internal_contact,city,state,cultivationIds}:CreateContactRequest){

    try {
      
      const contact = await this.contactsRepository.create({
        name,email,profession,city,state,internal_contact,phone,cultivationIds
      })

      return contact;

    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
          throw new Error('Já existe um contato com esse email cadastrado.')
        }
      }
      throw new Error('Erro ao criar um contato.')
    }
  }
}