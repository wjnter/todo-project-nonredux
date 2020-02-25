import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

export default class Control extends Component {
  onSearch = keyword => this.props.onSearch(keyword);
  render() {
    return (
      <div className="row mt-5">
        <Search 
          onSearch={this.onSearch}
        />
        <Sort />
      </div>
    );
  }
}
