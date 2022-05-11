import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Card from '../components/Card';
import Color from '../constants/colors';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, SetEnterValue] = useState('');
    const [confirmed, SetConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    
    const numberInputHandler = inputText => {
        SetEnterValue(inputText.replace(/[^0-9]/g), '');
    };

    const resetInputHandler = () => {
        SetEnterValue('');
        SetConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });
    const confirmInputHandler = () => {
        const choseNumber = parseInt(enteredValue);
        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            Alert.alert(
                'Invalid Number!',
                'Number has to be between 1 to 99.',
                [{ text: 'Okey', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        SetConfirmed(true);
        setSelectedNumber(choseNumber);
        SetEnterValue('');
        Keyboard.dismiss();
    };

    let confirmOutput;
    if (confirmed) {
        confirmOutput = (
            <Card style={styles.summContainer}>
                <BodyText>You are Selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>The Game Screen!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select A Number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitaliza="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Color.accent} />
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Color.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmOutput}
                    </View >
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    // button: {
    //     // width: 100
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 80,
        textAlign: 'center'
    },
    summContainer: {
        marginTop: 20,
        alignItems: 'center',

    }
});

export default StartGameScreen;