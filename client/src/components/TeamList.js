import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import '../App.css';

const TeamList = () => {
    const [ listData, setListData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const [ page, setPage ] = useState(1);
    const [ take, setTake ] = useState(20);

    useEffect(
        () => {
            async function fetchData() {
                try {
                    const skip = (page - 1) * take;
                    const url = `http://localhost:3008/teams?skip=${skip}&take=${take}`;
                    const { data } = await axios.get(url);
                    setListData(data);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        },
        [ page, take ]
    );
    
    const handlechange = (event) => {
        setTake(Number(event.target.value));
    };

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    } else {
        const li = listData.map((team) => {
            const { _id, team_name, team_img, league, league_id, league_nation_code, overall, attack, 
                midfield, defence, transfer_budget } = team;
            return (
                <tr key={_id}>
                    <td className='table-td-img table-team-td-img'><img src={team_img} alt={_id} /></td>
                    <td className='table-td-info table-team-td-info'>
                        <Link to={`/team/${_id}`} >
                            <div>{team_name}</div>
                        </Link>
                        {league_id !== 0 ? 
                            <Link to={`/league/${league_id}`} >
                                <div className='table-td-info-div'>
                                    <span><img src={`https://cdn.sofifa.com/flags/${league_nation_code}.png`} alt={_id} /></span>
                                    <span className='table-td-info-span'>{league}</span>
                                </div>
                            </Link>
                        :
                            <div className='table-td-info-div'>
                                <span><img src={`https://cdn.sofifa.com/flags/${league_nation_code}.png`} alt={_id} /></span>
                                <span className='table-td-info-span'>{league}</span>
                            </div>
                        }
                    </td>
                    <td><span className={`p-${overall}`}>{overall}</span></td>
                    <td><span className={`p-${attack}`}>{attack}</span></td>
                    <td><span className={`p-${midfield}`}>{midfield}</span></td>
                    <td><span className={`p-${defence}`}>{defence}</span></td>
                    <td>{transfer_budget}</td>
                </tr>
            );
        });
        return (
            <div>
                <Pagination 
                    variant='outlined' 
                    shape='rounded'
                    count={Math.ceil(681 / take)} 
                    page={page} 
                    onChange={(e, newPage) => setPage(newPage)}
                />

                <label >
                    <select onChange={handlechange}>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    per page
                </label>

                <table className='table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>ova</th>
                            <th>att</th>
                            <th>mid</th>
                            <th>def</th>
                            <th>transfer budget</th>
                        </tr>
                    </thead>
                    <tbody>
                        {li}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default TeamList;