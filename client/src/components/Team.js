import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import '../App.css';
import '../team.css';

const Team = (props) => {
    const [ teamData, setTeamData ] = useState(undefined);
    const [ playersData, setPlayersData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);

    useEffect(
        () => {
            async function fetchData() {
                try {
                    let url = `http://localhost:3008/teams/${props.match.params.id}`;
                    const { data } = await axios.get(url);
                    setTeamData(data);

                    url = `http://localhost:3008/players/team/${props.match.params.id}`;
                    const players = await axios.get(url);
                    setPlayersData(players.data);
                    
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        },
        [ props.match.params.id ]
    );

    const buildPlayerCard = (player) => {
        const { _id, short_name, player_img_url, age, nation_code, overall, potential, value_eur, 
        wage_eur, player_positions, team_position, team_jersey_number } = player;
        const positions = player_positions.map((pos) => {
            return <span className={`pos ${pos}`} key={pos}>{pos}</span>;
        });
        return (
            <tr key={_id}>
                <td><img width="60px" src={player_img_url} alt={_id} /></td>
                <td>{team_jersey_number}</td>
                <td>
                    <Link to={`/player/${_id}`} >
                        <div>
                            <span>
                                <img width='30px' src={`https://cdn.sofifa.com/flags/${nation_code}.png`} alt={_id} />
                            </span>
                            <span>{short_name}</span>
                        </div>
                        <div>
                            {team_position !== 'SUB' && team_position !== 'RES' &&
                                <span>( <span className={`pos ${team_position}`}>{team_position}</span>) </span>
                            }
                            {positions}
                        </div>
                    </Link>
                </td>
                <td>{age}</td>
                <td><span className={`p-${overall}`}>{overall}</span></td>
                <td><span className={`p-${potential}`}>{potential}</span></td>
                <td>{value_eur}</td>
                <td>{wage_eur}</td>
            </tr>
        );
    };

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    } else {
        const {_id, team_name, team_img, team_url, league, league_nation_code, league_id, overall, 
            attack, midfield, defence, international_prestige, domestic_prestige, transfer_budget, 
            defensive_style, team_width, depth, offensive_style, width, players_in_box
        } = teamData;
        
        const res = [];
        const start = [];
        const sub = [];
        let startingXIAverAge = 0;
        let wholeTeamAverAge = 0;
        for (let player of playersData) {
            if (player.team_position === 'SUB') {
                sub.push(player);
            } else if (player.team_position === 'RES') {
                res.push(player);
            } else {
                start.push(player);
                startingXIAverAge += player.age;
            }
            wholeTeamAverAge += player.age;
        }
        startingXIAverAge = (startingXIAverAge / 11).toFixed(2);
        wholeTeamAverAge = (wholeTeamAverAge / playersData.length).toFixed(2);

        const lineUpSortList = ['L', 'C', 'R', 'G'];
        const lineUpMap = start
            .sort((a, b) => {
                return lineUpSortList.indexOf(a.team_position.charAt(0)) - lineUpSortList.indexOf(b.team_position.charAt(0));
            })
            .map(({ _id, player_img_url, short_name, team_position, team_jersey_number }) => {
                return (
                    <div key={_id} className={`t-${team_position}`}>
                        <img className='team-lineup-img' src={player_img_url} alt={_id} />
                        <div className='team-lineup-div'>
                            <Link className='team-lineup-link' key={_id} to={`/player/${_id}`}>
                                <span className='team-lineup-number'>{team_jersey_number}</span>
                                <span className='team-lineup-name'>{short_name.length > 17 ? short_name.substring(0, 15)+'...' : short_name}</span>
                            </Link>
                        </div>
                    </div>
                );
        });
        const lineupList = start.map((player) => {
            return buildPlayerCard(player);
        });
        const subList = sub.map((player) => {
            return buildPlayerCard(player);
        });
        const resList = res.map((player) => {
            return buildPlayerCard(player);
        });
        return (
            <div>
                <div className='team-header'>
                    <div className='team-header-src'>Data come from <a href={team_url}><img alt="SoFIFA" src="https://cdn.sofifa.com/img/logo.png" data-was-processed="true"/></a></div>
                    <div className='team-header-div'>
                        <div>
                            <img src={team_img} alt={_id} />
                        </div>
                        <div>
                            <div>
                                <h1>{team_name}</h1>
                                <div className='team-header-lg-div'>
                                    <img width='30px' src={`https://media.api-sports.io/flags/${league_nation_code}.svg`} alt={league_nation_code}/>
                                    {league_id !== 0 ? <Link to={`/standings/${league_id}`}>{league}</Link> : <span>{league}</span>}
                                </div>
                            </div>
                            <div className='team-header-data'>
                                <div>
                                    <span className={`p-${overall}`}>{overall}</span><div>overall</div>
                                </div>
                                <div>
                                    <span className={`p-${attack}`}>{attack}</span><div>attack</div>
                                </div>
                                <div>
                                    <span className={`p-${midfield}`}>{midfield}</span><div>midfield</div>
                                </div>
                                <div>
                                    <span className={`p-${defence}`}>{defence}</span><div>defence</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className='team-card-section'>
                    <div className='team-card team-card-info'>
                        <div className='team-info'>
                            <h2>Information</h2>
                            <div className='team-star-rating'>
                                <span>international prestige: </span>
                                <span>
                                    <StarRatings
                                        rating={international_prestige / 2}
                                        starRatedColor="orange"
                                        name='rating'
                                        starDimension="15px"
                                        starSpacing="1px"
                                    />
                                </span>
                            </div>
                            <div className='team-star-rating'>
                                <span>domestic prestige: </span>
                                <span>
                                    <StarRatings
                                        rating={domestic_prestige / 2}
                                        starRatedColor="orange"
                                        name='rating'
                                        starDimension="15px"
                                        starSpacing="1px"
                                    />
                                </span>
                            </div>
                            <div className='team-info-div'>transfer budget: <span>{transfer_budget}</span></div>
                            <div className='team-info-div'>line up Age: <span>{startingXIAverAge} y.o.</span></div>
                            <div className='team-info-div'>whole Team Age: <span>{wholeTeamAverAge} y.o.</span></div>
                        </div>
                        <div className='team-info'>
                            <h2>Tactics</h2>
                            <h3>defensive style: <em>{defensive_style}</em></h3>
                            <div className='team-star-rating'>
                                <span>team width: </span>
                                <span>
                                    <StarRatings
                                        rating={team_width / 2}
                                        starRatedColor="orange"
                                        name='rating'
                                        starDimension="15px"
                                        starSpacing="1px"
                                    />
                                </span>
                            </div>
                            <div className='team-star-rating'>
                                <span>depth: </span>
                                <span>
                                    <StarRatings
                                        rating={depth / 2}
                                        starRatedColor="orange"
                                        name='rating'
                                        starDimension="15px"
                                        starSpacing="1px"
                                    />
                                </span>
                            </div>
                            <h3>offensive style: <em>{offensive_style}</em></h3>
                            <div className='team-star-rating'>
                                <span>width: </span>
                                <span>
                                    <StarRatings
                                        rating={width / 2}
                                        starRatedColor="orange"
                                        name='rating'
                                        starDimension="15px"
                                        starSpacing="1px"
                                    />
                                </span>
                            </div>
                            <div className='team-star-rating'>
                                <span>players in box: </span>
                                <span>
                                    <StarRatings
                                        rating={players_in_box / 2}
                                        starRatedColor="orange"
                                        name='rating'
                                        starDimension="15px"
                                        starSpacing="1px"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`t-map`}>{lineUpMap}</div>
                    {_id !== 45 && _id !== 52 && 
                        <div className='team-card team-kits'>
                            <h2>Kits</h2>
                            <div>
                                <img src={`https://cdn.sofifa.com/kits/${_id}/21_0.png`} alt={_id} />
                                <h4>Home Kit</h4>
                            </div>
                            <div>
                                <img src={`https://cdn.sofifa.com/kits/${_id}/21_1.png`} alt={_id} />
                                <h4>Away Kit</h4>
                            </div>
                            <div>
                                <img src={`https://cdn.sofifa.com/kits/${_id}/21_2.png`} alt={_id} />
                                <h4>Goalkeeper Kit</h4>
                            </div>
                        </div>
                    }
                </section>

                <div className='team-table-div'>
                    <h4>Line Up</h4>
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>No</td>
                                <td>Name</td>
                                <td>Age</td>
                                <td>Ova</td>
                                <td>Pot</td>
                                <td>value</td>
                                <td>wage</td>
                            </tr>
                        </thead>
                        <tbody>
                            {lineupList}
                        </tbody>
                    </table>
                </div>
                
                <div className='team-table-div'>
                    <h4>Sub</h4>
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>No</td>
                                <td>Name</td>
                                <td>Age</td>
                                <td>Ova</td>
                                <td>Pot</td>
                                <td>value</td>
                                <td>wage</td>
                            </tr>
                        </thead>
                        <tbody>
                            {subList}
                        </tbody>
                    </table>
                </div>

                {resList.length > 0 && 
                    <div className='team-table-div'>
                        <h4>Res</h4>
                        <table>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>No</td>
                                    <td>Name</td>
                                    <td>Age</td>
                                    <td>Ova</td>
                                    <td>Pot</td>
                                    <td>value</td>
                                    <td>wage</td>
                                </tr>
                            </thead>
                            <tbody>
                                {resList}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
};

export default Team;