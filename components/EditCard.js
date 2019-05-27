import React, { Component } from 'react';

export class EditCard extends Component {
  
  // Create the state of the items to edit
  constructor(props) {
	  super(props);
	  this.state = {editUser: {
		  key: props.user.login.uuid,
		  first: props.user.name.first,
		  last: props.user.name.last,
		  email: props.user.email,
		  cell: props.user.cell,
		  city: props.user.location.city,
		  state: props.user.location.state
	  }}
  }

  // Change the state of the field to the new information
  onChange = (e) => {
	  let editUser = Object.assign({}, this.state.editUser);
	  editUser[e.target.name] = e.target.value;
	  this.setState({editUser});
  }

  // Submit all the changes to the list.
  onSubmit = (e) => {
	  e.preventDefault();
	  this.props.saveCard(this.state.editUser);
  }

  cancelRequest = (e) => {
	  this.props.cancelEdit();
  }
  // Display the information to edit
  render() { 
		return (
		    <form onSubmit={this.onSubmit}>
	    	<div className="wholeCard wholeCardEdit">
	    		<div className="cardName">
	    			<input type="text" name="first" value={this.state.editUser.first} onChange={this.onChange} />
	    			<input type="text" name="last" value={this.state.editUser.last} onChange={this.onChange} />
	    		</div>
	    		<div className="cardImage"><img className='cardPicture' src={this.props.user.picture.large} alt={this.state.editUser.last} /></div>
	    		<div className="cardEmail">
	    			<input type="text" name="email" value={this.state.editUser.email} onChange={this.onChange} />
	    		</div>  
	    		<div className="cardCell">
	    			<input type="text" name="cell" value={this.state.editUser.cell} onChange={this.onChange} />
	    		</div>		    
	    		<div className="cardLocation">
	    			<input type="text" name="city" value={this.state.editUser.city}  onChange={this.onChange} />
	    			<input type="text" name="state" value={this.state.editUser.state} onChange={this.onChange} />
	    		</div>  
	    		<div className="editSubmit">
            <input type='submit' value='Submit' className='btn' />
            <button onClick={this.cancelRequest} className='btn' >Cancel</button> 
          </div>
	    	</div> 
	    	</form>
		);  
  }
}

export default EditCard;