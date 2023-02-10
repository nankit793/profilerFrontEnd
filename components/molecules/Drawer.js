import * as React from "react";
import Box from "@mui/material/Box";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import ClearIcon from "@mui/icons-material/Clear";

export default function SwipeableTemporaryDrawer(props) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    // console.log(event);
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
    setState({ ...state, [anchor]: open });
  };
  const { anchor, click, data } = props;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "100%",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        onClick={(e) => {
          console.log(e.target);
          if (e.target.id === "operationButton") {
            setOpen(false);
          }
        }}
        className="flex  justify-between h-full flex-col"
      >
        <div
          onClick={() => {
            // toggleDrawer("right", false);
            setOpen(false);
          }}
          className="px-3 text-right mt-3 text-text_2 w-full cursor-pointer"
        >
          <ClearIcon fontSize="large" />
        </div>
        {data}
      </div>
    </Box>
  );
  return (
    <ClickAwayListener
      onClickAway={(e) => {
        if (open) {
          console.log("field");
          setOpen(true);
          toggleDrawer(anchor, true);
        }
      }}
    >
      <div>
        <React.Fragment key={anchor}>
          <div
            className={`${props.classNameDrawer} cursor-pointer`}
            onClick={toggleDrawer(anchor, true)}
          >
            {click}
          </div>
          <Drawer
            variant="persistent"
            anchor={anchor}
            open={open}
            onBackdropClick={toggleDrawer(anchor, false)}
            menuCloser={!props.menuCloser ? toggleDrawer(anchor, false) : null}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      </div>
    </ClickAwayListener>
  );
}
