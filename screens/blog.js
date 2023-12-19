import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Spinner } from '@ui-kitten/components';

function Blog({ route, navigation }) {
  const [storedToken, setStoredToken] = useState(null);
  const [myBlog, setMyBlog] = useState(null);

  const { UserID, BlogID } = route.params;
// console.log({UserID});
// console.log({BlogID});
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setStoredToken(token);
      console.log('Token value (upload):', token);
      return token; // Return the token for better async handling
    } catch (error) {
      console.error('Error fetching token (upload):', error);
      return null;
    }
  };

  const getMyBlog = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.error('Token not available.');
        navigation.navigate('login');
        return null;
      }

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/json');
      var raw = JSON.stringify({
        userId: UserID,
        BlogID: BlogID,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://us-central1-user-management-api-888d4.cloudfunctions.net/app/getBlogbyID',
        requestOptions
      );

      if (!response.ok) {
        console.error('Error fetching blog:', response.status);
        return null;
      }

      const result = await response.json();
      console.log(result);

      setMyBlog(result); // Assuming the API response is a single blog object
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMyBlog();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!myBlog) {
    return (
      <View style = {{flex:1,justifyContent: 'center', alignContent: 'center', alignItems:'center'}}>
        <Text>Loading...</Text>
        <Spinner/>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#FFF' }}>
      <View >
          <Image
            style={styles.blogpic}
            source={{uri: `${myBlog.data.image}`}}
          />
          <View style={styles.txtContainer}>
            <Text style={styles.text}>{myBlog.data.title}</Text>
            <Text style={styles.text2}>{myBlog.data.content}</Text>
          </View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

    blogpic: {

        width: '100%',
        height: 380,
        flexShrink: 0,
        borderRadius: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        resizeMode: 'stretch',
        // backgroundColor: 'rgba(0, 0, 0, 0)',

    },

    txtContainer: {
        display: 'flex',
        // width: 386,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        // gap: 5,
        marginTop: 20,
        marginHorizontal: 20,
        // width: '100%',
    },
    text: {
        color: '#1E2022',
        fontFamily: 'Ubuntu',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: 1,
    },
    text2: {
        color: '#77838F',
        fontFamily: 'Ubuntu',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 1,
        marginTop: 20,
    },
    similarNewsContainer: {
        // width: 386,
        // height: 228,
        flexShrink: 0,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    similarText: {
        color: '#1E2022',
        fontFamily: 'Ubuntu',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 18, // Use the desired line height value
        letterSpacing: 1,
        marginBottom: 10,

    },
    imageContainer: {
        
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageStyle: {
        borderRadius: 12,
        overflow: 'hidden', // To ensure the borderRadius is applied correctly
        width: '47%',
        resizeMode: 'stretch',
    }
}
);

export default Blog;



{/* <ScrollView>

<View style = {{backgroundColor: '#FFF'}}>

    <Image
        style={styles.blogpic}
        source={require('../assets/BLOG.jpg')}
    />
    <View style={styles.txtContainer}>
        <Text style={styles.text}>
            Romania travel: Destinations for a spring break.
        </Text>
        <Text style={styles.text2}>
            Nature came back to life, revealing wonderful mixes of colors and fragrances  – it’s springtime! This is a perfect time for trips outdoors, so we’ve selected five destinations in Romania to try this season.
        </Text>


    </View>
    <View style={styles.similarNewsContainer}>
        <Text style={styles.similarText}>
            Similar News
        </Text>
        <View style={styles.imageContainer}>
            <Image
                style={styles.imageStyle}
                source={require('../assets/image8.png')}
            />
            <Image
                style={styles.imageStyle}
                source={require('../assets/image9.png')}
            />
        </View>
    </View>

</View>
</ScrollView> */}