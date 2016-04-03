import Q from 'q'
import Bacon from 'baconjs'
import React from 'react'
import ReactDOM from 'react-dom'

import MainView from './pages/main'
import {routerConfig, hash$} from './router'

const root = document.getElementById('app');

hash$.map(hash => routerConfig[hash])
.onValue(config => {
  ReactDOM.render(<MainView subView={config.subView} subViewData={null} />, root);
  Q.all(config.data).then(data =>
    ReactDOM.render(<MainView subView={config.subView} subViewData={data} />, root)
  );
});
