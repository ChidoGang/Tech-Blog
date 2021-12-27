const router = require('express').Router();
const { User,Comment } = require('../Models')
const { withAuth, withDash, withLoggedIn } = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  User.findAll({
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'emoji', 'stars'],
        include:[
          {
            model: User,
            attributes: ['first_name', 'last_name']
          }
        ]
      }
      
    ]
   }).then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({message:'No user found with this id'})
      return;
    }
  
    const user = dbUserData.map(user => user.get({ plain: true }));
  
    res.render('home-page', { 
      user, 
      loggedIn: req.session.loggedIn,
      userLoggedIn: req.session.userLoggedIn,
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

router.get('/login', withLoggedIn, (req, res) => {
  res.render('login');
});

router.get('/create-account', withLoggedIn, (req, res) => {
  res.render('create-account');
});

router.get('/profile/:id', withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'emoji', 'stars'],
        include:[
          {
          model: User,
            attributes: ['first_name', 'last_name']
          }
        ]
      
      }
    ]
  }).then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({message:'No User found with this id.'});
    }

    const user = dbUserData.get({plain:true});

    res.render('user-profile', {
      user,
      loggedIn: req.session.loggedIn,
      userLoggedIn: req.session.userLoggedIn
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

 router.get('/dashboard', withAuth, withDash, (req, res) => {
  User.findOne({
     where: {
       id: req.session.user_id
     }
   }).then(dbUserData => {
     if(!dbUserData) {
       res.status(404).json({message: 'No user found with this id'});
       return;
     }

     const user = dbUserData.get({plain: true});

     res.render('dashboard', {
       user,
       loggedIn: req.session.loggedIn,
       userLoggedIn: req.session.userLoggedIn
     })
   })
 })

router.get('/introduction', (req, res) => {
  res.render('introduction');
})

module.exports = router;
