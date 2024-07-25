import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TodoType, useQueryTodo} from '@/apis/hooks/Todo/useQueryTodo';
import {FlashList} from '@shopify/flash-list';

export default function Todo() {
  const pageSize = 10;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useQueryTodo(pageSize);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({item}: {item: TodoType}) => (
    <View
      style={{
        width: '100%',
      }}
    >
      <Text style={styles.todoTitle}>{item.title}</Text>
    </View>
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlashList
        style={{width: '100%'}}
        contentContainerStyle={{
          backgroundColor: 'red',
        }}
        estimatedItemSize={100}
        data={data?.pages.flatMap(page => page.content) ?? []}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingNextPage ? <Text>Loading more...</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
    padding: 16,
  },
});
