// 1) Скачиваем репозиторий
// 2) Устанавливаем NodeJS
// 3) expo-cli ---> npm i --global expo-cli@2.2.6
// 4) Expo Client, Expo

// 1) Title, Map, Input, Button
// 2) Сделаем точку посадки
// 3) Сделаем иконку посадки
// 4) Расставить автомобили
// 5) Получить координаты по адресу
// 6) Построить маршрут

import React from 'react';
import {Text, View, Button} from "react-native";
import {Constants, Location, Permissions, MapView} from 'expo';
import {Title, Main, AddressInput, ButtonTitle, ButtonWrapper,
    AddressWrapper, Map} from "./views";


const GOOGLE_API_KEY = "AIzaSyDKD-pCbL1S17yHTFFnQFkbGX-lAKE_pFA";

export default class App extends React.Component {
    state = {}

    render() {
        return (
            <Main>
                <Title>Uber Clone</Title>
                <AddressWrapper>
                    <AddressInput placeholder="Введите адрес"/>
                    <ButtonWrapper>
                        <ButtonTitle>
                            Построить маршрут
                        </ButtonTitle>
                    </ButtonWrapper>
                </AddressWrapper>
                <Map provider="google"/>
            </Main>
        );
    }
}

