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

 class EditComponent extends React.Component{

    render(){
        return(
            <View style={styles.duration}>
                <Text style={styles.duration_txt}>{translate("musicPlayer.songArtists")}</Text>
            </View>
        )
    }

 }

 const styles = StyleSheet.create({
    duration_txt:{
       fontSize: 20,
       color: "#fff"
    },
    duration:{
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
        padding: 20,
        textAlign: "center",
        alignItems: "center",
        margin: 10
     },
});


 export { EditComponent }