import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { Link } from "react-router-dom";
import { CountryRegionData } from 'react-country-region-selector';

const SearchForm = (props) => {
    const [searchTerm, setSearchTerm] = useState(undefined)
    // console.log(searchTerm, 'change state succeed')
    let allSearchTerm = {}

    const leagueCountry = [
        {league: 'English Premier League', country: 'gb-eng'},
        {league: 'English League Championship', country: 'gb-eng'},
        {league: 'English League One', country: 'gb-eng'},
        {league: 'English League Two', country: 'gb-eng'},
        {league: 'German 1. Bundesliga', country: 'de'},
        {league: 'German 2. Bundesliga', country: 'de'},
        {league: 'German 3. Bundesliga', country: 'de'},
        {league: 'Spain Primera Division', country: 'es'},
        {league: 'Spanish Segunda División', country: 'es'},
        {league: 'Italian Serie A', country: 'it'},
        {league: 'Italian Serie B', country: 'it'},
        {league: 'French Ligue 1', country: 'fr'},
        {league: 'French Ligue 2', country: 'fr'},
        {league: 'Holland Eredivisie', country: 'nl'},
        {league: 'Portuguese Liga ZON SAGRES', country: 'pt'},
        {league: 'Campeonato Brasileiro Série A', country: 'br'},
        {league: 'Argentina Primera División', country: 'ar'},
        {league: 'Turkish Süper Lig', country: 'tr'},
        {league: 'Greek Super League', country: 'gr'},
        {league: 'Ukrainian Premier League', country: 'ua'},
        {league: 'Belgian Jupiler Pro League', country: 'be'},
        {league: 'Mexican Liga MX', country: 'mx'},
        {league: 'Czech Republic Gambrinus Liga', country: 'cz'},
        {league: 'Russian Premier League', country: 'ru'},
        {league: 'Scottish Premiership', country: 'gb-sct'},
        {league: 'Saudi Abdul L. Jameel League', country: 'sa'},
        {league: 'Austrian Football Bundesliga', country: 'at'},
        {league: 'USA Major League Soccer', country: 'us'},
        {league: 'Danish Superliga', country: 'dk'},
        {league: 'Chilian Campeonato Nacional', country: 'cl'},
        {league: 'Swiss Super League', country: 'ch'},
        {league: 'Croatian Prva HNL', country: 'hr'},
        {league: 'Paraguayan Primera División', country: 'py'},
        {league: 'Chinese Super League', country: 'cn'},
        {league: 'Uruguayan Primera División', country: 'uy'},
        {league: 'Colombian Liga Postobón', country: 'co'},
        {league: 'Swedish Allsvenskan', country: 'se'},
        {league: 'Japanese J. League Division 1', country: 'jp'},
        {league: 'Korean K League 1', country: 'kr'},
        {league: 'Ecuadorian Serie A', country: 'ec'},
        {league: 'Norwegian Eliteserien', country: 'no'},
        {league: 'Polish T-Mobile Ekstraklasa', country: 'pl'},
        {league: 'South African Premier Division', country: 'za'},
        {league: 'Romanian Liga I', country: 'ro'},
        {league: 'UAE Arabian Gulf League', country: 'ae'},
        {league: 'Liga de Fútbol Profesional Boliviano', country: 'bo'},
        {league: 'Peruvian Primera División', country: 'pe'},
        {league: 'Australian Hyundai A-League', country: 'au'},
        {league: 'Rep. Ireland Airtricity League', country: 'ie'},
        {league: 'Finnish Veikkausliiga', country: 'fi'},
        {league: 'Venezuelan Primera División', country: 've'},
    ];
    
    const find = (code) => {
        for(let item in CountryRegionData) {
            if(CountryRegionData[item][1] == code.substring(0,2).toUpperCase()) {
                return CountryRegionData[item][0]
            }
        }
    }

    let league = []
    leagueCountry.map((e) => {
        league.push({value: e.league, label: e.league, term: 'league'})
    })

    let countryForLeague = []
    leagueCountry.map((e) => {
        let label = find(e.country)
        countryForLeague.push({value: e.country, label: label, term: 'nationality'})
    })
    let newArr= [];
    let arrId = [];
    for(let item of countryForLeague){
        if(arrId.indexOf(item['value']) == -1){
            arrId.push(item['value']);
            newArr.push(item);
        }
    }
    newArr[0].label = 'England'
    newArr[16].label = 'Scotland'

    const country = []
    CountryRegionData.map((e) => {
        country.push({value: e[1], label: e[0], term: 'continents'})
    })

    const handleChange = (e) => {
        allSearchTerm[e.term] = e.value
        // console.log(allSearchTerm, 'curState in search component')
    }

    const setUrl = (obj) => {
        if(JSON.stringify(obj) == "{}") return ''
        let queryString = ''
        for(let key in obj) {
            queryString += '&' + key + '=' + obj[key]
        }
        return queryString
    }

    const handleSubmit = () => {
        let updateSearchTerm = {...searchTerm, ...allSearchTerm}
        let newStr = setUrl(updateSearchTerm).substring(1)
        window.history.pushState(null,null,`?${newStr}`)
        // props.history.push(`http://localhost:3000/players?${newStr}`)
        props.searchValue(updateSearchTerm);
    }

    if(props.className == 'playerComponent') {
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
                            setSearchTerm(updateSearchTerm)
                            handleSubmit()
                        }}>Submit</button>
                        <Link to="/players">
                            <button className='search-button' type='submit' onClick={(e)=>{
                                setSearchTerm(undefined)
                                handleSubmit()
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
