const express = require('express');
const router = express.Router();
const axios = require('axios');
const redis = require('async-redis');
const client = redis.createClient();

router.get('/:id', async (req, res) => {
    try {
        const cacheForStandings = await client.get(`standings${req.params.id}`);
        if (cacheForStandings) {
            return res.send(cacheForStandings);
        }

        const apiKey = process.env.APIFOOTBALL_API_KEY;
        const requestOptions = {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": apiKey
            }
        };
        
        // saudi arabia - season 2019 - league id - 307
        let url;
        if (req.params.id === '307') {
            url = `https://v3.football.api-sports.io/standings?league=307&season=2019`;
        } else {
            url = `https://v3.football.api-sports.io/standings?league=${req.params.id}&season=2020`;
        }
        const { data: { response: [data] } } = await axios.get(url, requestOptions);
        await client.set(`standings${req.params.id}`, JSON.stringify(data), 'EX', 60 * 60 * 24);
        res.json(data);
    } catch (e) {
	    res.sendStatus(500);
    }
});

module.exports = router;
