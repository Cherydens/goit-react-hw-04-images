import { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchQuerry, setSearchQuerry] = useState('');

  const onSearchQuerryChange = e => {
    setSearchQuerry(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (!searchQuerry.trim()) {
      toast.error("Sorry, your search query can't be empty. Please try again.");
      return;
    }
    onSubmit(searchQuerry.toLowerCase().trim());
    setSearchQuerry('');
  };

  return (
    <Header>
      <SearchForm onSubmit={onFormSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuerry}
          onChange={onSearchQuerryChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
