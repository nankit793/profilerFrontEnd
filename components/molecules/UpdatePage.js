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
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function UpdatePage(props) {
  const [showSidemenu, setShowSideMenu] = useState(false);
  const [selectedPage, setSelectedPage] = useState();
  const [maxPages, setMaxPages] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    let id = 1;
    props.pages.map((page) => {
      id = page.id;
      if (page.id === 0) {
        setSelectedPage(page);
        setShowSkeleton(false);
      }
    });
    setMaxPages(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = (item) => {
    setShowSkeleton(true);
    props.pages.map((page) => {
      if (page.id === item.id) {
        setSelectedPage(page);
        setShowSkeleton(false);
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
      id = 0;
    }
    if (id < 0) {
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
      let save;
      if (props.bodyData) {
        console.log("normal flow");
        save = await fetch(props.onSave, {
          method: props.request,
          body: JSON.stringify(props.data),
          // mode: "no-cors",
          headers: {
            ...props.headers,
            Accept: "application/json",
            "Content-Type": "application/json",
            accesstoken: accesstoken,
            refreshtoken: refreshtoken,
            userid: userid,
          },
          // body: props.data,
        });
      } else {
        let formData = new FormData();
        if (props.image && props.image.file) {
          formData.append("image", props.image.file);
        }
        formData.append("data", JSON.stringify(props.data));
        if (props.otherImages) {
          for (const i in props.otherImages) {
            if (Object.hasOwnProperty.call(props.otherImages, i)) {
              const element = props.otherImages[i];
              console.log(element.file);
              formData.append(i, element.file);
            }
          }
        }
        console.log(formData);
        save = await fetch(props.onSave, {
          method: props.request,
          body: formData,
          // mode: "no-cors",
          headers: {
            ...props.headers,
            ContentType: "multipart/form-data",
            accesstoken: accesstoken,
            refreshtoken: refreshtoken,
            userid: userid,
          },
          // body: props.data,
        });
      }
      // const finalSave = await save.json();
      // if (save && save.status === 200 && save.statusText === "OK") {
      //   successNotification(finalSave.message, "Success");
      // } else {
      //   errorNotification("chages not saved", "Error");
      // }
    } catch (error) {
      console.log(error.message);
      errorNotification("chages not saved", "Error");
    }
  };
  return (
    <>
      <div className="z-10 fixed flex-wrap bottom-0 right-0 p-4 flex justify-end gap-2 w-fit px-5 ">
        <div className="py-1 flex justify-center items-center drop-shadow-lg bg-color_2  rounded text-[16px] text-color_7 font-bold px-5 cursor-pointer">
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
        {!(selectedPage && selectedPage.displayOption === "false") ? (
          <div
            onClick={onSave}
            className="p-2 border drop-shadow font-semibold text-[16px] rounded text-color_2 px-5 bg-color_7 cursor-pointer hover:bg-color_5 duration-100 "
          >
            Save
          </div>
        ) : (
          ""
        )}
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
          <div className="md:hidden block overflow-x-auto w-full mt-2">
            <div className="flex gap-3">
              {props.buttons.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      selectedPage &&
                      selectedPage.id &&
                      selectedPage.id === item.id
                        ? "bg-color_7 text-[white] px-5"
                        : "text-text_1  border px-3"
                    } p-2  rounded-3xl snap-center  duration-200 ease-in-out  whitespace-nowrap cursor-pointer  rounded`}
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
          <div className="p-3 md:p-5 rounded-md scroll-smooth">
            {selectedPage && selectedPage.pageData ? selectedPage.pageData : ""}
            {/* {showSkeleton && (
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            )} */}
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
