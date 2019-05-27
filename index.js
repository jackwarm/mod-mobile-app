import React, { Component } from 'react';
import { render } from 'react-dom';
import SearchCards from './components/SearchCards'
import EditCard from './components/EditCard'
import DisplayAllCards from './components/DisplayAllCards'
import './style.css';

const requestUserLength = 100;
const APIurl = 'https://randomuser.me/api/?results=' + requestUserLength;

class App extends Component {
  enableEdit = false; // Flag to determine if the user info should be edited

  constructor() {
    super();

    // Define the state of all users retrieved from API
    this.state = {
	    users: []    
    }

  }

  // After Loading get a list of users to display. Save the full list for searching and reseting.
  componentDidMount() {
	  fetch(APIurl)
	    .then(results => {
	    	return(results.json());
	    })
	    .then(data => {
	      this.setState({users:data.results});
	    	this.fullList = Object.assign({}, this.state);
	    });
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
	  this.fullList = Object.assign({}, this.state);
	  this.enableEdit = false;
  }


  // Show the main page of the App
  render() {
    let action;
    if (this.enableEdit === true) {
      action = <EditCard user={this.state.users[0]} saveCard={this.saveCard} cancelEdit={this.resetSearch}/>
    } else {
      action = <DisplayAllCards users={this.state.users} editCard={this.editCard} />
    }
    return (
      <div>
        <SearchCards goSearch={this.goSearch} resetSearch={this.resetSearch}/>
        {action}
      </div>
    );
  }   
}

render(<App />, document.getElementById('root'));
