// controller for handling scraped data
import axios from "axios";
import Data from "../models/data.js";

import { MONGO_URI, DB, PROJECT, SCRAPYD_URL } from "../utils/envSetup.js";

/**
 * Function to scrape a website
 * Sends a POST request to the Scrapyd API to schedule a scraping job
 * @param {*} req
 * @param {*} res
 */
const scrape = async (req, res) => {
  const { url, LIMIT } = req.body;
  console.log(LIMIT)
  try {
    const response = await axios.post(`${SCRAPYD_URL}/schedule.json`,
      // arguments for scheduling a scraping job
      new URLSearchParams({
        project: PROJECT,
        spider: "spider",
        url: url,
        MONGO_DB: DB,
        MONGO_URI: MONGO_URI,
        MONGO_COLLECTION: Data.collection.name,
        setting: `CLOSESPIDER_PAGECOUNT=${LIMIT}`
      })
    );
    return res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting data.",
    });
  }
};

const getDomains = async (req, res) => {
  try {
    const data = await Data.find().distinct("domain");
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting data.",
    });
  }
};

const getData = async (req, res) => {
  const { domain, limit } = req.query;
  try {
    const data = domain ? await Data.findOne({ domain, singlePage: limit == 1 ? true : false }) : await Data.find();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting data.",
    });
  }
};

const saveData = async (req, res) => {
  const { domain, URL, text } = req.body;
  const scrapeDate = Date.now();
  try {
    const data = await Data.create({ domain, URL, text, scrapeDate });
    return res.status(201).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while scraping data.",
    });
  }
};

export { scrape, getDomains, getData, saveData };
