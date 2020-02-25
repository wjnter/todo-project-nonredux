import React, { Component } from 'react';

export class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.id)
  }
  onDeleteTask = () => {
    this.props.onDeleteTask(this.props.id)
  }
  onEditTask = () => {
    this.props.onEditTask(this.props.id)
  }
  render() {
    const { idx, name, status } = this.props;
    return (
      <tr>
        <td>{idx + 1}</td>
        <td>{name}</td>
        <td className="text-center">
          <span 
            className={`badge ${status ? 'badge-success' : 'badge-secondary'}`}
            onClick={this.onUpdateStatus}  
          >
            {status ? 'Kích hoạt' : 'Ẩn'}
          </span>
        </td>
        <td className="text-center">
          <button 
            type="button" 
            className="btn btn-warning"
            onClick={this.onEditTask}
          >
            <span className="fa fa-pencil mr-1"></span>Sửa
          </button>
          &nbsp;
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={this.onDeleteTask}
          >
            <span className="fa fa-trash mr-1"></span>Xóa
          </button>
        </td>
      </tr>
    )
  }
}

export default TaskItem
