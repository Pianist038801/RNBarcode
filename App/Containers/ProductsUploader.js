import React, { Component } from 'react'
import { View, ImageBackground, Image, SafeAreaView, Text, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Container, Content, Form, Item, Input, Spinner, Toast } from 'native-base';
import AuthActions from '../Redux/AuthRedux'
import FullButton from '../Components/FullButton'
import ModalDropdown from 'react-native-modal-dropdown';
import Camera from 'react-native-camera'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

type ProductsUploaderProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void,
  passcode: number,
  error: string
}

class ProductsUploader extends Component {

  props: ProductsUploaderProps

  state: {
    passcode: number,
    loading: boolean,
    error: string,
    editable: boolean,
    number: string,
    code: string,
  }

  isAttempting: boolean

  constructor (props: ProductsUploaderProps) {

    super(props)
    console.log('uhaha');
    this.state = {
      passcode : '',
      loading: false,
      error: '',
      editable: true,
      number: props.phone_number,
      code: '',
  },

  this.isAttempting = false

  }

  componentWillReceiveProps(nextProps) {
    console.log('PRODUCTS_UPLOADER_NEW_PROPS')
    if(this.props.fetching === true && nextProps.fetching === false && nextProps.error === null)
    {
      this.props.navigation.dispatch({
        type: 'ReplaceCurrentScreen',
        routeName: 'Main',
      }); 
    }
    if(this.props.fetching === true && nextProps.fetching === false && nextProps.error !== null)
    {
      this.props.navigation.dispatch({
        type: 'ReplaceCurrentScreen',
        routeName: 'AuthFail',
      }); 
    }
  }

  componentDidMount() {
    setInterval( () => {
      const _hour = new Date().getHours();
      const _minute = new Date().getMinutes();
      const _second = new Date().getSeconds();
      function f(value){return value<10?('0'+value):value}
      const curTime=f(_hour) + ':' + f(_minute) + ':' + f(_second)
      this.setState({
        curTime
      })
    },1000)
  }

  handleChangePasscode = value => this.setState({ passcode: value });

  handleLogin = () => {

    if(this.state.passcode.length < 4 || this.state.passcode === ''){
      Toast.show({
        text: 'Enter valid passcode',
        position: 'bottom',
        buttonText: 'Okay',
        type: 'danger',
        duration: 5000
      });
    }else{
      this.setState({ loading: true , editable: false}, () => {
        this.isAttempting = true;
        this.props.attemptLogin(this.state.passcode);
      })
    }
  }

