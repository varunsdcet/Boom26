import React, {Component} from 'react';
import { StyleSheet, Text,FlatList,ActivityIndicator, View ,AsyncStorage,Image,Alert,Dimensions ,TextInput,TouchableOpacity,TouchableHighlight} from 'react-native';
const window = Dimensions.get('window');
import { PowerTranslator, ProviderTypes, TranslatorConfiguration,TranslatorFactory } from 'react-native-power-translator';
const { width, height } = Dimensions.get('window');
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Popover from 'react-native-popover-view';
var arrayholders = [];

const equalWidth =  (width/2 )
type Props = {};
export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

constructor(props) {
    super(props)
    this.state = {
      codesList:[],
      inccode :'+91',
      isVisible :false,
      mobilePlaceholder : '',
      loading :false,
      passwordPlaceholder : '',
        forgotPassword : '',
        login : '',
      isScreen :'',
      states : false,
        moviesList: [],
        moviesLists: [],
        languageCode :"hi",
        username :'',
        password :'',
         backgroundColors: 'white',

    }
  }



 componentWillMount() {
  TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
this.getMoviesFromApiAsyncGender();
  if (GLOBAL.language == "en"){
 this.setState({ login: 'LOGIN' });
 this.setState({ mobilePlaceholder: 'Enter Your Mobile no.'});
 this.setState({ passwordPlaceholder: 'Enter Your Password'});
  } else {
   const translator = TranslatorFactory.createTranslator();
translator.translate('Enter Your Mobile no.').then(translated => {

 mobilePlaceholder = translated;
   this.setState({ mobilePlaceholder: mobilePlaceholder });

   //Do something with the translated text
});

translator.translate('Enter Your Password').then(translated => {


   this.setState({ passwordPlaceholder: translated });

   //Do something with the translated text
});

translator.translate('Forgot Password?').then(translated => {


   this.setState({ forgotPassword: translated });

   //Do something with the translated text
});

translator.translate('Login').then(translated => {


   this.setState({ login: translated });

   //Do something with the translated text
});


}
  }
  changeLanguage(languageCode) {
          this.setState({ languageCode: languageCode });
  }

  getMoviesFromApiAsyncGender=()=>{
    this.showLoading()
    var url=GLOBAL.BASE_URL + 'gender'
    var acess = "";
    fetch(url)
     .then((response) => response.json())
     .then((responseJson) => {
 //alert(JSON.stringify(responseJson))
   if (responseJson.status == "success"){
     //alert(responseJson.data[1].gender_id)
     this.hideLoading()

     this.setState({codesList:responseJson.phone_codes})
     arrayholders =  responseJson.phone_codes
     //alert(this.state.getMaleID)

   }
   else{
     this.hideLoading()
      alert('Unable to process your request Please try again')
   }


     })
     .catch((error) => {
       console.error(error);
        this.hideLoading();
         alert('Unable to process your request Please try again after some time')

     });

  }
  showLoading() {
        this.setState({loading: true})
     }

     hideLoading() {
        this.setState({loading: false})
     }
     showPopover() {
         this.setState({isVisible: true});
       }

       closePopover() {
         this.setState({isVisible: false});
       }

        buttonClickListeners = () =>{
          this.props.navigation.navigate('Forget')
        }
 buttonClickListener = () =>{

if (this.state.username == ""){
  alert('Enter Your Mobile No.')
} else if (this.state.password == "" ) {
    alert('Enter Your Password')
}else if (this.state.password.length <= 5) {
    alert('Password Must be 6 Chracter Long')
}else {

  this.showLoading()

   const url = GLOBAL.BASE_URL + 'user_login';
//     alert(url)
  fetch(url, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
mobile_num : this.state.username,
mobile_num_code :this.state.inccode,
password : this.state.password,
deviceID :"dd",
deviceToken :"dd",
deviceType :"iOS"





}),
}).then((response) => response.json())
.then((responseJson) => {


this.hideLoading()


if(responseJson.status=="success"){


  //alert(responseJson)
  GLOBAL.userID=responseJson.data.id
  GLOBAL.user_id=responseJson.data.id
  this.props.navigation.navigate('DrawerNavigator')

}else {
  alert(responseJson.data)
}

//  alert(JSON.stringify(responseJson))

})
.catch((error) => {
  console.error(error);
this.hideLoading()
});
}
//this.props.navigation.navigate('DrawerNavigator')
};



