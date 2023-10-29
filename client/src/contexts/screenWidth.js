import React, { createContext, useEffect, useState } from "react";

const WidthContext = createContext();

// Provides components with login state
const WidthProvider = (props) => {
    const [screenWidth, setScreenWidth] = useState();

    useEffect(() => {
        // Function to handle screen size changes
        function handleResize() {
          setScreenWidth(window.innerWidth)
        }
        // Attach the handleResize function to the window's resize event
        window.addEventListener('resize', handleResize);
        // Call handleResize initially to apply styles based on the initial screen size
        handleResize();
      }, [])

    return (
        <WidthContext.Provider value={{ screenWidth }}>
            {props.children}
        </WidthContext.Provider>
    )  
}

export { WidthContext, WidthProvider }