import React, { Component } from 'react'
import axios from '../cryptoAxios';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

// import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
const { Title } = Typography;



class Homepage extends Component {

  // let globalStats=NULL;
  // constructor(props) {
  //   super(props);
  //   this.globalStats=null;
  // }
  state = {
    globalStats: null,
    loading: true
  }

  componentDidMount() {
    console.log(this.props);

    axios.get('/coins').then(data => {

      // this.globalStats=data.data.data.stats
      // console.log(this.globalStats)
      this.setState({
        globalStats: data.data.data.stats,
        loading: false
      })
      // return(
      //   this.globalStats
      // )
    });
  }
  render() {

    return (
      <>
        {this.state.globalStats ? <>
          <Title level={2} className="heading">Global Crypto Stats</Title>
          <Row gutter={[32, 32]}>
            <Col span={12}><Statistic title="Total Cryptocurrencies" value={this.state.globalStats.total} /></Col>
            <Col span={12}><Statistic title="Total Exchanges" value={millify(this.state.globalStats.totalExchanges)} /></Col>
            <Col span={12}><Statistic title="Total Market Cap:" value={`$${millify(this.state.globalStats.totalMarketCap)}`} /></Col>
            <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(this.state.globalStats.total24hVolume)}`} /></Col>
            <Col span={12}><Statistic title="Total Cryptocurrencies" value={this.state.globalStats.total} /></Col>
            <Col span={12}><Statistic title="Total Markets" value={millify(this.state.globalStats.totalMarkets)} /></Col>
          </Row>
          <div className="home-heading-container">
            <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
            <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
          </div>
          <Cryptocurrencies simplified />
          <div className="home-heading-container">
            <Title level={2} className="home-title">Latest Crypto News</Title>
            <Title level={3}><Link to="/news">Show more</Link></Title>
          </div>
          <News simplified />
        </> :
        <Loader/>}

      </>
    )
  }
}

export default Homepage

