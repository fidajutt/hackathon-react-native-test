import React, { useState, useEffect, useReducer } from "react";
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
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { SaveCategories } from "../redux/action/CategoriesAction";
import { getCategories } from "../redux/selectors";
const styles = require("./../assets/styles/style");

const Separator = () => <View style={styles.separator} />;

interface Prop {
  navigation: any;
}const ManageCategories: React.FC<Prop> = ({
  navigation,
}): JSX.Element => {
  const dispatch = useDispatch();
  const [ignored, forceUpdate] = useReducer(x=>x+1,0);
  const categoryListData: any | null = useSelector(getCategories);
  const [isShowAddCategoryModal, setIsShowAddCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("New Category");
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

  useEffect(() => {
    setRender(true);
    // dispatch(SaveCategories(categoryListData));
  }, [categoryListData]);
  useEffect(() => {
    // setRender(!render)
    if (render) {
      setRender(false);
    }
  }, [render]);

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
  function getFieldNamesFromArray() {
    let fieldNameListData = [];
    if (fieldsList) {
      for (let a = 0; a < fieldsList.length; a++) {
        fieldNameListData.push(fieldsList[a]?.name);
      }
    }
    setFieldsNameList(fieldNameListData);
  }

  const handleAddCategory = (e: any) => {
    let data = {
      categoryName: categoryName,
      title_field: "",
      fields: [
        {
          type: "Text",
          name: "",
        },
      ],
    };
    let fields = [
      {
        type: "Text",
        name: "",
      },
    ];
    setFieldsList(fields);
    setCategoryData(data);
    setIsShowAddCategoryModal(true);
  };
  const handleSelectFieldType = (type_id: number) => {
    let type = "";
    if (type_id == 0) {
      type = "Text";
    }
    if (type_id == 1) {
      type = "CheckBox";
    }
    if (type_id == 2) {
      type = "Date";
    }
    if (type_id == 3) {
      type = "Number";
    }
    let fields = {
      type: type,
      name: "",
    };
    setFieldsListInfo({ ...fieldsListInfo, fields });
    fieldsList.push(fields);
    setFieldsList(fieldsList);
    categoryData?.fields.push(fields);
    setCategoryData(categoryData);
  };
  const handleSelectFieldTitleName = (type_id: number) => {
    SetSelectedFieldNameTitle(fieldsNameList[type_id])
    categoryData.title_field = fieldsNameList[type_id];
    setCategoryData(categoryData)
  }
  const handleSelectFieldTitleNameRedux = (type_id: number, key: string) => {
    categoryListData[key].title_field = categoryListData[key]?.fields[type_id]?.name
    setRender(true)
  };
  const handleSetFieldName = (value: string, index: number) => {
    fieldsList[index].name = value;
    categoryData.fields[index].name = value;
    setFieldsList(fieldsList);
    setCategoryData(categoryData);
    getFieldNamesFromArray();
  };
  const _renderFields = (items: any) => {
    let item = items?.item;
    let index = items?.index;
    return (
      <View style={styles.categoryAddContainer}>
        <View style={{ flex: 1, flexDirection: "row", maxWidth: "70%" }}>
          <TextInput
            placeholder={"Field"}
            style={styles.input}
            onChangeText={(value) => {
              handleSetFieldName(value, index);
            }}
            placeholderTextColor="#c0c0c0"
          // value={item?.name}
          />
          <View style={styles.fieldTypeBox}>
            <Text style={styles.textTypeBox}>{item?.type}</Text>
          </View>
        </View>
        <View>
          <Ionicons
            name="md-trash-outline"
            onPress={(e) => {
              handleDeleteField(e, index);
            }}
            size={32}
            color="red"
          />
        </View>
      </View>
    );
  };
  const _renderCategories = (items: any) => {
    let item = items?.item;
    let index = items?.index;
    let categoryNameByKey = categoryListData[item]?.categoryName;
    let categoryTitleField = categoryListData[item]?.title_field;
    let categoryFields = categoryListData[item]?.fields;
    return (
      <View style={styles.singleCategoryCard}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "white",
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          {item}
        </Text>
        <TextInput
          placeholder={categoryNameByKey}
          style={styles.inputCategoryName}
          onChangeText={(value) => {
            handleChangeCategoryNameToRedux(value, item);
          }}
          onBlur={(e) => {
            handleChangeKeyToRedux(item);
          }}
          placeholderTextColor="#c0c0c0"
          defaultValue={categoryNameByKey}
        />
        {categoryFields &&
          categoryFields?.map((itemField: any, indexField: number) => {
            return (
              <View>
                <View style={styles.categoryAddContainer}>
                  <View
                    style={{ flex: 1, flexDirection: "row", maxWidth: "70%" }}
                  >
                    <TextInput
                      placeholder={"Field"}
                      style={styles.input}
                      onChangeText={(value) => {
                        handleSetFieldNameToRedux(value, indexField, item);
                      }}
                      placeholderTextColor="#c0c0c0"
                      defaultValue={itemField?.name}
                    />
                    <View style={styles.fieldTypeBox}>
                      <Text style={styles.textTypeBox}>{itemField?.type}</Text>
                    </View>
                  </View>
                  <View>
                    <Ionicons
                      name="md-trash-outline"
                      onPress={(e) => {
                        handleDeleteFieldToRedux(e, indexField, item);
                      }}
                      size={32}
                      color="red"
                    />
                  </View>
                </View>
              </View>
            );
          })}

        <View style={styles.addNewField}>
          <ModalDropdown
            onSelect={(e: any) => {
              handleSelectFieldTypeToRedux(e, item);
            }}
            style={[styles.button, { marginBottom: 5 }]}
            dropdownStyle={{
              width: "40%",
              backgroundColor: "#6C4AB6",
              borderRadius: 20,
            }}
            dropdownTextStyle={{
              width: "100%",
              backgroundColor: "#6C4AB6",
              color: "white",
            }}
            options={["Text", "CheckBox", "Date", "Number"]}
          >
            <Text style={styles.textStyle}><Ionicons
              name="md-add-outline"
              size={20}
              color="white"
            /></Text>
          </ModalDropdown>

          <ModalDropdown
            onSelect={(e: any) => {
              handleSelectFieldTitleNameRedux(e, item);
            }}
            style={[styles.button, { marginBottom: 5 }]}
            dropdownStyle={{
              width: "40%",
              backgroundColor: "#6C4AB6",
              borderRadius: 20,
            }}
            dropdownTextStyle={{
              width: "100%",
              backgroundColor: "#6C4AB6",
              color: "white",
            }}
            options={categoryListData[item]?.fields?.map((item: any) => item.name)}
          >
            <Text style={styles.textStyle}>
              Title Field: {categoryListData[item]?.title_field}
            </Text>
          </ModalDropdown>
        </View>
        <Pressable
          style={[
            styles.button,
            styles.buttonClose,
            { marginBottom: 5, backgroundColor: "red" },
          ]}
          onPress={(e) => {
            handleDeleteCategoryToRedux(e, item);
          }}
        >
          <Text style={styles.textStyle}>
            <Ionicons name="md-trash-outline" size={20} color="white" />
            Delete
          </Text>
        </Pressable>
      </View>
    );
  };
  const handleDeleteField = (e: any, index: number) => {
    categoryData?.fields.splice(index, 1);
    fieldsList.splice(index, 1);
    setFieldsList(fieldsList);
    setCategoryData(categoryData);
    getFieldNamesFromArray();
  };
  const handleSaveCategories = (e: any) => {
    let data = {};
    data = {
      [categoryName]: categoryData,
    };
    dispatch(
      SaveCategories({ ...categoryListData, [categoryName]: categoryData })
    );
    setIsShowAddCategoryModal(!isShowAddCategoryModal);
    setCategoryName("New Category");
    setFieldsList(null);
    setFieldsListInfo(null);
    setCategoryData([]);
    setFieldsNameList([]);
    SetSelectedFieldNameTitle("");
  };
  const handleChangeCategoryName = (value: string) => {
    setCategoryName(value);
    categoryData.categoryName = value;
    setCategoryData(categoryData);
  };
  const handleChangeCategoryNameToRedux = (value: string, key: string) => {
    categoryListData[key].categoryName = value;
    dispatch(SaveCategories(categoryListData));
  };
  const handleChangeKeyToRedux = (categoryKey: string) => {
    let key = categoryListData[categoryKey].categoryName;
    let data = categoryListData[categoryKey];
    delete categoryListData[categoryKey];
    categoryListData[key] = data;
    navigation.navigate("Manage Categories");

    dispatch(SaveCategories(categoryListData));
    let keysData = [];
    if (categoryListData) {
      let keys = Object.keys(categoryListData);
      for (let k of keys) {
        keysData.push(k);
      }
      setCategoryKeys(keysData);
    }
    setRender(true)
  };
  const handleSetFieldNameToRedux = (
    value: string,
    index: number,
    key: string
  ) => {
    categoryListData[key].fields[index].name = value;
  };
  const handleDeleteFieldToRedux = (e: any, index: number, key: string) => {
    categoryListData[key]?.fields.splice(index, 1);
    dispatch(SaveCategories(categoryListData));
    setRender(true)
  };
  const handleSelectFieldTypeToRedux = (type_id: number, key: string) => {
    let type = "";
    if (type_id == 0) {
      type = "Text";
    }
    if (type_id == 1) {
      type = "CheckBox";
    }
    if (type_id == 2) {
      type = "Date";
    }
    if (type_id == 3) {
      type = "Number";
    }
    let fields = {
      type: type,
      name: "",
    };
    categoryListData[key]?.fields.push(fields);
    dispatch(SaveCategories(categoryListData));
    setRender(true);
  };
  const handleDeleteCategoryToRedux = (e: any, key: string) => {
    // return;
    delete categoryListData[key];
    let keysData = [];
    if (categoryListData) {
      let keys = Object.keys(categoryListData);
      for (let k of keys) {
        keysData.push(k);
      }
      setCategoryKeys(keysData);
    }
    delete categoryListData['categoryListData']
    setCategoryData(categoryListData)
    dispatch(SaveCategories(categoryListData));
    setRender(true);

  };
  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.parentContainer}
    >
      <Text style={{ display: "none" }}>{render}</Text>
      <SafeAreaView style={styles.mainContainer}>
        <FlatList
          style={{ padding: 5 }}
          data={categoryKeys}
          renderItem={(item) => _renderCategories(item)}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={(e) => {
                handleAddCategory(e);
              }}
            >
              <Text style={styles.buttonText}>Add New Categories</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Separator />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isShowAddCategoryModal}
          onRequestClose={() => {
            setIsShowAddCategoryModal(!isShowAddCategoryModal);
          }}
        >
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={[styles.centeredView]}>
              <View style={[styles.modalView]}>
                <Text style={styles.modalText}>{categoryName}</Text>
                <View style={styles.modalViewBody}>
                  <TextInput
                    placeholder={categoryName}
                    style={styles.inputCategoryName}
                    onChangeText={(value) => {
                      handleChangeCategoryName(value);
                    }}
                    placeholderTextColor="#c0c0c0"
                    value={categoryName}
                  />
                  <FlatList
                    style={{ padding: 5 }}
                    data={categoryData?.fields}
                    renderItem={(item) => _renderFields(item)}
                  />
                  <View style={styles.addNewField}>
                    <ModalDropdown
                      onSelect={(e: any) => {
                        handleSelectFieldType(e);
                      }}
                      style={[styles.button, { marginBottom: 5 }]}
                      dropdownStyle={{
                        width: "40%",
                        backgroundColor: "#6C4AB6",
                        borderRadius: 20,
                      }}
                      dropdownTextStyle={{
                        width: "100%",
                        backgroundColor: "#6C4AB6",
                        color: "white",
                      }}
                      options={["Text", "CheckBox", "Date", "Number"]}
                    >
                      <Text style={styles.textStyle}>
                        <Ionicons
                          name="md-add-outline"
                          size={20}
                          color="white"
                        />
                      </Text>
                    </ModalDropdown>
                    <ModalDropdown
                      onSelect={(e: any) => {
                        handleSelectFieldTitleName(e);
                      }}
                      style={[styles.button, { marginBottom: 5 }]}
                      dropdownStyle={{
                        width: "40%",
                        backgroundColor: "#6C4AB6",
                        borderRadius: 20,
                      }}
                      dropdownTextStyle={{
                        width: "100%",
                        backgroundColor: "#6C4AB6",
                        color: "white",
                      }}
                      options={fieldsNameList}
                    >
                      <Text style={styles.textStyle}>
                        Title Field:
                        {fieldsNameList[0]?.name
                          ? "Un Named"
                          : selectedFieldNameTitle}
                      </Text>
                    </ModalDropdown>
                  </View>
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
                      style={[styles.button, styles.buttonClose]}
                      onPress={() =>
                        setIsShowAddCategoryModal(!isShowAddCategoryModal)
                      }
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ManageCategories;
