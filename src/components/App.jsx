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
    user: false,
    suggestions: [],
    showSuggestions: false,
    userData: {},
    inputText: ''
  }

  handleChange = (e) => {
    let value = e.target.value;

    this.setState({
      inputText: value
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
      user: false,
      suggestions: [],
      showSuggestions: false,
      userData: {},
      inputText: '',
    });
  }

  // Searches GitHub API for user suggestions based on an input value
  getSuggestions = async (val) => {
    const requestUrl = `${URLS.SEARCH}${val}`;

    try {
      const response = await fetch(requestUrl);
      const parsed = await response.json();
      this.setState({
        suggestions: parsed.items,
        showSuggestions: true,
      })
    } catch(e) {
      this.displayError();
    }
  }

  // Get more info about a user
  getUserData = async (user) => {
    const requestUrl = `${URLS.USER}${user}`;

    try {
      const response = await fetch(requestUrl);
      const parsed = await response.json();
      this.updateSearchState(parsed);
    } catch(e) {
      this.displayError();
    }
  }

  updateSearchState = (data) => {
    this.setState({
      user: true,
      showSuggestions: false,
      inputText: data.login,
      userData: {
        login: data.login,
        url: data.html_url,
        avatar: data.avatar_url,
        name: data.name,
        location: data.location,
        joined: data.created_at
      }
    });
  }

  displayError = () => {
    this.setState({
      error: 'An error occurred. Please try again.',
      showSuggestions: false
    });
  }

  render() {
    return (
      <main className="outer-container">
        <div className="inner">
          <Title />
          <SearchContainer
            state={this.state}
            handleChange={this.handleChange}
            clear={this.clearInput}
            onClick={this.handleClick}
          />
        </div>
      </main>
    );
  }
}

export default App;
