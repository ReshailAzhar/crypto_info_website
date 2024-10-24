import React, { Component } from 'react';
import axios from '../cryptoAxios';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import Loader from './Loader';

class Cryptocurrencies extends Component {

  state = {
    cryptos: null,
    searchTerm: '',
    loading: true
  }

  orgList = null;

  componentDidMount() {
    console.log(this.props);

    axios.get('/coins').then(data => {
      console.log(data.data.data.coins);
      let list;
      if (this.props.simplified) { list = data.data.data.coins.splice(0, 10); }
      else { list = data.data.data.coins.splice(0, 100); }
      this.orgList = list;
      this.setState(
        {
          cryptos: list,
          loading: false
        }
      )
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if(this.state.searchTerm===nextState.searchTerm || this.state.cryptos===nextState.cryptos)
    // {
    //   return false;
    // }
    // else {return true;}

    // if(this.state.searchTerm!==nextState.searchTerm && this.state.cryptos!==nextState.cryptos)
    // {
    //   return true;
    // }

    // if (this.state.searchTerm !== nextState.searchTerm || this.state.cryptos!==nextState.cryptos) {
    //   const filteredList = this.state.cryptos.filter(coin => coin.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));

    //   this.setState({
    //     cryptos: filteredList
    //   })
    //   return true
    // }
    // else if(this.state.searchTerm === nextState.searchTerm)
    // {
    //   return false;
    // }

    // if (this.state.cryptos !== nextState.cryptos) {
    //   if()
    //   return true;
    // }

    if (this.state.cryptos !== nextState.cryptos) {
      return true;
    }

    if (this.state.searchTerm !== nextState.searchTerm) {

      console.log('searchTerm changed');
      const filteredList = this.orgList.filter(coin => coin.name.toLowerCase().includes(nextState.searchTerm.toLowerCase()));

      this.setState({
        cryptos: filteredList
      })
      return true;
    }

    else { return false; }
  }

  componentDidUpdate() {
    // const filteredList = this.state.cryptos.filter(coin => coin.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));

    // this.setState({
    //   cryptos: filteredList
    // })
    console.log('componentDidUpdate');
  }

  render() {
    console.log('render');

    return (
      <>
        {this.state.cryptos ?
          <>
            {/* if simplified is false only then it will render the search-crypto div  */}
            {!this.props.simplified && (<div className="search-crypto">
              <Input type="text" placeholder='Search Cryptocurrency'
                onChange={e => this.setState({ searchTerm: e.target.value })} />
            </div>)}
            <Row gutter={[32, 32]} className="crypto-card-container">
              {this.state.cryptos.map((currency) => (
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                  {/* Note: Change currency.id to currency.uuid  */}
                  <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                    <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} />} hoverabl >
                      <p>Price: {millify(currency.price)}</p>
                      <p>Market Cap: {millify(currency.marketCap)}</p>
                      <p>Daily Change: {currency.change}%</p>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
          : <Loader />
        }
      </>
    )
  }
}

export default Cryptocurrencies
