// controller for handling scraped data
import Data from "../models/data.js";

const getOne = async (req, res) => {
    const { domain } = req.params.id;

    try {
        const data = await Data.findOne({ domain });
        if (!data) {
            return res.status(404).json({ success: false, msg: "Data not found" });
        }
        return res.status(200).json({ success: true, data: data });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || "Something went wrong while getting data.",
        });
    }
}

const getData = async (req, res) => {
    try {
        const data = await Data.find();
        return res.status(200).json({ success: true, data: data });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || "Something went wrong while getting data.",
        });
    }
}

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
}

export { getOne, getData, saveData };