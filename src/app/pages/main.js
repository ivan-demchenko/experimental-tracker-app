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
      <div>
        <div><SubView data={data} /></div>
        <div><NavTabs /></div>
      </div>
    );
  }
}
