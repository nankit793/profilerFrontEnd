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
      const searchString = await fetch(
        `${process.env.BACKEND_URL}/searchUser`,
        {
          headers: { search: val.target.value },
        }
      );
      const userList = await searchString.json();
      setUsersArray(userList);
      // console.log(userList)
    }
  };

  return (
    <>
      <div className="w-[100%] h-full  text-center px-2">
        <div className="mt-2">
          <input
            className="focus:outline-none border py-3 px-1 border-dashed rounded-md w-full"
            onChange={(e) => {
              search(e);
            }}
            // id="standard-search"
            placeholder="Search Username/User Id"
            autoComplete="off"
            type="text"
            // fullWidth={true}
            // variant="outlined"
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
                  className="w-full min-h-[60px] cursor-pointer flex justify-start  align-center  hover:bg-color_3  border rounded  my-2"
                >
                  <div className="w-[40%]">
                    <div className="w-[50px] h-full bg-color_5 rounded-l"></div>
                  </div>
                  <div className="text-left flex text-[15px] flex-col justify-between w-full overflow-x-hidden py-1">
                    <div className=" font-semibold text-text_1">
                      {user.name}
                    </div>
                    <div className="text-text_2 overflow-x-auto scrollbar-hide ">
                      {user.id}
                    </div>
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
