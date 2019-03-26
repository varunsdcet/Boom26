import React, {Component} from 'react';
import { Platform,StyleSheet, Text,FlatList,StatusBar, View ,Image,Alert,Dimensions ,TextInput,TouchableOpacity,TouchableHighlight} from 'react-native';
const window = Dimensions.get('window');
import { PowerTranslator, ProviderTypes, TranslatorConfiguration,TranslatorFactory } from 'react-native-power-translator';
const { width, height } = Dimensions.get('window');
import Button from 'react-native-button';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const GLOBAL = require('./Global');
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const equalWidth =  (width/2 )
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
export default class PaymentDues extends Component {
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
          serviceCharge: [],
            ticketCharge: [],
              otherCharge: [],
        languageCode :GLOBAL.language,
         backgroundColors: 'white',value:0, full:'', half:'',paynow:'',

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

     this.setState({ moviesList });
 }
  componentWillMount() {
       this.getMoviesFromApiAsync()
      TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
       const translator = TranslatorFactory.createTranslator();
    translator.translate('Pay Now').then(translated => {
       this.setState({ paynow: translated });
    });
   }
  changeLanguage(languageCode) {
          this.setState({ languageCode: languageCode });
  }
  getMoviesFromApiAsync = () => {

       const url = GLOBAL.BASE_URL + 'payment_dues';

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

   this.setState({ serviceCharge: responseJson.job_details.service_charges})
      this.setState({ ticketCharge: responseJson.job_details.ticket_charges})
          this.setState({ otherCharge: responseJson.job_details.others})
       this.setState({ moviesList: responseJson.job_details})
 this.setState({ moviesLists: responseJson})




    })
    .catch((error) => {
      console.error(error);

    });
 }






  render() {
    var radio_props_one = [
      {label: this.state.full, value: 0 },
      {label: this.state.half, value: 1 }
    ];
    var commonHtml = `Job ID :${this.state.moviesList.job_id} `;
    TranslatorConfiguration.setConfig(ProviderTypes.Google, GLOBAL.key, GLOBAL.language);
    return (


     <View style={styles.container}>
              <MyStatusBar backgroundColor="#201344" barStyle="light-content" />
<View style={styles.appBar} >
<TouchableOpacity onPress = {()=>this.props.navigation.goBack()}>
<Image style={{marginLeft :10,marginTop :12,height :25,width :25,resizeMode:'contain'}}
               source={require('./back.png')} />
               </TouchableOpacity>
                  {GLOBAL.language == "en" && (
               <Text style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}}>
                {'Payment Dues'} </Text>
          )}

          {GLOBAL.language != "en" && (
       <PowerTranslator style={{marginLeft : 15,marginTop:12,fontSize : 16,color :'white',fontFamily :'Poppins-Medium'}} text={'Payment Dues'} />
  )}
            </View>
<View style={{backgroundColor:'white',color :'white' , flexDirection:'column' ,margin: 10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.6,
shadowRadius: 2,
elevation: 5 }}>
{GLOBAL.language == "en" && (
  <View>
  <Text style={{color:'grey', fontSize:12,marginLeft:15, marginTop:20,fontFamily :'Poppins-Medium' }}>
   {commonHtml}</Text>


  <Text style= {{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} >
  {this.state.moviesList.title}
  </Text>

  <Text style={{color:'green', fontSize:12,marginLeft:15, marginTop:5,fontFamily :'Poppins-Medium' }}>
  {this.state.moviesList.comapny}</Text>
  </View>
)}
{GLOBAL.language != "en" && (
    <View>
  <PowerTranslator style={{color:'grey', fontSize:12,marginLeft:15, marginTop:20,fontFamily :'Poppins-Medium' }} text={commonHtml}/>
  <PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={this.state.moviesList.title}/>
  <PowerTranslator style={{color:'green', fontSize:12,marginLeft:15, marginTop:5,fontFamily :'Poppins-Medium' }} text={this.state.moviesList.comapny}/>
  </View>
)}



<View style={{flexDirection:'row', alignItems:'space-between',}}>
{GLOBAL.language == "en" && (
<Text style={{color:'grey', fontSize:12,marginLeft:15, marginTop:15,fontFamily :'Poppins-Medium' }}>
{this.state.moviesList.company_address}</Text>
)}

{GLOBAL.language != "en" && (
<PowerTranslator style={{color:'grey', fontSize:12,marginLeft:15, marginTop:15,fontFamily :'Poppins-Medium' }} text={this.state.moviesList.company_address}/>
)}

</View>
<View style={{marginTop:1,backgroundColor:'#bfbfbf',width:window.width-45,marginLeft:15,height:1}}></View>

{GLOBAL.language == "en" && (
<View style={{ justifyContent:'space-between', flexDirection:'row' , marginRight :15}}>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} >
{'TOTAL AMOUNT DUE'}</Text>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }}>
{'INR ' + this.state.moviesLists.due_amount}</Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style={{ justifyContent:'space-between', flexDirection:'row', marginRight :15}}>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'TOTAL AMOUNT DUE'}/>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'INR ' +this.state.moviesLists.due_amount}/>
</View>
)}

