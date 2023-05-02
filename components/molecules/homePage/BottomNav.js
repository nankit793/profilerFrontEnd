import React, { useState, useEffect } from "react";
import BlogsTab from "./BlogsTab";
import BottomJobTab from "./BottomJobTab";
import Bookmarks from "../../Bookmarks";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as getAuthorBlogs from "../../../redux-next/getAuthorBlogs/actions";
import { ifLogged } from "../../ifLogged";
function BottomNav(props) {
  const [selectedPage, setSelectedPage] = useState();
  const [pageData, setPageData] = useState();
  const dispatch = useDispatch();
  const [isLoggedUser, setIsLoggedUser] = useState(false);

  const router = useRouter();

  useEffect(() => {
    dispatch(getAuthorBlogs.getAuthorBlogs(props.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id, router.query.uid]);

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

  useEffect(() => {
    if (ifLogged()) {
      setIsLoggedUser(true);
    } else {
      setIsLoggedUser(false);
    }
  }, []);

  const pages = [
    {
      pageData: <BottomJobTab jobDetails={pageData && pageData} />,
      id: 0,
    },
    {
      pageData: (
        <BlogsTab
          setBlogsCount={props.setBlogsCount}
          userid={props.data.userid}
        />
      ),
      id: 1,
    },
    {
      pageData: <Bookmarks data={props.id} />,
      id: 2,
    },
    // {
    //   pageData: <Bookmarks data={props.id} />,
    //   id: 3,
    // },
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
      <div className="w-full bg-color_8 rounded-t flex justify-start border-b  ">
        {props.buttons.map((button, index) => {
          return (
            ((button.loginRequired &&
              isLoggedUser &&
              props.data.userid === localStorage.getItem("userid")) ||
              !button.loginRequired) && (
              <div
                key={index}
                onClick={() => {
                  select(button.id);
                }}
                className={` ${
                  selectedPage && selectedPage.id === button.id
                    ? "border-b-color_4 border-b-[3px] bg-color_8 text-color_4"
                    : "bg-color_8  text-color_7"
                } 
               py-3 duration-100  px-5 cursor-pointer `}
              >
                {button.name}
              </div>
            )
          );
        })}
      </div>
      <div className="slideUp px-1 md:px-3">
        {selectedPage && selectedPage.pageData && selectedPage.pageData}
      </div>
    </>
  );
}

export default BottomNav;
