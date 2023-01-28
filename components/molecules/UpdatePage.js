import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SwipeableTemporaryDrawer from "./Drawer";
import UpdateProfileSideNav from "../UpdateProfileSideNav";
import { errorNotification, successNotification } from "../atoms/AlertMessage";
import { NotificationContainer } from "react-notifications";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
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

  const onSave = async () => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    try {
      const save = await fetch(props.onSave, {
        method: "PATCH",
        body: JSON.stringify({
          headers: {
            accesstoken: accesstoken,
            refreshtoken: refreshtoken,
            userid: userid,
          },
          jobProfile: props.data,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const finalSave = await save.json();
      if (save && save.status === 200 && save.statusText === "OK") {
        successNotification(finalSave.message, "Success");
      } else {
        errorNotification("chages not saved", "Error");
      }
    } catch (error) {
      errorNotification("chages not saved", "Error");
    }
  };
  return (
    <>
      <div className="z-10 fixed  flex-wrap bottom-0 right-0 p-4 flex justify-end gap-2 w-fit px-5 ">
        <div className="py-1 flex justify-center items-center drop-shadow-sm bg-color_2  border rounded text-[16px] text-color_7 font-bold px-5 cursor-pointer">
          {selectedPage && selectedPage.id !== null && maxPages ? (
            <div>
              {selectedPage.id} / {maxPages}
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => {
            handlePageNav(-1);
          }}
          className="py-2 border drop-shadow-sm font-semibold text-[16px] rounded text-color_2 px-2 bg-color_5 cursor-pointer hover:bg-color_7 duration-100 flex items-center justify-center"
        >
          <NavigateBeforeIcon />
          {/* Previous */}
        </div>
        <div
          onClick={() => {
            handlePageNav(1);
          }}
          className="py-2 border drop-shadow-sm font-semibold text-[16px] rounded text-color_2 px-2 bg-color_5 cursor-pointer hover:bg-color_7 duration-100 flex items-center justify-center"
        >
          {/* Next */}
          <NavigateNextIcon />
        </div>
        <div
          onClick={onSave}
          className="p-2 border drop-shadow font-semibold text-[16px] rounded text-color_2 px-5 bg-color_7 cursor-pointer hover:bg-color_5 duration-100 "
        >
          Save
        </div>
      </div>

      <div className="md:flex justify-start h-full bg-color_2">
        <div className="md:block hidden min-w-[250px] w-[25%] h-[100%] overflow-h-scroll border-r-2 ">
          <UpdateProfileSideNav
            selectedPage={selectedPage}
            data={props}
            onClicker={handleButtonClick}
          />
        </div>
        <div className="w-full  overflow-y-auto md:mb-16 ">
          <div className="md:hidden block overflow-x-auto w-full">
            <div className="flex w-full md:mx-auto mt-3  rounded-3xl">
              {props.buttons.map((item) => {
                return (
                  <div
                    className={`${
                      selectedPage &&
                      selectedPage.id &&
                      selectedPage.id === item.id
                        ? "bg-color_5 text-[white] px-5"
                        : "text-text_1"
                    } p-2 m-2 rounded-3xl duration-200 hover:bg-color_5 hover:text-[white] whitespace-nowrap cursor-pointer font-semibold rounded`}
                    onClick={() => {
                      handleButtonClick(item);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-3 md:p-5 rounded-md ">
            {selectedPage && selectedPage.pageData ? selectedPage.pageData : ""}
          </div>
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
      <NotificationContainer />
    </>
  );
}

export default UpdatePage;
