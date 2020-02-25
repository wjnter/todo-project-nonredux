import React, { Component } from 'react';

export default class Control extends Component {
  render() {
    return (        
      <div className="col-6">
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Sắp Xếp 
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li>
                <a role="button">
                  <span className="fa fa-sort-alpha-asc pr-1">
                    Tên A-Z
                  </span>
                </a>
              </li>
              <li>
                <div role="button">
                  <span className="fa fa-sort-alpha-desc pr-1">
                    Tên Z-A
                  </span>
                </div>
              </li>
              <li role="separator" className="divider"></li>
              <li><div role="button">Trạng Thái Kích Hoạt</div></li>
              <li><div role="button">Trạng Thái Ẩn</div></li>
            </ul>
        </div>
      </div>
    );
  }
}
