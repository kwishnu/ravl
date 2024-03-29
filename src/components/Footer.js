import React from 'react';
import { motion } from "framer-motion"
import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
// const scrWidth = config.scrWidth;
// const scrHeight = config.scrHeight;
// const tablet = scrHeight/scrWidth > 1.77?false:true;
// const widthLeftOrRight = (scrWidth - scrHeight * 9/16)/2;

function Footer(props) {
  let isPC = props.deviceType === "pc"?true:false;
  let isTablet = props.deviceType === "tablet"?true:false;
  const convertFont = (inputFontSize) => isTablet || isPC?inputFontSize * props.scrHeight/1200:inputFontSize * props.scrWidth/460;

  return(
    <div style={{...footer_styles.container, width: props.scrWidth, top: props.scrHeight * 0.84, backgroundColor: global.bgColor}}>
      <div style={{width: isPC || isTablet?props.widthLeftOrRight:0}}>
      </div>
      <div style={{...footer_styles.center_div, width: isPC || isTablet?props.scrHeight * 9/16:props.scrWidth}}>
        <div style={footer_styles.start_buttons_row}>
          <div style={footer_styles.footer_spacer}>
          </div>
          <motion.button 
            style={{
              ...footer_styles.start_button, 
              flex: 1, 
              padding: 8,
              // height: isTablet? props.scrHeight * 0.06:props.scrWidth * 0.13,
              borderLeftWidth: isTablet?10:8,
              borderRightWidth:  isTablet?10:8
            }} 
            whileTap={{ scale: 0.97 }} 
            onClick={props.gameIndex === -1?() => props.startGame(true):() => props.showWords()}
          >
            <div style={{...footer_styles.button_text, fontSize: convertFont(18), color: props.buttonColor}}>{props.gameIndex === -1?"PLAY DAILY":"WORDS"}</div>
          </motion.button>
          <motion.button 
            style={{
              ...footer_styles.start_button, 
              flex: 1,
              padding: 8,
              // height: isTablet? props.scrHeight * 0.06:props.scrWidth * 0.13,
              borderLeftWidth: isTablet?10:8,
              borderRightWidth:  isTablet?10:8
            }} 
            whileTap={{ scale: 0.97 }} 
            onClick={props.gameIndex === -1?() => props.startGame(false):() => props.callForHint()}
          >
            <div style={{...footer_styles.button_text_white, fontSize: convertFont(18)}}>{props.gameIndex === -1?"PLAY":"HINT"}</div>
          </motion.button>
          <div style={footer_styles.footer_spacer}>
          </div>
        </div>
        <div style={footer_styles.streak_row}>
          <div style={footer_styles.streak_cell1}>
            <div style={footer_styles.streak_text}>{(props.puzzleStreak === '0' || props.puzzleStreak === '0,01-01-2001')?'':"Streak:"}</div>
          </div>
          <div style={footer_styles.streak_cell2}>
            {(props.puzzleStreak !== '0' && props.puzzleStreak !== '0,01-01-2001') &&
              <div style={footer_styles.streak_text_bubble}>
                <div style={{...footer_styles.streak_number_text, fontSize: convertFont(20)}}>
                  {
                    (parseInt(props.puzzleStreak) > 2)?'🔥 ' + props.puzzleStreak:
                    props.puzzleStreak
                  }
                </div>
              </div>
            }
          </div>
          <div style={footer_styles.streak_cell3}>
            <div style={footer_styles.streak_text}>
              {
                (props.puzzleStreak === '0' || props.puzzleStreak === '0,01-01-2001')?'':
                (props.puzzleStreak === '1')?"day":
                "days"
              }
            </div>
          </div>
        </div>
      </div>
      <div style={{width: isPC || isTablet?props.widthLeftOrRight:0}}>
      </div>
    </div>
  )

}

const footer_styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    position: 'absolute',
    bottom: 0,
    right: 0, 
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    zIndex: 1
  },
  center_div: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: 'stretch',
  },
  start_buttons_row: {
    display: "flex",
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    justifyContent: 'center',
// borderColor: 'red', borderWidth: 2, borderStyle: 'solid'
  },
  streak_row: {
    display: "flex",
    flex: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 6,
// borderColor: 'yellow', borderWidth: 2, borderStyle: 'solid'

  },
  start_button: {
    display: "flex",
    borderRadius: config.button_radius,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: colors.button_blue,
    margin: 4,
    boxShadow: `10px 10px 36px ${colors.off_black}`,
    borderColor: colors.transparent,
  },
  button_text: {
    fontFamily: "Acme",
    textAlign: "center",
  },
  button_text_white: {
    fontFamily: "Acme",
    color: colors.off_white,
    textAlign: "center",
  },
  footer_spacer: {
    display: "flex",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streak_cell1: {
    display: "flex",
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
  },
  streak_cell2: {
    display: "flex",
    flex: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  streak_cell3: {
    display: "flex",
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  streak_text: {
    fontFamily: "system-ui",
    fontSize: convertFont(18),
    color: colors.off_white,
    marginBottom: 12,
  },
  streak_text_bubble: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.off_black,
    borderColor: colors.gray_2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 16
  },
  streak_number_text: {
    fontFamily: "system-ui",
    color: colors.bright_green,
  },
}

export default Footer;