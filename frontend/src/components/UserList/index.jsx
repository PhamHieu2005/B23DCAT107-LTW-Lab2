import React, { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";      
import {
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("http://localhost:8081/user/list").then((data) => setUsers(data || []));
  }, []);

  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem
              button
              component={Link}
              to={`/users/${item._id}`}
            >
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;