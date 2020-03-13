import * as React from 'react';
import {
    StyleSheet,
    Button,
    View,
    Dimensions,
    ScrollView,
    Image,
    Text,
    Slider,
    VerticalSlider
  } from 'react-native';
  import Sound from 'react-native-sound';

 class VolumeSlider extends React.Component{

     constructor(props){
         super(props);
         this.state = {
            setVolume: props.setVolume
          }
     }

     componentDidMount(){
        this.hello = new Sound('sound_track.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            alert('failed to load the sound', error);
            return;
          }
        });
        this.hello.setVolume(this.state.setVolume);
    }

     resetVolume(val){
        this.setState(state => ({
            setVolume:val
        }));
        console.log(val);
        this.hello.setVolume(this.state.setVolume);
     }

        render(){
            return(
                <View style={styles.duration}>
                {/* <VolumeSlider
                    style={styles.slider}
                    thumbSize={{
                        width: 8,
                        height: 8
                    }}
                    thumbTintColor="rgb(146,146,157)"
                    minimumTrackTintColor="rgb(146,146,157)"
                    maximumTrackTintColor="rgba(255,255,255, 0.1)"
                    showsRouteButton
                /> */}
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#8a8a8a"
                    value={this.state.setVolume}
                    onValueChange={(setVolume) => this.resetVolume(setVolume)}/>
                </View>
            )
        }
    }
        
const styles = StyleSheet.create({
    duration:{
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center",
        paddingBottom: 5,
        paddingTop: 5
    },
    slider:{
        transform: [{ rotate: '270deg' }],
        width: 105,
        height: 150,
    }
});

 export { VolumeSlider }