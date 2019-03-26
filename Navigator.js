import { createStackNavigator ,createAppContainer ,createDrawerNavigator} from 'react-navigation';
import Language from './Language.js';
import SelectType from './SelectType.js';
import Slider from './Slider.js';
import Agreement from './Agreement.js';
import Forget from './Forget.js';
import SchInterview from './SchInterview.js';
import ProfileScreenEdit from './ProfileScreenEdit.js';
import Login from './Login.js';
import Otp from './Otp.js';
import Drawerdemo from './Drawerdemo.js';
import GalleryDetail from './GalleryDetail.js';
import AppliedJob from './AppliedJob.js';
import Video from './Video.js';
import ProfileScreen from './ProfileScreen.js';
import Category from './Category.js';
import SetFilter from './SetFilter.js';
import InDetail from './InDetail.js';
import Signup from './Signup.js';
import Gallery from './Gallery.js';
import Privacy from './Privacy.js';
import News from './News.js';
import Recommended from './Recommended.js';
import Address from './Address.js';
import Skills from './Skills.js';
import Passport from './Passport.js';
import Desired from './Desired.js';
import Experience from './Experience.js';
import PaymentDues from './PaymentDues.js';
import Langu from './Langu.js';
import Drive from './Drive.js';
import Upload from './Upload.js';
import Pinfo from './Pinfo.js';
import Subject from './Subject.js';
import TradeCentres from './TradeCentres.js';
import InrestedInterview from './InrestedInterview.js';
import ProviderAddJobs from './ProviderAddJobs.js'
import ProviderHome from './ProviderHome.js'
import Upcoming from './Upcoming.js';
import Search from './Search.js';
import ProviderJobs from './ProviderJobs.js'
import ProviderSignup from './ProviderSignup.js'
import ProviderJobDetail from './ProviderJobDetail.js'
import ProviderExperience from './ProviderExperience.js'
import ProviderDuty from './ProviderDuty.js'
import ProviderLogin from './ProviderLogin.js'
import JobDetail from './JobDetail.js';
import Healthcare from './Healthcare.js';
import Education from './Education.js';
import MyJob from './MyJob.js';
import Home from './Home.js';
import TravelDocument from './TravelDocument.js';
import Drawer from './Drawer.js';
import SavedJob from './SavedJob.js';
import Media from './Media.js';
import Notification from './Notification.js';
import Newsdetail from './Newsdetail.js';
import Salinfo from './Salinfo.js';
import About from './About.js';
import {NavigationActions} from 'react-navigation';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,Button} from 'react-native';

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Home ,
  }

},{
    initialRouteName: 'Home',
    contentComponent: Drawerdemo,
    drawerWidth: 300
});

const StackNavigator = createStackNavigator({

    Language: { screen: Language },
Skills:{screen :Skills},
  Language :{screen :Language},
    Home :{screen :Home},
  Gallery :{screen :Gallery},
 Media: { screen: Media },
 News: { screen: News },
 Forget: { screen: Forget },
    Language: { screen: Language },
    SchInterview:{screen:SchInterview},
  Login: { screen: Login },
   PaymentDues: { screen: PaymentDues },
   TravelDocument: { screen: TravelDocument },
   Gallery: { screen: Gallery },
    GalleryDetail: { screen: GalleryDetail },
  TradeCentres :{screen:TradeCentres},
    InrestedInterview :{screen :InrestedInterview},
  InDetail :{screen :InDetail},
  AppliedJob: { screen: AppliedJob },
Home: { screen: Home },
Upcoming: { screen: Upcoming },
  Notification: { screen: Notification },
   Language: { screen: Language },
   SelectType: { screen: SelectType },
   Slider: { screen: Slider },
   Login: { screen: Login },
   Signup: { screen: Signup },
    Pinfo:{screen : Pinfo},
    Salinfo:{screen : Salinfo},
   News: { screen: News },
   Address:{screen:Address},
    Media: { screen: Media },
    Experience:{screen:Experience},
      SchInterview:{screen:SchInterview},
      Education: { screen: Education },
        Drive: { screen: Drive },
        Video: { screen: Video },
        Upload: { screen: Upload },
        Search: { screen: Search },
        ProfileScreenEdit :{screen :ProfileScreenEdit},
        ProfileScreen :{screen :ProfileScreen},
      Agreement :{screen :Agreement},
Recommended: { screen: Recommended },
      Notification: { screen: Notification },
      About: { screen: About },
      Privacy: { screen: Privacy },
      ProviderSignup:{screen:ProviderSignup},
      ProviderHome:{screen:ProviderHome},
 ProviderLogin:{screen:ProviderLogin},
  ProviderJobs:{screen:ProviderJobs},
  ProviderAddJobs:{screen:ProviderAddJobs},
  ProviderJobDetail:{screen:ProviderJobDetail},
  ProviderExperience:{screen:ProviderExperience},
  ProviderDuty:{screen:ProviderDuty},
      Healthcare: { screen: Healthcare },
        SavedJob: { screen: SavedJob },
        Subject: { screen: Subject },
        Category: { screen: Category },
          SetFilter: { screen: SetFilter },
            JobDetail: { screen: JobDetail },
            MyJob: { screen: MyJob },
              Passport: { screen: Passport },
                Desired: { screen: Desired },
                  Skills: { screen: Skills },
                  Langu: { screen: Langu },
                  DrawerNavigator: {
              screen: DrawerNavigator,
              navigationOptions: ({ navigation }) => ({
            header:null,
          }),

            },
   Newsdetail: { screen: Newsdetail },
   Upcoming: { screen: Upcoming },
   Otp: { screen: Otp ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#261650',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'white' }
    },

  }),
  },


});

export default createAppContainer(StackNavigator);
