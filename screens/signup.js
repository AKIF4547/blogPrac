import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function Signup({ navigation }) {
    const initialTopicsState = [
        { name: 'News', isVectorVisible: false, isPressed: false },
        { name: 'Business', isVectorVisible: false, isPressed: false },
        { name: 'Economy', isVectorVisible: false, isPressed: false },
        { name: 'Music', isVectorVisible: false, isPressed: false },
        { name: 'Design', isVectorVisible: false, isPressed: false },
        { name: 'Fashion', isVectorVisible: false, isPressed: false },
        { name: 'LifeStyle', isVectorVisible: false, isPressed: false },
        { name: 'Health', isVectorVisible: false, isPressed: false },
        { name: 'Science', isVectorVisible: false, isPressed: false },
        { name: 'Technology', isVectorVisible: false, isPressed: false },
        { name: 'Education', isVectorVisible: false, isPressed: false },
        { name: 'Sport', isVectorVisible: false, isPressed: false },
    ];

    const [topics, setTopics] = useState(initialTopicsState);

    const handleToggle = (index) => {
        const updatedTopics = [...topics];
        updatedTopics[index].isVectorVisible = !updatedTopics[index].isVectorVisible;
        updatedTopics[index].isPressed = !updatedTopics[index].isPressed;
        setTopics(updatedTopics);
    };

    return (
        <View style={styles.signupContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 50, marginTop: 40 }}>
                <View style={styles.textContainer}>
                    <Text style={styles.text1}>What is your favorite topic?</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image1} source={require('../assets/person.png')} />
                </View>
            </View>

            <View style={styles.box}>
                {topics.map((topic, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.topics,
                            { backgroundColor: topic.isPressed ? '#000' : '#ECEFF5' },
                        ]}
                        onPress={() => handleToggle(index)}
                    >
                        {topic.isVectorVisible && (
                            <Image style={styles.vector} source={require('../assets/vector.png')} />
                        )}
                        <Text style={[styles.topicsText, { color: topic.isPressed ? '#FFF' : '#7F8E9D' }]}>
                            {topic.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <View style={styles.ellipse1} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.ellipse1} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.rec} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>

                    <View style={styles.contBtn}>
                        <Text style={styles.btnTxt}>
                            Continue
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    signupContainer: {
        // width: 414,
        // height: 896,
        // padding: 10,
        backgroundColor: '#FFF',
        flex:1,
    },
    textContainer: {
        display: 'flex',
        // width: 250,
        // height: 90,
        padding: 16,
        alignItems: 'flex-start',
        gap: 10,
        flexShrink: 0,
    },
    text1: {
        width: 242,
        flexShrink: 0,
        color: '#000',
        fontFamily: 'Ubuntu',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    imageContainer: {
        width: 250,
        // height: 265.84,
        marginBottom: 50,
        flexShrink: 0,
        marginTop: 15,
    },
    image1: {
        display: 'flex',
        width: 200.895,
        height: 200.895,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        padding: 16,
    },
    topics: {
        display: 'flex',
        // width: '30%',
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 5,
    },
    topicsText: {
        textAlign: 'center',
        fontFamily: 'Ubuntu',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    vector: {
        width: 12,
        height: 9.272,
    },
    footer: {
        display: 'flex',
        // flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        gap: 40,
        // flex:1,
        alignSelf: 'center',
        justifyContent:'flex-end',
        marginTop:50,
        
    },
    ellipse1: {
        width: 8,
        height: 8,
        marginRight: 5,
        backgroundColor: '#CCC',
        borderRadius: 4,
    },
    rec: {
        width: 24,
        height: 8,
        borderRadius: 8,
        backgroundColor: '#7269E3'
    },
    contBtn: {
        // display: 'flex',
        
        // marginHorizontal: 50,
        width: 312,
        // height: 48,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 12,
        backgroundColor: '#000',
        // marginRight: 20
    },
    btnTxt: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Ubuntu',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
    }
});

export default Signup;
