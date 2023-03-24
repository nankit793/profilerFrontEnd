import React, { useEffect, useState } from "react";
import { authenticate } from "../../components/authentication";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import * as getBasicDataActions from "../redux-next/getUserBasic/actions";
import UpdatePage from "../../components/molecules/UpdatePage";
import AddBloger from "../../components/molecules/BlogsPage/AddBlog";
import BlogPreview from "../../components/molecules/BlogsPage/BlogPreview";
import { useRouter } from "next/router";

import { axiosGet } from "../../components/functions/axiosCall";
function AddBlog() {
  const [blogStructure, setBlogStructure] = useState();
  const [image, setImage] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [changeInImage, setChangeInImage] = useState(false);
  const onChange = (e) => {
    const { name, value } = e;
    // console.log(e);
    setBlogStructure((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const router = useRouter();

  const onImageChange = (image) => {
    // let reader = new FileReader();
    // reader.onload = (e) => {
    //   console.log(e.target.result);
    //   setImage({ image: e.target.result });
    // };
    setImage({
      url: URL.createObjectURL(image),
      name: image.name,
      file: image,
    });
    setChangeInImage(true);
    // reader.readAsDataURL(image);
  };

  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = async () => {
      await authenticate(loginData, registerData);
      setAuthenticated(true);
    };
    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (blogStructure) {
      console.log(blogStructure, "changed");
    }
  }, [blogStructure]);

  const pages = [
    // { pageData: <Overview />, id: 0 },
    {
      pageData: (
        <AddBloger
          editPage={true}
          setBlogStructure={setBlogStructure}
          blogStructure={blogStructure}
          setImage={setImage}
          onChange={onChange}
          image={image}
          onImageChange={onImageChange}
          authenticated={authenticated}
        />
      ),
      id: 0,
      displayOption: "false",
    },
    {
      pageData: (
        <BlogPreview
          blogStructure={blogStructure}
          image={image}
          edited={true}
          change={changeInImage}
        />
      ),
      id: 1,
    },
  ];

  return (
    <>
      <div className="md:h-screen pt-14 flex flex-col justify-start md:overflow-y-hidden">
        <div className="h-[100%] ">
          <UpdatePage
            mediaFiles="resume"
            data={blogStructure}
            headers={{
              bid: router.query.bid,
              change: changeInImage ? "true" : "",
            }}
            image={image}
            request="PATCH"
            onSave={`http://localhost:5000/editBlog`}
            buttons={[
              { name: "Blog Information", id: 0 },
              { name: "Review & Publish", id: 1 },
            ]}
            pages={pages}
          />
        </div>
      </div>
    </>
  );
}

export default AddBlog;
