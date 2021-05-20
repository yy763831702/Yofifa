import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';

import '../App.css';
import { GiSoccerBall } from "react-icons/gi";

const News = (props) => {
    const [ newsData, setNewsData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const history = useHistory();

    useEffect(
        () => {
            async function fetchData() {
                try {
                    const url = `http://localhost:3008/news/${props.match.params.country}`;
                    const { data: { articles } } = await axios.get(url);
                    setNewsData(articles);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        },
        [ props.match.params.country ]
    );

    const handlechange = (event) => {
        history.push({ pathname: `/news/${event.target.value}` });
    };

    if (loading) {
        return (
            <div className='loading'>
                <GiSoccerBall className="soccer-logo" /><h1>Loading...</h1>
            </div>
        );
    } else {
        let key = 0;
        const data = newsData.map((news) => {
            const { author, content, description, publishedAt, source, title, url, urlToImage} = news;
            return (
                <div className='news-card' key={key++}>
                    <a href={url} className='news-card-anchor'>
                        {urlToImage && <img src={urlToImage} alt='news'/>}
                        <div className='news-card-container'>
                            <h1>{title}</h1>
                            <em>
                                <span>by {source.name}</span>
                                <span>{author}</span>
                                <span>{new Date(publishedAt).toLocaleString('en-US').substring(0, 9)}</span>
                            </em>
                            <p className='news-card-desc'>{description}</p>
                            <p className='news-card-content'>{content}</p>
                        </div>
                    </a>
                </div>
            );
        });
        return (
            <div>
                <div className='news-select'>
                    <label className='news-label' htmlFor='select'>Select Country:</label>
                    <div>
                        <select id='select' onChange={handlechange}>
                            <option value="gb">Great Bratain</option>
                            <option value="sp">Spain</option>
                            <option value="us">United States</option>
                            <option value="it">Italy</option>
                            <option value="fr">France</option>
                            <option value="de">German</option>
                            <option value="br">Brazil</option>
                        </select>
                    </div>
                </div>
                <div className='news'>
                    {data}
                </div>
            </div>
        );
    }
};

export default News;