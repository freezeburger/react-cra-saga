import React from 'react';
import ApiProviderConnector, {
  ApiProviderUnsafeContext
} from './StoredApplicationLogic';
import { ReactReduxContext } from 'react-redux';
/*  */
const Level1 = ({ children }) => <div>{children}</div>;
const Level2 = ({ children }) => <div>{children}</div>;
const Level3 = ({ children }) => <div>{children}</div>;
const Level4 = ({ children }) => <div>{children}</div>;

const HiJackingStoreComponent = () => {
  return (
    <ReactReduxContext.Consumer>
      {(contextValue = {}, { store } = contextValue) => {
        return <fieldset>{store.getState().time.currentFileTime}</fieldset>;
      }}
    </ReactReduxContext.Consumer>
  );
};

class App extends React.Component {

  render() {
    return (
      <div className="App">
        {/* 
        {this.props.polling && <div>Fecthing Data</div>}
        {this.props.time.currentFileTime}
         */}
        <Level1>
          <Level2>
            <Level3>
              <Level4>
                <HiJackingStoreComponent />
              </Level4>
            </Level3>
          </Level2>
        </Level1>
        <ApiProviderUnsafeContext>
          <HiJackingStoreComponent />
        </ApiProviderUnsafeContext>
      </div>
    );
  }
}

const mapApplicationStateToComponentProps = state => {
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

//https://stackoverflow.com/questions/1968512/getting-the-difference-between-two-repositories