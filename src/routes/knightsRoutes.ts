import { Router } from "express";
import { createKnightController,  getKnightsByIdController, getKnightsController, updateKnightNickname } from "../controllers/knightsController";

const knightsRouter = Router()
const createKnight = new createKnightController()
const getKnights = new getKnightsController()
const getKnightsById = new getKnightsByIdController()
const updateKnights = new updateKnightNickname()


knightsRouter.post('/knights', createKnight.handle)
knightsRouter.get('/knights', getKnights.handle)

knightsRouter.get('/knights/:id', getKnightsById.handle)
knightsRouter.put('/knights/:id', updateKnights.handle)


export {knightsRouter}