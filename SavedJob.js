import React, {Component} from 'react';
import { Platform,StyleSheet, Text,FlatList,StatusBar,ActivityIndicator, View ,Image,Alert,Dimensions ,TextInput,TouchableOpacity,TouchableHighlight} from 'react-native';
const window = Dimensions.get('window');
  import moment from 'moment';
const { width, height } = Dimensions.get('window');
import Button from 'react-native-button';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const GLOBAL = require('./Global');
import { PowerTranslator, ProviderTypes, TranslatorConfiguration,TranslatorFactory } from 'react-native-power-translator';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const equalWidth =  (width/2 )
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
export default class SavedJob extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

constructor(props) {
    super(props)
    this.state = {
      isScreen :'',
      register :'',
      states : false,
        moviesList: [],
        moviesLists: [],
        languageCode :GLOBAL.language,
         backgroundColors: 'white',
         loading:false,

    }
  }
  buttonClickListener=()=>{
    this.props.navigation.navigate('JobDetail')
  }
  showLoading() {
        this.setState({loading: true})
     }

     hideLoading() {
        this.setState({loading: false})
     }
 _keyExtractor = (item, index) => item.id;
 resPress = () => {
this.props.navigation.navigate('SavedJob')

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


 _resPress = (item,index) => {
   this.showLoading()
   const url = GLOBAL.BASE_URL + 'remove_from_favourite_job';

    fetch(url, {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  user_id : GLOBAL.user_id,
  job_id : item.job_id


}),
}).then((response) => response.json())
  .then((responseJson) => {
this.hideLoading()
var checked = this.state.moviesList;
                var values = checked.indexOf(index)
                checked.splice(values, 1);
                this.setState({moviesList: checked});
                 console.log(this.state.moviesList)
//recommended
  //  alert(JSON.stringify(responseJson))

  })
  .catch((error) => {
    console.error(error);
this.hideLoading()
  });

   }


  _renderItem = ({item,index}) => {
    var iSApply = item.is_applied
    if (iSApply == "1"){

    } else {

    }


        var jobid = `Job Id : ${item.job_id} `;
        var posted = `Posted On ${moment(item.posted_on).format('DD MMMM')} `;
        var iSovertime = item.is_overtime
        var overtime = '';
       if (iSovertime == "1"){
         overtime = `${item.overtime_hours_day} Hours`;
       } else {
          overtime = '-'
       }

       var iSFood = item.is_food_by_company
       var food = '';
       if (iSFood == "1"){
        food = 'Yes'
       } else {
         food = 'No'
       }
       var dailyHour = ` ${item.duty_hours_day} Hours `;
       var dutyHour = ` ${item.duty_days_week} Hours `;
       var salary = `${item.salary_from} - ${item.salary_to} ${item.salary_currency}  `;
        var experience = `${item.job_min_experience} - ${item.job_max_experience} Year  `;
    return (

      <View style={{backgroundColor:'white',color :'white',flexDirection:'row' , flex: 1 ,margin: 10, height: 225,borderRadius :6,width : window.width- 20, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5 }}>

    <Image style={{marginLeft :10,marginTop :10,height :50,width :50,resizeMode:'contain'}}
                source={{ uri: item.company_image }} />


                   <View style = {{marginLeft : 12,flexDirection : 'column' ,width : window.width - 90}}>
<View style={{alignItems:'flex-end',flexDirection:'row',width : window.width - 90 }}>

                   <PowerTranslator style={{marginTop : 15,fontSize : 12,color :'black',fontFamily :'Poppins-Medium'}} text={item.title} />

                                      <TouchableOpacity style={{height :25,width :25,alignSelf:'flex-end'}} onPress={()=>this._resPress(item,index)}>
                                      <Image style={{top :8,right :-(window.width - 190),position:'absolute',alignSelf :'flex-end',height :25,width :25,resizeMode:'contain',alignSelf:'flex-end'}}
                                                     source={require('./heartw.png')} />
                                      </TouchableOpacity>
                                      </View>
                   <PowerTranslator style={{fontSize : 11,color :'#24c24e',fontFamily :'Poppins-Medium'}} text={item.comapny} />

                   <View style = {{marginTop : 2,flexDirection :'row',justifyContent :'space-between'}}>

                   <PowerTranslator style={{alignSelf :'center',marginTop : 0.5,fontSize : 11,color :'#484849',fontFamily :'Poppins-Medium'}} text={jobid} />
                   <PowerTranslator style={{marginRight : 10,alignSelf :'center',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} text={posted} />
                   </View>
                   <View style = {{marginLeft : - 65,marginTop : 12,flexDirection :'row',justifyContent :'space-between'}}>


                   <Image style={{marginLeft :2,marginTop :10,height :20,width :20,resizeMode:'contain'}}
                                  source={require('./first.png')} />
                                  {GLOBAL.language == "en" && (
                                     <View style = {{marginLeft : 5,width : 100, borderRadius :20,flexDirection :'column',padding :2}}>
                                  <Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Basic Salary'} </Text>
                                  <Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'  ,width :140}} >{salary} </Text>
                                  </View>
                                )}

                                {GLOBAL.language != "en" && (
                                   <View style = {{marginLeft : 5,width : 100, borderRadius :20,flexDirection :'column',padding :2}}>
                                <PowerTranslator style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Basic Salary'} />
                                <PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'  ,width :140}} text={salary} />
                                </View>
                               )}

                                  <Image style={{marginLeft :-2,marginTop :10,height :20,width :20,resizeMode:'contain'}}
                                              source={require('./second.png')} />

                                  {GLOBAL.language == "en" && (
                                    <View style = {{marginLeft : 5,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                  <Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Daily Hour'} </Text>
                                  <Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}}> {dailyHour} </Text>
                               </View>
                                )}

                                {GLOBAL.language != "en" && (
                                  <View style = {{marginLeft : 5,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                <PowerTranslator style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Daily Hour'} />
                                <PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} text={dailyHour} />
                               </View>
                               )}

                                  <Image style={{marginLeft :-2,marginTop :10,height :20,width :20,resizeMode:'contain'}}
                                              source={require('./third.png')} />


                               {GLOBAL.language == "en" && (
                                 <View style = {{marginLeft : 5,marginRight :10,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                  <Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Overtime'} </Text>
                                  <Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} >{overtime} </Text>
                                </View>
                               )}
                               {GLOBAL.language != "en" && (
                                 <View style = {{marginLeft : 5,marginRight :10,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                  <PowerTranslator style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Overtime'} />
                                  <PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} text={overtime} />
                                </View>
                               )}

                                  </View>
                                  <View style = {{marginLeft : - 65,marginTop : 12,flexDirection :'row',justifyContent :'space-between'}}>
                                  <Image style={{marginLeft :2,marginTop :10,height :20,width :20,resizeMode:'contain'}}
                                                 source={require('./four.png')} />

                               {GLOBAL.language == "en" && (
                                  <View style = {{marginLeft : 5,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                  <Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Food'} </Text>
                                  <Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}}>{food} </Text>
                               </View>
                               )}

                               {GLOBAL.language != "en" && (
                                  <View style = {{marginLeft : 5,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                  <PowerTranslator style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Food'} />
                                  <PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} text={food} />
                               </View>
                               )}
                      <Image style={{marginLeft :-2,marginTop :10,height :20,width :20,resizeMode:'contain'}}
                                     source={require('./five.png')} />
                                     {GLOBAL.language == "en" && (
                                        <View style = {{marginLeft : 5,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                        <Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Duty Hour'} </Text>
                                        <Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} >{dutyHour} </Text>
                                        </View>
                                     )}

                                     {GLOBAL.language != "en" && (
                                        <View style = {{marginLeft : 5,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                        <PowerTranslator style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Duty Hour'} />
                                        <PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} text={dutyHour} />
                                        </View>
                                     )}

                                        <Image style={{marginLeft :-2,marginTop :10,height :20,width :20,resizeMode:'contain'}}
                                                       source={require('./six.png')} />


                                     {GLOBAL.language == "en" && (
                                        <View style = {{marginLeft : 5,marginRight :10,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                        <Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Experience'} </Text>
                                        <Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} >{experience} </Text>
                                     </View>
                                     )}
                                     {GLOBAL.language != "en" && (
                                        <View style = {{marginLeft : 5,marginRight :10,width : 100,height : 40, borderRadius :20,flexDirection :'column',padding :2}}>
                                        <PowerTranslator style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Experience'} />
                                        <PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} text={experience} />
                                     </View>
                                     )}

                                           </View>
                                     {GLOBAL.language == "en" && iSApply == "1" && (

                                                 <Button
                                                containerStyle={{width:window.width - 20,marginLeft : -72,marginTop : 8,padding:12, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#261650'}}

                                                style={{fontSize: 16, color: 'white'}}
                                                onPress={()=>this.buttonClickListener(item)}
                                                >

                                                {'ALREADY APPLIED'}
                                                </Button>
                                              )}


                                              {GLOBAL.language != "en" && iSApply == "1" && (

                                                          <Button
                                                         containerStyle={{width:window.width - 20,marginLeft : -72,marginTop : 8,padding:12, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#261650'}}

                                                         style={{fontSize: 16, color: 'white'}}
                                                         onPress={()=>this.buttonClickListener(item)}
                                                         >

                                                         {this.state.registers}
                                                         </Button>
                                                       )}


                                              {GLOBAL.language == "en" && iSApply == "0" && (

                                                          <Button
                                                         containerStyle={{width:window.width - 20,marginLeft : -72,marginTop : 8,padding:12, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#261650'}}

                                                         style={{fontSize: 16, color: 'white'}}
                                                         onPress={()=>this.buttonClickListener(item)}
                                                         >

                                                         {'APPLY'}
                                                         </Button>
                                                       )}

                                                       {GLOBAL.language != "en" && iSApply == "0" && (

                                                                   <Button
                                                                  containerStyle={{width:window.width - 20,marginLeft : -72,marginTop : 8,padding:12, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#261650'}}

                                                                  style={{fontSize: 16, color: 'white'}}
                                                                  onPress={()=>this.buttonClickListener(item)}
                                                                  >

                                                                   {this.state.register}
                                                                  </Button>
                                                                )}


                                        </View>


                                        </View>
    )
  }
  componentWillMount() {
    TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
     const translator = TranslatorFactory.createTranslator();


  translator.translate('APPLY').then(translated => {


     this.setState({ register: translated });

     //Do something with the translated text
  });
       this.getMoviesFromApiAsync()

   }
  changeLanguage(languageCode) {
          this.setState({ languageCode: languageCode });
  }
  getMoviesFromApiAsync = () => {
 this.showLoading()
       const url = GLOBAL.BASE_URL + 'my_favourite_jobs';

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
               <PowerTranslator style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}} text={'Saved Jobs'} />
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
