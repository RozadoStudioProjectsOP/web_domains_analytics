import { Router } from "express";
const router = Router();

import { getOne, getData, saveData, scrape } from "../controllers/scrapy.js";

router.route("/").get(getData);
router.route("/:id").get(getOne);
router.route("/save").post(saveData);
router.route("/scrape").post(scrape);

export default router;