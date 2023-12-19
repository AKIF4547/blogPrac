import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {IndexPath, Select, SelectItem, Spinner} from '@ui-kitten/components';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function AddPost({navigation}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(new IndexPath(0));
  const [tags, setTags] = useState([]);
  // const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [storedToken, setStoredToken] = useState(null);
  const [result, setResult] = useState({status: null, message: ''});

  const [selectedImage, setSelectedImage] = useState('');

  const categories = [
    {label: 'Hacking', value: 'xOjBMBQ5GwScp4uB6j18'},
    {label: 'Job', value: 'J9ZRj9Hm4mCR5c3grpSM'},
    {label: 'Daily Life', value: 'E66fUL79WYXZmzpHVvGp'},
    {label: 'Technology', value: '9bHN8EYtgpE1V98dBOJM'},
    {label: 'Fashion', value: 'xCeKT9tuMZZe6uGoJIcK'},
    {label: 'Sports', value: 'MVGtZyHETK1l9W7a5bkm'},
    {label: 'Cinema', value: '9rcibUswjdGJLMKWyLcm'},
    {label: 'Music', value: 'i1hFtAuJg3PvHNOGyIPf'},
    {label: 'Gaming', value: 'nNcKaczlHGLgqaFcOaF6'},
    {label: 'Life', value: 'CXd1FIKThzUoh9GamZz3'},
  ];

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

  const openGallery = () => {
    // Alert.alert("called")
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      // maxHeight: 2000,
      // maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      // Alert.alert("hit")
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        // let imageUri = response.uri || response.assets?.[0]?.uri;
        // Check if base64 data is available in assets
      let base64Image = response.assets?.[0]?.base64;

      // if (!base64Image) {
      //   // If not, try to get base64 data from the data URI
      //   const dataUri = response.uri || response.assets?.[0]?.uri;
      //   const base64Match = dataUri.match(/data:image\/([a-zA-Z]*);base64,([^"]*)/);
      //   base64Image = base64Match ? base64Match[2] : null;
      // }
      let imgsrc = `data:${response.assets?.[0]?.type};base64,${base64Image}`
        setSelectedImage(imgsrc);

        console.log(response);
      }
    });
  };
  const uploadPost = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        console.error('Token not available.');
        // navigation.navigate('login');
        return null;
      }

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const categoryIDString = categories[category.row].value;

      myHeaders.append('Content-Type', 'application/json');
      var raw = JSON.stringify({
        title: title,
        content: content,
        categoryID: categoryIDString,
        tags: tags.split(','),
        // "tags": ["#CYBER SECUIRTY", "#PASSWORD CRACKING"],
        image: selectedImage,
        // image: 'asd',
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://us-central1-user-management-api-888d4.cloudfunctions.net/app/AddBlog',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setResult(result);
        })
        .catch(error => console.log('error', error))

        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('Error Posting blogs:', error);
      return null;
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = await getToken();
  //       console.log('Token fetched:', token);

  //       if (token) {
  //         // Token mil gya, proceed to fetch blogs
  //         const blogsResult = await getAllBlogs();
  //         console.log('Blogs fetched:', blogsResult);

  //         // Update state with fetched blogs only if the result is not null
  //         if (blogsResult !== null) {
  //           setAllBlogs(blogsResult);
  //         } else {
  //           console.error('Error fetching blogs.');
  //         }
  //       } else {
  //         console.error('Token not available.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={styles.container}>
        
          
        <TouchableOpacity style={styles.imageContainer} onPress={openGallery}>
          <Text style={styles.imageTxt}>Upload Image</Text>
          {selectedImage!=''?
          <Image
          style={{width: 100, height: 50, resizeMode: 'contain', borderWidth: 1, borderColor: 'red'}}
          source={{uri: selectedImage}}
        />
        :
            <Image
            style={styles.uploadImage}
            source={require('../assets/upload.png')}
          />}
        </TouchableOpacity>
        

        <Text style={styles.txt}>Title:</Text>
        <TextInput
          style={styles.input}
          // value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.txt}>Content:</Text>
        <TextInput
          style={styles.input}
          // value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.txt}>Category:</Text>

        <Select
          style={{marginBottom: 16}}
          category={category}
          onSelect={index => setCategory(index)}
          value={categories[category.row].label}>
          {categories.map((item, index) => (
            <SelectItem key={index} title={item.label} />
          ))}
        </Select>

        <Text style={styles.txt}>Tags:</Text>
        <TextInput
          style={styles.input}
          // value={tags}
          onChangeText={setTags}
        />

        {/* <Text style={styles.txt}>Image:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
      /> */}

        {result.status === 0 && (
          <Text style={styles.errorText}>{result.message}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={uploadPost}>
          {/* <Text style={{color: '#FFF', fontSize: 17}}>Upload Post</Text>
          {loading && <Spinner/>} */}
          {loading ? (
            // <ActivityIndicator size="small" color="#FFF" />
            <Spinner status="basic" />
          ) : (
            <Text style={{color: '#FFF', fontSize: 17}}>Upload Post</Text>
          )}
        </TouchableOpacity>

        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  txt: {
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 6,
    marginBottom: 16,
  },
  imageContainer: {
    height: '30%',
    flexShrink: 0,
    borderRadius: 15,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  imageTxt: {
    // flexShrink: 0,
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  uploadImage: {
    // flexShrink: 0,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7269E3',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 100,
    borderRadius: 10,
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddPost;
