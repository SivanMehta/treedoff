import React, { Component } from 'react';
import './App.css';
import faker from 'faker'

class App extends Component {

  getStatements() {
    var statements = []
    for(var i = 0 ; i < 3; i ++) {
      statements.push(
        <tr>
          <td>
            { faker.hacker.phrase() }
          </td>
          <td>
            { faker.hacker.phrase() }
          </td>
        </tr>
      )
    }

    return statements
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Treedoff</h2>
        </div>
        <table className="App-intro">
          <thead>
            <tr>
              <td>Pro</td><td>Con</td>
            </tr>
          </thead>
          <tbody>
            { this.getStatements() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
