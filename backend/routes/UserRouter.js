const express = require("express");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");
const router = express.Router();

router.get('/list', async (req, res) => {
  try {
  const users = await User.find({}, '_id first_name last_name');
  const usersWithPhotoCounts = await Promise.all(
    users.map(async (user) => {
      const photoCount = await Photo.countDocuments({ user_id: user._id });
      return {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        photo_count: photoCount
      };
    })
  );
    res.json(usersWithPhotoCounts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user list' });
  }
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId, '_id first_name last_name location description occupation')
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ message: 'Invalid user ID format' });
    });
});


module.exports = router;