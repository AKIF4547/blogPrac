// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const App = () => {
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})


import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import Login from './screens/login';
import Signup from './screens/signup';
import News from './screens/news';
import Profile from './screens/profile';
import Shorts from './screens/shorts';
import Liked from './screens/liked';
import Search from './screens/search';
import Blog from './screens/blog';
import AddPost from './screens/addPost';
import Register from './screens/register';
import Logout from './screens/logout';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomePage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {fontWeight: 'bold'},
        headerRight: () => (
          <TouchableOpacity
            style={{backgroundColor: '#FFF', padding: 5, borderRadius: 25}}>
            <Image
              source={require('./assets/notification.png')}
              // style = {{backgroundColor: '#FFF',}}
            />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen
        name="news"
        component={News}
        options={{
          headerTitle: 'News',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('logout')}>
              <Image source={require('./assets/menu.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="blog"
        component={Blog}
        options={{
          headerTransparent: true,
          headerTitle: null,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('news')}
              style={{backgroundColor: '#FFF', padding: 5, borderRadius: 25}}>
              <Image source={require('./assets/arrow-left.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="logout" component={Logout} />
    </Stack.Navigator>
  );
}
function ProfileData({navigation}){

}
function Home({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: 'orange',
        tabBarActiveTintColor: '#000',
        tabBarShowLabel: false,
        headerTitleAlign:'center',
        headerTitleStyle: {fontWeight: 'bold'}
      }}>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: () => (
            <Image
              source={require('./assets/home.png')}
              style={{width: 30, height: 30, tintColor: '#292D32'}}
            />
          ),
        }}
      />

      {/* <Tab.Screen name="shorts" component={Shorts} options={{ title: 'Shorts', tabBarIcon: () => (<Image source={require('./assets/trend-up.png')} />) }} /> */}
      <Tab.Screen
        name="liked"
        component={Liked}
        options={{
          title: 'Liked',
          tabBarIcon: () => <Image source={require('./assets/heart.png')} />,
        }}
      />
      <Stack.Screen
        name="addPost"
        component={AddPost}
        options={{
          headerShown: false,
          title: 'Add',
          tabBarIcon: () => <Image source={require('./assets/add.png')} />,
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          title: 'Search',
          tabBarIcon: () => <Image source={require('./assets/search.png')} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: () => <Image source={require('./assets/user.png')} />,
        }}
      />
    </Tab.Navigator>
  );
}

function App({navigation}) {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="addPost" component={AddPost} options={{ headerShown: false }} /> */}
          <Stack.Screen
            name="login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="blog"
            component={Blog}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;
