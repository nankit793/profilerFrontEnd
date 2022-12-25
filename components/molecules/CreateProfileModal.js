import React from "react";

function CreateProfileModal() {
  return (
    <>
      <div className="text-color_2 font-bold text-lg">
        Select a portfolio type
      </div>
      <div
        onClick={() => {
          // router.push(`/home/${user.id}`)
        }}
        className="w-full  cursor-pointer flex justify-start gap-2 align-center py-2 hover:bg-color_3 px-2 border rounded  my-2"
      >
        <div className="text-left flex justify-between w-full">
          <div className=" font-semibold text-color_2">Job Profile</div>
          <div className="text-text_2">+</div>
        </div>
      </div>
      <div
        onClick={() => {
          // router.push(`/home/${user.id}`)
        }}
        className="w-full  cursor-pointer flex justify-start gap-2 align-center py-2 hover:bg-color_3 px-2 border rounded  my-2"
      >
        <div className="text-left flex justify-between w-full">
          <div className=" font-semibold text-color_2">Research Paper</div>
          <div className="text-text_2">+</div>
        </div>
      </div>
      <div
        onClick={() => {
          // router.push(`/home/${user.id}`)
        }}
        className="w-full  cursor-pointer flex justify-start gap-2 align-center py-2 hover:bg-color_3 px-2 border rounded  my-2"
      >
        <div className="text-left flex justify-between w-full">
          <div className=" font-semibold text-color_2">Product Report</div>
          <div className="text-text_2">+</div>
        </div>
      </div>
      <div className="flex justify-end gap-5 mt-5">
        <div className="border p-2 w-[100px] cursor-pointer text-center font-semibold text-color_2 font-bold rounded ">
          Close
        </div>
        <div className="bg-color_2 p-2 w-[100px] cursor-pointer text-center font-semibold text-[white] rounded ">
          Create
        </div>
      </div>
    </>
  );
}

export default CreateProfileModal;
