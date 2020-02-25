import React, { Component } from 'react';
// import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';


class App extends Component {
  state = {
    tasks: [],
    isOpenForm: false,
    taskEditing: null,
    filter: {
      name: '',
      status: -1
    },
    keyword: ''
  };
  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({tasks, filteredTasks: tasks});
    }
  }

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID = () => {
    return `${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}`;
  }

  onCloseForm = () => this.setState({isOpenForm: false, taskEditing: null})

  onOpenForm = () => {
    if (this.state.taskEditing && this.state.taskEditing.id) {
      this.setState({ isOpenForm: true, taskEditing: null });
    }
    this.setState({isOpenForm: true});
  }

  onSubmit = (task) => {
    const { tasks} = this.state;
    task.status = task.status === false ? false : true;
    if (task.id === '') {
      const newTask = {
        id: this.generateID(),
        name: task.name,
        status: task.status
      }
      this.setState({tasks: [...this.state.tasks, newTask], filteredTasks: [...this.state.tasks, newTask]});
      localStorage.setItem('tasks', JSON.stringify([...this.state.tasks, newTask]));
    } else {
      const idx = tasks.findIndex(item => item.id === task.id);
      tasks[idx] = task;
      this.setState({ tasks, taskEditing: null, filteredTasks: tasks });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onUpdateStatus = id => {
    const { tasks } = this.state;
    const idx = tasks.findIndex(task => task.id === id);
    if (idx !== -1) {
      tasks[idx].status = !tasks[idx].status;
      this.setState({
        tasks,
        filteredTasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onDeleteTask = id => {
    const { tasks } = this.state;
    const filteredTasks = tasks.filter(task => task.id !== id);
    this.setState({tasks: filteredTasks, filteredTasks});
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    this.onCloseForm();
  }

  onEditTask = id => {
    const { tasks } = this.state;
    const idx = tasks.findIndex(task => task.id === id);
    const newTaskEditing = tasks[idx];
    this.setState({taskEditing: newTaskEditing});
    this.onOpenForm();
  }

  onFilter = (name, status) => this.setState({filter: {name, status}});
  // onFilter = (filterName, filterStatus) => {
  //   const { tasks } = this.state;
  //   let newFilteredTasks;
  //   switch (-filterStatus) {
  //     case -1: {
  //       newFilteredTasks = tasks.filter(task => task.status === true)
  //                     .filter(task => task.name.toLowerCase().includes(filterName.toLowerCase()));
  //       break;
  //     }
  //     case 0: {
  //       newFilteredTasks = tasks
  //                     .filter(task => task.status === false)
  //                     .filter(task => task.name.toLowerCase().includes(filterName.toLowerCase()));
  //       break;
  //     }
  //     case 1: {
  //       newFilteredTasks = tasks.filter(task => task.name.toLowerCase().includes(filterName.toLowerCase()));
  //       break;
  //     }
  //     default: {console.log('Error')}
  //   }
  //   console.log(newFilteredTasks)
  //   this.setState({filteredTasks: newFilteredTasks});
  // }

  onSearch = keyword => this.setState({keyword})

  render() {
    let { tasks, isOpenForm, taskEditing, filteredTasks, keyword, filter } = this.state;
    const newFilterStatus = +(filter.status) === 1 ? true : false

    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => task.name.toLowerCase().includes(filter.name.toLowerCase()));
      }
      tasks = tasks.filter(task => {
        if (+filter.status === -1) {
          return task;
        }
        return task.status === newFilterStatus;
      });
    }

    if (keyword.length > 0) {
      tasks = tasks.filter(task => task.name.toLowerCase().includes(keyword.toLowerCase()))
      console.log(tasks)
    } 

    return ( 
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr/>
        </div>
        <div className="row">
          {/* Task Form */}
          {isOpenForm && (
            <div className="col-4">
              <TaskForm 
                onCloseForm={this.onCloseForm} 
                onSubmit={this.onSubmit}
                taskEditing={taskEditing}
              />
            </div>
          )}
          <div className={isOpenForm ? 'col-8' : 'col-12'}>
            {/* Thêm công việc */}
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={this.onOpenForm}
            >
              Thêm Công Việc
            </button>
            {/* Search and Sort */}
            <Control 
              onSearch={this.onSearch}
            />
            <div className="row mt-5">
              <div className="col-12">
                <TaskList 
                  tasks={tasks}
                  // tasks={filteredTasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDeleteTask={this.onDeleteTask}
                  onEditTask={this.onEditTask}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
