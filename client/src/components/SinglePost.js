import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { AuthContext } from "../firebase/Auth";
import '../App.css';
import '../player.css';
import { GiSoccerBall } from "react-icons/gi";

const Player = (props) => {
    // const { currentUser } = useContext(AuthContext);
    const [ playerData, setPlayerData ] = useState(undefined);

    const [ loading, setLoading ] = useState(true);

    useEffect(
        () => {
            async function fetchData() {
                try {
                    const url = `http://localhost:3008/posts/${props.match.params.id}`;
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
            <div className='loading'>
                <GiSoccerBall className="soccer-logo" /><h1>Loading...</h1>
            </div>
        );
    } else {
        const {_id, height, weight, preferred, weakFoot, skillMove, reputation, attackingWorkRate,
            commonName, age, position, potential,rating,
            value, wage, attack_crossing, attack_fishing, attack_heading_accuracy,
            attack_short_passing, attack_volleys, skill_dribbling, skill_fk_accuracy,
            skill_long_passing, skill_ball_control, movement_acceleration,
            movement_sprint_speed, movement_agility, movement_reactions, movement_balance,
            power_shot_power, power_jumping, power_stamina, power_strength, power_long_shots,
            mentality_aggression, mentality_Interceptions, mentality_positioning, mentality_vision,
            mentality_penalties, mentality_composure, defending_standing_tackle, defending_sliding_tackle,
            goalkeeping_diving, goalkeeping_handling, goalkeeping_kicking, goalkeeping_positioning,
            goalkeeping_reflexes,
        } = playerData;

        return (
            <div>
                <h1>{commonName}</h1>

                <div>
                    <img src={`http://localhost:3008/img/${props.match.params.id}`} alt={_id} />
                    <span>
                        {commonName}
                        {position} {age} years old {height}cm {weight}kg
                        <div>overall rating: <span className={`p-${rating}`}>{rating}</span></div>
                        <div>potential: <span className={`p-${potential}`}>{potential}</span></div>
                        <div>value: {value}</div>
                        <div>wage per week: {wage}</div>
                    </span>
                </div>



                <hr />

                <div className='player-card-section'>
                    <div className='player-card'>
                        <h4>profile</h4>
                        <div>preferred foot: {preferred}</div>
                        <div>international reputation: {reputation}</div>
                        <div>weak foot: {weakFoot}</div>
                        <div>skill moves: {skillMove}</div>
                        <div>Attacking Work Rate: {attackingWorkRate}</div>

                    </div>
                </div>

                <hr />

                <div className='player-ability'>
                    <div className='player-ability-card'>
                        <h5>Attacking</h5>
                        <ul>
                            <li>
                                <span className={`p-${attack_crossing}`}>{attack_crossing}</span>
                                <span>Crossing</span>
                            </li>
                            <li>
                                <span className={`p-${attack_fishing}`}>{attack_fishing}</span>
                                <span>Finishing</span>
                            </li>
                            <li>
                                <span className={`p-${attack_heading_accuracy}`}>{attack_heading_accuracy}</span>
                                <span>Heading Accuracy</span>
                            </li>
                            <li>
                                <span className={`p-${attack_short_passing}`}>{attack_short_passing}</span>
                                <span>Short Passing</span>
                            </li>
                            <li>
                                <span className={`p-${attack_volleys}`}>{attack_volleys}</span>
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
                                <span className={`p-${mentality_Interceptions}`}>{mentality_Interceptions}</span>
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

                </div>
            </div>
        );
    }
};

export default Player;
