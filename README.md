# Endendendo props 

npx create-react-app my-app

## Entendendo de vez props 

- Posso escrevero mesmo codigo em função ou classe 
Componente Funcional 

```
  function WelcomeFuncao(props) {
    return <h1>Hello, {props}</h1>;
  }

```
Componente Classe

```
class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Convertendo uma Função para uma Classe

Você pode converter um componente de função como Clock em uma classe em cinco etapas:

Criar uma classe ES6, com o mesmo nome, estendendo React.component.
Adicionar um único método vazio chamado render().
Mova o corpo da função para o método render().
Substitua props por this.props no corpo de render().
Exclua a declaração da função vazia restante.

```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
```
``` 
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

```
No entanto, falta um requisito crucial: o fato de que o Clock configura um temporizador e atualiza a UI a cada segundo deve ser um detalhe de implementação do Clock.


Idealmente, queremos escrever isto uma vez e ter o Clock se atualizando:
Para implementá-lo, precisamos adicionar um “state” ao componente Clock.

O state do componente é similar as props, mas é privado e totalmente controlado pelo componente.
Adicionando Estado Local a uma Classe
Vamos mover a date da props para o state em três passos:

Substitua this.props.date por this.state.date no método render():

```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

```
Adicione um construtor na classe que atribui a data inicial no this.state:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
Note como nós passamos props para o construtor:

```
 constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```
Componentes de classes devem sempre chamar o construtor com props.
Remova a props date do elemento <Clock />:

```
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
Mais tarde, adicionaremos o código do temporizador de volta ao próprio componente.
O Resultado se parece com:
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

```
Adicionando Métodos de Ciclo de Vida a Classe
Em aplicações com muitos componentes, é muito importante limpar os recursos utilizados pelos componentes quando eles são destruídos.

Queremos configurar um temporizador sempre que o Clock é renderizado para o DOM pela primeira vez. Isso é chamado de “mounting” no React.

Nós também queremos limpar o temporizador sempre que o DOM produzido pelo Clock for removido. Isso é chamado de “unmounting” no React.

Podemos declarar métodos especiais no componente de classe para executar algum código quando um componente é montado e desmontado:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

```
Estes métodos são chamados de “métodos de ciclo de vida”.

O método componentDidMount() é executado depois que a saída do componente é renderizada no DOM. Este é um bom lugar para configurar um temporizador:

```
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```
Note como nós salvamos o ID do temporizador em this (this.timerID).

Enquanto this.props é configurado pelo próprio React e this.state tem um significado especial, você está livre para adicionar campos adicionais à classe manualmente se precisar armazenar algo que não participe do fluxo de dados (como um ID do temporizador)

Vamos derrubar o temporizador no método do ciclo de vida componentWillUnmount():

```
 componentWillUnmount() {
    clearInterval(this.timerID);
  }
```
Finalmente, vamos implementar um método chamado tick() que o componente Clock executará a cada segundo.

Ele usará this.setState() para agendar atualizações para o estado local do componente:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
Agora o relógio bate a cada segundo.

Vamos recapitular rapidamente o que está acontencendo e a ordem na qual os métodos são chamados:

Quando <Clock /> é passado para ReactDOM.render(), o React chama o construtor do componente Clock. Como Clock precisa exibir a hora atual, ele inicializa this.state com um objeto incluindo a hora atual. Mais tarde, atualizaremos este state.
React chama então o método render() do componente Clock. É assim que o React aprende o que deve ser exibido na tela. React em seguida, atualiza o DOM para coincidir com a saída de renderização do Clock.
Quando a saída do Clock é inserida no DOM, o React chama o método do ciclo de vida componentDidMount(). Dentro dele, o componente Clock pede ao navegador para configurar um temporizador para chamar o método tick() do componente uma vez por segundo.
A cada segundo o navegador chama o método tick(). Dentro dele, o componente Clock agenda uma atualização de UI chamando setState() com um objeto contendo a hora atual. Graças à chamada setState(), o método render() será diferente e, portanto, a saída de renderização incluirá a hora atualizada. React atualiza o DOM de acordo.
Se o componente Clock for removido do DOM, o React chama o método do ciclo de vida componentWillUnmount() para que o temporizador seja interrompido.
Usando o State Corretamente
Existem três coisas que você deve saber sobre setState().

Não Modifique o State Diretamente
Por exemplo, isso não renderizará novamente o componente:

```
// Errado
this.state.comment = 'Hello';
```
Em vez disso, use setState():
```
// Correto
this.setState({comment: 'Hello'});
```

O único lugar onde você pode atribuir this.state é o construtor.

Atualizações de State Podem Ser Assíncronas
O React pode agrupar várias chamadas setState() em uma única atualização para desempenho.

Como this.props e this.state podem ser atualizados de forma assíncrona, você não deve confiar em seus valores para calcular o próximo state.

Por exemplo, esse código pode falhar ao atualizar o contador:

```
// Errado
this.setState({
  counter: this.state.counter + this.props.increment,
});

```
Para consertá-lo, use uma segunda forma de setState() que aceite uma função ao invés de um objeto. Essa função receberá o state anterior como o primeiro argumento e as props no momento em que a atualização for aplicada como o segundo argumento:


