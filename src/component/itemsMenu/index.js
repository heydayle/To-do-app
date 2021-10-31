import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useHistory} from 'react-router';
import {TouchableOpacity} from 'react-native-web';
import type {Style} from '../../typeDefinition';

type Props = {
  name?: string,
  onPress?: Function,
  wrapperStyle?: Style,
};

export default function ItemHeaderMenu(props: Props) {
  //const history = useHistory();
  const {name, onPress, wrapperStyle} = props;
  return (
    <TouchableOpacity style={[styles.itemMenu, wrapperStyle]} onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.nameItem}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemMenu: {
    width: '15%',
    textAlign: 'center',
  },
  nameItem: {
    fontSize: 20,
    color: '#fff',
  },
});
