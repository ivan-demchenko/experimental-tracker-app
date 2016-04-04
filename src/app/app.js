import Bacon from 'baconjs'
import React from 'react'
import ReactDOM from 'react-dom'

import MainView from './pages/main'
import Router from './router'

const root = document.getElementById('app');


Bacon.combineTemplate({
  subView: Router.subView,
  subViewData: Router.subViewData
})
.doLog()
.onValue(conf => {
  ReactDOM.render(<MainView subView={conf.subView} subViewData={conf.subViewData} />, root)
})
