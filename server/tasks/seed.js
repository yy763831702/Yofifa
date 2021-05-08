const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const players = data.players;
const teams = data.teams;

const playerJsonData = require('../src/players.json');
const teamUrlJsonData = require('../src/teams_url.json');
const teamIdJsonData = require('../src/teams_league_id.json');
const teamJsonData = require('../src/teams.json');

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    const formatNumber = (n) => {
        const ranges = [
            { divider: 1e9 , suffix: 'G' },
            { divider: 1e6 , suffix: 'M' },
            { divider: 1e3 , suffix: 'K' }
        ];
        for (let i = 0; i < ranges.length; i++) {
            if (n >= ranges[i].divider) {
                return '\u20AC' + (n / ranges[i].divider).toString() + ranges[i].suffix;
            }
        }
        return '\u20AC' + n.toString();
    };

    // seed players data
    for (let p of playerJsonData) {
        let id = p.sofifa_id.toString();
        while (id.length < 6) {
            id = '0' + id;
        }
        id = id.substring(0, 3) + '/' + id.substring(3);
        const playerImageSource = `https://cdn.sofifa.com/players/${id}/21_120.png`;
        await players.addPlayer(
            p.sofifa_id,
            p.player_url,
            playerImageSource,
            p.short_name,
            p.long_name,
            p.age,
            p.dob,
            p.height_cm,
            p.weight_kg,
            p.nationality,
            p.club_name,
            p.league_name,
            p.league_rank,
            p.overall,
            p.potential,
            formatNumber(p.value_eur),
            formatNumber(p.wage_eur),
            p.player_positions.split(', '),
            p.preferred_foot,
            p.international_reputation,
            p.weak_foot,
            p.skill_moves,
            p.work_rate,
            p.body_type,
            p.real_face,
            formatNumber(p.release_clause_eur),
            p.player_tags.split(', '),
            p.team_position,
            p.team_jersey_number,
            p.loaned_from,
            p.joined,
            p.contract_valid_until,
            p.nation_position,
            p.nation_jersey_number,
            p.pace,
            p.shooting,
            p.passing, 
            p.dribbling,
            p.defending,
            p.physic,
            p.gk_diving,
            p.gk_handling,
            p.gk_kicking,
            p.gk_reflexes,
            p.gk_speed,
            p.gk_positioning,
            p.player_traits.split(', '),
            p.attacking_crossing,
            p.attacking_finishing,
            p.attacking_heading_accuracy,
            p.attacking_short_passing,
            p.attacking_volleys,
            p.skill_dribbling,
            p.skill_curve,
            p.skill_fk_accuracy,
            p.skill_long_passing,
            p.skill_ball_control,
            p.movement_acceleration,
            p.movement_sprint_speed,
            p.movement_agility,
            p.movement_reactions,
            p.movement_balance,
            p.power_shot_power,
            p.power_jumping,
            p.power_stamina,
            p.power_strength,
            p.power_long_shots,
            p.mentality_aggression,
            p.mentality_interceptions,
            p.mentality_positioning,
            p.mentality_vision,
            p.mentality_penalties,
            p.mentality_composure,
            p.defending_marking,
            p.defending_standing_tackle,
            p.defending_sliding_tackle,
            p.goalkeeping_diving,
            p.goalkeeping_handling,
            p.goalkeeping_kicking,
            p.goalkeeping_positioning,
            p.goalkeeping_reflexes,
            p.ls,
            p.st,
            p.rs,
            p.lw,
            p.lf,
            p.cf,
            p.rf,
            p.rw,
            p.lam,
            p.cam,
            p.ram,
            p.lm,
            p.lcm,
            p.cm,
            p.rcm,
            p.rm,
            p.lwb,
            p.ldm,
            p.cdm,
            p.rdm,
            p.rwb,
            p.lb,
            p.lcb,
            p.cb,
            p.rcb,
            p.rb
        );
    }

    // seed teams data
    for (let i in teamJsonData) {
        const id = Number ( teamUrlJsonData[i].str_url.match(/[0-9]+/)[0] );
        await teams.addTeam(
            id,
            teamJsonData[i].str_team_name,
            `https://cdn.sofifa.com/teams/${id}/120.png`,
            teamUrlJsonData[i].str_url,
            teamJsonData[i].str_league,
            teamIdJsonData[i].int_league_id,
            teamJsonData[i].int_overall,
            teamJsonData[i].int_attack,
            teamJsonData[i].int_midfield,
            teamJsonData[i].int_defence,
            teamJsonData[i].int_international_prestige,
            teamJsonData[i].int_domestic_prestige,
            formatNumber(teamJsonData[i].int_transfer_budget),
            teamJsonData[i].str_defensive_style,
            teamJsonData[i].int_team_width,
            teamJsonData[i].int_depth,
            teamJsonData[i].str_offensive_style,
            teamJsonData[i].int_width,
            teamJsonData[i].int_players_in_box,
            teamJsonData[i].int_corners,
            teamJsonData[i].int_freekicks
        );
    }

    console.log('Done seeding database');
    await db.serverConfig.close();
};

main();
