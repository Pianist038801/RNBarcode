import React, { Component } from 'react'
import { View, ImageBackground, Image, SafeAreaView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Container, Content, Form, Item, Input, Spinner, Toast } from 'native-base';
import AuthActions from '../Redux/AuthRedux'
// import Icon from 'react-native-vector-icons/FontAwesome'; 
import FullButton from '../Components/FullButton'
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
    console.log('Render' + rowData.toString());
    let userUri='item.userUri';
    let socialType = 'facebook'
    let username='item.username';
    return( 
    <View style={{flexDirection:'column'}}>
      <View style={{padding: Metrics.defaultMargin, backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center'}}>
        {this.renderAvatar(userUri, socialType)}
        <Text style={{ ...Fonts.style.h5,   marginLeft: 10 , color: Colors.textPrimary }}>{'Timeline'}</Text>
        <View style ={{ position: 'absolute', right: Metrics.defaultMargin,  }}>

        </View>  
      </View> 
      {this.renderSpacer(1, Colors.colGray)}
    </View>)
  }
  renderForm() {
    return (
      <ImageBackground resizeMode='stretch' source={Images.flag} style={styles.loginForm}>
        {/* <Icon type='font-awesome' name='angle-down' size={25} color={Colors.txtPink}/> */}
        {/* <ModalDropdown options={['option 1', 'option 2']} renderRow={this._renderDropRow}
          dropdownStyle={styles.dropDown} onDropdownWillHide={()=>{  return true;}}>
          <View style={{padding: Metrics.defaultMargin, backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center', borderBottomColor: Colors.colGray,
          borderBottomWidth: 1,}}>
          <ScrollView horizontal style={{width: Metrics.screenWidth*2/3}} contentContainerStyle={{alignItems:'center'}}>
            {CommonWidgets.renderAvatarPlaceholder( )}
            <Text style={{ ...Fonts.style.h5,  marginLeft:10, color: Colors.textPrimary }}>Select Account</Text>
          </ScrollView>
          <View style ={{ position: 'absolute', right: Metrics.defaultMargin,  }}>
          <Icon type='font-awesome' name='angle-down' color={Colors.txtPink}/>
          </View>  
          </View>  
        </ModalDropdown> */}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (passcode) => dispatch(AuthActions.authRequest(passcode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
