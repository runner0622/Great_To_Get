import express from 'express';
const router = express.Router();

// create notification
import { deleteContact } from '../controllers/Contact/deleteContact';

import { readAllContact } from '../controllers/Contact/readAllContact';

// public route for reading blog --> only published
router.route("/contact/delete").delete(deleteContact);
router.route("/contact/read").get(readAllContact);

export default router;
