import React, {Component} from 'react';
import {Animated,ActivityIndicator,Platform,TouchableOpacity,TextInput, TouchableNativeFeedback,StyleSheet,StatusBar,AsyncStorage, Text,Alert, View,Image,Dimensions,FlatList} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
import { PowerTranslator, ProviderTypes, TranslatorConfiguration,TranslatorFactory } from 'react-native-power-translator';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import Popover from 'react-native-popover-view';
const equalWidth =  (width -20 )
//const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
var arrayholders = [];

type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

export default class Signup extends Component<Props> {
  static navigationOptions = {
    title: 'Signup',
    header: null
  };
  constructor(props) {
      super(props)
      this.state = {
      firstname : '',
      lastname :'',
      middlename :'',
      iama :'',
      text :'',
      loading :false,
        email :'',
        mobile :'',
        password :'',
        register :'',
         hidden: true ,        moviesList: [],
                 moviesLists: [],female:'',male:'',getFemaleID:'', getMaleID:'',infirstname:'', inmiddlename:'', inlastname:'',inemail:'',inmobile:'',inpass:'',userID:'',isModalVisible: false,inccode:'Select Country Code',
                 is_defaultFemale:'',is_defaultMale:'',is_type:2, codesList:[],isVisible:false,

      }
    }

    componentWillMount() {

     TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
      const translator = TranslatorFactory.createTranslator();
   translator.translate('First Name').then(translated => {


      this.setState({ firstname: translated });

      //Do something with the translated text
   });

   translator.translate('Middle Name').then(translated => {


      this.setState({ middlename: translated });

      //Do something with the translated text
   });

   translator.translate('Last Name').then(translated => {


      this.setState({ lastname: translated });

      //Do something with the translated text
   });
   translator.translate('Email').then(translated => {


      this.setState({ email: translated });

      //Do something with the translated text
   });
   translator.translate('Mobile Number').then(translated => {


      this.setState({ mobile: translated });

      //Do something with the translated text
   });
   translator.translate('Password').then(translated => {


      this.setState({ password: translated });

      //Do something with the translated text
   });

   translator.translate('Register Now').then(translated => {


      this.setState({ register: translated });

      //Do something with the translated text
   });
      this.getMoviesFromApiAsyncGender();
     }


     buttonClickListener=()=>{
       this.getMoviesFromApiAsync();

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
        this.setState({getFemaleID:responseJson.data[0].gender_id})
        this.setState({getMaleID:responseJson.data[1].gender_id})
        this.setState({is_defaultFemale:responseJson.data[0].is_default})
        this.setState({is_defaultMale:responseJson.data[1].is_default})
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
     getMoviesFromApiAsync = () => {
       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

          const url = GLOBAL.BASE_URL + 'register_user'
if(this.state.infirstname==''){
  alert('Enter First name')
}else if(this.state.inemail==''){
  alert('Enter emailid')
} else if(reg.test(this.state.inemail) === false)
 {
alert('Please enter valid emailid.')
   }


else if(this.state.inmobile==''){
  alert('enter mobile number')
}else if (this.state.inpass=='') {
  alert('Enter password')
}
else if (this.state.inpass.length <= 5) {
    alert('Password Must be 6 Chracter Long')
}
else{
  this.showLoading()
  fetch(url, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
_token : GLOBAL.accessToken,
first_name: this.state.infirstname,
middle_name: this.state.inmiddlename,
last_name: this.state.last_name,
gender_id:this.state.is_type,
mobile_num_code:this.state.inccode,
mobile_num:this.state.inmobile,
email:this.state.inemail,
password:this.state.inpass


}),
}).then((response) => response.json())
.then((responseJson) => {
if(responseJson.status=="success"){
    this.hideLoading()

  //alert(responseJson)
  GLOBAL.userID=responseJson.user_id
  GLOBAL.user_id=responseJson.user_id
  //alert(GLOBAL.userID)
    this.setState({userID:responseJson.user_id})

         this.props.navigation.navigate('Pinfo')
}else{
    this.hideLoading()
  alert(responseJson.data)
}


})
.catch((error) => {
    this.hideLoading()
  console.error(error);

});
}

    }


