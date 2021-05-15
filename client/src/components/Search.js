import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { CountryRegionData } from 'react-country-region-selector';

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState(undefined)
    console.log(searchTerm, 'first')
    let allSearchTerm = {}

    const type = [
        {value: 'all players', label: 'All Players', term: 'type'},
        {value: 'added players', label: 'Added Players', term: 'type'},
        {value: 'updated players', label: 'Updated Players', term: 'type'},
        {value: 'free players', label: 'Free Players', term: 'type'},
        {value: 'on loan players', label: 'On Loan Players', term: 'type'},
        {value: 'removed players', label: 'Removed Players', term: 'type'},
        {value: 'customized players', label: 'Customized Players', term: 'type'}
    ]

    const continents = [
        {value: 'europe', label: 'Europe', term: 'continents'},
        {value: 'south america', label: 'South America', term: 'continents'},
        {value: 'north america', label: 'North America', term: 'continents'},
        {value: 'africa', label: 'Africa', term: 'continents'},
        {value: 'asia', label: 'Asia', term: 'continents'},
        {value: 'oceania', label: 'Oceania', term: 'continents'}
    ]

    const country = []
    CountryRegionData.map((e) => {
        country.push({value: e[0], label: e[0], term: 'continents'})
    })

    const handleChange = (e) => {
        allSearchTerm[e.term] = e.value
        console.log(allSearchTerm, 'curState')
    }

    return (
        <div className='search-body'>
            <div className='search-term'>
                <form className='search-form center'
                    method='POST' 
                    onSubmit={(e) => {
				        e.preventDefault();
                        if(JSON.stringify(allSearchTerm) !== "{}") {
                            setSearchTerm(allSearchTerm)
                        }
			        }}
			        name='formName'>
                    <h5>Search</h5>
                    <Select options={type} placeholder='Type' onChange={handleChange}/>
                    <br/> 
                    <Select options={continents} placeholder='Continents' onChange={handleChange}/>
                    <br/>
                    <Select options={country} placeholder='Nationality/Region' onChange={handleChange}/>
                    <br/>
                    <div>
                        <label className='age'>Age</label>
                        <input className='age-low' type='number' name='age-low' max='45' min='15' placeholder='15' onChange={(e) => {allSearchTerm.ageLow = e.target.value}}/>
                        <input className='age-high' type='number' name='age-high' max='45' min='15' placeholder='45' onChange={(e) => {allSearchTerm.ageHigh = e.target.value}}/>
                    </div>
                    <button className='search-button' type='submit'>Submit</button>
                </form> 
            </div>
        </div>
    )
}

export default Search