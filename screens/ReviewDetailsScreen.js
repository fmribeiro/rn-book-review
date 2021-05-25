import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";

const ReviewDetailsScreen = (props) => {
  const review = props.route.params ? props.route.params.review : null;

  return (
    <ScrollView>
      <View>
        <View style={styles.reviewTextContainer}>
          <CustomText style={styles.title}>{review.bookTitle}</CustomText>
          <CustomText style={styles.text}>{review.review}</CustomText>
        </View>
      </View>
    </ScrollView>
  );
};

export const reviewsDetailsScreenOptions = (navData) => {
  return {
    headerTitle: "Detalhes resenha",
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
    textAlign: "center",
  },
  reviewTextContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    textAlign: "justify",
    fontSize: 16,
  },
});

export default ReviewDetailsScreen;
