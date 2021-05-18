import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../App.css';
import '../player.css';

import Canvas from './Canvas';

const Player = (props) => {
    const [ playerData, setPlayerData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(
        () => {
            async function fetchData() {
                try {
                    const url = `http://localhost:3008/players/${props.match.params.id}`;
                    const { data } = await axios.get(url);
                    setPlayerData(data);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        },
        [ props.match.params.id ]
    );

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    } else {
        const {_id, player_url, player_img_url, short_name, long_name, age, dob, height_cm, weight_kg, 
            nationality, nation_code, club_name, club_id, league_name, league_code, overall, potential, 
            value_eur, wage_eur, player_positions, preferred_foot, international_reputation, weak_foot, 
            skill_moves, work_rate, release_clause_eur, player_tags, team_position, 
            team_jersey_number, loaned_from, joined, contract_valid_until, nation_position, 
            nation_jersey_number, pace, shooting, passing, dribbling, defending, physic, 
            gk_diving, gk_handling, gk_kicking, gk_reflexes, gk_speed, gk_positioning, 
            player_traits, attacking_crossing, attacking_finishing, attacking_heading_accuracy, 
            attacking_short_passing, attacking_volleys, skill_dribbling, skill_curve, 
            skill_fk_accuracy, skill_long_passing, skill_ball_control, movement_acceleration, 
            movement_sprint_speed, movement_agility, movement_reactions, movement_balance, 
            power_shot_power, power_jumping, power_stamina, power_strength, power_long_shots, 
            mentality_aggression, mentality_interceptions, mentality_positioning, mentality_vision, 
            mentality_penalties, mentality_composure, defending_standing_tackle, defending_sliding_tackle, 
            goalkeeping_diving, goalkeeping_handling, goalkeeping_kicking, goalkeeping_positioning, 
            goalkeeping_reflexes, ls, st, rs, lw, lf, cf, rf, rw, lam, cam, ram, lm, lcm, cm, rcm, rm, 
            lwb, ldm, cdm, rdm, rwb, lb, lcb, cb, rcb, rb
        } = playerData;

        const positions = player_positions.map((pos) => {
            return <span className={`pos ${pos}`} key={pos}>{pos}</span>;
        });
        const traits = player_traits.map((trait) => {
            return <li key={trait}>{trait}</li>;
        });
        const tags = player_tags.map((tag) => {
            return <li key={tag}>{tag}</li>;
        });
        const gkAbility = ( 
            goalkeeping_diving + 
            goalkeeping_handling + 
            goalkeeping_kicking + 
            goalkeeping_positioning + 
            goalkeeping_reflexes
        ) / 5;
        return (
            <div>
                <h1>{short_name}</h1>
                Data come from<a href={player_url}>Sofifa.com</a>

                <div>
                    <img src={player_img_url} alt={_id} />
                    <span>
                        {long_name}
                        <img width='30px' src={`https://cdn.sofifa.com/flags/${nation_code}.png`} alt={nation_code} />
                        {positions} {age} years old ({dob}) {height_cm}cm {weight_kg}kg
                        <div>overall rating: <span className={`p-${overall}`}>{overall}</span></div>
                        <div>potential: <span className={`p-${potential}`}>{potential}</span></div>
                        <div>value: {value_eur}</div>
                        <div>wage per week: {wage_eur}</div>
                    </span>
                </div>

                <section className='p-map'>
                    <div></div>
                    <div className={`p-${ls.substring(0, 2)}`}>ls<br />{ls}</div>
                    <div className={`p-${st.substring(0, 2)}`}>st<br />{st}</div>
                    <div className={`p-${rs.substring(0, 2)}`}>rs<br />{rs}</div>
                    <div></div>
                        
                    <div className={`p-${lw.substring(0, 2)}`}>lw<br />{lw}</div>
                    <div className={`p-${lf.substring(0, 2)}`}>lf<br />{lf}</div>
                    <div className={`p-${cf.substring(0, 2)}`}>cf<br />{cf}</div>
                    <div className={`p-${rf.substring(0, 2)}`}>rf<br />{rf}</div>
                    <div className={`p-${rw.substring(0, 2)}`}>rw<br />{rw}</div>

                    <div></div>
                    <div className={`p-${lam.substring(0, 2)}`}>lam<br />{lam}</div>
                    <div className={`p-${cam.substring(0, 2)}`}>cam<br />{cam}</div>
                    <div className={`p-${ram.substring(0, 2)}`}>ram<br />{ram}</div>
                    <div></div>

                    <div className={`p-${lm.substring(0, 2)}`}>lm<br />{lm}</div>
                    <div className={`p-${lcm.substring(0, 2)}`}>lcm<br />{lcm}</div>
                    <div className={`p-${cm.substring(0, 2)}`}>cm<br />{cm}</div>
                    <div className={`p-${rcm.substring(0, 2)}`}>rcm<br />{rcm}</div>
                    <div className={`p-${rm.substring(0, 2)}`}>rm<br />{rm}</div>

                    <div className={`p-${lwb.substring(0, 2)}`}>lwb<br />{lwb}</div>
                    <div className={`p-${ldm.substring(0, 2)}`}>ldm<br />{ldm}</div>
                    <div className={`p-${cdm.substring(0, 2)}`}>cdm<br />{cdm}</div>
                    <div className={`p-${rdm.substring(0, 2)}`}>rdm<br />{rdm}</div>
                    <div className={`p-${rwb.substring(0, 2)}`}>rwb<br />{rwb}</div>

                    <div className={`p-${lb.substring(0, 2)}`}>lb<br />{lb}</div>
                    <div className={`p-${lcb.substring(0, 2)}`}>lcb<br />{lcb}</div>
                    <div className={`p-${cb.substring(0, 2)}`}>cb<br />{cb}</div>
                    <div className={`p-${rcb.substring(0, 2)}`}>rcb<br />{rcb}</div>
                    <div className={`p-${rb.substring(0, 2)}`}>rb<br />{rb}</div>

                    <div></div>
                    <div></div>
                    {player_positions[0] === 'GK' ? 
                        <div className={`p-${overall}`}>gk<br />{overall}</div>
                    : 
                        <div className={`p-${Math.floor(gkAbility)}`}>gk<br />{Math.floor(gkAbility)}</div>
                    }
                    <div></div>
                    <div></div>
                </section>
                <section>
                    {player_positions[0] === 'GK' ? 
                        <Canvas
                            isgk={1}
                            botright={gk_kicking}
                            bot={gk_reflexes}
                            botleft={gk_speed}
                            topleft={gk_positioning}
                            top={gk_diving}
                            topright={gk_handling}
                        />
                    : 
                        <Canvas
                            botright={physic}
                            bot={defending}
                            botleft={pace}
                            topleft={dribbling}
                            top={passing}
                            topright={shooting}
                        />
                    }
                </section>

                <hr />

                <div className='player-card-section'>
                    <div className='player-card'>
                        <h4>profile</h4>
                        <div>preferred foot: {preferred_foot}</div>
                        <div>international reputation: {international_reputation}</div>
                        <div>weak foot: {weak_foot}</div>
                        <div>skill moves: {skill_moves}</div>
                        <div>work rate: {work_rate}</div>
                        <div>release clause: {release_clause_eur}</div>
                    </div>
                    {player_tags.length > 1 && 
                        <div className='player-card'>
                            <h4>player specialties</h4>
                            <ul>{tags}</ul>
                        </div>
                    }
                    <div className='player-card'>
                        <Link to={`/team/${club_id}`}><h4>{club_name}</h4></Link>
                        <div>
                            <span>
                                <img width='30px' src={`https://cdn.sofifa.com/flags/${league_code}.png`} alt={club_id} />
                            </span>
                            <span>{league_name}</span>
                            <span>
                                <img width='30px' src={`https://cdn.sofifa.com/teams/${club_id}/120.png`} alt={club_id} />
                            </span>
                        </div>
                        <div>position: <span className={`pos ${team_position}`}>{team_position}</span></div>
                        <div>jersey number: {team_jersey_number}</div>
                        {loaned_from && 
                            <div>loaned from: {loaned_from}</div>
                        }
                        {!loaned_from && 
                            <div>joined: {joined}</div>
                        }
                        <div>contract valid until: {contract_valid_until}</div>
                    </div>
                    {nation_position && 
                        <div className='player-card'>
                            <h4>{nationality}</h4>
                            <img width='30px' src={`https://cdn.sofifa.com/flags/${nation_code}.png`} alt={nation_code} />
                            <div>position: <span className={`pos ${team_position}`}>{nation_position}</span></div>
                            <div>jersey number: {nation_jersey_number}</div>
                        </div>
                    }
                </div>

                <hr />

                <div className='player-ability'>
                    <div className='player-ability-card'>
                        <h5>Attacking</h5>
                        <ul>
                            <li>
                                <span className={`p-${attacking_crossing}`}>{attacking_crossing}</span>
                                <span>Crossing</span>
                            </li>
                            <li>
                                <span className={`p-${attacking_finishing}`}>{attacking_finishing}</span>
                                <span>Finishing</span>
                            </li>
                            <li>
                                <span className={`p-${attacking_heading_accuracy}`}>{attacking_heading_accuracy}</span>
                                <span>Heading Accuracy</span>
                            </li>
                            <li>
                                <span className={`p-${attacking_short_passing}`}>{attacking_short_passing}</span>
                                <span>Short Passing</span>
                            </li>
                            <li>
                                <span className={`p-${attacking_volleys}`}>{attacking_volleys}</span>
                                <span>Volleys</span>
                            </li>
                        </ul>
                    </div>
                    <div className='player-ability-card'>
                        <h5>Skill</h5>
                        <ul>
                            <li>
                                <span className={`p-${skill_dribbling}`}>{skill_dribbling}</span>
                                <span>Dribbling</span>
                            </li>
                            <li>
                                <span className={`p-${skill_curve}`}>{skill_curve}</span>
                                <span>Curve</span>
                            </li>
                            <li>
                                <span className={`p-${skill_fk_accuracy}`}>{skill_fk_accuracy}</span>
                                <span>FK Accuracy</span>
                            </li>
                            <li>
                                <span className={`p-${skill_long_passing}`}>{skill_long_passing}</span>
                                <span>Long Passing</span>
                            </li>
                            <li>
                                <span className={`p-${skill_ball_control}`}>{skill_ball_control}</span>
                                <span>Ball Control</span>
                            </li>
                        </ul>
                    </div>
                    <div className='player-ability-card'>
                        <h5>Movement</h5>
                        <ul>
                            <li>
                                <span className={`p-${movement_acceleration}`}>{movement_acceleration}</span>
                                <span>Acceleration</span>
                            </li>
                            <li>
                                <span className={`p-${movement_sprint_speed}`}>{movement_sprint_speed}</span>
                                <span>Sprint Speed</span>
                            </li>
                            <li>
                                <span className={`p-${movement_agility}`}>{movement_agility}</span>
                                <span>Agility</span>
                            </li>
                            <li>
                                <span className={`p-${movement_reactions}`}>{movement_reactions}</span>
                                <span>Reactions</span>
                            </li>
                            <li>
                                <span className={`p-${movement_balance}`}>{movement_balance}</span>
                                <span>Balance</span>
                            </li>
                        </ul>
                    </div>
                    <div className='player-ability-card'>
                        <h5>Power</h5>
                        <ul>
                            <li>
                                <span className={`p-${power_shot_power}`}>{power_shot_power}</span>
                                <span>Shot Power</span>
                            </li>
                            <li>
                                <span className={`p-${power_jumping}`}>{power_jumping}</span>
                                <span>Jumping</span>
                            </li>
                            <li>
                                <span className={`p-${power_stamina}`}>{power_stamina}</span>
                                <span>Stamina</span>
                            </li>
                            <li>
                                <span className={`p-${power_strength}`}>{power_strength}</span>
                                <span>Strength</span>
                            </li>
                            <li>
                                <span className={`p-${power_long_shots}`}>{power_long_shots}</span>
                                <span>Long Shots</span>
                            </li>
                        </ul>
                    </div>
                    <div className='player-ability-card'>
                        <h5>Mentality</h5>
                        <ul>
                            <li>
                                <span className={`p-${mentality_aggression}`}>{mentality_aggression}</span>
                                <span>Aggression</span>
                            </li>
                            <li>
                                <span className={`p-${mentality_interceptions}`}>{mentality_interceptions}</span>
                                <span>Interceptions</span>
                            </li>
                            <li>
                                <span className={`p-${mentality_positioning}`}>{mentality_positioning}</span>
                                <span>Positioning</span>
                            </li>
                            <li>
                                <span className={`p-${mentality_vision}`}>{mentality_vision}</span>
                                <span>Vision</span>
                            </li>
                            <li>
                                <span className={`p-${mentality_penalties}`}>{mentality_penalties}</span>
                                <span>Penalties</span>
                            </li>
                            <li>
                                <span className={`p-${mentality_composure}`}>{mentality_composure}</span>
                                <span>Composure</span>
                            </li>
                        </ul>
                    </div>
                    <div className='player-ability-card'>
                        <h5>Defending</h5>
                        <ul>
                            <li>
                                <span className={`p-${defending_standing_tackle}`}>{defending_standing_tackle}</span>
                                <span>Standing tackle</span>
                            </li>
                            <li>
                                <span className={`p-${defending_sliding_tackle}`}>{defending_sliding_tackle}</span>
                                <span>Sliding tackle</span>
                            </li>
                        </ul>
                    </div>
                    <div className='player-ability-card'>
                        <h5>Goalkeeping</h5>
                        <ul>
                            <li>
                                <span className={`p-${goalkeeping_diving}`}>{goalkeeping_diving}</span>
                                <span>Diving</span>
                            </li>
                            <li>
                                <span className={`p-${goalkeeping_handling}`}>{goalkeeping_handling}</span>
                                <span>Handling</span>
                            </li>
                            <li>
                                <span className={`p-${goalkeeping_kicking}`}>{goalkeeping_kicking}</span>
                                <span>Kicking</span>
                            </li>
                            <li>
                                <span className={`p-${goalkeeping_positioning}`}>{goalkeeping_positioning}</span>
                                <span>Positioning</span>
                            </li>
                            <li>
                                <span className={`p-${goalkeeping_reflexes}`}>{goalkeeping_reflexes}</span>
                                <span>Reflexes</span>
                            </li>
                        </ul>
                    </div>
                    {player_traits.length > 1 && 
                        <div className='player-ability-card'>
                            <h5>Traits</h5>
                            <ul>{traits}</ul>
                        </div>
                    }
                </div>
            </div>
        );
    }
};

export default Player;