# Meal Manager

An app created for the budget minded cook

### Recipes

A user can create and view recipes to use for cooking, and every users recipes are unique to them. At this time, there is no way to share recipes with others, but this is planned to be added in the future. Every recipe has at minimum one ingredient and one direction. Each recipe also has extra data that a user could/should fill out, such as nutrition info and number of servings. Recipes will also show data about how much the total cost of the meals are and the cost of the individual meals, based on what ingredients a user has in their pantry.

When viewing a recipe, a user will have the option to edit or delete the recipe, assuming that they own it. Editing and deleting recipes that do not belong to the user (i.e. a recipe that has been shared with the user). Users will also be able to clicks a button to open a dialog that shows the directions for the recipe in a step-by-step manner by using a carousel. When this dialog is open, we will make use of the wakelock API to keep the screen on for the user.

### Pantry

A users pantry is a list of ingredients that are used in individual recipes. Ingredients within the pantry have a name and an optional price, and updating the price regularly increases the accuracy of the cost per meal for individual recipes. It is important to note that the pantry is only used for listing ingredients, not the quantities that are used for cooking. 

There will be setting that a user can change to alter the behavior of items in the pantry. For instance, there will be a setting to automatically add an item that is marked as empty in the pantry to the shopping list.

### Shopping cart

A users shopping cart will be their home for getting the ingredients they need for cooking. Each users shopping cart will operate as a standard shopping cart would, where a user can add any ingredients from their pantry and can mark them as complete when they have the ingredient. Additionally, a users shopping cart will pull any added price data from the pantry and calculate an estimate of the users final cost.

### Settings

There are several settings a user can change for their account. These settings are listed in greater deatil below.
* **Preferences**
  - **Add tax to shopping cart:** An option for the user to add tax to the shopping cart.
  - **Change tax percentage:** An option to change the percent charged in taxes for the area the user is shopping in. Used to provide better accuracy for shopping cart price
  - **Automatically add empty items to shopping list:** An option that when enabled, will automatically add an item marked as empty in the pantry to the shopping list.
  - **Delete items from shopping list:** An option that when enabled, will delete items from the users shopping list when they are marked complete. If disabled, the items will appear as complete and be moved to the bottom of the list.
  - **Add new items to pantry:** When enabled, will automatically add items that are not already in the users pantry when they are added when creating a recipe.
* **Appearance**
  - **Theme:** Gives the user the option to change the theme of the application between light and dark mode. The theme options are light, dark, and match system.
* **Account**
  - **Display name:** Gives the user the option the change their display name.
  - **User name:** Gives the user the option to change their user name.
  - **Delete account:** Gives the user the option to delete their account. Doing this will also delete all recipes, ingredients, and any other data associated with the user.

## Future features
* [ ] Add a picture gallery for the user to upload pictures of their creations. This can also be used for adding pictures to directions when cooking.
* [ ] A feature to allow users to share their recipes with others.
* [ ] Auto sort ingredients in a shopping list based on the ingredients category, i.e. dairy, bread, etc.
* [ ] Add a feature that allows a user to change their profile picture. This change will only take affect in the app.
* [ ] A feature to add any ingredients in a recipe that are marked as empty in the pantry to the shopping list.
