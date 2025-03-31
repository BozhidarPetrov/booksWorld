Booksworld is a simple app that's intended for book lovers. I created it with the purpose of training and better understanding the concept of NGRX Store and for me it was very helpful.

Frontent is an Angular 18 standalone app, using NGRX for store and ngrx-rehydrate to keep the state after refresh (therefore no SSR). Angular Material and Bootstrap are used for styling.
Backend is an Express JS server with Mongoose DB. Route guards and other functionalities are used to prevent both users and guests from accessing pages they are not allowed to and from performing actions they shouldn't be able to do, preventing sending invalid information to the backend, preventing the backend itself from crashing, etc.
The main functions are:
Book - add / edit / delete / like / dislike / comment
Comment - add / edit / delete / like / dislike
User - register / login / logout / edit user profile