isSelected=()=>{
  this.setState({male:'yes'})
}
showPopover() {
    this.setState({isVisible: true});
  }

  closePopover() {
    this.setState({isVisible: false});
  }

 _keyExtractor = (item, index) => item.organisationID;
 resPress = (resId,index) => {
//    GLOBAL.cid =  resId;
    this.closePopover();
    this.setState({inccode:index.dial_code})
    //alert(this.state.inccode)
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
         TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
         if(this.state.loading){
return(
  <View style={{flex: 1 ,backgroundColor: 'white'}}>
  <ActivityIndicator style = {styles.loading}

 size="large" color="#201344" />
  </View>
)
}
var steps=this.state.is_type;

    return (

      <View style={styles.container}>
         <MyStatusBar backgroundColor="#201344" barStyle="light-content" />
        <View style = {{width : width ,height :APPBAR_HEIGHT ,marginTop:15,flexDirection :'row'}} >
        <TouchableOpacity onPress = {()=>this.props.navigation.goBack()}>
        <Image style = {{margin : 20 ,height : 22 ,width : 22,resizeMode :'contain'}}
        source = {require('./close.png')}/>
          </TouchableOpacity >
           <PowerTranslator style={{fontSize : 22,fontFamily: "Poppins-Regular" ,marginTop : 14 ,marginLeft : 18 ,color :'#333333'}} text={'REGISTER'} />
        </View>
      <KeyboardAwareScrollView style = {{flex:1}}
      keyboardShouldPersistTaps='always'>
       <View style = {{flexDirection :'row',justifyContent:'space-between',marginLeft : 20,marginRight:20 ,marginTop : 22}}>

       <TextInput style  = {{width : 100 ,height : 40 ,borderBottomWidth:2 ,borderBottomColor :'#f3f3f3'}}
       placeholder = {this.state.firstname}
       onChangeText={(text) => this.setState({infirstname:text})}
       placeholderTextColor = '#4c4c4c'
       />
       <TextInput style  = {{width : 100 ,height : 40 ,borderBottomWidth:2 ,borderBottomColor :'#f3f3f3'}}
       placeholder = {this.state.middlename}
       onChangeText={(text) => this.setState({inmiddlename:text})}
       placeholderTextColor = '#4c4c4c'
       />
       <TextInput style  = {{width : 100 ,height : 40 ,borderBottomWidth:2 ,borderBottomColor :'#f3f3f3'}}
       placeholder = {this.state.lastname}
       onChangeText={(text) => this.setState({inlastname:text})}
       placeholderTextColor = '#4c4c4c'
       />
 </View>

   <View style = {{width :width ,height : 40,marginLeft : 20 ,marginTop : 30 ,flexDirection : 'row'}}>
    <PowerTranslator style={{fontSize : 14,fontFamily: "Poppins-Regular" ,marginTop : 16  ,color :'#4c4c4c'}} text={'I am'} />

{steps==1 && (
  <View style={{flexDirection:'row'}}>
  <TouchableOpacity onPress={()=> this.setState({is_type:2})}>
     <View style = {{width : 110,padding:12.5,height : 50,flexDirection:'row',marginLeft : 15, borderBottomWidth :1 ,borderLeftWidth :1 ,borderRightWidth :1,borderTopWidth :1 ,borderBottomColor :'#aec0c7',borderTopColor :'#aec0c7',borderLeftColor :'#aec0c7',borderRightColor :'#aec0c7'}}>
      <Image style = {{width : 27 ,height : 27,resizeMode :'contain'}}
  source = {require('./male.png')}/>
   <PowerTranslator style={{fontSize : 14,fontFamily: "Poppins-Regular" ,marginTop:4,marginLeft : 7 ,color :'#333333'}} text={'Male'} />
     </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=> this.setState({is_type:1})}>
     <View style = {{width : 110,height : 50,padding:10,flexDirection:'row',backgroundColor:'#261650',marginLeft : 15 ,borderBottomWidth :1 ,borderLeftWidth :1 ,borderRightWidth :1,borderTopWidth :1 ,borderBottomColor :'#aec0c7',borderTopColor :'#aec0c7',borderLeftColor :'#aec0c7',borderRightColor :'#aec0c7'}}>
      <Image style = {{width : 27 ,height : 27,resizeMode :'contain'}}
     source = {require('./femalew.png')}/>
   <PowerTranslator style={{fontSize : 14,fontFamily: "Poppins-Regular" ,marginTop : 4 ,marginLeft : 7 ,color :'white'}} text={'Female'} />
     </View>
  </TouchableOpacity>
  </View>

)}
{steps==2 && (
  <View style={{flexDirection:'row'}}>
  <TouchableOpacity onPress={()=> this.setState({is_type:2})}>
     <View style = {{width : 110,padding:12.5,height : 50,flexDirection:'row',backgroundColor:'#261650',marginLeft : 15, borderBottomWidth :1 ,borderLeftWidth :1 ,borderRightWidth :1,borderTopWidth :1 ,borderBottomColor :'#aec0c7',borderTopColor :'#aec0c7',borderLeftColor :'#aec0c7',borderRightColor :'#aec0c7'}}>
      <Image style = {{width : 27 ,height : 27,resizeMode :'contain'}}
  source = {require('./malew.png')}/>
   <PowerTranslator style={{fontSize : 14,fontFamily: "Poppins-Regular" ,marginTop:4,marginLeft : 7 ,color :'white'}} text={'Male'} />
     </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=> this.setState({is_type:1})}>
     <View style = {{width : 110,height : 50,padding:10,flexDirection:'row',marginLeft : 15 ,borderBottomWidth :1 ,borderLeftWidth :1 ,borderRightWidth :1,borderTopWidth :1 ,borderBottomColor :'#aec0c7',borderTopColor :'#aec0c7',borderLeftColor :'#aec0c7',borderRightColor :'#aec0c7'}}>
      <Image style = {{width : 27 ,height : 27,resizeMode :'contain'}}
     source = {require('./female.png')}/>
   <PowerTranslator style={{fontSize : 14,fontFamily: "Poppins-Regular" ,marginTop : 4 ,marginLeft : 7 ,color :'#333333'}} text={'Female'} />
     </View>
  </TouchableOpacity>
  </View>

)}

   </View>

   <TextInput style  = {{marginLeft : 20,marginRight: 20,marginTop: 32,width : width - 40,height : 40 ,borderBottomWidth:2 ,borderBottomColor :'#f3f3f3'}}
   placeholder = {this.state.email}
       onChangeText={(text) => this.setState({inemail:text})}
   placeholderTextColor = '#4c4c4c'
   />

