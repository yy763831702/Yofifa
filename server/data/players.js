const mongoCollections = require('../config/mongoCollections');
const players = mongoCollections.players;

module.exports = {
    async getPlayerById(id) {
        if (!id) throw 'You must provide an id to search for';
        const playerCollection = await players();
        const player = await playerCollection.findOne({_id: id});
        if (!player) throw 'No player with that id';
        return player;
    },

    async getPlayerList(skip = 0, take = 50) {
        const playerCollection = await players();
        return await playerCollection.find({}).skip(skip).limit(take).toArray();
    },

    async getPlayersByTeam(teamName) {
        if (!teamName) throw 'You must provide team name';
        const playerCollection = await players();
        return await playerCollection.find({ 'club_name': teamName }).toArray();
    },

    /**
     * age: 16-53
     * height_cm: 155-206
     * weight_kg: 50-110
     * overall/potential: 0-99
     * value_eur: 0-105500000
     * wage_eur: 0-560000
     * international_reputation/weak_foot/skill_moves: 1-5
     */
    async getPlayersByFilter(
        minAge = 16, maxAge = 53, 
        // minHeight = 155, maxHeight = 206, 
        // minWeight = 50, maxWeight = 110, 
        minOverall = 0, maxOverall = 99, 
        minPotential = 0, maxPotential = 99, 
        // minValue = 0, maxValue = 105500000, 
        // minWage = 0, maxWage = 560000, 
        // minInterReputation = 1, maxInterReputation = 5, 
        // minWeakFoot = 1, maxWeakFoot = 5, 
        // minSkillMoves = 1, maxSkillMoves = 5,
        nationality, clubName, leagueName
    ) {
        const playerCollection = await players();
        let filterArray = [
            {'age': {$gte: minAge, $lte: maxAge}},
            // {'height_cm': {$gte: minHeight, $lte: maxHeight}},
            // {'weight_kg': {$gte: minWeight, $lte: maxWeight}},
            {'overall': {$gte: minOverall, $lte: maxOverall}},
            {'potential': {$gte: minPotential, $lte: maxPotential}},
            // {'value_eur': {$gte: minValue, $lte: maxValue}},
            // {'wage_eur': {$gte: minWage, $lte: maxWage}},
            // {'international_reputation': {$gte: minInterReputation, $lte: maxInterReputation}},
            // {'weak_foot': {$gte: minWeakFoot, $lte: maxWeakFoot}},
            // {'skill_moves': {$gte: minSkillMoves, $lte: maxSkillMoves}}
        ];

        if (nationality !== undefined) {
            filterArray.push({ 'nationality': nationality });
        }
        if (clubName !== undefined) {
            filterArray.push({ 'club_name': clubName });
        }
        if (leagueName !== undefined) {
            filterArray.push({ 'league_name': leagueName });
        }
        // filterArray.push({'player_positions': {$all: [playerPositions]}});
        // filterArray.push({'preferred_foot': preferredFoot});

        return await playerCollection.find({ $and: filterArray }).skip(0).limit(5).toArray();
    },

    async addPlayer(
        sofifa_id, player_url, player_img_url, short_name, long_name, age, dob, height_cm, weight_kg, 
        nationality, nation_code, club_name, club_id, league_name, league_code, league_rank, overall, 
        potential, value_eur, wage_eur, player_positions, preferred_foot, international_reputation, 
        weak_foot, skill_moves, work_rate, body_type, real_face, release_clause_eur, player_tags, 
        team_position, team_jersey_number, loaned_from, joined, contract_valid_until, nation_position, 
        nation_jersey_number, pace, shooting, passing, dribbling, defending, physic, gk_diving, 
        gk_handling, gk_kicking, gk_reflexes, gk_speed, gk_positioning, player_traits, 
        attacking_crossing, attacking_finishing, attacking_heading_accuracy, attacking_short_passing, 
        attacking_volleys, skill_dribbling, skill_curve, skill_fk_accuracy, skill_long_passing, 
        skill_ball_control, movement_acceleration, movement_sprint_speed, movement_agility, 
        movement_reactions, movement_balance, power_shot_power, power_jumping, power_stamina, 
        power_strength, power_long_shots, mentality_aggression, mentality_interceptions, 
        mentality_positioning, mentality_vision, mentality_penalties, mentality_composure, 
        defending_marking, defending_standing_tackle, defending_sliding_tackle, goalkeeping_diving, 
        goalkeeping_handling, goalkeeping_kicking, goalkeeping_positioning, goalkeeping_reflexes, 
        ls, st, rs, lw, lf, cf, rf, rw, lam, cam, ram, lm, lcm, cm, rcm, rm, lwb, ldm, cdm, rdm, rwb, 
        lb, lcb, cb, rcb, rb
    ) {
        const playerCollection = await players();
        const newPlayer = {
            _id: sofifa_id,
            player_url: player_url,
            player_img_url: player_img_url,
            short_name: short_name,
            long_name: long_name,
            age: age,
            dob: dob,
            height_cm: height_cm,
            weight_kg: weight_kg,
            nationality: nationality,
            nation_code: nation_code,
            club_name: club_name,
            club_id: club_id,
            league_name: league_name,
            league_code: league_code,
            league_rank: league_rank,
            overall: overall,
            potential: potential,
            value_eur: value_eur,
            wage_eur: wage_eur,
            player_positions: player_positions,
            preferred_foot: preferred_foot,
            international_reputation: international_reputation,
            weak_foot: weak_foot,
            skill_moves: skill_moves,
            work_rate: work_rate,
            body_type: body_type,
            real_face: real_face,
            release_clause_eur: release_clause_eur,
            player_tags: player_tags,
            team_position: team_position,
            team_jersey_number: team_jersey_number,
            loaned_from: loaned_from,
            joined: joined,
            contract_valid_until: contract_valid_until,
            nation_position: nation_position,
            nation_jersey_number: nation_jersey_number,
            pace: pace,
            shooting: shooting,
            passing: passing,
            dribbling: dribbling,
            defending: defending,
            physic: physic,
            gk_diving: gk_diving,
            gk_handling: gk_handling,
            gk_kicking: gk_kicking,
            gk_reflexes: gk_reflexes,
            gk_speed: gk_speed,
            gk_positioning: gk_positioning,
            player_traits: player_traits,
            attacking_crossing: attacking_crossing,
            attacking_finishing: attacking_finishing,
            attacking_heading_accuracy: attacking_heading_accuracy,
            attacking_short_passing: attacking_short_passing,
            attacking_volleys: attacking_volleys,
            skill_dribbling: skill_dribbling,
            skill_curve: skill_curve,
            skill_fk_accuracy: skill_fk_accuracy,
            skill_long_passing: skill_long_passing,
            skill_ball_control: skill_ball_control,
            movement_acceleration: movement_acceleration,
            movement_sprint_speed: movement_sprint_speed,
            movement_agility: movement_agility,
            movement_reactions: movement_reactions,
            movement_balance: movement_balance,
            power_shot_power: power_shot_power,
            power_jumping: power_jumping,
            power_stamina: power_stamina,
            power_strength: power_strength,
            power_long_shots: power_long_shots,
            mentality_aggression: mentality_aggression,
            mentality_interceptions: mentality_interceptions,
            mentality_positioning: mentality_positioning,
            mentality_vision: mentality_vision,
            mentality_penalties: mentality_penalties,
            mentality_composure: mentality_composure,
            defending_marking: defending_marking,
            defending_standing_tackle: defending_standing_tackle,
            defending_sliding_tackle: defending_sliding_tackle,
            goalkeeping_diving: goalkeeping_diving,
            goalkeeping_handling: goalkeeping_handling,
            goalkeeping_kicking: goalkeeping_kicking,
            goalkeeping_positioning: goalkeeping_positioning,
            goalkeeping_reflexes: goalkeeping_reflexes,
            ls: ls,
            st: st,
            rs: rs,
            lw: lw,
            lf: lf,
            cf: cf,
            rf: rf,
            rw: rw,
            lam: lam,
            cam: cam,
            ram: ram,
            lm: lm,
            lcm: lcm,
            cm: cm,
            rcm: rcm,
            rm: rm,
            lwb: lwb,
            ldm: ldm,
            cdm: cdm,
            rdm: rdm,
            rwb: rwb,
            lb: lb,
            lcb: lcb,
            cb: cb,
            rcb: rcb,
            rb: rb
        };
        const insertInfo = await playerCollection.insertOne(newPlayer);
        if (insertInfo.insertedCount === 0) throw 'Could not add player';
        return await this.getPlayerById(insertInfo.insertedId);
    }
};
