import React from 'react';
import * as Types from './types';

type Props = {
  todo: Types.Todo,
  handleCheck: (todoId: number) => () => void
  handleRemove: (todoId: number) => () => void
}

const TodoItem: React.FC<Props> = (props: Props) => {
  return (
    <div className="todoItem">
      <div className={props.todo.isDone ? 'done' : 'undone'}>
        {props.todo.id + 1}. {props.todo.text}
      </div>
      <div className="todoActions">
        <span
          className="checkTodo"
          onClick={props.handleCheck(props.todo.id)}
        >
          {props.todo.isDone ? 'UNDO' : 'DONE'}
        </span>
        <span
          className="removeTodo"
          onClick={props.handleRemove(props.todo.id)}
        >
          REMOVE
        </span>
      </div>
    </div>
  )
}

export default TodoItem
