import React from 'react';
import {Constants, Location, Permissions, MapView} from 'expo';
import {Title} from "./views";


const GOOGLE_API_KEY = "AIzaSyDKD-pCbL1S17yHTFFnQFkbGX-lAKE_pFA";

export default class App extends React.Component {
    state = {}

    render() {
        return (
            <Title>Hello World!</Title>
        );
    }
}

