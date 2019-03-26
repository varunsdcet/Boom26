import React, {Component} from 'react';
import { Platform,StyleSheet, Text,FlatList,Share,Linking,TouchableWithoutFeedback,StatusBar,ScrollView, View ,Image,Alert,Dimensions ,TextInput,TouchableOpacity,TouchableHighlight} from 'react-native';
const window = Dimensions.get('window');
import { PowerTranslator, ProviderTypes, TranslatorConfiguration,TranslatorFactory } from 'react-native-power-translator';
const { width, height } = Dimensions.get('window');
import Button from 'react-native-button';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const GLOBAL = require('./Global');
import HTML from 'react-native-render-html';

import Moment from 'moment';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const equalWidth =  (width/2 )
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
export default class Newsdetail extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

constructor(props) {
    super(props)
    this.state = {
      isScreen :'',
      states : false,
      description :'',
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

 _fancyShareMessage(){
   Share.share({
     message:'View this news ' + GLOBAL.news.credit_link, url:GLOBAL.news.credit_link
   },{
     tintColor:'green',
     dialogTitle:'Share this news via....'
   }
   ).then(this._showResult);
 }

  _renderItem = ({item,index}) => {

    return (

      <View style={{backgroundColor:'white',color :'white' , flex: 1 ,margin: 10, height: 110,borderRadius :6,width : window.width- 20, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5 }}>

    <PowerTranslator style={{margin:10,fontSize : 16,color :'black',fontFamily :'Poppins-Medium'}} text={'News Heading'} />

      <PowerTranslator style={{margin:10,marginTop:1,fontSize : 12,color :'black',fontFamily :'Poppins-Regular'}} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ins'} />

   <View style = {{flexDirection :'row',justifyContent :'space-between',marginTop : 2 ,marginLeft : 8,width : window.width - 20}}>

   <PowerTranslator style={{fontSize : 10,margin:10,color :'black',fontFamily :'Poppins-Medium'}} text={'INDIA'} />
   <PowerTranslator style={{fontSize : 10,color :'black',margin:10,fontFamily :'Poppins-Medium',}} text={'Posted on Jan 12, 2018'} />

</View>
     </View>




    )
  }
  componentWillMount() {


    const translator = TranslatorFactory.createTranslator();


   translator.translate('View').then(translated => {


    this.setState({ description:GLOBAL.news.description });

    //Do something with the translated text
   });
   }
  changeLanguage(languageCode) {
          this.setState({ languageCode: languageCode });
  }
  getMoviesFromApiAsync = () => {

       const url = 'http://139.59.76.223/boom_test/web.php';
  //   alert(url)
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userID : '1'

  }),
}).then((response) => response.json())
    .then((responseJson) => {
  //    alert(JSON.stringify(responseJson))

       this.setState({ moviesList: responseJson.languages})

    //  alert(JSON.stringify(responseJson))

    })
    .catch((error) => {
      console.error(error);

    });
 }






  render() {
    var s  = Moment(GLOBAL.news.updated_at).format('DD MMMM YYYY')
    TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
    var commonHtml = `Posted on ${s} `;
      var commonHtmls = `Credit : ${GLOBAL.news.credit_link} `;


    return (


     <View style={styles.container}>
              <MyStatusBar backgroundColor="#201344" barStyle="light-content" />
<View style={styles.appBar} >
<TouchableOpacity onPress = {()=>this.props.navigation.goBack()}>
<Image style={{marginLeft :10,marginTop :12,height :25,width :25,resizeMode:'contain'}}
               source={require('./back.png')} />
               </TouchableOpacity>
                  {GLOBAL.language == "en" && (
               <Text style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}}>{'News Details'} </Text>
)}
{GLOBAL.language != "en" && (
<PowerTranslator style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}} text={'News Details'} />
)}
</View>


<View style={{backgroundColor:'white',color :'white'  ,margin: 10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.6,
shadowRadius: 2,
elevation: 5 }}>


  {GLOBAL.language == "en" && (
    <View style = {{flexDirection :'row',justifyContent :'space-between',marginTop : 20 ,marginLeft : 8,width : window.width - 20}}>
<Text style={{marginLeft:10, fontSize : 13,color :'#4b4b4c',fontFamily :'Poppins-Medium'}}>{GLOBAL.news.location} </Text>
<Text style={{marginLeft:16,fontSize : 12,color :'#4b4b4c',fontFamily :'Poppins-Medium',marginRight :16}} >{commonHtml} </Text>
</View>
)}
{GLOBAL.language != "en" && (
  <View style = {{flexDirection :'row',justifyContent :'space-between',marginTop : 20 ,marginLeft : 8,width : window.width - 20}}>
<PowerTranslator style={{marginLeft:10, fontSize : 13,color :'#4b4b4c',fontFamily :'Poppins-Medium'}} text={GLOBAL.news.location} />
<PowerTranslator style={{marginLeft:16,fontSize : 12,color :'#4b4b4c',fontFamily :'Poppins-Medium',marginRight :16}} text={commonHtml} />
</View>
)}
{GLOBAL.language == "en" && (
<Text style={{marginLeft:16,marginTop:10,fontSize : 18,color :'black',fontFamily :'Poppins-Medium'}} >{GLOBAL.news.news_head} </Text>
)}

{GLOBAL.language != "en" && (
<PowerTranslator style={{marginLeft:16,marginTop:10,fontSize : 18,color :'black',fontFamily :'Poppins-Medium'}} text={GLOBAL.news.news_head} />
)}
<Image style={{marginLeft :10,marginTop :10,height :125,width :window.width - 40,resizeMode:'contain'}}
            source={{ uri: GLOBAL.news.image }} />
            <ScrollView style={{ margin :10 }}>
            {GLOBAL.language == "en" && (
                <HTML html={this.state.description} imagesMaxWidth={Dimensions.get('window').width} />
              )}
              {GLOBAL.language != "en" && (
                  <HTML html={this.state.description} imagesMaxWidth={Dimensions.get('window').width} />
                )}
            </ScrollView>

            {GLOBAL.language == "en" && (

              <TouchableWithoutFeedback
               onPress={() =>   Linking.openURL(GLOBAL.news.credit_link)}>
<Text style={{    textDecorationLine: "underline",
marginLeft:10,marginTop:1,fontSize : 14,color :'black',fontFamily :'Poppins-Regular'}} >{commonHtmls} </Text>
  </TouchableWithoutFeedback>
)}

{GLOBAL.language != "en" && (
  <TouchableWithoutFeedback
   onPress={() =>   Linking.openURL(GLOBAL.news.credit_link)}>

<PowerTranslator style={{    textDecorationLine: "underline",
marginLeft:10,marginTop:1,fontSize : 14,color :'black',fontFamily :'Poppins-Regular'}} text={commonHtmls} />
  </TouchableWithoutFeedback>
)}

<TouchableWithoutFeedback
 onPress={() =>   this._fancyShareMessage()}>

<Image style={{width :100,margin :10,height : 40,resizeMode:'contain'}}
               source={require('./share.png')} />
                 </TouchableWithoutFeedback>
</View>

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
