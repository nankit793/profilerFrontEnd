import React from "react";
import TextField from "@mui/material/TextField";

function SearchBarBody() {
  return (
    <>
      <div className="w-full h-full text-center">
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
        />
      </div>
    </>
  );
}

export default SearchBarBody;
