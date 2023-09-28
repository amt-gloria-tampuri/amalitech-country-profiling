import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/Theme';
import classes from './Filter.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

interface FilterProps {
  onSearch: (searchText: string) => void;
  onSelect: (selectedRegion: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onSearch, onSelect }) => {
  const theme = useContext(ThemeContext);
  const [enteredSearch, setEnteredSearch] = useState('');
  const [region, setRegion] = useState('');

  const onSearchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSearch(e.target.value);
    onSearch(e.target.value); // Call the onSearch prop with the search text
  };

  const onSelectedRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
    onSelect(e.target.value); // Call the onSelect prop with the selected region
  };


  return (
    <div className={classes.searchFilter}>
      <div
        className={` ${
          classes.search
        } ${theme?.theme === 'dark' ? classes.darksearch : classes.lightsearch}`}
      >
        <AiOutlineSearch />
        <input type='text' placeholder='Search for a country' onChange={onSearchHandler} />
      </div>
      <div
        className={`${classes.filterdiv} ${
          theme?.theme === 'dark' ? classes.filDark : ''
        } `}
      >
        <select name='region' id='region-select' value={region} onChange={onSelectedRegion}>
          <option value=''>Filter by Region</option>
          <option value='africa'>Africa</option>
          <option value='america'>America</option>
          <option value='europe'>Europe</option>
          <option value='oceania'>Oceania</option>
          <option value='asia'>Asia</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
