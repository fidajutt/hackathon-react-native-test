import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  FlatList,
  Platform,
  Button,
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

var fields: any = [];
// const CategoryDetail = (data:any) => {
const Dashboard: React.FC = (): JSX.Element => {
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
  const [singleCategoryData, setSingleCategoryData] = useState<any>();
  const [itemTitle, setItemTitle] = useState<any>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isChecked, setChecked] = useState(false);
  const [fieldsData, setFieldsData] = useState<any>([]);
  const [state, setState] = useState({});
  const [categoryKeyValue, setCategoryKeyValue] = useState<String>("");

  const [showDate, setShowDate] = useState(false);
  const [itemForDatePicker, setItemForDatePicker] = useState({});
  const [indexForDatePicker, setIndexForDatePicker] = useState<Number>();
  const [categoryKey, setCategoryKey] = useState<any>('');
  const [fieldIndexForDatePicker, setFieldIndexForDatePicker] =
    useState<number>();
  useEffect(() => {
    // setRender(!render)
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
  

  const handleAddItem = (e: any, categoryDat: any, categoryKey: string) => {
    setCategoryKeyValue(categoryKey);
    let added_fields = categoryDat?.fields;
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

    if (categoryListData) {
      if (!categoryListData[categoryKey]["items"][index][fieldIndex]) {
        categoryListData[categoryKey]["items"][index].push(item);
      } else {
        categoryListData[categoryKey]["items"][index][fieldIndex]["value"] =
        newFormat;
      }
    }
    dispatch(SaveCategories(categoryListData));

    setShowDate(false);
    setRender(true);
  };
  const handleSetFieldNameToRedux = (
    categoryKey: string,
    item: any,
    value: any,
    index: number,
    fieldIndex: number
  ) => {
    item["value"] = value;
    // categoryListData[categoryKey]['items']
    // return;
    if (categoryListData) {
      if (!categoryListData[categoryKey]["items"][index][fieldIndex]) {
        categoryListData[categoryKey]["items"][index].push(item);
      } else {
        categoryListData[categoryKey]["items"][index][fieldIndex]["value"] =
          value;
      }
    }
    dispatch(SaveCategories(categoryListData));
    setRender(true);
  };
  const handleDeleteFieldToRedux = (e: any, index: number, key: string) => {
    categoryListData[key]?.fields.splice(index, 1);
  };
  const handleDeleteItem = (e: any, index: number,category_key:any) => {
    delete categoryListData[category_key]['items'][index];
    dispatch(SaveCategories(categoryListData));
    setRender(true);
  };
  const saveNewItem = (data: any, categoryKey: string) => {
    if (!categoryListData[categoryKey]["items"]) {
      categoryListData[categoryKey]["items"] = [];
    }
    categoryListData[categoryKey]["items"].push(data);
    setIsShowAddItemModal(!isShowAddItemModal);
    dispatch(SaveCategories(categoryListData));

    refreshPage();
    setRender(true);
    fields = [];
  };
  const OnCancelModal = () => {
    setIsShowAddItemModal(false);
    setRender(true);
    fields = [];
  };
  const handleShowDatePicker = (
    e: any,
    category_key:string,
    item: any,
    fieldIndex: number,
    index: number
  ) => {
    setCategoryKey(category_key)
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
      
        {/* /// */}
        {isShowAddItemModal ? (
          <AddNewItem
            categoryData={fields}
            titleField={singleCategoryData?.title_field}
            categoryKey={categoryKeyValue}
            onSave={saveNewItem}
            OnCancel={OnCancelModal}
          />
        ) : null}
        {categoryListData &&
          Object.keys(categoryListData).map((item: any, index: number) => {
            return (
              <View
                key={index}
                style={{
                  marginBottom: 15,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      flex: 1,
                      color: "white",
                    }}
                  >
                    {item}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={(e) => {
                      handleAddItem(e, categoryListData[item], item);
                    }}
                  >
                    <Text style={styles.buttonText}>Add New Item</Text>
                  </TouchableOpacity>
                </View>

                {categoryListData[item]?.items &&
                  categoryListData[item]?.items.map(
                    (itemsData: any, itemsIndex: number) => {
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
                            {itemsData?.map((item_value: any, index: number) => {
                              if (
                                categoryListData[item]?.title_field ==
                                item_value?.name
                              ) {
                                return <Text>{item_value?.value}</Text>;
                              }
                            })}
                          </Text>
                          {categoryListData[item]?.fields.map(
                            (itemFields: any, fieldIndex: number) => {
                              return (
                                <View
                                  key={fieldIndex}
                                  style={{ borderRadius: 5 }}
                                >
                                  {itemFields?.type == "Text" ? (
                                    <TextInput
                                      placeholder={itemFields?.name}
                                      style={styles.inputItem}
                                      placeholderTextColor="#c0c0c0"
                                      onChangeText={(value) => {
                                        handleSetFieldNameToRedux(
                                          item,
                                          itemFields,
                                          value,
                                          itemsIndex,
                                          fieldIndex
                                        );
                                      }}
                                      value={
                                        categoryListData[item]?.["items"]?.[
                                          itemsIndex
                                        ]?.[fieldIndex]?.value
                                      }
                                    />
                                  ) : itemFields?.type == "Date" ? (
                                    <View style={{ flex: 1 }}>
                                      <Pressable
                                        onPress={(e) =>
                                          handleShowDatePicker(
                                            e,
                                            item,
                                            itemFields,
                                            fieldIndex,
                                            index
                                          )
                                        }
                                      >
                                        <View pointerEvents="none">
                                          <TextInput
                                            placeholder={item?.name}
                                            style={styles.inputItem}
                                            placeholderTextColor="#c0c0c0"
                                            value={
                                              categoryListData[item]?.["items"]?.[
                                                itemsIndex
                                              ]?.[fieldIndex]?.value
                                            }
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
                                          item,
                                          itemFields,
                                          value,
                                          itemsIndex,
                                          fieldIndex
                                        );
                                      }}
                                      value={
                                        categoryListData[item]?.["items"]?.[
                                          itemsIndex
                                        ]?.[fieldIndex]?.value
                                      }
                                      keyboardType={"numeric"}
                                    />
                                  ) : itemFields?.type == "CheckBox" ? (
                                    <View style={styles.checkbox_container}>
                                      <Checkbox
                                        style={styles.checkbox}
                                        value={
                                          categoryListData[item]?.["items"]?.[
                                            itemsIndex
                                          ]?.[fieldIndex]?.value
                                        }
                                        onValueChange={(value) => {
                                          handleSetFieldNameToRedux(
                                            item,
                                            itemFields,
                                            value,
                                            itemsIndex,
                                            fieldIndex
                                          );
                                        }}
                                        // onValueChange={(value) => { handleSetFieldName(item, value, index) }}
                                        color={
                                          item[fieldIndex]?.value
                                            ? "#4630EB"
                                            : undefined
                                        }
                                      />
                                      <Text style={styles.label}>
                                        {itemFields?.name}
                                      </Text>
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
                                handleDeleteItem(e, itemsIndex,item);
                              }}
                              size={32}
                              color="red"
                            />
                          </View>
                        </View>
                      );
                    }
                  )}
                <Separator />
              </View>
            );
          })}
        {/* //// */}

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

export default Dashboard;
