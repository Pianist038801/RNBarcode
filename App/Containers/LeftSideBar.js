import React, { Component } from 'react'
import { View, Modal, ImageBackground, Image, SafeAreaView, Text, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Container, Content, Form, CheckBox, Item, Input, Spinner, Toast, ListItem, Body } from 'native-base';
import AuthActions from '../Redux/AuthRedux'
import FullButton from '../Components/FullButton'
import ModalDropdown from 'react-native-modal-dropdown';
import PopupDialog,  { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { requestUrl } from '../Config/RequestUrl';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void,
  passcode: number,
  error: string,
  
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
    properties: array
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
      properties: [],
      price: '',
      discount: '',
  },

  this.isAttempting = false

  }

  componentWillReceiveProps(nextProps) {
    console.log('LEFT_SIDE_BAR_NEW_PROPS')
    if(nextProps.good_info!=null && nextProps.good_info.properties != null && nextProps.good_info !== this.props.good_info)
    {
      this.setState({properties: nextProps.good_info.properties,
        price: nextProps.good_info.price_usual,
        priceType: nextProps.good_info.price_mode,
      });
    }
  }
  
  renderHeader() {
    let properties = []
    properties = this.state.properties.map((property, id) =>
      property.chek == '1' ?
      <TouchableOpacity onPress={()=>this.showPropertyModal(false, id)} style={{flexDirection: 'row',  marginTop: Metrics.HEIGHT(10), alignItems: 'center', justifyContent: 'center'}}>
        <Image resizeMode='stretch' style={{marginRight: Metrics.WIDTH(20), width: Metrics.WIDTH(20), height: Metrics.HEIGHT(17)}} source={Images.left_arrow}/>
        <Text style={{  fontSize: Fonts.size.h6, color: '#244063', fontFamily: Fonts.type.base,   textAlign: 'center'}}>{property.name} {property.value}</Text>
        <Image resizeMode='stretch' style={{marginLeft: Metrics.WIDTH(20), width: Metrics.WIDTH(20), height: Metrics.HEIGHT(17)}} source={Images.right_arrow}/>
      </TouchableOpacity> :
      <TouchableOpacity onPress={()=>this.showPropertyModal(false, id)} style={{flexDirection: 'row',  marginTop: Metrics.HEIGHT(10), alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{  fontSize: Fonts.size.h6, color: '#244063', fontFamily: Fonts.type.base,   textAlign: 'center'}}>{property.name} {property.value}</Text>
      </TouchableOpacity>
      )
    console.log('PROPERTIES=, p', properties);
    return (
      <View style={{width: Metrics.sideBarWidth,  borderWidth: 2, borderRadius: Metrics.WIDTH(30), borderColor: '#f77717', height: Metrics.HEIGHT(625)}}>
        <View style={{height: Metrics.HEIGHT(50),backgroundColor: '#e6e7e8', borderTopLeftRadius: Metrics.WIDTH(28),    borderTopEndRadius: Metrics.WIDTH(28), alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{  fontSize: Fonts.size.h6, fontFamily: Fonts.type.base,   textAlign: 'center'}}>
                {this.props.good_info==null ? '' : this.props.good_info.barcode}
            </Text>
        </View>
        <View style={{height: Metrics.HEIGHT(73),alignItems: 'center', justifyContent: 'center',backgroundColor: '#ecc200'}}>
            <Text style={{ fontSize: Fonts.size.h4, color: 'white', fontFamily: Fonts.type.bigItalic,   textAlign: 'center'}}>
                {this.props.good_info==null ? '' : this.props.good_info.name}
            </Text>
        </View>
        <View style={{height: Metrics.HEIGHT(225),alignItems: 'center', justifyContent: 'center',backgroundColor: '#ffffff'}}>
            <Image resizeMode='stretch' style={{marginRight: Metrics.WIDTH(20), width: Metrics.WIDTH(235), height: Metrics.HEIGHT(194)}} source={this.props.good_info==null ? Images.pixel_cat : {uri: requestUrl.url + this.props.good_info.images[0]}}/>
        </View>
        <View style={{height: Metrics.HEIGHT(50),alignItems: 'center', justifyContent: 'center',backgroundColor: '#ffffff'}}>
            <Text style={{ fontSize: Fonts.size.h2, color: '#244063', fontFamily: Fonts.type.bigItalic,   textAlign: 'center'}}>
              {this.props.good_info==null ? '' : this.props.good_info.price_usual} {' '}
                <Text style={{  fontSize: Fonts.size.h6, color: '#244063', fontFamily: Fonts.type.base,   textAlign: 'center'}}>
                    BAT
                </Text>
            </Text>
        </View>
        
        {properties}
        
        <ImageBackground resizeMode='stretch' style={{marginTop: Metrics.HEIGHT(40),alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: Metrics.WIDTH(299), height: Metrics.HEIGHT(11)}} source={Images.grey_line}>
            <TouchableOpacity onPress={()=>this.showPropertyModal(true)}>
                <ImageBackground resizeMode='stretch' style={{alignItems: 'center', justifyContent: 'center', width: Metrics.WIDTH(136), height: Metrics.HEIGHT(101)}} source={Images.green_button}>
                <Text style={{  fontSize: Fonts.size.h6, color: '#244063', fontFamily: Fonts.type.base,   textAlign: 'center'}}>+</Text>
                </ImageBackground>
            </TouchableOpacity>
        </ImageBackground>
        
      </View>
    )
  }
  
  showPropertyModal = (if_add,id) => {
    console.log('Show_Property_Modal');
    if(if_add)
    {
      console.log({if_add_prop: if_add, attributeName: '', attributeValue: ''})
      this.setState({if_add_prop: if_add, attributeName: '', attributeValue: ''}, ()=>this.popupDialog.show())
    }
    else
    {
      console.log({if_add_prop: if_add, propertyIndex: id, attributeName: this.state.properties[id].name, attributeValue: this.state.properties[id].value})
      this.setState({if_add_prop: if_add, propertyIndex: id, attributeName: this.state.properties[id].name, attributeValue: this.state.properties[id].value}, () => this.popupDialog.show())
    }
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

  renderPriceInput() {
    return (
    <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_input}>
        <Text style={[Fonts.style.h4, { fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
            price: 
        </Text>
        <Input
                maxLength={20}
                placeholder={'price'}
                style={{marginLeft: 30}}
                textAlign={'left'}
                value={this.state.price}
                onChangeText={price=>this.setState({price})}
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
    )
  }
  
  renderDiscountInput() {
    return (
    <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_input}>
        <Text style={[Fonts.style.h4, { fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
            discount: 
        </Text>
        <Input
                maxLength={20}
                placeholder={'discount'}
                style={{marginLeft: 30}}
                textAlign={'left'}
                value={this.state.discount}
                onChangeText={discount=>this.setState({discount})}
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
    )
  }
  onSelectType=(id, data)=>{
    console.log('Data=', data);
    this.setState({priceType: data.value, priceTitle: data.title})
  }

  renderTypeRow= (rowData, sectionID, rowID, highlightRow)=>
  {
    
    return(  
      <View style={{padding: Metrics.defaultMargin, backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[Fonts.style.h6, {color: Colors.textSecondary, textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          {rowData.title}
        </Text>
      </View>  )
  }

  renderTypeSelect() {
    return (
      <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_input}>
          <Text style={[Fonts.style.h4, { fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
              type:
          </Text>
          <ModalDropdown ref={c => this.typeModal = c} options={[{value: '1', title: 'цена за единицу'}, {value: '1kg', title: 'цена за килограмм'}, {value: '100g', title: 'цена за 100 грамм'}]} onSelect={this.onSelectType} renderRow={this.renderTypeRow}
            onDropdownWillHide={()=>{  return true;}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: Fonts.size.regular, fontFamily: Fonts.type.emphasis}}>{this.state.priceTitle}</Text>
              <Image style={{width: Metrics.WIDTH(15), height: Metrics.HEIGHT(10), marginTop: Metrics.HEIGHT(10), marginRight: Metrics.WIDTH(15)}} resizeMode='stretch' source={Images.triangle}/>
            </View>
          </ModalDropdown>
      </ImageBackground>
      )
  }
  
  saveLeftbar = () => {
    this.props.saveLeftInfo(this.state.price, this.state.priceType, this.state.properties);
    this.props.navigation.navigate('LeftSideMenuClose')
  }

  renderConfirmButton () {
    return (
        <TouchableOpacity onPress={this.saveLeftbar}>
            <ImageBackground resizeMode='stretch' source={Images.confirm_button} style={styles.confirm_button}>
                <Text style={[Fonts.style.h4, { color: 'black', fontFamily: Fonts.type.bigItalic }]}>
                    сохранить
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    )
  }

  addProperty = () => {
    let properties = [...this.state.properties.slice(0)];
    if(this.state.if_add_prop)
      properties.push({
          name: this.state.attributeName,
          value: this.state.attributeValue,
          chek: this.state.modalCheck ? "1" : "0"
      })
    else
      properties[this.state.propertyIndex] = {
        name: this.state.attributeName,
        value: this.state.attributeValue,
        chek: this.state.modalCheck ? "1" : "0"
      }

    this.setState({properties}, ()=>{this.popupDialog.dismiss()})
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
                maxLength={20}
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
                maxLength={20}
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
              <TouchableOpacity onPress={this.addProperty}>
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
    console.log('Good_Info=', this.props.good_info);
    return (
    <SafeAreaView style={styles.leftSideView}>
      <Container>
        <ScrollView scrollEnabled={false}>
          {this.renderHeader()}
          {this.renderPriceInput()}
          {this.renderDiscountInput()}
          {this.renderTypeSelect()}
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
    fetching: state.auth.fetching,
    error: state.auth.error,
    good_info: state.auth.good_info
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveLeftInfo: (price_usual, price_mode, properties) => dispatch(AuthActions.saveLeftinfoRequest(price_usual, price_mode, properties)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar)
