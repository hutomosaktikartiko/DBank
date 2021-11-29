import dBank from '../abis/dBank.json'
import React, { Component } from 'react';
import Token from '../abis/Token.json'
import Web3 from 'web3';
import Navbar from './Navbar';
import Main from './Main.js';
import './App.css';

//h0m3w0rk - add new tab to check accrued interest

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      //window is ethereum, and will wait for connect
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      //window is web3 and get current provider
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      //Non-Ethereum browser
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    //assign to values to variables: web3, netId, accounts
    const web3 = window.web3
    const netId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()

    // Load balance
    // check if account is detected, then load balance&setStates, elsepush alert
    if (typeof accounts[0] !== 'undefined') {
      const balance = await web3.eth.getBalance(accounts[0])
      this.setState({ account: accounts[0], balance: balance, web3: web3 })
    } else {
      window.alert('Please login with Metamask')
    }

    //in try block load contracts
    try {
      const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
      const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address)
      const dBankAddress = dBank.networks[netId].address
      const tokenBalance = await token.methods.balanceOf(this.state.account).call()
      const tokenBalanceString = web3.utils.fromWei(tokenBalance)

      this.setState({ token: token, dbank: dbank, dBankAddress: dBankAddress, tokenBalance: tokenBalanceString })
    } catch (e) {
      console.log('Error ', e)
      window.alert('Contract not deployed to the current network')
    }
  }

  async deposit(amount) {
    //check if this.state.dbank is ok
    console.log(this.state.dbank)
    if (this.state.dbank !== 'undefined') {
      //in try block call dBank deposit();
      try {
        await this.state.dbank.methods.deposit().send({ value: amount.toString(), from: this.state.account })
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
    }
  }

  async withdraw(e) {
    //prevent button from default click
    e.preventDefault()
    //check if this.state.dbank is ok
    if (this.state.dbank !== 'undefined') {
      //in try block call dBank withdraw();
      try {
        await this.state.dbank.methods.withdraw().send({ from: this.state.account })
      } catch (e) {
        console.log('Error, withdraw: ', e)
      }
    }
  }

  async borrow(amount) {
    if(this.state.dbank !== 'undefined') {
      try {
        await this.state.dbank.methods.borrow().send({value: amount.toString(), from: this.state.account})
      } catch (e) {
        console.log('Error, borrow: ', e)
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      tokenBalance: '0',
      dbank: null,
      balance: 0,
      dBankAddress: null
    }
    this.deposit = this.deposit.bind(this)
    this.withdraw = this.withdraw.bind(this)
    this.borrow = this.borrow.bind(this)
  }

  render() {
    return (
      <div className='text-monospace'>
        <Navbar account={this.state.account} />
        <Main 
          tokenBalance = {this.state.tokenBalance}
          deposit = {this.deposit}
          withdraw = {this.withdraw}
          borrow = {this.borrow}
        />
      </div>
    );
  }
}

export default App;