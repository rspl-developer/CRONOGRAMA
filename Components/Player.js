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
    TouchableOpacity
  } from 'react-native';
  import Sound from 'react-native-sound';

  const songs = [
    'sound_track.mp3',
    'sound_track.mp3',
    'sound_track.mp3'
  ];

 class Player extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {
            playSong: false,
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
    }
    handlePress() {
        if(this.state.playSong == false){
            this.hello.play((success) => {
              if (!success) {
                console.log('Sound did not play'+this.selectPlay);
              }else{
               
              }
            })
            console.log("Player volume = "+this.state.setVolume);
            this.hello.setVolume(this.state.setVolume);
            this.setState(state => ({
                playSong: !state.playSong
            }));
        }else{
            this.hello.pause();
            this.setState(state => ({
                playSong: !state.playSong
            }));
        }
    }

        render(){
            const playSong = this.state.playSong;
            return(
                <View style={styles.duration}>
                 <Image 
                        source={require('../images/music.png')}
                        style={styles.ic_music}/>
                    <View>
                        <Text style={styles.lyrics_txt}>Song lyrics goes here</Text>
                        <Text style={styles.album_name}>Artists, Album name</Text>
                    </View> 
                    <Image 
                        source={require('../images/refresh_icon.png')}
                        style={styles.ic_refresh}/>
                    <Image 
                        source={require('../images/previous.png')}
                        style={styles.ic_previous}/>

                    {/* <TouchableOpacity onPress={this.handlePress.bind(this)} >
                        {playSong
                            ? <Image 
                            source={require('../images/play.png')}
                            style={styles.ic_play}/>
                            : <Image 
                            source={require('../images/play.png')}
                            style={styles.ic_play}/>
                        }
                    </TouchableOpacity> */}
                    {playSong ? 
                      <TouchableOpacity onPress={this.handlePress.bind(this)} >
                        <Image 
                          source={require('../images/ic_pause.png')}
                          style={styles.ic_play}/>
                      </TouchableOpacity>
                      :   <TouchableOpacity onPress={this.handlePress.bind(this)} >
                              <Image 
                                    source={require('../images/play.png')}
                                    style={styles.ic_play}/>
                            </TouchableOpacity>
                    }
                
                    <Image 
                        source={require('../images/next.png')}
                        style={styles.ic_next}/>
                </View>
            )
        }
        
    }
        
const styles = StyleSheet.create({
    lyrics_txt:{
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold"
    },
    album_name:{
        fontSize: 16,
        color: "#fff",
        paddingTop: 5
    },
    duration:{
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
        padding: 20,
        textAlign: "center",
        alignItems: "center",
        margin: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center"
    },
    ic_refresh:{
        width: 30, 
        height: 30,
        marginLeft: 25,
        marginRight: 25
    },
    ic_previous:{
        width: 20, 
        height: 20,
        marginRight: 20
    },
    ic_play:{
        width: 30, 
        height: 30,
        marginRight: 20
    },
    ic_next:{
        width: 20, 
        height: 20,
    },
    ic_music:{
        width: 40, 
        height: 40,
        marginRight: 5
    }
});

 export { Player }