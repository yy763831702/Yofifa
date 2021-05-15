const express = require('express');
const router = express.Router();
const data = require('../data');
const playerData = data.players;

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const player = await playerData.getPlayerById(id);
        res.json(player);
    } catch (e) {
        res.status(404).json({ error: 'Player not found' });
    }
});

router.get('/team/:team', async (req, res) => {
    try {
        const playerList = await playerData.getPlayersByTeam(req.params.team);
        res.json(playerList);
    } catch (e) {
        res.status(404).json({ error: 'Team not found' });
    }
});

router.get('/', async (req, res) => {
    try {
        let skip = req.query.skip ? Number( req.query.skip ) : 0;
        let take = req.query.take ? Number( req.query.take ) : 50;
        if (!Number.isInteger(skip) || skip < 0) {
            return res.status(400).json({ error: 'skip must be integer and must be greater than or equal to 0'});
        }
        if (!Number.isInteger(take) || take <= 0) {
            return res.status(400).json({ error: 'take must be integer and must be greater than 0'});
        }
        const playerList = await playerData.getPlayerList(skip, take);
        res.json(playerList);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post("/", async (req, res) => {
    console.log("filter route")

    let minAge =  req.body.minAge ? parseInt(req.body.minAge) : 16
    let maxAge =  req.body.maxAge ? parseInt(req.body.maxAge) : 53
    let minOverall =  req.body.minOverall ? parseInt(req.body.minOverall) : 0
    let maxOverall =  req.body.maxOverall ? parseInt(req.body.maxOverall) : 99
    let minPotential =  req.body.minPotential ? parseInt(req.body.minPotential) : 0
    let maxPotential =  req.body.maxPotential ? parseInt(req.body.maxPotential) : 99

    try {
      res.json(
        await playerData.getPlayersByFilter(
            minAge,
            maxAge,
            minOverall,
            maxOverall,
            minPotential,
            maxPotential
        )
      );
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: `Player unable to be added: ` + e });
    }
  });

module.exports = router;
