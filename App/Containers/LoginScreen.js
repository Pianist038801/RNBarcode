import React, { Component } from 'react'
import { View, ImageBackground, Image, SafeAreaView, Text, ScrollView } from 'react-native'
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
    editable: boolean
  }

  isAttempting: boolean

  constructor (props: LoginScreenProps) {

    super(props)

    this.state = {
      passcode : '',
      loading: false,
      error: '',
      editable: true
  },

  this.isAttempting = false

}

  componentWillReceiveProps(nextProps) {
    this.forceUpdate();

    if(this.isAttempting && !nextProps.fetching){
      if(!nextProps.error){
        this.props.navigation.navigate('TeamScreen');
      }else{
        this.setState({ loading: false, passcode: '', editable: true}, () => {
          Toast.show({
            text: nextProps.error,
            position: 'bottom',
            buttonText: 'Okay',
            type: 'warning',
            duration: 5000
          })
        })
      }
    }
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

  renderForm() {
    const flag = Images[`flag_${this.props.lang}`];
    const dropOptions = ['ru', 'de', 'eng', 'esp', 'fr', 'he', 'it'].filter(x=>x!=this.props.lang);
    // const dropOptions = ['ru', 'de', 'eng']
    return (
      <ImageBackground resizeMode='stretch' source={Images.loginForm} style={styles.loginForm}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Metrics.HEIGHT(18) }}>
          <View style={{flex:1}}/>
          <Image resizeMode='stretch' style={{width: Metrics.screenWidth*30/460, height: Metrics.screenHeight * 20 / 970}} source={flag}/>
          <Text style={[Fonts.style.h6, {color: Colors.textSecondary, textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
            {this.props.lang.toUpperCase()}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{flex:1}}/>
          <ModalDropdown options={dropOptions} renderRow={this._renderDropRow}
            dropdownStyle={styles.dropDown} onDropdownWillHide={()=>{  return true;}}>
            <Image style={{width: Metrics.WIDTH(15), height: Metrics.HEIGHT(10), marginTop: Metrics.HEIGHT(10), marginRight: Metrics.WIDTH(15)}} resizeMode='stretch' source={Images.triangle}/>
          </ModalDropdown>
        </View>
      </ImageBackground>
    )
  }

  render () {
    return (
    <SafeAreaView style={styles.whiteContent}>
      <Container>
        <View style={{ height: Metrics.screenHeight * 143 / 964 }}>
          {this.renderHeader()}
        </View>
        <View style={{ height: Metrics.screenHeight * 405 / 964 }}>
          {this.renderForm()}
        </View>  
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (passcode) => dispatch(AuthActions.authRequest(passcode)),
    setLang: lang => dispatch(AuthActions.setLang(lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
