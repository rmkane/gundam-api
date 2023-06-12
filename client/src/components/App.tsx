import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import { Footer, Header, Main } from './layout';

function App() {
  useEffect(() => {
    UIkit.use(Icons);
  }, []);
  return (
    <HashRouter>
      <>
        <Header />
        <Main />
        <Footer />
      </>
    </HashRouter>
  );
}

export default App;
