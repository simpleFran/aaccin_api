import { PrismaContactsRepository } from "repositories/prisma/prisma-contacts-repository";
import { FetchContactDetailsUseCase } from "use-cases/fetch-contact-details";



export function makeFetchContactDetailsUseCase(){
    const contactsRepository = new PrismaContactsRepository();
    const useCase = new FetchContactDetailsUseCase(contactsRepository);
    return useCase;
}