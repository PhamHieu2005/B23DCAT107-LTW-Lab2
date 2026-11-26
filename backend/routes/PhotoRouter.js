const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const User = require("../db/userModel");

router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send("Invalid user ID");
        }

        const photos = await Photo.find(
            { user_id: userId },
            "_id user_id comments file_name date_time"
        ).populate({
            path: "comments.user_id",
            model: "Users",                       // trùng tên trong mongoose.model("Users", ...)
            select: "_id first_name last_name",
        })

        const formattedPhotos = photos.map(photo => ({
            _id: photo._id,
            user_id: photo.user_id,
            file_name: photo.file_name,
            date_time: photo.date_time,
            comments: photo.comments.map(comment => ({
                _id: comment._id,
                comment: comment.comment,
                date_time: comment.date_time,
                user: comment.user_id
                    ? {
                        _id: comment.user_id._id,
                        first_name: comment.user_id.first_name,
                        last_name: comment.user_id.last_name,
                    }
                    : null,
            })),
        }));

        res.json(formattedPhotos);
    } catch (err) {
        console.error(err);
        res.status(400).send("Invalid user ID format.");
    }
});

module.exports = router;
