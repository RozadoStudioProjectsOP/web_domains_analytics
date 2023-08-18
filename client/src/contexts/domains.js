import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/base_url.js";

const DomainContext = createContext();

// Provides components with login state
const DomainsProvider = (props) => {
    const [urlList, setUrlList] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/scrapy/domains`).then((res) => {
            const urlArray = res.data.data
            // console.log(urlArray)
            setUrlList(urlArray)
        })
    }, [])
    console.log(urlList)
    return (
        <DomainContext.Provider value={{ urlList }}>
            {props.children}
        </DomainContext.Provider>
    )  
}

export { DomainContext, DomainsProvider }