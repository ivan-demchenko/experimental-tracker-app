import Q from 'q'
import Bacon from 'baconjs'
import Storage from './services/storage'
import LoadingView from './components/loading'
import LogsView from './subviews/logs'
import InsertView from './subviews/insert'

const hash = Bacon.fromEvent(window, 'hashchange')
.map(evt => evt.newURL.split('/#')[1])
.toProperty(location.hash.substr(1) || 'logs');

const subView = Bacon.once({
  'logs': LogsView,
  'insert': InsertView
})
.toProperty()
.sampledBy(hash, (conf, hash) => conf[hash])

const subViewData = Bacon.once({
  'logs': () => [Storage.get('items')],
  'insert': () => []
})
.toProperty()
.sampledBy(hash, (conf, hash) => conf[hash]())
.map(Q.all)
.flatMap(Bacon.fromPromise)

export default {hash, subView, subViewData}
