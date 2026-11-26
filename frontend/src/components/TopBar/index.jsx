import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";


function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("Home");
  useEffect(() => {
    const pathname = location.pathname;
    const userId = pathname.split("/")[2];   // "/users/abc" → ["", "users", "abc"] → "abc"

    if (pathname.startsWith("/users/")) {
      fetchModel(`http://localhost:8081/user/${userId}`).then((user) => {
        if (user)  setContextText(`${user.first_name} ${user.last_name}`);
        else setContextText("Home");
      });
    } else if (pathname.startsWith("/photos/")) {
      fetchModel(`http://localhost:8081/user/${userId}`).then((user) => {
        if (user)  setContextText(`Photos of ${user.first_name} ${user.last_name}`);
        else setContextText("Home");
      });
    } else if (pathname === "/users") {
      setContextText("User List");
    } else {
      setContextText("Home");
    }
  }, [location.pathname]);

  return (
    <AppBar position="absolute">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>

        <Typography variant="h6" color="inherit">
          Phạm Trung Hiếu - B23DCAT107
        </Typography>

        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;