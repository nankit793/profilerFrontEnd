import React, { useState, useEffect } from "react";
import SwipeableTemporaryDrawer from "../Drawer";
import AddIcon from "@mui/icons-material/Add";

function Projects(props) {
  const [jobData, setJobData] = useState();

  useEffect(() => {
    setJobData(props.data);
  }, []);

  return (
    <>
      <div className="border-b">
        <div className="flex justify-between">
          <div className="text-text_2 font-semibold text-lg mb-5">Projects</div>
          <SwipeableTemporaryDrawer
            anchor="right"
            click={
              <div className="py-2 lowercase mb-2 flex items-center px-3 bg-color_5 rounded text-[white] whitespace-nowrap w-min">
                <AddIcon fontSize="small" sx={{ marginRight: "5px" }} />
                add projects
              </div>
            }
            data={<div>hii</div>}
          />
        </div>
        {jobData && jobData["projects"] && jobData["projects"].length === 0 && (
          <div className="flex justify-center text-text_1 font-semibold mt-10 mb-20">
            you have not added any projects
          </div>
        )}
      </div>
      <div className="flex justify-between mt-5">
        <div className="text-text_2 font-semibold text-lg mb-5">
          Certificates
        </div>
        <SwipeableTemporaryDrawer
          anchor="right"
          click={
            <div className="py-2 lowercase mb-2 flex items-center px-3 bg-color_5 rounded text-[white] whitespace-nowrap w-min">
              <AddIcon fontSize="small" sx={{ marginRight: "5px" }} />
              add certificates
            </div>
          }
          data={<div>hii</div>}
        />
      </div>
      {jobData &&
        jobData["certificates"] &&
        jobData["certificates"].length === 0 && (
          <div className="flex justify-center text-text_1 font-semibold mt-10 mb-20">
            you have not added any certificates
          </div>
        )}
    </>
  );
}

export default Projects;
