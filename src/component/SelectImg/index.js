import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import images from '../../res/Images';
import {TouchableOpacity} from 'react-native-web';
import Colors from '../../res/Colors';

type Props = {
  imgSrc?: string,
};

export default function SelectImg(props: Props) {
  const {imgSrc} = props;
  const [img, setImg] = useState({
    src: '',
    style: StyleSheet,
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setImg({
            src: imgSrc,
            style: modalStyle.selectImg,
          });
        }}
        style={
          imgSrc == img.src
            ? [modalStyle.SelectImg, modalStyle.imgNomal]
            : modalStyle.imgNomal
        }>
        <Image source={imgSrc} style={modalStyle.imgSelectStyle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const modalStyle = StyleSheet.create({
  selectImg: {
    backgroundColor: Colors.gray70,
  },
  imgNomal: {
    padding: 10,
    borderRadius: 15,
  },
  imgSelectStyle: {
    width: 35,
    height: 35,
  },
});
