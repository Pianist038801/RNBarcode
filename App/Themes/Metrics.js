import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth,
  screenHeight,
  WIDTH:  x => x * screenWidth / 460,
  HEIGHT:  y => y * screenHeight / 970,
  FROM_WIDTH:  x => x * 460 / screenWidth,
  FROM_HEIGHT:  y => y * 970 / screenHeight,
  sideBarWidth: screenWidth * 36 / 46,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export default metrics
