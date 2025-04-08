import { Router } from "express";

import { create } from "./create";
import { exportToExcel } from "./export-to-excel";
import { fetchAll } from "./fetch-all";
import { fetchPerCultivation } from "./fetch-per-cultivation";
import { fetchPerProfession } from "./fetch-per-profession";

const contactsRoutes: Router = Router();

contactsRoutes.get("/all", fetchAll); // 
contactsRoutes.get("/export/excel", exportToExcel); //
contactsRoutes.get("/", fetchPerProfession); // 
contactsRoutes.get("/perCultivation/:cultivationId?", fetchPerCultivation); //

//post 
contactsRoutes.post("/",create);

export { contactsRoutes };
