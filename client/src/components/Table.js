import React from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import '../App.css';

const Table = (props) => {
    let res = [];
    const history = useHistory();
    const handleClick = async (event) => {
        let name = event.target.innerHTML;
        console.log(name);
        if (props.id === 39 && name === 'Wolves') {
            name = 'Wolverhampton Wanderers';
        } else if (props.id === 40&& name === 'QPR') {
            name = 'Queens Park Rangers';
        } else if (props.id === 61) {
            if (name === 'Lyon') {
                name = 'Olympique Lyonnais';
            } else if (name === 'Rennes') {
                name = 'Stade Rennais FC';
            } else if (name === 'Nimes') {
                name = 'Nîmes Olympique';
            }
        } else if (props.id === 140 && name === 'Alaves') {
            name = 'Deportivo Alavés';
        } else if (props.id === 78) {
            if (name === 'Hertha Berlin') {
                name = 'Hertha BSC';
            } else if (name === 'FC Koln') {
                name = '1. FC Köln';
            }
        } else if (props.id === 128) {
            if (name === 'Lanus') {
                name = 'Club Atlético Lanús';
            } else if (name === 'Talleres Cordoba') {
                name = 'Club Atlético Talleres';
            }
        } else if (props.id === 188) {
            if (name === 'Western Sydney ...') {
                name = 'Western Sydney Wanderers';
            } else if (name === 'Western United') {
                name = 'Western United FC';
            }
        } else if (props.id === 144 && name === 'St. Truiden') {
            name = 'Sint-Truidense VV';
        } else if (props.id === 71) {
            if (name === 'Atletico Parana...') {
                name = 'Club Athletico Paranaense';
            } else if (name === 'Atletico Goiani...') {
                name = 'Atlético Clube Goianiense';
            } else if (name === 'Sport Recife') {
                name = 'Oceânico FC';
            }
        } else if (props.id === 169) {
            if (name === 'Guangzhou Everg...') {
                name = 'Guangzhou Evergrande Taobao FC';
            } else if (name === 'Shanghai Shenhua') {
                name = 'Shanghai Greenland Shenhua FC';
            } else if (name === 'Guangzhou R&amp;F') {
                name = 'Guangzhou R&F FC';
            }
        } else if (props.id === 119) {
            if (name === 'Brondby') {
                name = 'Brøndby IF';
            } else if (name === 'FC Copenhagen') {
                name = 'FC København';
            } else if (name === 'Sonderjyske') {
                name = 'SønderjyskE';
            }
        } else if (props.id === 62 && name === 'Niort') {
            name = 'Chamois Niortais Football Club';
        } else if (props.id === 79) {
            if (name === 'FC Heidenheim') {
                name = '1. FC Heidenheim 1846';
            } else if (name === 'FC Nurnberg') {
                name = '1. FC Nürnberg';
            }
        } else if (props.id === 80) {
            if (name === 'FC Saarbrucken') {
                name = '1. FC Saarbrücken';
            } else if (name === 'FC Magdeburg') {
                name = '1. FC Magdeburg';
            } else if (name === 'FC Viktoria Koln') {
                name = 'Viktoria Köln';
            } else if (name === 'FC Kaiserslautern') {
                name = '1. FC Kaiserslautern';
            }
        } else if (props.id === 307) {
            if (name === 'Al-Hilal Saudi FC') {
                name = 'Al Hilal';
            } else if (name === 'Al-Nassr') {
                name = 'Al Nassr';
            } else if (name === 'Al Wehda Club') {
                name = 'Al Wehda';
            } else if (name === 'Al-Faisaly FC') {
                name = 'Al Faisaly';
            } else if (name === 'Al-Raed') {
                name = 'Al Raed';
            } else if (name === 'Al-Ettifaq') {
                name = 'Ettifaq FC';
            } else if (name === 'Al Taawon') {
                name = 'Al Taawoun';
            } else if (name === 'Al-Ittihad FC') {
                name = 'Al Ittihad';
            } else if (name === 'Al-Fateh') {
                name = 'Al Fateh';
            } else if (name === 'Al-Fayha') {
                name = 'Al Fayha';
            } else if (name === 'Al-Hazm') {
                name = 'Al Hazem';
            } else if (name === 'Dhamk') {
                name = 'Damac FC';
            }
        } else if (props.id === 113) {
            if (name === 'Malmo FF') {
                name = 'Malmö FF';
            } else if (name === 'Hammarby FF') {
                name = 'Hammarby IF';
            } else if (name === 'kalmar FF') {
                name = 'Kalmar FF';
            }
        } else if (props.id === 203) {
            if (name === 'Besiktas') {
                name = 'Beşiktaş JK';
            } else if (name === 'Goztepe') {
                name = 'Göztepe SK';
            } else if (name === 'Istanbul Basaks...') {
                name = 'Medipol Başakşehir FK';
            }
        } else if (props.id === 141) {
            if (name === 'Leganes') {
                name = 'CD Leganés';
            } else if (name === 'Mirandes') {
                name = 'CD Mirandés';
            }
        } else if (props.id === 207) {
            if (name === 'FC ST. Gallen') {
                name = 'FC St. Gallen';
            } else if (name === 'FC Zurich') {
                name = 'FC Zürich';
            }
        } else if (props.id === 106 && name === 'Wisla Plock') {
            name = 'Wisła Płock';
        } else if (props.id === 103) {
            if (name === 'Stabaek') {
                name = 'Stabæk Fotball';
            } else if (name === 'Stromsgodset') {
                name = 'Strømsgodset IF';
            } else if (name === 'Mjondalen') {
                name = 'Mjøndalen IF';
            }
        }
        name = encodeURIComponent(name);
        try {
            const url = `http://localhost:3008/teams/${props.id}/${name}`;
            const { data } = await axios.get(url);
            history.push({ pathname: `/team/${data._id}` });
        } catch (error) {
            console.log(error);
        }
    }
    let statement = null;
    for (let i = 0; i < props.standings.length; i++) {
        if (i === 0 && (
            props.id === 119 || 
            props.id === 179 || 
            props.id === 218 || 
            props.id === 283 || 
            props.id === 292)
        ) {
            statement = <h2 className='standings-statement'>championship round</h2>;
        } else if (i === 0 && props.id === 262) {
            statement = <h2 className='standings-statement'>clausura</h2>;
        } else if (i === 1 && (
            props.id === 119 || 
            props.id === 179 || 
            props.id === 218 || 
            props.id === 283 || 
            props.id === 292)
        ) {
            statement = <h2 className='standings-statement'>relegation round</h2>;
        } else if (i === 1 && props.id === 262) {
            statement = <h2 className='standings-statement'>apertura</h2>;
        } else if (i === 2 && (
            props.id === 119 || 
            props.id === 144 || 
            props.id === 179 || 
            props.id === 218 || 
            props.id === 283 || 
            props.id === 292 )
        ) {
            statement = <h2 className='standings-statement'>regular season</h2>;
        } else if (i === 4 && props.id === 128) {
            statement = <h2 className='standings-statement'>first stage</h2>;
        } else if (i === 6 && props.id === 253) {
            statement = <h2 className='standings-statement'>regular season (eastern)</h2>;
        } else if (i === 7 && props.id === 253) {
            statement = <h2 className='standings-statement'>regular season (western)</h2>;
        } else {
            statement = null;
        }
        res.push(
        <div key={i}>
            <div>{statement}</div>
            <table className='standings-table'>
                <thead>
                    <tr>
                        <th></th>
                        <th colSpan="2">Club</th>
                        <th className='standings-d4'>MP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th className='standings-d'>GF</th>
                        <th className='standings-d'>GA</th>
                        <th className='standings-d3'>GD</th>
                        <th>Pts</th>
                        <th className='standings-d2'>{i < 6 && props.id === 253 ? 'Last 3' : 'Last 5'}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.standings[i].map(({ all, description, goalsDiff, points, form, rank, team }) => {
                        const name = team.name.length > 18 ? team.name.substring(0, 15)+'...' : team.name;
                        const lastFive = [];
                        for (let i = 0; i < form.length; i++) {
                            if (form[i] === 'W') {
                                lastFive.push(<span key={i}><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iV2luIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzNBQTc1NyIgY3g9IjgiIGN5PSI4IiByPSI4Ij48L2NpcmNsZT4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI2LjQgOS43NiA0LjMyIDcuNjggMy4yIDguOCA2LjQgMTIgMTIuOCA1LjYgMTEuNjggNC40OCI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==" alt=""/></span>);
                            } else if (form[i] === 'L') {
                                lastFive.push(<span key={i}><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTG9zcyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiNFQTQzMzUiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgOC4wMDAwMDApIHJvdGF0ZSgtMzE1LjAwMDAwMCkgdHJhbnNsYXRlKC04LjAwMDAwMCwgLTguMDAwMDAwKSAiIHBvaW50cz0iMTIgOC44IDguOCA4LjggOC44IDEyIDcuMiAxMiA3LjIgOC44IDQgOC44IDQgNy4yIDcuMiA3LjIgNy4yIDQgOC44IDQgOC44IDcuMiAxMiA3LjIiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=" alt=""/></span>);
                            } else {
                                lastFive.push(<span key={i}><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRHJhdyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiM5QUEwQTYiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjUgNyAxMSA3IDExIDkgNSA5Ij48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K" alt=""/></span>);
                            }
                        }
                        let tableClass = null;
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
                                <td className='standings-td-name' onClick={handleClick} >{name}</td>
                                <td className='standings-d4'>{all.played}</td>
                                <td>{all.win}</td>
                                <td>{all.draw}</td>
                                <td>{all.lose}</td>
                                <td className='standings-d'>{all.goals.for}</td>
                                <td className='standings-d'>{all.goals.against}</td>
                                <td className='standings-d3'>{goalsDiff}</td>
                                <td>{points}</td>
                                <td className='standings-d2 standings-last-five'>{lastFive}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {i === props.standings.length - 1 && <div><br /><br /><br /><br /></div>}
        </div>
        );
    }
    return res;
};

export default Table;

// FC JuareZ :FC Juárez
// Club Queretaro: Club Necaxa
// CS Universitate…: Universitatea Craiova
// Arges Pitesti: FC Argeș

// 262: Club América postman cannot get correct data. 
// FC JuareZ -> Mazatlán FC should be FC Juárez
// Club Queretaro-> Club Necaxa

// 283
// CS Universitate…: Universitatea Craiova
// Arges Pitesti: FC Argeș
