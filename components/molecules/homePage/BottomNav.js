import React, { useState, useEffect } from "react";
import BlogsTab from "./BlogsTab";
import BottomJobTab from "./BottomJobTab";
function BottomNav(props) {
  const [selectedPage, setSelectedPage] = useState();
  const [pageData, setPageData] = useState();

  useEffect(() => {
    if (localStorage.getItem("bottomPageNav")) {
      select(localStorage.getItem("bottomPageNav"));
    } else {
      select(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.userBasicData && props.userBasicData.jobProfile) {
      setPageData(props.userBasicData.jobProfile);
    }
  }, [props.userBasicData]);

  const pages = [
    {
      pageData: <BottomJobTab jobDetails={pageData && pageData} />,
      id: 0,
    },
    {
      pageData: <BlogsTab />,
      id: 1,
    },
  ];
  const select = (id) => {
    pages.map((page) => {
      if (page.id == id) {
        setSelectedPage(page);
      }
      localStorage.setItem("bottomPageNav", id);
    });
  };
  return (
    <>
      <div className="w-full bg-color_8 drop-shadow-sm rounded flex justify-start">
        {props.buttons.map((button, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                select(button.id);
              }}
              className={` ${
                selectedPage && selectedPage.id === button.id
                  ? "border-b-color_1 border-b-[3px] bg-color_2 text-text_1 font-semibold"
                  : "bg-color_6 border text-color_7"
              } 
              ${button.id === 0 ? "rounded-l" : ""}
               py-3 duration-100  px-5 cursor-pointer `}
            >
              {button.name}
            </div>
          );
        })}
      </div>
      <div className="slideUp">
        {selectedPage && selectedPage.pageData && selectedPage.pageData}
      </div>
    </>
  );
}

export default BottomNav;
