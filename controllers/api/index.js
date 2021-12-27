const router = require('express').Router();


const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');



router.use('/user', userRoutes);
router.use('/comment',commentRoutes);

 router.post('/logout', (req, res) => {
     if(req.session.loggedIn) {
       req.session.destroy(() =>{
         res.status(204).end();
       });
     } else {
       res.status(404).end();
     }
   });

  

module.exports = router;
