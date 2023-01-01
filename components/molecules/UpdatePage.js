import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SwipeableTemporaryDrawer from "./Drawer";
import UpdateProfileSideNav from "../UpdateProfileSideNav";
function UpdatePage(props) {
  const [showSidemenu, setShowSideMenu] = useState(false);
  const [selectedPage, setSelectedPage] = useState();
  const [maxPages, setMaxPages] = useState(0);
  useEffect(() => {
    let id = 1;
    props.pages.map((page) => {
      id = page.id;
      if (page.id === 0) {
        setSelectedPage(page);
      }
    });
    setMaxPages(id);
  }, []);

  const handleButtonClick = (item) => {
    props.pages.map((page) => {
      if (page.id === item.id) {
        setSelectedPage(page);
      }
    });
  };
  const handleSideNav = () => {
    if (showSidemenu) {
      setShowSideMenu(false);
    } else {
      setShowSideMenu(true);
    }
  };
  const handlePageNav = (num) => {
    const id = selectedPage.id + num;
    if (id > maxPages) {
      id = 1;
    }
    if (id < 1) {
      id = maxPages;
    }
    props.pages.map((page) => {
      if (page.id == id) {
        setSelectedPage(page);
      }
    });
  };
  return (
    <>
      <div className=" w-full">
        <div className="z-10 fixed  bottom-0 right-0 p-4 flex justify-end gap-2 w-fit px-5 ">
          <div
            onClick={() => {
              handlePageNav(-1);
            }}
            className="p-2 bg-color_3 border drop-shadow.sm rounded text-[16px] text-color_7 font-bold px-5 cursor-pointer  "
          >
            Previous
          </div>
          <div
            onClick={() => {
              handlePageNav(1);
            }}
            className="py-2 border drop-shadow-sm font-bold text-[16px] rounded text-color_2 px-5 bg-color_7 cursor-pointer hover:bg-color_5 duration-100    "
          >
            Next
          </div>
          <div
            onClick={() => {
              // handlePageNav(-1)
            }}
            className="p-2 border drop-shadow font-bold text-[16px] rounded text-color_2 px-5 bg-color_7 cursor-pointer hover:bg-color_5 duration-100 "
          >
            Save
          </div>
        </div>
      </div>

      <div className="md:flex justify-start h-full">
        <div className="md:block hidden min-w-[250px] w-[25%] h-[100%] overflow-h-scroll">
          <UpdateProfileSideNav
            selectedPage={selectedPage}
            data={props}
            onClicker={handleButtonClick}
          />
        </div>
        <div className="w-full  overflow-y-auto mb-2 md:mb-20 pt-3">
          <div className="mx-3 p-5 bg-color_2 rounded-md bg-color_2 drop-shadow">
            <div className="py-1 absolute top-0 drop-shadow-sm bg-color_2 right-3 border rounded-3xl text-[16px] text-color_7 font-bold px-5 cursor-pointer">
              {selectedPage && selectedPage.id !== null && maxPages ? (
                <div>
                  {selectedPage.id} / {maxPages}
                </div>
              ) : (
                ""
              )}
            </div>
            {selectedPage && selectedPage.pageData ? selectedPage.pageData : ""}
          </div>
          <div></div>
        </div>
      </div>
      {/* <div
        className="fixed bottom-20 md:hidden block "
        onClick={handleSideNav}
      >
        <SwipeableTemporaryDrawer
          anchor="left"
          click={
            <>
              {!showSidemenu && (
                <div className=" ${} bg-color_5 p-3 text-color_2 rounded-full duration-200">
                  <MenuIcon />
                </div>
              )}
            </>
          }
          data={
            <UpdateProfileSideNav data={props} onClicker={handleButtonClick} />
          }
        />
      </div> */}
    </>
  );
}

export default UpdatePage;
