import React, { Component } from 'react'
import { View, Modal, ImageBackground, Image, SafeAreaView, Text, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Container, Content, Form, CheckBox, Item, Input, Spinner, Toast, ListItem, Body } from 'native-base';
import AuthActions from '../Redux/AuthRedux'
import FullButton from '../Components/FullButton'
import ModalDropdown from 'react-native-modal-dropdown';
import PopupDialog,  { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
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

class RightSideBar extends Component {

  props: LoginScreenProps

  state: {
    passcode: number,
    loading: boolean,
    error: string,
    editable: boolean,
    number: string,
    code: string,
    modalVisible: boolean,
    modalCheck: boolean,
  }

  isAttempting: boolean

  constructor (props: LoginScreenProps) {

    super(props)
    console.log('uhaha');
    this.state = {
      modalCheck: false,
      passcode : '',
      loading: false,
      error: '',
      editable: true,
      number: props.phone_number,
      code: '',
      modalVisible: false,
      attributeName: '',
      attributeValue: '',
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
      this.setState({ loading: true, editable: false}, () => {
        this.isAttempting = true;
        this.props.attemptLogin(this.state.passcode);
      })
    }
  }

  renderHeader() {
    return (
      <View style={{width: Metrics.sideBarWidth,  borderWidth: 2, borderRadius: Metrics.WIDTH(30), padding: Metrics.WIDTH(5), borderColor: '#f77717', height: Metrics.HEIGHT(230)}}>
        <View style={{height: Metrics.HEIGHT(160), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <Image source={Images.background} style={{width: Metrics.WIDTH(81), height: Metrics.HEIGHT(141)}} resizeMode='stretch'>
            </Image>
            <Text style={{  fontSize: Fonts.size.h6, fontFamily: Fonts.type.base,   textAlign: 'center'}}>
                TEKCT
            </Text>
        </View>

        <View style={{height: 3, backgroundColor: 'grey'}}/>

        <View style={{height: Metrics.HEIGHT(60), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <Text style={{  fontSize: Fonts.size.h6, fontFamily: Fonts.type.base,   textAlign: 'center'}}>
                8851525251
            </Text>
            <Text style={{  fontSize: Fonts.size.h6, fontFamily: Fonts.type.base,   textAlign: 'center'}}>
                TEKCT
            </Text>
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
                <Text style={[Fonts.style.h4, { color: 'white', fontFamily: Fonts.type.bigItalic }]}>
                    сохранить
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    )
  }
  renderRemoveDiscount () {
    return (
      <TouchableOpacity>
          <ImageBackground resizeMode='stretch' source={Images.confirm_button} style={styles.confirm_button}>
              <Text style={[Fonts.style.normal, { textAlign: 'center', alignSelf: 'center', paddingTop: 30, width: Metrics.WIDTH(218), height: Metrics.HEIGHT(135), color: 'white', fontFamily: Fonts.type.bigItalic }]}>
              снять с карусели скидок
              </Text>
          </ImageBackground>
      </TouchableOpacity>
  )
  }
  renderModal() {
      return(
        <PopupDialog
          width={Metrics.sideBarWidth}
          dialogStyle={{borderRadius: Metrics.WIDTH(30)}}
          height={Metrics.HEIGHT(279)}
          containerStyle = {{width: Metrics.sideBarWidth, borderRadius: Metrics.WIDTH(30)}}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        >
          <View style={{flex:1, borderRadius: Metrics.WIDTH(30),borderWidth: 2, backgroundColor: 'white',  borderColor: '#f77717'}}>
            <ImageBackground resizeMode='stretch' source={Images.button} style={styles.modalInput}>
              <Input
                maxLength={12}
                placeholder={'наименование атрибута: '}
                style={{marginLeft: 30}}
                textAlign={'left'}
                value={this.state.attributeName}
                onChangeText={attributeName=>this.setState({attributeName})}
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
            <ImageBackground resizeMode='stretch' source={Images.button} style={styles.modalInput}>
              <Input
                maxLength={12}
                placeholder={'значение атрибута:  '}
                style={{marginLeft: 30}}
                textAlign={'left'}
                value={this.state.attributeValue}
                onChangeText={attributeValue=>this.setState({attributeValue})}
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
            <View style={{flexDirection: 'row', marginTop: Metrics.HEIGHT(20), alignItems: 'center', justifyContent: 'center'}}>
              <CheckBox checked={this.state.modalCheck} color='#f77717' onPress={()=>this.setState({modalCheck: !this.state.modalCheck})}/>
              <Text style={{ marginLeft: Metrics.WIDTH(20), fontSize: Fonts.size.h6, color: '#244063', fontFamily: Fonts.type.base}}>
                атрибут для сравнения
              </Text> 
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
              <TouchableOpacity>
                <ImageBackground resizeMode='stretch' source={Images.confirm_button} style={styles.modal_button}>
                    <Text style={[Fonts.style.h6, { color: 'white', fontFamily: Fonts.type.bigItalic }]}>
                      добавить
                    </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity>
                <ImageBackground resizeMode='stretch' source={Images.confirm_button} style={styles.modal_button}>
                    <Text style={[Fonts.style.h6, { color: 'white', fontFamily: Fonts.type.bigItalic }]}>
                      закрыть
                    </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </PopupDialog>
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
          {this.renderInput()}
          {this.renderInput()}
          <Image style={{width: Metrics.WIDTH(319), height: Metrics.HEIGHT(94)}} source={Images.icons} resizeMode='stretch'/>
          {this.renderConfirmButton()}
          {this.renderRemoveDiscount()}
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

export default connect(mapStateToProps, mapDispatchToProps)(RightSideBar)
