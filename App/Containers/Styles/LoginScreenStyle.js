import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  contentStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'green'
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
    height: Metrics.screenHeight * 405 / 970,
  },
  numberButton: {
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(73),
    marginLeft: Metrics.WIDTH(110)
  },
  sendButton: {
    width: Metrics.WIDTH(421),
    height: Metrics.HEIGHT(73),
    marginLeft: Metrics.WIDTH(-190),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    marginBottom: 0,
  }
})
