import React, { Component } from 'react'
import { View, ImageBackground, Image, SafeAreaView, Text, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Container, Content, Form, Item, Input, Spinner, Toast } from 'native-base';
import AuthActions from '../Redux/AuthRedux'
import FullButton from '../Components/FullButton'
import ModalDropdown from 'react-native-modal-dropdown';
import { RNCamera } from 'react-native-camera' 

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
    const {store_id} = props.navigation.state.params
    this.props.createProductId(store_id)
    this.state = {
      passcode : '',
      loading: false,
      error: '',
      editable: true,
      number: props.phone_number,
      code: '',
      barcodeRead: false,
      pic1: Images.placeholder,
      pic2: Images.placeholder,
      showModal: false,
  },

  this.isAttempting = false

  }

  componentWillReceiveProps= (nextProps)=> {
    console.log('PRODUCTS_UPLOADER_NEW_PROPS')
    console.log(this.props);
    console.log(nextProps);
    console.log('Modal Var = ', this.modal);
    if(this.props.fetching === true && nextProps.fetching === false && nextProps.error === null)
    {
      if(this.props.images != nextProps.images)
        this.goFurther();
      if(this.props.good_info != nextProps.good_info)
      {
        const {name, barcode, price_usual} = nextProps.good_info
        this.setState({productName: name, barcodeNumber: barcode, price: price_usual});
      }
      if(this.props.goods != nextProps.goods)
      {
        console.log('GOODS are changed')
        this.setState({showModal: true});
        if(nextProps.goods.length > 0)
        {
          console.log('THIS.MODAL=', this.modal)
          this.modal.show();
        }
      }
    }
    if(this.props.fetching === true && nextProps.fetching === false && nextProps.error !== null)
    {
      
    }
    //this.setState({loading: nextProps.fetching})
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

  takePhoto = async () => {
    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log('__CAMERA___')
    this.setState({pic1: this.state.pic2, pic2: {uri: data.uri}});
    console.log(data);
  }
 
  renderCameraButtons = () => {
    return(
      <View style={styles.cameraButtons}>
        <TouchableOpacity onPress={()=>this.setState({barcodeRead: !this.state.barcodeRead})}>
          <ImageBackground resizeMode='stretch' source={this.state.barcodeRead ? Images.big_shop_ellipse_clicked : Images.big_shop_ellipse} style={styles.barcodeButtonView}>
            <ImageBackground resizeMode='stretch' source={Images.barcode_icon} style={styles.barcodeButton}>
            </ImageBackground>
          </ImageBackground>
        </TouchableOpacity>
        <ImageBackground resizeMode='stretch' source={Images.big_shop_ellipse} style={styles.cameraButtonView}>
          <Image style={styles.latestImage} source={this.state.pic1}/>
          <Image style={styles.latestImage} source={this.state.pic2}/>
          <TouchableOpacity onPress={this.takePhoto}>
            <ImageBackground resizeMode='stretch' source={Images.big_shop_ellipse} style={styles.cameraBtnWrapper}>
              <ImageBackground resizeMode='stretch' source={Images.photo_icon} style={styles.barcodeButton}>
              </ImageBackground>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
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

  _onBarCodeRead= (result)=>{
    if(!this.state.barcodeRead) return;
    const {data} = result
    console.log('RESULT_BAR_CODE=', result);
    this.setState({barcodeNumber: data});
    this.props.searchBarcode(data);
    // if (this.barCodeFlag) {
    //   this.barCodeFlag = false;

    //   setTimeout(function() {
    //     $this.props.navigator.pop();
    //     $this.props.onSucess(result.data);
    //   }, 1000);
    // }
  }

  renderCamera= () => {
    // if(this.state.loading)
    //   return <Spinner style={{marginTop: Metrics.HEIGHT(180)}}/>
    return (
      <RNCamera
      style={{ flex:1 }}
      onBarCodeRead={this._onBarCodeRead} 
      ref={(cam) => {
        this.camera = cam;
      }}
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
    this.props.navigation.dispatch({
      type: 'ReplaceCurrentScreen',
      routeName: 'DemoShop',
    });
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
          <ImageBackground resizeMode='stretch' source={Images.ear_right} style={styles.ear_right}>
            <ImageBackground resizeMode='stretch' source={Images.cog_green} style={styles.cog_icon}>
            </ImageBackground>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }

  uploadImage = () => {
    this.props.uploadImage(this.props.product_id, this.state.pic1, this.state.pic2);
    this.goFurther();
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
          <TouchableOpacity onPress={this.uploadImage}>
            <ImageBackground resizeMode='stretch' source={Images.big_shop_ellipse} style={styles.bottomProductRightBtn}>
              <Text style={[Fonts.style.h6, { width: Metrics.WIDTH(200), fontWeight: 'bold', fontFamily: Fonts.type.emphasis }]}>
              добавьте товар {'\n'} в магазин
              </Text>
              <TouchableOpacity onPress={this.uploadImage}>
                <ImageBackground resizeMode='stretch' source={Images.arrow_sjop} style={styles.back_btn}/>  
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground> 
    )
  }
  onChangeProductName = productName => {
    this.setState({productName})
    this.props.searchByName(productName)
  }
  onChangeBarcodeNumber = barcodeNumber => {
    this.setState({barcodeNumber})
    this.props.searchBarcode(barcodeNumber);
  }
  
  _onSelect=(id, data)=>{
    console.log('Data=', data);
    this.setState({showModal: false})
    this.props.getGood(data.id);
  }

  _renderDropRow= (rowData, sectionID, rowID, highlightRow)=>
  {
    
    return( 
    <View style={{flexDirection:'column'}}>
      <View style={{padding: Metrics.defaultMargin, backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center'}}>
        <Text>
          {rowData.barcode}
        </Text>
        <Text style={[Fonts.style.h6, {color: Colors.textSecondary, textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          {rowData.name}
        </Text>
      </View>
      <View style={{height:1, backgroundColor: '#e9eef5'}}/>
    </View>)
  }

  renderProductNames= () =>(
      <View style={{ marginTop: Metrics.HEIGHT(-50), marginBottom: Metrics.HEIGHT(10)}}>
        <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_name}>
          {
            this.state.showModal?
          <ModalDropdown defaultValue='' ref={c => this.modal = c} options={this.props.goods} onSelect={this._onSelect} renderRow={this._renderDropRow}
            onDropdownWillHide={()=>{  return true;}}>
          </ModalDropdown>
          :null
          }
          <Text style={[Fonts.style.h6, { flex:1, fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          название товара: 
          </Text>
          <Input
            maxLength={20}
            placeholder={'Product Name'}
            style={{flex:1, marginLeft: 30}}
            textAlign={'left'}
            value={this.state.productName}
            onChangeText={this.onChangeProductName}
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
        <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_name}>
        <Text style={[Fonts.style.h6, { flex:1, fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
            баркод:
          </Text>
          <Input 
            maxLength={20}
            placeholder={'Barcode Number'}
            style={{flex:1, marginLeft: 30}}
            textAlign={'left'}
            value={this.state.barcodeNumber}
            onChangeText={this.onChangeBarcodeNumber}
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
        <ImageBackground resizeMode='stretch' source={Images.button} style={styles.product_name}>
          <Text style={[Fonts.style.h6, { flex:1, fontFamily: Fonts.type.emphasis, marginHorizontal: 10 }]}>
          цена основная:
          </Text>
          <Input
            maxLength={20}
            placeholder={'Price'}
            style={{marginLeft: 30, flex:1}}
            textAlign={'left'}
            value={this.state.price}
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
      </View>
    )

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
  console.log('Internal_STATE=', state.auth)
  return {
    fetching:state.auth.fetching,
    error:state.auth.error,
    passcode:state.auth.passcode,
    lang: state.auth.lang,
    phone_number: state.auth.phone_number,
    product_id: state.auth.product_id,
    good_info: state.auth.good_info,
    goods: state.auth.goods
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    createProductId: store_id => dispatch(AuthActions.createProductRequest(store_id)),
    searchBarcode: barcode => dispatch(AuthActions.searchBarcodeRequest(barcode)),
    uploadImage: (good_id, pic1, pic2) => dispatch(AuthActions.uploadImageRequest(good_id, pic1, pic2)),
    searchByName: name => dispatch(AuthActions.searchNameRequest(name)),
    getGood: good_id => dispatch(AuthActions.getGoodRequest(good_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsUploader)
