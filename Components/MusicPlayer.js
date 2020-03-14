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
    AsyncStorage,
    I18nManager
  } from 'react-native';
import { TimeDuration } from './TimeDuration';
import { Player } from './Player';
import { EditComponent } from './EditComponent';
import { SliderComponent } from './SliderComponent';
import { VolumeSlider } from './VolumeSlider';
import Sound from 'react-native-sound';
import CustomMenu from './CustomMenu';
// import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
// import {translate} from 'react-i18next';
// import i18n from 'i18next';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; 
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";

const songs = [
    'sound_track.mp3',
    'sound_track_1.mp3',
    'sound_track_2.mp3'
  ];

  const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    en: () => require("../i18n/en.json"),
    es: () => require("../i18n/es.json"),
    fr: () => require("../i18n/fr.json")
  };
  
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
  );
  
  const setI18nConfig = (val) => {
    // fallback if no available language fits
   
    const fallback = { languageTag: "en", isRTL: false };
  
    let { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
  
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);

    if(val != ""){
        languageTag = val;
        // alert("setI18nConfig = "+languageTag);
    }

    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  };

  let menuRef = null;
  let textRef = React.createRef();

  const setMenuRef = ref => menuRef = ref;
  const hideMenu = () => menuRef.hide();
  const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_RIGHT);
  
  const onPress = () => showMenu();

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
         setI18nConfig(""); // set initial config
    }

    componentDidMount(){
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
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
    
      componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
      }
    
      handleLocalizationChange = () => {
        setI18nConfig();
        this.forceUpdate();
      };  
      
      changeLanguage(val){
        setI18nConfig(val);
        this.forceUpdate();
        hideMenu();
      }

    render(){
        
        const playSong = this.state.playSong;
       
        // const { t,i18n,navigation} = this.props;
        // const {navigate} = navigation;
        return(
            <ScrollView horizontal={true}>
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
                        <Text style={styles.lyrics_txt}>{translate(["songName",this.state.selectedIndex])}</Text>
                        <Text style={styles.album_name}>{translate("musicPlayer.songArtists")}</Text>
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
                <View style={styles.duration_edit}>
                    <Text style={styles.duration_txt}>{translate("musicPlayer.editButton")}</Text>
                </View>
                {/* <View style={{alignItems: "center"}}> */}
                    {/* <MenuProvider style={{flexDirection:"column"}}>
                   <Menu onSelect={value => this.changeLanguage(value)} style={{position:'absolute',top:20}}>

                        <MenuTrigger>
                        <Image 
                                source={require('../images/menu-vertical.png')}
                                style={styles.ic_menu}/>
                        </MenuTrigger>

                        <MenuOptions optionsContainerStyle={{paddingLeft:0,height:500,width:500}}>
                            <MenuOption value={"en"} customStyles={{height:48,width:100}}>
                                <Text style={styles.MenuText}>{translate("common.actions.toggleToEnglish")}</Text>
                            </MenuOption>
                            <MenuOption value={"fr"} customStyles={{height:48,width:100}}>
                                <Text style={styles.MenuText}>{translate("common.actions.toggleToFrench")}</Text>
                            </MenuOption>
                            <MenuOption value={"es"} customStyles={{height:48,width:100}}>
                                <Text style={styles.MenuText}>{translate("common.actions.toggleToSpanish")}</Text>
                            </MenuOption>
                        </MenuOptions>
                   </Menu>
                </MenuProvider> */}
                {/* </View> */}
            
               <View style={{ flex: 1, alignItems: "center"}}>
                    <Text
                        ref={textRef}
                        style={{ fontSize: 20, textAlign: "center" }}
                    >
                    </Text>
                
                    <TouchableOpacity onPress={onPress}>
                     <Image 
                                source={require('../images/menu-vertical.png')}
                                style={styles.ic_menu}/>
                    </TouchableOpacity>
                
                    <Menu ref={setMenuRef}>
                        <MenuItem onPress={value => this.changeLanguage("en")}>
                            <Text style={styles.MenuText}>{translate("common.actions.toggleToEnglish")}</Text>
                        </MenuItem>
                        <MenuItem onPress={value => {this.changeLanguage("fr");}}>
                            <Text style={styles.MenuText}>{translate("common.actions.toggleToFrench")}</Text>
                        </MenuItem>
                        <MenuItem onPress={value => this.changeLanguage("es")}>
                            <Text style={styles.MenuText}>{translate("common.actions.toggleToSpanish")}</Text>
                        </MenuItem>
                    </Menu>
                    </View> 
                
            </View> 
            <View style={styles.duration1}>
                <Text style={styles.add_sign}>+</Text>
                <Text style={styles.add_song}>{translate("musicPlayer.addSong")} </Text>
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
            </ScrollView>
       
          
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
    },
    duration_txt:{
        fontSize: 20,
        color: "#fff"
     },
     duration_edit:{
         borderRadius: 10,
         borderColor: "#fff",
         borderWidth: 1,
         padding: 20,
         textAlign: "center",
         alignItems: "center",
         margin: 10
      }
});

 export { MusicPlayer }