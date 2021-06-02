import React, { useContext } from "react";
import { View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import ReviewsList from "../components/reviewList";
import * as reviewActions from "../store/actions/reviews";
import { PageContext } from "../utils/page-context";

const MyReviewsScreen = (props) => {
  const [loggedUser] = useContext(PageContext);

  const loadReviews = reviewActions.fetchUserReviews(
    loggedUser.user.id,
    loggedUser.authentication.token
  );

  return (
    <ReviewsList
      fetchReviewsActions={loadReviews}
      navigation={props.navigation}
    />
  );
};

export const myReviewsScreenOptions = (navData) => {
  return {
    headerTitle: "Minhas resenhas",
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

export default MyReviewsScreen;
