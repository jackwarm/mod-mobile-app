import React, { Component } from 'react';

class SearchCards extends Component {
  
  state = {
    search: ''
  }
  
  // Change the search string when characters change and show the matching users
  onChange = (e) => {
	  this.setState({ search: e.target.value });
	  this.props.goSearch(e.target.value);
	  e.preventDefault();
  }

  // Display the full list of users
  resetDisplay = (e) => {
	  this.setState({search:''});
	  this.props.resetSearch();
	  e.preventDefault();
  };
  
  // Display Search function
  render() {
    return (
		<div className='searchContainer'>        
      <span className="label" >Search: </span> 
    	<input type='text' 
    			name='search' 
    			placeholder='Enter Text To Search' 
    			className='inputSearch'
    			value={this.state.search}
    			onChange={this.onChange}
    		/>
			<button className="btn" onClick={this.resetDisplay} >Show All</button>
      <span className='note'>Searches Name,Location,Cell Number, and Email</span>
    </div>
    );
  }
}

export default SearchCards;
