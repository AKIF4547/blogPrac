import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground, FlatList
} from 'react-native';
import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';

function News({navigation}) {
  const [pressedIndex, setPressedIndex] = useState(null);
  const [optionsIndex, setOptionsIndex] = useState(null);
  const [storedToken, setStoredToken] = useState(null);
  const [allBlogs, setAllBlogs] = useState(null);
  

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

  const getAllBlogs = async () => {
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
        'https://us-central1-user-management-api-888d4.cloudfunctions.net/app/allBlogs',
        requestOptions,
      );
      const result = await response.json();
      console.log('Blogs fetched:', result);
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
          const blogsResult = await getAllBlogs();
          console.log('Blogs fetched:', blogsResult);

          // Update state with fetched blogs only if the result is not null
          if (blogsResult !== null) {
            setAllBlogs(blogsResult);
          } else {
            console.error('Error fetching blogs.');
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

  const handlePress = index => {
    setPressedIndex(index === pressedIndex ? null : index);
  };
  const optionsPress = optIndex => {
    setOptionsIndex(optIndex === optionsIndex ? null : optIndex);
  };
  const renderTouchableOpacity = (index, label) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.box2TxtCont,
        pressedIndex === index
          ? {backgroundColor: '#000'}
          : {backgroundColor: '#F1F6FB'},
      ]}
      onPress={() => handlePress(index)}>
      <Text
        style={[
          styles.box2Txt,
          pressedIndex === index ? {color: '#FFF'} : {color: '#7F8E9D'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const categories = ['Breaking News', 'Political', 'Entertainment', 'Sports'];

  const optionsTouchableOpacity = (optIndex, label) => (
    <TouchableOpacity key={optIndex} onPress={() => optionsPress(optIndex)}>
      <Text
        style={[
          styles.optionsTxt,
          optionsIndex === optIndex ? {color: '#7269E3'} : {color: '#77838F'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const options = ['Recent', 'Popular', 'Trending', 'Market Reports'];

  return (
    // console.log("Token value 2:", storedToken),

    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor: '#FFF'}}>
        <View style={styles.topBox}>
          <Image
            style={styles.minarIcon}
            source={require('../assets/minar.png')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.topBoxTxt}>Bucharest, Romania</Text>
            <Text style={styles.topTxt2}>20 June 2020</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.sunIcon}
                source={require('../assets/sun.png')}
              />
              <Text style={styles.weatherTxt}>22°</Text>
            </View>
          </View>
        </View>

        <View style={styles.box2}>
          <Text style={styles.titleBox2}>Categories</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              {categories.map((category, index) =>
                renderTouchableOpacity(index, category),
              )}
            </View>
          </ScrollView>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.box3}>
            <View style={styles.box3ImgCont}>
              <ImageBackground
                style={styles.box3Img}
                source={require('../assets/presidentImage.png')}>
                <View style={styles.imageTextCont}>
                  <ImageBackground
                    source={require('../assets/rectangle543.png')}>
                    <Text style={styles.imageText}>
                      Romanian president expresses support for Ukraine's EU bid.
                      {'\n'}
                      <Text style={styles.readMore}>Read More...</Text>
                    </Text>
                  </ImageBackground>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.box3ImgCont}>
              <ImageBackground
                style={styles.box3Img}
                source={require('../assets/sea.png')}>
                <View style={styles.imageTextCont}>
                  <ImageBackground
                    source={require('../assets/rectangle543.png')}>
                    <Text style={styles.imageText}>
                      BSOG announces first Black Sea natural gas delivery to
                      Romania.{'\n'}
                      <Text style={styles.readMore}>Read More...</Text>
                    </Text>
                  </ImageBackground>
                </View>
              </ImageBackground>
            </View>
          </View>
        </ScrollView>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{paddingHorizontal: 10}}>
          <View style={styles.optionsContainer}>
            {options.map((option, optIndex) =>
              optionsTouchableOpacity(optIndex, option),
            )}

            {/* <TouchableOpacity style={styles.optionsTxt} >
                            <Text>
                                Recent
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionsTxt}>
                            <Text>
                                Popular
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionsTxt}>
                            <Text>
                                Trending
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionsTxt}>
                            <Text>
                                Market Reports 
                            </Text>
                        </TouchableOpacity> */}
          </View>
        </ScrollView>

        {allBlogs &&
          allBlogs.data &&
          allBlogs.data.Blogs &&
          allBlogs.data.Blogs.map((blog, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('blog', {
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topBox: {
    // height: 117,
    flexShrink: 0,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
    flexDirection: 'row',
    margin: 5,
  },
  minarIcon: {
    width: '22%',
    // height: 81,
    flexShrink: 0,
    borderRadius: 6,
    margin: 20,
    resizeMode: 'stretch',
  },
  textContainer: {
    flex: 1,
  },
  topBoxTxt: {
    // width: 168,
    flexShrink: 0,
    color: '#000',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 20,
  },
  topTxt2: {
    color: '#828282',
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  sunIcon: {
    display: 'flex',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  weatherTxt: {
    width: 50,
    height: 40,
    flexShrink: 0,
    color: '#1E2022',
    textAlign: 'right',
    fontFamily: 'Ubuntu',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 36,
    letterSpacing: 1,
  },
  box2: {
    display: 'flex',
    // width: 489,
    height: 99,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    flexShrink: 0,
  },
  titleBox2: {
    color: '#000',
    fontFamily: 'Ubuntu',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  box2TxtCont: {
    height: 40,
    flexShrink: 0,
    borderRadius: 80,
    marginRight: 20,
  },
  box2Txt: {
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 40,
    letterSpacing: 0.5,
    textAlign: 'center',
    paddingHorizontal: 25,
  },

  box3: {
    display: 'flex',
    // width: 572,
    // height: 245,
    padding: 10,
    alignItems: 'flex-start',
    // marginVertical: 20,
    flexShrink: 0,
    flexDirection: 'row',
  },
  box3ImgCont: {
    width: 266,
    height: 225,
    marginRight: 20,
  },
  box3Img: {
    width: 266,
    height: 225,
    flexShrink: 0,
    // borderRadius: 12,
    // resizeMode: 'cover',
  },
  imageTextCont: {
    flex: 1,
    justifyContent: 'flex-end',
    // width: 255,
    // height: 70,
    flexShrink: 0,
    // backgroundColor: 'rgba(255, 255, 255, 0.25)',
    // backdropFilter: 'blur(30px)',
    // marginVertical:7,
    // marginLeft:7,
    // position: 'absolute',
    marginHorizontal: 5,
    paddingVertical: 7,
    justifyContent: 'flex-end',
  },
  imageText: {
    display: 'flex',
    width: 216.646,
    // height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginHorizontal: 12,

    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  readMore: {
    color: '#000',
    fontFamily: 'Ubuntu',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  optionsTxt: {
    color: '#77838F',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 1,
    paddingRight: 45,
  },
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
});

export default News;
