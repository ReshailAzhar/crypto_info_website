import React from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage'
import Cryptocurrencies from './components/Cryptocurrencies'
import Exchanges from './components/Exchanges'
import News from './components/News'
import CryptoDetails from './components/CryptoDetails';
import temp from './components/temp';

import './App.css'

const App = () => (
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Switch>
            <Route exact path="/" component={Homepage}/>
              {/* <Homepage />
            </Route> */}
            {/* <Route exact path="/exchanges">
              <Exchanges />
            </Route> */}
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId" component={CryptoDetails}/>
              {/* <CryptoDetails /> */}
            {/* </Route> */}
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
          <Link to="/">
            Cryptoverse Inc.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
    </div>
  </div>
);


export default App
