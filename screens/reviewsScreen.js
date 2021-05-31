import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";
import SimpleFloatingActionButton from "../components/SimpleFloatingActionButton";
import Colors from "../constants/Colors";
import * as reviewActions from "../store/actions/reviews";

const BottomCardButtons = (props) => {
  return (
    <View>
      {false && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={props.onDetails} style={styles.button}>
            <MaterialIcons name="preview" size={23} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.onFavorite} style={styles.button}>
            <MaterialIcons
              name="favorite-outline"
              size={23}
              color={Colors.accentColor}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.onEdit} style={styles.button}>
            <MaterialIcons name="edit" size={23} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.onRemove} style={styles.button}>
            <MaterialIcons name="delete" size={23} style={styles.icon} />
          </TouchableOpacity>
        </View>
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

  const onClickHandler = (review) => {
    props.navigation.navigate("ReviewDetails", { review });
  };

  //http://books.google.com/books/content?id=OVAtAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
  //"https://images.unsplash.com/photo-1471970394675-613138e45da3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmV2aWV3fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
  return (
    <View>
      <FlatList
        onRefresh={loadReviews}
        refreshing={isRefreshing}
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Card style={styles.card}>
            <TouchableNativeFeedback
              onPress={() => {
                onClickHandler(itemData.item);
              }}
            >
              <View>
                <View style={{ alignItems: "center", marginBottom: 5 }}>
                  <Image
                    style={{
                      width: "100%",
                      height: 300,
                      borderRadius: 3,
                    }}
                    source={{
                      uri: "https://images.unsplash.com/photo-1471970394675-613138e45da3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmV2aWV3fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
                    }}
                  />
                </View>

                <View style={styles.reviewTextContainer}>
                  <CustomText style={styles.title}>
                    {itemData.item.bookTitle}
                  </CustomText>
                  <CustomText numberOfLines={10}>
                    {itemData.item.review}
                  </CustomText>
                </View>

                <BottomCardButtons
                  isUserLogged={true}
                  onDetails={() => {
                    reviewDetailsHandler(itemData.item);
                  }}
                />

                <BottomCardInfo
                  date={itemData.item.insertDate}
                  loggedUser={itemData.item.user.nickname}
                />
              </View>
            </TouchableNativeFeedback>
          </Card>
        )}
      />
      <SimpleFloatingActionButton buttonHandler={addReviewHandler} />
    </View>
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
