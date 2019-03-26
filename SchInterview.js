import React, {Component} from 'react';
import { Platform,StyleSheet, Text,FlatList,StatusBar,View, ScrollView ,Image,ActivityIndicator,Alert,Dimensions ,TextInput,TouchableOpacity,TouchableHighlight} from 'react-native';
const window = Dimensions.get('window');
  import moment from 'moment';
const { width, height } = Dimensions.get('window');
import Button from 'react-native-button';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const GLOBAL = require('./Global');
import HTML from 'react-native-render-html';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration,TranslatorFactory } from 'react-native-power-translator';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const equalWidth =  (width/2 )
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
export default class SchInterview extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

constructor(props) {
    super(props)
    this.state = {
      isScreen :'',
      register :'',
      registers :'',
      states : false,
        moviesList: [],
        moviesLists: [],
          moviesListss: [],
        languageCode :GLOBAL.language,
         backgroundColors: 'white',

    }
  }


 resPress = () => {
this.props.navigation.navigate('Healthcare')

   }

 getMoviesFromApiAsync = () => {
  this.showLoading()
      const url = GLOBAL.BASE_URL + 'scheduled_interview';

     fetch(url, {
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
 },
 body: JSON.stringify({
   user_id : GLOBAL.user_id,


 }),
 }).then((response) => response.json())
   .then((responseJson) => {
this.hideLoading()
//moviesList
alert(JSON.stringify(responseJson.data.scheduled_for))
    this.setState({moviesList :responseJson.data.scheduled_for})
this.setState({moviesLists :responseJson.data})
this.setState({moviesListss :responseJson.data.contact_person})



   })
   .catch((error) => {
     console.error(error);
     this.hideLoading()

   });
 }
 buttonClickListener=()=>{
   this.props.navigation.navigate('JobDetail')
 }


  componentWillMount() {
    TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
     const translator = TranslatorFactory.createTranslator();

  this.getMoviesFromApiAsync()
  translator.translate('APPLY').then(translated => {


     this.setState({ register: translated });

     //Do something with the translated text
  });

  translator.translate('ALREADY APPLIED').then(translated => {


     this.setState({ registers: translated });

     //Do something with the translated text
  });
   }
  changeLanguage(languageCode) {
          this.setState({ languageCode: languageCode });
  }





  showLoading() {
        this.setState({loading: true})
     }

     hideLoading() {
        this.setState({loading: false})
     }

  render() {
    TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);

    var iSApply = this.state.moviesList.is_applied
    if (iSApply == "1"){

    } else {

    }


        var jobid = `Job Id : ${this.state.moviesList.job_id} `;
        var posted = `Posted On ${moment(this.state.moviesList.posted_on).format('DD MMMM')} `;
        var iSovertime = this.state.moviesList.is_overtime
        var overtime = '';
       if (iSovertime == "1"){
         overtime = `${this.state.moviesList.overtime_hours_day} Hours`;
       } else {
          overtime = '-'
       }

       var iSFood = this.state.moviesList.is_food_by_company
       var food = '';
       if (iSFood == "1"){
        food = 'Yes'
       } else {
         food = 'No'
       }
       var dailyHour = ` ${this.state.moviesList.duty_hours_day} Hours `;
       var dutyHour = ` ${this.state.moviesList.duty_days_week} Hours `;
       var salary = `${this.state.moviesList.salary_from} - ${this.state.moviesList.salary_to} ${this.state.moviesList.salary_currency}  `;
        var experience = `${this.state.moviesList.job_min_experience} - ${this.state.moviesList.job_max_experience} Year  `;
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
               <Text style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}} >Scheduled Interview </Text>
             )}
             {GLOBAL.language != "en" && (
           <PowerTranslator style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}} text='Scheduled Interview' />
         )}

</View>
<KeyboardAwareScrollView style = {{flex:1}}
keyboardShouldPersistTaps='always'>
<View style={{backgroundColor:'white',color :'white',flexDirection:'row'  ,margin: 10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.6,
shadowRadius: 2,
elevation: 5 }}>

<Image style={{marginLeft :10,marginTop :10,height :50,width :50,resizeMode:'contain'}}

source={{ uri: this.state.moviesList.company_image }} />

             <View style = {{marginLeft : 12,flexDirection : 'column' ,width : window.width - 90}}>
 {GLOBAL.language == "en" && (
<View>
<Text style={{marginTop : 15,fontSize : 12,color :'black',fontFamily :'Poppins-Medium'}}>{this.state.moviesList.title} </Text>
<Text style={{fontSize : 11,color :'#24c24e',fontFamily :'Poppins-Medium'}} >{this.state.moviesList.comapny} </Text>
</View>
)}

