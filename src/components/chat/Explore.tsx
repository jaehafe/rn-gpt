import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {RngptSharedDefaults} from '@/native-modules/widget';
import Button from '../ui/Button';
import {defaultStyles} from '@/constants/Styles';
import Colors from '@/constants/Colors';

export default function Explore() {
  const rngptModules = new RngptSharedDefaults();

  const [widgetText, setWidgetText] = useState('initial widget data');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const updateWidget = async () => {
      try {
        const widgetData = {
          rngptWidgetData: JSON.stringify({todo: widgetText}),
        };
        await rngptModules.set(widgetData);

        console.log('Widget data updated:', widgetData);
      } catch (error) {
        console.error('Failed to update widget:', error);
      }
    };

    if (widgetText) {
      updateWidget();
    }
  }, [widgetText]);

  const handleSave = () => {
    setWidgetText(inputText);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Enter widget data"
      />
      {/* <Button onPress={handleSave}>
        <Text>Widget Text Save</Text>
      </Button> */}
      <TouchableOpacity
        style={[defaultStyles.btn, styles.btnPrimary]}
        onPress={handleSave}
      >
        <Text style={styles.btnPrimaryText}>Create account</Text>
      </TouchableOpacity>
      <Text>{widgetText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
});