<TouchableOpacity style = {{width :width ,height : 40,marginLeft : 20 ,marginTop : 30 ,}}
onPress={()=>this.showPopover()}>
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
   <View style = {{width :width ,height : 40,flexDirection : 'row',borderBottomWidth:2 ,borderBottomColor :'#f3f3f3', marginRight:20 }}>

    <Text style={{fontSize : 14,fontFamily: "Poppins-Regular" ,marginTop : 14  ,color :'#4c4c4c'}}>{this.state.inccode}</Text>

  </View>
  </TouchableOpacity>
   <TextInput style  = {{marginLeft : 20,marginRight: 20,marginTop: 32,width : width - 40,height : 40 ,borderBottomWidth:2 ,borderBottomColor :'#f3f3f3'}}
   placeholder = {this.state.mobile}
   keyboardType={'phone-pad'}
   maxLength={10}
          onChangeText={(text) => this.setState({inmobile:text})}
   placeholderTextColor = '#4c4c4c'
   />
   <TextInput style  = {{marginLeft : 20,marginRight: 20,marginTop: 32,width : width - 40,height : 40 ,borderBottomWidth:2 ,borderBottomColor :'#f3f3f3'}}
   placeholder = {this.state.password}
   placeholderTextColor = '#4c4c4c'
          onChangeText={(text) => this.setState({inpass:text})}
   secureTextEntry={this.state.hidden}
   />
   <TouchableOpacity style = {{marginTop : -32 ,marginLeft : width - 50,height : 22 ,width : 22,}}
             onPress={ () => this.setState({ hidden: !this.state.hidden })}
           >
   <Image style = {{height : 22 ,width : 22,resizeMode :'contain'}}
   source = {require('./toggle.png')}/>
</TouchableOpacity>

   <Button
containerStyle={{width:width-40,marginLeft : 20,marginTop : 60,padding:10, height:40, overflow:'hidden', borderRadius:22, backgroundColor: '#261650'}}

style={{fontSize: 14, color: 'white'}}
onPress={this.buttonClickListener}
>

{this.state.register}
</Button>
<TouchableOpacity onPress = {()=>this.props.navigation.goBack()}>
   <PowerTranslator style={{fontFamily: "Poppins-Medium",fontSize : 12,color :'#333333',marginTop : 30 ,marginLeft :15,marginRight:15,width : window.width -40 ,height : 20,textAlign : 'center', alignSelf:'center'}} text={'By clicking here, you agree to the Terms & Conditions '} />
</TouchableOpacity>

</KeyboardAwareScrollView>

            </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },


  appBar: {
    backgroundColor:'#261650',
    height: APPBAR_HEIGHT,



  },
  loading: {
            position: 'absolute',
            left: window.width/2 - 30,

            top: window.height/2,

            opacity: 0.5,

            justifyContent: 'center',
            alignItems: 'center'
        },
  content: {
    flex: 1
  },
});
