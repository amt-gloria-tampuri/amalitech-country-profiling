import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import classes from './AllCountries.module.css';
import { ThemeContext } from '../../context/Theme';

interface AllCountriesProps {
  countryName: string; // A single country name for searching
  selectedRegion: string; // The selected region for filtering
}

const AllCountries: React.FC<AllCountriesProps> = ({ countryName, selectedRegion }) => {
  const theme = useContext(ThemeContext);
  const [filteredCountries, setFilteredCountries] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);

    const fetchData = async () => {
      try {
        let response;
        if (countryName) {
          response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        } else if (selectedRegion) {
          // If a region is selected, filter by region
          response = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`);
        } else {
          // If neither is provided, fetch all countries
          response = await fetch('https://restcountries.com/v3.1/all');
        }
        const data = await response.json();

        
          setFilteredCountries(data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    fetchData();
  }, [countryName, selectedRegion]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={classes.gridContainer}>
      {filteredCountries?.map((country) => (
        <Link href={`${country['name']['common']}`} className={classes.link} key={country['cca3']}>
          <div className={`${classes.card} ${theme?.theme === 'dark' ? classes.cardD : ''}`}>
            <div className={classes.flag}>
              <img src={country['flags']['svg']} alt={country['name']['official']} />
            </div>
            <div className={`${classes.countryDescriptions} ${theme?.theme === 'dark' ? classes.countryDescriptionsD : ''}`}>
              <h4>{country['name']['official']}</h4>
              <p>
                Population: <span className={classes.emphasis}>{country['population'.toLocaleString()]}</span>
              </p>
              <p>
                Region: <span className={classes.emphasis}>{country['region']}</span>
              </p>
              <p>
                Capital: <span className={classes.emphasis}>{country['capital'] ? country['capital'][0] : country['name']['official']}</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllCountries;
