/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

import './app.scss';

import 'semantic-ui-css/semantic.min.css';

import Header from 'src/components/Header';
import Message from 'src/components/Message';
import SearchBar from 'src/components/SearchBar';
import ReposResults from 'src/components/ReposResults';

import { Repos } from 'src/repos';
import axios from 'axios';

// == Composant
const App = () => {
  const [search, setSearch] = useState('');

  const [repos, setRepos] = useState([]);

  const Search = () => {
    axios.get('https://api.github.com/search/repositories', {
      params: {
        q: search,
      },
    })
      .then((reponse) => {
        const { items } = reponse.data;
        setRepos(Repos(items));
      })
      .catch(() => {
        console.log('une erreur est survenue, merci de revenir sur notre blog plus tard');
      })
      .finally();
  };

  return (
    <div className="app">
      <Header />
      <SearchBar
        Submit={Search}
        searchInputValue={search}
        setSearchInputValue={setSearch}
      />
      <ReposResults repos={repos} />
    </div>
  );
};
// == Export
export default App;
