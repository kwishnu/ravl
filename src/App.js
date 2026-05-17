import React, { Component } from 'react';
import { CircularProgress } from '@mui/material';
import PageVisibility from 'react-page-visibility';
import ScreenOrientationReact from 'screen-orientation-react';
// import ResizeNotifier from "./config/resize-notifier";
import formatDate from 'date-fns/format';
import parse from 'date-fns/parse';
import { nanoid } from 'nanoid';
// import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import differenceInDays from 'date-fns/differenceInDays';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";
import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import {getAnimatedWordLeft} from './config/config';//convertFont,
import config from './config/config';
import colors from './config/colors';
import animStyles from './styles/anim.module.css';
import './styles/animations.css';
import tut_styles from './styles/tut_styles';
import {puzzTitle, puzzDescription,  puzzles} from './data/dailyDataHelper';
import { getRandom, getRandomInt, shuffleArray, transposeArray, allElementsEqual, printWordsToConsole, getOffsetColor } from './config/functions';//printGameArrayToConsole
import gamePlatitudes from "./data/game_plats";
import playRavlStr from "./data/PlayRavlStr";
import words3letter from "./words/3letter_bonus";
import words4letter from "./words/4letter_bonus";
import words5letter from "./words/5letter_bonus";
import words6letter from "./words/6letter_bonus";
import words7letter from "./words/7letter_bonus";
import words8letter from "./words/8letter_bonus";
import words9letter from "./words/9letter_bonus";
import words10letter from "./words/10letter_bonus";
import Menu from './components/Menu.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HintNag from "./modal/HintNagModal";
import TileSet from './components/TileSet';
import stylesJS from './styles/appStyles.js';
import genWordArray from "./config/genWordArray";
import Settings from "./screens/settings";
import Help from "./screens/help";
import Support from "./screens/support";
import Words from "./modal/WordsModal";
import EndGame from "./modal/EndGameModal";
const KEY_LastOpenedDate = 'lastOpenedKey';
const KEY_ShowedTutorial = 'showedTutKey';
const KEY_PlayedFirstGame = 'playedGameKey';
const KEY_HighScore = 'highScoreKey';
const KEY_BGColorPref = 'bgColorPrefKey';
const KEY_ModePref = 'modePrefKey';
const KEY_EasyModePref = 'easyModePrefKey';
const KEY_AnimationPref = 'animationPrefKey';
const KEY_PuzzleStreakDays = 'puzzleStreakKey';
const KEY_DailyStreakDays = 'dailyStreakKey';
const KEY_NumStars = 'numStarsKey';
const KEY_CurrentStarColor = 'curStarColorKey';
const KEY_StarColorString = 'starColorKey';
const KEY_HasUpgrade = 'hasUpgradeKey';
const KEY_LowColPositions = 'lowColPositions';
// const KEY_PWords0 = 'pWordsKey0';
// const KEY_PWords1 = 'pWordsKey1';
// const KEY_PWords2 = 'pWordsKey2';
// const KEY_PWords3 = 'pWordsKey3';
// const KEY_PWords4 = 'pWordsKey4';
// const KEY_PWords5 = 'pWordsKey5';
// const KEY_PWords6 = 'pWordsKey6';
// const KEY_PWords7 = 'pWordsKey7';
// const KEY_SolvedWords = 'solvedWordsKey';
// const KEY_BonusWords = 'bonusWordsKey';
// const KEY_GameIndex = 'gameIndexKey';
// const KEY_Score = 'scoreKey';
// const KEY_StarEligibility = 'starEligibilityKey';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const tablet = config.isTablet;
const isPC = config.isPC;
// const tileHeight = config.TILE_HEIGHT;

let dateToday = formatDate(new Date(), "MM-dd-yyyy");
let title = "";
let description = "";
let dailyPuzzlesArr = [];
let puzzleWords0 = [];//genWordArray(3);
let puzzleWords1 = [];//genWordArray(4);
let puzzleWords2 = [];//genWordArray(5);
let puzzleWords3 = [];//genWordArray(6);
let puzzleWords4 = [];//genWordArray(7);
let puzzleWords5 = [];//genWordArray(8);
let puzzleWords6 = [];//genWordArray(9);
let puzzleWords7 = [];//genWordArray(10);
let megaPuzzleArr = [];
let puzzleWords8 = [];
let puzzleWords9 = [];
let puzzleWords10 = [];
let solvedWords = [];
let bonusWords = [];
let allowIntoUpdateGameArray = true;

