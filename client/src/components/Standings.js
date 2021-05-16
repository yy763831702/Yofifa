import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import '../App.css';

const Standings = (props) => {
    const [ listData, setListData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(
        () => {
            async function fetchData() {
                try {
                    const url = `http://localhost:3008/standings/${props.match.params.id}`;
                    const { data: { league } } = await axios.get(url);
                    console.log(league);
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

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
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
                <h4><img width='150px' src={logo} alt={id} />{name}{' '}{season}</h4>
                <Table standings={listData.standings} id={id} />
            </div>
        );
    }
};

export default Standings;