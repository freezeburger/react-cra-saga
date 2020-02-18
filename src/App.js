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
    return <div className="App">{this.props.value}</div>;
  }

}

// this function should be named a selector as it helps the component selecting data from the state
const mapApplicationStateToComponentProps = (state) => {
  console.log("App State ->", state);
  return {
    value: state.defaultValue
  }
}

// Connecting The App through a the react-redux Provider
const ConnectedApp = () => <ApiProviderConnector mapper={mapApplicationStateToComponentProps} Component={App}></ApiProviderConnector>;
export default ConnectedApp;