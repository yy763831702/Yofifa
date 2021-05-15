import React, { useState, useEffect } from 'react';
import Search from './Search';
import axios from 'axios';
import '../App.css'

const Players = (props) => {
    const [loading, setLoading] = useState(true);
    const [playersData, setPlayersData] = useState(undefined);
    const [ searchData, setSearchData ] = useState(undefined);
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
        async function fetchData () {
            // console.log(url);
            try {
                const { data } = await axios.get('http://localhost:3008/players');
                setPlayersData(data);
                console.log(data)
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [props.match.params.pagenum])

    useEffect(() => {
		async function fetchData() {
            try {
                // console.log(`in fetch searchTerm: ${searchTerm}`);
                console.log(searchTerm, 'im in players component')
                const { data } = await axios.post('http://localhost:3008/players', searchTerm);
                setSearchData(data);
                console.log(data, 'data')
                setLoading(false);
            } catch (e) {
                console.log(searchData)
                console.log(e);
            }
        }
        if (searchTerm) {
            fetchData();
            console.log (searchData, 'searchData')
        }
	}, [ searchTerm ]);
    
    const searchValue = async (value) => {
		await setSearchTerm(value);
        console.log(value, 'value')
	};

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    }else if(searchTerm) {
        return (
            <div>
                <Search searchValue={searchValue} />
                <br/>
                <h1>this is players component</h1>
                {searchData && searchData.map((player) => {
                    return (
                        <div key={player._id}>
                            <p>{player.short_name}</p>
                        </div>
                    )
                })}
            </div>
        )
    
    }else {
        return (
            <div>
                <Search searchValue={searchValue} />
                <br/>
                <h1>this is players component</h1>
                {playersData && playersData.map((player) => {
                    return (
                        <div key={player._id}>
                            <p>{player.short_name}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Players