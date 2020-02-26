import React, { Component } from 'react';

export default class Control extends Component {
  state = {
    sortBy: 'name',
    sortValue: 1
  }
  onClick = (sortBy, sortValue) => () => {
    this.props.onSort(sortBy, sortValue);
    this.setState({sortBy, sortValue});
  }
  render() {
    const { sortValue, sortBy } = this.state;
    return (        
      <div className="col-6">
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Sắp Xếp 
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li className="dropdown-item" onClick={this.onClick('name', 1)}>
                <div className={sortBy === 'name' && sortValue === 1 ? 'sort-selected' : ''}>
                  <span className="fa fa-sort-alpha-asc">
                  </span>
                  <span className='ml-3'>Tên A-Z</span>
                </div>
              </li>
              <li className="dropdown-item" onClick={this.onClick('name', -1)}>
                <div className={sortBy === 'name' && sortValue === -1 ? 'sort-selected' : ''}>
                  <span className="fa fa-sort-alpha-desc">
                  </span>
                  <span className='ml-3'>Tên Z-A</span>
                </div>
              </li>
              <li role="separator" className="divider"></li>
              <li className="dropdown-item" onClick={this.onClick('status', 1)}>
                <div className={sortBy === 'status' && sortValue === 1 ? 'sort-selected' : ''}>
                  Trạng Thái Kích Hoạt
                </div>
              </li>
              <li className="dropdown-item" onClick={this.onClick('status', -1)}>
                <div className={sortBy === 'status' && sortValue === -1 ? 'sort-selected' : ''}>
                  Trạng Thái Ẩn
                </div>
              </li>
            </ul>
        </div>
      </div>
    );
  }
}
