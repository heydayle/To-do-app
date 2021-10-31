import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TouchableHighlight} from 'react-native-web';
import images from '../../res/Images';
import Colors from '../../res/Colors';

type Props = {
  des?: string,
  id?: string,
  wrapper?: StyleSheet,
};

export default function NoteItem(props: Props) {
  const {des, id, wrapper} = props;
  return (
    <View style={styles.container}>
      <View style={[noteStyle.itemNoteStyle, wrapper]}>
        <Text style={{}}>{des}</Text>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        </View>
      </View>
    </View>
  );
}

const noteStyle = StyleSheet.create({
  itemNoteStyle: {
    backgroundColor: Colors.grayf9,
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 'auto',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
