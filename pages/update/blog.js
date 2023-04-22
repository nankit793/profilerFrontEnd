import React, { useEffect, useState } from "react";
import { authenticate } from "../../components/authentication";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import * as getBasicDataActions from "../redux-next/getUserBasic/actions";
import UpdatePage from "../../components/molecules/UpdatePage";
import EditPage from "../../components/molecules/BlogsPage/EditPage";
import BlogPreview from "../../components/molecules/BlogsPage/BlogPreview";
import { useRouter } from "next/router";

import { axiosGet } from "../../components/functions/axiosCall";
function AddBlog() {
  const [blogStructure, setBlogStructure] = useState();
  const [image, setImage] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [changeInImage, setChangeInImage] = useState(false);
  const [otherImages, setOtherImages] = useState({});

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
  const onParaImageChange = (image, para) => {
    console.log(otherImages);
    if (image === null) {
      setOtherImages((prev) => ({
        ...prev,
        [para]: null,
      }));
    } else {
      setOtherImages((prev) => ({
        ...prev,
        [para]: {
          imageURL: URL.createObjectURL(image),
          name: image.name,
          file: image,
        },
      }));
    }
    // else {
    //   const newObj = {
    //     image: image,
    //     name: para,
    //     url: URL.createObjectURL(image),
    //   };
    //   console.log("did not exists");
    //   setOtherImages((prev) => ({
    //     ...prev,
    //     newObj,
    //   }));
    // }
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
        <EditPage
          editPage={true}
          setBlogStructure={setBlogStructure}
          blogStructure={blogStructure}
          setImage={setImage}
          onChange={onChange}
          otherImages={otherImages}
          onParaImageChange={onParaImageChange}
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
          otherImages={otherImages}
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
            otherImages={otherImages}
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
