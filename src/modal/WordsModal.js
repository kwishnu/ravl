import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const pc = config.isPC;
const tablet = config.isTablet;

class WordsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPuzzWordsModal: this.props.showPuzzWordsModal,
      solvedModalMessage: this.props.solvedModalMessage,
      bonusModalMessage: this.props.bonusModalMessage,
      darkModeEnabled: this.props.isDarkModeEnabled,
      dividerString: "",
    };
  }
  componentDidMount() {
  }
  closeSelf(){
    this.props.requestModalClose();
  }

  render() {
    const { 
      isModalVisible,
      isDarkModeEnabled,
      showPuzzWordsModal,
      dividerString,
      solvedModalMessage,
      bonusModalMessage
    } = this.props;
    return(
      <AnimatePresence>
      {isModalVisible && 
        <motion.div
          style={words_modal_styles.centereddiv}
          initial={{ y: scrHeight }}
          animate={{ y: 0 }}
          exit={{ y: scrHeight }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          <div style={{...words_modal_styles.modaldiv, backgroundColor: isDarkModeEnabled ? colors.off_black:colors.off_white}}>
          {showPuzzWordsModal && (
              <div style={words_modal_styles.text_container}>
                <div style={{...words_modal_styles.modal_title, color: isDarkModeEnabled ? colors.gray_1:colors.off_black}}>Puzzle Words:</div>
                <div style={{...words_modal_styles.modal_text, whiteSpace: 'pre-line', color: isDarkModeEnabled ? colors.gray_2:colors.off_black}}>
                  {solvedModalMessage}
                </div>
              </div>
            )}
            {showPuzzWordsModal && (
              <div>
                <div style={{...words_modal_styles.modal_text,
                      textAlign: "center",
                      fontWeight: "bold",
                      marginBottom: 15,
                      color: isDarkModeEnabled ? colors.off_white:colors.off_black
                    }}
                >
                  {dividerString}
                </div>
              </div>
            )}
            <div style={words_modal_styles.text_container}>
              <div
                style={{...words_modal_styles.modal_title, 
                color: isDarkModeEnabled ? colors.gray_1:colors.off_black}}
              >
              {!this.props.solvedModalMessage && !this.props.bonusModalMessage? "Words:":"Bonus Words:"}
              </div>
              <div style={{...words_modal_styles.modal_text, whiteSpace: 'pre-line', color: isDarkModeEnabled ? colors.gray_2:colors.off_black}}>
                {bonusModalMessage || "None yet!"}
              </div>
            </div>
            <div style={words_modal_styles.button_container}>
              <div
                style={words_modal_styles.button}
                onClick={() => this.closeSelf()}
              >
                <div style={words_modal_styles.button_text}>OK</div>
              </div>
            </div>
          </div>
        </motion.div>
      }
      </AnimatePresence>
      );
  }
}

const words_modal_styles = {
  centereddiv: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: scrWidth,
  },
  modaldiv: {
    flexDirection: 'column',
    width: config.isPC?scrHeight * 0.4:scrWidth * 0.7,
    padding: 25,
    borderRadius: 5,
    alignItems: "center",
    boxShadow: `8px 8px 28px ${colors.gray_3}`,
  },
  button_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text_container: {
    alignSelf: 'stretch',
  },
  button: {
    borderRadius: 5,
    justifyContent: "center",
    width: pc?scrHeight/12:tablet?scrWidth/8:scrWidth/5,
    padding: 8,
    backgroundColor: colors.button_blue,
    userSelect: 'none'
  },
  button_text: {
    color: "white",
    fontSize: convertFont(23),
    fontFamily: 'system-ui',
    fontWeight: 'bold',
    textAlign: "center"
  },
  modal_title: {
    fontSize: convertFont(30),
    fontFamily: 'Acme',
    marginBottom: 15,
    textAlign: "left"
  },
  modal_text: {
    fontSize: convertFont(22),
    fontFamily: 'system-ui',
    marginBottom: 30,
    marginTop: 15,
    textAlign: "left"
  },
}

export default WordsModal;