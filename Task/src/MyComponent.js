import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';

const fetchData = async (postId) => {
    let id = postId != undefined ? postId : ""
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return {};
    }
};

const heavyComputation = (data) => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.random() + data.id;
    }
    return result;
};

const ListItem = ({ item, onPress }) => {
    const computedDetails = useMemo(() => heavyComputation(item), [item]);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text>ID: {item.id}</Text>
                <Text>Title: {item.title}</Text>
                <Text>Computed Details: {computedDetails}</Text>
            </View>
        </TouchableOpacity>
    );
};

const PostDetails = ({ postId }) => {
    const [postDetails, setPostDetails] = useState({});

    useEffect(() => {
        if (!postId) return;

        const fetchPostDetails = async () => {
            const result = await fetchData(postId);
            setPostDetails(result);
        };
        fetchPostDetails();
    }, [postId]);

    useEffect(() => {
        console.log('PostDetails component re-rendered due to props change');
    }, [postId]);

    if (!postId || Object.keys(postDetails).length === 0) {
        return <></>;
    }

    return (
        <View style={{ padding: 10, backgroundColor: "#808080" }}>
            <Text>ID: {postDetails.id}</Text>
            <Text>Title: {postDetails.title}</Text>
            <Text>Body: {postDetails.body}</Text>
        </View>
    );
};

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            const result = await fetchData();
            setData(result);
        };
        fetchDataAndSetData();
    }, []);

    const handleItemPress = useCallback((itemId) => {
        setSelectedItemId(itemId);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ListItem item={item} onPress={() => handleItemPress(item.id)} />}
                keyExtractor={(item) => item.id.toString()}
            />
            <PostDetails postId={selectedItemId} />
        </View>
    );
};

export default MyComponent;
