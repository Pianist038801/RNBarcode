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
    console.log('RIGHT_SIDE_BAR_NEW_PROPS')
   
  }

  componentDidMount() { 
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
 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightSideBar)
