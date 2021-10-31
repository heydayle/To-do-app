import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

type Props = {
  imgSrc?: string,
  name?: string,
  date?: string,
  kind?: {},
  description?: string,
  wrapperStyle?: Style,
};

// const checkKind = (Props) => {
//   const {kind} = props;
//   if (kind === '1')
// }

export default function Pinned(props: Props) {
  const {imgSrc, name, date, kind, description, wrapperStyle} = props;
  return (
    <View style={styles.contentMainLeft}>
      <View style={styles.leftPin}>
        <Image source={{uri: imgSrc}} style={styles.iconPin} />
      </View>
      <View style={styles.rightPin}>
        <Text style={styles.titlePin}>{name}</Text>
        <Text style={styles.datePin}>{date}</Text>
        <Text
          style={[
            Object.keys(kind).length !== 0
              ? kind.type === '2'
                ? styles.kindPinPersonal
                : styles.kindPinSpecial
              : styles.kindPinNone,
            wrapperStyle,
          ]}>
          {kind.name}
        </Text>
        <Text style={styles.descriptionPin}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftPin: {},
  iconPin: {
    width: 50,
    height: 50,
  },
  rightPin: {
    marginLeft: 30,
  },
  titlePin: {
    fontSize: 20,
  },
  datePin: {
    fontSize: 15,
  },
  kindPinPersonal: {
    backgroundColor: '#F8D57E',
  },
  kindPinSpecial: {
    backgroundColor: '#7EF8AF',
  },
  kindPinNone: {
    backgroundColor: '#fff',
  },
  descriptionPin: {
    width: '60%',
  },
  contentMainLeft: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 30,
    borderRadius: 30,
    marginTop: 10,
  },
});
