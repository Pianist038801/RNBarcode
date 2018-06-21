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

class LeftSideBar extends Component {

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
    console.log('LEFT_SIDE_BAR_NEW_PROPS')
 
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
            <TouchableOpacity onPress={()=>this.popupDialog.show()}>
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
                <Text style={[Fonts.style.h4, { color: 'black', fontFamily: Fonts.type.bigItalic }]}>
                    сохранить
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
              <TouchableOpacity onPress={()=>this.popupDialog.dismiss()}>
                <ImageBackground resizeMode='stretch' source={Images.confirm_button} style={styles.modal_button}>
                    <Text style={[Fonts.style.h6, { color: 'white', fontFamily: Fonts.type.bigItalic }]}>
                      добавить
                    </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.popupDialog.dismiss()}>
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
          {this.renderModal()}
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
    error:state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar)
