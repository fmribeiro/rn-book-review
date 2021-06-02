import React from "react";
import { View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import ReviewsList from "../components/reviewList";
import * as reviewActions from "../store/actions/reviews";

const ReviewsScreen = (props) => {
  const loadReviews = reviewActions.fetchReviews();

  return (
    <ReviewsList
      fetchReviewsActions={loadReviews}
      navigation={props.navigation}
    />
  );
};

export const reviewsScreenOptions = (navData) => {
  return {
    headerTitle: "Resenhas",
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
  };
};

export default ReviewsScreen;
