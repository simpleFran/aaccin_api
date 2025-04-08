"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var faker_1 = require("@faker-js/faker");
var prisma = new client_1.PrismaClient();
var agroProfessions = [
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
var fakeLocals = [
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
var cultivationIds = [
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var i, name_1, email, profession, internal_contact, _a, city, state, cultivations, contact;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < 100)) return [3 /*break*/, 4];
                    name_1 = faker_1.fakerPT_BR.person.fullName();
                    email = faker_1.fakerPT_BR.internet.email({ firstName: name_1.split(" ")[0] });
                    profession = faker_1.fakerPT_BR.helpers.arrayElement(agroProfessions);
                    internal_contact = faker_1.fakerPT_BR.person.fullName();
                    _a = faker_1.fakerPT_BR.helpers.arrayElement(fakeLocals).split("/"), city = _a[0], state = _a[1];
                    cultivations = faker_1.fakerPT_BR.helpers.arrayElements(cultivationIds, {
                        min: 1,
                        max: 3,
                    });
                    return [4 /*yield*/, prisma.contact.create({
                            data: {
                                name: name_1,
                                email: email,
                                profession: profession,
                                internal_contact: internal_contact,
                                city: city,
                                state: state,
                                cultivations: {
                                    create: cultivations.map(function (cultivationId) { return ({
                                        cultivation: {
                                            connect: { id: cultivationId },
                                        },
                                    }); }),
                                },
                            },
                        })];
                case 2:
                    contact = _b.sent();
                    if (i % 100 === 0) {
                        console.log("Inseridos ".concat(i, " contatos..."));
                    }
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Seed finalizado com sucesso!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return prisma.$disconnect(); })
    .catch(function (e) {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
