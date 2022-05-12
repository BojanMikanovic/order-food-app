import React, {useEffect, useState} from "react";
import MealItem from "./MealItem/MealItem";

import Card from "../UI/Card";
import classes from './AvailableMeals.module.css';



  const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
      const fetchMeals = async() => {
        const response = await fetch('https://react-http-b2819-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

        if(!response.ok) {
          throw new Error('Something went wrong');
        }

        const responseData = await response.json();

        const loadedMeals = [];

        for(const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      };

      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });

    },[]);

    if(isLoading) {
      return (
        <section className={classes.MealsLoading}>
          <h2>Loading....</h2>
        </section>
      );
    }

    if(httpError) {
      return (
        <section className={classes.MealsError}>
          <h2>{httpError}</h2>
        </section>
      )
    }

    const mealsList = meals.map((meal) => (
      <MealItem 
        key={meal.id}
        id={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    ));

    return(
        <section className={classes.meals}>
            <Card>
              <ul>{mealsList}</ul>
            </Card>
        </section>
    )
  };

  export default AvailableMeals;