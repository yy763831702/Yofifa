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

router.get('/:league/:teamname', async (req, res) => {
	try {
    	const leagueId = Number(req.params.league);
		const teamname = decodeURIComponent(req.params.teamname);
		let team;
		team = await teamData.getTeamsByName(teamname);
		if (!team) {
			const name = await teamData.getTeamByFuzzySearch(leagueId, teamname);
			team = await teamData.getTeamsByName(name);
		}
		res.json(team);
	} catch (e) {
		res.status(500);
	}
});

router.get('/', async (req, res) => {
	console.log(req.query);
	if (req.query.minOverall || 
		req.query.maxOverall || 
		req.query.minAttack || 
		req.query.maxAttack || 
		req.query.minMidfield || 
		req.query.maxMidfield || 
		req.query.minDefence || 
		req.query.maxDefence || 
		req.query.nationality || 
		req.query.lg || 
		req.query.lgcode
	) {
		let minOverall = req.query.minOverall ? parseInt(req.query.minOverall) : 0;
		let maxOverall = req.query.maxOverall ? parseInt(req.query.maxOverall) : 99;
		let minAttack = req.query.minAttack ? parseInt(req.query.minAttack) : 0;
		let maxAttack = req.query.maxAttack ? parseInt(req.query.maxAttack) : 99;
		let minMidfield =  req.query.minMidfield ? parseInt(req.query.minMidfield) : 0;
		let maxMidfield =  req.query.maxMidfield ? parseInt(req.query.maxMidfield) : 99;
		let minDefence =  req.query.minDefence ? parseInt(req.query.minDefence) : 0;
		let maxDefence =  req.query.maxDefence ? parseInt(req.query.maxDefence) : 99;
		let leagueId = req.query.lg ? parseInt(req.query.lg) : undefined;

		try {
			res.json(
				await teamData.getTeamsByFilter(
					minOverall,
					maxOverall,
					minAttack,
					maxAttack,
					minDefence,
					maxDefence,
					minMidfield,
					maxMidfield,
					leagueId,
					req.query.nationality,
					req.query.lgcode
				)
			);
		} catch (e) {
			console.log(e);
			res.status(500).json({ error: `Player unable to be added: ` + e });
		}
	} else {
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
	}
	
});

module.exports = router;