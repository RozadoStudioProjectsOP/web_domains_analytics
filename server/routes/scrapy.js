import { Router } from "express";
const router = Router();

import { saveData } from "../controllers/scrapy.js";

router.route("/save").post(saveData);

export default router;