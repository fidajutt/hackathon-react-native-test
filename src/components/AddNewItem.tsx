import React, { useState, useEffect } from "react";
import {
  Pressable,
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
const styles = require("./../assets/styles/style");

interface Prop {
  categoryData: any;
  titleField: string;
  categoryKey: any;
  onSave(data: any, categoryKey: string): void;
  OnCancel(): void;
}
const AddNewItem: React.FC<Prop> = ({
  categoryData,
  titleField,
  categoryKey,
  onSave,
  OnCancel,
}): JSX.Element => {
  
  const dispatch = useDispatch();
  const [render, setRender] = useState<boolean>(false);
  // const [singleCategoryData, setSingleCategoryData] = useState<any>(data?.categoryData);
  const [itemTitle, setItemTitle] = useState<any>(null);
  const [date, setDate] = useState(new Date());
  const [fieldsData, setFieldsData] = useState<any>(categoryData);
  const [isShowAddItemModal, setIsShowAddItemModal] = useState(true);
  const [state, setState] = useState({});
  const [showDate, setShowDate] = useState(false);
  const [itemForDatePicker, setItemForDatePicker] = useState({});
  const [indexForDatePicker, setIndexForDatePicker] = useState<number>();
  useEffect(() => {
    // setRender(!render)
    if (render) {
      setRender(false);
    }
  }, [render]);
  useEffect(() => {}, []);

  const refreshPage = () => {
    setState({});
  };
  const handleSetFieldNameItems = (item: any, value: any, index: number) => {
    let data = item;
    data["value"] = value;
    setRender(true);

    if (item?.name == titleField) {
      setItemTitle(value);
    }
    setRender(true);
  };
  const hideDatePicker = () => {
    // setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: any) => {
    hideDatePicker();
  };
  const onChange = (
    event: any,
    item: any,
    selectedDate: any,
    index: any
  ) => {
    //convert date
    let date = new Date(selectedDate);
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear().toString().slice(-2);
    let newFormat = `${day}/${month}/${year}`;

    fieldsData[index]["value"] = newFormat;
    if (item?.name == titleField) {
      setItemTitle(selectedDate);
    }
    setShowDate(false);
    setRender(true);
  };
  const handleShowDatePicker = (e: any, item: any, index: number) => {
    setItemForDatePicker(item);
    setIndexForDatePicker(index);
    setShowDate(true);
  };
  const _renderFields = (items: any) => {
    let item = items?.item;
    let index = items?.index;
    return (
      <View style={styles.categoryAddContainer}>
        {item?.type == "Text" ? (
          <TextInput
            placeholder={item?.name}
            style={styles.inputItem}
            onChangeText={(value) => {
              handleSetFieldNameItems(item, value, index);
            }}
            placeholderTextColor="#c0c0c0"
            value={item?.value}
          />
        ) : item?.type == "Date" ? (
          <View style={{ flex: 1 }}>
            <Pressable onPress={(e) => handleShowDatePicker(e, item, index)}>
              <View pointerEvents="none">
                <TextInput
                  placeholder={item?.name}
                  style={styles.inputItem}
                  onChangeText={(value) => {
                    handleSetFieldNameItems(item, value, index);
                  }}
                  placeholderTextColor="#c0c0c0"
                  value={item?.value}
                />
              </View>
            </Pressable>
          </View>
        ) : item?.type == "Number" ? (
          <TextInput
            placeholder={item?.name}
            style={styles.inputItem}
            onChangeText={(value) => {
              handleSetFieldNameItems(item, value, index);
            }}
            placeholderTextColor="#c0c0c0"
            value={item?.value}
            keyboardType={"numeric"}
          />
        ) : item?.type == "CheckBox" ? (
          <View style={styles.checkbox_container}>
            <Checkbox
              style={styles.checkbox}
              value={item?.value}
              onValueChange={(value) => {
                handleSetFieldNameItems(item, value, index);
              }}
              color={item?.value ? "#4630EB" : undefined}
            />
            <Text style={styles.label}>{item?.name}</Text>
          </View>
        ) : null}
      </View>
    );
  };
  const handleSaveCategories = (e: any) => {
    refreshPage();
    setFieldsData([]);
    setRender(true);
    onSave(fieldsData, categoryKey);
    setIsShowAddItemModal(false);
  };
  return (
    // <ScrollView nestedScrollEnabled contentContainerStyle={{ flexGrow: 1 }}>

    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setIsShowAddItemModal(!isShowAddItemModal);
      }}
    >
      <ScrollView nestedScrollEnabled contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={{ display: "none" }}>{render}</Text>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{itemTitle}</Text>
            <View style={styles.modalViewBody}>
              <FlatList
                style={{ padding: 5 }}
                data={fieldsData}
                renderItem={(item) => _renderFields(item)}
              />
              <View style={styles.saveHideModal}>
                <Pressable
                  style={[styles.button, { marginBottom: 5 }]}
                  onPress={(e) => {
                    handleSaveCategories(e);
                  }}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { marginBottom: 5 },
                  ]}
                  onPress={() => {
                    OnCancel(), setFieldsData([]);
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        {showDate ? (
          <DateTimePicker
            testID="dateTimePicker"
            mode="date"
            display="inline"
            value={date}
            onChange={(event, selectedDate) => {
              onChange(
                event,
                itemForDatePicker,
                selectedDate,
                indexForDatePicker
              );
            }}
          />
        ) : null}
      </ScrollView>
    </Modal>

    // </ScrollView >
  );
};

export default AddNewItem;
