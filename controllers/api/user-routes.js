const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  User.findAll({
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment','emoji','stars'],
        include: [
          {
            model: User,
            attributes: ['first_name', 'last_name']
          } 
        ]
      }
    ]
   })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
   router.post('/login', (req, res) => {
     User.findOne({
       where:{
           email: req.body.email
       }
     }).then(dbUserData =>{
       if (!dbUserData) {
         res.status(400).json({message:'No user with that email address!'});
         return;
      } 

       req.session.save(() => { 
         //declare session variables
         req.session.user_id = dbUserData.id;
         req.session.first_name = dbUserData.first_name;
        req.session.last_name = dbUserData.last_name;
        req.session.loggedIn = true;
         req.session.UserLoggedIn = true;

         res.json({ user: dbUserData, message: 'You are now logged in!' }); 
     });
   });
 })

router.put('/:id', (req, res) => {
  User.update(
    {
      subject: req.body.subject,
      description: req.body.description,
    },
    {
      where: {
      id: req.session.user_id
      }
    }
    ).then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  })

  module.exports = router;
