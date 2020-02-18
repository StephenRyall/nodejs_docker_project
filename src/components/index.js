import React, { Component } from "react";
import ReactDOM from "react-dom";
import fetch from "node-fetch"
import Button from '@material-ui/core/Button';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      todoList: [],
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    fetch('/gettodos', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
      .then(res => res.json())
      .then(json => {
        this.setState({
          todoList: json.todos
        })
      })
      .catch(err => {
        throw err
      })
  }

  addTodo(add) {
    fetch('/addtodo',
      {
        method: 'POST',
        body: JSON.stringify({ todo: add }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => ({
          todoList: [...prevState.todoList, add],
          value: ""
        }))
      })
      .catch(err => {
        throw err
      })
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  render() {
    const { loading, todoList, value } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            value={value}
            onChange={this.handleChange}
          />
          <Button variant="contained" onClick={() => this.addTodo(value)} >
            <p>
              Add Todo
            </p>
          </Button>
          {todoList.length == 0 ?
            <p>No todos to display</p>
            :
            <ul>
              {todoList.map((todo, i) => {
                return <li key={i}>{todo}</li>
              })}
            </ul>
          }

        </form>
      </div>

    );
  }
}

export default Form;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;