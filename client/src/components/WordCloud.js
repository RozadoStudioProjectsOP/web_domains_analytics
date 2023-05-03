import React from 'react'
import WordCloud from 'react-d3-cloud';
import { useEffect, useState } from 'react';

const Wordcloud = (props) => {

    const [data, setData] = useState([{
        Total: 0,
        Frequency: 0,
        text: ''
      }]);
      //console.log(data)
      useEffect (() => {
        // Modify data to have a numeric index
        if(props.data){
  
          let allData = Object.values(props.data)
  
          let keys = Object.keys(props.data)
          if (allData) {
              //let totalWords = allData.length
              for (let i = 0; i < allData.length; i++) {
                // console.log(totalWords)
                allData[i].text = keys[i] 
                // allData[i].Total = totalWords / allData.length
                // totalWords--       
              }
            }
          
          allData.sort((a, b) => {
            if (a.Total > b.Total) {
              return -1;
            }
            if (a.Total < b.Total) {
              return 1;
            }
            return 0;
          })          
            setData(allData.slice(0, 30))
        }     
      },[props]);
console.log(data)
  return (
    <WordCloud
        data={data}
        font="Times"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => Math.sqrt(word.Frequency) * 700}
        spiral="rectangular"
        padding={10}
        onWordClick={(event, d) => {
        //   console.log(`onWordClick: ${d.text}`);
        }}
        onWordMouseOver={(event, d) => {
            // console.log(`onWordMouseOver: ${d.text}`);
        }}
        onWordMouseOut={(event, d) => {
            // console.log(`onWordMouseOut: ${d.text}`);
        }}    
    />
);
}

export default Wordcloud