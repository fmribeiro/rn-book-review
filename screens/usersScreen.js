import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";
import * as userActions from "../store/actions/users";

const UsersScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const loadUsers = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(userActions.fetchUsers());
    } catch (error) {
      console.log(error);
    }

    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadUsers().then(() => {});
  }, [dispatch, loadUsers]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadUsers);

    return () => {
      unsubscribe();
    };
  }, [loadUsers]);

  return (
    <FlatList
      onRefresh={loadUsers}
      refreshing={isRefreshing}
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <Card style={styles.card}>
          <CustomText style={styles.title}>{itemData.item.name}</CustomText>
          <CustomText>{itemData.item.nickname}</CustomText>
          <Image
            style={styles.image}
            source={{
              uri: "https://images.unsplash.com/photo-1621803495185-208bdf587f80?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
            }}
          />
          <View>
            <CustomText>
              Livros lidos: {itemData.item.following.length}
            </CustomText>
            <CustomText>
              Resenhas feitas: {itemData.item.books.length}
            </CustomText>
            <CustomText>Seguindo: {itemData.item.reviews.length}</CustomText>
          </View>
        </Card>
      )}
    />
  );
};

export const userScreenOptions = (navData) => {
  return {
    headerTitle: "Usuários",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Search"
          iconName="md-search"
          onPress={() => {
            navData.navigation.navigate("Search");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: "roboto-bold",
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 200,
    height: 200,
    margin: 5,
    borderRadius: 100,
  },
});

export default UsersScreen;
