import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import '../App.css';

const News = (props) => {
    const [ newsData, setNewsData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const [ country, setCountry ] = useState(props.match.params.country);

    useEffect(
        () => {
            async function fetchData() {
                try {
                    const url = `http://localhost:3008/news/${country}`;
                    const { data: { articles } } = await axios.get(url);
                    setNewsData(articles);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        },
        [ country, props.match.params.country ]
    );

    const handlechange = (event) => {
        setCountry(event.target.value);
    };

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    } else {
        let key = 0;
        const data = newsData.map((news) => {
            const { author, content, description, publishedAt, source, title, url, urlToImage} = news;
            return (
                <Grid item xs={12} sm={6} md={4} key={key++}>
                    <Card variant='outlined'>
                        <a className='newslink' href={url}>
                            {urlToImage && 
                                <CardMedia
                                    component='img'
                                    image={urlToImage}
                                    title='news image'
                                />
                            }
                            <CardContent>
                                <Typography variant='h5' component='h1'>
                                    {title}
                                </Typography>
                                <Typography variant='body2' component='em'>
                                    {source.name}{' '}{author}{' '}{publishedAt}
                                </Typography>
                                <Typography gutterBottom variant='body1' component='p'>
                                    {description}
                                </Typography>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    {content}
                                </Typography>
                            </CardContent>
                        </a>
                    </Card>
                </Grid>
            );
        });
        return (
            <div>
                <select onChange={handlechange}>
                    <option value="gb">Great Bratain</option>
                    <option value="sp">Spain</option>
                    <option value="us">United States</option>
                    <option value="it">Italy</option>
                    <option value="fr">France</option>
                    <option value="de">German</option>
                    <option value="br">Brazil</option>
                </select>
                <div>
                    {data}
                </div>
            </div>
        );
    }
};

export default News;