<View style={{marginTop:1,backgroundColor:'#bfbfbf',width:window.width-45,marginLeft:15,height:1}}></View>

{GLOBAL.language == "en" && (
<View style={{ justifyContent:'space-between', flexDirection:'row',marginRight :15}}>
  <Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }}>
   {'Service Charges'}</Text>
  <Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }}>
  {'INR ' +this.state.serviceCharge.inr_price}
  </Text>
 </View>
)}
{GLOBAL.language != "en" && (
  <View style={{ justifyContent:'space-between', flexDirection:'row',marginRight:15}}>
  <PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'Service Charges'}/>
  <PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'INR ' +this.state.serviceCharge.inr_price}/>
 </View>
)}



{GLOBAL.language == "en" && (
  <View style={{ justifyContent:'space-between', flexDirection:'row',marginRight:15}}>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} >
{'Ticket Charges'}</Text>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} >
  {'INR ' +this.state.ticketCharge.inr_price}

</Text>
</View>
)}

{GLOBAL.language != "en" && (
  <View style={{ justifyContent:'space-between', flexDirection:'row',marginRight :15}}>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'Ticket Charges'}/>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text=  {'INR ' +this.state.ticketCharge.inr_price}/>
</View>
)}




{GLOBAL.language == "en" && (
  <View style={{ justifyContent:'space-between', flexDirection:'row',marginRight:15}}>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }}>
 {'Others'}</Text>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} >
{'INR ' +this.state.otherCharge.inr_price}</Text>
</View>
)}
{GLOBAL.language != "en" && (
<View style={{ justifyContent:'space-between', flexDirection:'row',marginRight:15}}>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'Others'}/>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'INR ' +this.state.otherCharge.inr_price}/>
</View>
)}



{GLOBAL.language == "en" && (
  <View style={{ justifyContent:'space-between', flexDirection:'row',marginRight:15}}>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} >
{'GST 18%'}</Text>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }}>
 {'INR ' +this.state.moviesList.gst}</Text>
</View>
)}
{GLOBAL.language != "en" && (
    <View style={{ justifyContent:'space-between', flexDirection:'row',marginRight:15}}>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'GST 18%'}/>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'INR ' +this.state.moviesList.gst}/>
</View>
)}



{GLOBAL.language == "en" && (
<View style={{ justifyContent:'space-between', flexDirection:'row',marginRight:15}}>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} >
{'TOTAL AMOUNT '}</Text>
<Text style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }}>
 {'INR ' +this.state.moviesList.total_amount}</Text>
</View>
)}

{GLOBAL.language == "en" && (
<View style={{ justifyContent:'space-between', flexDirection:'row',marginRight:15}}>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'TOTAL AMOUNT DUE'}/>
<PowerTranslator style={{color:'black', fontSize:12,marginLeft:15, marginTop:10,fontFamily :'Poppins-Medium' }} text={'INR ' +this.state.moviesList.total_amount}/>
</View>
)}
</View>

{GLOBAL.language == "en" && (
<Button
containerStyle={{width:window.width-20,marginRight:10,marginLeft : 10,marginTop : 20,padding:10, height:40, overflow:'hidden', borderRadius:22, backgroundColor: '#261650'}}

style={{fontSize: 14, color: 'white'}}
onPress={this.buttonClickListener}
>
{'PAY NOW'}
</Button>

)}

{GLOBAL.language != "en" && (
<Button
containerStyle={{width:window.width-20,marginRight:10,marginLeft : 10,marginTop : 20,padding:10, height:40, overflow:'hidden', borderRadius:22, backgroundColor: '#261650'}}

style={{fontSize: 14, color: 'white'}}
onPress={this.buttonClickListener}
>
{this.state.paynow}
</Button>

)}
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
