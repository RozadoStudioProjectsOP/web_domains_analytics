import React from 'react'
import WordCloud from 'react-d3-cloud';
import { useEffect, useState, useCallback } from 'react';

const Wordcloud = (props) => {

    const [data, setData] = useState([{
        Total: 0,
        Frequency: 0,
        text: ''
      }]);

      useEffect (() => {
        // Modify data to have a numeric index. The index of the words array from the DB is the word itself.
        // The chart needs a numeric index to work.
        if(props.data){
  
          //Separate values from index.
          let allData = Object.values(props.data) 
          let keys = Object.keys(props.data)

          //Put the index value as a parameter called 'name' inside of the object.
          if (allData) {
              for (let i = 0; i < allData.length; i++) {
                allData[i].text = keys[i]      
              }
            }
          
          // Sort words from most to less repeated 
          allData.sort((a, b) => {
            if (a.Total > b.Total) {
              return -1;
            }
            if (a.Total < b.Total) {
              return 1;
            }
            return 0;
          }) 
          //Take top 100 words         
          setData(allData.slice(0, 100))
        }     
      },[props]);

      //Change word fontsize depending on word frequency
      const calculateFontSize = useCallback((word) => Math.sqrt(word.Frequency) * 900, []);

      //WordCloud options
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