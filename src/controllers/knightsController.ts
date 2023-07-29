import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class createKnightController {
    async handle (req: Request, res: Response) {
        try {
            const {name, nickname, birthday, keyAttribute, attributes, weapons} = req.body
        const knight = await prismaClient.knight.create({
            data: {
                name,
                nickname,
                birthday,
                keyAttribute,
                attributes: {
                    create: attributes,
                },
                weapons: {
                    create: weapons,
                }
            }
        });
        res.status(201).json(knight);
        } catch (e: any) {
            console.log(e);
            res.status(500).json({
                e: 'Erro interno no servidor'
            })
        }
    }
}

export class getKnightsController {
    async handle (req: Request, res: Response) {
        try {
            const knights = await prismaClient.knight.findMany({
                include: {
                    attributes: true,
                    weapons: true
                },
            });
            res.status(200).json(knights);
        } catch (e: any) {
            console.log(e, 'Erro ao buscar os cavaleiros');
            res.status(500).json({
                e: 'Erro interno no servidor'
            })
        }
    } 
}

export class getKnightsByIdController {
    async handle (req: Request, res: Response) {
        const {id} = req.params;
        try {
            const knight = await prismaClient.knight.findUnique({
                where: {
                    id,
                },
                include: {
                    attributes: true,
                    weapons: true
                }
            });
    
            if (!knight) {
                return res.status(404).json({ error: 'Cavaleiro não encontrado' });
            }
            res.status(200).json(knight);
        } catch (e: any) {
            console.log(e, 'Erro ao encontrar o cavaleiro');
            res.status(500).json({
                e: 'Erro interno no servidor'
            })
        }
    } 
}

export class updateKnightNickname {
    async handle (req: Request, res: Response) {
        try {
            const {id} = req.params
            const {nickname} = req.body
            const updatedknight = await prismaClient.knight.update({
                where: {id: id},
                data: {nickname}
            });
            res.json(updatedknight)
        } catch (e: any) {
            console.log(e, 'erro ao atualizar o cavaleiro')
            res.status(500).json({
                e: 'Erro interno no servidor'
            })
        }
    }
}

export class deleteKnightController {
    async handle (req: Request, res: Response) {
        const { id } = req.params;

  try {
    const knight = await prismaClient.knight.findUnique({
      where: {
        id,
      },
      include: {
        attributes: true,
        weapons: true,
      },
    });

    if (!knight) {
      return res.status(404).json({ error: 'Knight not found' });
    }

    await prismaClient.knight.delete({
      where: {
        id,
      },
      include: {
        attributes: true,
        weapons: true,
      },
    });

    const hero = await prismaClient.hero.create({
      data: {
        knightId: knight.id,
        knightName: knight.name,
        groupName: 'Hall of Heroes',
      },
    });

    res.status(200).json({ message: 'Cavaleiro deletado e adicionado ao Hall of Heroes', hero });
  } catch (error) {
    console.error('Erro ao deletar o cavaleiro e adiciona-lo ao Hall of Heroes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
    }
}

export class getHallOfHeroes {
    async handle (req: Request, res: Response) {
        try {
            const knightsInHallOfHeroes = await prismaClient.hero.findMany({
                where: {
                    groupName: 'Hall of Heroes',
                },
            });
            res.status(200).json(knightsInHallOfHeroes);
        } catch (e: any) {
            console.log(e, 'Erro os buscar o Hall of Heroes')
            res.status(500).json({
                e: 'Erro interno no servidor'
            })
        }
    }
}