```
// Correto
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
Usamos uma arrow function acima, mas também funciona com funções regulares:
```
// Correto
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});

```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```

```
```






Posso ainda usar props com atributos 

```


function App() {
    function WelcomeFuncaoAtrib(props) {
    
    return <h1>Hello, {props.name}</h1>;
  }
  
  let nada = {
    name:"luiz name",
  }

  
  return (
    <div className="App">
      <header className="App-header">
     
      <label> {WelcomeFuncaoAtrib(nada)}    </label>  


      </header>
    </div>
  );
}

```

Posso executar uma funcao com o clique de um botao 
```
 <button onClick={()=>alert('Ola')}>
        Me clique  ! 
       </button>
```


Posso atualizar o estado de variaveis dentro da minha classe 

```

import React, { Component } from 'react';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  
  return (
    <button onClick={() => this.setState({ count: 1})}>
      Click me!
    </button>
  );
}

export default App;

```

e também dentro da minha função 

```

import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(1)}>
      Click me!
    </button>
  );
}

export default App;

```

Nota: Sempre inicie os nomes dos componentes com uma letra maiúscula.

O React trata componentes começando com letras minúsculas como tags do DOM. Por exemplo, <div /> representa uma tag div do HTML, mas <Welcome /> representa um componente e requer que Welcome esteja no escopo.

Você pode ler mais sobre o raciocínio por trás dessa convenção aqui.


Props são Somente Leitura
Independente se você declarar um componente como uma função ou uma classe, ele nunca deve modificar seus próprios props. Considere essa função sum:
function sum(a, b) {
  return a + b;
}

Tais funções são chamadas “puras” porque elas não tentam alterar suas entradas e sempre retornam o mesmo resultado para as mesmas entradas.

Em contraste, essa função é impura porque altera sua própria entrada:

function withdraw(account, amount) {
  account.total -= amount;
}

React é bastante flexível mas tem uma única regra estrita:

Todos os componentes React tem que agir como funções puras em relação ao seus props.


Más práticas de programação 
```

<button onClick={() => functionName}>    Click me! </button>  //Errado ! falta parenteses apos function name 

// <button onClick={sayHello()}>  Click me! </button> // má pratica nao executar a funcao dentro do event handeler

// <button onClick={() => {  this.sayHello();   this.setState({ name: "James"}); }}>   Click me! </button> // evitar chamar multiplas funcoes 


```
Passando o valor de um butao para uma funcao inline 
The value e is what’s called a SyntheticEvent. Every event handler is passed a SyntheticEvent, which is an object that contains useful metadata related to the event, such as the target element’s value.

```
import React from 'react';

function App() {
  return (
    <button value="hello!" onClick={e => alert(e.target.value)}>
      Click me!
    </button>
  );
}

export default App;

```
Passar o valor de um array para uma função inline 


```
import React from 'react';

function UserList() {
  const users = ['James', 'Nora', 'Matthew', 'Joe', 'Susan'];
  
  function deleteUserWithName(name) {
    ...
  }
  
  return (
    <ul>
      {users.map(name => (
        <li>
          <button onClick={() => deleteUserWithName(name)}>
            Click me!
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;

```
Composição vs Herança
O React tem um poderoso modelo de composição, e por isso recomendamos o uso de composição ao invés de herança para reutilizar código entre componentes.

Nesta página, iremos demonstrar alguns problemas encontrados pelos desenvolvedores que estão iniciando com o React e esbarram em situações com herança, e mostraremos como podemos resolver utilizando composição.

Contenção

Alguns componentes não tem como saber quem serão seus elementos filhos. Isso é muito comum para componentes como o SideBar ou Dialog que representam “caixas” genéricas.

Recomendamos que esses componentes utilizem a prop especial children para passar os elementos filhos diretos para sua respectiva saída:


```
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```
Isso permite outros componentes passar elementos filhos no próprio JSX:

```
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Bem-vindo
      </h1>
      <p className="Dialog-message">
        Obrigado por visitar a nossa espaçonave!
      </p>
    </FancyBorder>
  );
}

```
Podemos deixar alguns buracos no componente que serão preenchidos posteriormente
```
function Contacts() {
  return (
    <>
    <h1>Contatos</h1>
    <div className="Contacts" />
    </>
  );
  
}

function Chat() {
 return (
    <>
    <h1>Chat</h1>
    <div className="Chat" />
    </>
  );
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


```

E sobre a herança?
No Facebook, nós usamos o React em milhares de componentes, e não encontramos nenhum caso que recomendaríamos criar componentes utilizando hierarquia de herança.

O uso de props e composição irá te dar toda flexibilidade que você precisa para customizar o comportamento e aparência dos componentes, de uma maneira explícita e segura. Lembre-se de que os componentes podem aceitar um número variável de props, incluindo valores primitivos, como int, array, boolean; assim como elementos Reacts e funções.

E se você desejar reutilizar funcionalidades (não gráficas) entre componentes, sugerimos que você a extraia em módulos JavaScript. Os componentes podem importar essa função, objeto ou classe sem precisar estender.

