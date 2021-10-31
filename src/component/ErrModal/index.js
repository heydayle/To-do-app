import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import {
  modalStyle,
  noteStyle,
  stylesRight,
  styles,
} from '../../res/Styles/Styles';
import Modal from 'modal-react-native-web';
import Colors from '../../res/Colors';
import {ErrContext} from '../dataContext';

type Props = {};

export default function ErrModal(props: Props) {
  const {modalVisibleErr, setModalVisibleErr} = useContext(ErrContext);

  return (
    <Modal //______________________________________modal Err
      visible={modalVisibleErr.status}
      animationType="slide"
      transparent={true}>
      >
      <View style={modalStyle.centeredViewErr}>
        <View style={modalStyle.modalViewErr}>
          <Text
            style={[
              modalStyle.textStyleErr,
              {color: Colors.white, marginBottom: 10},
            ]}>
            {modalVisibleErr.textError}
          </Text>
          <TouchableHighlight
            style={[
              modalStyle.button,
              {
                backgroundColor: Colors.white,
              },
            ]}
            onPress={() => {
              setModalVisibleErr({
                status: false,
                textError: modalVisibleErr.textError,
              });
            }}>
            <Text style={modalStyle.textStyleErr}>OK</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}
