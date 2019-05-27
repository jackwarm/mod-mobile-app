import React, { Component } from 'react';

class LoadingDisplay extends Component {
  
  // Display Refresh Request
  render() {
    let display=<div></div>
    if (this.props.loading.isLoading === true) {
      display = 
        <div className='loadingMessage'>  
          {this.props.loading.loadingMessage}
        </div>
    }
    return(display);
  } 
}
export default LoadingDisplay;