import {Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

const Header = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.title}>Edit</Text>
      </Pressable>
      <View style={{flexDirection: 'row', columnGap: 10}}>
        <FontAwesome6Icon size={18} name="camera" color={'#5FA2EF'} />
        <FontAwesome6Icon size={18} name="edit" color={'#5FA2EF'} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#5FA2EF',
    fontSize: 18,
  },
});
