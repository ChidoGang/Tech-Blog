const router = require('express').Router();
const { User , Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


router.post('/', (req, res) => {
    Comment.create({
        comment: req.body.comment,
        emoji: req.body.emoji,
        stars: req.body.stars,
        user_id: req.body.user_id
    }).then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;