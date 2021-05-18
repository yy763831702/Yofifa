const express = require('express');
const router = express.Router();
const data = require('../data');
const playerData = data.players;
const teamData = data.teams;

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
	console.log(req.url)
	let url = req.url.substring(1)
	if(url) {
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
			console.log(result.minAge)
        }
		let minAge =  result.minAge ? parseInt(result.minAge) : 16
		let maxAge =  result.maxAge ? parseInt(result.maxAge) : 53
		let minOverall =  result.minOverall ? parseInt(result.minOverall) : 0
		let maxOverall =  result.maxOverall ? parseInt(result.maxOverall) : 99
		let minPotential =  result.minPotential ? parseInt(result.minPotential) : 0
		let maxPotential =  result.maxPotential ? parseInt(result.maxPotential) : 99
		console.log(minAge, maxAge)

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
	}else {
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