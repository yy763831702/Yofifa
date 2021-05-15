const express = require('express');
const router = express.Router();
const axios = require('axios');
const redis = require('async-redis');
const client = redis.createClient();

router.get('/:id', async (req, res) => {
    try {
        // const cacheForStandings = await client.get(`standings${req.params.id}`);
        // if (cacheForStandings) {
        //     return res.send(cacheForStandings);
        // }

        const apiKey = '1f74c8dcdef29d20f55ebd7803ec65e0';
        const requestOptions = {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": apiKey
            }
        };

        // const leagueIdList = [61,62,71,78,79,80,88,94,98,103,106,113,119,128,135,140,141,
        // 144,169,179,188,203,207,218,253,262,283,292,357];
        
        // saudi arabia - season 2019  - 307
        let url;
        if (req.params.id === '307') {
            url = `https://v3.football.api-sports.io/standings?league=307&season=2019`;
        } else {
            url = `https://v3.football.api-sports.io/standings?league=${req.params.id}&season=2020`;
        }
        const { data } = await axios.get(url, requestOptions);
        // await client.set(`standings${req.params.id}`, JSON.stringify(data), 'EX', 60 * 60 * 24);
        // await client.set(`standings${req.params.id}`, JSON.stringify(data));
        console.log(data)
        res.json(data);
    } catch (e) {
	    res.sendStatus(500);
    }
});

module.exports = router;
