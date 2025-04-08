import { Request, Response } from 'express';
import { makeFetchAllCultivationsUseCase } from 'use-cases/factories/make-fetch-all-cultivation-use-case';



export async function allCultivations(request:Request,response:Response){


    const fetchCultivationsAll = makeFetchAllCultivationsUseCase();
    const cultivations = await fetchCultivationsAll.execute()

    return response.status(200).json(cultivations)
}