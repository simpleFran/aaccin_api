import { faker } from "@faker-js/faker";

const usedEmails = new Set<string>();

export function generateUniqueEmail(): string {
  let email = faker.internet.email().toLowerCase();
  while (usedEmails.has(email)) {
    email = faker.internet.email().toLowerCase();
  }
  usedEmails.add(email);
  return email;
}
