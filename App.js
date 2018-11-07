// 1) Скачиваем репозиторий +
// 2) Устанавливаем NodeJS +
// 3) expo-cli ---> npm i --global expo-cli@2.2.6 +
// 4) Expo Client, Expo +

// 1) Title, Map, Input, Button +
// 2) Сделаем точку посадки +
// 3) Сделаем иконку посадки +
// 4) Расставить автомобили +
// 5) Получить координаты по адресу
// 6) Построить маршрут

import React from 'react';
import {TouchableWithoutFeedback} from "react-native";
import {Constants, Location, Permissions} from 'expo';
import MapView from "react-native-maps";
import {
    Title, Main, AddressInput, ButtonTitle, ButtonWrapper,
    AddressWrapper, Map, PlaceIcon, PassangerIcon, TaxiIcon
} from "./views";
import place_icon from "./assets/place.png";
import passanger_icon from "./assets/passanger.png";
import taxi_icon from "./assets/taxi.png";
import {random} from "lodash";
import axios from "axios";
import MapDirection from "react-native-maps-directions";

const GOOGLE_API_KEY = "AIzaSyDKD-pCbL1S17yHTFFnQFkbGX-lAKE_pFA";

export default class App extends React.Component {
    state = {
        location: null,
        marker: null,
        destination: null,
        builded: false,
        cars: [],
        address: ''
    }

    async componentDidMount() {
        try {
            const emptyCars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                throw new Error("Где права на доступ?")
            }
            const location = await Location.getCurrentPositionAsync({});
            this.setState({
                location: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.009, // 0.001
                    longitudeDelta: 0.009 // 0.001
                },
                marker: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                },
                cars: emptyCars.map((car) => {
                    return {
                        latitude: location.coords.latitude + 0.0001 * random(-100, 100),
                        longitude: location.coords.longitude + 0.0001 * random(-100, 100)
                    }
                })
            });
        } catch (err) {
            alert("Ошибка при получении местоположения!");
        }
    }

    fetchCoords = (address) => {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
    }

    moveMap = (region) => {
        if(this.state.builded) return;
        this.setState({
            marker: region,
            location: region
        })
    }

    changeAddress = (address) => {
        this.setState({
            address
        })
    }

    searchDirection = async () => {
        const {address} = this.state;
        const response = await this.fetchCoords(address);
        const {location} = response.data.results[0].geometry;
        this.setState({
            destination: {
                longitude: location.lng,
                latitude: location.lat
            },
            builded: true
        })
    }

    cancelOrder = () => {
        this.setState({
            builded: false,
            destination: null
        })
    }

    render() {
        return (
            <Main>
                <Title>Uber Clone</Title>
                <PlaceIcon source={place_icon}/>
                <Map provider="google"
                     region={this.state.location}
                     onRegionChangeComplete={this.moveMap}
                >
                    {this.state.marker ?
                        <MapView.Marker coordinate={this.state.marker}>
                            <PassangerIcon source={passanger_icon}/>
                        </MapView.Marker>
                        : null
                    }
                    {this.state.cars.map((car, index) => (
                        <MapView.Marker coordinate={car} key={index}>
                            <TaxiIcon source={taxi_icon}/>
                        </MapView.Marker>
                    ))}
                    {this.state.destination ?
                        <MapDirection apikey={GOOGLE_API_KEY}
                                      color="#000"
                                      strokeWidth={5}
                                      origin={this.state.marker}
                                      destination={this.state.destination}
                        /> : null
                    }
                </Map>
                <AddressWrapper>
                    <AddressInput placeholder="Введите адрес"
                                  value={this.state.address}
                                  onChangeText={this.changeAddress}
                                  disabled={this.state.builded}
                    />
                    {this.state.builded ?
                        <TouchableWithoutFeedback onPress={this.cancelOrder}>
                            <ButtonWrapper>
                                <ButtonTitle>
                                    Отменить заказ
                                </ButtonTitle>
                            </ButtonWrapper>
                        </TouchableWithoutFeedback>
                        :
                        <TouchableWithoutFeedback onPress={this.searchDirection}>
                            <ButtonWrapper>
                                <ButtonTitle>
                                    Построить маршрут
                                </ButtonTitle>
                            </ButtonWrapper>
                        </TouchableWithoutFeedback>
                    }
                </AddressWrapper>
            </Main>
        );
    }
}

