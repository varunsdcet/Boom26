import React, {Component} from 'react';
import { Platform,StyleSheet, Text,FlatList,StatusBar,ActivityIndicator, View ,Image,Alert,Dimensions ,TextInput,TouchableOpacity,TouchableHighlight} from 'react-native';
const window = Dimensions.get('window');
import { PowerTranslator, ProviderTypes, TranslatorConfiguration } from 'react-native-power-translator';
const { width, height } = Dimensions.get('window');
import Button from 'react-native-button';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const GLOBAL = require('./Global');
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const equalWidth =  (width/2 )
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
export default class TradeCentres extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

constructor(props) {
    super(props)
    this.state = {
      isScreen :'',
      loading :false,
      states : false,
        moviesList: [],
        moviesLists: [],
        languageCode :GLOBAL.language,
         backgroundColors: 'white',

    }
  }
_resPress=()=>{
this.props.navigation.navigate('Newsdetail')
}

 _keyExtractor = (item, index) => item.id;
 resPress = () => {
this.props.navigation.navigate('Newsdetail')

   }

   showLoading() {
         this.setState({loading: true})
      }

      hideLoading() {
         this.setState({loading: false})
      }
 likePost({ item, index }) {
     let { moviesLists } = this.state;
     let targetPost = moviesLists[index];

     // Flip the 'liked' property of the targetPost
     targetPost.title = "Hi";

      moviesLists[index] = targetPost;

     // Then update targetPost in 'posts'
     // You probably don't need the following line.
     // posts[index] = targetPost;

     // Then reset the 'state.posts' property
     this.setState({ moviesList });
 }
  _renderItem = ({item,index}) => {
  var jobid = `${item.trade_center_phone_code}  ${item.trade_center_phone} `;
    return (

<TouchableOpacity onPress={()=>this._resPress()}>
      <View style={{backgroundColor:'white',color :'white' , flex: 1 ,margin: 10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5 }}>
  {GLOBAL.language != "en" && (
    <PowerTranslator style={{margin:8,fontSize : 16,color :'black',fontFamily :'Poppins-Medium'}} text={item.location_title} />
)}

{GLOBAL.language == "en" && (
  <Text style={{margin:8,fontSize : 16,color :'black',fontFamily :'Poppins-Medium'}} >{item.location_title} </Text>
)}
  {GLOBAL.language != "en" && (
      <PowerTranslator style={{marginLeft:8,marginTop:-10,fontSize : 12,color :'black',fontFamily :'Poppins-Regular'}} text={item.address} />
)}

{GLOBAL.language == "en" && (
    <Text style={{marginLeft:8,marginTop:-10,fontSize : 12,color :'black',fontFamily :'Poppins-Regular'}}>{item.address} </Text>
)}

   <View style = {{flexDirection :'row',marginTop : 2 ,marginLeft : 8,width : window.width - 20}}>
<Image style={{width:20, height:20,resizeMode:'contain'}} source={require('./call.png')}/>
  {GLOBAL.language != "en" && (
    <PowerTranslator style={{fontSize : 13,color :'black',fontFamily :'Poppins-Medium',marginLeft :5, marginBottom:5}} text={jobid} />
)}

{GLOBAL.language == "en" && (
  <Text style={{fontSize : 13,color :'black',fontFamily :'Poppins-Medium',marginLeft :5, marginBottom:5}}>{jobid} </Text>
)}

</View>
     </View>
</TouchableOpacity>
    )
  }
  componentWillMount() {
       this.getMoviesFromApiAsync()

   }
  changeLanguage(languageCode) {
          this.setState({ languageCode: languageCode });
  }
  getMoviesFromApiAsync = () => {
this.showLoading()
       const url = GLOBAL.BASE_URL + 'trade_center_list';
//     alert(url)
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id : GLOBAL.user_id

  }),
}).then((response) => response.json())
    .then((responseJson) => {

this.hideLoading()
       this.setState({ moviesList: responseJson.data})

    //  alert(JSON.stringify(responseJson))

    })
    .catch((error) => {
      console.error(error);

      this.hideLoading()
    });
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
    return (


     <View style={styles.container}>
              <MyStatusBar backgroundColor="#201344" barStyle="light-content" />
<View style={styles.appBar} >
<TouchableOpacity onPress = {()=>this.props.navigation.goBack()}>
<Image style={{marginLeft :10,marginTop :12,height :25,width :25,resizeMode:'contain'}}
               source={require('./back.png')} />
               </TouchableOpacity>
               <PowerTranslator style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}} text={'Trade Centres List'} />
</View>


<FlatList style= {{flexGrow:0,marginTop:10}}
     data={this.state.moviesList}
     numColumns={1}
     keyExtractor={this._keyExtractor}
     renderItem={this._renderItem}
   />


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
