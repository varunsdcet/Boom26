import React, {Component} from 'react';
import { Platform,StyleSheet, Text,FlatList,StatusBar,ActivityIndicator, View ,Image,Alert,Dimensions ,TextInput,TouchableOpacity,TouchableHighlight} from 'react-native';
const window = Dimensions.get('window');
import { PowerTranslator, ProviderTypes, TranslatorConfiguration } from 'react-native-power-translator';
const { width, height } = Dimensions.get('window');
import Button from 'react-native-button';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const GLOBAL = require('./Global');
 import moment from 'moment';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const equalWidth =  (width/2 )
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
export default class Media extends Component {
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
        moviesLists: [],
        languageCode :GLOBAL.language,
         backgroundColors: 'white',

    }
  }

 _keyExtractor = (item, index) => item.id;
 resPress = () => {
this.props.navigation.navigate('News')

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
 showLoading() {
     this.setState({loading: true})
  }

  hideLoading() {
     this.setState({loading: false})
  }
 _resPress = (item) => {
   GLOBAL.videoLink = item.media
this.props.navigation.navigate('Video')

   }
  _renderItem = ({item,index}) => {

var commonHtml = `Posted On : ${ moment(item.updated_at).format('DD MMMM')} `;
    return (
<TouchableOpacity onPress={()=>this._resPress(item)}>
      <View style={{backgroundColor:'white',color :'white' ,flexDirection :'row' , flex: 1 ,margin: 10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5 }}>

    <Image style={{marginLeft :10,marginTop :10,height :125,width :125,resizeMode:'contain'}}
                     source={{ uri: item.thumbnail }} />
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', marginTop :10,height :125,width :125,marginLeft :-125, marginBottom:10 }}>
</View>
<Image style={{marginLeft :-100,marginTop :40,height :70,width :70,resizeMode:'contain'}}
               source={require('./youtube.png')} />
     <View style = {{marginLeft : 35,flexDirection : 'column' ,width : window.width - 155}}>


 {GLOBAL.language == "en" && (
   <View style = {{flexDirection : 'row' ,justifyContent :'space-between',marginTop : 10,width : window.width - 155,}}>

 <Text style={{fontSize : 10,color :'black',fontFamily :'Poppins-Medium',marginLeft :8}} >{commonHtml} </Text>
                   <Text style={{fontSize : 10,color :'black',fontFamily :'Poppins-Medium',marginRight :16}}>
                    {item.location} </Text>
                   </View>

)}
{GLOBAL.language != "en" && (
  <View style = {{flexDirection : 'row' ,justifyContent :'space-between',marginTop : 10,width : window.width - 155,}}>

<PowerTranslator style={{fontSize : 10,color :'black',fontFamily :'Poppins-Medium',marginLeft :8}} text={commonHtml} />
                  <PowerTranslator style={{fontSize : 10,color :'black',fontFamily :'Poppins-Medium',marginRight :16}} text={item.location} />
                  </View>

)}
 {GLOBAL.language == "en" && (
    <Text style={{marginLeft:8,marginRight:8,marginBottom:8,marginTop:1,fontSize : 16,color :'black',fontFamily :'Poppins-Medium'}} >{item.title} </Text>
)}
{GLOBAL.language != "en" && (
   <PowerTranslator style={{marginLeft:8,marginRight:8,marginBottom:8,marginTop:1,fontSize : 16,color :'black',fontFamily :'Poppins-Medium'}} text={item.title} />
)}
 {GLOBAL.language == "en" && (
      <Text style={{margin:8,marginTop:-10,fontSize : 12,color :'black',fontFamily :'Poppins-Regular'}} >{item.description} </Text>
)}
{GLOBAL.language != "en" && (
     <PowerTranslator style={{margin:8,marginTop:-10,fontSize : 12,color :'black',fontFamily :'Poppins-Regular'}} text={item.description} />
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
      var url= GLOBAL.BASE_URL + 'get_media';

     fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
this.hideLoading()

    //alert(JSON.stringify(responseJson))
    if (responseJson.status == "success"){

   this.setState({moviesList :responseJson.data})


    }else{
       alert('Unable to process your request Please try again')
    }


      })
      .catch((error) => {

this.hideLoading()
        console.error(error);

          alert('Unable to process your request Please try again after some time')

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
               {GLOBAL.language == "en" && (
               <Text style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}} >{'Media'} </Text>
            )}
            {GLOBAL.language != "en" && (
            <PowerTranslator style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}} text={'Media'} />
         )}
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
