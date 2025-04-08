import {Router} from 'express'
import { create } from './create';
import { allCultivations } from './fetch-all';

const cultivationsRoutes = Router();

cultivationsRoutes.post("/",create)
cultivationsRoutes.get("/",allCultivations)

export default cultivationsRoutes