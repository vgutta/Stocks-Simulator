import React, { Component } from 'react';
import logo from './logo.svg';
import * as 'd3' from 'd3';
import './App.css';

var async = require('async');

class App extends Component {
  constructor () {
    super();
    this.state = {
      svgJSX = [],
      data: [],
      currentData: [],
      currentUserScatterDate: [],
      currentMLScatterData: [],
      currentMLScatterColor: [],
      randStock: '',
      stocks: [
        ['Apple Inc.','AAPL'],
        ['Pandora','P'],
        ['Microsoft','MSFT'],
        ['Alphabet','GOOGL'],
        ['IBM','IBM'],
        ['Intel','INTC'],
        ['Cisco Systems','CSCO'],
        ['Oracle','ORCL'],
        ['Facebook','FB'],
        ['Zynga','ZNGA'],
        ['HP','HPQ'],
        ['Walmart','WMT'],
        ['Tesla','TSLA'],
        ['Amazon','AMZN'],
        ['ExxonMobil','XOM'],
        ['Goldman Sachs','GS'],
        ['JPMorgan Chase','JPM'],
        ['Twitter', 'TWTR'],
        ['Salesforce','CRM'],
        ["Macy's", 'M'],
        ['Advanced Auto Parts Inc.','AAP'],
        ['Marathon Oil','MRO'],
        ['Kroger','KR'],
        ['Foot Locker','FL'],
        ['Target','TGT'],
        ['Bed Bath & Beyond','BBBY'],
        ['AutoZone','AZO'],
        ['Under Armour','UAA'],
        ['Mattel', 'MAT'],
        ["Kohl's",'KSS'],
        ['Schlumberger','SLB'],
        ['TripAdvisor','TRIP']
      ],
      gettingNewStock: false,
      userStockJSX: [],
      userStockData: {
        currentStocks: 3,
        currentBuys: 3,
        currentSells: 3,
        initialStocks: 3,
        initialBuys: 3,
        initialSells: 3,
        bank: 0
      },
      mlStockData: {
        currentStocks: 3,
        currentBuys: 3,
        currentSells: 3,
        initialStocks: 3,
        initialBuys: 3,
        initialSells: 3,
        bank: 0
      },
      userBought: false,
      userSold: false,
      records: {
        scoreHasBeenCalcd: false,
        gamesPlayed: 0,
        leaderboard: [
          {
            name: 'User',
            score: 0
          },
          {
            name: 'AI',
            score: 0
          },
          {
            name: 'Market',
            score: 0
          }
        ]
      },
      podium: [
        {
          name: 'User',
          stockValue: 0
        },
        {
          name: 'AI',
          stockValue: 0
        },
        {
          name: 'Market',
          stockValue: 0
        }
      ],
      resizing: false,
      leaderboardIsHidden: false,
      sliderVal: 50, 
      showStartScreen: true,
    }
    this.plotGraph = this.plotGraph.bind(this);
    this.plotTimer = this.plotTimer.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleBuySell = this.handleBuySell.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.getNewStock = this.getNewStock.bind(this);
    this.checkMLBuySell = this.checkMLBuySell.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.handleLeaderboardClick = this.handleLeaderboardClick.bind(this);
  }

  componentWillMount () {
    document.addEventListener("keydown", this.handleBuySell, false);
    window.addEventListener("resize", this.handleResize, false);
  }

  componentDidUpdate () {
    if (this.state.leaderboardIsHidden !== prevState.leaderboardIsHidden) {
      document.body.style.zoom = 1.0;
      this.handleResize();
    }
  }

  
}

export default App;
