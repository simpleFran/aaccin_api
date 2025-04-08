import { ContactsRepository } from "repositories/contacts-repository";




export class FetchContactDetailsUseCase {

    constructor(private contactsRepository: ContactsRepository) {

    }

    async execute(id:string){
        const contact = await this.contactsRepository.findById(id);
        if (!contact) {
            throw new Error("Contato não encontrado.");
        }
        return contact;
    }
}