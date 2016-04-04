import React from 'react';
import NavTabs from '../components/nav-tabs'
import {NavTabIntention} from '../intentions/nav-tabs'

export default class MainView extends React.Component {

  componentDidMount() {
    this.navIntention = NavTabIntention();
  }

  componentWillUnmount() {
    this.navIntention();
  }

  render() {
    const SubView = this.props.subView;
    const data = this.props.subViewData;
    return (
      <div className="app">
        <div className="app__body"><SubView data={data} /></div>
        <div className="app__nav"><NavTabs /></div>
      </div>
    );
  }
}
