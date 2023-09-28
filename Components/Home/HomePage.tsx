import React, { useContext, useState } from 'react'
import Header from '../Header/Header'
import Filter from '../Filter/Filter'
import AllCountries from '../AllCountries/AllCountries'
import { ThemeContext } from '../../context/Theme'
import classes from './HomePage.module.css'


const Homepage = () => {

  const theme = useContext(ThemeContext)

  const [searchInput, setSearchInput] = useState('')
    const [selectedInput, setSelectedInput] = useState('')

  const onSearchInputHandler = (countryName:string) => {
    setSearchInput(countryName)
    
    
}

const onSelectedInputhandler = (selectedRegion:string) => {
    setSelectedInput(selectedRegion)
    
}
;


  return (
    <div  className={` ${theme?.theme=='dark'? classes.layDark : classes.layout}`}>
        <Header/>
        <Filter onSearch={onSearchInputHandler} onSelect={onSelectedInputhandler}/>
        <AllCountries countryName={searchInput} selectedRegion={selectedInput}/>
    </div>
  )
}

export default Homepage