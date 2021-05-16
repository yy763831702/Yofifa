import React from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import '../App.css';

const Table = (props) => {
    let res = [];
    let key = 0;
    let tableClass;
    const history = useHistory();
    const handleClick = async (event) => {
        const name = encodeURIComponent(event.target.innerHTML);
        try {
            const url = `http://localhost:3008/teams/${props.id}/${name}`;
            const { data } = await axios.get(url);
            console.log(data.team_name);
            history.push({ pathname: `/team/${data._id}` });
        } catch (error) {
            console.log(error);
        }
    }

    props.standings.forEach(e => {
        res.push(
            <table className='standings' key={key++}>
                <thead>
                    <tr>
                        <th></th>
                        <th colSpan="2">Club</th>
                        <th>MP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th className='standings-d'>GF</th>
                        <th className='standings-d'>GA</th>
                        <th className='standings-d'>GD</th>
                        <th>Pts</th>
                        <th className='standings-d'>Last 5</th>
                    </tr>
                </thead>
                <tbody>
                    {e.map(({ all, description, goalsDiff, points, form, rank, team }) => {
                        tableClass = null;
                        if (description) {
                            if (description.includes('Champions') || 
                                description.includes('Promotion') || 
                                description.includes('Libertadores') ||
                                description.includes('Final Series')
                            ) {
                                tableClass = 'standings-pro';
                            }
                            if (description.includes('Play')) {
                                tableClass = 'standings-pla';
                            }
                            if (description.includes('Europa') || description.includes('Sudamericana')) {
                                tableClass = 'standings-euro';
                            }
                            if (description.includes('Conference')) {
                                tableClass = 'standings-conf';
                            }
                            if (description.includes('Relegation')) {
                                tableClass = 'standings-rele';
                            }
                        }
                        return (
                            <tr className={tableClass} key={rank}>
                                <td className='standings-td-rank'>{rank}</td>
                                <td><img className='standings-img' src={team.logo} alt={team.id} /></td>
                                <td className='standings-td-name' onClick={handleClick} >{team.name}</td>
                                <td>{all.played}</td>
                                <td>{all.win}</td>
                                <td>{all.draw}</td>
                                <td>{all.lose}</td>
                                <td className='standings-d'>{all.goals.for}</td>
                                <td className='standings-d'>{all.goals.against}</td>
                                <td className='standings-d'>{goalsDiff}</td>
                                <td>{points}</td>
                                <td className='standings-d'>{form}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    });
    return res;
};

export default Table;