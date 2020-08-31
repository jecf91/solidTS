import express from 'express';
import { createUserController } from './useCases/CreateUser';

const router = express.Router();

router.post('/', (req, res) => {
  return createUserController.handle(req,res);
})

export default router;