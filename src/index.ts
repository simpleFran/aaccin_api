import express, { Application } from "express";
import { createServer } from "http";
import cultivationsRoutes from "./http/controllers/cultivations/routes";
import { env } from "./env";
import { contactsRoutes } from "./http/controllers/contacts/routes";
import { loggerMiddleware } from "http/middlewares/logger";
import cors from 'cors';

const app: Application = express();

const server = createServer(app);
app.use(cors()); 
app.use(express.json());

app.use(loggerMiddleware)

//rota de cultivos (cultivations)
app.use("/cultivations",cultivationsRoutes);

//rota de contatos (contacts)
app.use("/contacts",contactsRoutes);

app.listen(env.PORT ?? 8081, () => {
  console.log("Server is running now!");
});
