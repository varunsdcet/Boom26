import React, {Component} from 'react';
import {Platform, StyleSheet,StatusBar,ActivityIndicator,AppState,TouchableWithoutFeedback, Share,Text,Alert,Linking, View,Image,TouchableOpacity,Dimensions,FlatList,AsyncStorage,SafeAreaView,SectionList} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
import { NavigationActions,StackActions } from 'react-navigation';
import Collapsible from 'react-native-collapsible';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration,TranslatorFactory } from 'react-native-power-translator';
const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
const sections = [
  {
    title: 'Media',
    data: [
      'News',
      'Videos',
      'Gallery',
    ],
  },
];

export default class Drawerdemo extends Component<Props> {
  back = () => {

     this.props.navigation.goBack()
    }
    static navigationOptions = {
      header: null
    };
  constructor(props) {
    super(props)


    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      moviesLists: [],
      beer: [],
      result :'',
      name :'',
      email :'',
      gender :'',
      dob :'',ddetail:'',
      count : "0",activeSection: '',activeSections:'',
       appState: AppState.currentState, ditems:[],
    }

  }
 showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }
  _YesLogout=()=>{

  AsyncStorage.removeItem('userID');

   this.props
   .navigation
   .dispatch(StackActions.reset({
     index: 0,
     actions: [
       NavigationActions.navigate({
         routeName: 'Sliders',
         params: { someParams: 'parameters goes here...' },
       }),
     ],
   }))
}
  showResult(result){
      this.setState({result})
    }
    componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.navigation.addListener('willFocus',this._handleStateChange);

  }

  _handleStateChange = state => {
 //alert('arrivals')

};

onPressexp = section => {
this.setState({
  activeSection: this.state.activeSection === section.title
    ? ''
    : section.title,
});
};


onPressexps = section => {
  this.setState({
    activeSections: this.state.activeSections === section.title
      ? ''
      : section.title,
  });
};

  navigateToScreen1 = (route) => () => {

    Alert.alert('Logout!','Are you sure you want to Logout?',
      [{text:"Cancel"},
        {text:"Yes", onPress:()=>this._YesLogout()
 },
      ],
      {cancelable:false}
      )

  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  componentWillReceiveProps(){

  }

  _handleAppStateChange = (nextAppState) => {

    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }
    componentWillMount() {
      console.disableYellowBox = true;

    this.getMoviesFromApiAsync()
    this.getMoviesFromApiAsyncValues()
     }
    _shareMessage(){
        Share.share({message:'This is a simple shared message'}).then(this._showResult);
    }

    _fancyShareMessage(){
      Share.share({
        message:'Checkout Boomoverseas App at https://www.google.com/', url:'https://www.google.com/'
      },{
        tintColor:'green',
        dialogTitle:'Share this app via....'
      }
      ).then(this._showResult);
    }


    getMoviesFromApiAsyncValues =()=>{
      const url = GLOBAL.BASE_URL +  'user_my_profile'

     fetch(url, {
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
 },
 body: JSON.stringify({

   user_id :GLOBAL.user_id,
   _token:GLOBAL.accessToken,
 }),
}).then((response) => response.json())
   .then((responseJson) => {
         this.hideLoading();
//        alert(JSON.stringify(responseJson.data))
        this.setState({ddetail : responseJson.data})

   })
   .catch((error) => {
     console.error(error);
         this.hideLoading();

   });

    }


    getMoviesFromApiAsync = () => {
    this.showLoading();
          const url = GLOBAL.BASE_URL +  'show_drawer'

         fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({

       user_id :GLOBAL.user_id,
       _token: GLOBAL.accessToken
     }),
   }).then((response) => response.json())
       .then((responseJson) => {
             this.hideLoading();
//             alert(JSON.stringify(responseJson.show_drower))
             this.setState({ditems:responseJson.show_drower})


       })
       .catch((error) => {
         console.error(error);
             this.hideLoading();

       });
    }

    _onClickPiece=(item)=>{

      switch (item) {
        case "Payment Dues":this.props.navigation.navigate('PaymentDues')
        break;
        case "Travel Documents": this.props.navigation.navigate('TravelDocument')
        break;
        case "Applied Jobs": this.props.navigation.navigate('AppliedJob')
        break;
        case "Scheduled Interview": this.props.navigation.navigate('SchInterview')
        break;
        case "Upload Documents": this.props.navigation.navigate('Upload')
        break;
        case "Agreement": this.props.navigation.navigate('Agreement')
        break;
        default:

      }
//      this.props.navigation.navigate('MyJob')
    }


