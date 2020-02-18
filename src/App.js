import React from 'react';
import ApiProviderConnector from './StoredApplicationLogic';

class App extends React.Component{

  // Explicit but not mandatory 
  constructor(props){
    super(props);
    console.log(props);
  }

  // http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
  componentDidMount(){
    console.log(this.props);
  }
  componentDidUpdate(){}
  
  componentWillUnmount(){}

  render() {
    return <div className="App">{this.props.defaultValue}</div>;
  }

}

// Connecting The App through a the react-redux Provider
const ConnectedApp = () => <ApiProviderConnector Component={App}></ApiProviderConnector>;
export default ConnectedApp;