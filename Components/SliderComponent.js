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

 class SliderComponent extends React.Component{

        render(){
            return(
                <View style={styles.duration}>
                 <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#8a8a8a"
                   />
                 <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#8a8a8a"/>
                 <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#8a8a8a"/>
                     <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#8a8a8a"/>
                     <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#8a8a8a"/>
                     <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#8a8a8a"/>
                </View>
            )
        }
    }
        
const styles = StyleSheet.create({
    duration:{
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
        paddingBottom: 5,
        paddingTop: 5,
        textAlign: "center",
        alignItems: "center",
        margin: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center"
    },
    slider:{
        transform: [{ rotate: '90deg' }],
        width: 105,
        height: 150,
    }
});

 export { SliderComponent }