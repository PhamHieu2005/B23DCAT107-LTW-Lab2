import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";      

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`http://localhost:8081/user/${userId}`).then((data) => setUser(data));
  }, [userId]);

  if (!user) {
    return <Typography>Không tìm thấy người dùng.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography>Nghề nghiệp: {user.occupation}</Typography>
      <Typography>Địa điểm: {user.location}</Typography>
      <Typography>Mô tả: {user.description}</Typography>

      <Button
        variant="contained"
        component={Link}
        to={`/photos/${user._id}`}
        style={{ marginTop: "16px" }}
      >
        Xem ảnh của {user.first_name}
      </Button>
    </div>
  );
}

export default UserDetail;