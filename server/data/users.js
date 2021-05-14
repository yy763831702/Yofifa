
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

module.exports = {
  async getUserById(id) {
    if (!id) throw 'You must provide an id to search for';
    const userCollection = await users();
    const user = await userCollection.findOne({userId: id});
    if (!user) throw 'No player with that id';
    return user;
  },
  async register(id){
    if (!id) throw 'You must provide an id to search for';
    const userCollection = await users();
    const newUser = {
      userId: id
    }
    const userInfo = await userCollection.insertOne(newUser);
    if (!userInfo) throw 'No player with that id';
    return userInfo;
  }
}