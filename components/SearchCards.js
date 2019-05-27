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
			<button className="btn_reset" onClick={this.resetDisplay} >Show All</button>
    		<input type='text' 
    			name='search' 
    			placeholder='Enter Text To Search' 
    			className='inputSearch'
    			value={this.state.search}
    			onChange={this.onChange}
    		/>
    	</div>
    );
  }
}

export default SearchCards;
