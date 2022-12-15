import colors from '../config/colors';
import config from '../config/config';
import {convertFont} from '../config/config';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const tablet = config.isTablet;
const pc = config.isPC;
const phone = config.isPhone;

// const phone = config.isPhone;
const widthLeftOrRight = (scrWidth - scrHeight * 9/16)/2;

const appStyles = {


  loading_container: {
    display: 'flex',
    flex: 1,
    height: scrHeight,
    width: scrWidth,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.dark_purple,
  },
  container: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: scrHeight,
    width: scrWidth,
    maxWidth: scrWidth,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.transparent,
  },
  screen_lock: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.transparent,
  },
  AppLeftBox: {
    height:"100%",
    width: pc || config.isTablet?widthLeftOrRight:0,
    textAlign: "center"
  },
  AppRightBox: {
    height:"100%",
    width: pc || config.isTablet?widthLeftOrRight:0,
    textAlign: "center"
  },
  messageOuterContainer: {
    display: "flex",
    flex: 1,
    width: pc || config.isTablet?scrHeight * 9/16:scrWidth,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray_4,
    border: colors.off_black, 
    borderWidth: 3, 
    borderStyle: pc || tablet?"none solid solid solid":"none none solid none",
  },
  messageContainer: {
    display: "flex",
    flex: 1,
    width: pc || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 14,
    backgroundColor: colors.transparent,
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 3,
    width: pc || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.off_black,
    marginStart: 5,
    marginEnd: 5,
    marginTop: 2,
    border: colors.dark_green,
    borderRadius: 5,
    borderWidth: 2, 
    borderStyle: "none solid solid solid",
    zIndex: 10
  },
  solved_words_inner_container: {
    display: "flex",
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf:'stretch',
    marginStart: 8,
    marginTop: 3,
  },
  counter_inner_container: {
    display: "flex",
    flex: 2,
    flexDirection: 'column',
    height: scrHeight/17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: colors.button_blue,
    margin: 8,
  },
  solved_words: {
    display: "flex",
    flexDirection: 'column',
    alignSelf:'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  solved_words_row: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: scrHeight * 0.025,
    zIndex: 101,
    textAlign: "center",
  },
  solved_words_slot: {
    display: "flex",
    height: scrHeight * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    marginRight: 2,
    marginLeft: 7,
  },
  animated_solved_word: {
    position: 'absolute',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    borderColor: colors.bright_green,
    borderWidth: 1,
    borderStyle: "solid",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.off_black,
    zIndex: 1000
  },
  gameContainer: {
    display: "flex",
    flexDirection: "row",
    flex: pc?24:18,
    width: pc || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 2,
    width: pc || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark_purple,
    borderColor: colors.black, 
    borderWidth: 2, 
    borderStyle: "solid none none none"
  },
  thumb_view: {
    display: "flex",
    flexDirection: "row",
    position: 'absolute',
    top: scrHeight * 0.3,
    bottom: scrHeight * 0.44,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    zIndex: 1000
  },
  game_over_button_view: {
    display: "flex",
    flexDirection: "row",
    position: 'absolute',
    top: scrHeight * 0.65,
    bottom: scrHeight * 0.2,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
  },
  done_container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scrHeight/11,
  },
  game_over_button: {
    width: tablet?scrWidth/6:pc?scrHeight/14:scrWidth/4.8,
    height: tablet?scrWidth/6:pc?scrHeight/14:scrWidth/4.8,
    borderRadius: config.button_radius,
    justifyContent: "center",
    alignItems: 'center',
    marginLeft: convertFont(18),
    marginRight: convertFont(18),
    marginTop: phone?100:0,
    backgroundColor: colors.button_blue,
    boxShadow: `10px 10px 28px ${colors.off_black}`,

  },
   button: {
    height: tablet? scrHeight * 0.06:pc? scrHeight * 0.04:scrWidth * 0.1,
    width: tablet? scrHeight * 0.12:pc? scrHeight * 0.1:scrWidth/4,
    borderRadius: config.button_radius,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.button_blue,
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: colors.button_blue,
    boxShadow: `8px 8px 28px ${colors.off_black}`,
  },
  header_text: {
    fontSize: tablet?convertFont(20):convertFont(21),
    fontFamily: "system-ui",
    color: colors.text_white,
    marginRight: 15,
    alignSelf: "center"
  },
  counter_text: {
    fontSize: pc? convertFont(34):convertFont(31),
    fontFamily: 'system-ui',
    color: colors.text_white,
  },
  done_text: {
    fontSize: convertFont(29),
    fontFamily: 'system-ui',
    margin: 10,
    textAlign: 'center'
  },
  button_text: {
    fontFamily: "Acme",
    fontSize: convertFont(22),
    color: colors.off_white,
    textAlign: "center",
  },
  button_text_white: {
    fontFamily: "Acme",
    fontSize: convertFont(22),
    color: colors.off_white,
    textAlign: "center",
  },
  debug_text: {
    fontSize: convertFont(16),
    fontFamily: 'system-ui',
    color: colors.bright_green,
  },
  solved_text: {
    fontSize: convertFont(25),
    fontFamily: 'system-ui',
    color: colors.bright_green,
  },


}

export default appStyles;