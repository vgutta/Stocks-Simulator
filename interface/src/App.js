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
      stocks,
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

  handleResize () {
    var currentData = this.state.currentData.slice();
    var data = this.state.data.slice();
    var currentUserScatterData = this.state.currentUserScatterData.slice();
    var currentUserScatterColor = this.state.currentUserScatterColor.slice();
    var currentMLScatterData = this.state.currentMLScatterData.slice();
    var currentMLScatterColor = this.state.currentMLScatterColor.slice();
    if (currentData.length > 0 && currentData.length === data.length) {
      this.setState({ resizing: true });
      this.plotGraph(
        data,
        currentData,
        currentUserScatterData,
        currentUserScatterColor,
        currentMLScatterData,
        currentMLScatterColor
      );
    }
  }

  handleSlider(event) {
    this.setState({ sliderVal: event.target.value });
  }
  
  getNewStock() {
    var data = [];
    var randStock;
    var stocks = this.state.stocks.slice();
    var userStockData = this.state.userStockData;
    var mlStockData = this.state.mlStockData;
    async.series([
      callback => {
        randStock = stocks[Math.floor(Math.random() * stocks.length)];
        console.log(randStock);
        fetch("/getstockdata/?stock=" + randStock[1], {
          method: "get"
        })
          .then(function(res) {
            return res.json();
          })
          .then(function(response) {
            data = JSON.parse(response).data;
            callback();
          });
      },
      callback => {
        userStockData.finalStockValue = parseFloat(
          data[data.length - 1].EOD * userStockData.currentStocks
        );
        this.setState({
          data: data,
          randStock: randStock,
          currentData: [],
          currentUserScatterData: [],
          currentUserScatterColor: [],
          currentMLScatterData: [],
          currentMLScatterColor: [],
          gettingNewStock: false,
          userStockData: userStockData,
          mlStockData: mlStockData
        });
        this.plotTimer();
        callback();
      }
    ]);
  }

  handleStart() {
    if (document.getElementById("start-btn").classList.contains("btn-active")) {
      document.getElementById("start-btn").style.backgroundColor =
        "rgb(142, 142, 142)";
      document.getElementById("start-btn").classList.toggle("btn-active");
      var currentData = this.state.currentData.slice();
      var data = this.state.data.slice();
      var userStockData = this.state.userStockData;
      var mlStockData = this.state.mlStockData;
      if (currentData.length === data.length) {
        userStockData.currentStocks = userStockData.initialStocks;
        userStockData.currentBuys = userStockData.initialBuys;
        userStockData.currentSells = userStockData.initialSells;
        userStockData.bank = 0;
        mlStockData.currentStocks = mlStockData.initialStocks;
        mlStockData.currentBuys = mlStockData.initialBuys;
        mlStockData.currentSells = mlStockData.initialSells;
        mlStockData.bank = 0;
        this.setState({
          gettingNewStock: true,
          userStockData: userStockData,
          mlStockData: mlStockData
        });
        this.getNewStock();
      }
    }
  }
}

export default App;
