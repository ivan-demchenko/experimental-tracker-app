import React from 'react';

export default class LogsView extends React.Component {
  render() {
    let items = this.props.data && this.props.data[0]
      ? this.props.data[0].map((x, i) => (<li key={i}>{x}</li>))
      : [];
    return (
      <div>
        <h1>Logs</h1>
        <ul>{items}</ul>
      </div>
    )
  }
}
