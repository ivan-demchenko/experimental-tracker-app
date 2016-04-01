import Bacon from 'baconjs'

Bacon.fromEvent(document, 'hashchange').log();

let tabsSwitch = Bacon.fromEvent(document.querySelector('.nav-tabs'), 'click')
.map(e => e.target.dataset.view)
.doAction(x => window.location.hash = x)
.startWith('logs').log()
