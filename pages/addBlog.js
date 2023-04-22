import React, { useEffect, useState } from "react";
import { authenticate } from "../components/authentication";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as getBasicDataActions from "../redux-next/getUserBasic/actions";
import UpdatePage from "../components/molecules/UpdatePage";
import AddBloger from "../components/molecules/BlogsPage/AddBlog";
import BlogPreview from "../components/molecules/BlogsPage/BlogPreview";
function AddBlog() {
  const [blogStructure, setBlogStructure] = useState({
    heading: "",
    paragraphs: [{ paragraph: "", subHead: "" }],
    redirectURL: "",
    tag: "general",
    selectedRedirection: "website",
  });
  const [image, setImage] = useState(null);
  const [otherImages, setOtherImages] = useState({});
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [p3, setP3] = useState(null);
  const onChange = (e) => {
    const { name, value } = e;
    if (name && value) {
      setBlogStructure((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const onImageChange = (image) => {
    setImage({
      url: URL.createObjectURL(image),
      name: image.name,
      file: image,
    });
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
  };

  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = async () => {
      await authenticate(loginData, registerData);
      dispatch(
        getBasicDataActions.getBasicData({
          userid: localStorage.getItem("userid"),
          requirement: "jobProfile",
        })
      );
    };
    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pages = [
    // { pageData: <Overview />, id: 0 },
    {
      pageData: (
        <AddBloger
          blogStructure={blogStructure}
          onChange={onChange}
          image={image}
          onImageChange={onImageChange}
          otherImages={otherImages}
          onParaImageChange={onParaImageChange}
        />
      ),
      id: 0,
      displayOption: "false",
    },
    {
      pageData: (
        <BlogPreview
          otherImages={otherImages}
          change={true}
          blogStructure={blogStructure}
          image={image}
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
            image={image}
            otherImages={otherImages}
            request="POST"
            onSave="http://localhost:5000/blogPost"
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
