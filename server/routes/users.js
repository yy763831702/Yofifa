const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.get('/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const user = await userData.getUserById(id);
      res.json(user);
  } catch (e) {
      res.status(404).json({ error: 'User not found' });
  }
});

router.post('/', async(req,res)=>{
  const newUser = req.body;
  if(!newUser.uid){
    res.status(404).json({ error: 'No userId provided' })
  }

  try{
    await userData.register(newUser.uid)
    const userInfo = await userData.getUserById(newUser.uid)
    res.json(userInfo)
  }catch(e){
    res.status(500)
  }
})

module.exports = router;