'use strict';
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import constants from './constants';
module.exports = StyleSheet.create({
    parentContainer:{
        flex: 1,
        backgroundColor:'#8D72E1'
    },
    parentContainerModal:{
        backgroundColor:'#8D72E1',
        borderWidth: 3,
        borderColor: "#6C4AB6" 
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#380b99',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    bottomContainer: {
        // flex: 1,
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: '#380b99',
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10
    },
    buttonContainer: {
        alignItems: 'center'
    },
    buttonText: {
        color: 'white'
    },










    ///////

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 1,
    },
    modalView: {
        margin: 10,
        backgroundColor:'#6C4AB6',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1,
        borderWidth:2,
        borderColor:'#380b99'
    },
    //   button: {
    //     borderRadius: 20,
    //     padding: 10,
    //     elevation: 2,
    //   },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#d42e2e',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color:'white'
    },
    input: {
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        fontSize: 15,
        width: '70%',
        color:'white'
    },
    inputCategoryName: {
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        fontSize: 15,
        width: '100%',
        color:'white'
    },
    inputItem: {
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        fontSize: 15,
        width: '100%',
        color:'white'
    },
    inputItemDashboard: {
        height: 25,
        marginTop: 0,
        marginBottom: 0,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        fontSize: 15,
        width: '100%',
        color:'white'
    },
    modalViewBody: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    categoryAddContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addNewField: {
        marginTop: 5,
        flex:1, flexDirection:'row',
        justifyContent:'space-between'
    },
    inputItemDatePicker: {
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        fontSize: 15,
        width: '100%'
    },
    checkbox: {
        margin: 8,
    },
    checkbox_container: {
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        color:'white'
    },
    fieldTypeBox:{
        borderWidth: 1,
        marginLeft: 2,
        borderColor: "white",
        alignSelf: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius:5
    },
    textTypeBox:{
        color:'white'
    },
    saveHideModal:{
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        width:'50%'
    },
    singleCategoryCard:{
        backgroundColor: "#6C4AB6",
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    singleItemContainer:{
        backgroundColor: "#6C4AB6",
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
        marginTop: 10,
    }
});