  renderHeader() {
    return (
      <View style={styles.headerView}>
        <Text style={[Fonts.style.description, { fontWeight: 'bold', fontFamily: Fonts.type.emphasis, margin: 10, marginBottom: 6 }]}>
          shop-online loader 2.4
        </Text>
        <Text style={[Fonts.style.description, { fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          WWW.BARCODE2STORE.com
        </Text>
        <View style={{flex:1}}/>
        <View>
          <Text style={[Fonts.style.h6, {textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
            BARCODE - ONLINE
          </Text>
          <Text style={[Fonts.style.description, {textAlign: 'center', fontFamily: Fonts.type.emphasis, marginHorizontal: 10, marginBottom: 3 }]}>
            загрузка товаров в магазин
          </Text>
          <View style={{height:1, backgroundColor: '#e9eef5'}}/>
        </View>
      </View>
    )
  }

  _renderDropRow= (rowData, sectionID, rowID, highlightRow)=>
  {
    const flag = Images[`flag_${rowData}`];
    return( 
    <View style={{flexDirection:'column'}}>
      <View style={{padding: Metrics.defaultMargin, backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center'}}>
        <Image resizeMode='stretch' style={{marginLeft: Metrics.WIDTH(10), width: Metrics.WIDTH(30), height: Metrics.HEIGHT(20)}} source={flag}/>
        <Text style={[Fonts.style.h6, {color: Colors.textSecondary, textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          {rowData.toUpperCase()}
        </Text>
      </View>
      <View style={{height:1, backgroundColor: '#e9eef5'}}/>
    </View>)
  }

  onChangeNumber = number => {
    this.setState({number})
  }

  onChangeCode = code => {
    this.setState({code})
  }

  onLogin = () => {
    this.props.logIn(this.props.lang, this.state.number, this.state.code);
  }

  renderCameraButtons(){
    return(
      <View style={styles.cameraButtons}>
        <TouchableOpacity onPress={()=>alert('Barcode')}>
          <ImageBackground resizeMode='stretch' source={Images.big_shop_ellipse} style={styles.barcodeButtonView}>
            <ImageBackground resizeMode='stretch' source={Images.barcode_icon} style={styles.barcodeButton}>
            </ImageBackground>
          </ImageBackground>
        </TouchableOpacity>
        <ImageBackground resizeMode='stretch' source={Images.big_shop_ellipse} style={styles.cameraButtonView}>
          <Image style={styles.latestImage} source={Images.placeholder}/>
          <Image style={styles.latestImage} source={Images.placeholder}/>
          <TouchableOpacity onPress={()=>alert('PHOTO')}>
            <ImageBackground resizeMode='stretch' source={Images.big_shop_ellipse} style={styles.cameraBtnWrapper}>
              <ImageBackground resizeMode='stretch' source={Images.photo_icon} style={styles.barcodeButton}>
              </ImageBackground>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }

  _onSelect=(id, data)=>{
    console.log('Data=', data);
    this.props.setLang(data);
  }
  renderTimeBar(){
    return(
      <ImageBackground resizeMode='stretch' source={Images.bottomBar} style={styles.bottomBar}>
         <View style={{height: Metrics.HEIGHT(70)}}/>
         
          <Text style={[Fonts.style.description, {textAlign: 'center', fontFamily: Fonts.type.emphasis, marginHorizontal: 10, marginBottom: 3 }]}>
            время
          </Text>
          <Text style={[Fonts.style.h6, {textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
            {this.state.curTime}
          </Text>
      </ImageBackground>
    )
  }

  renderCamera() {
    
    return (
      <Camera
      style={{ flex:1 }}
      ref={(cam) => {
        this.camera = cam;
      }}
      aspect={Camera.constants.Aspect.fill}
    />
    )
  }
  goBack = () => {
    this.props.navigation.dispatch({
      type: 'ReplaceCurrentScreen',
      routeName: 'Main',
    }); 
  }
  goFurther = () => {
    alert('Next Screen');
  }
  renderSideButtons() {
    return (
      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LeftSideMenu')}>
          <ImageBackground resizeMode='stretch' source={Images.ear_left} style={styles.ear_left}>
            <ImageBackground resizeMode='stretch' source={Images.cog_black} style={styles.cog_icon}>
            </ImageBackground>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('RightSideMenu')}>
          <ImageBackground resizeMode='stretch' source={Images.ear_right} style={styles.ear_left}>
            <ImageBackground resizeMode='stretch' source={Images.cog_green} style={styles.cog_icon}>
            </ImageBackground>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }

  renderBottomBar() {  
    return ( 
        <ImageBackground resizeMode='stretch' source={Images.big_shop_ellipse} style={styles.bottomProductBar}>
          <TouchableOpacity onPress={this.goBack}>
            <View style={styles.back_btn_wrapper}>
              <ImageBackground resizeMode='stretch' source={Images.back_arrow} style={styles.back_btn}>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <ImageBackground resizeMode='stretch' source={Images.big_shop_ellipse} style={styles.bottomProductRightBtn}>
            <Text style={[Fonts.style.h6, { width: Metrics.WIDTH(200), fontWeight: 'bold', fontFamily: Fonts.type.emphasis }]}>
            добавьте товар {'\n'} в магазин
            </Text>
            <TouchableOpacity onPress={this.goFurther}>
              <ImageBackground resizeMode='stretch' source={Images.arrow_sjop} style={styles.back_btn}/>  
            </TouchableOpacity>
          </ImageBackground>
        </ImageBackground> 
    )
  }
  renderProductNames() {
    return (
      <View style={{ height: Metrics.HEIGHT(140), marginTop: Metrics.HEIGHT(-35), marginBottom: Metrics.HEIGHT(10)}}>
        <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_name}>
          <Text style={[Fonts.style.description, { fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          название товара: 
          </Text>
          <Text>
          TEKCT TEKCT TEKCT
          </Text>
        </ImageBackground>
        <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_name}>
          <Text style={[Fonts.style.description, { fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          название товара: 
          </Text>
          <Text>
          TEKCT TEKCT TEKCT
          </Text>
        </ImageBackground>
        <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_name}>
          <Text style={[Fonts.style.description, { fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          название товара: 
          </Text>
          <Text>
          TEKCT TEKCT TEKCT
          </Text>
        </ImageBackground>
      </View>
    )
  }

  render () {
    return (
    <SafeAreaView style={styles.whiteContent}>
      <Container>
        <ScrollView style={{height: Metrics.screenHeight}} scrollEnabled={false}>
          <View style={{ height: Metrics.screenHeight * 143 / 964 }}>
            {this.renderHeader()}
          </View>
          <View style={styles.cameraView}>
            {this.renderCamera()}
          </View>
          {this.renderCameraButtons()}
          {this.renderSideButtons()}
          {this.renderProductNames()}
          {this.renderBottomBar()}
        </ScrollView>
      </Container>
    </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching:state.auth.fetching,
    error:state.auth.error,
    passcode:state.auth.passcode,
    lang: state.auth.lang,
    phone_number: state.auth.phone_number,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (lang, phone_number, code) => dispatch(AuthActions.loginRequest(lang, phone_number, code)),
    setLang: lang => dispatch(AuthActions.setLang(lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsUploader)
