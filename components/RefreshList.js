import React, { Component } from 'react';

class RefreshList extends Component {
  
  constructor(props) {
    super(props);

    // Define the Current Request List
    this.state = {
	    requestSize: props.currentSize
    }
  }
  // Maintain the field for size of refresh
  onChange = (e) => {
	  e.preventDefault();
    let newSize = e.target.value;
    if ((!isNaN(newSize) && (newSize > 0))) {
      this.setState({ requestSize: newSize });
    }	  
  }

  // Display the full list of users
  onSubmit = (e) => {
	  e.preventDefault();
	  this.props.goRefresh(this.state.requestSize);
  };
  
  // Display Refresh Request
  render() {
    return (
		  <form onSubmit={this.onSubmit}>
      <div className='fetchContainer'>        
      <span className="label" >Users: </span> 
    	<input type='text' 
    			name='newSize' 
    			className='inputSearch'
    			value={this.state.requestSize}
    			onChange={this.onChange}
    		/>
      <input type='submit' value='Refresh' className='btn' />
      <span className='note'>Reload the List from the API</span>
    </div>
    </form>
    );
  }
}

export default RefreshList;
