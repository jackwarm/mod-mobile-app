import React, { Component } from 'react';

class SortCards extends Component {
  
  constructor(props) {
    super(props);

    // Define the state of all users retrieved from API
    this.state = {
	    sort: {field:'', direction: ''}  
    }
  }
  
  // Initiate the Sort of the field
  sortThisField = (e) => {
	  e.preventDefault();
    let newSort = {field:e.target.value,direction:'+'};
    if ((newSort.field===this.state.sort.field) && (this.state.sort.direction==='+')) {
      newSort.direction = '-';
    }
    this.setState({sort:newSort});
	  this.props.goSort(newSort);
  }
  
  // Display Sort Request
  render() {
    return (
		<div className='sortContainer'>
      <span className="label" >Sort: </span> 
			<button className="btn" onClick={this.sortThisField} value='name.first'>First Name</button>
			<button className="btn" onClick={this.sortThisField} value='name.last'>Last Name</button>
			<button className="btn" onClick={this.sortThisField} value='email'>Email</button>
			<button className="btn" onClick={this.sortThisField} value='cell'>Cell Number</button>
			<button className="btn" onClick={this.sortThisField} value='location.city'>City</button>
			<button className="btn" onClick={this.sortThisField} value='location.state'>State</button>
      <span className='note'>Select Same Field Again to Reverse the Sort</span>
    	</div>
    );
  }
}

export default SortCards;
