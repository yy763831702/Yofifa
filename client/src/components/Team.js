import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

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

    const buildPlayerTableList = (player) => {
        const { _id, short_name, player_img_url, age, nation_code, overall, value_eur, 
            wage_eur, player_positions, team_position } = player;
        const positions = player_positions.map((pos) => {
            return <span className={`pos ${pos}`} key={pos}>{pos}</span>;
        });
        return (
            <tr key={_id}>
                <td><img width="60px" src={player_img_url} alt={_id} /></td>
                <td>
                    <img width='30px' src={`https://cdn.sofifa.com/flags/${nation_code}.png`} alt={_id} />
                    <Link to={`/player/${_id}`} >{short_name}</Link>
                    <br />
                    <span>
                        {team_position !== 'SUB' && team_position !== 'RES' &&
                            <span>( <span className={`pos ${team_position}`}>{team_position}</span>) </span>
                        }
                        {positions}
                    </span>
                </td>
                <td>{age}</td>
                <td><span className={`p-${overall}`}>{overall}</span></td>
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
                                <span className='team-lineup-name'>{short_name}</span>
                            </Link>
                        </div>
                    </div>
                );
        });
        const lineupList = start.map((player) => {
            return buildPlayerTableList(player);
        });
        const subList = sub.map((player) => {
            return buildPlayerTableList(player);
        });
        const resList = res.map((player) => {
            return buildPlayerTableList(player);
        });
        return (
            <div>
                <div>Data come from <a href={team_url}>Sofifa.com</a></div>
                <img src={team_img} alt={_id} />
                <div>
                    <h1>{team_name}</h1>
                    <img width='30px' src={`https://media.api-sports.io/flags/${league_nation_code}.svg`} alt={league_nation_code}/>
                    {league_id !== 0 ? <Link to={`/standings/${league_id}`}>{league}</Link> : <span>{league}</span>}
                </div>
                <div>
                    <span className={`p-${overall}`}>{overall}</span>overall
                    <span className={`p-${attack}`}>{attack}</span>attack
                    <span className={`p-${midfield}`}>{midfield}</span>midfield
                    <span className={`p-${defence}`}>{defence}</span>defence
                </div>

                <hr />

                <section className='team-card-section'>
                    <div className='team-card'>
                        <h2>Information</h2>
                        <div>international prestige: {international_prestige}</div>
                        <div>domestic prestige: {domestic_prestige}</div>
                        <div>transfer budget: {transfer_budget}</div>
                        <div>starting XI Average Age: {startingXIAverAge}</div>
                        <div>whole Team Average Age: {wholeTeamAverAge}</div>
                    </div>
                    <div className='team-card'>
                        <h2>Tactics</h2>
                        <h3>defensive style: {defensive_style}</h3>
                        <div>team width: {team_width}</div>
                        <div>depth: {depth}</div>
                        <h3>offensive style: {offensive_style}</h3>
                        <div>width: {width}</div>
                        <div>players in box: {players_in_box}</div>
                    </div>
                    {_id !== 45 && _id !== 52 && 
                        <div className='team-card'>
                            <h2>Kits</h2>
                            <span>
                                <img src={`https://cdn.sofifa.com/kits/${_id}/21_0.png`} alt={_id} />Home Kit
                            </span>
                            <span>
                                <img src={`https://cdn.sofifa.com/kits/${_id}/21_1.png`} alt={_id} />Away Kit
                            </span>
                            <span>
                                <img src={`https://cdn.sofifa.com/kits/${_id}/21_2.png`} alt={_id} />Goalkeeper Kit
                            </span>
                        </div>
                    }
                </section>

                <div className={`t-map`}>{lineUpMap}</div>

                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Name</td>
                            <td>Age</td>
                            <td>Ova</td>
                            <td>value</td>
                            <td>wage</td>
                        </tr>
                    </thead>
                    <tbody>
                        {lineupList}
                    </tbody>
                </table>

                <hr />
                
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Name</td>
                            <td>Age</td>
                            <td>Ova</td>
                            <td>value</td>
                            <td>wage</td>
                        </tr>
                    </thead>
                    <tbody>
                        {subList}
                    </tbody>
                </table>

                {resList.length > 0 && <hr />}

                {resList.length > 0 && 
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>Name</td>
                                <td>Age</td>
                                <td>Ova</td>
                                <td>value</td>
                                <td>wage</td>
                            </tr>
                        </thead>
                        <tbody>
                            {resList}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
};

export default Team;