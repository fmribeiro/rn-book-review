import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";

import { reviewsScreenOptions } from "../components/reviewList";
import AddEditReviewScreen, {
  AddEditReviewScreenOptions,
} from "../screens/addEditReviewScreen";
import ReviewDetailsScreen, {
  reviewsDetailsScreenOptions,
} from "../screens/ReviewDetailsScreen";
import ReviewsScreen from "../screens/reviewsScreen";
import SearchScreen, {
  searchScreenOptions,
} from "../screens/SearchReviewsScreen";
import MyReviewsScreen, {
  myReviewsScreenOptions,
} from "../screens/userReviewsScreen";
import { defaultNavOptions } from "./defaultNavOptions";

const ReviewStackNavigator = createStackNavigator();

export const ReviewNavigator = (props) => {
  return (
    <ReviewStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ReviewStackNavigator.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={reviewsScreenOptions}
      />

      <ReviewStackNavigator.Screen
        name="ReviewDetails"
        component={ReviewDetailsScreen}
        options={reviewsDetailsScreenOptions}
      />

      <ReviewStackNavigator.Screen
        name="AddEditReview"
        component={AddEditReviewScreen}
        options={AddEditReviewScreenOptions}
      />

      <ReviewStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />
    </ReviewStackNavigator.Navigator>
  );
};

const UserReviewsStackNavigator = createStackNavigator();
export const MyReviewsNavigator = (props) => {
  return (
    <UserReviewsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserReviewsStackNavigator.Screen
        name="UserReviews"
        component={MyReviewsScreen}
        options={myReviewsScreenOptions}
      />

      <UserReviewsStackNavigator.Screen
        name="ReviewDetails"
        component={ReviewDetailsScreen}
        options={reviewsDetailsScreenOptions}
      />

      <UserReviewsStackNavigator.Screen
        name="AddEditReview"
        component={AddEditReviewScreen}
        options={AddEditReviewScreenOptions}
      />

      <UserReviewsStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />
    </UserReviewsStackNavigator.Navigator>
  );
};

const SearchReviewStackNavigator = createStackNavigator();

export const searchReviewNavigator = () => {
  return (
    <SearchReviewStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SearchReviewStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />

      <SearchReviewStackNavigator.Screen
        name="ReviewDetails"
        component={ReviewDetailsScreen}
        options={reviewsDetailsScreenOptions}
      />
    </SearchReviewStackNavigator.Navigator>
  );
};
