import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Liked({ navigation}) {
//   const [token, setToken] = useState('');

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         setToken(storedToken);
//       } catch (error) {
//         console.error('Error fetching Token:', error);
//       }
//     };

//     fetchToken();
//   }, []);

const [storedToken, setStoredToken] = useState(null);
const [myBlogs, setMyBlogs] = useState(null);


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

// ...

const getMyBlogs = async () => {
  try {
    const token = await getToken();
    if (!token) {
      console.error('Token not available.');
      navigation.navigate('login');
      return null;
    }

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders, // Include headers in the request options
      redirect: 'follow',
    };

    const response = await fetch(
        "https://us-central1-user-management-api-888d4.cloudfunctions.net/app/getUserBlogs",
      requestOptions,
    );
    const result = await response.json();
    console.log('My Blogs:', result);
    return result; // Return the fetched blogs
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return null;
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = await getToken();
      console.log('Token fetched:', token);

      if (token) {
        // Token is available, proceed to fetch blogs
        const blogsResult = await getMyBlogs();
        console.log('My Blogs:', blogsResult);

        // Update state with fetched blogs only if the result is not null
        if (blogsResult !== null) {
          setMyBlogs(blogsResult);
        } else {
          console.error('Error fetching My blogs.');
        }
      } else {
        console.error('Token not available.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

// ...

  return (
    <View>
      <Text>Profile screen</Text>
  
      {myBlogs &&
          myBlogs.data &&
          myBlogs.data.Blogs &&
          myBlogs.data.Blogs.map((blog, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('blog',  {
                UserID: blog.UserID,
                BlogID: blog.id,
              } )}>
              <View style={styles.bolgsContainer}>
                {/* Assuming you have image and text data in the blog object */}
                <Image
                  style={styles.blogPic}
                  source={{uri: `${blog.image}`}} // Change this to the actual image property in your blog object
                />
                <View style={styles.blogTxtCont}>
                  <Text style={styles.blogTxt1}>{blog.title}</Text>
                  <Text style={styles.blogTxt2}>
                    {moment.utc(`${blog.createdAt}`).format('DD MMM YYYY')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

    </View>
  );
}

const styles = StyleSheet.create({
    bolgsContainer: {
        flexDirection: 'row', // default is 'column'
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between', // for gap
        borderRadius: 12,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 4,
        marginBottom: 10,
        marginHorizontal: 5,
      },
      blogPic: {
        width: 88,
        height: 81,
        borderRadius: 6,
        overflow: 'hidden',
        marginRight: 12,
      },
      blogTxt1: {
        width: 276,
        height: 44,
        color: '#000',
        fontFamily: 'Ubuntu',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20,
      },
      blogTxt2: {
        color: '#828282',
        fontFamily: 'Ubuntu',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20,
      },
      blogTxtCont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 13,
      },
})



export default Liked;