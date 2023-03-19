// controller for handling scraped data
import Data from "../models/data.js";

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

export { saveData };