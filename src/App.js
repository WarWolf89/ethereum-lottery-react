import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ message: 'Waiting for transaction to be processed...' })

    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    await lottery.methods.enterLottery().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    console.log(this.state.value);
    this.setState({ message: 'You have been entered!'});
  }

  onClick = async () => {
    
    this.setState({message : 'Waiting for transaction process...'})
    const accunts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from : accunts[0]
    });
  
    this.setState({ message : 'Winner is: '});
  }

  render() {
    return (
      <div>
        <h2>Lottery contract</h2>
        <p>This contract is managed by {this.state.manager},
          There are currently {this.state.players.length} players competing,
          to win {web3.utils.fromWei(this.state.balance)} ether.
       </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4> Try your luck </h4>
          <div>
            <label>Amount of ether to enter</label>
            <input onChange={event => this.setState({ value: event.target.value })} />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4> Pick a winner </h4>
        <button onClick ={this.onClick}>Pick</button>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
