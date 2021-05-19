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
	let url = req.url.substring(1)
	if(!req.query.skip) {
		const result = {}
        const reg = /[?&][^?&]+=[^?&]+/g
        const found = url.match(reg)

        if(found) {
            found.forEach(item => {
                let temp = item.substring(1).split('=')
                let key = temp[0]
                let value = temp[1]
                result[key] = value
            })
        }
		
		let minOverall =  result.minOverall ? parseInt(result.minOverall) : 0
		let maxOverall =  result.maxOverall ? parseInt(result.maxOverall) : 99
		let minAttack =  result.minAttack ? parseInt(result.minAttack) : 0
		let maxAttack =  result.maxAttack ? parseInt(result.maxAttack) : 99
		let minDefence =  result.minDefence ? parseInt(result.minDefence) : 0
		let maxDefence =  result.maxDefence ? parseInt(result.maxDefence) : 99
		let minMidfield =  result.minMidfield ? parseInt(result.minMidfield) : 0
		let maxMidfield =  result.maxMidfield ? parseInt(result.maxMidfield) : 99
		let leagueName = result.league ? result.league.replace(/%20/g, ' ') : undefined
		let nationality = result.nationality ? result.nationality : undefined


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
					leagueName,
					nationality
				)
			);
		} catch (e) {
			console.log(e);
			res.status(500).json({ error: `Player unable to be added: ` + e });
		}
	}else {
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