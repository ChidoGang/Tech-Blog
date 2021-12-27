const Comment = require('./Comment');
const User = require('./User');

User.hasMany(Comment, {
    foreignKey:( 'user_id')
});

Comment.belongsTo(User, {
    foreignKey:('user_id')
});

module.exports = { User, Comment};