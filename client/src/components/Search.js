import React from "react";

import SearchResults from "./SearchResults.js";
import "./Search.css";

const Search = ({ results }) => {
  return (
    <div className="search">
      {results.map((result, id) => {
        return <SearchResults key={id} result={result} />;
      })}
    </div>
  );
};

export default Search;
