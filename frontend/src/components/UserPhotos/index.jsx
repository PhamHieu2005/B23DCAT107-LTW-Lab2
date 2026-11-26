import React, { useState, useEffect } from "react";
import { Typography, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";     

import ousterImage from "../../images/ouster.jpg";
import malcolm1Image from "../../images/malcolm1.jpg";
import malcolm2Image from "../../images/malcolm2.jpg";
import ripley1Image from "../../images/ripley1.jpg";
import ripley2Image from "../../images/ripley2.jpg";
import kenobi1Image from "../../images/kenobi1.jpg";
import kenobi2Image from "../../images/kenobi2.jpg";
import kenobi3Image from "../../images/kenobi3.jpg";
import kenobi4Image from "../../images/kenobi4.jpg";
import took1Image from "../../images/took1.jpg";
import took2Image from "../../images/took2.jpg";
import ludgate1Image from "../../images/ludgate1.jpg";

const photoImages = {
  "ouster.jpg": ousterImage,
  "malcolm1.jpg": malcolm1Image,
  "malcolm2.jpg": malcolm2Image,
  "ripley1.jpg": ripley1Image,
  "ripley2.jpg": ripley2Image,
  "kenobi1.jpg": kenobi1Image,
  "kenobi2.jpg": kenobi2Image,
  "kenobi3.jpg": kenobi3Image,
  "kenobi4.jpg": kenobi4Image,
  "took1.jpg": took1Image,
  "took2.jpg": took2Image,
  "ludgate1.jpg": ludgate1Image,
};

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`http://localhost:8081/photosOfUser/${userId}`).then((data) => setPhotos(data || []));
  }, [userId]);
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`http://localhost:8081/user/${userId}`).then((data) => setUser(data));
  }, [userId]);

  if (!photos || photos.length === 0) {
    return <Typography>Người dùng này chưa có bức ảnh nào.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Danh sách ảnh {user ? `của ${user.first_name} ${user.last_name}` : ""}
      </Typography>

      {photos.map((photo) => (
        <div key={photo._id}>
          <img
            src={photoImages[photo.file_name]}
            alt="user photo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <Typography variant="body2" color="textSecondary">
            Thời gian: {photo.date_time}
          </Typography>

          <Divider />

          <Typography variant="subtitle1">Bình luận:</Typography>
          {photo.comments && photo.comments.map((comment) => (
            <div key={comment._id}>
              <Typography variant="body2">
                <Link to={`/users/${comment.user._id}`}>
                  {comment.user.first_name} {comment.user.last_name}
                </Link>{" "}
                - {comment.date_time}
              </Typography>
              <Typography variant="body2">{comment.comment}</Typography>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;