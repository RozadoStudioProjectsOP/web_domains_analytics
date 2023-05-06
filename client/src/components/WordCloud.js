import React from 'react'
import WordCloud from 'react-d3-cloud';
import { useEffect, useState, useCallback } from 'react';

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
            setData(allData.slice(0, 100))
        }     
      },[props]);

      const calculateFontSize = useCallback((word) => Math.sqrt(word.Frequency) * 900, []);

      const options = useCallback(() => ({
        font: 'Verdana',
        fontStyle: 'italic',
        fontWeight: 'bold',
        padding: 2,
        width: 1400,
        rotate: 0,
      }), []);

  return (
    <WordCloud
        data={data}
        options={options}
        fontSize={calculateFontSize}
        padding={2}
        width={1400}
        rotate={0} 
    />
);
}

export default Wordcloud