global.upgradeStatus = false;
global.bgColor = colors.dark_purple;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level0Saved: [],
      gameArray0: [],
      gameArray1: [],
      gameArray2: [],
      gameArray3: [],
      gameArray4: [],
      gameArray5: [],
      gameArray6: [],
      gameArray7: [],
      gameArray8: [],
      gameArray9: [],
      gameArray10: [],
      puzzleWords: [],
      gameWords0: [],
      gameWords1: [],
      gameWords2: [],
      gameWords3: [],
      gameWords4: [],
      gameWords5: [],
      gameWords6: [],
      gameWords7: [],
      gameWords8: [],
      gameWords9: [],
      gameWords10: [],
      ravlTiles: [],
      megaWords: [],
      currentHintsArray: [],
      animationTimerIDs: [],
      starColorArray: new Array(20).fill('#333333'),
      currentStarColor: '#FFD700',
      counterPulseColor: colors.bright_green,
      bonusWords: this.props.bonusWords,
      solvedWords: this.props.solvedWords,
      showPlayRavl: false,
      showStars: true,
      isDailyGame: false,
      dailyPuzzleCompleted: false,
      showGame0: false,
      showGame1: false,
      showGame2: false,
      showGame3: false,
      showGame4: false,
      showGame5: false,
      showGame6: false,
      showGame7: false,
      showGame8: false,
      showGame9: false,
      showGame10: false,
      showedTutScreen1: false,
      showedTutScreen2: true,
      showTutScreen1: false,
      showTutScreen2: true,
      gameStarted: false,
      gameDone: false,
      clearedLevel: true,
      showActionButton: false,
      showPuzzWordsModal: false,
      showHeaderComment: false,
      showSolvedWord: false,
      showSolvedWords: false,
      puzzleDisplayed: false,
      darkModeEnabled: false,
      easyModeEnabled: false,
      newHighScore: false,
      eligibleForStar: true,
      animationStyle: "Leave",
      currentGameIndex: this.props.currentGameIndex,
      lastIndexInGame: 0,
      initialArrayHeight: 0,
      solvedWordsRowOffset: 0,
      solvedAnimX: 0,
      solvedAnimY: 0,
      progressSavedLevel: 0,
      rowsInPuzzle: 0,
      onRow: 0,
      score: this.props.score,
      highScore: 0,
      hintsGiven: 0,
      hintPenalty: 5,
      points: 0,
      solvedPadding: 0,
      playRavlIntervalID: 0,
      scrHeight: window.innerHeight,
      scrWidth: window.innerWidth,
      tileHeight: parseInt((window.innerHeight/17).toPrecision(2)),
      deviceType: window.innerWidth > 1000?"pc":window.innerHeight/window.innerWidth > 1.77?"phone":"tablet",
      lettersetContainerWidth: null,
      lettersetContainerHeight: null,
      widthLeftOrRight: window.innerWidth > 1000?(window.innerWidth - window.innerHeight * 9/16)/2:window.innerHeight/window.innerWidth > 1.77?0:(window.innerWidth - window.innerHeight * 9/16)/2,
      scoreContainerHeight: null,
      numberOfStars: 0,
      bwOffset: 0,
      swOffset: 0,
      counterKey: "",
      megaRavlRef: "",
      keyIDFragment: "",
      solvedWord: "",
      headerText: "",
      endMessage: "",
      endMessageFail: "Try Again!",
      headerComment: "",
      dailyGameDescription: "",
      nextBtnText: "NEXT",
      solvedModalMessage: "",
      puzzleStreak: "0,01-01-2001",
      dailyStreak: "0,01-01-2001",
      lastPuzzleDay: "01-01-2001",
      lastDailyDay: "01-01-2001",
      lastOpenedDate: "01-01-2001",
      nextButtonEnabled: false,
      showHelpModal: false,
      showSupportModal: false,
      showWordsModal: false,
      showSettingsModal: false,
      showEndGameModal: false,
      showHintNagModal: false,
      dividerString: "",
      playedGameOnce: false,
      lockScreenInput: false,
      modalCall: this.props.modalCall,
      megaPuzzle: false,
      showMenu: false
    };
    this.colRefs = [];
    this.lettersetContainer = React.createRef();
    this.scoreContainer = React.createRef();
  }

  openWordsModal = () => {
    let showPuzzWords = (this.state.solvedWords[0].length || this.state.solvedWords[8].length) ? true : false;
    let solvedArray = this.state.solvedWords;
    let bonusArray = this.state.bonusWords;
    let sBlankArray = [];
    let bBlankArray = [];

    solvedArray.forEach((innerArray) => {
      let wordsOfOneLevel = "";
      if (innerArray.length) {
        wordsOfOneLevel = innerArray.join("  ");
        sBlankArray.push(wordsOfOneLevel);
      }
    });

    bonusArray.forEach((innerArray) => {
      let wordsOfOneLevel = "";
      if (innerArray.length) {
        wordsOfOneLevel = innerArray.join("  ");
        bBlankArray.push(wordsOfOneLevel);
      }
    });

    const sWordModalMsg = sBlankArray.join("\n");
    const bWordModalMsg = bBlankArray.join("\n");
    const dividerStr = "_______";

    this.setState({
      showPuzzWordsModal: showPuzzWords,
      solvedModalMessage: sWordModalMsg,
      bonusModalMessage: bWordModalMsg,
      dividerString: dividerStr,
      showWordsModal: true,
    });
  };

  styles = () => {
    const { scrWidth, scrHeight } = this.state;
    return stylesJS({ scrWidth, scrHeight });
  };

  componentDidMount() {
    dateToday = formatDate(new Date(), "MM-dd-yyyy");
    title = puzzTitle(dateToday);
    description = puzzDescription(dateToday);
    console.log(description);

    dailyPuzzlesArr = puzzles(dateToday);
    if(isPC){
      window.addEventListener("resize", this.updateHeightAndWidth);
    }

    this.setState({
      lettersetContainerHeight: this.lettersetContainer.current.getBoundingClientRect().height,
      lettersetContainerWidth: this.lettersetContainer.current.getBoundingClientRect().width,
      scoreContainerHeight: this.scoreContainer.current.getBoundingClientRect().height,
    });
    const emp = window.localStorage.getItem(KEY_EasyModePref);
    if (emp !== null) {
      const empBool = (emp === 'true')?true:false;
      this.setState({easyModeEnabled: empBool});
    }else{
      try {
          window.localStorage.setItem(KEY_EasyModePref, 'false');
      } catch (error) {
          window.alert('window.localStorage error: ' + error.message);
      }
    }

    setTimeout(() => {
      this.nextGame(true);
    }, 200);
    // this.init(
    //   puzzleWords0,
    //   puzzleWords1,
    //   puzzleWords2,
    //   puzzleWords3,
    //   puzzleWords4,
    //   puzzleWords5,
    //   puzzleWords6,
    //   puzzleWords7,
    //   [[], [], [], [], [], [], [], [], [], [], []], // this.props.solvedWords,
    //   [[], [], [], [], [], [], [], [], [], [], []], // this.props.bonusWords,
    //   15, // this.props.score,
    //   -1, // this.props.currentGameIndex,
    //   true, //eligibility for star
    // )
  }

  componentWillUnmount(){
    if(isPC){
      window.removeEventListener("resize", this.updateHeightAndWidth);
    }
  }

  updateHeightAndWidth = (m) => {
    const wlor = window.innerWidth > 1000?(window.innerWidth - window.innerHeight * 9/16)/2:window.innerHeight/window.innerWidth > 1.77?0:(window.innerWidth - window.innerHeight * 9/16)/2
    this.setState({
      widthLeftOrRight: wlor,
      lettersetContainerHeight: document.getElementById("gameContainer").getBoundingClientRect().height,
      lettersetContainerWidth: document.getElementById("gameContainer").getBoundingClientRect().width,
      scoreContainerHeight: this.scoreContainer.current.getBoundingClientRect().height,
      // lettersetContainerHeight: this.lettersetContainer.current.getBoundingClientRect().height,
      // lettersetContainerWidth: this.lettersetContainer.current.getBoundingClientRect().width,
      // scoreContainerHeight: this.scoreContainer.current.getBoundingClientRect().height,
      scrHeight: window.innerHeight,
      scrWidth: window.innerWidth,
      tileHeight: parseInt((window.innerHeight/17).toPrecision(2)),
      deviceType: window.innerWidth > 1000?"pc":window.innerHeight/window.innerWidth > 1.77?"phone":"tablet",
    });
  }

  init(p0, p1, p2, p3, p4, p5, p6, p7, sw, bw, sc, cgi, eligibility) {
    const keyIDFrag = nanoid();
    const counterKeyID = nanoid();

    puzzleWords0 = p0; //['FIG','BAD','SAP'];
    puzzleWords1 = p1;
    puzzleWords2 = p2;
    puzzleWords3 = p3;
    puzzleWords4 = p4;
    puzzleWords5 = p5;
    puzzleWords6 = p6;
    puzzleWords7 = p7;
    dateToday = formatDate(new Date(), "MM-dd-yyyy");
    const dateTodayNice = formatDate(new Date(), "EEEE, MMM d");
    title = title === "" ? puzzTitle(dateToday) : title;
    description = description === "" ? puzzDescription(dateToday) : description;
    dailyPuzzlesArr = !dailyPuzzlesArr.length > 0 ? puzzles(dateToday) : dailyPuzzlesArr;
    puzzleWords8 = dailyPuzzlesArr[0];
    puzzleWords9 = dailyPuzzlesArr[1];
    puzzleWords10 = dailyPuzzlesArr[2];
    solvedWords = sw;
    bonusWords = bw;
    // let swArray = [];
    let ravlArr = [];
    let dailyRavlArr = [];
    let colCount = 0;
    let rowCount = 0;
    let ravlRef = "";
    let straightArray0 = this.buildStraightArray(puzzleWords7);
    let gameArr0 = this.buildGameArray(straightArray0);
    colCount = gameArr0.length;
    rowCount = straightArray0.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr0 = gameArr0.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray1 = this.buildStraightArray(puzzleWords6);
    let gameArr1 = this.buildGameArray(straightArray1);
    colCount = gameArr1.length;
    rowCount = straightArray1.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr1 = gameArr1.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray2 = this.buildStraightArray(puzzleWords5);
    let gameArr2 = this.buildGameArray(straightArray2);
    colCount = gameArr2.length;
    rowCount = straightArray2.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr2 = gameArr2.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray3 = this.buildStraightArray(puzzleWords4);
    let gameArr3 = this.buildGameArray(straightArray3);
    colCount = gameArr3.length;
    rowCount = straightArray3.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr3 = gameArr3.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray4 = this.buildStraightArray(puzzleWords3);
    let gameArr4 = this.buildGameArray(straightArray4);
    colCount = gameArr4.length;
    rowCount = straightArray4.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr4 = gameArr4.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray5 = this.buildStraightArray(puzzleWords2);
    let gameArr5 = this.buildGameArray(straightArray5);
    colCount = gameArr5.length;
    rowCount = straightArray5.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr5 = gameArr5.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray6 = this.buildStraightArray(puzzleWords1);
    let gameArr6 = this.buildGameArray(straightArray6);
    colCount = gameArr6.length;
    rowCount = straightArray6.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr6 = gameArr6.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray7 = this.buildStraightArray(puzzleWords0);
    let gameArr7 = this.buildGameArray(straightArray7);
    colCount = gameArr7.length;
    rowCount = straightArray7.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr7 = gameArr7.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let gameArr8 = [];
    if (puzzleWords10 && puzzleWords10.length) {
      let straightArray8 = this.buildDailyArray(puzzleWords10);
      gameArr8 = this.buildGameArray(straightArray8);
      colCount = gameArr8.length;
      rowCount = straightArray8.length;
      ravlRef = this.makeRavlTileRef(rowCount, colCount);
      dailyRavlArr.unshift(ravlRef);
      gameArr8 = gameArr8.map((row, i) => {
        return row.map((letter, j) => ({
          letter,
          ref: "col" + i + ",row" + j,
        }));
      });
    }
    let gameArr9 = [];
    if (puzzleWords9 && puzzleWords9.length) {
      let straightArray9 = this.buildDailyArray(puzzleWords9);
      gameArr9 = this.buildGameArray(straightArray9);
      colCount = gameArr9.length;
      rowCount = straightArray9.length;
      ravlRef = this.makeRavlTileRef(rowCount, colCount);
      dailyRavlArr.unshift(ravlRef);
      gameArr9 = gameArr9.map((row, i) => {
        return row.map((letter, j) => ({
          letter,
          ref: "col" + i + ",row" + j,
        }));
      });
    }
    let straightArray10 = this.buildDailyArray(puzzleWords8);
    let gameArr10 = this.buildGameArray(straightArray10);
    colCount = gameArr10.length;
    rowCount = straightArray10.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    dailyRavlArr.unshift(ravlRef);
    gameArr10 = gameArr10.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    if (this.state.megaPuzzle) {
      let straightArrayMega = this.buildStraightArray(this.state.megaWords);
      megaPuzzleArr = this.buildGameArray(straightArrayMega);
      const ravlRefMega = this.makeRavlTileRef(5, 9);
      this.setState({ megaRavlRef: ravlRefMega });
      megaPuzzleArr = megaPuzzleArr.map((row, i) => {
        return row.map((letter, j) => ({
          letter,
          ref: "col" + i + ",row" + j,
        }));
      });
    }
    for (var i = 0; i < 3; i++) {
      ravlArr.push(dailyRavlArr[i]);
    }

    let showPR = cgi === -1; //show "Play RavL" animation
    let showSW = cgi === -1; //show solved words
    let showG0 = cgi === 0;
    let showG1 = cgi === 1;
    let showG2 = cgi === 2;
    let showG3 = cgi === 3;
    let showG4 = cgi === 4;
    let showG5 = cgi === 5;
    let showG6 = cgi === 6;
    let showG7 = cgi === 7;
    let showG8 = cgi === 8 || cgi === 100;
    let showG9 = cgi === 9;
    let showG10 = cgi === 10;
    let arrayToUse = [];
    let saveLevel = 0;
    let offset = 0
    let baseScore = (cgi < 8) ? 10 : 15;
    let scoreToUse = (cgi === 100) ? 20 : (sc < baseScore) ? baseScore : sc;
    let gameEndMsg = getRandom(gamePlatitudes, 1);
    let gameStartedBool = true;

    const isDaily = cgi > 7 ? true : false;
    const headerTxt = (cgi === 100) ? "\u2605\u2605 Mega \u2605\u2605" : cgi === -1 ? dateTodayNice + ` \u2022 ` + title : isDaily ? description : "Level  " + (cgi + 1) + "  of  8";

    switch (cgi) {
      case 0:
        arrayToUse = gameArr7;
        saveLevel = 0;
        offset = 0;
        break;
      case 1:
        arrayToUse = gameArr6;
        saveLevel = 0;
        offset = 0;
        break;
      case 2:
        arrayToUse = gameArr5;
        saveLevel = 2;
        offset = 0;
        break;
      case 3:
        arrayToUse = gameArr4;
        saveLevel = 2;
        offset = 0;
        break;
      case 4:
        arrayToUse = gameArr3;
        saveLevel = 4;
        offset = 1;
        break;
      case 5:
        arrayToUse = gameArr2;
        saveLevel = 4;
        offset = 2;
        break;
      case 6:
        arrayToUse = gameArr1;
        saveLevel = 6;
        offset = 3;
        break;
      case 7:
        arrayToUse = gameArr0;
        saveLevel = 6;
        offset = 4;
        break;
      case 8:
        arrayToUse = gameArr10;
        saveLevel = 8;
        offset = 8;
        break;
      case 9:
        arrayToUse = gameArr9;
        saveLevel = 8;
        offset = 9;
        break;
      case 10:
        arrayToUse = gameArr8;
        saveLevel = 8;
        offset = 10;
        break;
      case 100://mega
        arrayToUse = megaPuzzleArr;
        saveLevel = 8;
        offset = 0;
        break;
      default:
        arrayToUse = playRavlStr;
        saveLevel = 0;
        offset = 0;
        scoreToUse = null;
        gameStartedBool = false;
        break;
    }

    const rowsInPuzz = (arrayToUse[0].length + 2) / 3;//rows in puzzle
    const lastInd = !isDaily ? 7 : !puzzleWords9[0] || cgi === 100 ? 8 : !puzzleWords10[0] ? 9 : 10;//last index in game
    const initAH = arrayToUse[0].length;

    cgi = cgi === 100 ? 8 : cgi;

    this.setState({
      currentGameIndex: cgi,
      onRow: 0,
      hintPenalty: 5,
      gameArray0: arrayToUse,
      level0Saved: gameArr7,
      gameArray1: gameArr6,
      gameArray2: gameArr5,
      gameArray3: gameArr4,
      gameArray4: gameArr3,
      gameArray5: gameArr2,
      gameArray6: gameArr1,
      gameArray7: gameArr0,
      gameArray8: gameArr10,
      gameArray9: gameArr9,
      gameArray10: gameArr8,
      rowsInPuzzle: rowsInPuzz,
      initialArrayHeight: initAH,
      lastIndexInGame: lastInd,
      score: scoreToUse,
      solvedWords: solvedWords,
      bonusWords: bonusWords,
      showPlayRavl: showPR,
      showGame0: showG0,
      showGame1: showG1,
      showGame2: showG2,
      showGame3: showG3,
      showGame4: showG4,
      showGame5: showG5,
      showGame6: showG6,
      showGame7: showG7,
      showGame8: showG8,
      showGame9: showG9,
      showGame10: showG10,
      progressSavedLevel: saveLevel,
      solvedWordsRowOffset: offset,
      showSolvedWords: showSW,
      ravlTiles: ravlArr,
      modalCall: 'None',
      nextButtonEnabled: false,
      gameStarted: gameStartedBool,
      headerText: headerTxt,
      dailyGameDescription: description,
      endMessage: gameEndMsg,
      gameDone: false,
      eligibleForStar: eligibility,
      keyIDFragment: keyIDFrag,
      counterKey: counterKeyID
    });

    const showed = window.localStorage.getItem(KEY_ShowedTutorial);
    if (showed !== null) {
      const showedBool = (showed === 'true') ? true : false;
      this.setState({ showedTutScreen1: showedBool, showTutScreen1: !showedBool });
    } else {
      try {
        window.localStorage.setItem(KEY_ShowedTutorial, 'false');
        this.setState({ showedTutScreen1: false, showTutScreen1: true });
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const played = window.localStorage.getItem(KEY_PlayedFirstGame);
    if (played !== null) {
      const playedBool = (played === 'true') ? true : false;
      this.setState({ playedGameOnce: playedBool });
    } else {
      try {
        window.localStorage.setItem(KEY_PlayedFirstGame, 'false');
        this.setState({ playedGameOnce: false });
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const lastOpened = window.localStorage.getItem(KEY_LastOpenedDate);
    if (lastOpened !== null) {
      const loDateStr = lastOpened;
      this.setState({ lastOpenedDate: loDateStr });
      try {
        window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    } else {
      try {
        window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const bgPref = window.localStorage.getItem(KEY_BGColorPref);
    if (bgPref !== null) {
      global.bgColor = bgPref;
      document.querySelector('meta[name="theme-color"]').setAttribute('content', bgPref);
    } else {
      try {
        window.localStorage.setItem(KEY_BGColorPref, '#2E034B');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const modePref = window.localStorage.getItem(KEY_ModePref);
    if (modePref !== null) {
      const mp = modePref;
      const mpBool = mp === "true" ? true : false;
      this.setState({ darkModeEnabled: mpBool });
    } else {
      try {
        window.localStorage.setItem(KEY_ModePref, 'false');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const eModePref = window.localStorage.getItem(KEY_EasyModePref);
    if (eModePref !== null) {
      const eModePrefBool = (eModePref === 'true')?true:false;
      this.setState({easyModeEnabled: eModePrefBool});
    }else{
      try {
          window.localStorage.setItem(KEY_EasyModePref, 'false');
      } catch (error) {
          window.alert('window.localStorage error: ' + error.message);
      }
    }

    const numStars = window.localStorage.getItem(KEY_NumStars);
    if (numStars !== null) {
      const ns = numStars;
      const nsInt = parseInt(ns);
      this.setState({ numberOfStars: nsInt });
    } else {
      try {
        window.localStorage.setItem(KEY_NumStars, '0');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const csColor = window.localStorage.getItem(KEY_CurrentStarColor);
    if (csColor !== null) {
      const csC = csColor;
      this.setState({ currentStarColor: csC });
    } else {
      try {
        window.localStorage.setItem(KEY_CurrentStarColor, '#FFD700');//colors.gold
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const scString = window.localStorage.getItem(KEY_StarColorString);
    if (scString !== null) {
      const scS = scString;
      const scArray = scS.split(",");
      this.setState({ starColorArray: scArray });
    } else {
      try {
        window.localStorage.setItem(KEY_StarColorString, '#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333,#333333');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const animPref = window.localStorage.getItem(KEY_AnimationPref);
    if (animPref !== null) {
      const ap = animPref;
      this.setState({ animationStyle: ap });
    } else {
      try {
        window.localStorage.setItem(KEY_AnimationPref, 'Leave');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const highScore = window.localStorage.getItem(KEY_HighScore);
    if (highScore !== null) {
      const hs = highScore;
      this.setState({ highScore: hs });
    } else {
      try {
        window.localStorage.setItem(KEY_HighScore, '0');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const puzzStreak = window.localStorage.getItem(KEY_PuzzleStreakDays);
    if (puzzStreak !== null) {
      const ps = puzzStreak;
      const numPuzzStreakDays = ps.split(",")[0];
      const lastPuzzDay = ps.split(",")[1];
      const today = new Date();
      const dateFromLPD = parse(lastPuzzDay, 'MM-dd-yyyy', new Date());
      const diff = differenceInDays(today, dateFromLPD);
      const numStr = (numPuzzStreakDays === '0' || diff > 1) ? '0' : numPuzzStreakDays;
      this.setState({ puzzleStreak: numStr, lastPuzzleDay: lastPuzzDay });
    } else {
      try {
        window.localStorage.setItem(KEY_PuzzleStreakDays, '0,01-01-2001');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const dailyStrk = window.localStorage.getItem(KEY_DailyStreakDays);
    if (dailyStrk !== null) {
      const ds = dailyStrk;
      const numDailyStreakDays = ds.split(",")[0];
      const lastDDay = ds.split(",")[1];
      const today = new Date();
      const dateFromLDD = parse(lastDDay, 'MM-dd-yyyy', new Date());
      const diff = differenceInDays(today, dateFromLDD);
      const numStr = (numDailyStreakDays === '0' || diff > 1) ? '0' : numDailyStreakDays;
      this.setState({ dailyStreak: numStr, lastDailyDay: lastDDay });
      if (lastDDay === dateToday) this.setState({ dailyPuzzleCompleted: true });
    } else {
      try {
        window.localStorage.setItem(KEY_DailyStreakDays, '0,01-01-2001');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const hasUpgraded = window.localStorage.getItem(KEY_HasUpgrade);
    if (hasUpgraded !== null) {
      const huBool = hasUpgraded === 'true' ? true : false;
      global.upgradeStatus = huBool;
      //this.setState({hasUpgrade: huBool}); <= future, likely for ads implementation
    } else {
      try {
        window.localStorage.setItem(KEY_HasUpgrade, 'false');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const lowColPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    try {
      window.localStorage.setItem(KEY_LowColPositions, JSON.stringify(lowColPositions));
    } catch (error) {
      window.alert('window.localStorage error: ' + error.message);
    }
    if (cgi > -1) {
      this.setState({ gameStarted: true, showStars: false });
      this.lockScreen(2000);
    }
    this.setState({ isLoading: false })
    if (cgi === -1) {
      this.runPlayRavlAnimation();
      this.setState({ lockScreenInput: true });
    }

    printWordsToConsole(puzzleWords0, puzzleWords1, puzzleWords2, puzzleWords3, puzzleWords4, puzzleWords5, puzzleWords6, puzzleWords7, puzzleWords8, puzzleWords9, puzzleWords10);
  }

  buildStraightArray(wordsSent) {
    const rows = wordsSent.length;
    let cols = 0;
    cols = wordsSent[0] ? wordsSent[0].length : 0;
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr.push([]);
      arr[i].push(new Array(cols));
      for (var j = 0; j < cols; j++) {
        arr[i][j] = wordsSent[i].substr(j, 1);
      }
    }
    return arr;
  }

  buildDailyArray(wordsSnt) {
    const rows = wordsSnt.length;
    let cols = 0;
    cols = wordsSnt[0] ? wordsSnt[0].length : 0;
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr.push([]);
      arr[i].push(new Array(cols));
      for (var j = 0; j < cols; j++) {
        arr[i][j] = wordsSnt[i].substr(j, 1);
      }
    }
    return arr;
  }

  buildGameArray(sa) {
    let transposed = null;
    let containsUnscrambledWord = true;

    while (containsUnscrambledWord) {
      containsUnscrambledWord = false;
      transposed = transposeArray(sa);
      for (var i = 0; i < transposed.length; i++) {
        transposed[i] = shuffleArray(transposed[i]);
      }
      for (var j = 0; j < transposed[0].length; j++) {
        let testWord = "";
        for (var k = 0; k < transposed.length; k++) {
          testWord += transposed[k][j];
        }
        switch (sa[0].length) {
          case 3:
            if (puzzleWords0.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 4:
            if (puzzleWords1.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 5:
            if (puzzleWords2.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 6:
            if (puzzleWords3.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 7:
            if (puzzleWords4.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 8:
            if (puzzleWords5.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 9:
            if (puzzleWords6.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 10:
            if (puzzleWords7.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          default:
            containsUnscrambledWord = false;
        }
      }
    }

    const cols = transposed.length;
    const rows = transposed[0].length;
    for (var jj = 0; jj < cols; jj++) {
      for (var kk = 0; kk < rows - 1; kk++) {
        transposed[jj].unshift("");
      }
    }
    for (var m = 0; m < cols; m++) {
      for (var n = 0; n < rows - 1; n++) {
        transposed[m].push("");
      }
    }
    return transposed;
  }

  makeRavlTileRef(rows, columns) {
    const val1 = getRandomInt(0, columns);
    const val2 = getRandomInt((rows - 1), (2 * rows - 1));

    return "col" + val1 + ",row" + val2;
  }

  sendRowOut(rowArr, row) {
    this.lockScreen(1250);
    // if(this.state.currentHintsArray.length === 0)this.setState({hintsGiven: 0});
    const pts = this.state.gameArray0.length; // this.getPointsToAdd();
    this.changeScore(pts);
    let doneDropping = false;

    rowArr.forEach((cellRef) => {
      const colRef = cellRef.split(",")[0];

      this.colRefs[colRef].sendCellOut(cellRef, this.state.animationStyle, () => {//this.state.animationStyle, cellRef,...
        if (!doneDropping) {
          doneDropping = true;
          const gArray = this.state.gameArray0;
          setTimeout(() => {
            this.spliceArray(gArray, row);
            this.updateGameArray([]);
          }, 800);
          setTimeout(() => {
            this.resetSolvedWord(); // resets padding and visibility for the "solved word" animation
          }, 150);
          this.resetTileColors(this.state.darkModeEnabled); // called in case a hint (green) tile isn't removed
        }
      });
    });
  }

  flashWord(rowArr) {
    this.lockScreen(1000);
    const pts = this.state.gameArray0.length;
    this.changeScore(pts);
    let wordAdded = false;
    rowArr.forEach((cellRef) => {
      const colRef = cellRef.split(",")[0];
      // const rowRef = cellRef.split(",")[1];
      this.colRefs[colRef].flashWord(cellRef, (refSent) => {
        if (!wordAdded) {
          wordAdded = true;
          this.updateGameArray([]);
        }
      });
    });
  }

  runPlayRavlAnimation() {
    if (this.state.playRavlIntervalID === 0) {
      setTimeout(() => {
        if (this.state.darkModeEnabled) {
          this.resetTileColors(false);
        }
      }, 200);
      this.playRavlAnimation(true);
      this.hideAllGames();
      this.setState({ showPlayRavl: true, gameArray0: playRavlStr });
      let intervalID = setInterval(() => { this.playRavlAnimation(true) }, 9000);
      this.setState({ playRavlIntervalID: intervalID });
    } else {
      clearInterval(this.state.playRavlIntervalID);
      this.playRavlAnimation(false);
      this.setState({ playRavlIntervalID: 0 });
    }
  }

  playRavlAnimation(starting) {
    if (!this.colRefs) return;
    const colArray = [0, 1, 2, 3];
    let timeoutIDArr = [];
    if (starting) {
      const aniTimer1 = setTimeout(() => {
        colArray.forEach((colIndex) => {
          const colRef = "col" + colIndex;
          if (this.colRefs[colRef]) {
            this.colRefs[colRef].nudgeUpAndDown(colIndex, true);
          }
        });
      }, 100);
      timeoutIDArr.push(aniTimer1);
      const aniTimer2 = setTimeout(() => {
        colArray.forEach((colIndex) => {
          const colRef = "col" + colIndex;
          if (this.colRefs[colRef]) {
            this.colRefs[colRef].nudgeUpAndDown(colIndex, false);
          }
        });
      }, 600);
      timeoutIDArr.push(aniTimer2);
      const aniTimer3 = setTimeout(() => {
        colArray.forEach((colIndex) => {
          const colRef = "col" + colIndex;
          if (this.colRefs[colRef]) {
            this.colRefs[colRef].cycleColor(colRef + ",row3");
            this.colRefs[colRef].cycleColor(colRef + ",row6");
          }
        });
      }, 200);
      timeoutIDArr.push(aniTimer3);
      const aniTimer4 = setTimeout(() => {
        colArray.forEach((colIndex) => {
          const colRef = "col" + colIndex;
          if (this.colRefs[colRef]) {
            this.colRefs[colRef].moveColUpOrDown(colIndex);
          }
        });
      }, 3000);
      timeoutIDArr.push(aniTimer4);
      const aniTimer5 = setTimeout(() => {
        colArray.forEach((colIndex) => {
          const colRef = "col" + colIndex;
          if (this.colRefs[colRef]) {
            this.colRefs[colRef].moveColUpOrDown(colIndex);
          }
        });
      }, 1800);
      timeoutIDArr.push(aniTimer5);
      this.setState({ animationTimerIDs: timeoutIDArr });
    } else {
      setTimeout(() => {
        colArray.forEach((colIndex) => {
          const colRef = "col" + colIndex;
          if (this.colRefs[colRef]) {
            this.colRefs[colRef].stopColorCycle(colRef + ",row3");
            this.colRefs[colRef].stopColorCycle(colRef + ",row6");
          }
        });
      }, 200);
    }
  }

  animateGameFail() {
    const remainingArr = this.getRemainingTiles();
    remainingArr.forEach((cellRef) => {
      const colRef = cellRef.split(",")[0];
      this.colRefs[colRef].animateFail(cellRef);
    });
  }

  giveHint() {
    if (this.state.gameDone) return;
    const gArray = this.state.gameArray0;
    const refStr = this.state.megaPuzzle ? this.state.megaRavlRef : this.state.ravlTiles[this.state.currentGameIndex];
    const ravlTileCol = parseInt(refStr.substring(3, 4));
    let ravlLetter = "";
    for (let r = 0; r < gArray[0].length; r++) {
      if (gArray[ravlTileCol][r].ref === refStr) {
        ravlLetter = gArray[ravlTileCol][r].letter;
        break;
      }
    }
    if (gArray.length - (this.state.hintsGiven + 1) <= 1) {
      this.setState({ showHintNagModal: true });
      return;
    }
    if (this.state.score - this.state.hintPenalty <= 0) {
      const newKey = nanoid();
      this.setState({ counterPulseColor: colors.red });
      setTimeout(() => {
        this.setState({ counterKey: newKey });
      }, 200);
      return;
    }
    let changeArr = this.state.currentHintsArray;
    const numRows = gArray[0].length;
    const numColumns = gArray.length;
    let puzzWordArray = null;
    switch (this.state.currentGameIndex) {
      case 0:
        puzzWordArray = puzzleWords0;
        break;
      case 1:
        puzzWordArray = puzzleWords1;
        break;
      case 2:
        puzzWordArray = puzzleWords2;
        break;
      case 3:
        puzzWordArray = puzzleWords3;
        break;
      case 4:
        puzzWordArray = puzzleWords4;
        break;
      case 5:
        puzzWordArray = puzzleWords5;
        break;
      case 6:
        puzzWordArray = puzzleWords6;
        break;
      case 7:
        puzzWordArray = puzzleWords7;
        break;
      case 8:
        puzzWordArray = this.state.megaPuzzle ? this.state.megaWords : puzzleWords8;
        break;
      case 9:
        puzzWordArray = puzzleWords9;
        break;
      case 10:
        puzzWordArray = puzzleWords10;
        break;
      default:
        puzzWordArray = puzzleWords0;
    }
    let wordIndex = 0;
    let initialLetter = ravlLetter;
    for (let c = 0; c < numRows; c++) {
      if (gArray[ravlTileCol][c].letter === "") continue;
      if (gArray[ravlTileCol][c].letter !== ravlLetter) {
        initialLetter = gArray[ravlTileCol][c].letter;
        break;
      }
    }
    for (let d = 0; d < puzzWordArray.length; d++) {
      if (puzzWordArray[d].substr(ravlTileCol, 1) === initialLetter) {
        wordIndex = d;
        break;
      }
    }
    let wordForHints = puzzWordArray[wordIndex];
    for (var j = 0; j < this.state.hintsGiven + 2; j++) {
      for (var k = 0; k < numRows; k++) {
        if (gArray[j][k].letter === wordForHints[j]) {
          changeArr.push(gArray[j][k].ref);
          break;
        }
      }
    }
    const ravlCRef = this.state.megaPuzzle ? this.state.megaRavlRef : this.state.ravlTiles[this.state.currentGameIndex];
    changeArr.forEach((cellRef) => {
      const colRef = cellRef.split(",")[0];
      const chgColor = (cellRef === ravlCRef) ? "yellow" : "green";
      this.colRefs[colRef].changeColor(cellRef, chgColor);
    });
    if (this.state.hintsGiven + 2 < numColumns) {
      this.changeScore(-this.state.hintPenalty);
      this.setState({
        eligibleForStar: false,
        hintsGiven: this.state.hintsGiven + 1,
        hintPenalty: 10,
        currentHintsArray: changeArr
      });
    }
  }

  changeTileMode(refArray, mode, onOrOff) {
    switch (mode) {
      case "Dark Mode":
        refArray.forEach((cellRef) => {
          const colRef = cellRef.split(",")[0];
          this.colRefs[colRef].goDark(cellRef, onOrOff);
        });
        if (this.state.currentGameIndex > -1) {
          const ravlColRef = this.state.megaPuzzle ? this.state.megaRavlRef.split(",")[0] : this.state.ravlTiles[this.state.currentGameIndex].split(",")[0];
          const ravlRef = this.state.megaPuzzle ? this.state.megaRavlRef : this.state.ravlTiles[this.state.currentGameIndex]
          this.colRefs[ravlColRef].ravlTileGoDark(ravlRef, onOrOff);
        }
        break;
      case "High Contrast":
        console.log("High Contrast mode...todo?");
        break;
      default:
        console.log("No default case...");
    }
  }

  changeScore(amt) {
    const scr = this.state.score + amt;
    const newKey = nanoid();
    if (amt > 0) {
      this.setState({ counterPulseColor: colors.bright_green });
      setTimeout(() => {
        this.setState({ score: scr });
      }, 1000);
      setTimeout(() => {
        this.setState({ counterKey: newKey });
      }, 1500);
    } else if (amt === -1) {
      this.setState({ counterPulseColor: colors.red, score: scr });
      setTimeout(() => {
        this.setState({ counterKey: newKey });
        if (scr <= 0) {
          this.setState({
            clearedLevel: false,
            endMessage: "Uh oh, you ran out of points!",
            endMessageFail: "Uh oh, you ran out of points!"
          });
          this.animateGameFail();
          setTimeout(() => {
            this.setState({
              gameDone: true,
              nextBtnText: "RETRY",
            });
          }, 1000);
          this.resetLowColPositions();
        }
      }, 200);
    } else if (amt === 0) {
      this.setState({ counterPulseColor: colors.red, counterKey: newKey });
    } else {
      this.setState({ counterPulseColor: colors.red });
      setTimeout(() => {
        this.setState({ score: scr });
      }, 1000);
      setTimeout(() => {
        this.setState({ counterKey: newKey });
      }, 1500);
    }
  }

  moveTileSetUp(colArray, gArray) {
    for (var i = 0; i < Math.abs(colArray[1]); i++) {
      gArray[colArray[0]].push(gArray[colArray[0]].shift());
    }
    // printGameArrayToConsole(gArray);
    this.setState({ gameArray: gArray });
  }

  moveTileSetDown(colArray, gArray) {
    for (var i = 0; i < Math.abs(colArray[1]); i++) {
      gArray[colArray[0]].unshift(gArray[colArray[0]].pop());
    }
    // printGameArrayToConsole(gArray);
    this.setState({ gameArray: gArray });
  }

  updateGameArray(colIndexArr) {
    if (!allowIntoUpdateGameArray) return;
    if (this.state.rowsInPuzzle - this.state.onRow === 1) {
      let dropArray = this.getDropTileArray();
      if (dropArray.length < this.state.gameArray0.length) {
        dropArray.forEach((cellRef) => {
          const colRef = cellRef.split(",")[0];
          this.colRefs[colRef].dropColumn();
        });
      }
    }
    if (this.state.currentGameIndex < 0) return;//avoids response to home screen animation
    let gameIndex = this.state.currentGameIndex;
    const ravlCellRef = this.state.megaPuzzle ? this.state.megaRavlRef : this.state.ravlTiles[gameIndex];
    if (!this.state.puzzleDisplayed) {//turns the ravl tile red at start
      const colRef = ravlCellRef.split(",")[0];
      this.colRefs[colRef].ravlTileGoDark(ravlCellRef, this.state.darkModeEnabled);
      this.setState({ puzzleDisplayed: true });
    }
    let gArray = this.state.gameArray0;
    let noPuzzleWords = true;
    let notAnyWords = true;
    if (colIndexArr[1]) {//number of tile moves in TileSet drop
      if (colIndexArr[1] < 0) {
        this.moveTileSetUp(colIndexArr, gArray);
      } else {
        this.moveTileSetDown(colIndexArr, gArray);
      }
    }
    const allColumnsFlush = this.getRemainingColsAreFlush();
    let hasPuzzleWordArr = this.evalForPuzzleWords(gArray); //[word, row, [refArray]]
    if (hasPuzzleWordArr[0]) {//Has a puzzle word...
      if (this.state.onRow < this.state.rowsInPuzzle - 1) {//not the last row, either animate out or fail
        if (hasPuzzleWordArr[2].includes(ravlCellRef)) {//hit the ravl letter...
          if (allColumnsFlush) {//is okay because columns are flush
            const colRef = ravlCellRef.split(",")[0];
            this.colRefs[colRef].changeColor(ravlCellRef, colors.green);
          } else {//Fail
            allowIntoUpdateGameArray = false;
            this.lockScreen(2500);
            hasPuzzleWordArr[2].forEach((cellRef) => {
              const colRef = cellRef.split(",")[0];
              this.colRefs[colRef].showFailWord(cellRef);
            });
            this.setState({
              clearedLevel: false,
              eligibleForStar: false,
              endMessage: this.state.endMessageFail,
            });
            setTimeout(() => {
              this.animateGameFail();
            }, 1500);
            setTimeout(() => {
              this.setState({
                gameDone: true,
                nextBtnText: "RETRY",
              });
            }, 3500);
            this.resetLowColPositions();
            return;
          }
        }
      } else {//turn ravl tile green before ending
        const colRef = ravlCellRef.split(",")[0];
        this.colRefs[colRef].changeColor(ravlCellRef, colors.green);
        this.resetLowColPositions();
      }
      noPuzzleWords = false;
      let swArray = this.state.solvedWords;
      if (!swArray[this.state.currentGameIndex].includes(hasPuzzleWordArr[0])) {
        const indexToUse = this.state.megaPuzzle && this.state.onRow > 2 ? this.state.currentGameIndex + 1 : this.state.currentGameIndex;
        setTimeout(() => {
          swArray[indexToUse].push(hasPuzzleWordArr[0]); //for display in solved word section
          swArray.forEach((arr) => {
            return arr.sort();
          })
          this.setState({ solvedWords: swArray });
          // try {
          //   window.localStorage.setItem(KEY_SolvedWords, JSON.stringify(swArray));
          // } catch (error) {
          //   window.alert('window.localStorage error: ' + error.message);
          // }
        }, 800);
      }
      const yValue = this.getSolvedAnimYValue(this.state.currentGameIndex - this.state.solvedWordsRowOffset);
      const newHintsGiven = this.state.currentHintsArray[0] && hasPuzzleWordArr[2].includes(this.state.currentHintsArray[0]) ? 0 : this.state.hintsGiven;
      const newHintArr = this.state.currentHintsArray[0] && hasPuzzleWordArr[2].includes(this.state.currentHintsArray[0]) ? [] : this.state.currentHintsArray;
      this.setState({
        onRow: this.state.onRow + 1,
        showSolvedWord: true,
        solvedAnimY: yValue,
        solvedAnimX: -120,
        solvedWord: hasPuzzleWordArr[0],
        solvedPadding: 5,
        currentHintsArray: newHintArr,
        hintsGiven: newHintsGiven
      });
      let whichAnimation = "";
      switch (yValue) {
        case -40:
          whichAnimation = "animate__animatesolvedword-40"
          break;
        case -13:
          whichAnimation = "animate__animatesolvedword-13"
          break;
        case 13:
          whichAnimation = "animate__animatesolvedword13"
          break;
        default:
          whichAnimation = "animate__animatesolvedword40"
      }
      setTimeout(() => {
        const element = document.querySelector('.anim-node');
        element.classList.add('animate__animated', whichAnimation);
      }, 100);
      switch (this.state.solvedWords[this.state.currentGameIndex].length - this.state.swOffset) {
        case 0:
          this.sendRowOut(hasPuzzleWordArr[2], hasPuzzleWordArr[1]);
          break;
        case 1:
          setTimeout(() => {
            this.sendRowOut(hasPuzzleWordArr[2], hasPuzzleWordArr[1]);
          }, 600);
          break;
        case 2:
          setTimeout(() => {
            this.sendRowOut(hasPuzzleWordArr[2], hasPuzzleWordArr[1]);
          }, 1200);
          break;
        default:
          console.log("hit puzzleword default");
          this.sendRowOut(hasPuzzleWordArr[2], hasPuzzleWordArr[1]);
      }
      this.setState({ swOffset: this.state.solvedWords[this.state.currentGameIndex].length });

      return;
    }
    let hasAnyWordArr = this.evalForAnyWords(gArray); //[word, [refArray]]
    if (noPuzzleWords && hasAnyWordArr[0]) {//has a bonus word
      notAnyWords = false;
      switch (this.state.bonusWords[this.state.currentGameIndex].length - this.state.bwOffset) {
        case 1:
          this.flashWord(hasAnyWordArr[1]);
          break;
        case 2:
          setTimeout(() => {
            this.flashWord(hasAnyWordArr[1]);
          }, 600);
          break;
        case 3:
          setTimeout(() => {
            this.flashWord(hasAnyWordArr[1]);
          }, 1200);
          break;
        default:
          console.log("hit default");
          this.flashWord(hasAnyWordArr[1]);
      }
      this.setState({ bwOffset: this.state.bonusWords[this.state.currentGameIndex].length });
      return;
    }
    if (noPuzzleWords && notAnyWords && colIndexArr[1]) {//inconsequential move, deduct a point
      this.changeScore(-1);
    }
    if (this.state.onRow === this.state.rowsInPuzzle) {//last row in puzzle
      const lastIndex = this.state.easyModeEnabled? 5 : this.state.lastIndexInGame;
      if (this.state.currentGameIndex < lastIndex) {
        this.nextPuzzle();
      } else {//completed game
        let newHighScoreBool = false;
        if (this.state.score > this.state.highScore) {
          newHighScoreBool = true;
          this.updateHighScore();
        }
        this.storeOnGameComplete(this.state.isDailyGame);
        const nbText = this.state.isDailyGame || this.state.megaPuzzle ? "CLOSE" : "NEXT";
        this.setState({
          gameDone: true,
          clearedLevel: true,
          newHighScore: newHighScoreBool,
          nextBtnText: nbText,
          showGame8: false,
          megaPuzzle: false
        });
        this.resetLowColPositions();
        if (!this.state.playedGameOnce) {
          try {
            window.localStorage.setItem(KEY_PlayedFirstGame, 'true');
          } catch (error) {
            window.alert('window.localStorage error: ' + error.message);
          }
        }
      }
    }
  }

  resetLowColPositions() {
    const lowColPositions = [null, null, null, null, null, null, null, null, null, null];
    try {
      window.localStorage.setItem(KEY_LowColPositions, JSON.stringify(lowColPositions));
    } catch (error) {
      window.alert('window.localStorage error: ' + error.message);
    }
  }

  storeOnGameComplete(daily) {
    const dateToday = formatDate(new Date(), "MM-dd-yyyy");
    const ps = this.state.puzzleStreak;
    let psInt = parseInt(ps);
    if (dateToday !== this.state.lastPuzzleDay) psInt++;
    let incrPsStr = psInt + "";
    let streakDateStr = incrPsStr + "," + dateToday;
    let incrDsStr = "";
    let streakDailyStr = "";
    try {
      window.localStorage.setItem(KEY_PuzzleStreakDays, streakDateStr);
    } catch (error) {
      window.alert('window.localStorage error: ' + error.message);
    }
    if (this.state.eligibleForStar && !(this.state.isDailyGame && !this.state.megaPuzzle && this.state.dailyPuzzleCompleted)) {
      toast("\u2605 Nice! Have a star! \u2605", {
        position: "bottom-center",
        autoClose: 2400,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      let numS = this.state.numberOfStars;
      if (numS === 100) {
        numS = 1;
        let newColor = getOffsetColor(this.state.currentStarColor);
        newColor = "#" + newColor;

        let delim = ',';
        let newColorString = '';
        let colArr = this.state.starColorArray;
        colArr.unshift(this.state.currentStarColor);
        colArr.pop();
        this.setState({ starColorArray: colArr, currentStarColor: newColor });
        try {
          window.localStorage.setItem(KEY_CurrentStarColor, newColor);
        } catch (error) {
          window.alert('window.localStorage error: ' + error.message);
        }
        colArr.forEach((color) => {
          newColorString = newColorString + delim + color;
        });
        newColorString = newColorString.substring(1);
        console.log("newColorString: " + newColorString);

        try {
          window.localStorage.setItem(KEY_StarColorString, newColorString);
        } catch (error) {
          window.alert('window.localStorage error: ' + error.message);
        }
      } else {
        numS++;
      }
      this.setState({ numberOfStars: numS });
      const numSStr = numS + "";
      try {
        window.localStorage.setItem(KEY_NumStars, numSStr);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }
    if (daily && !this.state.megaPuzzle) {
      this.setState({ dailyPuzzleCompleted: true });
      const ds = this.state.dailyStreak;
      let dsInt = parseInt(ds);
      if (dateToday !== this.state.lastDailyDay) dsInt++;
      incrDsStr = dsInt + "";
      streakDailyStr = incrDsStr + "," + dateToday;
      try {
        window.localStorage.setItem(KEY_DailyStreakDays, streakDailyStr);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }
    this.setState({ puzzleStreak: incrPsStr, dailyStreak: incrDsStr });
  }

  updateHighScore() {
    try {
      window.localStorage.setItem(KEY_HighScore, this.state.score + '');
    } catch (error) {
      window.alert('window.localStorage error: ' + error.message);
    }
  }

  resetSolvedWord() {
    this.setState({
      showSolvedWord: false,
      solvedPadding: 0
    });
    return;
  }

  resetTileColors(dark) {
    const mode = "Dark Mode";
    const remainingTilesArr = this.getRemainingTiles();
    const ravlRef = this.state.megaPuzzle ? this.state.megaRavlRef : this.state.ravlTiles[this.state.currentGameIndex]
    const ravlIndex = remainingTilesArr.indexOf(ravlRef);
    if (ravlIndex > -1) {
      remainingTilesArr.splice(ravlIndex, 1);
    }
    if (this.state.currentHintsArray[0]) {
      this.state.currentHintsArray.forEach((ref) => {
        const htIndex = remainingTilesArr.indexOf(ref);
        remainingTilesArr.splice(htIndex, 1);
      });
    }
    this.changeTileMode(remainingTilesArr, mode, dark);
  }

  evalForPuzzleWords(gArray) {
    const numRows = gArray[0].length;
    const numColumns = gArray.length;
    let returnArr = [];
    for (var i = 0; i < numRows; i++) {
      let tempArray = [];
      let tempWord = "";
      for (var j = 0; j < numColumns; j++) {
        tempArray.push(gArray[j][i].ref);
        tempWord += gArray[j][i].letter;
      }
      let legitWord = false;
      if (tempWord.length === numColumns) {
        switch (numColumns) {
          case 3:
            if (this.state.isDailyGame) {
              switch (this.state.currentGameIndex) {
                case 8:
                  if (puzzleWords8.includes(tempWord)) legitWord = true;
                  break;
                case 9:
                  if (puzzleWords9.includes(tempWord)) legitWord = true;
                  break;
                default:
                  if (puzzleWords10.includes(tempWord)) legitWord = true;
                  break;
              }
            } else {
              if (puzzleWords0.includes(tempWord)) legitWord = true;
            }
            break;
          case 4:
            if (this.state.isDailyGame) {
              switch (this.state.currentGameIndex) {
                case 8:
                  if (puzzleWords8.includes(tempWord)) legitWord = true;
                  break;
                case 9:
                  if (puzzleWords9.includes(tempWord)) legitWord = true;
                  break;
                default:
                  if (puzzleWords10.includes(tempWord)) legitWord = true;
                  break;
              }
            } else {
              if (puzzleWords1.includes(tempWord)) legitWord = true;
            }
            break;
          case 5:
            if (this.state.isDailyGame) {
              switch (this.state.currentGameIndex) {
                case 8:
                  if (puzzleWords8.includes(tempWord)) legitWord = true;
                  break;
                case 9:
                  if (puzzleWords9.includes(tempWord)) legitWord = true;
                  break;
                default:
                  if (puzzleWords10.includes(tempWord)) legitWord = true;
                  break;
              }
            } else {
              if (puzzleWords2.includes(tempWord)) legitWord = true;
            }
            break;
          case 6:
            if (this.state.isDailyGame) {
              switch (this.state.currentGameIndex) {
                case 8:
                  if (puzzleWords8.includes(tempWord)) legitWord = true;
                  break;
                case 9:
                  if (puzzleWords9.includes(tempWord)) legitWord = true;
                  break;
                default:
                  if (puzzleWords10.includes(tempWord)) legitWord = true;
                  break;
              }
            } else {
              if (puzzleWords3.includes(tempWord)) legitWord = true;
            }
            break;
          case 7:
            if (this.state.isDailyGame) {
              switch (this.state.currentGameIndex) {
                case 8:
                  if (puzzleWords8.includes(tempWord)) legitWord = true;
                  break;
                case 9:
                  if (puzzleWords9.includes(tempWord)) legitWord = true;
                  break;
                default:
                  if (puzzleWords10.includes(tempWord)) legitWord = true;
                  break;
              }
            } else {
              if (puzzleWords4.includes(tempWord)) legitWord = true;
            }
            break;
          case 8:
            if (this.state.isDailyGame) {
              switch (this.state.currentGameIndex) {
                case 8:
                  if (puzzleWords8.includes(tempWord)) legitWord = true;
                  break;
                case 9:
                  if (puzzleWords9.includes(tempWord)) legitWord = true;
                  break;
                default:
                  if (puzzleWords10.includes(tempWord)) legitWord = true;
                  break;
              }
            } else {
              if (puzzleWords5.includes(tempWord)) legitWord = true;
            }
            break;
          case 9:
            if (this.state.isDailyGame) {
              switch (this.state.currentGameIndex) {
                case 8:
                  if (puzzleWords8.includes(tempWord) || (this.state.megaPuzzle && this.state.megaWords.includes(tempWord))) legitWord = true;
                  break;
                case 9:
                  if (puzzleWords9.includes(tempWord)) legitWord = true;
                  break;
                default:
                  if (puzzleWords10.includes(tempWord)) legitWord = true;
                  break;
              }
            } else {
              if (puzzleWords6.includes(tempWord)) legitWord = true;
            }
            break;
          case 10:
            if (this.state.isDailyGame) {
              switch (this.state.currentGameIndex) {
                case 8:
                  if (puzzleWords8.includes(tempWord)) legitWord = true;
                  break;
                case 9:
                  if (puzzleWords9.includes(tempWord)) legitWord = true;
                  break;
                default:
                  if (puzzleWords10.includes(tempWord)) legitWord = true;
                  break;
              }
            } else {
              if (puzzleWords7.includes(tempWord)) legitWord = true;
            }
            break;
          default:
            console.log("No default case...");
        }
        if (legitWord) {
          returnArr.push(tempWord); //word
          returnArr.push(i); //row
          returnArr.push(tempArray); //ref array
          break;
        }
      }
    }
    return returnArr;
  }

  evalForAnyWords(gArray) {
    let numRows = gArray[0].length;
    let numColumns = gArray.length;
    let returnArr = [];
    let currIndex = numColumns - 3;
    for (var i = 0; i < numRows; i++) {
      let tempArray = [];
      let tempWord = "";
      let inDictionary = false;
      let bwArray = this.state.bonusWords;
      for (var j = 0; j < numColumns; j++) {
        tempArray.push(gArray[j][i].ref);
        tempWord += gArray[j][i].letter;
      }
      if (
        tempWord.length === numColumns &&
        !bwArray[currIndex].includes(tempWord) &&
        !this.state.puzzleWords.includes(tempWord)
      ) {
        switch (numColumns) {
          case 3:
            if (words3letter.includes(tempWord.toLowerCase())) inDictionary = true;
            break;
          case 4:
            if (words4letter.includes(tempWord.toLowerCase())) inDictionary = true;
            break;
          case 5:
            if (words5letter.includes(tempWord.toLowerCase())) inDictionary = true;
            break;
          case 6:
            if (words6letter.includes(tempWord.toLowerCase())) inDictionary = true;
            break;
          case 7:
            if (words7letter.includes(tempWord.toLowerCase())) inDictionary = true;
            break;
          case 8:
            if (words8letter.includes(tempWord.toLowerCase())) inDictionary = true;
            break;
          case 9:
            if (words9letter.includes(tempWord.toLowerCase())) inDictionary = true;
            break;
          case 10:
            if (words10letter.includes(tempWord.toLowerCase())) inDictionary = true;
            break;
          default:
            console.log("Wrong length...");
        }
        if (inDictionary) {
          returnArr.push(tempWord); //word
          returnArr.push(tempArray); //ref array
          bwArray[currIndex].push(tempWord);
          bwArray.forEach((arr) => {
            arr.sort((a, b) => {
              return a.length - b.length || a.localeCompare(b)
            })
          })
          this.setState({
            bonusWords: bwArray,
            solvedWord: tempWord,
            solvedPadding: 5,
          });
          // try {
          //   window.localStorage.setItem(KEY_BonusWords, JSON.stringify(bwArray));
          // } catch (error) {
          //   window.alert('window.localStorage error: ' + error.message);
          // }
          break;
        }
      }
    }
    return returnArr;
  }

  getRemainingTiles() {
    if (this.state.currentGameIndex === -1) {
      return ["col0,row4", "col1,row4", "col2,row4", "col3,row4", "col0,row5", "col1,row5", "col2,row5", "col3,row5"];
    } else {
      const gArray = this.state.gameArray0;
      const numRows = gArray[0].length;
      const numColumns = gArray.length;
      let remainingTileArray = [];
      for (var l = 0; l < numRows; l++) {
        for (var m = 0; m < numColumns; m++) {
          if (gArray[m][l].letter !== "") {
            remainingTileArray.push(gArray[m][l].ref);
          }
        }
      }
      return remainingTileArray;
    }
  }

  getRemainingColsAreFlush() {
    const gArray = this.state.gameArray0;
    const numRows = gArray[0].length;
    const numColumns = gArray.length;
    let firstColPosArr = [];
    for (var i = 0; i < numColumns; i++) {
      for (var j = 0; j < numRows; j++) {
        if (gArray[i][j].letter !== "") {
          firstColPosArr.push(j);
          break;
        }
      }
    }
    const remainingFlush = allElementsEqual(firstColPosArr);
    return remainingFlush;
  }

  getDropTileArray() {
    const gArray = this.state.gameArray0;
    const numRows = gArray[0].length;
    const numColumns = gArray.length;
    let dropTileArray = [];
    for (var l = 0; l < numRows; l++) {
      dropTileArray.length = 0;
      for (var m = 0; m < numColumns; m++) {
        if (gArray[m][l].letter !== "") {
          dropTileArray.push(gArray[m][l].ref);
        }
      }
      if (dropTileArray.length > 0) {
        for (var n = 0; n < numColumns; n++) {
          if (gArray[n][l].letter !== "") {
            gArray[n].unshift(gArray[n].pop());
          }
          this.setState({ gameArray: gArray });
        }
        break;
      }
    }
    return dropTileArray;
  }

  getSolvedAnimYValue(index) {
    switch (index) {
      case 0:
        return -40;
      case 1:
        return -13;
      case 2:
        return 13;
      case 3:
        return 40;
      default:
        return 40;
    }
  }

  spliceArray(arr, row) {
    for (var k = 0; k < arr.length; k++) {
      arr[k].splice(row, 1);
    }
    this.setState({ gameArray: arr });
    // printGameArrayToConsole(arr);
  }

  transitionToGame(isDaily) {
    if (this.state.nextBtnText === "CLOSE") {
      this.goToStartScreen();
      return;
    }
    if (this.state.playRavlIntervalID !== 0 || (isDaily && this.state.clearedLevel)) {//coming from start screen
      for (let i = 0; i < 5; i++) {
        if (this.state.animationTimerIDs[i]) clearTimeout(this.state.animationTimerIDs[i]);//clear animation setTimeouts
      }
      if (this.state.playRavlIntervalID !== 0) this.runPlayRavlAnimation();//running with IntervalID !== 0 stops animations
      if (isDaily) {
        let lastIndex = !puzzleWords9[0] ? 8 : !puzzleWords10[0] ? 9 : 10;
        lastIndex = this.state.megaPuzzle ? 8 : lastIndex;
        const scrToUse = this.state.megaPuzzle ? 20 : 15;
        const arrToUse = this.state.megaPuzzle ? megaPuzzleArr : this.state.gameArray8;
        const headerTextToUse = this.state.megaPuzzle ? "\u2605\u2605 Mega \u2605\u2605" : this.state.dailyGameDescription;
        setTimeout(() => {
          this.setState({
            showPlayRavl: false,
            rowsInPuzzle: (arrToUse[0].length + 2) / 3,
            initialArrayHeight: arrToUse[0].length,
            onRow: 0,
            score: scrToUse,
            showGame8: true,
            showStars: false,
            eligibleForStar: true,
            gameStarted: true,
            gameArray0: arrToUse,
            solvedWordsRowOffset: 8,
            currentGameIndex: 8,
            progressSavedLevel: 8,
            lastIndexInGame: lastIndex,
            isDailyGame: true,
            nextButtonEnabled: false,
            headerText: headerTextToUse,
            showSolvedWords: true,
            lockScreenInput: false,
            solvedWords: [[], [], [], [], [], [], [], [], [], [], []],
            bonusWords: [[], [], [], [], [], [], [], [], [], [], []]
          });
          // try {
          //   window.localStorage.setItem(KEY_GameIndex, '8');
          // } catch (error) {
          //   window.alert('window.localStorage error: ' + error.message);
          // }
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            showPlayRavl: false,
            rowsInPuzzle: 3,
            initialArrayHeight: this.state.level0Saved[0].length,
            onRow: 0,
            score: 10,
            showGame0: true,
            showStars: false,
            eligibleForStar: true,
            gameStarted: true,
            gameArray0: this.state.level0Saved,
            currentGameIndex: 0,
            progressSavedLevel: 0,
            lastIndexInGame: 7,
            isDailyGame: false,
            nextButtonEnabled: false,
            nextBtnText: "NEXT",
            headerText: "Level  1  of  8",
            showSolvedWords: true,
            lockScreenInput: false,
            solvedWords: [[], [], [], [], [], [], [], [], [], [], []],
            bonusWords: [[], [], [], [], [], [], [], [], [], [], []]
          });
          // try {
          //   window.localStorage.setItem(KEY_GameIndex, '0');
          // } catch (error) {
          //   window.alert('window.localStorage error: ' + error.message);
          // }
        }, 500);
      }
    } else {//coming from failed or completed game
      this.nextGame(false);
    }
  }

  nextGame(goToStart) { //reloads current game if failed
    allowIntoUpdateGameArray = true;
    let swArray = [[], [], [], [], [], [], [], [], [], [], []];
    let bwArray = [[], [], [], [], [], [], [], [], [], [], []];
    let targetLevel = 0;
    let scoreVal = 10;
    let elig = true;
    if (this.state.clearedLevel === true || goToStart) { //load new game
      puzzleWords0 = genWordArray(3, this.state.easyModeEnabled);
      puzzleWords1 = genWordArray(4, this.state.easyModeEnabled);
      puzzleWords2 = genWordArray(5, this.state.easyModeEnabled);
      puzzleWords3 = genWordArray(6, this.state.easyModeEnabled);
      puzzleWords4 = genWordArray(7, this.state.easyModeEnabled);
      puzzleWords5 = genWordArray(8, this.state.easyModeEnabled);
      puzzleWords6 = genWordArray(9, this.state.easyModeEnabled);
      puzzleWords7 = genWordArray(10, this.state.easyModeEnabled);
    } else {
      swArray = this.state.solvedWords;
      bwArray = this.state.bonusWords;
      targetLevel = this.state.progressSavedLevel;
      elig = false;//eligibility for star
      scoreVal = (this.state.score - 5 < 10) ? 10 : this.state.score - 5;
    }
    targetLevel = goToStart ? -1 : this.state.megaPuzzle ? 100 : targetLevel;
    this.setState({ puzzleDisplayed: false, showStars: goToStart, nextBtnText: "NEXT" });

    this.init(
      puzzleWords0,
      puzzleWords1,
      puzzleWords2,
      puzzleWords3,
      puzzleWords4,
      puzzleWords5,
      puzzleWords6,
      puzzleWords7,
      swArray,
      bwArray,
      scoreVal,
      targetLevel,
      elig
    );
  }

  nextPuzzle() {
    this.lockScreen(2000);
    this.setState({
      hintsGiven: 0,
      onRow: 0,
      puzzleDisplayed: false,
    });
    // try {
    //   window.localStorage.setItem(KEY_GameIndex, (this.state.currentGameIndex + 1) + "");
    // } catch (error) {
    //   window.alert('window.localStorage error: ' + error.message);
    // }
    if (this.state.currentGameIndex === 0) {
      this.setState({
        gameArray0: this.state.gameArray1,
        puzzleWords: puzzleWords1,
        showGame1: true,
        showGame0: false,
        currentGameIndex: 1,
        rowsInPuzzle: 3,
        initialArrayHeight: this.state.gameArray1[0].length,
        solvedWordsRowOffset: 0,
        headerText: "Level  " + (this.state.currentGameIndex + 2) + "  of  8"
      });
    } else if (this.state.currentGameIndex === 1) {
      this.showHeaderCommentAnimation("\u0009 Progress Saved");
      this.setState({
        gameArray0: this.state.gameArray2,
        puzzleWords: puzzleWords2,
        showGame2: true,
        showGame1: false,
        currentGameIndex: 2,
        rowsInPuzzle: this.state.easyModeEnabled?3:4,
        initialArrayHeight: this.state.gameArray2[0].length,
        progressSavedLevel: 2,
        solvedWordsRowOffset: 0,
        headerText: "Level  " + (this.state.currentGameIndex + 2) + "  of  8"
      });
    } else if (this.state.currentGameIndex === 2) {
      this.setState({
        gameArray0: this.state.gameArray3,
        puzzleWords: puzzleWords3,
        showGame3: true,
        showGame2: false,
        currentGameIndex: 3,
        rowsInPuzzle: this.state.easyModeEnabled?3:4,
        initialArrayHeight: this.state.gameArray2[0].length,
        progressSavedLevel: 2,
        solvedWordsRowOffset: 0,
        initialArrayHeight: this.state.gameArray3[0].length,
        solvedWordsRowOffset: 0,
        headerText: "Level  " + (this.state.currentGameIndex + 2) + "  of  8"
      });
    } else if (this.state.currentGameIndex === 3) {
      this.showHeaderCommentAnimation("\u0009 Progress Saved");
      this.setState({
        gameArray0: this.state.gameArray4,
        puzzleWords: puzzleWords4,
        showGame4: true,
        showGame3: false,
        currentGameIndex: 4,
        rowsInPuzzle: 3,
        initialArrayHeight: this.state.gameArray4[0].length,
        progressSavedLevel: 4,
        solvedWordsRowOffset: 1,
        headerText: "Level  " + (this.state.currentGameIndex + 2) + "  of  8"
      });
    } else if (this.state.currentGameIndex === 4) {
      this.setState({
        gameArray0: this.state.gameArray5,
        puzzleWords: puzzleWords5,
        showGame5: true,
        showGame4: false,
        currentGameIndex: 5,
        rowsInPuzzle: 3,
        initialArrayHeight: this.state.gameArray5[0].length,
        progressSavedLevel: 4,
        solvedWordsRowOffset: 2,
        headerText: "Level  " + (this.state.currentGameIndex + 2) + "  of  8"
      });
    } else if (this.state.currentGameIndex === 5) {
      this.showHeaderCommentAnimation("\u0009 Progress Saved");
      this.setState({
        gameArray0: this.state.gameArray6,
        puzzleWords: puzzleWords6,
        showGame6: true,
        showGame5: false,
        currentGameIndex: 6,
        rowsInPuzzle: 3,
        initialArrayHeight: this.state.gameArray6[0].length,
        progressSavedLevel: 4,
        solvedWordsRowOffset: 3,
        headerText: "Level  " + (this.state.currentGameIndex + 2) + "  of  8"
      });
    } else if (this.state.currentGameIndex === 6) {
      this.setState({
        gameArray0: this.state.gameArray7,
        puzzleWords: puzzleWords7,
        showGame7: true,
        showGame6: false,
        currentGameIndex: 7,
        rowsInPuzzle: 3,
        initialArrayHeight: this.state.gameArray7[0].length,
        progressSavedLevel: 4,
        solvedWordsRowOffset: 4,
        headerText: "Level  " + (this.state.currentGameIndex + 2) + "  of  8"
      });
    } else if (this.state.currentGameIndex === 8) {
      this.setState({
        gameArray0: this.state.gameArray9,
        puzzleWords: puzzleWords9,
        showGame9: true,
        showGame8: false,
        currentGameIndex: 9,
        progressSavedLevel: 8,
        rowsInPuzzle: (this.state.gameArray9[0].length + 2) / 3,
        initialArrayHeight: this.state.gameArray9[0].length,
        solvedWordsRowOffset: 8,
      });
    } else if (this.state.currentGameIndex === 9) {
      this.setState({
        gameArray0: this.state.gameArray10,
        puzzleWords: puzzleWords10,
        showGame10: true,
        showGame9: false,
        currentGameIndex: 10,
        progressSavedLevel: 8,
        rowsInPuzzle: (this.state.gameArray10[0].length + 2) / 3,
        initialArrayHeight: this.state.gameArray10[0].length,
        solvedWordsRowOffset: 8,
      });
    } else {
      this.setState({
        gameArray0: this.state.gameArray0,
        puzzleWords: puzzleWords0,
        showGame0: true,
        showGame7: false,
        currentGameIndex: 0,
        initialArrayHeight: this.state.gameArray0[0].length,
        solvedWordsRowOffset: 0,
      });
    }
  }

  hideAllGames() {
    this.setState({
      showGame0: false,
      showGame1: false,
      showGame2: false,
      showGame3: false,
      showGame4: false,
      showGame5: false,
      showGame6: false,
      showGame7: false,
      showGame8: false,
      showGame9: false,
      showGame10: false
    });
  }

  showHeaderCommentAnimation(text) {
    this.setState({ showHeaderComment: true, headerComment: text });
    setTimeout(() => {
      this.setState({ showHeaderComment: false });
    }, 3000);
  }

  displayLockScreen() {
    return (
      <div style={this.styles().screen_lock}>
      </div>
    )
  }

  lockScreen(howLong) {
    this.setState({ lockScreenInput: true });
    setTimeout(() => {
      this.setState({ lockScreenInput: false });
    }, howLong);
  }

  displayTutScreen1() {
    return (
      <div style={tut_styles.tut_dialog1}>
        <div style={{ ...tut_styles.tut_text, marginBottom: 20 }}>Move the columns of letters up and down to form words going across...</div>
        <div style={tut_styles.button} onClick={() => this.closeTutScreen1()} >
          <div style={tut_styles.button_text}>OK</div>
        </div>
        <img
          src={require("./images/red_arrow.png")}
          style={tut_styles.arrow_image}
          alt={"Red arrow"}
        />
      </div>
    )
  }

  closeTutScreen1() {
    this.setState({ showTutScreen1: false, showTutScreen2: true, showedTutScreen1: true, showedTutScreen2: false });
  }

  displayTutScreen2() {
    const tutText = "...but make sure the red RavL tile doesn't form a word until your last move!"
    return (
      <div style={tut_styles.tut_dialog2}>
        <div style={tut_styles.tut_text}>{tutText}</div>
        <div style={tut_styles.button} onClick={() => this.closeTutScreen2()} >
          <div style={tut_styles.button_text}>OK</div>
        </div>
        <img
          src={require("./images/exclamation_ravl_tile.png")}
          style={tut_styles.tile_image}
          className={animStyles.Tileimg}
          alt={"Oscillating exclamation point animation"}
        />
      </div>
    )
  }

  closeTutScreen2() {
    this.setState({ showTutScreen2: false, showedTutScreen2: true, lockScreenInput: false });
    try {
      window.localStorage.setItem(KEY_ShowedTutorial, 'true');
    } catch (error) {
      window.alert('AsyncStorage error: ' + error.message);
    }
  }

  toggleModal(which, open) {
    if (open) {
      switch (which) {
        case "RavL Start":
          if (this.state.currentGameIndex === -1) {
            this.toggleDrawer();
          } else {
            this.setState({ showEndGameModal: true });
          }
          break;
        case "Settings":
          this.setState({ showSettingsModal: true });
          break;
        case "Help":
          this.setState({ showHelpModal: true });
          break;
        case "Support":
          this.setState({ showSupportModal: true });
          break;
        case "Mega RavL":
          this.setState({ lockScreenInput: false });
          this.hideAllGames();
          this.toggleDrawer();
          let megaWordsArr = genWordArray(0, this.state.easyModeEnabled);
          console.log("megaWordsArr: " + JSON.stringify(megaWordsArr));
          let straightArrayMega = this.buildStraightArray(megaWordsArr);
          megaPuzzleArr = this.buildGameArray(straightArrayMega);
          const ravlRefMega = this.makeRavlTileRef(5, 9);
          this.setState({ megaPuzzle: true, megaWords: megaWordsArr, megaRavlRef: ravlRefMega, solvedWordsRowOffset: 8 });
          megaPuzzleArr = megaPuzzleArr.map((row, i) => {
            return row.map((letter, j) => ({
              letter,
              ref: "col" + i + ",row" + j,
            }));
          });
          setTimeout(() => {
            this.transitionToGame(true);
          }, 200);
          break;
        default:
          console.log("No default case...");
      }
    } else {
      this.setState({
        showSettingsModal: false,
        showHelpModal: false,
        showSupportModal: false,
        showWordsModal: false,
        showEndGameModal: false,
        showHintNagModal: false,
      });

    }
  }

  goToStartScreen() {
    this.setState({ currentGameIndex: -1, megaPuzzle: false });
    setTimeout(() => {
      this.nextGame(true);
    }, 200)
    this.toggleModal(null, false);
    if (this.state.showMenu) this.toggleDrawer();
  }

  updateSettingsValue(changeArray) {
    const mode = changeArray[0];
    switch (mode) {
      case "Dark Mode":
        const darkModeEnabledBool = changeArray[1]
        this.setState({ darkModeEnabled: darkModeEnabledBool });
        if (this.state.currentGameIndex === -1) return;
        const remainingTilesArr = this.getRemainingTiles();
        const ravlRef = this.state.megaPuzzle ? this.state.megaRavlRef : this.state.ravlTiles[this.state.currentGameIndex]
        const ravlIndex = remainingTilesArr.indexOf(ravlRef);
        if (ravlIndex > -1) {
          remainingTilesArr.splice(ravlIndex, 1);
        }
        if (this.state.currentHintsArray[0]) {
          this.state.currentHintsArray.forEach((ref) => {
            const htIndex = remainingTilesArr.indexOf(ref);
            remainingTilesArr.splice(htIndex, 1);
          });
        }
        this.changeTileMode(remainingTilesArr, mode, darkModeEnabledBool);
        break;
      case "Animation Style":
        this.setState({ animationStyle: changeArray[1] });
        break;
      case "Easy Mode":
        this.setState({ easyModeEnabled: changeArray[1], currentGameIndex: -1, megaPuzzle: false });
        setTimeout(() => {
          this.nextGame(true);
        }, 200)
        break;
      case "Open Support":
        setTimeout(() => {
          this.setState({ showSupportModal: true });
        }, 200);
        this.setState({ showSettingsModal: false });
        break;
      default:
        console.log("No default case...");
    }
  }

  renderStars() {
    let starString1 = "";
    let starString2 = "";
    let starString3 = "";
    let starString4 = "";
    let starString5 = "";
    let singleStar = "\u2605";
    for (let i = 0; i < this.state.numberOfStars; i++) {
      switch (true) {
        case (i > 79):
          starString5 += singleStar;
          break;
        case (i > 59):
          starString4 += singleStar;
          break;
        case (i > 39):
          starString3 += singleStar;
          break;
        case (i > 19):
          starString2 += singleStar;
          break;
        case (i > -1):
          starString1 += singleStar;
          break;
        default:
          console.log("No default case...");
      }
    }

    return (
      <div>
        <div style={{ ...this.styles().star_row, height: this.state.scoreContainerHeight / 5.5 }}>
          <div style={{ ...this.styles().star, color: this.state.currentStarColor }}>{starString1}</div>
        </div>
        <div style={{ ...this.styles().star_row, height: this.state.scoreContainerHeight / 5.5 }}>
          <div style={{ ...this.styles().star, color: this.state.currentStarColor }}>{starString2}</div>
        </div>
        <div style={{ ...this.styles().star_row, height: this.state.scoreContainerHeight / 5.5 }}>
          <div style={{ ...this.styles().star, color: this.state.currentStarColor }}>{starString3}</div>
        </div>
        <div style={{ ...this.styles().star_row, height: this.state.scoreContainerHeight / 5.5 }}>
          <div style={{ ...this.styles().star, color: this.state.currentStarColor }}>{starString4}</div>
        </div>
        <div style={{ ...this.styles().star_row, height: this.state.scoreContainerHeight / 5.5 }}>
          <div style={{ ...this.styles().star, color: this.state.currentStarColor }}>{starString5}</div>
        </div>
      </div>
    );
  }

  renderStars100() {
    let singleStar = "\u2605";
console.log("starColorArray: " + JSON.stringify(this.state.starColorArray));
    return (
      <div style={this.styles().star_row}>
        <div style={{ ...this.styles().star100, marginLeft: tablet ? scrWidth * 0.01 : 2, color: this.state.starColorArray[0] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[1] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[2] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[3] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[4] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[5] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[6] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[7] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[8] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[9] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[10] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[11] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[12] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[13] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[14] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[15] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[16] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[17] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[18] }}>{singleStar}</div>
        <div style={{ ...this.styles().star100, color: this.state.starColorArray[19] }}>{singleStar}</div>
      </div>
    );
  }

  renderSolvedWords(word, i) {
    return (
      <div key={i} style={this.styles().solved_words_slot}>
        <p style={this.styles().debug_text}>{word}</p>
      </div>
    );
  }

  renderDone(cleared) {
    const img = cleared ? require("./images/thumbs_up.png") 
                : 
                this.state.darkModeEnabled?
                require("./images/shrug_white.png")
                :
                require("./images/shrug_black.png");//thumbs_down
    const altText = cleared ? "Thumbs up!" : "Thumbs down";
    const imageDim = config.isPC ? this.state.lettersetContainerWidth / 5.5 : this.state.lettersetContainerWidth / 4.3;
    const imageDimWidth = cleared? imageDim: 3 * imageDim;
    let msg = cleared ? this.state.endMessage : this.state.endMessageFail;
    msg = cleared && this.state.newHighScore && this.state.playedGameOnce ? "Wow \u2014 that's a new\nhigh score!" : msg;
    return (
      <AnimatePresence>
        {this.state.gameDone &&
          <div>
            <motion.div style={this.styles().thumb_view}
              animate={{ y: -scrHeight * 0.18 }}
              transition={{ ease: "easeInOut", duration: 1, repeat: Infinity, repeatType: 'reverse', delay: 0.6 }}
            >
              <motion.div
                initial={{ x: 600 }}
                animate={{ x: 0 }}
                exit={{ x: 400 }}
                transition={{ type: "spring", stiffness: 100, damping: 18, duration: 0.4 }}
              >
                <div >
                  <img src={img} style={{ width: imageDimWidth, height: imageDim }} alt={altText} />
                </div>
              </motion.div>
            </motion.div>
            <motion.div style={this.styles().done_container}
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, duration: 0.4 }}
              onAnimationComplete={() => this.setState({ nextButtonEnabled: true })}
            >
              <div style={{ ...this.styles().done_text, color: this.state.darkModeEnabled ? colors.off_white : colors.off_black }}>{msg}</div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    );
  }

  renderGameOverButton() {
    let img1 = null;
    let img1altText = "Forward";
    let img2 = require("./images/arrow_back.png");
    const consideredDaily = this.state.isDailyGame || this.state.megaPuzzle ? true : false;
    switch (this.state.nextBtnText) {
      case "NEXT":
        img1 = require("./images/arrow_forward.png");
        break;
      case "CLOSE":
        img1 = require("./images/arrow_back.png");
        break;
      case "RETRY":
        img1 = require("./images/retry.png");
        img1altText = "Retry"
        break;
      default:
        console.log("No default case...");
    }

    return (
      <AnimatePresence>
        {this.state.nextButtonEnabled &&
          <motion.div style={this.styles().game_over_button_view}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.8 }}
          >
            {this.state.nextBtnText === "NEXT" &&
              <img src={img2} style={this.styles().game_over_button} onClick={() => this.goToStartScreen()} alt={"Back"} />
            }
            <img src={img1} style={this.styles().game_over_button} onClick={() => this.transitionToGame(consideredDaily)} alt={img1altText} />
          </motion.div>
        }
      </AnimatePresence>
    );
  }

  toggleDrawer() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  showModal(which, open) {
    this.setState({
      showSettingsModal: false,
      showHelpModal: false,
      showSupportModal: false,
      showWordsModal: false,
      showEndGameModal: false,
      showHintNagModal: false,
      showTutScreen1: false,
      showTutScreen2: false,
    });

    this.toggleModal(which, open);
  }

  renderCol(col, i, anim, idFrag) {
    const cRef = "col" + i
    const numC = this.state.gameArray0.length;
    const numR = 3 * this.state.rowsInPuzzle - 2;
    // let cWidth = this.state.lettersetContainerWidth;
    // let cHeight = this.state.lettersetContainerHeight;
    let cHeight = document.getElementById("gameContainer").getBoundingClientRect().height;
    let cWidth = document.getElementById("gameContainer").getBoundingClientRect().width;

    const th1 = this.state.tileHeight * (1.1 - (this.state.gameArray0.length - 3) * 0.1);
    const th2 = this.state.deviceType === "tablet" ? 650 / this.state.initialArrayHeight : this.state.deviceType === "pc" ? 580 / this.state.initialArrayHeight : 500 / this.state.initialArrayHeight;
    const scrDividedWidth = cWidth / (numC + 1);
    const scrDividedHeight = cHeight / (numR + 2);
    let th = Math.min(th1, th2, scrDividedWidth, scrDividedHeight);//tile height
    th = (this.state.deviceType === "pc" || this.state.deviceType === "tablet") && numC > 5 ? th + numC * 2 :
      this.state.deviceType === "phone" && (numC > 5 && numC < 10) ? th + numC :
        this.state.deviceType === "phone" && (numC === 10) ? th + 6 :
          th;
    th = this.state.currentGameIndex === -1 ? th * 0.8 : th;
    const le = (cWidth - numC * (th + 2)) / 2;//left edge
    if (this.state.lettersetContainerWidth === 0) return null;

    return (
      <TileSet
        key={idFrag + i}
        letterArray={col}
        ref={(ref) => this.colRefs[cRef] = ref}
        colIndex={i}
        numCols={numC}
        tileHeight={th}
        left={le}
        animate={anim}
        dark={this.state.darkModeEnabled}
        numColumns={numC}
        sendColToGame={(indexArr) => { this.updateGameArray(indexArr) }}
        checkForWordsAtStart={() => { this.updateGameArray([]) }}
      />
    );
  }

  handleVisibilityChange(visible) {
    if (visible) {
      dateToday = formatDate(new Date(), "MM-dd-yyyy");
      const openedStr = window.localStorage.getItem(KEY_LastOpenedDate);
      if (openedStr !== null) {
        if (dateToday !== openedStr) {
          title = puzzTitle(dateToday);
          description = puzzDescription(dateToday);
          dailyPuzzlesArr = puzzles(dateToday);
          this.setState({ clearedLevel: true, dailyPuzzleCompleted: false });
          setTimeout(() => {
            this.nextGame(true);
          }, 200);
        }
      }
      try {
        window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }
  }

  render() {
    if (this.state.lettersetContainerHeight === 0) {
      return (
        <div style={{ ...this.styles().loading_container, backgroundColor: global.bgColor }}>
          <CircularProgress colors={colors.off_white} />
        </div>
      );
    }
    const orientationMessageOptions = {
      color: colors.text_white,
      bgColor: global.bgColor,
      animation: false,
      fontSize: 3,
      message: "Please play RavL in portrait mode"
    }
    let {
      gameArray0,
      gameArray1,
      gameArray2,
      gameArray3,
      gameArray4,
      gameArray5,
      gameArray6,
      gameArray7,
      gameArray8,
      gameArray9,
      gameArray10,
      solvedWords,
      darkModeEnabled,
      showPuzzWordsModal,
      solvedModalMessage,
      bonusModalMessage,
      dividerString,
      keyIDFragment
    } = this.state;

    return (
      <PageVisibility onChange={isVisible => this.handleVisibilityChange(isVisible)}>
        <div>
          <Menu
            showMenu={this.state.showMenu}
            closeMenu={() => this.toggleDrawer()}
            showModal={(which, open) => this.showModal(which, open)}
            themeColor={global.bgColor}
            cgi={this.state.currentGameIndex}
            scrHeight={this.state.scrHeight}
            scrWidth={this.state.scrWidth}
          />
          <div>
            <ScreenOrientationReact options={orientationMessageOptions}/>
          </div>
          <div 
            style={{ ...this.styles().container, backgroundColor: darkModeEnabled ? colors.gray_4 : colors.off_white }}
            onClick={this.state.showMenu ? () => this.toggleDrawer() : null}
          >
            <Header
              clickMenu={(which) => this.toggleDrawer(which)}
              showModal={(which, open) => this.showModal(which, open)}
              scrHeight={this.state.scrHeight}
              scrWidth={this.state.scrWidth}
              marLeftOrRight={(this.state.scrWidth - this.state.scrHeight * 9/16)/2 + 20}
              deviceType={ this.state.deviceType}
            />
            <div style={this.styles().appContainer}>
              <div 
                id="appLeftBox"
                style={{ ...this.styles().adBox, backgroundColor: colors.gray_3, width: this.state.widthLeftOrRight, borderRightColor: colors.off_black, left: 0 }}
              />

              <div style={{ ...this.styles().adBox, backgroundColor: colors.gray_3, width:  this.state.widthLeftOrRight, borderLeftColor: colors.off_black, right: 0 }} />
              <div style={{ ...this.styles().messageOuterContainer, borderColor: global.bgColor }}>
                <div style={this.styles().messageContainer}>
                  <div style={{ ...this.styles().header_text, color: this.state.dailyPuzzleCompleted && this.state.currentGameIndex === -1 ? colors.gray_2 : colors.text_white }}>
                    {this.state.headerText}
                  </div>

                  <AnimatePresence>
                    {this.state.showHeaderComment &&
                      <motion.div
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        exit={{ y: 40 }}
                        style={this.styles().header_text_white}
                        transition={{ duration: 0.8 }}
                      >
                        <div style={this.styles().header_text}>{this.state.headerComment}</div>
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>
              </div>

              <div style={this.styles().scoreContainer} ref={this.scoreContainer}>
                {this.state.showStars &&
                  <div id="starsContainer" style={this.styles().stars_container}>
                    {this.renderStars()}
                  </div>
                }
                <div style={this.styles().solved_words_inner_container}>
                  <AnimatePresence>
                    {this.state.showSolvedWord &&
                      <div style={{ ...this.styles().animated_solved_word, top: tablet ? 50 : isPC ? 30 : 20, left: getAnimatedWordLeft(this.state.solvedWord.length) }}>
                        <div className={'anim-node'} style={{ ...this.styles().solved_text, padding: this.state.solvedPadding }}>{this.state.solvedWord}</div>
                      </div>
                    }
                  </AnimatePresence>
                  {this.state.showSolvedWords &&
                    <div style={this.styles().solved_words}>
                      <div style={this.styles().solved_words_row}>
                        {solvedWords[0 + this.state.solvedWordsRowOffset].map((word, index) => this.renderSolvedWords(word, index))}
                      </div>
                      <div style={this.styles().solved_words_row}>
                        {solvedWords[1 + this.state.solvedWordsRowOffset].map((word, index) => this.renderSolvedWords(word, index))}
                      </div>
                      <div style={this.styles().solved_words_row}>
                        {solvedWords[2 + this.state.solvedWordsRowOffset].map((word, index) => this.renderSolvedWords(word, index))}
                      </div>
                      {solvedWords[3 + this.state.solvedWordsRowOffset] &&
                        <div style={this.styles().solved_words_row}>
                          {solvedWords[3 + this.state.solvedWordsRowOffset].map((word, index) => this.renderSolvedWords(word, index))}
                        </div>
                      }
                    </div>
                  }
                </div>
                <div style={this.styles().counter_inner_container}>
                  <motion.div
                    style={this.styles().counter_text}
                    key={this.state.counterKey}
                    initial={{ scale: 1, color: colors.text_white }}
                    animate={{ scale: 1.2, color: this.state.counterPulseColor }}
                    transition={{ repeat: 1, repeatType: "mirror", duration: 0.2, delay: 0.1 }}
                  >
                    {this.state.score}
                  </motion.div>
                </div>
              </div>
              <div id="gameContainer" style={this.styles().gameContainer} ref={this.lettersetContainer}>
                {this.state.showTutScreen1 && !this.state.showedTutScreen1 && this.state.currentGameIndex !== -1 && this.displayTutScreen1()}
                {this.state.showTutScreen2 && !this.state.showedTutScreen2 && this.state.currentGameIndex !== -1 && this.displayTutScreen2()}
                {this.state.showStars && this.state.starColorArray[0] !== '#333333' &&
                  <div style={{ ...this.styles().stars100_container, borderColor: this.state.darkModeEnabled ? colors.gray_4 : colors.dark_green }}>
                    {this.renderStars100()}
                  </div>
                }
                {this.state.showPlayRavl &&
                  playRavlStr.map((column, index) => this.renderCol(column, index, false, keyIDFragment))}
                {this.state.showGame0 &&
                  gameArray0.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame1 &&
                  gameArray1.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame2 &&
                  gameArray2.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame3 &&
                  gameArray3.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame4 &&
                  gameArray4.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame5 &&
                  gameArray5.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame6 &&
                  gameArray6.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame7 &&
                  gameArray7.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame8 && !this.state.megaPuzzle &&
                  gameArray8.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame8 && this.state.megaPuzzle &&
                  megaPuzzleArr.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame9 &&
                  gameArray9.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.showGame10 &&
                  gameArray10.map((column, index) => this.renderCol(column, index, true, keyIDFragment))}
                {this.state.gameDone && this.renderDone(this.state.clearedLevel)}
                {this.state.lockScreenInput && this.displayLockScreen()}
              </div>
              <div id="footerContainer" style={{ ...this.styles().footerContainer, backgroundColor: global.bgColor }}>
                <motion.button 
                  style={{
                    ...this.styles().button, 
                    height:  this.state.deviceType === "tablet" ? scrHeight * 0.06 :  this.state.deviceType === "pc" ? scrHeight * 0.04 : scrWidth * 0.1,
                    width:  this.state.deviceType === "tablet" ? scrHeight * 0.12 :  this.state.deviceType === "pc" ? scrHeight * 0.1 : scrWidth / 4
                  }} 
                  whileTap={{ scale: 0.97 }} 
                  onClick={() => this.openWordsModal()} 
                >
                  <div style={this.styles().button_text}>WORDS</div>
                </motion.button>
                <motion.button 
                  style={{
                    ...this.styles().button, 
                    height:  this.state.deviceType === "tablet" ? scrHeight * 0.06 :  this.state.deviceType === "pc" ? scrHeight * 0.04 : scrWidth * 0.1,
                    width:  this.state.deviceType === "tablet" ? scrHeight * 0.12 :  this.state.deviceType === "pc" ? scrHeight * 0.1 : scrWidth / 4
                  }} 
                  whileTap={{ scale: 0.97 }} 
                  onClick={() => this.giveHint()} 
                >
                  <div style={this.styles().button_text}>HINT</div>
                </motion.button>
              </div>
            </div>
            {this.state.currentGameIndex === -1 &&
              <Footer
                puzzleStreak={this.state.puzzleStreak}
                startGame={(daily) => this.transitionToGame(daily)}
                gameIndex={this.state.currentGameIndex}
                buttonColor={this.state.dailyPuzzleCompleted && this.state.currentGameIndex === -1 ? colors.gray_2 : colors.text_white}
                scrHeight={this.state.scrHeight}
                scrWidth={this.state.scrWidth}
                marLeftOrRight={(this.state.scrWidth - this.state.scrHeight * 9/16)/2}
                deviceType={ this.state.deviceType}
              />
            }
          </div>
          <div>
            {this.state.nextButtonEnabled && this.renderGameOverButton()}

            <ToastContainer
              position="bottom-center"
              style={{ width: isPC ? scrHeight / 4.5 : scrWidth * 0.7 }}
              autoClose={2400}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Settings
              isModalVisible={this.state.showSettingsModal}
              requestModalClose={() => { this.toggleModal(null, false) }}
              sendValueToGame={(val) => { this.updateSettingsValue(val) }}
              navigation={this.props.navigation}
            />
            <Help
              isModalVisible={this.state.showHelpModal}
              requestModalClose={(which, open) => { this.toggleModal(which, open) }}
              darkModeEnabled={this.state.darkModeEnabled}
            />
            <Support
              isModalVisible={this.state.showSupportModal}
              requestModalClose={(which, open) => { this.toggleModal(which, open) }}
              darkModeEnabled={this.state.darkModeEnabled}
              startPurchaseInGame={(val) => { this.initiatePurchase(val) }}
            />
            <Words
              isModalVisible={this.state.showWordsModal}
              isDarkModeEnabled={this.state.darkModeEnabled}
              showPuzzWordsModal={showPuzzWordsModal}
              solvedModalMessage={solvedModalMessage}
              bonusModalMessage={bonusModalMessage}
              dividerString={dividerString}
              requestModalClose={() => { this.toggleModal(null, false) }}
            />
            <EndGame
              isModalVisible={this.state.showEndGameModal}
              isDarkModeEnabled={this.state.darkModeEnabled}
              requestModalClose={() => { this.toggleModal(null, false) }}
              requestGoToStart={() => { this.goToStartScreen() }}
            />
            <HintNag
              isModalVisible={this.state.showHintNagModal}
              isDarkModeEnabled={this.state.darkModeEnabled}
              requestModalClose={() => { this.toggleModal(null, false) }}
            />
          </div>
        </div>
      </PageVisibility>
    );
  }
}

export default App;
