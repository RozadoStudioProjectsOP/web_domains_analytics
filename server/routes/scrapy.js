import { Router } from "express";
const router = Router();

import { getOne, getData, saveData } from "../controllers/scrapy.js";

router.route("/").get(getData);
router.route("/:id").get(getOne);
router.route("/save").post(saveData);

export default router;