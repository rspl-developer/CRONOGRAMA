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

 class CustomMenu extends React.Component{

  render(){
      return(
        <View>
        <Text>Hello world!</Text>
        <Menu>
          <MenuTrigger text='Select action' />
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Save`)} text='Save' />
            <MenuOption onSelect={() => alert(`Delete`)} >
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
          </MenuOptions>
        </Menu>
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

 export { CustomMenu }