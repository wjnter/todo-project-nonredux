import React, { Component } from 'react'

export class TaskForm extends Component {
  state = {
    id: '',
    name: '',
    status: false
  };

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = ({target: {name, value}}) => this.setState({[name] : value})

  onSubmit = event => {
    event.preventDefault();
    this.onClear();
    console.log(this.state);
    this.props.onSubmit(this.state);
    this.onCloseForm();
  }

  onClear = () => this.setState({id: '', name: '', status: false})

  componentDidMount() {
    this.props.taskEditing && this.setState({ id: this.props.taskEditing.id,
                                              name: this.props.taskEditing.name,
                                              status: this.props.taskEditing.status
                                            });
    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEditing) {
      this.setState({ 
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status
      });
    } else if (nextProps.taskEditing == null) {
      this.setState({ 
        id: '',
        name: '',
        status: false
      });
    }
  }

  render() {
    const { taskEditing } = this.props;  
    return (
      <div className="card"> 
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5>{this.state.id ? 'Chỉnh Sửa Công Việc' : 'Thêm Công Việc'}</h5>
            <span 
              className='fa fa-times-circle'
              onClick={this.onCloseForm}  
            ></span>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Tên :</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name='name' 
                  value={this.state.name}
                  onChange={this.onChange}
                />
            </div>
            <label>Trạng Thái :</label>
            <select 
              className="form-control" 
              required="required" 
              name='status'
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value="true">Kích Hoạt</option>
              <option value="false">Ẩn</option>
            </select>
            <br/>
            <div className="text-center">
              <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm
