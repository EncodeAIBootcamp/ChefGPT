# AI Chef Report

## Version 1

### 4 Scenarios

#### 3 Valid Inputs
- Given more than one ingredient, the chef responds with a dish that incorporates them
- Given a dish, the chef responds with a recipe for that dish
- Given a recipe, the chef responds with a critique along with changes to improve that recipe

#### 1 Invalid Input
- Given anything but the inputs described above, the chef asks the user to try again

If the user passes a different prompt than these three scenarios as the first message, the AI should deny the request and ask to try again.


## Ingredients

#### Input:
```
>>> Your request to the chef can be 1 of 3 things.
If you want a dish, enter more than one ingredient.
If you want a recipe, provide the name of a dish.
If you want a critique and suggestions to improve a recipe, enter a recipe.
Please enter your request:

potatoes and rice
```

#### Output
Dirty Rice


## Dish

#### Input:
```
>>> Your request to the chef can be 1 of 3 things.
If you want a dish, enter more than one ingredient.
If you want a recipe, provide the name of a dish.
If you want a critique and suggestions to improve a recipe, enter a recipe.
Please enter your request:

Dirty Rice
```

#### Output
Recipe for Dirty Rice:

Ingredients:
- 1 pound ground beef
- 1 onion, diced
- 1 green bell pepper, diced
- 2 stalks celery, diced
- 3 cloves garlic, minced
- 1 cup white rice
- 2 cups chicken broth
- 1 teaspoon paprika
- 1 teaspoon cayenne pepper
- 1 teaspoon thyme
- Salt and pepper to taste
- Green onions, chopped, for garnish

Instructions:
1. In a large skillet, brown the ground beef over medium-high heat.
2. Add the onion, bell pepper, celery, and garlic. Cook until vegetables are softened.
3. Stir in the rice, paprika, cayenne pepper, thyme, salt, and pepper.
4. Pour in the chicken broth and bring to a boil.
5. Reduce heat to low, cover, and simmer for 20 minutes or until rice is cooked and liquid is absorbed.
6. Fluff the rice with a fork and garnish with chopped green onions before serving.

Enjoy your delicious Dirty Rice!


## Recipe

#### Input:
```
>>> Your request to the chef can be 1 of 3 things.
If you want a dish, enter more than one ingredient.
If you want a recipe, provide the name of a dish.
If you want a critique and suggestions to improve a recipe, enter a recipe.
Please enter your request:

1 pound ground beef 1 onion, diced 1 green bell pepper, diced 2 stalks celery, diced 3 cloves garlic, minced 1 cup white rice 2 cups chicken broth 1 teaspoon paprika 1 teaspoon cayenne pepper 1 teaspoon thyme Salt and pepper to taste Green onions, chopped, for garnish In a large skillet, brown the ground beef over medium-high heat. Add the onion, bell pepper, celery, and garlic. Cook until vegetables are softened. Stir in the rice, paprika, cayenne pepper, thyme, salt, and pepper. Pour in the chicken broth and bring to a boil. Reduce heat to low, cover, and simmer for 20 minutes or until rice is cooked and liquid is absorbed. Fluff the rice with a fork and garnish with chopped green onions before serving.
```

#### Output:
I would suggest a few changes to the recipe to enhance the flavors and textures in the dish. Firstly, try seasoning the ground beef with salt and pepper while browning to add more depth of flavor. Additionally, consider adding some diced tomatoes or tomato sauce to add moisture and a tangy contrast to the dish. You can also try adding some Worcestershire sauce for a savory kick. Lastly, for extra freshness and brightness, squeeze some lemon juice over the dish before serving. Enjoy your meal!


## Invalid Input

#### Input:
```
>>> Your request to the chef can be 1 of 3 things.
If you want a dish, enter more than one ingredient.
If you want a recipe, provide the name of a dish.
If you want a critique and suggestions to improve a recipe, enter a recipe.
Please enter your request:

blue
```

#### Output:
Sorry, I need more information. Can you please provide me with ingredients, a dish name, a recipe, or ask for a cooking tip?%


## Version 2

### 2 Scenarios

#### 1 Valid Input
- Given more than one ingredient, the chef responds with a dish that incorporates them, a recipe for that dish, and a critique for that recipe along with changes to improve it

#### 1 Invalid Input
- Given anything but the input described above, the chef asks the user to try again

## Ingredients

#### Input:
```
>>> Send more than one ingredient to the chef and the chef will respond with a dish that incorporates those ingredients, a recipe for that dish, and then a critique of that recipe along with suggested changes to improve it.
>>> Please enter your ingredients:

potatoes and rice
```
#### Output:

Potato and Rice Pilaf

2 tablespoons olive oil
1 onion, diced
2 cloves garlic, minced
2 cups white rice, rinsed and drained
4 cups chicken or vegetable broth
2 potatoes, peeled and diced
Salt and pepper to taste
1 teaspoon paprika

In a large pot, heat the olive oil over medium heat. Add the onion and garlic, sauté until soft.
Add the rice and cook for 2-3 minutes, stirring frequently.
Pour in the broth, add the potatoes, salt, pepper, and paprika. Bring to a boil.
Reduce heat to low, cover, and simmer for about 20 minutes or until the rice is cooked and the potatoes are tender.
Fluff with a fork before serving.

Critique:
This recipe is a good starting point for a Potato and Rice Pilaf, but it could use some improvements to enhance the flavors and textures. I would suggest adding some herbs such as thyme or parsley for extra flavor. Additionally, incorporating some toasted nuts like almonds or pine nuts would add a nice crunch to the dish. Lastly, a splash of lemon juice at the end can help brighten up the flavors.%

## Invalid Input

#### Input:
```
>>> Send more than one ingredient to the chef and the chef will respond with a dish that incorporates those ingredients, a recipe for that dish, and then a critique of that recipe along with suggested changes to improve it.
>>> Please enter your ingredients:

blue
```

#### Output:
I'm sorry, I didn't receive a list of ingredients. Please provide a list of ingredients so I can suggest a recipe for you.