renderItems = ({item,index}) => {
var commonHtml = `${item.name} (${item.dial_code})`;
  return (
    <TouchableOpacity onPress={() =>  this.resPress(item.productID,item)}>

    <View style = {{height :40 ,width :300,borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginBottom: 0.4,flexDirection :'row'}}>
   {GLOBAL.language == "en" && ( <Text style={{margin:8,marginTop :  8,alignSelf :'center',fontSize : 15,color :'black',fontFamily :'Poppins-Medium'}} >{commonHtml} </Text>)}

      {GLOBAL.language != "en" && ( <PowerTranslator style={{margin:8,marginTop :  8,alignSelf :'center',fontSize : 15,color :'black',fontFamily :'Poppins-Medium'}} text={commonHtml} />)}

        </View>

   </TouchableOpacity>



  )
}
SearchFilterFunctionss(text){
    const newData = arrayholders.filter(function(item){
           const itemData = item.name.toUpperCase()
           const textData = text.toUpperCase()
           return itemData.indexOf(textData) > -1
       })
       this.setState({
           codesList: newData,
           text: text


       })

   }
   resPress = (resId,index) => {
  //    GLOBAL.cid =  resId;
      this.closePopover();
      this.setState({inccode:index.dial_code})
      //alert(this.state.inccode)
     }
