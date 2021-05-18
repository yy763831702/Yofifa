const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = require('./users');
const uuid = require('uuid');

module.exports = {
  async getAllPosts() {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
  },

  async getPostById(id) {
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: id });
    if (!post) throw 'Post not found';
    return post;
  },
  async getPostsByUser(author) {
    if (!author) throw "You must provide an author id";
    if (typeof author !== "string") throw "author id must be of type string";
    const postCollection = await posts();
    const userPosts = await postCollection
      .find({ author: author })
      .toArray();
    return userPosts;
  },
  async addPost(author,height,weight,preferred,weekFoot,skillMove,reputation,attackingWorkRate,
            defensiveWorkRate,commonName,firstName,lastName,age,nationality,position,potential,
            rating,value,wage,attack_crossing,attack_fishing,attack_heading_accuracy,attack_short_passing,
            attack_volleys,skill_dribbling,skill_fk_accuracy,skill_long_passing,skill_ball_control,movement_acceleration,
            movement_sprint_speed,movement_agility,movement_reactions,movement_balance,power_shot_power,
            power_jumping,power_stamina,power_strength,power_long_shots,mentality_aggression,mentality_Interceptions,
            mentality_positioning,mentality_vision,mentality_penalties,mentality_composure,defending_standing_tackle,
            defending_sliding_tackle,goalkeeping_diving,goalkeeping_handling,goalkeeping_kicking,goalkeeping_positioning,
            goalkeeping_reflexes,input_team,start_year,end_year) {

    if (!author || typeof author !== 'string') throw 'No author provided!';
    if (!commonName || typeof commonName !== 'string') throw 'No commonName provided!';
    if(!firstName || typeof firstName !== 'string') throw 'No firstName provided!';
    if(!lastName || typeof lastName !== 'string') throw 'No lastName provided!';
    if(!potential || typeof potential !== 'string') throw 'No potential provided!';
    if(!rating || typeof potential !== 'string') throw 'No rating provided!';

    const postCollection = await posts();

    let newPost = {
      author,
      height,
      weight,
      preferred,
      weekFoot,
      skillMove,
      reputation,
      attackingWorkRate,
      defensiveWorkRate,
      commonName,
      firstName,
      lastName,
      age,
      nationality,
      position,
      potential,
      rating,
      value,
      wage,
      attack_crossing,
      attack_fishing,
      attack_heading_accuracy,
      attack_short_passing,
      attack_volleys,
      skill_dribbling,
      skill_fk_accuracy,
      skill_long_passing,
      skill_ball_control,
      movement_acceleration,
      movement_sprint_speed,
      movement_agility,
      movement_reactions,
      movement_balance,
      power_shot_power,
      power_jumping,
      power_stamina,
      power_strength,
      power_long_shots,
      mentality_aggression,
      mentality_Interceptions,
      mentality_positioning,
      mentality_vision,
      mentality_penalties,
      mentality_composure,
      defending_standing_tackle,
      defending_sliding_tackle,
      goalkeeping_diving,
      goalkeeping_handling,
      goalkeeping_kicking,
      goalkeeping_positioning,
      goalkeeping_reflexes,
      input_team,
      start_year,
      end_year,
      _id: uuid.v4(),
    };
    const insertInfo = await postCollection.insertOne(newPost);
    if (insertInfo.insertedCount === 0) throw "Could not add post";

    const newId = insertInfo.insertedId;
    const post = await this.getPostById(newId);
    return post;
  },

  async removePost(id) {
    const postCollection = await posts();
    let post = null;
    try {
      post = await this.getPostById(id);
    } catch (e) {
      console.log(e);
      return;
    }
    const deletionInfo = await postCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
    await users.removePostFromUser(post.poster.id, id);
    return true;
  },
  //
  // async updatePost(id, updatedPost) {
  //   const postCollection = await posts();
  //
  //   const updatedPostData = {};
  //
  //
  //   if (updatedPost.title) {
  //     updatedPostData.title = updatedPost.title;
  //   }
  //
  //   if (updatedPost.body) {
  //     updatedPostData.body = updatedPost.body;
  //   }
  //
  //   if (updatedPost.price) {
  //     updatedPostData.price = updatedPost.price;
  //   }
  //
  //   await postCollection.updateOne({ _id: id }, { $set: updatedPostData });
  //
  //   return await this.getPostById(id);
  // },
};
