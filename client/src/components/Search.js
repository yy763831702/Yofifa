import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { CountryRegionData } from 'react-country-region-selector';

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState(undefined)
    // console.log(searchTerm, 'change state succeed')
    let allSearchTerm = {}

    // const type = [
    //     {value: 'all players', label: 'All Players', term: 'type'},
    //     {value: 'added players', label: 'Added Players', term: 'type'},
    //     {value: 'updated players', label: 'Updated Players', term: 'type'},
    //     {value: 'free players', label: 'Free Players', term: 'type'},
    //     {value: 'on loan players', label: 'On Loan Players', term: 'type'},
    //     {value: 'removed players', label: 'Removed Players', term: 'type'},
    //     {value: 'customized players', label: 'Customized Players', term: 'type'}
    // ]

    // const continents = [
    //     {value: 'europe', label: 'Europe', term: 'continents'},
    //     {value: 'south america', label: 'South America', term: 'continents'},
    //     {value: 'north america', label: 'North America', term: 'continents'},
    //     {value: 'africa', label: 'Africa', term: 'continents'},
    //     {value: 'asia', label: 'Asia', term: 'continents'},
    //     {value: 'oceania', label: 'Oceania', term: 'continents'}
    // ]

    const country = []
    CountryRegionData.map((e) => {
        country.push({value: e[0], label: e[0], term: 'continents'})
    })

    const handleChange = (e) => {
        allSearchTerm[e.term] = e.value
        console.log(allSearchTerm, 'curState in search component')
    }

    const handleSubmit = () => {
        let updateSearchTerm = {...searchTerm, ...allSearchTerm}
        props.searchValue(updateSearchTerm);
    }

    return (
        <div className='search-body'>
            <h1>this is search component</h1>
            <div className='search-term'>
                <form className='search-form center'
                    method='POST'
                    onSubmit={async(e) => {
				        e.preventDefault();
                        let updateSearchTerm = {...searchTerm, ...allSearchTerm}
                        console.log(updateSearchTerm, 'updateSearchTerm')
                        setSearchTerm(updateSearchTerm)
                        // if(JSON.stringify(allSearchTerm) !== "{}") {
                        //     setSearchTerm(allSearchTerm)
                        // }
                        handleSubmit()
			        }}
			        name='formName'>
                    <h5>Search</h5>
                    <Select options={country} placeholder='Nationality/Region' onChange={handleChange}/>
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
                    <button className='search-button' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Search
