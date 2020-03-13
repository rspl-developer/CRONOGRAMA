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

 class TimeDuration extends React.Component{

    render(){
        return(
            <View style={styles.duration}>
                <Text style={styles.duration_txt}>02:50</Text>
                <Text style={styles.duration_txt}>0:00 / 10:00</Text>
            </View>
        )
    }

 }

 const styles = StyleSheet.create({
    duration_txt:{
       fontSize: 16,
       color: "#fff"
    },
    duration:{
        borderRadius: 5,
        borderColor: "#fff",
        borderWidth: 1,
        padding: 20,
        textAlign: "center",
        alignItems: "center",
        margin: 10,
        marginLeft: 5
     },
});


 export { TimeDuration }