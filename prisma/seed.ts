import { PrismaClient } from "@prisma/client";
import { fakerPT_BR as faker } from "@faker-js/faker";
import {generateUniqueEmail} from '../src/utils/unique-email'
const prisma = new PrismaClient();

const agroProfessions = [
  "Pesquisador",
  "Engenheiro Agrícola",
  "Médico Veterinário",
  "Biólogo",
  "Biotecnólogo",
  "Geneticista",
  "Técnico Agrícola",
  "Zootecnista",
  "Agrônomo",
  "Consultor Rural",
];

const fakeLocals = [
  "Uruguaiana/RS",
  "Belo Horizonte/MG",
  "São Paulo/SP",
  "Chapecó/SC",
  "Curitiba/PR",
  "Goiânia/GO",
  "Cuiabá/MT",
  "Campo Grande/MS",
  "Palmas/TO",
  "Manaus/AM",
  "Recife/PE",
  "Fortaleza/CE",
  "Natal/RN",
];

const cultivationIds = [
  "2caeabc4-0b26-40fa-9886-bd2655781801",
  "afbf4e0d-c407-495d-8722-0e6c1e58a358",
  "3f9d76aa-c544-466c-9c4c-73d311e9cc86",
  "f3f99053-967e-4fd6-a775-c917ddcb67fd",
  "7b5aab41-80d8-4f98-81ce-385d14071c8f",
  "1b284059-5dd0-49c0-af4f-9017abba95d9",
  "4a9a074c-b992-4602-8cf4-ae4175152c13",
  "672e592f-28a9-4ebd-8f3f-f02ad27ec148",
  "afb7aa0f-b170-478d-b566-b8db91428bb4",
  "247cbdbc-4bbc-4d54-8c31-824c3fd2e314",
  "1c4e141c-ae67-4ab5-8a85-2bfc4837faf8",
  "5f77b029-0653-4b17-8bb1-fbe7f4d30fd1",
];

async function main() {
  for (let i = 0; i < 500; i++) {
    const name = faker.person.fullName();
    // const email = faker.internet.email({ firstName: name.split(" ")[0] });
    const email = generateUniqueEmail();
    const profession = faker.helpers.arrayElement(agroProfessions);
    const phone = faker.phone.number();
    const internal_contact = faker.person.fullName();
    const [city, state] = faker.helpers.arrayElement(fakeLocals).split("/");
    const cultivations = faker.helpers.arrayElements(cultivationIds, {
      min: 1,
      max: 3,
    });

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        profession,
        internal_contact,
        phone,
        city,
        state,
        cultivations: {
          create: cultivations.map((cultivationId) => ({
            cultivation: {
              connect: { id: cultivationId },
            },
          })),
        },
      },
    });

    if (i % 100 === 0) {
      console.log(`Inseridos ${i} contatos...`);
    }
  }

  console.log("Seed finalizado com sucesso!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
