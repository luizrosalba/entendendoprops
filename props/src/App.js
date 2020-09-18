import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';



function App() {
  
  function WelcomeFuncao(props) {
    return <h1>Hello, {props}</h1>;
  }
  
  function WelcomeFuncaoAtrib(props) {
    
    return (
      <>
        <h1>Nome, {props.name}</h1> 
        <h1>Endereco, {props.endereco}</h1>
      </>
    );
    
  }
  
  let nada = {
    name:"luiz name",
    endereco:"Lopes "
  }
  
  return (
    <div className="App">
      <header className="App-header">
      <WelcomeClass name="Dani" />
      <label> {WelcomeFuncao("Luiz")}    </label>  
      <label> {WelcomeFuncaoAtrib(nada)}    </label>  

      <button onClick={()=>alert('Ola')}>
        Me clique  ! 
       </button>
        

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

