import React, { Component } from 'react'
import TaskItem from './TaskItem';

export class TaskList extends Component {

  state = {
      filterName: '',
      filterStatus: -1 //all -1 active 1 deactive 0
  };

  onChange = ({target: { name, value }}) => {
    this.props.onFilter(
      // newFilterName,
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    );
    this.setState({[name] : value});
  }

  render() {
    const { tasks, onUpdateStatus, onDeleteTask, onEditTask } = this.props;
    const { filterName, filterStatus } = this.state;
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input 
                className="form-control" 
                type="text" 
                name='filterName' 
                value={filterName} 
                onChange={this.onChange} 
              />
            </td>
            <td>
              <select
                className='form-control'
                name='filterStatus'
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {tasks.map(({id, name, status}, idx) => <TaskItem 
                                                    idx={idx} 
                                                    id={id}
                                                    name={name} 
                                                    status={status} 
                                                    key={id}
                                                    onUpdateStatus={onUpdateStatus}
                                                    onDeleteTask={onDeleteTask}
                                                    onEditTask={onEditTask}
                                                  />)}
        </tbody>
      </table>
    )
  }
}

export default TaskList
