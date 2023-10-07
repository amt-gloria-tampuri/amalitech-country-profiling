import React, { useContext, useEffect, useState } from 'react';
import classes from './Country.module.css';
import { ThemeContext } from '../../context/Theme';
import Header from '../Header/Header';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { useCountryData } from '../../context/CountryContext';

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
  subregion: string;
  capital: string[]; 
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
}

const CountryPage: React.FC = () => {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  const countryData = useCountryData();

  const { country } = router.query;

  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const [individualCountry, setIndividualCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    if (countryData && country) {
      const foundCountry = countryData.find((item) => item.name.common === country);
      setIndividualCountry(foundCountry || null); 
      if (foundCountry) {
        setBorderCountries(
          foundCountry.borders.map((borderCode) => {
            const borderCountry = countryData.find((item) => item.cca3 === borderCode);
            return borderCountry ? borderCountry.name.common : borderCode;
          })
        );
      }
    }
  }, [countryData, country]);

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

        {individualCountry !== null && (
          <div className={classes.details} key={individualCountry.name.common}>
            <div className={classes.flag}>
              <img src={individualCountry.flags.svg} alt={individualCountry.name.common} />
            </div>
            <div className={classes.words}>
              <h2>{individualCountry.name.common}</h2>
              <div className={classes.moreDetails}>
                <div>
                  <p>Native Name : <span>{individualCountry.name.common}</span></p>
                  <p>Population : <span>{individualCountry.population.toLocaleString()}</span></p>
                  <p>Region : <span>{individualCountry.region}</span></p>
                  <p>Sub Region : <span>{individualCountry.subregion}</span></p>
                  <p>Capital : <span>{individualCountry.capital.join(', ')}</span></p> {/* Handle as array */}
                </div>
                <div>
                  <p>Top Level Domain : <span>{individualCountry.tld.join(', ')}</span></p>
                  <p>Currencies : <span>{Object.values(individualCountry.currencies).map((currency) => currency.name).join(', ')}</span></p>
                  <p>Languages : <span>{Object.values(individualCountry.languages).join(', ')}</span></p>
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
