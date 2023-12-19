import React, {useState,useEffect} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [result, setResult] = useState({ status: null, message: '' });

  const [loading, setLoading] = useState(false);

const loginCred = async()=>{

  setLoading(true); // Set loading to true before making the API call

  

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "login": email,
    "password": password,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://us-central1-user-management-api-888d4.cloudfunctions.net/app/login", requestOptions)
    .then(response => response.json())
    .then(async result => {
      console.log(result);

      setResult(result);
      if (result.status === 1) {
        const token = result.data.token;

        try {
          await AsyncStorage.setItem('token', token);
        } catch (error) {
          console.error('Error storing token:', error);
        }
        navigation.navigate('Home');
      } else {
        console.log(result.status);
        // Alert.alert('SignIn Failed', result.message);
       
      }
    })
    .catch(error => {console.log('error', error);
    Alert.alert('SignIn Failed', 'An error occurred during registration');
  })
    .finally(() => {
      setLoading(false);
    });


  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  
  // var raw = JSON.stringify({
  //   "login": email,
  //   "password": password,

  // });
  
  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };
  
  // fetch("https://us-central1-user-management-api-888d4.cloudfunctions.net/app/login", requestOptions)
  //   .then(response => response.json())
  //   .then(async result => {
  //     console.log(result);
  //     //  let token = result.token
     
  //     if (result.status === 1) {
  //     //  console.log('apna token:'+ result.data.token)
  //       const token = result.data.token;

  //       try{
  //         await AsyncStorage.setItem('token', token);
  //         // console.log('Token stored successfully:', token);
  //       } catch (error) {
  //         console.error('Error storing token:', error);
  //       }
  //         navigation.navigate('Home')
  //       } else {
  //         console.log(result.status);
  //     }
  // })
  //   .catch(error => console.log('error', error));

}
useEffect(() => {
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  checkToken();
}, [navigation]);
  return (
    
    <View style={styles.loginContainer}>
      <View style={styles.image}>
        <Image
          style={styles.imageContent}
          source={require('../assets/image1.png')}
        />
      </View>
      <View style={{ width: 326, alignItems: 'center' }}>
        <Text style={styles.textContainer}>
          Write, and read millions of articles from Romania and around the globe.
        </Text>
      </View>
      <View style = {{width:'80%', marginTop:20}}>
        



      <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          // onFocus={() => setEmailError('')}
        />
        {/* {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null} */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          // onFocus={() =>setPasswordError('')}
        />

      </View>
      

      {result.status === 0 && (
          <Text style={styles.errorText}>{result.message}</Text>
          )}
        <TouchableOpacity style={styles.signinButton} onPress={loginCred}>
        <Text style={styles.signinText}>Login</Text>
        {loading && <ActivityIndicator size="small" color="#FFF" />}
      </TouchableOpacity>
     
     



      <View style={styles.loginButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} >
          <View style={styles.googleLogin}>
            <Image
              style={styles.googleIcon}
              source={require('../assets/icon-google.png')}
            />
            <Text style={styles.googleText}>Login with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('blog')}>
          <View style={styles.facebookLogin}>

            <Image
              style={styles.facebookIcon}
              source={require('../assets/icon-facebook.png')}
            />
            <Text style={styles.facebookText}>Login with Facebook</Text>

          </View>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text style={styles.signupText1}>Don't have an account? </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('register')}>
            <Text style={styles.signupText2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    backgroundColor: '#FFF'
  },
  image: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContent: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  loginButton: {
    // marginTop: 20,
  },
  googleLogin: {
    flexDirection: 'row',
    // width: 327,
    // height: 42,
    marginHorizontal:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 52,
    backgroundColor: '#FFF',
        shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
    paddingVertical: 10,
    
    
  },
  googleText: {
    color: '#272C39',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.5,
    marginLeft: 10,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  facebookLogin: {
    
    marginTop: 10,
    flexDirection: 'row',
    // width: 327,
    // height: 42,
    marginHorizontal:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 52,
    
    backgroundColor: '#FFF',
        shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
    paddingVertical: 10,
  },
  facebookText: {
    color: '#272C39',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.5,
    marginLeft: 10,
  },
  facebookIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  signup: {
    flexDirection: 'row',
    marginTop: 30,
    width: 327,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText1: {
    color: '#000',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  signupText2: {
    color: '#7269E3',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  signinButton: {
    backgroundColor: '#7269E3',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:15,
    justifyContent: 'center',
    // width:'50%',
    alignContent:'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  signinText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
