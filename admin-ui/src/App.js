import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './shared/layout/appLayout';
import './assets/css/main-craftsmen.css';
import './assets/css/nucleo-icons.css';
import './assets/css/nucleo-svg.css';
import './assets/css/soft-ui-dashboard.css?v=1.0.3';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    // <Provider store={store}>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