{GLOBAL.language != "en" && (
<View>
<PowerTranslator style={{marginTop : 15,fontSize : 12,color :'black',fontFamily :'Poppins-Medium'}} text={this.state.moviesList.title} />
<PowerTranslator style={{fontSize : 11,color :'#24c24e',fontFamily :'Poppins-Medium'}} text={this.state.moviesList.comapny} />
</View>
)}


{GLOBAL.language == "en" && (
 <View style = {{marginTop : 2,flexDirection :'row',justifyContent :'space-between'}}>
<Text style={{alignSelf :'center',marginTop : 0.5,fontSize : 11,color :'#484849',fontFamily :'Poppins-Medium'}}>{jobid} </Text>
<Text style={{marginRight : 10,alignSelf :'center',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} >{posted} </Text>
</View>
)}

{GLOBAL.language != "en" && (
<View style = {{marginTop : 2,flexDirection :'row',justifyContent :'space-between'}}>
<PowerTranslator style={{alignSelf :'center',marginTop : 0.5,fontSize : 11,color :'#484849',fontFamily :'Poppins-Medium'}} text={jobid} />
<PowerTranslator style={{marginRight : 10,alignSelf :'center',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} text={posted} />
</View>
)}

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


</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,margin: 10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.6,
shadowRadius: 2,
elevation: 5 }}>

{GLOBAL.language == "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Interview Date : '} </Text>
<Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop :5}} >{this.state.moviesLists.scheduled_date} </Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<PowerTranslator style={{alignSelf :'flex-start',marginTop : 5,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Interview Date :'} />
<PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop : 5}} text={this.state.moviesLists.scheduled_date} />
</View>
)}

{GLOBAL.language == "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Interview Time : '} </Text>
<Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop : 5}} >{this.state.moviesLists.interview_slot} </Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<PowerTranslator style={{alignSelf :'flex-start',marginTop : 12,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Interview Time :'} />
<PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium'}} text={this.state.moviesLists.interview_slot} />
</View>
)}

</View>





<View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,margin: 10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.6,
shadowRadius: 2,
elevation: 5 }}>

{GLOBAL.language == "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Contact Person Name : '} </Text>
<Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop :5}} >{this.state.moviesListss.name} </Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<PowerTranslator style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Contact Person Name :'} />
<PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop : 5}} text={this.state.moviesListss.name} />
</View>
)}

{GLOBAL.language == "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Mobile : '} </Text>
<Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop : 5}} >{this.state.moviesListss.phone} </Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<PowerTranslator style={{alignSelf :'flex-start',marginTop : 15,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Mobile :'} />
<PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop:5}} text={this.state.moviesListss.phone} />
</View>
)}



{GLOBAL.language == "en" && (
<View style = {{marginLeft : 5,marginRight :10,width : 100,height : 40, borderRadius :20,flexDirection :'row',padding :2}}>
<Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Email : '} </Text>
<Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop : 5}} >{this.state.moviesListss.email} </Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<PowerTranslator style={{alignSelf :'flex-start',marginTop : 12,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Email:'} />
<PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop:5}} text={this.state.moviesListss.email} />
</View>
)}
</View>


<View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,margin: 10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.6,
shadowRadius: 2,
elevation: 5 }}>

{GLOBAL.language == "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Place : '} </Text>
<Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop:5}} >{this.state.moviesLists.place_tilte} </Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<PowerTranslator style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Place :'} />
<PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop : 5}} text={this.state.moviesLists.place_tilte} />
</View>
)}

{GLOBAL.language == "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Country : '} </Text>
<Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop : 5}} >{this.state.moviesLists.place_country} </Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<PowerTranslator style={{alignSelf :'flex-start',marginTop : 12,fontSize : 8,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Country :'} />
<PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop : 5}} text={this.state.moviesLists.place_countrye} />
</View>
)}



{GLOBAL.language == "en" && (
<View style = {{marginLeft : 5,marginRight :10,width : 100,height : 40, borderRadius :20,flexDirection :'row',padding :2}}>
<Text style={{alignSelf :'flex-start',marginTop : 5,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} >{'Address : '} </Text>
<Text style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop : 5}} >{this.state.moviesLists.place_address} </Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style = {{marginLeft : 5,marginRight :10, borderRadius :20,flexDirection :'row',padding :2}}>
<PowerTranslator style={{alignSelf :'flex-start',marginTop : 15,fontSize : 12,color :'#484849',fontFamily :'Poppins-Medium'}} text={'Address:'} />
<PowerTranslator style={{alignSelf :'flex-start',fontSize : 11,color :'#181818',fontFamily :'Poppins-Medium',marginTop:5}} text={this.state.moviesLists.place_address} />
</View>
)}
</View>

<ScrollView style={{ margin :10 }}>
{GLOBAL.language == "en" && (
    <HTML html={this.state.moviesLists.message} imagesMaxWidth={Dimensions.get('window').width} />
  )}
  {GLOBAL.language != "en" && (
      <HTML html={this.state.moviesLists.message} imagesMaxWidth={Dimensions.get('window').width} />
    )}
</ScrollView>
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
