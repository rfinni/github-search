import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import Title from './Title';
import SearchContainer from './SearchContainer';
import { URLS } from '../config/config';
import '../assets/styles/App.css'

class App extends Component {
  constructor() {
    super();

    this.debouncedSearch = debounce((value) => {
      this.getSuggestions(value);
    }, 600);
  }

  state = {
    isLoading: false,
    suggestions: [],
    showSuggestions: false,
    userData: {},
    inputValue: '',
    displayError: false,
  }

  handleChange = (e) => {
    let value = e.target.value;

    this.setState({
      inputValue: value
    });

    if(value.length >= 3) {
      this.debouncedSearch(value);
    }
  }

  handleClick = (e, user) => {
    e.preventDefault();
    this.getUserData(user);
  }

  clearInput = () => {
    this.setState({
      suggestions: [],
      showSuggestions: false,
      userData: {},
      inputValue: '',
      displayError: false,
    });
  }

  // Searches GitHub API for user suggestions based on an input value
  getSuggestions = async (val) => {
    const requestUrl = `${URLS.SEARCH}${val}`;

    try {
      this.toggleLoadingState();
      const response = await fetch(requestUrl);
      const parsed = await response.json();

      // Set some artificial latency
      setTimeout(() => {
        this.setState({
          suggestions: parsed.items,
          showSuggestions: true,
        });
        this.toggleLoadingState();
      }, 1000);
    } catch(e) {
      this.displayError();
    }
  }

  // Get more info about a user
  getUserData = async (user) => {
    const requestUrl = `${URLS.USERS}${user}`;

    try {
      this.toggleLoadingState();
      const response = await fetch(requestUrl);
      const parsed = await response.json();

      this.toggleLoadingState();
      this.updateSearchState(parsed);
    } catch(e) {
      this.displayError();
    }
  }

  updateSearchState = (data) => {
    this.setState({
      inputValue: data.login,
      suggestions: [],
      showSuggestions: false,
      userData: {
        login: data.login,
        url: data.html_url,
        avatar: data.avatar_url,
        name: data.name,
        location: data.location,
        joined: data.created_at
      },
    });
  }

  toggleLoadingState = () => {
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
    }));
  }

  displayError = () => {
    this.setState({
      displayError: 'An error occurred. Please try again.',
    });
  }

  render() {
    const {
      isLoading,
      suggestions,
      showSuggestions,
      userData,
      inputValue,
      displayError,
    } = this.state;

    return (
      <main className="outer-container">
        <div className="inner">
          <Title />
          <SearchContainer
            isLoading={isLoading}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            userData={userData}
            inputValue={inputValue}
            handleChange={this.handleChange}
            handleClearInput={this.clearInput}
            onClick={this.handleClick}
          />
          {displayError.length > 0 && <p className="error">{displayError}</p>}
        </div>
      </main>
    );
  }
}

export default App;
