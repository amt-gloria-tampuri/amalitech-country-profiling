import React,{useContext} from 'react'
import classes from './Header.module.css'
import { ThemeContext } from '../../context/Theme'
import{BsFillMoonFill} from 'react-icons/bs'


const Header = () => {
  const theme = useContext(ThemeContext)
  

  return (
   <div>
     <div className={`${classes.header} ${theme?.theme==='dark'? classes.headerD :''}`}>
        <h1>Where in the world</h1>
        <div className={classes.darkMode} onClick={theme?.themeHandler}>
            <div> <BsFillMoonFill/> </div>
            <p>Dark Mode</p>
        </div>
    </div>  
   </div>
  )
}

export default Header