import React, { Component } from 'react';

export default class Control extends Component {
  state = {
    keyword: ''
  };
  onChange = ({target: {name, value}}) => this.setState({[name]: value})
  onSearch = () => this.props.onSearch(this.state.keyword);
  render() {
    return ( 
      <div className="col-6">
        <div className="input-group">
          <input 
            type="text" 
            name='keyword' 
            className="form-control" 
            placeholder="Nhập từ khóa..." 
            value={this.state.keyword}
            onChange={this.onChange}
          />
          <span className="input-group-btn">
          <button className="btn btn-primary" type="button" onClick={this.onSearch}>
            <span className="fa fa-search mr-1"></span>Tìm
          </button>
          </span>
        </div>
      </div>
    );
  }
}
