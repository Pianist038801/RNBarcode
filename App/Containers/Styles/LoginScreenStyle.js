import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  contentStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'green'
  },
  categoryBoard: {
    flex: 1,
    margin: Metrics.marginHorizontal,
    height: Metrics.HEIGHT(536),
    padding: Metrics.marginHorizontal,
  },
  greenLeft: {
    width: Metrics.WIDTH(9),
    height: Metrics.HEIGHT(10),
  },
  greenDown: {
    width: Metrics.WIDTH(10),
    height: Metrics.HEIGHT(9),
  },
  greenCheck: {
    width: Metrics.WIDTH(20),
    height: Metrics.HEIGHT(14),
  },
  checkBox: {
    width: Metrics.WIDTH(14),
    height: Metrics.HEIGHT(14),
  },
  bottomProductBar: {
    flexDirection: 'row',
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(77),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: Metrics.WIDTH(20),
    
  },
  bottomProductView: {
    flexDirection: 'row',
    width: Metrics.screenWidth,
    height: Metrics.HEIGHT(77),
    alignItems: 'center', 
    alignSelf: 'center',
    paddingHorizontal: Metrics.WIDTH(20),
    
  },
  bottomProductRightBtn: {
    flexDirection: 'row',
    width: Metrics.WIDTH(310),
    height: Metrics.HEIGHT(60),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.WIDTH(20),
  },
  back_btn_wrapper: {
    width: Metrics.WIDTH(60),
    height: Metrics.WIDTH(60),
    borderRadius: Metrics.WIDTH(30),
    backgroundColor: '#f77717',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_btn: {
    width: Metrics.WIDTH(40),
    height: Metrics.WIDTH(40),
  },
  ear_left: {
    width: Metrics.WIDTH(74),
    height: Metrics.HEIGHT(164),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cog_icon: {
    width: Metrics.WIDTH(27),
    height: Metrics.WIDTH(27),
  },
  product_name: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Metrics.WIDTH(430),
    height: Metrics.HEIGHT(40),
    paddingHorizontal: Metrics.WIDTH(20),
    alignSelf: 'center',
    flex: 1,
  },
  product_input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Metrics.WIDTH(330),
    height: Metrics.HEIGHT(60),
    paddingHorizontal: Metrics.WIDTH(20),
    marginVertical: Metrics.HEIGHT(10),
    alignSelf: 'center',
    flex: 1,
  },
  confirm_button: {
    width: Metrics.WIDTH(258),
    height: Metrics.HEIGHT(135),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modal_button: {
    width: Metrics.WIDTH(179),
    height: Metrics.HEIGHT(79),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sideButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.HEIGHT(-28)
  },
  cameraButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.HEIGHT(8)
  },
  cameraView: {
    width: Metrics.screenWidth-4,
    height: Metrics.HEIGHT(381)-4,
    borderWidth: 2,
    borderColor: '#f77717'
  },
  inputContainer: {
    backgroundColor: Colors.snow,
  },
  inputStyle: {
    fontWeight: 'bold',
  },
  logoContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    height:204,
    width: 180,
  },
  logo: {
    height:204,
    width:180,
  },
  headerView: {
    flex:1,
    backgroundColor: '#f9fafa',
  },
  loginForm: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 435 / 970,
  },
  modalInput: {
    alignSelf: 'center',
    width: Metrics.WIDTH(297),
    height: Metrics.HEIGHT(58),
    marginTop: Metrics.HEIGHT(15),
  },
  numberButton: {
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(73),
    marginLeft: Metrics.WIDTH(130)
  },
  codeButton: {
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(73),
    marginLeft: Metrics.WIDTH(260)
  },
  sendButton: {
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(73),
    marginLeft: Metrics.WIDTH(-190),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  barcodeButtonView: {
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(77), 
    marginLeft: Metrics.WIDTH(-340),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  barcodeButton: {
    width: Metrics.WIDTH(34),
    height: Metrics.HEIGHT(34),
    marginRight: Metrics.WIDTH(20),
    marginLeft: Metrics.WIDTH(30),
  },
  cameraButtonView: {
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(77), 
    marginRight: Metrics.WIDTH(-140),
    flexDirection: 'row',
    alignItems: 'center'
  },
  cameraBtnWrapper: {
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(77), 
    marginRight: Metrics.WIDTH(-140),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.WIDTH(20),
  },
  latestImage: {
    borderRadius: Metrics.HEIGHT(34), 
    borderWidth: 1, 
    borderColor: '#f77717', 
    width: Metrics.HEIGHT(68), 
    height: Metrics.HEIGHT(68),
    marginLeft: Metrics.WIDTH(20),
  },
  whiteContent: {
    backgroundColor: '#ffffff',
    flex:1,
  },
  leftSideView: {
    width: Metrics.sideBarWidth,
    flex: 1
  },
  bottomBar: {
    width: Metrics.WIDTH(980),
    height: Metrics.HEIGHT(689),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: Metrics.HEIGHT(180),
  },
  bottomMainBar: {
    width: Metrics.WIDTH(980),
    height: Metrics.HEIGHT(689),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: Metrics.HEIGHT(20),
  },
  dog: {
    position: 'absolute',
    width: Metrics.WIDTH(270),
    height: Metrics.HEIGHT(240),
    left: Metrics.WIDTH(213),
    top: Metrics.HEIGHT(103)
  },
  menuicon: {
    width: Metrics.WIDTH(56),
    height: Metrics.HEIGHT(56),
    resizeMode: 'stretch',
    marginLeft: Metrics.WIDTH(46),
  }
})
