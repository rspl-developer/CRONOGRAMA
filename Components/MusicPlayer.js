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
    TouchableOpacity,
    AsyncStorage
  } from 'react-native';
import { TimeDuration } from './TimeDuration';
import { Player } from './Player';
import { EditComponent } from './EditComponent';
import { SliderComponent } from './SliderComponent';
import { VolumeSlider } from './VolumeSlider';
import Sound from 'react-native-sound';
import CustomMenu from './CustomMenu';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import {translate} from 'react-i18next';
import i18n from 'i18next';

const songs = [
    'sound_track.mp3',
    'sound_track_1.mp3',
    'sound_track_2.mp3'
  ];

 class MusicPlayer extends React.Component{

    // async onChangeLang(lang) {
    //     i18n.changeLanguage(lang);
    //     try{
    //         await AsyncStorage.setItem('@APP:languageCode',lang);
    //     }catch(error){
    //         console.log('Hi Errorrrr : $(error)');
    //     }
    //     console.log(i18n.dir());
    // }

    constructor(props){
        super(props);
        this.state = {
           setVolume: 50,
           playSong: false,
           selectedIndex: 0
         }
    }

    componentDidMount(){
        this.hello = new Sound(songs[this.state.selectedIndex], Sound.MAIN_BUNDLE, (error) => {
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

    resetVolume(val){
        this.setState(state => ({
            setVolume:val
        }));
        console.log(val);
        this.hello.setVolume(val);
     }

     playPrevSong(){
        this.hello.stop(() => {
        });
        if(this.state.selectedIndex > 0){
            this.state.selectedIndex = this.state.selectedIndex - 1;
            this.setState(state => ({
                selectedIndex:this.state.selectedIndex
            }));
            console.log("Selected Index = "+this.state.selectedIndex);
            this.hello = new Sound(songs[this.state.selectedIndex], Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                  alert('failed to load the sound', error);
                  return;
                }else{
                    console.log("Hiiiii" + this.state.playSong);
                    this.hello.setVolume(this.state.setVolume);
                    this.hello.play();
                    if(this.state.playSong == false){
                        this.setState(state => ({
                            playSong: !state.playSong
                        }));
                    }
                }
              });
        }else{
            alert("Current song is the First song in the list");
            if(this.state.playSong == true){
                this.setState(state => ({
                    playSong: !state.playSong
                }));
            }
        }
     }

     playNextSong(){
        // alert("PLay Next Song");
        this.hello.stop(() => {
        });
        const numRows = songs.length;
        console.log("Length of array = "+numRows)
        if(this.state.selectedIndex < (numRows-1)){
            this.state.selectedIndex = this.state.selectedIndex + 1
            this.setState(state => ({
                selectedIndex:this.state.selectedIndex
            }));
            console.log("Selected Index = "+this.state.selectedIndex);
            this.hello = new Sound(songs[this.state.selectedIndex], Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                  alert('failed to load the sound', error);
                  return;
                }else{
                    console.log("Hiiiii" + this.state.playSong);
                        this.hello.setVolume(this.state.setVolume);
                        this.hello.play();
                        if(this.state.playSong == false){
                            this.setState(state => ({
                                playSong: !state.playSong
                            }));
                        }
                }
              });
        }else{
            alert("Current song is last song of the list");
            if(this.state.playSong == true){
                this.setState(state => ({
                    playSong: !state.playSong
                }));
            }
        } 
    }

    openMenu(){
         <CustomMenu />
    }

    render(){
        const playSong = this.state.playSong;
        // const { t,i18n,navigation} = this.props;
        // const {navigate} = navigation;
        return(
        <View style={styles.body}>
            <View style={styles.MusicPLayer}>
                <TimeDuration/>
                {/* <Player hello={this.hello} setVolume={this.state.setVolume}/> */}
                <View style={styles.duration_player}>
                 <Image 
                        source={require('../images/music.png')}
                        style={styles.ic_music}/>
                    <View>
                        {/* <Text style={styles.lyrics_txt}>Song lyrics goes here</Text> */}
                        <Text style={styles.lyrics_txt}>{t(musicPlayer.songTitle)}</Text>
                        <Text style={styles.album_name}>Artists, Album name</Text>
                    </View> 
                    <Image 
                        source={require('../images/refresh_icon.png')}
                        style={styles.ic_refresh}/>
                    <TouchableOpacity onPress={this.playPrevSong.bind(this)}>
                        <Image 
                            source={require('../images/previous.png')}
                            style={styles.ic_previous}/>
                    </TouchableOpacity>
                    
                    {playSong ? 
                      <TouchableOpacity onPress={this.handlePress.bind(this)} >
                        <Image 
                          source={require('../images/pause.png')}
                          style={styles.ic_play}/>
                      </TouchableOpacity>
                      :   <TouchableOpacity onPress={this.handlePress.bind(this)} >
                              <Image 
                                    source={require('../images/play.png')}
                                    style={styles.ic_play}/>
                            </TouchableOpacity>
                    }
                
                <TouchableOpacity onPress={this.playNextSong.bind(this)}>
                    <Image 
                            source={require('../images/next.png')}
                            style={styles.ic_next}/>
                </TouchableOpacity>
                   
                </View>
                <EditComponent />
                {/* <View>
                    <TouchableOpacity onPress={this.openMenu.bind(this)}>
                        <Image 
                                source={require('../images/menu-vertical.png')}
                                style={styles.ic_menu}/>
                    </TouchableOpacity>
                </View> */}
                <MenuProvider style={{flexDirection:"column",padding:30}}>
                   <Menu onSelect={value => alert("You Clicked : "+{value})}>

                        <MenuTrigger>
                        <Image 
                                source={require('../images/menu-vertical.png')}
                                style={styles.ic_menu}/>
                        </MenuTrigger>

                        <MenuOptions>
                            <MenuOption value={"English"}>
                                <Text style={styles.MenuText}>English</Text>
                            </MenuOption>
                            <MenuOption value={"French"}>
                                <Text style={styles.MenuText}>French</Text>
                            </MenuOption>
                            <MenuOption value={"Spanish"}>
                                <Text style={styles.MenuText}>Spanish</Text>
                            </MenuOption>
                        </MenuOptions>
                   </Menu>
                </MenuProvider>
            </View>
            <View style={styles.duration1}>
                <Text style={styles.add_sign}>+</Text>
                <Text style={styles.add_song}>ADD A SONG </Text>
            </View>
            <View style={styles.Slider_Component}>
                <SliderComponent />
                <View style={styles.duration_vol_slider}>
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
            </View>
        </View>
          
        )
    }

 }

 const styles = StyleSheet.create({
    body: {
        backgroundColor: '#1b1c1d',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    duration:{
       borderRadius: 10,
       borderColor: "#fff",
       borderWidth: 1
    },
    MusicPLayer:{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center"
    },
    Slider_Component:{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center"
      },
      duration1:{
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
    },
    slider:{
        transform: [{ rotate: '270deg' }],
        width: 105,
        height: 150,
    },
    duration_player:{
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
    },
    ic_menu:{
        width: 25, 
        height: 25
    },
    duration_vol_slider:{
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
    MenuText:{
        fontSize: 18,
        padding: 5
    }
});

 export { MusicPlayer }