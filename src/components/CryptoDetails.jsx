import React, { PureComponent } from 'react'
import axios from '../cryptoAxios';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

class CryptoDetails extends PureComponent {

  constructor(props) {
    super(props);
    let coinId = this.props.match.params.coinId;
    this.state = {
      coinId: coinId,
      coinInfo: null,
      loading: true,
      timePeriod: '7d',
      coinHistory: null
    }
  }

  time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
  stats = null;
  genericStats = null;


  componentDidMount() {
    console.log(this.props);
    axios.get(`/coin/${this.state.coinId}`).then(data => {
      console.log(data);

      let coinInfo = data.data.data.coin;

      console.log(this.stats);
      this.stats = [
        { title: 'Price to USD', value: `$ ${coinInfo?.price && millify(coinInfo?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: coinInfo?.rank, icon: <NumberOutlined /> },
        // { title: '24h Volume', value: `$ ${coinInfo.24hVolume && millify(coinInfo.24hVolume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${coinInfo?.marketCap && millify(coinInfo?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${coinInfo?.allTimeHigh?.price && millify(coinInfo?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
      ];
      console.log(this.stats);

      this.genericStats = [
        { title: 'Number Of Markets', value: coinInfo?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: coinInfo?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: coinInfo?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${coinInfo?.supply?.total && millify(coinInfo?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${coinInfo?.supply?.circulating && millify(coinInfo?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
      ];


      this.setState({
        coinInfo: coinInfo,
        loading: false
      })
    })

    axios.get(`coin/${this.state.coinId}/history?timePeriod=${this.state.timePeriod}`)
      .then(data => {
        console.log(data.data);
        this.setState({
          coinHistory: data.data
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timePeriod !== prevState.timePeriod) {
      // Triggering the API call to get data for new selected time period
      axios.get(`coin/${this.state.coinId}/history?timePeriod=${this.state.timePeriod}`)
        .then(data => {
          console.log(data.data);
          this.setState({
            coinHistory: data.data
          })
        })
    }
  }


  render() {
    return (
      <>
        {this.state.coinInfo ?
          <>
            <Col className="coin-detail-container">
              <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                  {this.state.coinInfo.name} ({this.state.coinInfo.symbol}) Price
                </Title>
                <p>{this.state.coinInfo.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
              </Col>
              <Select
                defaultValue="7d"
                className="select-timeperiod"
                placeholder="Select Timeperiod"
                onChange={value => this.setState({ timePeriod: value })}>
                {this.time.map((date) => <Option key={date}>{date}</Option>)}
              </Select>
              <LineChart coinHistory={this.state.coinHistory} currentPrice={millify(this.state.coinInfo?.price)} coinName={this.state.coinInfo?.name} />
              <Col className="stats-container">
                <Col className="coin-value-statistics">
                  <Col className="coin-value-statistics-heading">
                    <Title level={3} className="coin-details-heading">{this.state.coinInfo.name} Value Statistics</Title>
                    <p>An overview showing the statistics of {this.state.coinInfo.name}, such as the base and quote currency, the rank, and trading volume.</p>
                  </Col>
                  {this.stats.map(({ icon, title, value }) => (
                    <Col className="coin-stats">
                      <Col className="coin-stats-name">
                        <Text>{icon}</Text>
                        <Text>{title}</Text>
                      </Col>
                      <Text className="stats">{value}</Text>
                    </Col>
                  ))}
                </Col>
                <Col className="other-stats-info">
                  <Col className="coin-value-statistics-heading">
                    <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                    <p>An overview showing the statistics of {this.state.coinInfo.name}, such as the base and quote currency, the rank, and trading volume.</p>
                  </Col>
                  {this.genericStats.map(({ icon, title, value }) => (
                    <Col className="coin-stats">
                      <Col className="coin-stats-name">
                        <Text>{icon}</Text>
                        <Text>{title}</Text>
                      </Col>
                      <Text className="stats">{value}</Text>
                    </Col>
                  ))}
                </Col>
              </Col>
              <Col className="coin-desc-link">
                <Row className="coin-desc">
                  <Title level={3} className="coin-details-heading">What is {this.state.coinInfo.name}?</Title>
                  {/* {HTMLReactParser(this.state.coinInfo.description)} */}
                  <p>{this.state.coinInfo.description}</p>
                </Row>
                <Col className="coin-links">
                  <Title level={3} className="coin-details-heading">{this.state.coinInfo.name} Links</Title>
                  {this.state.coinInfo.links?.map((link) => (
                    <Row className="coin-link" key={link.name}>
                      <Title level={5} className="link-name">{link.type}</Title>
                      <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                    </Row>
                  ))}
                </Col>
              </Col>
            </Col>
          </>
          :
          <Loader />}
      </>
    )
  }
}

export default CryptoDetails;

