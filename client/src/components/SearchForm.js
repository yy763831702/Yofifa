import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { CountryRegionData } from 'react-country-region-selector';

const SearchForm = (props) => {
    const [searchTerm, setSearchTerm] = useState(undefined)
    // console.log(searchTerm, 'change state succeed')
    let allSearchTerm = {}

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
        console.log(`http://localhost:3000/players?${newStr}`)
        window.location.search = newStr
        // props.history.push(`http://localhost:3000/players?${newStr}`)
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

export default SearchForm;
