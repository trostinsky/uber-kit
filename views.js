import styled from "styled-components";
import {Dimensions} from "react-native";
import MapView from 'react-native-maps';
const {width, height} = Dimensions.get("window");

export const Main = styled.View`
  height: 100%;
  width: 100%;
  padding-top: 20px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 300;
  font-family: "Helvetica"; 
  color: #333;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const AddressInput = styled.TextInput`
  background-color:#fff;
  width: 90%;
  margin: 5px auto;
  padding-left: 10px;
  height: 40px;
  color: #000;
  border: 1px solid #000;
`;

export const ButtonWrapper = styled.View`
  background-color:#000;
  border-radius: 5px;
  width: 90%;
  height: 45px;
  margin: 5px auto;
  justify-content: center;
`;

export const AddressWrapper = styled.View`
  position:absolute;
  top: 90px;
  left:0;
  width: 100%;
  z-index: 100;
`;

export const ButtonTitle = styled.Text`
  color: #fff;
  text-align: center;
  width: 100%;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: ${height - 80};
`;

export const PlaceIcon = styled.Image`
  width: 20px;
  height: 20px;
  z-index: 100;
  position:absolute;
  left: ${(width / 2) - 10};
  top: ${(height / 2) + 25};
`;
export const PassangerIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

export const TaxiIcon = styled.Image`
  width: 30px;
  height: 30px;
`;
