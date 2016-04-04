import React from 'react';

export default class InsertView extends React.Component {
  render() {
    return (
      <div className="sub-view">
        <h1 className="sub-view__title">Insert a record</h1>
        <div className="sub-view__body">
          <ul className="actions-list">
            <li className="actions-list__item">
              <button id="btn-pee" className="actions-list__action">Pee</button>
            </li>
            <li className="actions-list__item">
              <button id="btn-poop" className="actions-list__action">Poop</button>
            </li>
            <li className="actions-list__item">
              <button id="btn-breast" className="actions-list__action">Breast</button>
            </li>
            <li className="actions-list__item">
              <button id="btn-formula" className="actions-list__action">Formula</button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
