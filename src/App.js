import React from 'react';
import ApiProviderConnector from './StoredApplicationLogic';
import { ReactReduxContext } from 'react-redux';

const Level1 = ({ children }) => <div>{children}</div>;
const Level2 = ({ children }) => <div>{children}</div>;
const Level3 = ({ children }) => <div>{children}</div>;
const Level4 = ({ children }) => <div>{children}</div>;

const HiJackingStoreComponent = () => {
  // https://react-redux.js.org/using-react-redux/accessing-store
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return <fieldset>{store.getState().time.currentFileTime}</fieldset>;
      }}
    </ReactReduxContext.Consumer>
  );
};

class App extends React.Component {
  // Explicit but not mandatory
  constructor(props) {
    super(props);
    console.log(props);
  }

  // http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
  componentDidMount() {
    console.log(this.props);
  }
  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="App">
        {this.props.polling && <div>Fecthing Data</div>}
        {this.props.time.currentFileTime}
        <Level1>
          <Level2>
            <Level3>
              <Level4>
                <HiJackingStoreComponent />
              </Level4>
            </Level3>
          </Level2>
        </Level1>
      </div>
    );
  }
}

// this function should be named a selector as it helps the component selecting data from the state
const mapApplicationStateToComponentProps = state => {
  console.log('App State ->', state);
  return {
    value: state.defaultValue,
    time: state.time,
    polling: state.polling
  };
};

// Connecting The App through a the react-redux Provider
const ConnectedApp = () => (
  <ApiProviderConnector
    mapper={mapApplicationStateToComponentProps}
    Component={App}
  ></ApiProviderConnector>
);
export default ConnectedApp;
