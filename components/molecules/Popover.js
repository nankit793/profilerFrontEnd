import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function PopOver(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClick = (e) => {
    if (e.target.id === "operationButton") {
      handleClose();
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <div
        className={` w-min text-right  hover:bg-color_6 duration-200 cursor-pointer  rounded-full `}
        aria-describedby={id}
        onClick={handleClick}
      >
        {props.text}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography id="data" onClick={onClick} sx={{ p: 2 }}>
          {props.data}
        </Typography>
      </Popover>
    </div>
  );
}

export default PopOver;
