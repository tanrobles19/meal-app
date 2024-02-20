import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import MealDetail from "../components/MealDetail";
import IconButton from "../components/IconButton";
import MealList from "../components/mealDetail/MealList";
import SubTitle from "../components/mealDetail/SubTitle";
import { MEALS } from "../data/dummy-data";
import { useLayoutEffect, useContext } from "react";
import { FavoriteContext } from "../store/context/favorite-context";

function MealDetailScreen({ route, navigation }) {
  const favoriteMealsCtx = useContext(FavoriteContext);

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

  function changeFavoriteStatusHandler() {
    if(mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    }else{
      favoriteMealsCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={changeFavoriteStatusHandler}
            icon={mealIsFavorite ? "star" : "star-outline"}
            size={24}
            color="white"
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <>
      <View>
        <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetail
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          affordability={selectedMeal.affordability}
          textStyle={styles.detailText}
        />
      </View>
      <ScrollView style={styles.scroll}>
        <SubTitle>Ingredients</SubTitle>
        <MealList data={selectedMeal.ingredients} />
        <SubTitle>Steps</SubTitle>
        <MealList data={selectedMeal.steps} />
      </ScrollView>
    </>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: 24,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
});
