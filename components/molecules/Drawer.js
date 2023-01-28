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

export default function SwipeableTemporaryDrawer(props) {
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

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
      {/* <div onClick={() => {
        toggleDrawer("right", false)
      }} className="cursor-pointer">

        Close
      </div> */}
      {data}
    </Box>
  );
  return (
    <div>
      <React.Fragment key={anchor}>
        <Button
          className={`${props.classNameDrawer} `}
          onClick={toggleDrawer(anchor, true)}
        >
          {click}
        </Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          menuCloser={!props.menuCloser ? toggleDrawer(anchor, false) : null}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