_renderItems = ({item,index}) => {
var commonHtml = `${item.name} (${item.dial_code})`;
  return (
    <TouchableOpacity onPress={() =>  this.resPress(item.productID,item)}>

    <View style = {{height :40 ,width :300,borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginBottom: 0.4,flexDirection :'row'}}>
   {GLOBAL.language == "en" && ( <Text style={{margin:8,marginTop :  8,alignSelf :'center',fontSize : 15,color :'black',fontFamily :'Poppins-Medium'}} >{commonHtml} </Text>)}

      {GLOBAL.language != "en" && ( <PowerTranslator style={{margin:8,marginTop :  8,alignSelf :'center',fontSize : 15,color :'black',fontFamily :'Poppins-Medium'}} text={commonHtml} />)}

        </View>

   </TouchableOpacity>



  )
}
  render() {
    var mobilePlaceholder = "";
    if(this.state.loading){
   return(
   <View style={{flex: 1 ,backgroundColor: 'white'}}>
   <ActivityIndicator style = {styles.loading}

   size="large" color="#201344" />
   </View>
   )
   }



    return (
     <KeyboardAwareScrollView style = {{flex :1}}
     keyboardShouldPersistTaps='always'>
     <Image style= {{resizeMode:'contain',marginTop : 30 ,marginLeft : window.width/2 - 100 ,width : 200 ,height : 150}}
         source={require('./logo.png')} />
        {GLOBAL.language == "en" && (<Text style={{fontFamily: "Poppins-Medium",fontSize : 13,color :'#333333',marginTop : 30 ,marginLeft :20,width : window.width -40 ,height : 20}}>
        {'MOBILE'} </Text>)}

          {GLOBAL.language != "en" && (
            <PowerTranslator style={{fontFamily: "Poppins-Medium",fontSize : 13,color :'#333333',marginTop : 30 ,marginLeft :20,width : window.width -40 ,height : 20}} text={'MOBILE'} />
          )}

          <Popover
                      isVisible={this.state.isVisible}
                         onClose={() => this.closePopover()}>
                        <Text style = {{fontWeight :'bold' ,fontSize :16 ,alignSelf :'center',textAlign:'center',padding:3,color:'white', backgroundColor:'#261650',width:300, height:30}}>
                         Select Country Code
                        </Text>
                        <TextInput
                     style={{marginRight:10, paddingLeft:25,paddingBottom:0,height: 40,borderBottomWidth :1 ,borderColor :'black'}}
                     onChangeText={(text) => this.SearchFilterFunctionss(text)}
                     value={this.state.text}
                     multiline={false}

                     underlineColorAndroid='transparent'
                     placeholder="Search "
                     />
                         <FlatList style= {{width:300,height:300}}
                              data={this.state.codesList}
                              numColumns={1}
                              keyExtractor={this._keyExtractor}
                              renderItem={this._renderItems}
                            />
                            </Popover>
      <View style = {{flexDirection :'row',marginTop :3 ,marginLeft : 20,width : window.width - 40 ,height : 40 ,borderBottomWidth :1}}>
      <TouchableOpacity
      onPress={()=>this.showPopover()}>

     <Text style = {{marginTop :12 ,height :35}}>
   {this.state.inccode}
   </Text>
</TouchableOpacity>

         <TextInput   style={{marginLeft : 20,width : window.width - 100 ,height : 40}}
                                  placeholder= {this.state.mobilePlaceholder}
                                   keyboardType={'phone-pad'}
                                 onChangeText={(text) => this.setState({username:text})}
                                  />

      </View>
  {GLOBAL.language == "en" && (
                                  <Text style={{fontFamily: "Poppins-Medium",fontSize : 13,color :'#333333',marginTop : 30 ,marginLeft :20,width : window.width -40 ,height : 20}}>
                                   {'PASSWORD'} </Text>
                                )}


                                {GLOBAL.language != "en" && (
                                                                <PowerTranslator style={{fontFamily: "Poppins-Medium",fontSize : 13,color :'#333333',marginTop : 30 ,marginLeft :20,width : window.width -40 ,height : 20}} text={'PASSWORD'} />
                                                              )}

                                  <TextInput   style={{marginTop :3 ,marginLeft : 20,width : window.width - 40 ,height : 40 ,borderBottomWidth :1}}
                                                           placeholder= {this.state.passwordPlaceholder}
                                                           secureTextEntry={true}
                                                          onChangeText={(text) => this.setState({password:text})}
                                                           />

  {GLOBAL.language == "en" && (
                                                           <Button
                                                                     containerStyle={{marginTop : 7,marginLeft : window.width - 160,padding:10, height:40, overflow:'hidden', backgroundColor: '#ffffff'}}

                                                                      style={{fontSize: 13, color: 'black',fontFamily: "Poppins-Regular"}}
                                                                    onPress={this.buttonClickListeners}
                                                                  >

                                                                   {'Forgot Password'}
                                                                  </Button>

)}


  {GLOBAL.language == "en" && (
                                                           <Button
                                                                     containerStyle={{marginTop : 7,marginLeft : window.width - 160,padding:10, height:40, overflow:'hidden', backgroundColor: '#ffffff'}}

                                                                      style={{fontSize: 13, color: 'black',fontFamily: "Poppins-Regular"}}
                                                                    onPress={this.buttonClickListener}
                                                                  >

                                                                   {this.state.forgotPassword}
                                                                  </Button>

)}


  {GLOBAL.language == "en" && (
                                                                  <Button
                                                 containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:22, backgroundColor: '#261650'}}

                                                  style={{fontSize: 14, color: 'white'}}
                                                onPress={this.buttonClickListener}
                                              >

                                              {'LOGIN'}
                                              </Button>
                                            )}


                                            {GLOBAL.language != "en" && (
                                                                                                            <Button
                                                                                           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:22, backgroundColor: '#261650'}}

                                                                                            style={{fontSize: 14, color: 'white'}}
                                                                                          onPress={this.buttonClickListener}
                                                                                        >

                                                                                        {this.state.login}
                                                                                        </Button>
                                                                                      )}


  {GLOBAL.language == "en" && (
      <Text style={{fontFamily: "Poppins-Medium",fontSize : 15,color :'black',marginTop : 30 ,marginLeft :17,width : window.width -30 ,height : 30}} >
      {'OR SIGIN WITH'} </Text>

)}

