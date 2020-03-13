
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {BackgroundCarousel} from './BackgroundCarousel';
import { MusicPlayer } from './Components/MusicPlayer';
import { SliderComponent } from './Components/SliderComponent';
import { VolumeSlider } from './Components/VolumeSlider';
import {translate} from 'react-i18next';
import i18n from 'i18next';
import { createStackNavigator } from 'react-navigation-stack';

const images = [
  "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
];

const Stack = createStackNavigator({
  MusicPlayer: {screen : MusicPlayer}
});

const WrappedStack = ({t})=>{
  return <Stack screenProps= {{t}} />
};

// const ReloadAppOnLanguageChange = translate('common',{
//   bindI18n: 'languageChanged',
//   bindStore: false
// })(WrappedStack);

export default class App extends React.Component{
  render(){
    return(
      <View style={styles.body}>
      <Stack />
        {/* <ReloadAppOnLanguageChange /> */}
      </View>
    )
  }
}

// const App: () => React$Node = () => {
  
//   return (
//     // <>
//      <View style={styles.body}>
//         {/* <BackgroundCarousel images={images}/> */}
//         <MusicPlayer></MusicPlayer>
//         {/* <View style={styles.duration}>
//           <Text style={styles.add_sign}>+</Text>
//           <Text style={styles.add_song}>ADD A SONG </Text>
//         </View>
//         <View style={styles.Slider_Component}>
//           <SliderComponent />
//           <VolumeSlider setVolume={50}/>
//         </View> */}
//       </View>
//     // </>
//   );
// };

const styles = StyleSheet.create({
 
  body: {
    backgroundColor: '#1b1c1d',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Slider_Component:{
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center"
  },
  duration:{
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    textAlign: "center",
    alignItems: "center",
    padding: 5,
    paddingBottom: 10
},
add_sign:{
  fontSize: 50,
  color: "#fff"
},
add_song:{
  fontSize: 20,
  color: "#fff"
}
});
