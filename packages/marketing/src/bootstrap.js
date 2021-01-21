import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from "history";
import App from './App';

// Mount function to start up the app
const mount = (el, { onNavigate }) => {
  const history = createMemoryHistory();
  // history object that cames back from calling createMemoryHistory has an event listener tied to it called "listen()"
  // console.log(history);
  // Whenever navigation "navigation === chenges in url path" occures history.listen() will call function onNavigate
  
  if (onNavigate) {
  history.listen(onNavigate);
  }


  ReactDOM.render(<App history={history} />, el);

  // Each time when container navigates it does the stuff above and the return 
  // object below and calls onParentNavigate()
  return {
    // gets location object as arg because called from history object from MarketingApp
    onParentNavigate({ pathname: nextPathname}) {

      const { pathname } = history.location; // from MemoryHistory

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }

      // for not getting in infinite loop we need to check if pathname is different from nextPathname
      // console.log(location);
      // console.log("Container just navigated");
    }
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, {});
  }
}

// We are running through container
// and we should export the mount function
export { mount };
