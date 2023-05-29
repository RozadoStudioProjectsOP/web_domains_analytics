import { Router } from "express";
const router = Router();

import { getData, saveData, scrape, getDomains } from "../controllers/scrapy.js";

router.route("/").get(getData);
router.route("/domains").get(getDomains);
router.route("/save").post(saveData);
router.route("/scrape").post(scrape);

export default router;