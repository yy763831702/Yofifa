import React from 'react';
// import { useHistory } from "react-router";
import axios from 'axios';
import '../App.css';

const Table = (props) => {
    let res = [];
    // const history = useHistory();
    const handleClick = async (event) => {
        const name = encodeURIComponent(event.target.innerHTML);
        try {
            const url = `http://localhost:3008/teams/${props.id}/${name}`;
            const { data } = await axios.get(url);
            console.log('team id:', data._id, 'name:', data.team_name);
            // history.push({ pathname: `/team/${data._id}` });
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



// Wolves: Wolverhampton Wanderers
// Lyon:Olympique Lyonnais
// Rennes: Stade Rennais FC
// Nimes: Nîmes Olympique
// Alaves Alaves: Deportivo Alavés
// Hertha Berlin: Hertha BSC
// FC Koln : 1. FC Köln
// Lanus: Club Atlético Lanús
// Western Sydney: Western Sydney Wanderers
// St. Truiden: Sint-Truidense VV
// Atletico Goiani… : Atlético Clube Goianiense
// Atletico Parana... : Club Athletico Paranaense
// Shanghai Shenhua :Shanghai Greenland Shenhua FC
// FC Nordsjælland, 
// FC Copenhagen: FC København
// Brondby: Brøndby IF
// Sonderjyske: SønderjyskE
// QPR: Queens Park Rangers
// Niort: Chamois Niortais Football Club
// FC Heidenheim : 1. FC Heidenheim 1846
// FC Nurnberg: 1. FC Nürnberg
// FC Saarbrucken: 1. FC Saarbrücken
// FC Magdeburg: 1. FC Magdeburg
// FC Viktoria Koln: Viktoria Köln
// FC Kaiserslautern: 1. FC Kaiserslautern
// FC JuareZ :FC Juárez
// Club Queretaro: Club Necaxa
// Stabaek: Stabæk Fotball
// Stromsgodset: Strømsgodset IF
// Mjondalen:Mjøndalen IF
// Wisla Plock:Wisła Płock
// CS Universitate…: Universitatea Craiova
// Arges Pitesti: FC Argeș
// Al-Hilal Saudi FC: Al Hilal
// Al-Nassr: Al Nassr
// Al Wehda Club: Al Wehda
//  Al-Faisaly FC: Al Faisaly
//  Al-Raed: Al Raed
//  Al-Ettifaq: Ettifaq FC
//  Al-Ittihad FC: Al Ittihad
//  Al Taawon: Al Taawoun 
//  Al-Fateh: Al Fateh
//  Al-Fayha: Al Fayha 
//  Al-Hazm:Al Hazem
// Dhamk: Damac FC
// Malmo FF: Malmö FF,
// Hammarby FF:  Hammarby IF
// kalmar FF:Kalmar FF 
// FC ST. Gallen: FC St. Gallen 
// FC Zurich :FC Zürich
// Leganes: CD Leganés
// Mirandes, C.D. Castellón missing
// Besiktas: Beşiktaş JK
// Goztepe: Göztepe SK
// Istanbul Basaks…: Medipol Başakşehir FK






// 39 wolves

// 39:
// Wolves: Wolverhampton Wanderers

// 61 Lyon:Olympique Lyonnais
// Rennes: Stade Rennais FC

// Nimes: Nîmes Olympique

// 140: Alaves Alaves: Deportivo Alavés

// 78:
// Hertha Berlin- > 1. FC Union Berlin should be Hertha BSC
// FC Koln ->FC Augsburg should be 1. FC Köln

// 128

// Lanus: Club Atlético Lanús


// 188: Western Sydney->Sydney FC should be Western Sydney Wanderers

// 144: St. Truiden: Sint-Truidense VV

// 71: Atletico Goiani…, Atletico Parana... -> Atlético Mineiro should be Club Athletico Paranaense, Atlético Clube Goianiense

// Bragantino, Corinthians missing

// 169 Shanghai Shenhua ->SHANGHAI SIPG should be Shanghai Greenland Shenhua FC

// 119: FC Nordsjælland, 
// FC Copenhagen: FC København
// Brondby: Brøndby IF
// Sonderjyske: SønderjyskE

// 40 
// QPR: Queens Park Rangers


// 62:

// FC Sochaux-Montbéliard postmen -> Pau FC

// Niort: Chamois Niortais Football Club

// 79:
// (FC Heidenheim, FC Nurnberg) -> FC Würzburger Kickers should be -> 1. FC Heidenheim 1846, 1. FC Nürnberg

// 80:

//  (FC Saarbrucken, FC Magdeburg, FC Viktoria Koln, FC Kaiserslautern) -> Hallescher FC  should be 1. FC Saarbrücken, 1. FC Magdeburg, Viktoria Köln, 1. FC Kaiserslautern

// Türkgücü München cannot get valid data from postman

// 262: Club América postman cannot get correct data. 
// FC JuareZ -> Mazatlán FC should be FC Juárez
// Club Queretaro-> Club Necaxa

// 103: FK Bodø/Glimt postman

// Stabaek: Stabæk Fotball
// Stromsgodset: Strømsgodset IF
// Mjondalen:Mjøndalen IF

// 106:
// Wisla Plock:Wisła Płock

// 283
// CS Universitate…: Universitatea Craiova
// Arges Pitesti: FC Argeș

// 307: 
// Al-Hilal Saudi FC, Al-Nassr, Al Wehda Club, Al-Faisaly FC, Al-Raed, Al-Ettifaq, Al-Ittihad FC, Al Taawon, Al-Fateh, Al-Fayha, Al-Hazm-> Al Adalah should be Al Hilal, Al Nassr, Al Wehda, Al Faisaly, Al Raed, Ettifaq FC, Al Ittihad, Al Taawoun, Al Fateh, Al Fayha,Al Hazem

// Dhamk: Damac FC

// 113:
// Malmo FF, Hammarby FF, kalmar FF-> Falkenbergs FF should be Malmö FF, Hammarby IF, Kalmar FF

// 207: 
// FC ST. Gallen, FC Zurich -> FC Vaduz should be FC St. Gallen, FC Zürich

// 141: 
// Leganes: CD Leganés
// Mirandes, C.D. Castellón missing
// Only 20 in teams.

// 203:
// Besiktas: Beşiktaş JK
// Goztepe: Göztepe SK
// Istanbul Basaks…: Medipol Başakşehir FK
// BB Erzurumspor missing 
// Only 20 in teams




