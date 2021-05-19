const express = require('express');
const router = express.Router();
const axios = require('axios');
const redis = require('async-redis');
const client = redis.createClient();

router.get('/:country', async (req, res) => {
    try {
        const cacheForNews = await client.get(`news${req.params.country}`);
        if (cacheForNews) {
            return res.send(cacheForNews);
        }
        const apiKey = process.env.NEWS_API_PUBLICKEY;

        let query = null;
        let domains = null;
        switch (req.params.country) {
            case 'sp':
                query = 'f%C3%BAtbol%20OR%20football%20OR%20soccer%20NOT%20%28f%C3%B3rmula%20OR%20baloncesto%20OR%20NBA%20OR%20NFL%29';
                domains = 'marca.com';
                break;
            case 'us':
                query = 'club%20AND%20league%20AND%20soccer%20NOT%20%28NFL%20OR%20MLB%20OR%20NBA%20OR%20basketball%20OR%20NHL%29';
                domains = 'axios.com,espn.com,aljazeera.com,apnews.com,foxsports.com,bleacherreport.com,cbsnews.com';
                break;
            case 'it':
                query = '';
                domains = 'football-italia.net';
                break;
            case 'fr':
                query = 'football%20NOT%20%28basketball%20OR%20NBA%20OR%20F1%20OR%20Golf%20OR%20Rugby%20OR%20tennis%20OR%20CFL%29';
                domains = 'lequipe.fr';
                break;
            case 'gb':
                query = 'football%20AND%20club%20AND%20league%20AND%20player%20NOT%20rugby';
                domains = 'independent.co.uk,bbc.co.uk';
                break;
            case 'de':
                query = 'Fu%C3%9Fball%20AND%20%28liga%20OR%20verein%29';
                domains = 'bild.de,focus.de,tagesspiegel.de';
                break;
            case 'br':
                query = 'futebol%20AND%20%28liga%20OR%20clube%29%20NOT%20%28filme%20OR%20economista%29';
                domains = 'globo.com';
                break;
            default:
                query = 'football%20AND%20club%20AND%20league%20AND%20player%20NOT%20rugby';
                domains = 'independent.co.uk,bbc.co.uk';
        };

        let url = null;
        if (query) {
            url = `https://newsapi.org/v2/everything?q=${query}&domains=${domains}&pageSize=100&sortBy=publishedAt&apiKey=${apiKey}`;
        } else {
            url = `https://newsapi.org/v2/everything?domains=${domains}&pageSize=100&sortBy=publishedAt&apiKey=${apiKey}`;
        }
        const { data } = await axios.get(url);
        await client.set(`news${req.params.country}`, JSON.stringify(data), 'EX', 60 * 60 * 24);
        res.json(data);
    } catch (e) {
	    res.sendStatus(500);
    }
});

module.exports = router;