{GLOBAL.language != "en" && (
    <PowerTranslator style={{fontFamily: "Poppins-Medium",fontSize : 15,color :'black',marginTop : 30 ,marginLeft :17,width : window.width -30 ,height : 30}} text={'OR SIGIN WITH'} />

)}
      <View style={{borderRadius:22,height:40, backgroundColor: '#261650',backgroundColor: '#284ca0',width:window.width-30,marginLeft : 15,marginTop : 9,flexDirection :'row', padding:9}}>

                           <Image style={{width: 17,
    height: 22,
    marginLeft:35,
  resizeMode:'contain'}}
                           source={require('./facebook.png')} />



  {GLOBAL.language == "en" && (
  <Text style={{fontFamily: "Poppins-Medium",fontSize : 15,color :'white',marginLeft :20,width : window.width -30 ,height : 28}} >
  {'Continue with Facebook'} </Text>
)}
{GLOBAL.language != "en" && (
<PowerTranslator style={{fontFamily: "Poppins-Medium",fontSize : 15,color :'white',marginLeft :20,width : window.width -30 ,height : 28}} text={'Continue with Facebook'} />
)}

                        </View>


                        <View style={{borderRadius:22,height:40, backgroundColor: '#e04a39',width:window.width-30,marginLeft : 15,marginTop : 10,flexDirection :'row', padding:9}}>

                                             <Image style={{width: 22,
                      height: 22,
                      marginLeft : 35 ,resizeMode:'contain', marginTop:1
                      }}
                                             source={require('./gmail.png')} />



  {GLOBAL.language == "en" && (

                    <Text style={{fontFamily: "Poppins-Medium",fontSize : 15,color :'white',marginLeft :20,width : window.width -30 ,height : 28}}>


                    {'Continue with Google'} </Text>

)}
{GLOBAL.language != "en" && (

                  <PowerTranslator style={{fontFamily: "Poppins-Medium",fontSize : 15,color :'white',marginLeft :20,width : window.width -30 ,height : 28}} text={'Continue with Google'} />

)}
                                          </View>

           <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Signup')}>
  {GLOBAL.language == "en" && (
              <Text style={{fontFamily: "Poppins-Medium",fontSize : 12,color :'#333333',marginTop : 30 ,marginLeft :20,width : window.width -40 ,height : 20,textAlign : 'center'}}> {'Don\'t have an account ? Register '} </Text>
)}
{GLOBAL.language != "en" && (
            <PowerTranslator style={{fontFamily: "Poppins-Medium",fontSize : 12,color :'#333333',marginTop : 30 ,marginLeft :20,width : window.width -40 ,height : 20,textAlign : 'center'}} text={'Don\'t have an account ? Register '} />
)}
</TouchableOpacity>
<Text></Text>
     </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: 'relative',
    width :  window.width,
    height :  window.height,
  },
  content: {
    flex: 1,
    marginTop : - window.height ,
    height: window.height,

    width : window.width,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
   logoImage1: {
        marginLeft : window.width/2 - 65,
        marginTop : 60,
        width : 130,
        height :120,
        position: 'absolute',

    },

     logoImage2: {
        resizeMode: 'contain',
        width : window.width - 20,
        height :800,
        position: 'absolute',

    },
  text: {
    color : 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
     marginTop: 150,
      marginLeft: 0 ,
      width :  window.width,
      textAlign:'center'
  },
  container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    account :{
     margin : 30,
    textAlign : 'center',
    color : '#ffffff',

  } ,

createaccount :{
     margin : 30,
    color : '#ce8c04',

  } ,
  facebookicon: {
    width: 15,
    height: 27,
    marginLeft : 15 ,
    marginTop : 6,


  },
  facebookColor: {


   flexDirection :'row',
    margin: 20,
    height: 40,

    backgroundColor: '#284ca0',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderColor: '#DCDCDC',
    // borderRadius: 10,




  },


  gmailColor: {
//de584e

   flexDirection :'row',
    marginLeft: 20,
    height: 40,
    marginTop : 0,
    marginRight : 20,
    backgroundColor: '#de584e',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderColor: '#DCDCDC',
    // borderRadius: 10,




  },
  textColor : {
    marginLeft : 50,
    marginTop : 8,
    color : '#ffffff',
    fontSize: 18,

   textAlign: 'center',


  },
  loading: {
            position: 'absolute',
            left: window.width/2 - 30,

            top: window.height/2,

            opacity: 0.5,

            justifyContent: 'center',
            alignItems: 'center'
        },
   gmailIcon: {
    width: 27,
    height: 27,
    marginLeft : 15 ,
    marginTop : 6,


  },


});
