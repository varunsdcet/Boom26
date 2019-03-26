import React, {Component} from 'react';
import { Platform,StyleSheet, Text,FlatList,  SectionList,StatusBar, View ,Image,Alert,Dimensions ,TextInput,TouchableOpacity,TouchableHighlight,SafeAreaView,} from 'react-native';
const window = Dimensions.get('window');
const { width, height } = Dimensions.get('window');
import Button from 'react-native-button';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const GLOBAL = require('./Global');
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
import ImagePicker from 'react-native-image-picker';
const equalWidth =  (width/2 )
type Props = {};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration,TranslatorFactory } from 'react-native-power-translator';
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

const options = {
  title: 'Upload Agreement',
  allowsEditing: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
    allowsEditing: true,
  },
      allowsEditing: true,
};

export default class Agreement extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

constructor(props) {
    super(props)
    this.state = {
      isScreen :'',
      states : false,
        moviesList: [],
        moviesLists: [],upload:'',
        languageCode :GLOBAL.language,avatarSource:'', imageget:0,
         backgroundColors: 'white',download:'',

    }
  }


  componentWillMount() {
    TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
     const translator = TranslatorFactory.createTranslator();

  translator.translate('Download').then(translated => {
     this.setState({ download: translated });

  });
  translator.translate('Upload').then(translated => {
     this.setState({ upload: translated });

  });

//       this.getMoviesFromApiAsync()
  this.getMoviesFromApiAsyncTermnio();
   }

   getMoviesFromApiAsyncTermnio=()=>{
     var url=GLOBAL.BASE_URL + 'get_document_terminology'
     var acess = "";
     fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
   //   alert(JSON.stringify(responseJson))
    if (responseJson.status == "success"){
           //alert(JSON.stringify(responseJson.data))
    }
    else{
       alert('Unable to process your request Please try again')
    }
      })
      .catch((error) => {
        console.error(error);
         this.hideLoading();
          alert('Unable to process your request Please try again after some time')
      });
   }

  changeLanguage(languageCode) {
          this.setState({ languageCode: languageCode });
  }

  buttonClickListenerDownload =()=>{

  }

buttonClickListenerUpload=()=>{
  ImagePicker.showImagePicker(options, (response) => {
 console.log('Response = ', response);

 if (response.didCancel) {
   console.log('User cancelled image picker');
 } else if (response.error) {
   console.log('ImagePicker Error: ', response.error);
 }else{
      GLOBAL.profile = response.uri
   const source = { uri: response.uri };
   this.setState({
   avatarSource: source,
   imageget:1
 });
 const url = 'http://3.17.73.124/boomoversea/public/api/user_doc_upload_ws'
   const data = new FormData();
     data.append('_token', GLOBAL.token);
     data.append('user_id', GLOBAL.user_id);
     data.append('image', {
       uri: response.uri,
       type: 'image/jpeg', // or photo.type
       name: 'image.png'
     });
     // you can append anyone.

     fetch(url, {
       method: 'post',
       body: data,
       headers: {
           'Content-Type': 'multipart/form-data',
         }

     }).then((response) => response.json())
           .then((responseJson) => {
       //this.hideLoading()
    
     });
 }
});
  }

  render() {
    TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
    return (


     <View style={styles.container}>
              <MyStatusBar backgroundColor="#201344" barStyle="light-content" />
<View style={styles.appBar} >
<TouchableOpacity onPress = {()=>this.props.navigation.goBack()}>
<Image style={{marginLeft :10,marginTop :12,height :25,width :25,resizeMode:'contain'}}
               source={require('./back.png')} />
               </TouchableOpacity>
               <PowerTranslator style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}} text={'Agreement'} />
</View>
<KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
<View style={{backgroundColor:'white',color :'white' , flexDirection:'row',margin: 10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.6,
shadowRadius: 2,
elevation: 5 }}>

<Image style={{width:120, height:120, resizeMode:'contain', margin:10}} source={require('./docc.png')}/>

<View style={{flexDirection:'column', alignSelf:'center'}}>
<PowerTranslator style={{marginLeft:10,marginRight:10,fontSize : 12,color :'black',fontFamily :'Poppins-Medium'}} text={'Download Agreement'} />
<Button
containerStyle={{width:80,marginRight:10,marginLeft : 10,marginTop : 10,padding:6, height:30, overflow:'hidden', borderRadius:22, backgroundColor: '#261650'}}

style={{fontSize: 14, color: 'white'}}
onPress={this.buttonClickListenerDownload}
>
{this.state.download}
</Button>
</View>
</View>

<View style={{backgroundColor:'white',color :'white' , flexDirection:'row',marginLeft: 10,marginRight:10,marginTop:5,borderRadius :6,width : window.width- 20, shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.6,
shadowRadius: 2,
elevation: 5 }}>
{this.state.avatarSource==0 &&(
  <Image style={{width:120, height:120, resizeMode:'contain', margin:10}} source={require('./docc.png')}/>

)}
{this.state.avatarSource!=0  && (
  <Image style={{width:120, height:120, margin:10}} source={this.state.avatarSource}/>
)}
<View style={{flexDirection:'column', alignSelf:'center'}}>
<PowerTranslator style={{marginLeft:10,marginRight:10,fontSize : 12,color :'black',fontFamily :'Poppins-Medium'}} text={'Upload Agreement'} />
<Button
containerStyle={{width:80,marginRight:10,marginLeft : 10,marginTop : 10,padding:6, height:30, overflow:'hidden', borderRadius:22, backgroundColor: '#261650'}}

style={{fontSize: 14, color: 'white'}}
onPress={this.buttonClickListenerUpload}
>
{this.state.upload}
</Button>
</View>
</View>

</KeyboardAwareScrollView>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'#f7f7f7',

    },
    statusBar: {
      height: STATUSBAR_HEIGHT,
    },
    appBar: {
      backgroundColor:'#261650',
      height: APPBAR_HEIGHT,
      flexDirection :'row',
    },
    loading: {
             position: 'absolute',
             left: window.width/2 - 30,

             top: window.height/2,

             opacity: 0.5,

             justifyContent: 'center',
             alignItems: 'center'
         },

colord:
{ textAlign :'center',marginLeft :15,marginTop :window.height/2 - 120,width : window.width -30,fontSize : 22  ,color :'#261650'},

});
