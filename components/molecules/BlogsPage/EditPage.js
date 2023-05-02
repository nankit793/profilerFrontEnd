import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Avatar from "@mui/material/Avatar";
import InputField from "../../atoms/input/InputField";
import { useRouter } from "next/router";

function EditBlog(props) {
  const [selectedRedirection, setSelectedRedirection] = useState({
    web: true,
    youtube: false,
  });

  const onChange = (e) => {
    // console.log(e.target.name, e.target.value);
    const el = {
      name: e.target.name,
      value: e.target.value,
    };
    props.onChange(el);
  };
  const [paragraphs, setParagraphs] = useState([
    {
      paragraph: "",
      subHead: "",
      name: "p1",
    },
  ]);
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState(null);
  const [redirectURL, setRedirectURL] = useState("");
  const router = useRouter();

  useEffect(() => {
    const el = {
      target: {
        name: "paragraphs",
        value: paragraphs,
      },
    };
    onChange(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paragraphs]);

  const [selectedTag, setSelectedTag] = useState("general");
  const tags = [
    "general",
    "food",
    "travel",
    "healthFitness",
    "lifestyle",
    "fashionBeauty",
    "photography",
    "personal",
    "diyCraft",
    "parenting",
    "music",
    "business",
    "artDesign",
    "bookWriting",
    "personalFinance",
    "Sports",
    "News",
    "Movies",
    "Religion",
    "Political",
    "sports",
    "entertainment",
    "news",
    "technology",
    "sharemarket",
  ];

  const changeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    props.onImageChange(file);
  };

  useEffect(() => {
    if (props.editPage && router.query.bid && !props.blogStructure) {
      const fetcher = async () => {
        const data = await fetch(
          `${process.env.BACKEND_URL}/blogPost/noview/${router.query.bid}`
        );
        const saveData = await data.json();
        if (
          data.status == 200 &&
          saveData &&
          saveData.blog &&
          saveData.blog.author &&
          saveData.blog.author.userid === localStorage.getItem("userid")
        ) {
          console.log("yes you can");
          props.setBlogStructure(saveData.blog);
          setHeading(saveData.blog.heading);
          setParagraphs(saveData.blog.paragraphs);
          setImage(saveData.blog.imageURL && saveData.blog.imageURL);
          props.setImage({
            name: "blog_image",
            url: saveData.blog.imageURL && saveData.blog.imageURL,
          });
          setRedirectURL(
            saveData.blog.redirectURL && saveData.blog.redirectURL
          );
          if (
            saveData.blog.selectedRedirection &&
            saveData.blog.selectedRedirection === "youtube"
          ) {
            setSelectedRedirection({
              web: false,
              youtube: true,
            });
          } else if (
            saveData.blog.selectedRedirection &&
            saveData.blog.selectedRedirection === "website"
          ) {
            setSelectedRedirection({
              web: true,
              youtube: false,
            });
          }
          setSelectedTag(saveData.blog.tag && saveData.blog.tag);
          setImage({
            url: saveData.blog.imageURL,
            name: "blog_image",
          });
        } else {
          router.push(`/home/${localStorage.getItem("userid")}`);
        }
      };
      fetcher();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.bid]);

  useEffect(() => {
    if (props.blogStructure) {
      setHeading(props.blogStructure.heading);
      setParagraphs(props.blogStructure.paragraphs);
      setImage(props.image && props.image);
      setRedirectURL(
        props.blogStructure.redirectURL && props.blogStructure.redirectURL
      );
      if (
        props.blogStructure.selectedRedirection &&
        props.blogStructure.selectedRedirection === "youtube"
      ) {
        setSelectedRedirection({
          web: false,
          youtube: true,
        });
      } else if (
        props.blogStructure.selectedRedirection &&
        props.blogStructure.selectedRedirection === "website"
      ) {
        setSelectedRedirection({
          web: true,
          youtube: false,
        });
      }
      setSelectedTag(props.blogStructure.tag && props.blogStructure.tag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full md:flex justify-start gap-5">
        <div className="md:w-[45%] w-full">
          <div className=" text-text_1  mb-1">
            Heading <span className="text-[red]">*</span>{" "}
          </div>
          <input
            className="border w-full text-[20px] rounded py-2 px-2 focus:outline-color_1 focus:outline"
            maxlength={150}
            onChange={(e) => {
              setHeading(e.target.value);
              onChange(e);
            }}
            name="heading"
            value={heading}
            type="text"
            //   onChange={onChange}
          />
          <div className="mt-2">
            <div className="text-text_1 whitespace-nowrap">Upload Image</div>
            {image ? (
              <div className="w-full">
                <div className="text-center my-3 text-text_2">
                  {image && image.name}
                </div>
                <div className="flex justify-center gap-3 flex-wrap items-center">
                  <div
                    onClick={() => {
                      setImage(null);
                      props.setImage(null);
                    }}
                    className="px-3  cursor-pointer py-2 rounded bg-color_2 border text-text_7"
                  >
                    Remove
                  </div>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={changeImage}
                    className="px-3 py-2 lowercase hover:bg-color_5 cursor-pointer rounded bg-color_7  text-[white]"
                  >
                    Upload image
                    <input hidden type="file" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className=" w-full  drop-shadow-md mt-2 p-5 py-10 border-color_7 rounded-xl bg-color_8 ">
                <div className="w-full h-full flex flex-col justify-start items-center">
                  <div className="text-text_1">
                    <FileCopyIcon />
                  </div>
                  <div className="text-text_1 font-semibold mt-2">
                    Drag & Drop
                  </div>
                  <div className="text-text_1  font-semibold text-md">or</div>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={changeImage}
                    className="px-5 lowercase hover:bg-color_5 drop-shadow py-2 cursor-pointer rounded bg-color_7  mt-2 text-[white]"
                  >
                    Upload image
                    <input hidden type="file" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3">
            <div className=" text-text_1  mb-1">Redirect User</div>
            <div className="flex gap-2 justify-start align-center">
              <Avatar
                onClick={() => {
                  setSelectedRedirection({
                    web: true,
                    youtube: false,
                  });
                  const el = {
                    target: {
                      name: "selectedRedirection",
                      value: "website",
                    },
                  };
                  onChange(el);
                }}
                className={`p-1 rounded-full cursor-pointer ${
                  selectedRedirection.web ? "bg-color_9" : ""
                }`}
                alt="Facebook"
                src="./images/web.png"
                sx={{ width: 50, height: 50 }}
              />
              <Avatar
                onClick={() => {
                  setSelectedRedirection({
                    web: false,
                    youtube: true,
                  });
                  const el = {
                    target: {
                      name: "selectedRedirection",
                      value: "youtube",
                    },
                  };
                  onChange(el);
                }}
                className={`p-1 rounded-full cursor-pointer duration-200 ${
                  selectedRedirection.youtube ? "bg-color_9" : ""
                }`}
                alt="Facebook"
                src="./images/youtube.png"
                sx={{ width: 50, height: 50 }}
              />
            </div>
            <div className=" text-text_2  mb-1 mt-4">paste link here</div>
            <input
              className="border w-full text-[20px] rounded py-2 px-2 focus:outline-color_1 focus:outline"
              maxlength={150}
              // onChange={(e) => {
              //   setInstitution(e.target.value);
              // }}
              value={redirectURL}
              type="text"
              name="redirectURL"
              onChange={(e) => {
                setRedirectURL(e.target.value);
                onChange(e);
              }}
            />
          </div>
          <div className="mt-2">
            <div>Tags</div>
            <div className="w-full bg-color_8 p-4 mt-2 flex gap-4 justify-start flex-wrap">
              {tags.map((tag) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        setSelectedTag(tag);
                        const el = {
                          target: {
                            name: "tag",
                            value: tag,
                          },
                        };
                        onChange(el);
                      }}
                      className={`${
                        selectedTag === tag
                          ? "bg-color_9 text-text_1"
                          : "bg-color_2 text-text_2"
                      }  py-1 px-3 rounded-full border duration-200 cursor-pointer drop-shadow-sm`}
                    >
                      {tag}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[55%]">
          <div className="md:mt-0 mt-3">
            {/* <div className="text-text_1 mb-1">Paragraph</div> */}
            {paragraphs &&
              paragraphs.map((para, index) => {
                return (
                  <div key={index}>
                    <div className="my-2">
                      <div className="text-text_1">
                        Sub Heading{" "}
                        <span className="text-sm text-text_2 italic">
                          (sub heading will be ignored if not added)
                        </span>{" "}
                      </div>
                      <InputField
                        className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
                        length={60}
                        multiline={true}
                        value={para.subHead}
                        type="text"
                        onChange={(e) => {
                          // console.log("first", index, paragraphs, e.target.value);
                          const newArr = [...paragraphs];
                          newArr[index].subHead = e.target.value;
                          setParagraphs(newArr);
                        }}
                        name="description"
                        //   onChange={onChange}
                      />
                    </div>
                    <div className="">
                      <div className="text-text_1">Paragraph</div>
                      <InputField
                        className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
                        length={1000}
                        multiline={true}
                        value={para.paragraph}
                        type="text"
                        onChange={(e) => {
                          // console.log("first", index, paragraphs, e.target.value);
                          const newArr = [...paragraphs];
                          newArr[index].paragraph = e.target.value;
                          setParagraphs(newArr);
                        }}
                        name="description"
                        //   onChange={onChange}
                      />
                    </div>
                    {/* <div className="mt-2">
                      {(props.otherImages &&
                        props.otherImages[`p${index + 1}`]) ||
                      para.imageURL ? (
                        <div className="w-full">
                          <div className="text-center my-3 text-text_2">
                            {(para.imageURL ||
                              props.otherImages[`p${index + 1}`]) &&
                              `para ${index + 1} image`}
                          </div>
                          <div className="flex justify-center gap-3 flex-wrap items-center">
                            <div
                              onClick={() => {
                                props.onParaImageChange(null, `p${index + 1}`);
                                const newArr = [...paragraphs];
                                newArr[index].imageURL = null;
                                setParagraphs(newArr);
                              }}
                              className="px-3  cursor-pointer py-2 rounded bg-color_2 border text-text_7"
                            >
                              Remove
                            </div>
                            <Button
                              variant="contained"
                              component="label"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  console.log("reached");
                                  const newArr = [...paragraphs];
                                  newArr[index].imageURL = null;
                                  setParagraphs(newArr);
                                  props.onParaImageChange(
                                    e.target.files[0],
                                    `p${index + 1}`
                                  );
                                }
                              }}
                              className="px-3 py-2 lowercase hover:bg-color_5 cursor-pointer rounded bg-color_7  text-[white]"
                            >
                              change image
                              <input hidden type="file" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full mr-auto mb-2">
                          <Button
                            variant="contained"
                            component="label"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                const newArr = [...paragraphs];
                                newArr[index].imageURL = null;
                                setParagraphs(newArr);
                                console.log("reached");
                                props.onParaImageChange(
                                  e.target.files[0],
                                  `p${index + 1}`
                                );
                              }
                            }}
                            className="px-5 lowercase hover:bg-color_5 drop-shadow py-2 cursor-pointer rounded bg-color_7  mt-2 text-[white]"
                          >
                            Upload sub-image
                            <input hidden type="file" />
                          </Button>
                        </div>
                      )}
                    </div> */}
                  </div>
                );
              })}
            {paragraphs && paragraphs.length < 4 && (
              <div
                onClick={() => {
                  console.log(paragraphs);
                  setParagraphs([
                    ...paragraphs,
                    {
                      paragraph: "",
                      subHead: "",
                    },
                  ]);
                }}
                className="mt-1 px-5 cursor-pointer text-text_1 py-2 rounded bg-color_2 border border-color_9 w-min mb-1 whitespace-nowrap "
              >
                Add Paragraph
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBlog;