_onClickPieceMedia=(item)=>{

switch (item) {
  case "News": this.props.navigation.navigate('News')
  break;
  case "Videos": this.props.navigation.navigate('Media')
  break;
  case "Gallery":  this.props.navigation.navigate('Gallery')
  break;
  default:

}
}

  render() {
    var name = this.state.ddetail.first_name + ' ' + this.state.ddetail.middle_name
      TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
     if(this.state.loading){
  return(
    <View style={{flex: 1 ,backgroundColor: 'black'}}>
    <ActivityIndicator style = {styles.loading}

   size="large" color="#a71817" />
    </View>
  )
}
    return (

      <View style={styles.container}>
         <MyStatusBar backgroundColor="#261650" barStyle="light-content" />

                <KeyboardAwareScrollView contentContainerStyle={{backgroundColor:'#261650'}}
                keyboardShouldPersistTaps='always'>
         <View style={styles.content}>

<TouchableOpacity onPress={()=>this.props.navigation.navigate('ProfileScreen')}>
          <View style = {{flexDirection :'row',backgroundColor:'#261650'}}>
<Image style={{width:80, height:80,borderRadius:40,backgroundColor:'#261650', marginLeft:10,marginTop:20, }} source={{uri : this.state.ddetail.user_images}}/>
         <View style = {{backgroundColor :'#261650' ,height:120 ,width :window.width ,flexDirection:'column'}}>

         <Text style = {{marginLeft :10,marginTop:30 ,color :'white',fontSize:20,fontFamily:'Poppins-Medium'}}>
{name}
        </Text>
         <Text style = {{marginLeft :10 ,color :'white',fontSize:12,fontFamily:'Poppins-Medium'}}>{this.state.ddetail.email}</Text>

         </View>
          </View>
</TouchableOpacity>
         <TouchableWithoutFeedback
         onPress={() =>   this.props.navigation.toggleDrawer()}>
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./a.png')} />
 <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'Home'} />

         </View>
         </TouchableWithoutFeedback>

         <SafeAreaView>
           <SectionList
             sections={this.state.ditems}
             keyExtractor={a => a}
             renderSectionHeader={({ section }) => (
               <View style={{flexDirection:'row', backgroundColor:'#261650'}}>
               <Image style={{height :25,width :25,marginLeft:5,marginTop:17,resizeMode:'contain' }}
                     source={require('./b.png')} />
                     <TouchableWithoutFeedback onPress={() => this.onPressexp(section)}>
                 <Text style={styles.header}>{section.title}</Text>
               </TouchableWithoutFeedback>
               </View>
             )}
             renderItem={({ item, section }) => (
               <Collapsible
                 key={item}
                 collapsed={section.title !== this.state.activeSection}
                 enablePointerEvents={true}>
                 <TouchableWithoutFeedback onPress={()=> this._onClickPiece(item) }>
                 <View style={{backgroundColor:'#261650', flex:1}}>
                 <Text style={styles.item}>{item}</Text>
                 </View>
                 </TouchableWithoutFeedback>
               </Collapsible>
             )}
           />
         </SafeAreaView>

<TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('Recommended')}>
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./c.png')} />

                         <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'Recommended Jobs'} />
         </View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback
         onPress={() => this.props.navigation.navigate('Upcoming')}

          >
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./d.png')} />

                  <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'Upcoming Interviews'} />
         </View>
          </TouchableWithoutFeedback>
         <TouchableWithoutFeedback
         onPress={() => this.props.navigation.navigate('Category')}

          >
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./e.png')} />

                  <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'Categories'} />
         </View>
         </TouchableWithoutFeedback>


         <TouchableWithoutFeedback
         onPress={() => this.props.navigation.navigate('TradeCentres')}

          >
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./e.png')} />

                  <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'TradeCentres'} />
         </View>
         </TouchableWithoutFeedback>



         <TouchableWithoutFeedback
          onPress={()=>this.props.navigation.navigate('SavedJob')}>
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./f.png')} />

                  <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'Saved Jobs'} />
         </View>
         </TouchableWithoutFeedback>
         <SafeAreaView>
           <SectionList
             sections={sections}
             keyExtractor={a => a}
             renderSectionHeader={({ section }) => (
               <View style={{backgroundColor:'#261650', flexDirection:'row',}}>
               <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
                     source={require('./g.png')} />
                     <TouchableOpacity onPress={() => this.onPressexps(section)}>
                 <Text style={styles.header}>{section.title}</Text>
               </TouchableOpacity>
               </View>
             )}
             renderItem={({ item, section }) => (
               <Collapsible
                 key={item}
                 collapsed={section.title !== this.state.activeSections}>
                 <TouchableWithoutFeedback onPress={()=>this._onClickPieceMedia(item)}>
                 <View style={{backgroundColor:'#261650',flex:1}}>
                 <Text style={styles.item}>{item}</Text>
                 </View>
                 </TouchableWithoutFeedback>
               </Collapsible>
             )}
           />
         </SafeAreaView>

         <TouchableWithoutFeedback
          onPress={() =>   Linking.openURL('https://play.google.com/store')}>
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./h.png')} />

                  <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'Rate App'} />
         </View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback
          onPress={this._fancyShareMessage}>
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./i.png')} />

                  <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'Share App'} />
         </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback
          onPress={()=> this.props.navigation.navigate('About')}>
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./j.png')} />

                  <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'About Us'} />
         </View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback
          onPress={()=> this.props.navigation.navigate('Privacy')}>
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./k.png')} />

                  <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'Privacy Policy'} />
         </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback
          onPress={this.navigateToScreen1('Login')}>
         <View style = {{backgroundColor :'#261650',flexDirection:'row',height :50 ,width :window.width,borderBottomWidth :0 ,borderBottomColor :'#c8848c'}}>
         <Image style={{height :25,width :25,resizeMode: 'contain',marginLeft:5,marginTop:17,resizeMode:'contain' }}
               source={require('./l.png')} />

                  <PowerTranslator style={{color :'white',fontFamily:'Poppins-Medium',marginTop : 21 ,marginLeft :15}} text={'LogOut'} />
         </View>
         </TouchableWithoutFeedback>
          </View>
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
  header: {
    flex:1,
  color:'white',
  marginTop:17,
  marginLeft:15,
  fontFamily:'Poppins-Medium',
  backgroundColor: '#261650',
},
item: {
  color:'white',
  marginLeft:30,
  fontFamily:'Poppins-Medium',
  backgroundColor: '#261650',
  paddingHorizontal: 15,
  paddingVertical: 8,
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
    flex: 1,
    backgroundColor:'#000000',
  },
});
