import Bacon from 'baconjs'
import Storage from './services/storage'
import LoadingView from './components/loading'
import LogsView from './subviews/logs'
import InsertView from './subviews/insert'

export let routerConfig = {
  'logs': {
    subView: LogsView,
    data: [Storage.get('items')]
  },
  'insert': {
    subView: InsertView,
    data: []
  }
}

export let hash$ = Bacon.fromEvent(window, 'hashchange')
.map(evt => evt.newURL.split('/#')[1])
.startWith(location.hash.substr(1) || 'logs');
