import express from 'express';
const router = express.Router();

import { deleteContact } from '../controllers/Contact/deleteContact';
import { readAllContact } from '../controllers/Contact/readAllContact';


router.route("/delete").delete(deleteContact);
router.route("/read").get(readAllContact);

export default router;
