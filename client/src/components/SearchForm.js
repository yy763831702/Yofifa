import React, { useState } from 'react';
import Select from 'react-select'
import { Link } from "react-router-dom";
import { CountryRegionData } from 'react-country-region-selector';

const SearchForm = (props) => {
    const [searchTerm, setSearchTerm] = useState(undefined);
    // console.log(searchTerm, 'change state succeed')
    let allSearchTerm = {};

    const leagueCountry = [
        {league: 'English Premier League', country: 'gb-eng', id: 39},
        {league: 'English League Championship', country: 'gb-eng', id: 40},
        {league: 'English League One', country: 'gb-eng', id: 41},
        {league: 'English League Two', country: 'gb-eng', id: 42},
        {league: 'German 1. Bundesliga', country: 'de', id: 78},
        {league: 'German 2. Bundesliga', country: 'de', id: 79},
        {league: 'German 3. Bundesliga', country: 'de', id: 80},
        {league: 'Spain Primera Division', country: 'es', id: 140},
        {league: 'Spanish Segunda División', country: 'es', id: 141},
        {league: 'Italian Serie A', country: 'it', id: 135},
        {league: 'Italian Serie B', country: 'it', id: 136},
        {league: 'French Ligue 1', country: 'fr', id: 61},
        {league: 'French Ligue 2', country: 'fr', id: 62},
        {league: 'Holland Eredivisie', country: 'nl', id: 88},
        {league: 'Portuguese Liga ZON SAGRES', country: 'pt', id: 94},
        {league: 'Campeonato Brasileiro Série A', country: 'br', id: 71},
        {league: 'Argentina Primera División', country: 'ar', id: 128},
        {league: 'Turkish Süper Lig', country: 'tr', id: 203},
        {league: 'Greek Super League', country: 'gr', id: 401},
        {league: 'Ukrainian Premier League', country: 'ua', id: 402},
        {league: 'Belgian Jupiler Pro League', country: 'be', id: 144},
        {league: 'Mexican Liga MX', country: 'mx', id: 262},
        {league: 'Czech Republic Gambrinus Liga', country: 'cz', id: 403},
        {league: 'Russian Premier League', country: 'ru', id: 404},
        {league: 'Scottish Premiership', country: 'gb-sct', id: 179},
        {league: 'Saudi Abdul L. Jameel League', country: 'sa', id: 307},
        {league: 'Austrian Football Bundesliga', country: 'at', id: 218},
        {league: 'USA Major League Soccer', country: 'us', id: 253},
        {league: 'Danish Superliga', country: 'dk', id: 119},
        {league: 'Chilian Campeonato Nacional', country: 'cl', id: 405},
        {league: 'Swiss Super League', country: 'ch', id: 207},
        {league: 'Croatian Prva HNL', country: 'hr', id: 406},
        {league: 'Paraguayan Primera División', country: 'py', id: 407},
        {league: 'Chinese Super League', country: 'cn', id: 169},
        {league: 'Uruguayan Primera División', country: 'uy', id: 408},
        {league: 'Colombian Liga Postobón', country: 'co', id: 409},
        {league: 'Swedish Allsvenskan', country: 'se', id: 113},
        {league: 'Japanese J. League Division 1', country: 'jp', id: 98},
        {league: 'Korean K League 1', country: 'kr', id: 292},
        {league: 'Ecuadorian Serie A', country: 'ec', id: 410},
        {league: 'Norwegian Eliteserien', country: 'no', id: 103},
        {league: 'Polish T-Mobile Ekstraklasa', country: 'pl', id: 106},
        {league: 'South African Premier Division', country: 'za', id: 411},
        {league: 'Romanian Liga I', country: 'ro', id: 283},
        {league: 'UAE Arabian Gulf League', country: 'ae', id: 412},
        {league: 'Liga de Fútbol Profesional Boliviano', country: 'bo', id: 413},
        {league: 'Peruvian Primera División', country: 'pe', id: 414},
        {league: 'Australian Hyundai A-League', country: 'au', id: 188},
        {league: 'Rep. Ireland Airtricity League', country: 'ie', id: 357},
        {league: 'Finnish Veikkausliiga', country: 'fi', id: 415},
        {league: 'Venezuelan Primera División', country: 've', id: 416},
    ];
    
    const find = (code) => {
        for(let item in CountryRegionData) {
            if(CountryRegionData[item][1] === code.substring(0,2).toUpperCase()) {
                return CountryRegionData[item][0];
            }
        }
    }

    let league = [];
    leagueCountry.map((e) => {
        return league.push({value: e.id, label: e.league, term: 'lg'});
    })

    let countryForLeague = [];
    leagueCountry.map((e) => {
        let label = find(e.country);
        return countryForLeague.push({value: e.country, label: label, term: 'nationality'});
    })
    let newArr= [];
    let arrId = [];
    for(let item of countryForLeague){
        if(arrId.indexOf(item['value']) === -1){
            arrId.push(item['value']);
            newArr.push(item);
        }
    }
    newArr[0].label = 'England';
    newArr[16].label = 'Scotland';

    const country = [];
    CountryRegionData.map((e) => {
        return country.push({value: e[1].toLowerCase(), label: e[0], term: 'code'});
    })

    const handleChange = (e) => {
        console.log(e);
        delete allSearchTerm['lgcode'];
        if (e.term === 'lg' && e.value > 400) {
            for (let l of leagueCountry) {
                if (l.league === e.label) {
                    allSearchTerm['lgcode'] = l.country;
                    break;
                }
            }
        } else {
            allSearchTerm[e.term] = e.value;
        }
    }

    const setUrl = (obj) => {
        if(JSON.stringify(obj) === "{}") return '';
        let queryString = ''
        for(let key in obj) {
            queryString += '&' + key + '=' + obj[key];
        }
        return queryString;
    }

    const handleSubmit = () => {
        let updateSearchTerm = {...searchTerm, ...allSearchTerm};
        let newStr = setUrl(updateSearchTerm).substring(1);
        window.history.pushState(null,null,`?${newStr}`);
        // props.history.push(`http://localhost:3000/players?${newStr}`)
        props.searchValue(updateSearchTerm);
    }

    if(props.className === 'playerComponent') {
        return (
            <div className='search-body'>
                <div className='search-term'>
                    <form className='search-form center'
                        method='POST'
                        onSubmit={async(e) => {
                            e.preventDefault();
                        }}
                        name='formName'>
                        <h2>Search</h2>
                        <Select options={country} placeholder='Nationality/Region' onChange={handleChange}/>
                        <br/>
                        <Select options={league} placeholder='League' onChange={handleChange}/>
                        <br/>
                        <div>
                            <label className='age'>Age</label>
                            <input className='minAge' type='number' name='minAge' max='53' min='16' placeholder='15' onChange={(e) => {allSearchTerm.minAge = e.target.value}}/>
                            <input className='maxAge' type='number' name='maxAge' max='53' min='16' placeholder='45' onChange={(e) => {allSearchTerm.maxAge = e.target.value}}/>
                        </div>
                        <div>
                            <label className='age'>Overall Rating</label>
                            <input className='minOverall' type='number' name='minOverall' max='99' min='0' placeholder='0' onChange={(e) => {allSearchTerm.minOverall = e.target.value}}/>
                            <input className='maxOverall' type='number' name='maxOverall' max='99' min='0' placeholder='99' onChange={(e) => {allSearchTerm.maxOverall = e.target.value}}/>
                        </div>
                        <div>
                            <label className='age'>Potential</label>
                            <input className='minPotential' type='number' name='minPotential' max='99' min='0' placeholder='0' onChange={(e) => {allSearchTerm.minPotential = e.target.value}}/>
                            <input className='maxPotential' type='number' name='maxPotential' max='99' min='0' placeholder='99' onChange={(e) => {allSearchTerm.maxPotential = e.target.value}}/>
                        </div>
                        <button className='search-button' type='submit' onClick={(e)=>{
                            let updateSearchTerm = {...searchTerm, ...allSearchTerm}
                            setSearchTerm(updateSearchTerm);
                            handleSubmit();
                        }}>Submit</button>
                        <Link to="/players">
                            <button className='search-button' type='submit' onClick={(e)=>{
                                setSearchTerm(undefined);
                                handleSubmit();
                            }}>Reset</button>
                        </Link>
                    </form>
                </div>
            </div>
        )
    }else {
        return (
            <div className='search-body'>
                <div className='search-term'>
                    <form className='search-form center'
                        method='POST'
                        onSubmit={async(e) => {
                            e.preventDefault();
                        }}
                        name='formName'>
                        <h2>Search</h2>
                        <Select options={newArr} placeholder='Nationality/Region' onChange={handleChange}/>
                        <br/>
                        <Select options={league} placeholder='League' onChange={handleChange}/>
                        <br/>
                        <div>
                            <label className='age'>Overall Rating</label>
                            <input className='minOverall' type='number' name='minOverall' max='99' min='0' placeholder='0' onChange={(e) => {allSearchTerm.minOverall = e.target.value}}/>
                            <input className='maxOverall' type='number' name='maxOverall' max='99' min='0' placeholder='99' onChange={(e) => {allSearchTerm.maxOverall = e.target.value}}/>
                        </div>
                        <div>
                            <label className='age'>Attack</label>
                            <input className='minAttack' type='number' name='minAttack' max='99' min='0' placeholder='0' onChange={(e) => {allSearchTerm.minAttack = e.target.value}}/>
                            <input className='maxAttack' type='number' name='maxAttack' max='99' min='0' placeholder='99' onChange={(e) => {allSearchTerm.maxAttack = e.target.value}}/>
                        </div>
                        <div>
                            <label className='age'>Defence</label>
                            <input className='minDefence' type='number' name='minDefence' max='99' min='0' placeholder='0' onChange={(e) => {allSearchTerm.minDefence = e.target.value}}/>
                            <input className='maxDefence' type='number' name='maxDefence' max='99' min='0' placeholder='99' onChange={(e) => {allSearchTerm.maxDefence = e.target.value}}/>
                        </div>
                        <div>
                            <label className='age'>Midfield</label>
                            <input className='minMidfield' type='number' name='minMidfield' max='99' min='0' placeholder='0' onChange={(e) => {allSearchTerm.minMidfield = e.target.value}}/>
                            <input className='maxMidfield' type='number' name='maxMidfield' max='99' min='0' placeholder='99' onChange={(e) => {allSearchTerm.maxMidfield = e.target.value}}/>
                        </div>
                        <button className='search-button' type='submit' onClick={(e)=>{
                            let updateSearchTerm = {...searchTerm, ...allSearchTerm}
                            setSearchTerm(updateSearchTerm)
                            handleSubmit()
                        }}>Submit</button>
                        <Link to="/teams">
                            <button className='search-button' type='submit' onClick={(e)=>{
                                setSearchTerm(undefined)
                                handleSubmit()
                            }}>Reset</button>
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchForm;
