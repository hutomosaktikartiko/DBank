import React, { Component } from "react";
import {Tabs, Tab} from 'react-bootstrap'

class Main extends Component {
    render() {
        return (
            <div className="container-fluid mt-5 text-center">
                <br></br>
                <h1>Welcome to dBank</h1>
                <h2>Your Points {this.props.tokenBalance}</h2>
                <br></br>
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex text-center">
                        <div className="content mr-auto ml-auto">
                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                <Tab eventKey="deposit" title="Deposit">
                                    <div>
                                        <br></br>
                                        How much do you want to deposit?
                                        <br></br>
                                        (min. amount is 0.01 ETH)
                                        <br></br>
                                        (1 deposit is possible at the time)
                                        <br></br>
                                        <form onSubmit={(event) => {
                                            event.preventDefault()
                                            let amount = this.depositAmount.value
                                            amount = amount * 10 ** 18 //convert to wei
                                            this.props.deposit(amount)
                                        }}>
                                            <div className='form-group mr-sm-2'>
                                                <br></br>
                                                <input
                                                    id='depositAmount'
                                                    step="0.01"
                                                    type='number'
                                                    ref={(input) => { this.depositAmount = input }}
                                                    className="form-control form-control-md"
                                                    placeholder='amount...'
                                                    required />
                                            </div>
                                            <button type='submit' className='btn btn-primary'>DEPOSIT</button>
                                        </form>

                                    </div>
                                </Tab>
                                <Tab eventKey="withdraw" title="Withdraw">
                                    <br></br>
                                    Do you want to withdraw + take interest?
                                    <br></br>
                                    <br></br>
                                    <div>
                                        <button type='submit' className='btn btn-primary' onClick={(event) => this.props.withdraw(event)}>WITHDRAW</button>
                                    </div>
                                </Tab>
                                <Tab
                                    eventKey="borrow" title="Borrow"
                                >
                                    <div>
                                        <br></br>
                                        Do you want to borrow tokens?
                                        <br></br>
                                        (You'll get 50% of collateral, in Tokens)
                                        <br></br>
                                        <br></br>
                                        type collateral amount (in ETH)
                                        <br></br>
                                        <br></br>
                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault()
                                                let amount = this.borrowAmount.value
                                                amount = amount * 10 ** 18 //convert to wei
                                                this.props.borrow(amount)
                                            }}
                                        >
                                            <div className="from-group mr-sm-2">
                                                <input 
                                                    id="borrowAmount"
                                                    step="0.01"
                                                    type='number'
                                                    ref={(input) => {this.borrowAmount = input}}
                                                    className="form-control form-control-md"
                                                    placeholder="amount..."
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">BORROW</button>
                                        </form>
                                    </div>
                                </Tab>
                                <Tab eventKey="payOff" title="Payoff">
                                    <div>
                                        <br></br>
                                        Do youd want to payoff the loan?
                                        <br></br>
                                        <br></br>
                                        <button type="submit" className="btn btn-primary" onClick={(event) => this.props.payOff(event)}>PAYOFF</button>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;