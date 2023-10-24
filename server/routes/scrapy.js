import { Router } from "express";
const router = Router();

import { getData, saveData, scrape, getDomains, expiredStream } from "../controllers/scrapy.js";

router.route("/").get(getData);
router.route("/domains").get(getDomains);
router.route("/save").post(saveData);
router.route("/scrape").post(scrape);
router.route("/expiredStream").get(expiredStream);

export default router;