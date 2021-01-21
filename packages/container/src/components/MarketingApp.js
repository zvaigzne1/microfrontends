import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
// reseiving object from marketing/src/bootstrap.js mount function
// and from received object we destructure onParentNavigate func

    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }

        // Navigates to nextPathname

        // console.log(nextPathname);
        // console.log(location);
        //listen function (marketing/src/bootstrap) that is calling onNavigate
        // is going to give argument which is object "location" which
        // gives info about where we are going navigate to inside of
        // the marketing
        // console.log("The container noticed navigation in Marketing");
      },
    });

    // Anytime that there is change on browser history we call onParentNavigate
    history.listen(onParentNavigate);
  }, []);

  // useEffect without second arg - runs allways when updated or changed marketing component
  // with dependecy array [] as second arg run exatly one time when 
  // marketing app component is rendered for first time

  return <div ref={ref} />;
};
