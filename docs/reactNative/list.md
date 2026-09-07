---
outline: deep
---

# 列表

**reactNative** 中的列表和 **web** 中列表有些不同，它涉及到懒加载，如果按照 **web** 中列表去使用可能导致性能下降滑动效果差的问题。

## List

```jsx
import { Host, List, ListItem } from "@expo/ui";
import { getFeeds } from "@/services/apiFeed";
import { useQuery } from "@tanstack/react-query";

export default function () {

    // 获取列表数据
    const {
        data: feeds,
        isLoading,
        isSuccess,
        error,
    } = useQuery({
        queryKey: ["feeds"],
        queryFn: getFeeds,
    });

    // 列表渲染
    return (
        <Host style={{ flex: 1 }}>
            {isSuccess && (
            <List>
                {feeds.map((feed) => (
                <ListItem supportingText={feed.description} key={feed.id}>
                    {feed.title}
                </ListItem>
                ))}
            </List>
            )}
        </Host>
    )
}
```

在这个组件中，当列表数据 `feeds` 过长（如几百上千条）时，列表的渲染会十分慢。

## FlatList

FlatList是为解决List运行速度而产生的组件，是ReactNative的内置组件。

[FlatList文档](https://reactnative.dev/docs/flatlist)

```js
import {View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function () {

    // 数据源
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];
    
    type ItemProps = { title: string };

    // 每行内容
    const Item = ({title}: ItemProps) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );


    // 列表
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor={item => item.id}
            />
            </SafeAreaView>
        </SafeAreaProvider>
    );

}

```

FlatList 下有三个重要属性：

- data: 用来传入数据源
- renderItem: 每行内容
- keyExtractor: 每行唯一标识

> 更多属性可以查看文档。