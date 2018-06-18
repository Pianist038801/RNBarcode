import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  contentStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'green'
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
  },
  cameraButtonView: {
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(77), 
    marginRight: Metrics.WIDTH(-140),
    flexDirection: 'row',
    alignItems: 'center'
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
