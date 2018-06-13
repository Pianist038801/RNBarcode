import COLOR from './Colors';

const type = {
  base: 'FuturePTBook',
  bold: 'FuturaPTBold',
  emphasis: 'FuturaPTBookOblique'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
    color: COLOR.text
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
    color: COLOR.text
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
    color: COLOR.text
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
    color: COLOR.text
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
    color: COLOR.text
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6,
    color: COLOR.text
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
    color: COLOR.text
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
    color: COLOR.text
  }
}

export default {
  type,
  size,
  style
}
