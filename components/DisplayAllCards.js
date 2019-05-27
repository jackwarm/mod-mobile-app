import React, { Component } from 'react';
import DisplayCard from './DisplayCard';
class DisplayAllCards extends Component {
  
  // Loop through the list of users and display each user
  render() {
    let display = <div></div>
    if (this.props.users.length > 0) {
      display = this.props.users.map((user) => {    	
      	return(<DisplayCard key={user.login.uuid} user={user} editCard={this.props.editCard} enableEdit={this.props.enableEdit} />);
      });
    }
    return(display);
  }
}

export default DisplayAllCards;
