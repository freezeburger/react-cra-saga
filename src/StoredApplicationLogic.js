import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, ReactReduxContext, connect } from 'react-redux';
import { timeSagaMiddleware, timeSagaRun } from './StoreApplicationSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

// const API = 'https://www.reddit.com/r/reactjs/.json';

const INITIAL_STATE = {
  defaultValue: 'INITIAL_STATE',
  time: {}
};

const apiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@@POLING_TIME_START':
      return Object.assign({}, state, { polling: true });
    case '@@POLING_TIME_END':
      return Object.assign(
        {},
        state,
        { polling: false },
        { time: action.data }
      );
    default:
      return state;
  }
};


// https://github.com/zalmoxisus/redux-devtools-extension
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  apiReducer,
  /* Due to Middlewares */
  composeWithDevTools(applyMiddleware(timeSagaMiddleware))
);

timeSagaRun();
store.dispatch({type:'INIT_SAGA_WORKERS'})

// Moved To Saga
// Store Internal Logic
/* (() => {
  setInterval(
    async () => {
      store.dispatch({type:'@@POLING_TIME_START'});
      const data = await fetch(TIME).then(res => res.json());
      store.dispatch({type:'@@POLING_TIME_END',data});
    },
    5000
  );
})(); */

const ApiProviderConnector = ({ mapper = () => ({}), Component }) => {
  const ConnectedComponent = connect(mapper, null, null)(Component);

  console.log(
    '%c %s',
    'color:blue',
    `
Your Application is now connected to the Store Context

through the ApiProviderConnector Context
`
  );
  return (
    <Provider store={store}>
      <ConnectedComponent />
    </Provider>
  );
};

class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError({ message }) {
    return { hasError: true, message };
  }
  shouldComponentUpdate() {
    return !this.state.hasError;
  }
  render() {
    if (this.state.hasError) {
      return <h1>{this.state.message}</h1>;
    }
    return this.props.children;
  }
}

// Moving on to Context
const ProxyfiedStore = {
  getState() {
    throw Error('🚫 Prohibited access to state 🚫');
  },
  subscribe() {},
  dispatch() {}
};

const UnsafeContext = React.createContext();

export const ApiProviderUnsafeContext = ({ children: UnsafeConsumers }) => {
  console.log(
    '%c %s',
    'color:violet',
    `
  Your belong to an Unsafe Context !!!
  `
  );
  return (
    <ApiErrorBoundary>
      {/*  Switch the store in Unsafe Context */}
      <ReactReduxContext.Provider
        value={{ store: ProxyfiedStore }}
        context={UnsafeContext}
      >
        {UnsafeConsumers}
      </ReactReduxContext.Provider>
    </ApiErrorBoundary>
  );
};
export default ApiProviderConnector;
