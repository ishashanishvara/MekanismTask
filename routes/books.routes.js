import express from 'express';
import { createBooks } from '../controllers/books.controller.js';
import { userAuth } from './../utils/auth.js';

const router = express.Router();

router.post("/newBook",userAuth,createBooks);

export default router;