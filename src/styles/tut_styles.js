
import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const tablet = config.isTablet;
const pc = config.isPC;

//import { normalizeFont }  from '../config/pixelRatio';

const tut_styles = {
// tut_screen: {
//   display: "flex",
//   position: 'absolute',
//   left: 0,
//   right: 0,
//   top: 0,
//   bottom: 0,
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: colors.transparent,
// },
tut_dialog1: {
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  position: "absolute",
  top: tablet?-40:-20,
  left: pc?scrHeight * 0.2:tablet?scrWidth * 0.28:scrWidth * 0.22,
  width: pc?scrHeight * 0.3: tablet?scrWidth * 0.5:scrWidth * 0.6,
  height: "auto",
  backgroundColor: colors.text_white,
  padding: 30,
  borderRadius: 8,
  marginBottom: tablet?scrHeight * 0.56:scrHeight * 0.47,
  boxShadow: `10px 20px 20px ${colors.off_black}`,
  zIndex: 200
},
tut_dialog2: {
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  position: "absolute",
  top: scrHeight * 0.35,
  left: pc?20:tablet?20:scrWidth * 0.1,
  width: scrHeight * 0.25,
  height: "auto",
  backgroundColor: colors.text_white,
  borderRadius: 8,
  marginRight: 50,
  padding: 30,
  boxShadow: `10px 20px 20px ${colors.off_black}`,
  zIndex: 200
},
tut_text: {
  fontSize: convertFont(23),
  fontFamily: "system-ui",
  color: colors.off_black,
  userSelect: 'none'
},
button: {
  width: pc?scrHeight/12:tablet?scrWidth/8:scrWidth/5,
  padding: 8,
  marginTop: 15,
  borderRadius: config.button_radius,
  backgroundColor: colors.button_blue,
},
button_text: {
  fontFamily: "Acme",
  fontSize: convertFont(20),
  color: colors.off_white,
  textAlign: "center",
  userSelect: 'none'
},
arrow_image: {
  width: pc?scrHeight/15:scrWidth/6,
  height: pc?scrHeight/10:scrWidth/4,
  position: 'absolute',
  top: pc?scrHeight * 0.17:scrHeight * 0.2,
  left: 0,
},
tile_image: {
  width: pc?scrHeight/15:scrWidth/6, 
  height: pc?scrHeight/15:scrWidth/6, 
  position: 'absolute',
  top: tablet?-scrHeight/10:-scrHeight/18,
  left: 0,
}


}

export default tut_styles;