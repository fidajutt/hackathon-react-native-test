import React, { useState, useEffect } from "react";
import {
  Pressable,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { SaveCategories } from "../redux/action/CategoriesAction";
import { getCategories } from "../redux/selectors";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import AddNewItem from "./AddNewItem";
const styles = require("./../assets/styles/style");

const Separator = () => <View style={styles.separator} />;
interface CategoryDetailProps {
  data: any;
  navigation: any;
}
var fields: any[] = [];
// const CategoryDetail = (data:any) => {
const CategoryDetail: React.FC<CategoryDetailProps> = (data: any) => {
  const dispatch = useDispatch();
  const categoryListData: any | null = useSelector(getCategories);
  const [isShowAddItemModal, setIsShowAddItemModal] = useState(false);
  const [itemName, setItemName] = useState("New Category");
  const [fieldsList, setFieldsList] = useState<any>(null);
  const [fieldsListInfo, setFieldsListInfo] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [fieldsNameList, setFieldsNameList] = useState<any>([]);
  const [categoryListDataRedux, setCategoryListDataRedux] = useState<any>(
    categoryListData ? categoryListData : []
  );
  const [selectedFieldNameTitle, SetSelectedFieldNameTitle] = useState<
    string | null
  >("");
  const [categoryKeys, setCategoryKeys] = useState<any>([]);
  const [render, setRender] = useState<boolean>(false);
  const [singleCategoryData, setSingleCategoryData] = useState<any>(
    data?.route?.params?.data
  );
  const [itemTitle, setItemTitle] = useState<any>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isChecked, setChecked] = useState(false);
  const [fieldsData, setFieldsData] = useState<any>([]);
  const [state, setState] = useState({});

  const [showDate, setShowDate] = useState(false);
  const [itemForDatePicker, setItemForDatePicker] = useState({});
  const [indexForDatePicker, setIndexForDatePicker] = useState<number>();
  const [fieldIndexForDatePicker, setFieldIndexForDatePicker] =
    useState<number>();
  useEffect(() => {
    if (render) {
      setRender(false);
    }
  }, [render]);

  const refreshPage = () => {
    setState({});
  };
  useEffect(() => {
    let keysData = [];
    if (categoryListData) {
      let keys = Object.keys(categoryListData);
      for (let k of keys) {
        keysData.push(k);
      }
      setCategoryKeys(keysData);
    }
  }, [categoryListData]);

  const handleAddItem = (e: any) => {
    let added_fields = singleCategoryData?.fields;
    if (added_fields) {
      for (let f of added_fields) {
        fields.push({ name: f?.name, type: f?.type });
      }
    }
    setIsShowAddItemModal(true);
  };
  const onChange = (
    event: any,
    item: any,
    selectedDate: any,
    index: any,
    fieldIndex: any
  ) => {
    let date = new Date(selectedDate);
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear().toString().slice(-2);
    let newFormat = `${day}/${month}/${year}`;

    item["value"] = newFormat;
    if (!singleCategoryData?.["items"]?.[index]?.[fieldIndex]) {
      singleCategoryData?.["items"]?.[index]?.push(item);
    } else {
      singleCategoryData["items"][index][fieldIndex]["value"] = newFormat;
    }
    dispatch(
      SaveCategories({
        ...categoryListData,
        [singleCategoryData?.categoryName]: singleCategoryData,
      })
    );
    setShowDate(false);
    setRender(true);
  };

  const handleSetFieldNameToRedux = (
    item: any,
    value: string | boolean,
    index: number,
    fieldIndex: number
  ) => {
    item["value"] = value;
    if (!singleCategoryData?.["items"]?.[index]?.[fieldIndex]) {
      singleCategoryData?.["items"]?.[index]?.push(item);
    } else {
      singleCategoryData["items"][index][fieldIndex]["value"] = value;
    }
    dispatch(
      SaveCategories({
        ...categoryListData,
        [singleCategoryData?.categoryName]: singleCategoryData,
      })
    );
    setRender(true);
  };
  const handleDeleteFieldToRedux = (e: any, index: number, key: string) => {
    categoryListData[key]?.fields.splice(index, 1);
  };
  const handleDeleteItem = (e: any, index: number) => {
    delete singleCategoryData?.items?.[index];
    dispatch(
        SaveCategories({
          ...categoryListData,
          [singleCategoryData?.categoryName]: singleCategoryData,
        })
      );
    setRender(true);
  };
  const saveNewItem = (data: any) => {

    if (!singleCategoryData?.["items"]) {
      singleCategoryData["items"] = [];
    }
    singleCategoryData?.["items"]?.push(data);
    setSingleCategoryData(singleCategoryData);
    setIsShowAddItemModal(!isShowAddItemModal);
    dispatch(
      SaveCategories({
        ...categoryListData,
        [singleCategoryData?.categoryName]: singleCategoryData,
      })
    );
    fields = [];
   
    refreshPage();
    setRender(true);
  };
  const OnCancelModal = () => {
    setIsShowAddItemModal(false);
    fields = [];
    setRender(true);
  };
  const handleShowDatePicker = (
    e: any,
    item: any,
    fieldIndex: number,
    index: number
  ) => {
    setItemForDatePicker(item);
    setIndexForDatePicker(index);
    setFieldIndexForDatePicker(fieldIndex);
    setShowDate(true);
  };
  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.parentContainer}
    >
      <Text style={{ display: "none" }}>{render}</Text>

      <SafeAreaView style={[styles.mainContainer, { margin: 5, flex: 0 }]}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ fontSize: 20, fontWeight: "700", flex: 1, color: "white" }}
          >
            {singleCategoryData?.categoryName}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={(e) => {
              handleAddItem(e);
            }}
          >
            <Text style={styles.buttonText}>Add New Item</Text>
          </TouchableOpacity>
        </View>
        {isShowAddItemModal ? (
          <AddNewItem
            categoryData={fields}
            titleField={singleCategoryData?.title_field}
            categoryKey={singleCategoryData?.categoryName}
            onSave={saveNewItem}
            OnCancel={OnCancelModal}
          />
        ) : null}

        {singleCategoryData?.items &&
          singleCategoryData?.items?.map((item: any, index: number) => {
            return (
              <View key={index} style={styles.singleItemContainer}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  {item?.map((item_value: any, index: number) => {
                    if (singleCategoryData?.title_field == item_value?.name) {
                      return <Text>{item_value?.value}</Text>;
                    }
                  })}
                </Text>
                {singleCategoryData?.fields?.map(
                  (itemFields: any, fieldIndex: number) => {
                    return (
                      <View key={fieldIndex} style={{ borderRadius: 15 }}>
                        {itemFields?.type == "Text" ? (
                          <TextInput
                            placeholder={itemFields?.name}
                            style={styles.inputItem}
                            placeholderTextColor="#c0c0c0"
                            onChangeText={(value) => {
                              handleSetFieldNameToRedux(
                                itemFields,
                                value,
                                index,
                                fieldIndex
                              );
                            }}
                            value={item?.[fieldIndex]?.value}
                          />
                        ) : itemFields?.type == "Date" ? (
                          <View style={{ flex: 1 }}>
                            <Pressable
                              onPress={(e) =>
                                handleShowDatePicker(
                                  e,
                                  itemFields,
                                  fieldIndex,
                                  index
                                )
                              }
                            >
                              <View pointerEvents="none">
                                <TextInput
                                 placeholderTextColor="#c0c0c0"
                                  placeholder={item?.name}
                                  style={styles.inputItem}
                                  value={item?.[fieldIndex]?.value}
                                />
                              </View>
                            </Pressable>
                          </View>
                        ) : itemFields?.type == "Number" ? (
                          <TextInput
                            placeholder={itemFields?.name}
                            style={styles.inputItem}
                            placeholderTextColor="#c0c0c0"
                            onChangeText={(value) => {
                              handleSetFieldNameToRedux(
                                itemFields,
                                value,
                                index,
                                fieldIndex
                              );
                            }}
                            value={item?.[fieldIndex]?.value}
                            keyboardType={"numeric"}
                          />
                        ) : itemFields?.type == "CheckBox" ? (
                          <View style={styles.checkbox_container}>
                            <Checkbox
                              style={styles.checkbox}
                              value={item?.[fieldIndex]?.value}
                              onValueChange={(value) => {
                                handleSetFieldNameToRedux(
                                  itemFields,
                                  value,
                                  index,
                                  fieldIndex
                                );
                              }}
                              // onValueChange={(value) => { handleSetFieldName(item, value, index) }}
                              color={
                                item?.[fieldIndex]?.value ? "#4630EB" : undefined
                              }
                            />
                            <Text style={styles.label}>{itemFields?.name}</Text>
                          </View>
                        ) : null}
                      </View>
                    );
                  }
                )}
                <View style={{ margin: 5 }}>
                  <Ionicons
                    name="md-trash-outline"
                    onPress={(e) => {
                      handleDeleteItem(e, index);
                    }}
                    size={32}
                    color="red"
                  />
                </View>
              </View>
            );
          })}

        {/* //// */}
        <Separator />
        
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
                indexForDatePicker,
                fieldIndexForDatePicker
              );
            }}
          />
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

export default CategoryDetail;
