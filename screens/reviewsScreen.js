import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import * as reviewActions from "../store/actions/reviews";

const BottomCardButtons = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={props.onDetails} style={styles.button}>
        <MaterialIcons name="preview" size={23} style={styles.icon} />
      </TouchableOpacity>

      {props.isUserLogged && (
        <TouchableOpacity onPress={props.onFavorite} style={styles.button}>
          <MaterialIcons
            name="favorite-outline"
            size={23}
            color={Colors.accentColor}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}

      {props.isUserLogged && (
        <TouchableOpacity onPress={props.onEdit} style={styles.button}>
          <MaterialIcons name="edit" size={23} style={styles.icon} />
        </TouchableOpacity>
      )}

      {props.isUserLogged && (
        <TouchableOpacity onPress={props.onRemove} style={styles.button}>
          <MaterialIcons name="delete" size={23} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const BottomCardInfo = (props) => {
  return (
    <View style={styles.reviewInfo}>
      <View>
        <CustomText style={styles.reviewInfoText}>{props.date}</CustomText>
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.7}>
          <CustomText style={styles.reviewInfoText}>
            {props.loggedUser}
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ReviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  const loadReviews = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(reviewActions.fetchReviews());
    } catch (error) {
      console.log(error);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadReviews().then(() => {
      // console.log(`reviews: ${reviews}`);
      setIsLoading(false);
    });
  }, [dispatch, loadReviews]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadReviews);
    return () => {
      unsubscribe();
    };
  }, [loadReviews]);

  const reviewDetailsHandler = (review) => {
    props.navigation.navigate("ReviewDetails", { review: review });
  };

  const addReviewHandler = () => {
    props.navigation.navigate("AddEditReview");
  };

  return (
    <FlatList
      onRefresh={loadReviews}
      refreshing={isRefreshing}
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <Card style={styles.card}>
          <View style={styles.reviewTextContainer}>
            <CustomText style={styles.title}>
              {itemData.item.bookTitle}
            </CustomText>
            <CustomText numberOfLines={10}>{itemData.item.review}</CustomText>
          </View>

          <BottomCardButtons
            isUserLogged={false}
            onDetails={() => {
              reviewDetailsHandler(itemData.item);
            }}
          />

          <BottomCardInfo
            date={itemData.item.insertDate}
            loggedUser={itemData.item.user.nickname}
          />
        </Card>
      )}
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
  button: {
    marginLeft: 5,
  },
  buttonContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  reviewInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
  },
  reviewInfoText: {
    fontSize: 12,
    fontFamily: "roboto-bold",
  },
  reviewTextContainer: {
    marginLeft: 5,
  },
  icon: {
    color: Colors.primaryTextColor,
  },
  buttonContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ReviewScreen;

// <View>
// <ScrollView style={{ height: "100%" }}>
//   <View>
//     <Card style={styles.card}>
//       <View style={styles.reviewTextContainer}>
//         <CustomText style={styles.title}>{review.title}</CustomText>
//         <CustomText numberOfLines={10}>{review.text}</CustomText>
//       </View>

//       <BottomCardButtons
//         isUserLogged={false}
//         onDetails={() => {
//           reviewDetailsHandler();
//         }}
//       />

//       <BottomCardInfo date="22/02/2021 18:09" loggedUser="loggedUser72" />
//     </Card>
//   </View>
// </ScrollView>

// <SimpleFloatingActionButton buttonHandler={addReviewHandler} />
// </View>
