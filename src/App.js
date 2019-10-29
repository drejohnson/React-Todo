import React from 'react';
import TodoForm from './components/TodoComponents/TodoForm';
import TodoList from './components/TodoComponents/TodoList';
import styled from 'styled-components/macro';

import GlobalStyles from './style/GlobalStyles';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor() {
    super();
    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')) || [
        {
          id: Date.now(),
          task: 'Finish Todo MVP project',
          completed: true,
        },
      ],
    };
  }

  componentDidMount() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  addTodo = title => {
    const newTodo = {
      id: Date.now(),
      task: title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
    localStorage.setItem(
      'todos',
      JSON.stringify([...this.state.todos, newTodo]),
    );
  };

  markComplete = id => {
    const newTodos = [...this.state.todos];
    newTodos
      .filter(todo => todo.id === id)
      .map(todo => (todo.completed = !todo.completed));
    this.setState(newTodos);
  };

  clearTodos = e => {
    e.preventDefault();
    this.setState({
      todos: this.state.todos
        .filter(todo => todo.completed !== true)
        .map(todo => todo),
    });
    localStorage.setItem(
      'todos',
      JSON.stringify(
        this.state.todos
          .filter(todo => todo.completed !== true)
          .map(todo => todo),
      ),
    );
  };

  render() {
    return (
      <>
        <GlobalStyles />
        <Wrapper>
          <h2>Welcome to your Todo App!</h2>
          <TodoForm addTodo={this.addTodo} clearTodos={this.clearTodos} />
          <TodoList todos={this.state.todos} markComplete={this.markComplete} />
        </Wrapper>
      </>
    );
  }
}

export default App;
