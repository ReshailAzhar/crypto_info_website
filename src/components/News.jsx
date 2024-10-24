import React, { Component } from 'react'
import Loader from './Loader';
import axios from '../newsAxios'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

class News extends Component {

  state = {
    news: null,
    loading: true
  }

  componentDidMount() {
    axios.get('').then(data => {
      console.log(data);
      let list;
      if (this.props.simplified) { list = data.data.data.splice(0, 6); }
      else { list = data.data.data.splice(0, 15); }
      this.setState({
        news: list,
        loading: false
      })
    })
  }

  render() {
    return (
      <>
        {
          this.state.news ?
            <Row gutter={[24, 24]}>
              {this.state.news.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                  <Card hoverable className="news-card">
                    <a href={news.url} target="_blank" rel="noreferrer">
                      <div className="news-image-container">
                        <Title className="news-title" level={4}>{news.title}</Title>
                        <img style={{maxWidth:'100px',maxHeight:'100px'}} src={news?.thumbnail || demoImage} alt="news" />
                      </div>
                      <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                      <div className="provider-container">
                        <div>
                          <Avatar src={demoImage} alt="" />
                          {/* <Text className="provider-name">{news.provider[0]?.name}</Text> */}
                        </div>
                        <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                      </div>
                    </a>
                  </Card>
                </Col>
              ))}
            </Row>
            :
            <Loader />
        }
      </>
    )
  }
}

export default News
