import React, { Component } from 'react'
import { View, ImageBackground, Image, SafeAreaView, Text, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Container, Content, Form, Item, Input, Spinner, Toast } from 'native-base';
import AuthActions from '../Redux/AuthRedux'
import FullButton from '../Components/FullButton'
import ModalDropdown from 'react-native-modal-dropdown';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void,
  passcode: number,
  error: string
}

class LoginScreen extends Component {

  props: LoginScreenProps

  state: {
    passcode: number,
    loading: boolean,
    error: string,
    editable: boolean,
    number: string,
    code: string,
  }

  isAttempting: boolean

  constructor (props: LoginScreenProps) {

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
      <View style={{width: Metrics.sideBarWidth,  borderWidth: 2, borderRadius: Metrics.WIDTH(30), borderColor: '#f77717', height: Metrics.HEIGHT(625)}}>
        <View style={{height: Metrics.HEIGHT(50),backgroundColor: '#e6e7e8', borderTopLeftRadius: Metrics.WIDTH(28),    borderTopEndRadius: Metrics.WIDTH(28), alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{  fontSize: Fonts.size.h6, fontFamily: Fonts.type.base,   textAlign: 'center'}}>
                223525235235
            </Text>
        </View>
        <View style={{height: Metrics.HEIGHT(73),alignItems: 'center', justifyContent: 'center',backgroundColor: '#ecc200'}}>
            <Text style={{ fontSize: Fonts.size.h2, color: 'white', fontFamily: Fonts.type.bigItalic,   textAlign: 'center'}}>
                KOT
            </Text>
        </View>
        <View style={{height: Metrics.HEIGHT(225),alignItems: 'center', justifyContent: 'center',backgroundColor: '#ffffff'}}>
            <Image resizeMode='stretch' style={{marginRight: Metrics.WIDTH(20), width: Metrics.WIDTH(235), height: Metrics.HEIGHT(194)}} source={Images.pixel_cat}/>
        </View>
        <View style={{height: Metrics.HEIGHT(50),alignItems: 'center', justifyContent: 'center',backgroundColor: '#ffffff'}}>
            <Text style={{ fontSize: Fonts.size.h2, color: '#244063', fontFamily: Fonts.type.bigItalic,   textAlign: 'center'}}>
                200 {' '}
                <Text style={{  fontSize: Fonts.size.h6, color: '#244063', fontFamily: Fonts.type.base,   textAlign: 'center'}}>
                    BAT
                </Text>
            </Text>
        </View>

        <View style={{flexDirection: 'row',  marginTop: Metrics.HEIGHT(100), alignItems: 'center', justifyContent: 'center'}}>
            <Image resizeMode='stretch' style={{marginRight: Metrics.WIDTH(20), width: Metrics.WIDTH(20), height: Metrics.HEIGHT(17)}} source={Images.left_arrow}/>
            <Text style={{  fontSize: Fonts.size.h6, color: '#244063', fontFamily: Fonts.type.base,   textAlign: 'center'}}>память 1/8</Text>
            <Image resizeMode='stretch' style={{marginLeft: Metrics.WIDTH(20), width: Metrics.WIDTH(20), height: Metrics.HEIGHT(17)}} source={Images.right_arrow}/>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image resizeMode='stretch' style={{marginRight: Metrics.WIDTH(20), width: Metrics.WIDTH(20), height: Metrics.HEIGHT(17)}} source={Images.left_arrow}/>
            <Text style={{  fontSize: Fonts.size.h6, color: '#244063', fontFamily: Fonts.type.base,   textAlign: 'center'}}>память 1/8</Text>
            <Image resizeMode='stretch' style={{marginLeft: Metrics.WIDTH(20), width: Metrics.WIDTH(20), height: Metrics.HEIGHT(17)}} source={Images.right_arrow}/>
        </View>
        
        <ImageBackground resizeMode='stretch' style={{marginTop: Metrics.HEIGHT(10),alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: Metrics.WIDTH(299), height: Metrics.HEIGHT(11)}} source={Images.grey_line}>
            <TouchableOpacity>
                <ImageBackground resizeMode='stretch' style={{alignItems: 'center', justifyContent: 'center', width: Metrics.WIDTH(136), height: Metrics.HEIGHT(101)}} source={Images.green_button}>
                <Text style={{  fontSize: Fonts.size.h6, color: '#244063', fontFamily: Fonts.type.base,   textAlign: 'center'}}>+</Text>
                </ImageBackground>
            </TouchableOpacity>
        </ImageBackground>
        
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

  renderSend(){
    return(
      <ImageBackground resizeMode='stretch' source={Images.button} style={styles.sendButton}>
        <TouchableOpacity onPress={this.onLogin}>
          <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Text style={[Fonts.style.h6, { fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
              войти
            </Text>
            <Image resizeMode='stretch' style={{marginRight: Metrics.WIDTH(20), width: Metrics.WIDTH(23), height: Metrics.HEIGHT(18)}} source={Images.check}/>
          </View>
        </TouchableOpacity>
      </ImageBackground>
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
  renderInput() {
    return (
    <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_input}>
        <Text style={[Fonts.style.h4, { fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
            цена: 
        </Text>
        <Text>
          TEKCT TEKCT TEKCT
        </Text>
    </ImageBackground>
    )
  }

  renderForm() {
    const flag = Images[`flag_${this.props.lang}`];
    const dropOptions = ['ru', 'de', 'eng', 'esp', 'fr', 'he', 'it'].filter(x=>x!=this.props.lang);
    // const dropOptions = ['ru', 'de', 'eng']
    return (
      <ImageBackground resizeMode='stretch' source={Images.loginForm} style={styles.loginForm}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Metrics.HEIGHT(8) }}>
          <View style={{flex:1}}/>
          <Image resizeMode='stretch' style={{width: Metrics.screenWidth*30/460, height: Metrics.screenHeight * 20 / 970}} source={flag}/>
          <Text style={[Fonts.style.h6, {color: Colors.textSecondary, textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
            {this.props.lang.toUpperCase()}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{flex:1}}/>
          <ModalDropdown options={dropOptions} onSelect={this._onSelect} renderRow={this._renderDropRow}
            dropdownStyle={styles.dropDown} onDropdownWillHide={()=>{  return true;}}>
            <Image style={{width: Metrics.WIDTH(15), height: Metrics.HEIGHT(10), marginTop: Metrics.HEIGHT(10), marginRight: Metrics.WIDTH(15)}} resizeMode='stretch' source={Images.triangle}/>
          </ModalDropdown>
        </View>
        <Text style={[Fonts.style.h3, { textAlign: 'right', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 20 }]}>
          ваш номер
        </Text>
        <Text style={[Fonts.style.h3, {marginTop: -10, textAlign: 'right', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 20 }]}>
          телефона
        </Text> 
        <View style={{height: Metrics.HEIGHT(20)}}/>
        <Text style={[Fonts.style.description, { textAlign: 'right', fontFamily: Fonts.type.emphasis, marginHorizontal: 20 }]}>
          {''}
        </Text>
        <ImageBackground resizeMode='stretch' source={Images.button} style={styles.numberButton}>
          <Input
            maxLength={12}
            placeholder={'Enter Phone Number'}
            style={{marginLeft: 30}}
            textAlign={'left'}
            value={this.state.number}
            onChangeText={this.onChangeNumber}
            fontSize={Fonts.size.regular}
            fontFamily={Fonts.type.emphasis}
            placeholderTextColor='gray'                     
            returnKeyType='done'                
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            onSubmitEditing={() => {}}
          />
        </ImageBackground>
        <ImageBackground resizeMode='stretch' source={Images.button} style={styles.codeButton}>
          <Input
            maxLength={12}
            placeholder={'Enter Code'}
            style={{marginLeft: 30}}
            textAlign={'left'}
            value={this.state.code}
            onChangeText={this.onChangeCode}
            fontSize={Fonts.size.regular}
            fontFamily={Fonts.type.emphasis}
            placeholderTextColor='gray'                     
            returnKeyType='done'                
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            onSubmitEditing={() => {}}
          />
        </ImageBackground> 
      </ImageBackground>
    )
  }
  renderConfirmButton () {
    return (
        <TouchableOpacity>
            <ImageBackground resizeMode='stretch' source={Images.confirm_button} style={styles.confirm_button}>
                <Text style={[Fonts.style.h4, { color: 'black', fontFamily: Fonts.type.bigItalic }]}>
                    сохранить
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    )
  }
  render () {
    return (
    <SafeAreaView style={styles.leftSideView}>
      <Container>
        <ScrollView scrollEnabled={false}>
          {this.renderHeader()}
          {this.renderInput()}
          {this.renderInput()}
          {this.renderConfirmButton()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
