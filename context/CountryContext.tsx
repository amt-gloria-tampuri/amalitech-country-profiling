
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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
      subregion: string;
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

export const CountryContext = createContext<CountryData[]>([]);

// Create a custom hook to access the context
export const useCountryData = () => useContext(CountryContext);

interface CountryDataProviderProps {
  children: ReactNode;
}

export const CountryDataProvider: React.FC<CountryDataProviderProps> = ({ children }) => {
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: CountryData[] = await response.json();

        setCountryData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  return (
    <CountryContext.Provider value={countryData}>
      {children}
    </CountryContext.Provider>
  );
};
