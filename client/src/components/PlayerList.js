import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import { Pagination } from '@material-ui/lab';
import '../App.css';

const PlayerList = (props) => {
    const [ listData, setListData ] = useState(undefined);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ page, setPage ] = useState(1);
    const [ take, setTake ] = useState(50);
    const [ error, setError ] = useState(false)

    useEffect(
        () => {
            async function fetchData() {
                try {
                    const skip = (page - 1) * take;
                    const url = `http://localhost:3008/players?skip=${skip}&take=${take}`;
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

    useEffect(
        () => {
            async function fetchData() {
                const searchTermFromUrl = getSearchTerm();
                if (searchTerm || JSON.stringify(searchTermFromUrl) !== "{}") {
                    try {
                        console.log('searchTerm:', searchTerm);
                        const url = `http://localhost:3008/players${window.location.search}`;
                        console.log(url);
                        const { data } = await axios.get(url);
                        data.length === 0 ? setError(true) : setError(false);
                        setListData(data);
                        setLoading(false);
                    } catch (error) {
                        console.log(error);
                    }
                }
            };
            fetchData();
        },
        [ searchTerm, props.match.location ]
    );

    const getSearchTerm = () => {
        const result = {}
        const queryString = window.location.search
        const reg = /[?&][^?&]+=[^?&]+/g
        const found = queryString.match(reg)

        if(found) {
            found.forEach(item => {
                let temp = item.substring(1).split('=');
                let key = temp[0];
                let value = temp[1];
                result[key] = value;
            })
        }
        return result;
    }

    const searchValue = value => setSearchTerm(value);
    const handlechange = event => setTake(Number(event.target.value));

    if(error) {
		return (
            <section className='player-list-section'>
                <div>
                    <SearchForm searchValue={searchValue} className='playerComponent'/>
                </div>
                <div>
                    <h1>No players with those terms</h1>
                </div>
            </section>
		);
	}

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    } else {
        const playerTableRow = listData.map((player) => {
            const { _id, short_name, player_img_url, age, nation_code, club_name, club_id, overall, potential, 
                player_positions, joined, value_eur, wage_eur, contract_valid_until, loaned_from, nationality 
            } = player;
            const club = club_name ? (club_name.length > 22 ? club_name.substring(0, 19)+'...' : club_name) : null;
            const positions = player_positions.map((pos) => {
                return <span className={`pos ${pos}`} key={pos}>{pos}</span>;
            });
            let contract;
            if (!club) {
                contract = <div className='table-td-info-contract-free'>Free</div>;
            } else if (loaned_from) {
                contract = <div className='table-td-info-contract-loan'>On Loan</div>;
            } else {
                contract = <div className='table-td-info-contract'>{`${joined.match(/\d{4}/)}~${contract_valid_until}`}</div>;
            }
            return (
                <tr key={_id}>
                    <td className='table-td-img'><img src={player_img_url} alt={_id} /></td>
                    <td className='table-td-info'>
                        <Link to={`/player/${_id}`} >
                            <div className='table-td-info-div'>
                                <span>
                                    <img src={`https://cdn.sofifa.com/flags/${nation_code}.png`} alt={nation_code} />
                                </span>
                                <span>{short_name}</span>
                            </div>
                            <div>{positions}</div>
                        </Link>
                    </td>
                    <td>{age}</td>
                    <td><span className={`p-${overall}`}>{overall}</span></td>
                    <td><span className={`p-${potential}`}>{potential}</span></td>
                    <td className='table-td-info table-player-teaminfo'>
                        {club ? (
                            <Link to={`/team/${club_id}`}>
                                <div className='table-td-info-div'>
                                    <span>
                                        <img src={`https://cdn.sofifa.com/teams/${club_id}/120.png`} alt={club_id} />
                                    </span>
                                    <span>{club}</span>
                                </div>
                            </Link>
                        )
                        : 
                            <div className='table-td-info-div'>
                                <span>
                                    <img src={`https://cdn.sofifa.com/flags/${nation_code}.png`} alt={nation_code} />
                                </span>
                                <span>{nationality}</span>
                            </div>
                        }
                        {contract}
                    </td>
                    <td>{value_eur}</td>
                    <td>{wage_eur}</td>
                </tr>
            );
        });
        return (
            <section className='player-list-section'>
                <div>
                    <SearchForm searchValue={searchValue} className='playerComponent'/>
                </div>
                
                <div>
                    {window.location.search && 
                        <div className='list-nav'>
                            <Pagination 
                                variant='outlined' 
                                shape='rounded'
                                count={Math.ceil(18944 / take)} 
                                page={page} 
                                onChange={(e, newPage) => setPage(newPage)}
                            />
                            <div className='list-select'>
                                <select id='select' onChange={handlechange}>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                </select>
                                <label>per page</label>
                            </div>
                        </div>
                    }

                    <table className='table'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Ova</th>
                                <th>Pot</th>
                                <th>team & contract</th>
                                <th>value</th>
                                <th>wage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerTableRow}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
};

export default PlayerList;

