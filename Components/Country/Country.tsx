import React, { useContext, useEffect, useState } from 'react';
import classes from './Country.module.css';
import { ThemeContext } from '../../context/Theme';
import Header from '../Header/Header';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';

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
    svg: string;
  };
  cca3:string
}

const CountryPage: React.FC = () => {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  const { country } = router.query;

  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');

        const data: CountryData[] = await response.json();
        if (country) {
          const foundCountry = data.find((item) => item.name.common === country);
          if (foundCountry) {
            setCountryData(foundCountry); 
            setBorderCountries(
              foundCountry.borders.map((borderCode) => {
                const borderCountry = data.find((item) => item.cca3 === borderCode);
                return borderCountry ? borderCountry.name.common : borderCode;
              })
            );
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

        {countryData !== null && (
          <div className={classes.details} key={countryData.name.common}>
            <div className={classes.flag}>
              <img src={countryData.flags.svg} alt={countryData.name.common} />
            </div>
            <div className={classes.words}>
              <h2>{countryData.name.common}</h2>
              <div className={classes.moreDetails}>
                <div>
                  <p>Native Name : <span>{countryData.name.common}</span></p>
                  <p>Population : <span>{countryData.population.toLocaleString()}</span></p>
                  <p>Region : <span>{countryData.region}</span></p>
                  <p>Sub Region : <span>{countryData.subregion}</span></p>
                  <p>Capital : <span>{countryData.capital}</span></p>
                </div>
                <div>
                  <p>Top Level Domain : <span>{countryData.tld.join(', ')}</span></p>
                  <p>Currencies : <span>{Object.values(countryData.currencies).map((currency) => currency.name).join(', ')}</span></p>
                  <p>Languages : <span>{Object.values(countryData.languages).join(', ')}</span></p>
                </div>
              </div>

              <div className={classes.borders}>
                <p className={classes.borderDis}>Border Countries:</p>
                <div className={`${classes.styleBorder} ${theme?.theme === 'dark' ? classes.styleBorderD : ''}`}>
                  {borderCountries.map((border) => <div key={border}>{border}</div>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryPage;
