import { useEffect, useState } from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Dashboard from "./../components/Dashboard";
import ManageCategories from "./../components/ManageCategories";
import CategoryDetail from "./../components/CategoryDetail";
import { getCategories } from "../redux/selectors";
import { SaveCategories } from "../redux/action/CategoriesAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";

const Drawer = createDrawerNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#B9E0FF",
    secondary: "#8D72E1",
  },
};

const Route: React.FC = () => {
  const dispatch = useDispatch();
  let categoryListData: any = useSelector(getCategories);
  const [render, setRender] = useState<boolean>(false);

console.log(categoryListData,'categoryListData')
  useEffect(() => {
    // setRender(!render)
    if (categoryListData) {
      AsyncStorage.setItem("categoryListData", JSON.stringify(categoryListData));
    }
  }, [categoryListData]);
  useEffect(() => {
    setRender(false)
    
  }, [render]);
  useEffect(() => {
    const interval = setInterval(function() {
      setRender(true)
    }, 2000);
  //  clearInterval(interval);
    
  }, []);
  useEffect(() => {
    
    getDataFromAsyncStorage(
      "categoryListData"
    ).then((data: any) => {
      if (data !== null) {
        dispatch(SaveCategories(data));
      }
    });
  }, []);


  const getDataFromAsyncStorage = async (key: string) => {
    let data: object | null = JSON.parse(await AsyncStorage.getItem(key));
    return data;
  };

  const routeCategories = categoryListData;

  let getCategoryKeys: string[] = [];
  if (routeCategories) {
    getCategoryKeys = Object.keys(routeCategories);
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {render}
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
          drawerStyle: {
            backgroundColor: "#6C4AB6", //Set Drawer background
            paddingTop: 20, //Set Drawer width
          },
          drawerActiveBackgroundColor:"#380b99",
          drawerInactiveBackgroundColor:"#6C4AB6",
          drawerLabelStyle:{color:'white'},
          headerStyle: {
            backgroundColor: "#6C4AB6", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      >
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        {getCategoryKeys &&
          getCategoryKeys?.map((item: any, index: number) => {
            return (
              <Drawer.Screen
                key={index}
                name={item}
                component={CategoryDetail}
                initialParams={{ data: routeCategories[item] }}
              />
            );
          })}
        <Drawer.Screen name="Manage Categories" component={ManageCategories} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default Route;
