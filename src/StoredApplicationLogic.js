/**
 * Overall Schemas
 * 
 * 
                    +----------------------------------------------------+                                 
                    |                     Redux Store                    |                                 
                    |  +----------++------------------+    +---------+   |                                 
                    |  |          || <- Action 1      |    |         |   |                                 
                    |  | Internal |+------------------+    |         |   |                                 
                    |  |   Data   ||                  |    |         |   |                                 
                    |  |          || <- Action 2      | ---| Reducer |   |                                 
                    |  |          |+------------------+    |         |   |                                 
                    |  |          || <- Action 3      |    |         |   |                                 
                    |  +----------++------------------+    +---------+   |                                 
                    |                                                    |                                                                
                    +------------|-------------------------+---------+---+                                 
                                |                         | Store   |             dispatch(Action):state  
    Connection to Redux Store    |                         | Gateway | ----------  getState():state        
    is implicily provided ---->  |                         +---------+             subscribe(listener)     
    by react-redux               |                                                                         
                                |                                                                         
                    +------------|--------------------------------------+                                                                 
                    |              React Redux Provider                 |                                 
                    |   +-------------------------------------------+   |                                 
                    |   |                                           |   |                                 
                    |   |                                           |   |                                 
                    |   |                                           |   |                                 
                    |   |         Application Or Feature            |   |                                 
                    |   |                                           |   |                                 
                    |   |                                           |   |                                 
                    |   |                                           |   |                                 
                    |   |                                           |   |                                 
                    |   |                                           |   |                                 
                    |   +-------------------------------------------+   |                                 
                    |                                                   |                                 
                    +---------------------------------------------------+                                 
                                                                                    
 */

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

const API = 'https://www.reddit.com/r/reactjs/.json';

const INITIAL_STATE = {
  defaultValue: 'INITIAL_STATE'
};

const apiReducer = (state = INITIAL_STATE, action) => {
  console.groupCollapsed('Reducer Logs : Open to watch Initial Call')
  console.trace(action);
  console.groupEnd();
  return state;

};

// Redux will make a first call to the apiReducer;
const store = createStore(apiReducer);

// HOC Abstraction to provide a react-redux ContextProvider for this specific Store
// Side Note : this a usefull way to provide a simplier wrapper
const ApiProviderConnector = ({ Component }) => {
  const ConnectedComponent = connect()(Component);
  console.log(
      '%c %s',
      'color:blue',
      `
Your Application is now connected to the Store Context

through the ApiProviderConnector Context
`
      );
  return <Provider {...{ store }}><ConnectedComponent/></Provider>;
};


export default ApiProviderConnector;
