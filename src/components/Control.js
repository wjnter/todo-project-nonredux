import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

export default class Control extends Component {
  onSearch = keyword => this.props.onSearch(keyword);
  onSort = (sortBy, sortValue) => this.props.onSort(sortBy, sortValue);
  render() {
    return (
      <div className="row mt-5">
        <Search 
          onSearch={this.onSearch}
        />
        <Sort 
          onSort={this.onSort}
        />
      </div>
    );
  }
}
