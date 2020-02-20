
import React from 'react';
import { createStore } from 'redux';
import { Provider , ReactReduxContext} from 'react-redux';
import { connect } from 'react-redux';

const API = 'https://www.reddit.com/r/reactjs/.json';
const TIME = 'http://worldclockapi.com/api/json/utc/now';

const INITIAL_STATE = {
  defaultValue: 'INITIAL_STATE',
  time: {}
};

const apiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case '@@POLING_TIME_START':
          return Object.assign({}, state, {polling:true});
      case '@@POLING_TIME_END':
        return Object.assign({}, state, {polling:false}, {time:action.data});
      default:
        return state;
  }
};

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


class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  shouldComponentUpdate(){
    return !this.state.hasError;
  }
  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log( errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>🚫 Not Allowed in Unsafe Context</h1>;
    }
    return this.props.children ;
  }
}

// Moving on to Context
const ProxyfiedStore = {
  getState(){
    console.log('🚫 Prohibited access to state');
  },
  subscribe(){},
  dispatch(){}
};

const UnsafeContext = React.createContext();
export const ApiProviderUnsafeContext = ({children :UnsafeConsumers}) => {
  console.log(
    '%c %s',
    'color:violet',
  `
  Your belong to an Unsafe Context !!!
  `);
  return (
    <ApiErrorBoundary>
      {/*  Switch the store in Unsafe Context */}
      <ReactReduxContext.Provider store={ProxyfiedStore} context={UnsafeContext}>  
          {UnsafeConsumers}
      </ReactReduxContext.Provider>
    </ApiErrorBoundary>
  );
};
export default ApiProviderConnector;
