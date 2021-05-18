const mongoCollections = require('../config/mongoCollections');
const teams = mongoCollections.teams;

module.exports = {
    async getTeamById(id) {
        if (!id) throw 'You must provide an id to search for';
        const teamCollection = await teams();
        const team = await teamCollection.findOne({_id: id});
        if (!team) throw 'No team with that id';
        return team;
    },

    async getTeamList(skip = 0, take = 20) {
        const teamCollection = await teams();
        return await teamCollection.find({}).skip(skip).limit(take).toArray();
    },

    async getTeamsByName(team_name) {
        if (!team_name) throw 'You must provide team name';
        const teamCollection = await teams();
        return await teamCollection.findOne({'team_name': team_name});
    },

    async getTeamsByLeagueId(league_id) {
        if (!league_id) throw 'You must provide league id';
        const teamCollection = await teams();
        return await teamCollection.find({ 'league_id': league_id }).toArray();
    },

    async getTeamByFuzzySearch(league_id, teamName) {
        const teamCollection = await teams();
        await teamCollection.createIndex({ team_name: "text" });
        const filterArray = [
            { 'league_id': league_id },
            { "$text": { "$search": teamName } }
        ];
        const team = await teamCollection.find({ $and: filterArray }).toArray();
        return team.length === 0 ? null : team[0].team_name;
    },

    async getTeamsByFilter(
        minOverall = 0, maxOverall = 99, 
        minAttack = 16, maxAttack= 53,
        minDefence = 0, maxDefence = 99,
        leagueName, nationality
    ) {
        const teamCollection = await teams();
        let filterArray = [
            {'overall': {$gte: minOverall, $lte: maxOverall}},
            {'attack': {$gte: minAttack, $lte: maxAttack}},
            {'defence': {$gte: minDefence, $lte: maxDefence}},
        ];

        if (leagueName !== undefined) {
            filterArray.push({ 'league': leagueName });
        }
        if (nationality !== undefined) {
            filterArray.push({ 'league_nation_code': nationality });
        }
        // filterArray.push({'player_positions': {$all: [playerPositions]}});
        // filterArray.push({'preferred_foot': preferredFoot});

        return await teamCollection.find({ $and: filterArray }).toArray();
    },

    /**
     * [defensive_style]
     * team_width: Determines how Narrow or Wide the team shape is set up when not have possession of the ball.
     * depth: Determines how Deep or High up the pitch the team sets up when not have possession of the ball.
     * 
     * [offensive_style]
     * width: Determines how Narrow or Wide the team shape sets up when in possession of the ball.
     * players_in_box: This tactic either weakens or strengthens player presence in the opposing box.
     * corners: Determines how many attacking players are in the box for when the team takes Corners.
     * freekicks: Determines how many attacking players are in the box for when the team takes Free Kicks.
     */
    async addTeam(
        id, team_name, team_img, team_url, league, league_nation_code, league_id, overall, attack, midfield, defence, 
        international_prestige, domestic_prestige, transfer_budget, defensive_style, team_width, 
        depth, offensive_style, width, players_in_box, corners, freekicks
    ) {
        const teamCollection = await teams();
        const newTeam = {
            _id: id,
            team_name: team_name,
            team_img: team_img,
            team_url: team_url,
            league: league,
            league_nation_code: league_nation_code,
            league_id: league_id,
            overall: overall,
            attack: attack,
            midfield: midfield,
            defence: defence,
            international_prestige: international_prestige,
            domestic_prestige: domestic_prestige,
            transfer_budget: transfer_budget,
            defensive_style: defensive_style,
            team_width: team_width,
            depth: depth,
            offensive_style: offensive_style,
            width: width,
            players_in_box: players_in_box,
            corners: corners,
            freekicks: freekicks
        };
        const insertInfo = await teamCollection.insertOne(newTeam);
        if (insertInfo.insertedCount === 0) throw 'Could not add team';
        return await this.getTeamById(insertInfo.insertedId);
    }
};
