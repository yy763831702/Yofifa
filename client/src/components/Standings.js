import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import Table from './Table';
import '../App.css';
import { GiSoccerBall } from "react-icons/gi";

const Standings = (props) => {
    const [ listData, setListData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const history = useHistory();
    
    useEffect(
        () => {
            async function fetchData() {
                try {
                    const url = `http://localhost:3008/standings/${props.match.params.id}`;
                    const { data: { league } } = await axios.get(url);
                    setListData(league);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        },
        [ props.match.params.id ]
    );

    const handlechange = event => {
        history.push({ pathname: `/standings/${event.target.value}` });
    }
    
    if (loading) {
        return (
            <div className='loading'>
                <GiSoccerBall className="soccer-logo" /><h1>Loading...</h1>
            </div>
        );
    } else if (listData === undefined) {
        return (
            <div>
                <h2>404</h2>
            </div>
        );
    } else {
        const { id, logo, name } = listData;
        const season = listData.season === 2020 ? '2020-21' : '2019-20';
        return (
            <div>
                <div className='standings-select'>
                    <label className='standings-label' htmlFor='select'>Select League:</label>
                    <div>
                        <select id='select' onChange={handlechange}>
                            <optgroup label='Top 5'>
                                <option value="39">English Premier League</option>
                                <option value="61">French Ligue 1</option>
                                <option value="78">German 1. Bundesliga</option>
                                <option value="135">Italian Serie A</option>
                                <option value="140">Spain Primera Division</option>
                            </optgroup>
                            <optgroup label='A-Z'>
                                <option value="128">Argentina Primera División</option>
                                <option value="188">Australian Hyundai A-League</option>
                                <option value="218">Austrian Football Bundesliga</option>
                                <option value="144">Belgian Jupiler Pro League</option>
                                <option value="71">Campeonato Brasileiro Série A</option>
                                <option value="169">Chinese Super League</option>
                                <option value="119">Danish Superliga</option>
                                <option value="39">English Premier League</option>
                                <option value="40">English League Championship (2)</option>
                                <option value="41">English League One (3)</option>
                                <option value="42">English League Two (4)</option>
                                <option value="61">French Ligue 1</option>
                                <option value="62">French Ligue 2 (2)</option>
                                <option value="78">German 1. Bundesliga</option>
                                <option value="79">German 2. Bundesliga (2)</option>
                                <option value="80">German 3. Bundesliga (3)</option>
                                <option value="88">Holland Eredivisie</option>
                                <option value="135">Italian Serie A</option>
                                <option value="98">Japanese J. League Division 1</option>
                                <option value="292">Korean K League 1</option>
                                <option value="262">Mexican Liga MX</option>
                                <option value="103">Norwegian Eliteserien</option>
                                <option value="106">Polish T-Mobile Ekstraklasa</option>
                                <option value="94">Portuguese Liga ZON SAGRES</option>
                                <option value="357">Rep. Ireland Airtricity League</option>
                                <option value="283">Romanian Liga I</option>
                                <option value="307">Saudi Abdul L. Jameel League</option>
                                <option value="179">Scottish Premiership</option>
                                <option value="113">Swedish Allsvenskan</option>
                                <option value="207">Swiss Super League</option>
                                <option value="140">Spain Primera Division</option>
                                <option value="141">Spanish Segunda División (2)</option>
                                <option value="203">Turkish Süper Lig</option>
                                <option value="253">USA Major League Soccer</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
                <div className='standings-header'>
                    <span><img src={logo} alt={id} /></span>
                    <h1>
                        <span>{name}</span>
                        <span>{season}</span>
                    </h1>
                </div>
                <Table standings={listData.standings} id={id} />
            </div>
        );
    }
};

export default Standings;