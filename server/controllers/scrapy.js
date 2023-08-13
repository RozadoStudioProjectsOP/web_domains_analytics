// controller for handling scraped data
import axios from 'axios';
import Data from "../models/data.js";

import { MONGO_URI, DB, PROJECT, SCRAPYD_URL } from "../utils/envSetup.js";

const scrape = async (req, res) => {
    const { url } = req.body;
    try {
    const response = await axios.post(`${SCRAPYD_URL}/schedule.json`,
      new URLSearchParams({
          'project': PROJECT,
          'spider': 'spider',
          'url': url,
          'MONGO_DB': DB,
          'MONGO_URI': MONGO_URI,
          'MONGO_COLLECTION': Data.collection.name,
      }),
    )
    return res.status(200).json({ success: true, data: response.data });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || "Something went wrong while getting data.",
        });
    }
}

const getDomains = async (req, res) => {
  try {
    const data = await Data.find().distinct('domain');
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting data.",
    });
  }
};

const getData = async (req, res) => {
  const { domain } = req.query;
  try {
    const data = domain ? await Data.findOne({ domain }) : await Data.find();
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