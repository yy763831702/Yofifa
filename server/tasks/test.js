const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const players = data.players;
const teams = data.teams;

async function main() {
    const db = await dbConnection();

    // const messi = await players.getPlayerById(158023);
    // console.log(messi);

    // const playerList = await players.getPlayerList(8, 8);
    // console.log(playerList);

    // const _ = undefined;
    // const filteredPlayerList = await players.getPlayersByFilter(50);
    // console.log(filteredPlayerList);

    // const arsenal = await teams.getTeamById(1);
    // console.log(arsenal);

    const leagueIdList = [39,40,41,42,61,62,71,78,79,80,88,94,98,103,106,113,119,128,135,140,141,
    144,169,179,188,203,207,218,253,262,283,292,307,357];
    // 39
    const enpl = ['Manchester City','Manchester United','Leicester','Chelsea','West Ham',
    'Tottenham','Liverpool','Everton','Arsenal','Aston Villa','Leeds','Wolves','Crystal Palace',
    'Brighton','Southampton','Burnley','Newcastle','Fulham','West Brom','Sheffield Utd'];
    // 40
    const encl = ['Norwich','Watford','Brentford','Swansea','Bournemouth','Barnsley','Reading',
    'Cardiff','QPR','Middlesbrough','Millwall','Luton','Preston','Stoke City','Blackburn',
    'Nottingham Forest','Coventry','Birmingham','Bristol City','Huddersfield','Derby','Rotherham',
    'Sheffield Wednesday','Wycombe'];
    // 41
    const enlo = ['Hull City','Peterborough','Blackpool','Sunderland','Lincoln','Portsmouth',
    'Oxford United','Charlton','Ipswich','Milton Keynes Dons','Gillingham','Doncaster',
    'Accrington ST','Crewe','Fleetwood Town','Burton Albion','Shrewsbury','Plymouth',
    'AFC Wimbledon','Wigan','Rochdale','Northampton','Swindon Town','Bristol Rovers'];
    // 42
    const enlt = ['Cheltenham','Cambridge United','Bolton','Morecambe','Newport County','Tranmere',
    'Forest Green','Exeter City','Salford City','Carlisle','Leyton Orient','Crawley Town',
    'Port Vale','Bradford','Stevenage','Harrogate Town','Mansfield Town','Oldham','Walsall',
    'Colchester','Barrow','Scunthorpe','Southend','Grimsby'];

    const arr = [];
    let res;
    for (let club of arr) {
        res = await teams.getTeamsByName(club);
        if (res) {
            console.log(res.team_name);
        } else {
            res = await teams.getTeamByFuzzySearch(42, club);
            console.log(res);
        }
    }

    // const epl = await teams.getTeamsByLeagueId(39);
    // console.log(epl);
    
    // const teamList = await teams.getTeamList(8, 8);
    // console.log(teamList);

    await db.serverConfig.close();
}
main();
