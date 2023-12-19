import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { AsyncStorage } from 'react-native';

function Register({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [about, setAbout] = useState('');
  // const [photo, setPhoto] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNo: '',
    about: '',
    // photo: '',
  });
  const [result, setResult] = useState({ status: null, message: '' });
  const [loading, setLoading] = useState(false);

  const sendCred = async () => {
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNo: '',
      about: '',
      // photo: '',
    });

    let hasError = false;
    if (!firstName) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: 'Please enter your first name' }));
      hasError = true;
    }
    if (!lastName) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Please enter your last name' }));
      hasError = true;
    }
    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter your email' }));
      hasError = true;
    }
    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Please enter your password' }));
      hasError = true;
    }
    if (!phoneNo) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNo: 'Please enter your phone number' }));
      hasError = true;
    }
    if (!about) {
      setErrors((prevErrors) => ({ ...prevErrors, about: 'Please provide some information about yourself' }));
      hasError = true;
    }
    // if (!photo) {
    //   setErrors((prevErrors) => ({ ...prevErrors, photo: 'Please enter the URL for your photo' }));
    //   hasError = true;
    // }

    if (hasError) {
      return;
    }

    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      email: email,
      phoneno: phoneNo,
      password: password,
      about: about,
      // photo: photo,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://us-central1-user-management-api-888d4.cloudfunctions.net/app/signup", requestOptions);
      const result = await response.json();

      setResult(result);

      if (result.status === 1) {
        navigation.navigate('login');
      } else {
        console.log("Signup failed. Status is not 1.");
        Alert.alert('Registration Failed', result.message);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Registration Failed', 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#FFF' }}>

      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={styles.imageContent}
            source={require('../assets/image1.png')}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Registration</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(text) => {
              setFirstName(text);
            }}
            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }))}
          />
          {errors.firstName ? (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(text) => {
              setLastName(text);
            }}
            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }))}
          />
          {errors.lastName ? (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
            }}
            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, email: '' }))}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, password: '' }))}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Phone No"
            keyboardType="phone-pad"
            onChangeText={(text) => {
              setPhoneNo(text);
            }}
            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, phoneNo: '' }))}
          />
          {errors.phoneNo ? (
            <Text style={styles.errorText}>{errors.phoneNo}</Text>
          ) : null}
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="About"
            multiline
            onChangeText={(text) => {
              setAbout(text);
            }}
            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, about: '' }))}
          />
          {errors.about ? (
            <Text style={styles.errorText}>{errors.about}</Text>
          ) : null}
          {/* <TextInput
            style={styles.input}
            placeholder="Photo URL"
            onChangeText={(text) => {
              setPhoto(text);
            }}
            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, photo: '' }))}
          />
          {errors.photo ? (
            <Text style={styles.errorText}>{errors.photo}</Text>
          ) : null} */}
        </View>

        {result.status === 0 && (
          <Text style={styles.errorText}>{result.message}</Text>
          )}

        <TouchableOpacity style={styles.registerButton} onPress={sendCred}>
          <Text style={styles.buttonText}>Register </Text>
          {loading && <ActivityIndicator size="small" color="#FFF" />}
        </TouchableOpacity>
        <View style={styles.signin}>
          <Text style={styles.signinText1}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.signinText2}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  multilineInput: {
    height: 70,
  },
  registerButton: {
    backgroundColor: '#7269E3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signin: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText1: {
    color: '#000',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  signinText2: {
    color: '#7269E3',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  image: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContent: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Register;
