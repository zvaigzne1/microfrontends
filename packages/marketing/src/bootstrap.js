import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Mount function to start up the app

const mount = (el) => {
    ReactDOM.render(
        <App />,
        el
    );
};


// Case #1 If we are in development and in isolation,
// call mount immediatly

if (process.env.NODE_ENV === "development") {
    const devRoot = document.getElementById("_marketing-dev-root");

    if (devRoot) {
        mount(devRoot);
    }
}

// Case #2 We are running through container and we should 
// export the mount function
export { mount };
