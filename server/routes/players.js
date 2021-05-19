const express = require('express');
const router = express.Router();
const data = require('../data');
const playerData = data.players;
const teamData = data.teams;
const countryCode = require('../src/country_code.json')

router.get('/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const player = await playerData.getPlayerById(id);
		res.json(player);
	} catch (e) {
		res.status(404).json({ error: 'Player not found' });
	}
});

router.get('/team/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const team = await teamData.getTeamById(id);
		const playerList = await playerData.getPlayersByTeam(team.team_name);
		res.json(playerList);
	} catch (e) {
		res.status(404).json({ error: 'Team not found' });
	}
});

router.get('/', async (req, res) => {
	console.log('query', req.query);
	if (req.query.minAge || 
		req.query.maxAge || 
		req.query.minOverall || 
		req.query.maxOverall || 
		req.query.minPotential || 
		req.query.maxPotential || 
		req.query.lg || 
		req.query.lgcode || 
		req.query.code
	) {
		let minAge =  req.query.minAge ? parseInt(req.query.minAge) : 16;
		let maxAge =  req.query.maxAge ? parseInt(req.query.maxAge) : 53;
		let minOverall =  req.query.minOverall ? parseInt(req.query.minOverall) : 0;
		let maxOverall =  req.query.maxOverall ? parseInt(req.query.maxOverall) : 99;
		let minPotential =  req.query.minPotential ? parseInt(req.query.minPotential) : 0;
		let maxPotential =  req.query.maxPotential ? parseInt(req.query.maxPotential) : 99;
		let league;
		if( req.query.lg ) {
			let leagueId = parseInt(req.query.lg);
			let teams;
			try {
				teams = await teamData.getTeamsByLeagueId(leagueId);
			} catch (e) {
				console.log(e);
			}
			league = teams[0].league;
		}
		try {
			res.json(
				await playerData.getPlayersByFilter(
					minAge,
					maxAge,
					minOverall,
					maxOverall,
					minPotential,
					maxPotential,
					league,
					req.query.lgcode,
					req.query.code
				)
			);
		} catch (e) {
			console.log(e);
			res.status(500).json({ error: `Player unable to be added: ` + e });
		}
	} else {
		console.log('no search');
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
	}
	
});

module.exports = router;
