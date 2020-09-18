import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       


      </header>
    </div>
  );
}

export default App;


class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

function WelcomeFuncao(props) {
  return <h1>Hello, {props.name}</h1>;
}

