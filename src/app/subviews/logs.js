import React from 'react';

export default class LogsView extends React.Component {
  render() {
    let items = this.props.data && this.props.data[0]
      ? this.props.data[0].map((x, i) => (<li className="logs__entry" key={i}>{x}</li>))
      : [];
    return (
      <div className="sub-view">
        <h1 className="sub-view__title">Logs</h1>
        <div className="sub-view__body">
          <ul className="logs">{items}</ul>
        </div>
      </div>
    )
  }
}
