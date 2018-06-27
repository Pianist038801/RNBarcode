import React, { Component } from 'react'
import { View, ImageBackground, Image, SafeAreaView, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Container, Content, Form, Item, Input, Spinner, Toast } from 'native-base';
import AuthActions from '../Redux/AuthRedux'
import FullButton from '../Components/FullButton'
import ModalDropdown from 'react-native-modal-dropdown';
import Accordion from 'react-native-collapsible/Accordion';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

const SECTIONS = [
  {
    title: 'First',
    content: [
      'First111111',
      'First22222',]
  },
  {
    title: 'Second',
    content: [
      'Second111111',
      'Second22222',]
  }
];


type SendCodeProps = {
  dispatch: () => any,
  fetching: boolean,
  error: string
}

class SendCode extends Component {

  props: SendCodeProps

  state: {
    loading: boolean,
    error: string,
    number: string,
  }

  isAttempting: boolean

  constructor (props: SendCodeProps) {

    super(props)

    this.state = {
      passcode : '',
      loading: false,
      error: null,
      number: '',
      typing: false
  },

  this.isAttempting = false

}

 componentWillReceiveProps(nextProps) {
    console.log('SendCodeNextProps=', nextProps);
    if(this.props.fetching === true && nextProps.fetching === false && nextProps.error === null)
    {
      this.props.navigation.dispatch({
        type: 'ReplaceCurrentScreen',
        routeName: 'LoginScreen',
      });
      //this.props.navigation.navigate('LoginScreen');
    }
    if(this.props.fetching === true && nextProps.fetching === false && nextProps.error !== null)
    {
      console.log('ERROR_IN_FIRST');
      this.setState({typing: false})
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

  _renderSectionTitle(section) {
    return (
      null
    );
  }

  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={[styles.headerView, {backgroundColor: '#ffffff'}]}> 
        <Text style={[Fonts.style.description, { fontWeight: 'bold', fontFamily: Fonts.type.bold, margin: 10, marginBottom: Metrics.HEIGHT(30) }]}>
          shop-online loader 2.4
        </Text>  
        <Text style={[Fonts.style.h6, {textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.type.bigItalic, marginBottom:  Metrics.HEIGHT(35),marginHorizontal: 10 }]}>
          SUPER DEMO SHOP
        </Text>
        <Text style={[Fonts.style.description, {textAlign: 'center', color: 'blue',  fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          aaaaa aaaaa ssssd ffdddssssd ffddd ddddfssss dd ds s sddsdssdds afsdasdf asdf asdkfjalsd
        </Text>
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
    this.setState({number, typing: true})
  }

  renderSend(){
    return(
      <ImageBackground resizeMode='stretch' source={Images.button} style={styles.sendButton}>
        <TouchableOpacity onPress={this.onPressSend}>
          <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Text style={[Fonts.style.h6, { fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
              Отправить
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

  onPressSend = () => {
    this.props.verifyPhoneNumber(this.props.lang, this.state.number);
    console.log(this.props.lang, this.state.number)
  }

  renderForm = () => {
    const flag = Images[`flag_${this.props.lang}`];
    const dropOptions = ['ru', 'de', 'eng', 'esp', 'fr', 'he', 'it'].filter(x=>x!=this.props.lang);
    console.log(this.props)
    // const dropOptions = ['ru', 'de', 'eng']
    return (
      <ImageBackground resizeMode='stretch' source={Images.loginForm} style={styles.loginForm}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Metrics.HEIGHT(8) }}>
          <View style={{flex:1}}/>
          <TouchableOpacity onPress={()=>this.modal.show()}>
            <Image resizeMode='stretch' style={{width: Metrics.screenWidth*30/460, height: Metrics.screenHeight * 20 / 970}} source={flag}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.modal.show()}>
            <Text style={[Fonts.style.h6, {color: Colors.textSecondary, textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
              {this.props.lang.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{flex:1}}/>
          <ModalDropdown ref={c => this.modal = c} options={dropOptions} onSelect={this._onSelect} renderRow={this._renderDropRow}
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
          {this.props.error !== null && this.state.typing===false ? 'такого телефона нет в нашей базe' : ''}
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
        <Text style={[Fonts.style.description, { textAlign: 'right', fontFamily: Fonts.type.emphasis, marginHorizontal: 20 }]}>
          {this.props.error !== null && this.state.typing===false ? this.props.error : ''}
        </Text>
      </ImageBackground>
    )
  }

  renderOptions(){
    return(
      <ImageBackground resizeMode='stretch' source={Images.categoryBoard} style={styles.categoryBoard}>
        <Accordion
          touchableComponent={TouchableOpacity}
          sections={SECTIONS}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </ImageBackground>
    )
  }

  render () {
    return (
    <SafeAreaView style={styles.whiteContent}>
      <Container>
        <ScrollView scrollEnabled={false}>
          
            {this.renderHeader()}
 
            {this.renderOptions()}  
          {this.renderTimeBar()}  
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
    lang: state.auth.lang,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyPhoneNumber: (lang, number) => dispatch(AuthActions.verifyRequest(lang, number)),
    setLang: lang => dispatch(AuthActions.setLang(lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendCode)
