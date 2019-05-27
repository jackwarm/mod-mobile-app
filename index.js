import React, { Component } from 'react';
import { render } from 'react-dom';
import RefreshList from './components/RefreshList';
import SearchCards from './components/SearchCards';
import SortCards from './components/SortCards';
import EditCard from './components/EditCard';
import DisplayAllCards from './components/DisplayAllCards';
import LoadingDisplay from './components/LoadingDisplay';
import './style.css';

const initialUserLength = 3;
const APIurl = 'https://randomuser.me/api/?results=';

class App extends Component {
  enableEdit = false; // Flag to determine if the user info should be edited

  constructor() {
    super();

    // Define the state of all users retrieved from API
    this.state = {
	    users: [],
      maxUserList: initialUserLength,
      loading: {isLoading: true, loadingMessage:"Loading ..."}
    }
  }

  // Fetch the New List of users
  fetchListOfUsers = (size) => {    
	  this.setState({users:{},loading:{isLoading: true, loadingMessage:"Loading ..."}});
	  fetch(APIurl+size)
	    .then(results => {
	    	return(results.json());
	    })
	    .then(data => {
	      this.setState({users:data.results,loading:{isLoading: false, loadingMessage:"Loading Complete ..."}});
	    	this.fullList = Object.assign({}, this.state);
	    });
  }

  // After Loading get a list of users to display. Save the full list for searching and reseting.
  componentDidMount() {
    this.fetchListOfUsers(this.state.maxUserList);
  }

  // Search the list for selected matches and reset the state to the found users.
  goSearch = (search) => {
	  this.setState({ users: [...this.fullList.users.filter(user => {
		  return ((user.name.first.indexOf(search) !== -1) ||
				  (user.location.city.indexOf(search) !== -1) ||
				  (user.location.state.indexOf(search) !== -1) ||
				  (user.email.indexOf(search) !== -1) ||
				  (user.cell.indexOf(search) !== -1)
			);
	  })]});
  }

  // Restore the list to the full list of all users
  resetSearch = () => {
	  this.setState(this.fullList);
	  this.enableEdit = false;
  }

  // Select a specfic user to edit
  editCard = (key) => {
	  this.setState({ users: [...this.fullList.users.filter(user => {
		  return (user.login.uuid === key);
	  })]});
	  this.enableEdit = true;
  }

  // Save the new information about the user to the list and show the whole list
  saveCard = (editUser) => {
	  this.setState({ users: [...this.fullList.users.filter(user => {
		  if (user.login.uuid === editUser.key) {
			  user.name.first = editUser.first;
			  user.name.last = editUser.last;
			  user.email = editUser.email;
			  user.cell = editUser.cell;
			  user.location.city = editUser.city;
			  user.location.state = editUser.state;
		  }
		  return(true);
	  })]});
	  this.resetSearch();
  }
  
  // Get the specfic object within the user item for searching
  findFieldValue = (item,sortInfo) => {
    let fields = sortInfo.field.split(".");
    let value = item[fields[0]];
    for (let i=1; i<fields.length; i++) {
      value = value[fields[i]];
    }
    return(value.toLowerCase());
  }

  // Sort Comparison Function to sort the array of Users
  sortCompare = (sortInfo,a, b) => {
    const valueA = this.findFieldValue(a,sortInfo);
    const genreB = this.findFieldValue(b,sortInfo);
  
    let comparison = 0;
    if (valueA > genreB) {
      comparison = 1;
    } else if (valueA < genreB) {
      comparison = -1;
    }
    // Reverse the Search direction
    if (sortInfo.direction === '-') {
      comparison *= -1;
    }
    return comparison;
  }

  // Sort the list by the speficied field and direction
  goSort= (sortInfo) => {    
	  this.setState({users:{},loading:{isLoading: true, loadingMessage:"Sorting ..."}});
    this.setState({users: this.fullList.users.sort((a,b) => this.sortCompare(sortInfo,a,b)),
                   loading:{isLoading: false, loadingMessage:"Sorting Complete..."}
    });
  }

  goRefresh = (newSize) => {
    this.fetchListOfUsers(newSize);
  }

  // Show the main page of the App
  render() {
    let action;
    if (this.enableEdit === true) {
      action = <EditCard user={this.state.users[0]} saveCard={this.saveCard} cancelEdit={this.resetSearch} />
    } else {
      action = <DisplayAllCards users={this.state.users} editCard={this.editCard} />
    }
    return (
      <div>
        <RefreshList currentSize={this.state.maxUserList} goRefresh={this.goRefresh} />
        <SearchCards goSearch={this.goSearch} resetSearch={this.resetSearch} />
        <SortCards goSort={this.goSort} />
        <LoadingDisplay loading={this.state.loading} />
        {action}
      </div>
    );
  }   
}

render(<App />, document.getElementById('root'));
