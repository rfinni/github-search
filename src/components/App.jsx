import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import SearchContainer from './SearchContainer';
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

    if(value.length > 3) {
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

  getSuggestions = async (val) => {
    const requestUrl = '//api.github.com/search/users?q=' + val;

    try {
      const response = await fetch(requestUrl);
      const parsed = await response.json();
      this.setState({
        suggestions: parsed.items,
        showSuggestions: true,
      })

    } catch(e) {
      this.setState({
        error: e.response.data.message + '. Please try again in 1 minute.',
        showSuggestions: false
      });
    }
  }

  getUserData = async (user) => {
    const requestUrl = '//api.github.com/users/' + user;

    try {
      const response = await fetch(requestUrl);
      const parsed = await response.json();
      this.updateSearchState(parsed);
    } catch(e) {
      this.setState({
        error: e,
      });
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

  render() {
    return (
      <SearchContainer
        state={this.state}
        handleChange={this.handleChange}
        clear={this.clearInput}
        onClick={this.handleClick}
      />
    );
  }
}

export default App;