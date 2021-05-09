import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from '@/stores/reducers';
import App from './App';
import '@/assets/css/vendor.less';

const store = createStore(rootReducers);

export default function RootApp() {
  return (
    <div className="app-wrap">
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </div>
  );
}
