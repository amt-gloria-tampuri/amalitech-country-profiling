import React, { useContext, useState } from 'react'
import Header from '../Header/Header'
import Filter from '../Filter/Filter'
import AllCountries from '../AllCountries/AllCountries'
import { ThemeContext } from '../../context/Theme'
import classes from './HomePage.module.css'


const Homepage = () => {

  const theme = useContext(ThemeContext)
  console.log(theme?.theme);

  const [searchInput, setSearchInput] = useState('')
    const [selectedInput, setSelectedInput] = useState('')

  const onSearchInputHandler = (countryName:string) => {
    setSearchInput(countryName)
    console.log(countryName);
    
}

const onSelectedInputhandler = (selectedRegion:string) => {
    setSelectedInput(selectedRegion)
    console.log(selectedRegion);
    
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