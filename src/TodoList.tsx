import React from 'react'
import TodoItem from './TodoItem'
import * as Types from './types';

type State = {
  newTodoText: string,
  newTodoId: number,
  todos: Types.TodoList
}

class TodoList extends React.PureComponent<{}, State> {
  state = {
    newTodoText: '',
    newTodoId: 6,
    todos: [
      { id: 0, text: 'Buy milk', isDone: false },
      { id: 1, text: 'Make dinner', isDone: false },
      { id: 2, text: 'Clean a house', isDone: false },
      { id: 3, text: 'Wash clothes', isDone: false },
      { id: 4, text: 'Fix car', isDone: false },
      { id: 5, text: 'Watch TV', isDone: false },
    ]
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTodoText: e.target.value })
  }

  handleClick = () => {
    if (this.state.newTodoText === '') {
      return;
    }

    const newTodo = {
      id: this.state.newTodoId,
      text: this.state.newTodoText,
      isDone: false
    }
    this.setState((prevState) => ({
      newTodoText: '',
      newTodoId: prevState.newTodoId + 1,
      todos: prevState.todos.concat(newTodo)
    }))
  }

  handleCheck = (todoId: number) => () => {
    this.setState(prevState => ({
      todos: this.markTodoChecked(prevState.todos, todoId)
    }))
  }

  handleRemove = (todoId: number) => () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId)
    }))
  }

  markTodoChecked = (todos: Types.TodoList, todoId: number): Types.TodoList => {
    return todos.map(todo => todo.id === todoId ? { ...todo, isDone: !todo.isDone }: todo )
  }

  render(): React.ReactNode {
    return (
      <div className="todoList">
        <div className="todoInput">
          <input
            type="text"
            className="todoTextInput"
            value={this.state.newTodoText}
            onChange={this.handleInput}
          />
          <button type="submit" className="todoAddButton" onClick={this.handleClick}>Add</button>
        </div>
        {
        this.state
          .todos
          .sort(todo => todo.id)
          .map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              handleCheck={this.handleCheck}
              handleRemove={this.handleRemove}
            />)
          )
        }
      </div>
    )
  }
}

export default TodoList
