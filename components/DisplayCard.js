import React, { Component } from 'react';

export class DisplayCard extends Component {
  
  // function to set the first character of each field to uppercase.
  modTitle = (field) => {
	  return (field.charAt(0).toUpperCase() + field.slice(1));
  }

  // Display a specific user's information
  render() {
    const { name, email, cell, location, picture, login } = this.props.user;
    const key = login.uuid;
    const displayName = this.modTitle(name.first) + " " + this.modTitle(name.last);
    const displayLocation = this.modTitle(location.city) + ", " + this.modTitle(location.state);
    return (
        <div className="wholeCard">
          <div className="cardEdit">
            <img className ="iconEdit" src="https://www.cieply.com/images/icon_edit.svg" alt="edit" onClick={this.props.editCard.bind(this, key)} />
          </div>
          <div className="cardName">{displayName}</div>
          <div className="cardImage"><img className='cardPicture' src={picture.large} alt={displayName} /></div>
          <div className="cardEmail">{email}</div>  
          <div className="cardCell">{cell}</div>		    
          <div className="cardLocation">{displayLocation}</div>  
        </div> 
    );  
  }
}

export default DisplayCard;
