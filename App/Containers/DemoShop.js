import React, { Component } from 'react'
import { View, ImageBackground, Image, SafeAreaView, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Container, Content, Form, Item, Input, Spinner, Toast } from 'native-base';
import AuthActions from '../Redux/AuthRedux'
import FullButton from '../Components/FullButton'
import ModalDropdown from 'react-native-modal-dropdown';
import Accordion from 'react-native-collapsible/Accordion';
import CheckBox from 'react-native-checkbox';
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
  },
  {
    title: 'Second',
    content: [
      'Second111111',
      'Second22222',]
  },
  {
    title: 'Second',
    content: [
      'Second111111',
      'Second22222',]
  },
  {
    title: 'Second',
    content: [
      'Second111111',
      'Second22222',]
  },
  {
    title: 'Second',
    content: [
      'Second111111',
      'Second22222',
    3,
  4,
5,
6,
7,
7,
8,
8,
4]
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
      typing: false,
      check: {},
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

  _renderHeader= (content, index, isActive, sections) => {
    var _newCheck = {...this.state.check};
    _newCheck[`${index}_`] = !_newCheck[`${index}_`]

    return ( 
      <View style={{borderBottomWidth: 1, borderColor: '#f77817', flexDirection: 'row', alignItems: 'center', height: Metrics.HEIGHT(40)}}>
        {this.state.check[`${index}_`] ?
        <TouchableOpacity style={styles.checkBox} onPress={()=>this.setState({check: _newCheck})}>
          <Image resizeMode='stretch' source={Images.checkBox} style={styles.checkBox}/>
        </TouchableOpacity>
          :
        <TouchableOpacity style={styles.greenCheck} onPress={()=>this.setState({check: _newCheck})}>
          <Image resizeMode='stretch' source={Images.greenCheck} style={styles.greenCheck}/>
        </TouchableOpacity>
        }
        <Text style={{color: '#244063', marginLeft: Metrics.WIDTH(20), fontFamily: Fonts.type.emphasis, fontSize: 16}}>соки натуральные</Text>
        <View style={{flex: 1}}/>
        {isActive
        ?
        <Image resizeMode='stretch' source={Images.greenLeft} style={styles.greenLeft}/>
        :
        <Image resizeMode='stretch' source={Images.greenDown} style={styles.greenDown}/>
        }
      </View>
    );
  }

  _renderContent = (section, index) => {
    const _contents = [];
    for(let i = 0; i<section.content.length; i++)
    {
      let _newCheck = {...this.state.check};
      _newCheck[`${index}_${i}`] = !_newCheck[`${index}_${i}`]
      _contents.push(
        <View style={{borderBottomWidth: 1, paddingLeft: Metrics.WIDTH(17), borderColor: '#f77817', flexDirection: 'row', alignItems: 'center', height: Metrics.HEIGHT(40)}}>
          {this.state.check[`${index}_${i}`] ?
          <TouchableOpacity style={styles.checkBox} onPress={()=>this.setState({check: _newCheck})}>
            <Image resizeMode='stretch' source={Images.checkBox} style={styles.checkBox}/>
          </TouchableOpacity>
            :
          <TouchableOpacity style={styles.greenCheck} onPress={()=>this.setState({check: _newCheck})}>
            <Image resizeMode='stretch' source={Images.greenCheck} style={styles.greenCheck}/>
          </TouchableOpacity>
          }
          <Text style={{color: '#244063', marginLeft: Metrics.WIDTH(20), fontFamily: Fonts.type.emphasis, fontSize: 16}}>соки натуральные</Text>
  
        </View>
      )
    }
    return (
      <View style={{flexDirection: 'column'}}>
      {
        _contents
      }
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
 
  onChangeNumber = number => {
    this.setState({number, typing: true})
  }

  goBack = () => {
    this.props.navigation.dispatch({
      type: 'ReplaceCurrentScreen',
      routeName: 'ProductsUploader',
    }); 
  }

  renderTimeBar(){
    return(
      <ImageBackground resizeMode='stretch' source={Images.bottomBar} style={[styles.fixedBottomBar]}>
        <View style={{position: 'absolute', top:Metrics.HEIGHT(50), width: Metrics.screenWidth, paddingHorizontal: Metrics.marginHorizontal*2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity onPress={this.goBack}>
            <View style={styles.plus_btn_wrapper}>
              <ImageBackground resizeMode='stretch' source={Images.leftArrow} style={styles.leftArrow}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goBack}>
            <View style={styles.plus_btn_wrapper}>
              <ImageBackground resizeMode='stretch' source={Images.cancel} style={styles.cancel}/>
            </View>
          </TouchableOpacity>
        </View>
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

  renderOptions(){
    return(
      <ImageBackground resizeMode='stretch' source={Images.categoryBoard} style={styles.categoryBoard}>
        <ScrollView style={{height: Metrics.HEIGHT(436)}}>
          <Accordion
            touchableComponent={TouchableOpacity}
            sections={SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </ScrollView>
      </ImageBackground>
    )
  }

  renderBottomBar() {  
    return (
      <View style={{backgroundColor: '#e6e7e8', alignItems: 'center', justifyContent: 'center', marginHorizontal: Metrics.marginHorizontal, height: Metrics.HEIGHT(130), borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
        <ImageBackground resizeMode='stretch' source={Images.big_shop_ellipse} style={styles.bottomProductBar}>
          <TouchableOpacity>
            <View style={styles.plus_btn_wrapper}>
              <ImageBackground resizeMode='stretch' source={Images.plus} style={styles.back_btn}>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{color: '#244063', width: Metrics.WIDTH(73), marginLeft: 10,  lineHeight: 17, fontSize: 16}}>
            добавить еще товар
          </Text>
          <View style={styles.bottomProductUploadRightBtn}>
            <Text style={[Fonts.style.h6, { width: Metrics.WIDTH(200), color: 'white', fontWeight: 'bold',lineHeight: 20, fontFamily: Fonts.type.emphasis }]}>
            добавьте товар {'\n'} в магазин
            </Text>
            <TouchableOpacity onPress={this.goFurther}>
              <ImageBackground resizeMode='stretch' source={Images.whiteArrow} style={styles.back_btn}/>  
            </TouchableOpacity>
          </View>
        </ImageBackground> 
      </View>
    )
  }

  render () {
    return (
    //<SafeAreaView style={styles.whiteContent}>
        <ScrollView scrollEnabled={false} style={{height: Metrics.screenHeight, backgroundColor: 'white', flex: 1}}>
          
            {this.renderHeader()}
 
            {this.renderOptions()}  
            {this.renderBottomBar()}
            {this.renderTimeBar()}  
        </ScrollView>
    //</SafeAreaView>
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
