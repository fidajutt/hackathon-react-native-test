import React, { Component } from "react";
import { StyleSheet, Dimensions ,Platform} from "react-native";

const screenwidth = Dimensions.get("window").width;
const screenhight = Dimensions.get('screen').height;
// const screenhight = Dimensions.get('window').height;
var Height;
var Width;
var Heading;
var Font;
var titleHead;
var errorFont;
if (screenhight > 550 && screenwidth > 320) {
  Height = 200;
  Width = 450;
  Heading = 22;
  Font = 16;
  titleHead = 32;
  errorFont = 12;
} else {
  Height = 1500;
  Width = 630;
  Heading = 18;
  Font = 14;
  titleHead = 26;
  errorFont = 10;
}

export default {
  colorBlue3a60ac: "#36609E",
  colorLittleDarkBlue3a5fac: "#3a5fac",
  colorLightBluea3aed9: "#a3aed9",
  colorWhiteffffff: "#ffffff",
  colorfacebook1976d2: "#1976d2",
  colorLittleLightBlue55acee: "#55acee",
  colorgreyb8badd: "#b8badd",
  colorLightGray98baf4: "#98baf4",
  colorFerozie0f1fd: "#e0f1fd",
  colorliteBluef5f5f5: "#f5f5f5",
  colorblue3e7ef: "#e3e7ef",
  colorDarkGrey: "#898989",
  colorGreenish: '#4ebfcd',
  colorLIGHTBLUE1c9cd6: '#1c9cd6',
  colorgreycccccc: '#cccccc',
  colorChooseGoalFrouzie4dbfce: '#4dbfce',
  colorChooseGoalBlue3a5fac: '#3a5fac',
  colorlightBlue53b4df: '#53b4df',
  colorSignupBlue1d7ca8: '#1d7ca8',
  colorDarkbge6e6e6: '#e6e6e6',
  colorGreen14eb6e:'#228B22',
  colorGrayafafaf:'#cfcfcf',
  touchIDRef: '',
  env: "",
  drawerRef: '',
  dropdownRef: '',
  dropdownReference: '',
  borderRadius10: 10,
  colorGreen02b100:"#078e05",
  placeholderColor:"#a7a3a3",
  colorChooseGoalColor:"#1d7ca7",
  colorGreen01a99d:"#01a99d",
  colorGray8e8c8c:'#8e8c8c',
  colorLightBlueButton4789cc:'#4789cc',
  colorBase: "#00173E",
  colorPrimary: "#0b2044"
};
