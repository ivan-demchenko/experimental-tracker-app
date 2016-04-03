import Bacon from 'baconjs'

const closestByTag = (tagName) => (elem) => elem.classList.contains(tagName)
  ? elem
  : elem.parentElement.classList.contains(tagName)
    ? elem.parentElement
    : closestByTag(tagName)(elem);

const getEl = selector => document.querySelector(selector)

export let NavTabIntention = () => Bacon.fromEvent(getEl('.nav-tabs'), 'click')
.map(e => e.target)
.map(closestByTag('nav-tabs__item'))
.map(el => el.dataset.view)
.onValue(hash => window.location.hash = hash);
