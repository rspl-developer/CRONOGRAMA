import * as React from 'react';
import {
    StyleSheet,
    Button,
    View,
    Dimensions,
    ScrollView,
    Image,
    Text,
    Slider
  } from 'react-native';
//   import useSimpleAudio from 'use-simple-audio';

  const DEVICE_WIDTH = Dimensions.get("window").width;
//   const { play, pause, stop } = useSimpleAudio('/sample.mp3', true);

class BackgroundCarousel extends React.Component {
    scrollRef = React.createRef();
    constructor(props){
        super(props);

        this.state = {
            selectedIndex: 0
        }
    }
    

    render(){
        const {images} = this.props
        const {selectedIndex} = this.state
        return(
           <View style={{height: "100%", width:"100%"}}>
              <ScrollView horizontal pagingEnabled>
                {images.map(image => (
                    <Image 
                     key={image}
                     source={{uri: image}}
                     style={styles.backgroundImage}
                    />
                ))}
              </ScrollView>
              <View style={styles.circleDiv}>
                  {images.map((image,i) =>{
                      <View 
                       key={image}
                       style={[styles.whiteCircle]}
                      />
                  })}
              </View>
              <View style={styles.player_btns}>
                  <Text style={styles.playerText}>10:10</Text>
                   <View style={styles.player_btns}>
                    <Button title="PLAY"></Button>
                    <Button title="PAUSE"></Button>
                    <Button title="STOP"></Button>
                   </View>
                   
                   <Text style={styles.playerText}>00:10</Text>
                   <Slider
                        maximumValue={100}
                        // onSlidingStart={onSlidingStart}
                        // onSlidingComplete={onSeek}
                        // value={currentPosition}
                        minimumTrackTintColor="#cccccc"
                        maximumTrackTintColor="#cccccc"
                        thumbStyle={styles.thumb}
                        trackStyle={styles.track}
                    />
              </View>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage:{
        height: "100%",
        width: DEVICE_WIDTH
    },
    circleDiv:{
        position: "absolute",
        bottom: 15,
        height: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    whiteCircle:{
        width: 6,
        height: 6,
        borderRadius: 3,
         margin: 5,
         backgroundColor: "#fff"
    },
    playerText:{
        color: "#fff",
        padding: 30,
       
    },
    player_btns:{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center"
    },
    track: {
        height: 2,
        borderRadius: 1,
        width: "100%"
      },
      thumb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#000",
      }
});

export { BackgroundCarousel };