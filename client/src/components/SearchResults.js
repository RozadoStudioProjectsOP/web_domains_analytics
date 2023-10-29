import React, { useContext } from "react";
import { DomainContext } from "../contexts/domains";

const SearchResults = ({ result }) => {
  const { changeDomain } = useContext(DomainContext);

  return (
    <div className="searchResult" onClick={(e) => changeDomain(result)}>
      {result}
    </div>
  );
};

export default SearchResults;
