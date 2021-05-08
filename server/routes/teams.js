const express = require('express');
const router = express.Router();
const data = require('../data');
const teamData = data.teams;

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const team = await teamData.getTeamById(id);
        res.json(team);
    } catch (e) {
        res.status(404).json({ error: 'Team not found' });
    }
});

router.get('/name/:teamname', async (req, res) => {
    try {
        const team = await teamData.getTeamsByName(req.params.teamname);
        res.json(team);
    } catch (e) {
        res.status(404).json({ error: 'Team not found' });
    }
});

router.get('/league/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const teamList = await teamData.getTeamsByLeagueId(id);
        res.json(teamList);
    } catch (e) {
        res.status(404).json({ error: 'League not found' });
    }
});

router.get('/', async (req, res) => {
    try {
        let skip = req.query.skip ? Number( req.query.skip ) : 0;
        let take = req.query.take ? Number( req.query.take ) : 20;
        if (!Number.isInteger(skip) || skip < 0) {
            return res.status(400).json({ error: 'skip must be integer and must be greater than or equal to 0'});
        }
        if (!Number.isInteger(take) || take <= 0) {
            return res.status(400).json({ error: 'take must be integer and must be greater than 0'});
        }
        const teamList = await teamData.getTeamList(skip, take);
        res.json(teamList);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;
