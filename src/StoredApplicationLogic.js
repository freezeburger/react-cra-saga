
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

const API = 'https://www.reddit.com/r/reactjs/.json';
const TIME = 'http://worldclockapi.com/api/json/utc/now';

const INITIAL_STATE = {
  defaultValue: 'INITIAL_STATE',
  time: {}
};

const apiReducer = (state = INITIAL_STATE, action) => {

  console.log(action);

  switch (action.type) {
      case '@@POLING_TIME_START':
          return Object.assign({}, state, {polling:true});
      case '@@POLING_TIME_END':
        return Object.assign({}, state, {polling:false}, {time:action.data});
      default:
        return state;
  }
};

// Redux will make a first call to the apiReducer;
const store = createStore(apiReducer);

// Store Internal Logic
(() => {
  setInterval(
    async () => {
      store.dispatch({type:'@@POLING_TIME_START'});
      const data = await fetch(TIME).then(res => res.json());
      store.dispatch({type:'@@POLING_TIME_END',data});
    },
    5000
  );
})();

const ApiProviderConnector = ({ mapper = () => ({}) , Component }) => {

  const ConnectedComponent = connect(
    mapper,
    null,
    null,
    )(Component);

  console.log(
    '%c %s',
    'color:blue',
    `
Your Application is now connected to the Store Context

through the ApiProviderConnector Context
`
  );
  return (
    <Provider store={store} >
      <ConnectedComponent />
    </Provider>
  );
};

// Moving on to Context

const ProxyfiedStore = new Proxy({store}, {
  get(targert,key){
    return () => {
      console.log('🚫 Prohibited access to state')
      throw Error('🚫 Not Allowed in Unsafe Context')
    };
  }
});
const UnsafeContext = React.createContext();

export const ApiProviderUnsafeContext = ({children :UnsafeConsumer}) => {
  console.log(
    '%c %s',
    'color:violet',
  `
  Your belong to an Unsafe Context !!!
  `);
  return (
    <Provider store={ProxyfiedStore} context={UnsafeContext}>
      {UnsafeConsumer}
    </Provider>
  );
};
export default ApiProviderConnector;
