import React, { useContext, useEffect, useState } from 'react';
import classes from './Country.module.css';
import { ThemeContext } from '../../context/Theme';
import Header from '../Header/Header';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';

// Define a TypeScript interface for the country data
interface CountryData {
  name: {
    common: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string[];
  currencies: {
    [currencyCode: string]: {
      name: string;
    };
  };
  languages: {
    [languageCode: string]: string;
  };
  borders: string[];
  flags: {
    svg: string; // Add the flags property with a type
    // You may need to add other properties related to flags if necessary
  };
  // Add other properties as needed
}


const CountryPage: React.FC = () => {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  const { country } = router.query;

  const [countryData, setCountryData] = useState<CountryData[]>([]);

  useEffect(() => {
    if (country) {
      fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((result: CountryData[]) => {
          setCountryData(result); // Update state with fetched data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [country]);

  return (
    <div className={`${classes.country} ${theme?.theme === 'dark' ? classes.countryD : ''}`}>
      <Header />
      <div className={classes.countryDetails}>
        <Link href='/' className={classes.link}>
          <div className={`${classes.backButton} ${theme?.theme === 'dark' ? classes.backButtonD : ''}`}>
            <div><BiArrowBack /></div>
            <p>Back</p>
          </div>
        </Link>

        {Array.isArray(countryData) &&
          countryData.map((country: CountryData) => (
            <div className={classes.details} key={country?.name?.common}>
              <div className={classes.flag}>
                <img src={country?.flags?.svg} alt={country?.name?.common} />
              </div>
              <div className={classes.words}>
                <h2>{country?.name?.common}</h2>
                <div className={classes.moreDetails}>
                  <div>
                    <p>Native Name : <span>{country.name.common}</span></p>
                    <p>Population : <span>{country.population.toLocaleString()}</span></p>
                    <p>Region : <span>{country.region}</span></p>
                    <p>Sub Region : <span>{country.subregion}</span></p>
                    <p>Capital : <span>{country.capital}</span></p>
                  </div>
                  <div>
                    <p>Top Level Domain : <span>{country.tld.map((tl) => <span key={tl}>{tl}</span>)}</span></p>
                    <p>Currencies : <span>
                      {Object.keys(country.currencies).map((currencyCode) => (
                        <span key={currencyCode}>
                          {country.currencies[currencyCode].name}
                          {currencyCode !== Object.keys(country.currencies)[Object.keys(country.currencies).length - 1] ? ', ' : ''}
                        </span>
                      ))}
                    </span></p>
                    <p>Languages : <span>
                      {Object.keys(country.languages).map((languageCode) => (
                        <span key={languageCode}>
                          {country.languages[languageCode]}
                          {languageCode !== Object.keys(country.languages)[Object.keys(country.languages).length - 1] ? ', ' : ''}
                        </span>
                      ))}
                    </span></p>
                  </div>
                </div>

                <div className={classes.borders}>
                  <p className={classes.borderDis}>Border Countries:</p>
                  <div className={`${classes.styleBorder} ${theme?.theme === 'dark' ? classes.styleBorderD : ''}`}>
                    {country?.borders?.map((border) => <div key={border}>{border}</div>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CountryPage;
