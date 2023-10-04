import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import classes from './AllCountries.module.css';
import { ThemeContext } from '../../context/Theme';


interface CountryData {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  capital: string[];
}

interface AllCountriesProps {
  countryName: string; 
  selectedRegion: string; 
}

const AllCountries: React.FC<AllCountriesProps> = ({ countryName, selectedRegion }) => {
  const theme = useContext(ThemeContext);
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: CountryData[] = await response.json();

        console.log('Fetched data:', data);

        let filteredData: CountryData[] = data;

        if (countryName) {
          filteredData = filteredData.filter((country) =>
            country.name.common.toLowerCase() === countryName.toLowerCase()
          );
        }

        if (selectedRegion) {
          filteredData = filteredData.filter((country) => country.region.toLowerCase() === selectedRegion.toLowerCase());
        }

        console.log('Filtered data:', filteredData);

        setFilteredCountries(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedRegion, countryName]);

  return (
    <div className={classes.gridContainer}>
      {filteredCountries.map((country) => (
        <Link href={country.name.common} className={classes.link} key={country.cca3}>
          <div className={`${classes.card} ${theme?.theme === 'dark' ? classes.cardD : ''}`}>
            <div className={classes.flag}>
              <img src={country.flags.svg} alt={country.name.official} />
            </div>
            <div className={`${classes.countryDescriptions} ${theme?.theme === 'dark' ? classes.countryDescriptionsD : ''}`}>
              <h4>{country.name.official}</h4>
              <p>
                Population: <span className={classes.emphasis}>{country.population.toLocaleString()}</span>
              </p>
              <p>
                Region: <span className={classes.emphasis}>{country.region}</span>
              </p>
              <p>
                Capital: <span className={classes.emphasis}>{country.capital}</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllCountries;
