import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React from "react";
import { useState } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";

import AppNavigator from "./navigation/AppNavigator";
import authReducer from "./store/reducers/auth";
import booksReducer from "./store/reducers/books";
import reviewsReducer from "./store/reducers/reviews";
import usersReducer from "./store/reducers/users";

const rootReducer = combineReducers({
  reviews: reviewsReducer,
  books: booksReducer,
  users: usersReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const ref = React.useRef(null);

  const navigate = (route) => {
    return ref.current && ref.current.navigate(route);
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
// <FloatingActionButton navigate={navigate} />

// <NavigationContainer>
//   <DrawerNavigator />
// </NavigationContainer>
