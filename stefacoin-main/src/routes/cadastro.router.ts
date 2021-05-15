import express, { NextFunction, Request, Response } from 'express';
import AlunoController from '../controllers/aluno.controller';
import Aluno from '../entities/aluno.entity';
import Mensagem from '../utils/mensagem';
import ProfessorController from '../controllers/professor.controller';
import Professor from '../entities/professor.entity';

const router = express.Router();

router.post('/aluno', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mensagem: Mensagem = await new AlunoController().incluir(req.body);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.post('/professor', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mensagem: Mensagem = await new ProfessorController().incluir(req.body);
      res.json(mensagem);
    } catch (e) {
      next(e);
    }
  });

export default router;