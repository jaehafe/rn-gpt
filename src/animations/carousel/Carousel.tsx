import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

// import 'react-native-gesture-handler';

import {
  GestureHandlerRootView,
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');

type DataType = {
  title: string;
  location: string;
  date: string;
  poster: any;
};

const DATA: DataType[] = [
  {
    title: 'Afro vibes',
    location: 'Mumbai, India',
    date: 'Nov 17th, 2020',
    poster: require('./assets/1.jpg'),
  },
  {
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    poster: require('./assets/1.jpg'),
  },
  {
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    poster: require('./assets/1.jpg'),
  },
  {
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    poster: require('./assets/1.jpg'),
  },

  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster: require('./assets/1.jpg'),
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster: require('./assets/1.jpg'),
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster: require('./assets/1.jpg'),
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

interface OverflowItemsProps {
  data: {
    title: string;
    location: string;
    date: string;
    poster: string;
  }[];
  scrollXAnimated: any;
}

const OverflowItems = ({data, scrollXAnimated}: OverflowItemsProps) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  {/* <EvilIcons
                    name="location"
                    size={16}
                    color="black"
                    style={{marginRight: 5}}
                  /> */}

                  {item.location}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function Carousel() {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState<number>(0);
  const setActiveIndex = React.useCallback((activeIndex: number) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  }, []);

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  }, [index, data]);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, [scrollXAnimated, scrollXIndex]);

  const leftFling = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      if (index === data.length - 1) {
        return;
      }
      runOnJS(setActiveIndex)(index + 1);
    });

  const rightFling = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      if (index === 0) {
        return;
      }
      // setActiveIndex(index - 1);
      runOnJS(setActiveIndex)(index - 1);
    });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={leftFling}>
        <GestureDetector gesture={rightFling}>
          <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
            <FlatList
              data={data}
              keyExtractor={(_, index) => String(index)}
              horizontal
              inverted
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                padding: SPACING * 2,
                marginTop: 50,
              }}
              scrollEnabled={false}
              removeClippedSubviews={true}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [style, {zIndex: data.length - index}];
                return (
                  <View style={newStyle} index={index} {...props} key={index}>
                    {children}
                  </View>
                );
              }}
              renderItem={({item, index}) => {
                const inputRange = [index - 1, index, index + 1];
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -100],
                });
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0.8, 1, 1.3],
                });
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                });

                return (
                  <Animated.View
                    key={index}
                    style={{
                      position: 'absolute',
                      left: -ITEM_WIDTH / 2,
                      opacity,
                      transform: [
                        {
                          translateX,
                        },
                        {scale},
                      ],
                    }}
                  >
                    <Image
                      source={item.poster}
                      style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        borderRadius: 14,
                      }}
                    />
                  </Animated.View>
                );
              }}
            />
          </SafeAreaView>
        </GestureDetector>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});
