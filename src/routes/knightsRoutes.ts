import { Router } from "express";
import { createKnightController,  deleteKnightController,  getHallOfHeroes,  getKnightsByIdController, getKnightsController, updateKnightNickname } from "../controllers/knightsController";

const knightsRouter = Router()
const createKnight = new createKnightController()
const getKnights = new getKnightsController()
const getKnightsById = new getKnightsByIdController()
const updateKnights = new updateKnightNickname()
const deleteKnights = new deleteKnightController()
const getHeroes = new getHallOfHeroes()


knightsRouter.post('/knights', createKnight.handle)
knightsRouter.get('/knights', getKnights.handle)
knightsRouter.get('/knights/:id', getKnightsById.handle)
knightsRouter.put('/knights/:id', updateKnights.handle)
knightsRouter.delete('/knights/:id', deleteKnights.handle)
knightsRouter.get('/knights/heroes', getHeroes.handle)


export {knightsRouter}