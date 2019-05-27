import React, { Component } from 'react';
import DisplayCard from './DisplayCard';
class DisplayAllCards extends Component {
  
  // Loop through the list of users and display each user
  render() {
    return this.props.users.map((user) => {    	
    	return(<DisplayCard key={user.login.uuid} user={user} editCard={this.props.editCard} enableEdit={this.props.enableEdit} />);    	
    });
  }
}

export default DisplayAllCards;
