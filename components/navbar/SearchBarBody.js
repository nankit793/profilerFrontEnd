import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";

function SearchBarBody() {
  const router = useRouter();

  const [usersArray, setUsersArray] = useState([]);
  const search = async (val) => {
    if (val.target.value === "") {
      setUsersArray([]);
    } else {
      const searchString = await fetch("http://localhost:5000/searchUser", {
        headers: { search: val.target.value },
      });
      const userList = await searchString.json();
      setUsersArray(userList);
      // console.log(userList)
    }
  };

  return (
    <>
      <div className="w-[100%] h-full  text-center px-2">
        <div className="mt-2">
          <TextField
            onChange={(e) => {
              search(e);
            }}
            id="standard-search"
            placeholder="Search Username or User Id"
            label="Search field"
            autoComplete="off"
            type="search"
            fullWidth={true}
            variant="standard"
          />
        </div>
        <div className="">
          {usersArray &&
            usersArray.length >= 1 &&
            usersArray.map((user, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    router.push(`/home/${user.id}`);
                  }}
                  className="w-full  cursor-pointer flex justify-start gap-2 align-center py-2 hover:bg-color_3 px-2 border rounded  my-2"
                >
                  <div className="  w-[40%]">
                    <div className="rounded-full w-[50px] h-[50px] bg-color_2"></div>
                  </div>
                  <div className="text-left flex flex-col justify-between w-full">
                    <div className=" font-semibold text-color_2">
                      {user.name}
                    </div>
                    <div className="text-text_2">{user.id}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SearchBarBody;
