import React, { useState } from "react";

import { Button } from "@mui/material";

export default function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    props.setinventory(
      props.inventory.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  };
  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          setSearchTerm(event.target.value);
          handleSearch();
        }}
      />
      <Button type="button" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
