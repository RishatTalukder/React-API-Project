# React API Project (Dringo)

Well I think you guys learned enough of `React` to build a big project. So here is a project for you to build using `React` and a `public API`.

This project will have some interesting features and a lot of API calls also we will need to use the advanced concepts of `React` like `context API`, `reducers` and `routing`.

So, if you guys are not familiar with these concepts than please look for my previous articles where I have explained these concepts in detail. Also, I have a video series on `React` where I have explained these concepts in detail.

So, with that said, I'm `Md. Rishat Talukder` and let's get started.

- [LinkedIn](https://www.linkedin.com/in/pro-programmer/)
- [YouTube](http://www.youtube.com/@itvaya)
- [gtihub](https://github.com/RishatTalukder/learning_react)
- [Gmail](talukderrishat2@gmail.com)
- [discord](https://discord.gg/ZB495XggcF)

# Project Overview

This is a Project based on the `free public API` called [TheCocktailDB](https://www.thecocktaildb.com/api.php).

![alt text](image.png)

These API's and very useful for learning and building projects. So, I'll try to make a project using this API where we can search for cocktails and view their details.

And That's it.

It sounded cooler in my head.

But now I realized it sounds kinda anticlimactic.

But we are going to use all our react knowledge to make a scaleble, structured and well designed project.

So, Let's do it!

# Project Requirements

- `Vite` as a build tool
- `React` as a UI library
- `React Router` for routing
- `Context API` for state management
- `Fetch API` for making API calls
- `Bootstrap` for styling (you can use any other CSS framework or write your own CSS)
- `React Icons` for icons(maybe)
- `Reducers` for managing complex state logic

> If you guys don't know how to use these than LEARN IT!

# Setup

Let's create a new project using `Vite`.

```bash
npm create vite@latest drinko
```

Select `React` and `JavaScript` as the template.

Now, navigate to the project directory and install the required dependencies.

```bash
cd drinko

npm install react-router bootstrap bootswatch react-icons axios
```

> React Router for routing, Bootstrap and Bootswatch for styling, React Icons for icons and Axios for making API calls.

remove the `assets` folder, the `App.css` file and the `index.css` file from the `src` folder.

And after editing the `main.jsx` and `App.jsx` files you should have something like this.

```js {.line-numbers}
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootswatch/dist/minty/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

> I also imported the `Minty` theme from `Bootswatch`. You can choose any other theme from [here](https://bootswatch.com/).

```js {.line-numbers}
// App.jsx

function App() {
  return <main className="container">Hello</main>;
}

export default App;
```

Now, you can start the development server using the following command.

```bash
npm run dev
```

We should see a `Hello` message on the screen.

That means we are ready rumble!

# Let's Plan

Before we start coding, let's plan the project structure and the components we will need.

First what pages do we need?

- `Home Page` - This page will have a search bar and will display the search results or just display some random cocktails.
- `About Page` - This page will have some information about the project and the API used.
- `Single Cocktail Page` - This page will display the details of a single cocktail.
- `Error Page` - This page will display a 404 error message if the user tries to access a non-existing route.

How, do we manage the state?

We have some options to choose from like `Reducer`, `context API` or raw `useState` and `useEffect` hooks.

I'll use the `context API` and `reducers` to manage the state.

What components do we might need?

- `Navbar` - This component will have the navigation links to different pages.
- `Search Form` - This component will have the search bar and the search button.
- `Cocktail List` - This component will display the list of cocktails.
- `Cocktail Item` - This component will display a single cocktail item in the list.
- `Loading` - This component will display a loading spinner when the data is being fetched.(Just because loading spinners are cool)
- `Error` - This component will display an error message if the API call fails.

I can think of these components for now. We might need more components as we progress.

SO, let's start with the `Reducer` and the `Context API`.

# Reducer and Context API

Let's create a new folder called `context` in the `src` folder. Inside the `context` folder, create two files `GlobalContext.jsx` and `reducer.js`.

```js {.line-numbers}
// src/context/reducer.js
export const reducer = (state, action) => {
  return state;
};
```

> The reducer function will just return the state for now. We will add more and more logic to it as we progress.

```js {.line-numbers}
// src/context/GlobalContext.jsx
import React, { createContext, useContext } from "react";
import { useReducer } from "react";
import { reducer } from "./reducer";

const appContext = createContext();

export const useAppContext = () => {
  return useContext(appContext);
};

const initialState = {};

const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <appContext.Provider value={{ ...state, dispatch }}>
      {children}
    </appContext.Provider>
  );
};

export default GlobalContext;
```

> The `GlobalContext` component will wrap the entire application and provide the state and dispatch function to all the components.

Now, let's wrap the `App` component with the `GlobalContext` component in the `main.jsx` file.

```js {.line-numbers}
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootswatch/dist/minty/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { GlobalContext } from "./context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContext>
      <App />
    </GlobalContext>
  </StrictMode>
);
```

Now, we can access the state and dispatch function in any component using the `useAppContext` hook.

And whenever we need a new state variable, we can just add it to the `initialState` object in the `GlobalContext.jsx` file and handle the logic in the `reducer.js` file.

And it'll be available to all the components.

Now, we need to set up the routing for the application.

# Setting up Routing

Let's create two new folders called `components`, and `pages` in the `src` folder.

Let's start with the navbar component.

```js {.line-numbers}
// src/components/Navbar.jsx
import React, { memo } from "react";
import { Link } from "react-router";
import { FaBars, FaCocktail } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaCocktail className="mb-1" /> Dringo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default memo(Navbar);
```

> I memoized the `Navbar` component using `React.memo` to prevent unnecessary re-renders.
> Let's render it in the `App.jsx` file.

> Note: If you just add the `Navbar` component in the `App.jsx` file, it will throw an error because we used the `Link` component from `react-router' which won't work unless we wrap the `App`component with the`BrowserRouter`component from`react-router-dom`.

So, let's do that.

```js {.line-numbers}
// App.jsx
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
      </main>
    </BrowserRouter>
  );
}

export default App;
```

Now, we can see the navbar on the screen.

A very simple one with some stylling I copied from the `Bootstrap` website.

Now, that we have a navbar, we can set up the routes for the application.

As I included two links in the navbar (Home and About), I'll have 2 routes for these pages and one more route for the `Single Cocktail Page` and one more for the `Error Page`.

So, let's first make placeholder components for these pages.

```js {.line-numbers}
// src/pages/Home.jsx
import React, { memo } from "react";

const Home = () => {
  return <h1>Home Page</h1>;
};
export default memo(Home);
```

```js {.line-numbers}
// src/pages/About.jsx
import React, { memo } from "react";

const About = () => {
  return <h1>About Page</h1>;
};
export default memo(About);
```

```js {.line-numbers}
// src/pages/SingleCocktail.jsx
import React, { memo } from "react";

const SingleCocktail = () => {
  return <h1>Single Cocktail Page</h1>;
};

export default memo(SingleCocktail);
```

```js {.line-numbers}
// src/pages/Error.jsx
import React, { memo } from "react";

const Error = () => {
  return <h1>404 Error Page</h1>;
};
export default memo(Error);
```

Now, That we have the placeholder components, ready I think we also need to setup a `SharedLayout` component. Because the `Navbar` component will be present in all the pages.

So, let's create a new folder called `layout` in the `src` folder and create a file called `SharedLayout.jsx` inside the `layout` folder.

```js {.line-numbers}
// src/layout/SharedLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
```

Now, we can simply lazy import the `SharedLayout` component in the `App.jsx` file and wrap all the routes with it.

```js {.line-numbers}
import { BrowserRouter, Routes, Route } from "react-router";
import React, { Suspense, lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const SingleCocktail = lazy(() => import("./pages/SingleCocktail"));
const Error = lazy(() => import("./pages/Error"));
import SharedLayout from "./layout/SharedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cocktail/:id" element={<SingleCocktail />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

> Here I used `React.lazy` and `Suspense` to lazy load the components. This will improve the performance of the application by loading only the required components.

Wrapping the whole `Routes` component with the `Suspense` component will show a fallback UI (Loading...) while the lazy loaded components are being loaded.

Inside the `Routes` component, I wrapped all the routes with the `SharedLayout` component except the `Error` route because we don't want to show the navbar on the error page.

Path for the `Single Cocktail Page` is `/cocktail/:id` where `:id` is a dynamic parameter that will be used to fetch the details of a single cocktail.

The `index` route is used to render the `Home` component when the user visits the root path (`/`).

`/about` route is used to render the `About` component.

As we are lazy loading the components, we need to wrap the `components` with the `Suspense` component.

We can do that by wrapping the `Outlet` component with the `Suspense` component in the `SharedLayout` component.

```js {.line-numbers}
// src/layout/SharedLayout.jsx
import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;
```

And we have the routing set up.

Before we move on to the logical part, let's make the `Error` page look good and a new loading component to show while the data is being fetched and in general when loading anything.

# Making Error page Look good

Well, I kinda dull looking if there is only a text saying `404 Error Page`.

So, Though why not make it look good with some styling.

```js {.line-numbers}
// src/pages/Error.jsx
import React, { memo } from "react";

const Error = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 text-center" style={{ maxWidth: 400 }}>
        <h1 className="display-4 text-danger mb-3">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default memo(Error);
```

> A simple Box that will show a 404 error message and a button to go back to the home page.

# Loading Component

I just want to make a component that will show a loading spinner while the data is being fetched.

```js {.line-numbers}
// src/components/Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
```

> A simple loading spinner using Bootstrap classes.

Now, we can use this `Loading` component wherever we need to show a loading spinner.

And there we have a Nice looking `Error` page and a `Loading` component.

# Fetching Data from the API

We have the basic structure of the project ready.

And we can now focus on the logical part of the project.

We need to fetch data from the API and display it on the `Home` page.

To, fetch the data effectively, we need to know that what we are working with.

The API we are using is [TheCocktailDB](https://www.thecocktaildb.com/api.php).

There you can see some pretty cool free APIs. I'll not use all of them but just a few.

- Search cocktail by name - `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`

This endpoint will return a list of cocktails that match the search query at the very end of the URL. Here the search query is `margarita`. You can change it to anything you want.

Another endpoint is

- Lookup full cocktail details by id - `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007`

This endpoint will return the details of a single cocktail based on the id provided at the end of the URL. Here the id is `11007`. You can change it to any valid id.

So, let's start with the `Home` page.

# Home Page

First let's try to load some random cocktails on the home page.

If you take a look at the API documentation, you can see that the `cocktail DB` API doesn't have an endpoint to fetch random cocktails.

So, We will improvise.

As we are using the search endpoint to fetch cocktails with a cirtain name and it will return a list of cocktails that match the search query, meaning if we search for `a`, it will return a list of cocktails that have `a` in their name.

We can use this to our advantage.

When the `home` page `loads`, we can make an API call to fetch cocktails with a random letter.

Than we can display the results on the console.

```js {.line-numbers}
// src/pages/Home.jsx
import React, { memo, useEffect, useState} from "react"; 
import axios from "axios";
import Loading from "../components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState(null);

  const fetchCocktails = async () => {
    try {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const randomLetter =
        letters[Math.floor(Math.random() * letters.length)]; // Get a random letter
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${randomLetter}`
      ); // Make an API call to fetch cocktails with the random letter
      const data = response.data.drinks;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <h1>Home Page</h1>;
};
export default memo(Home);
```

Now, when we visit the home page and go to the console, we can see a list of cocktails with a random letter in their name.

We are successfully fetching data from the API.

But there is a huge issue.

Let's have a look at the `data` we are getting from the API.

```json
[
  {
      "idDrink": "17141",
      "strDrink": "Smut",
      "strDrinkAlternate": null,
      "strTags": null,
      "strVideo": null,
      "strCategory": "Punch / Party Drink",
      "strIBA": null,
      "strAlcoholic": "Alcoholic",
      "strGlass": "Beer mug",
      "strInstructions": "Throw it all together and serve real cold.",
      "strInstructionsES": "Mézclalo todo y sírvelo bien frío.",
      "strInstructionsDE": "Schütte alles zusammen und serviere es kalt.",
      "strInstructionsFR": "Mélangez le tout et servez froid.",
      "strInstructionsIT": "Metti tutto insieme e servi freddo.",
      "strInstructionsZH-HANS": null,
      "strInstructionsZH-HANT": null,
      "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/rx8k8e1504365812.jpg",
      "strIngredient1": "Red wine",
      "strIngredient2": "Peach schnapps",
      "strIngredient3": "Pepsi Cola",
      "strIngredient4": "Orange juice",
      "strIngredient5": null,
      "strIngredient6": null,
      "strIngredient7": null,
      "strIngredient8": null,
      "strIngredient9": null,
      "strIngredient10": null,
      "strIngredient11": null,
      "strIngredient12": null,
      "strIngredient13": null,
      "strIngredient14": null,
      "strIngredient15": null,
      "strMeasure1": "1/3 part ",
      "strMeasure2": "1 shot ",
      "strMeasure3": "1/3 part ",
      "strMeasure4": "1/3 part ",
      "strMeasure5": null,
      "strMeasure6": null,
      "strMeasure7": null,
      "strMeasure8": null,
      "strMeasure9": null,
      "strMeasure10": null,
      "strMeasure11": null,
      "strMeasure12": null,
      "strMeasure13": null,
      "strMeasure14": null,
      "strMeasure15": null,
      "strImageSource": null,
      "strImageAttribution": null,
      "strCreativeCommonsConfirmed": "No",
      "dateModified": "2017-09-02 16:23:32"
    },
    .... // and many more
]
```

So, many attributes. We need to filter out the data we need.

Because managing and using all these attributes will be a nightmare.

So, we will filter out the data we need and store it in the `cocktails` state variable.

I think we know how we can do that.

```js {.line-numbers}
// src/pages/Home.jsx
import React, { memo, useEffect, useState} from "react"; 
import axios from "axios";
import Loading from "../components/Loading";


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState(null);

  const fetchCocktails = async () => {
    try {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const randomLetter =
        letters[Math.floor(Math.random() * letters.length)]; // Get a random letter
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${randomLetter}`
      ); // Make an API call to fetch cocktails with the random letter
      const data = response.data.drinks;
      if (data) {
        const newCocktails = data.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strCategory,
            strAlcoholic,
            strGlass,
            strInstructions,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            category: strCategory,
            alcoholic: strAlcoholic,
            glass: strGlass,
            instructions: strInstructions,
          };
        });
        setCocktails(newCocktails);
      } else {
        setError("No cocktails found");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <h1>Home Page</h1>;

};
export default memo(Home);
```

> Here we are filtering out the data we need and storing it in the `cocktails` state variable by mapping and returning a new object with only the required attributes Because we don't need all the attributes from the API response. 

Okay, it works... Now we integrate this whole process with the `GlobalContext` and `reducer` we created earlier.

Go to the `GlobalContext.jsx` file and add a new state variable called `cocktails` and a new action called `SET_COCKTAILS` in the `reducer.js` file.

```js {.line-numbers}
// src/context/GlobalContext.jsx
import React, { createContext, useContext } from "react";
import { useReducer } from "react";
import { reducer } from "./reducer";

const appContext = createContext();

export const useAppContext = () => {
  return useContext(appContext);
};

const initialState = {
  cocktails: [],
  loading: true,
  error: null,
};

const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <appContext.Provider value={{ ...state, dispatch }}>
      {children}
    </appContext.Provider>
  );
};

export default GlobalContext;
```

Now we can access the `cocktails`, `loading` and `error` state variables in any component using the `useAppContext` hook.

So, let's setup the `reducer.js` file to handle the `SET_COCKTAILS`, `SET_LOADING` and `SET_ERROR` actions.

```js {.line-numbers}
// src/context/reducer.js
export const SET_COCKTAILS = "SET_COCKTAILS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === SET_COCKTAILS) {
    return { ...state, cocktails: payload, loading: false, error: false };
  }

  if (type === SET_LOADING) {
    return { ...state, loading: payload };
  }

  if (type === SET_ERROR) {
    return { ...state, error: payload };
  }

  throw new Error(`No matching action type: ${type}`); // This will throw an error if the action type is not recognized.
};


```

> Here we are handling the `SET_COCKTAILS`, `SET_LOADING` and `SET_ERROR` actions in the reducer function. When the `SET_COCKTAILS` action is dispatched, it will update the `cocktails` state variable with the payload and set the `loading` state to false and `error` to null. Similarly, for the `SET_LOADING` and `SET_ERROR` actions.

Now, we can use these actions in the `Home` page to fetch the data and update the state.

```js {.line-numbers}
// src/pages/Home.jsx
import React, { memo, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import CocktailList from "../components/CocktailList";
import { useAppContext } from "../context/GlobalContext";
import { SET_COCKTAILS, SET_LOADING, SET_ERROR } from "../context/reducer";

const Home = () => {
  const { cocktails, loading, error, dispatch } = useAppContext();

  const fetchCocktails = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const randomLetter = letters[Math.floor(Math.random() * letters.length)]; // Get a random letter
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${randomLetter}`
      ); // Make an API call to fetch cocktails with the random letter
      const data = response.data.drinks;
      if (data) {
        const newCocktails = data.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strCategory,
            strAlcoholic,
            strGlass,
            strInstructions,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            category: strCategory,
            alcoholic: strAlcoholic,
            glass: strGlass,
            instructions: strInstructions,
          };
        });
        dispatch({ type: SET_COCKTAILS, payload: newCocktails });
      } else {
        dispatch({ type: SET_ERROR, payload: true });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_ERROR, payload: true });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  useEffect(() => {
    if (!cocktails || cocktails.length === 0) {
      fetchCocktails();
    }
    // Only fetch if cocktails are not already loaded
  }, [cocktails]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="alert alert-danger">Something went wrong</div>;
  }

  return <CocktailList />;
};
export default memo(Home);
```

> We are now using the `useAppContext` hook to access the `cocktails`, `loading`, `error` and `dispatch` function from the `GlobalContext`. We are dispatching the `SET_LOADING`, `SET_COCKTAILS` and `SET_ERROR` actions to update the state based on the API response.
> If the API call is successful, we are dispatching the `SET_COCKTAILS` action with the new cocktails data. If there is an error, we are dispatching the `SET_ERROR` action with an error message. And finally, we are dispatching the `SET_LOADING` action with `false` to indicate that the data has been fetched and the loading state is complete
> We also added a check to see if the `cocktails` state is empty before making the API call. This will prevent unnecessary API calls when the data is already loaded.

Well, it's working fine. We are fetching the data from the API and updating the state using the `dispatch` function.
      
Now, we can display the cocktails on the home page.

The `home` page is already cluttered with a lot of code. So, I think it would be better to create a new component called `CocktailList` that will display the list of cocktails.

# Rendering the Cocktails

Let's create a new file called `CocktailList.jsx` in the `components` folder.

```js {.line-numbers}
// src/components/CocktailList.jsx
import React, { memo } from "react";
import CocktailItem from "./CocktailItem";
import { useAppContext } from "../context/GlobalContext";

const CocktailList = () => {
  const { cocktails } = useAppContext();

  return (
    <div className="row">
      {cocktails.map((cocktail) => (
        <CocktailItem key={cocktail.id} cocktail={cocktail} />
      ))}
    </div>
  );
};
export default memo(CocktailList);

```

> The `CocktailList` component will receive the `cocktails` state variable from the `GlobalContext` and map through it to render a list of `CocktailItem` components.

Now, we need to create the `CocktailItem` component that will display a single cocktail item.

```js {.line-numbers}
// src/components/CocktailItem.jsx
import React, { memo } from "react";
import { Link } from "react-router";
import { FaCocktail } from "react-icons/fa";

const CocktailItem = ({ cocktail }) => {
  const { id, name, image, category, alcoholic, glass } = cocktail;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            <strong>Category:</strong> {category}
          </p>
          <p className="card-text">
            <strong>Type:</strong> {alcoholic}
          </p>
          <p className="card-text">
            <strong>Glass:</strong> {glass}
          </p>
          <Link to={`/cocktail/${id}`} className="btn btn-primary">
            <FaCocktail /> Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default memo(CocktailItem);

```

> The `CocktailItem` component will receive a single cocktail object as a prop and display its details like name, image, category, type, and glass type. It will also have a link to the `Single Cocktail Page` where the user can see more details about the cocktail.

Now, we can see the list of cocktails on the home page.

Now, let's implement the `Search Form` component that will allow the user to search for cocktails by name.

# Search Form Component

Let's create a `cocktail search form` inside the `Home` page.

```js {.line-numbers}
// src/pages/Home.jsx
import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import CocktailList from "../components/CocktailList";
import { useAppContext } from "../context/GlobalContext";
import { SET_COCKTAILS, SET_LOADING, SET_ERROR } from "../context/reducer";

const Home = () => {
  const { cocktails, loading, error, dispatch } = useAppContext();
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCocktails = async (term) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`
      );
      const data = response.data.drinks;
      if (data) {
        const newCocktails = data.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strCategory,
            strAlcoholic,
            strGlass,
            strInstructions,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            category: strCategory,
            alcoholic: strAlcoholic,
            glass: strGlass,
            instructions: strInstructions,
          };
        });
        dispatch({ type: SET_COCKTAILS, payload: newCocktails });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: {
            type: true,
            message: "No cocktails found for the search term.",
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_ERROR,
        payload: {
          type: true,
          message: "Error fetching cocktails. Please try again later.",
        },
      });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  useEffect(() => {
    if (!cocktails || cocktails.length === 0) {
      fetchCocktails(randomLetter); // Default search term
    }
  }, [cocktails]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchCocktails(searchTerm);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for cocktails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      {loading && <Loading />}
      {error && (
        <div className="alert alert-danger">
          {error.message || "An error occurred while fetching cocktails."}
        </div>
      )}
      {cocktails && cocktails.length > 0 ? (
        <CocktailList cocktails={cocktails} />
      ) : (
        !loading && <div className="alert alert-info">No cocktails found</div>
      )} 
    </>
  );
};
export default memo(Home);
```

> Here, I added a search form that allows the user to search for cocktails by name. The `searchTerm` state variable is used to store the search term entered by the user. When the user submits the form, the `handleSearch` function is called which fetches the cocktails based on the search term.
> If the search term is empty, it will fetch cocktails with a random letter as before. If the search term is not empty, it will fetch cocktails based on the search term.

So, I did some adjustments to the `fetchCocktails` function to accept a search term as an argument. If the search term is empty, it will fetch cocktails with a random letter as before. If the search term is not empty, it will fetch cocktails based on the search term.

Also for better error management, I updated the `error` state to be an object with `type` and `message` properties. This way, we can display a more descriptive error message to the user.

And finally, I added a check to see if the `cocktails` state is empty before rendering the `CocktailList` component. If there are no cocktails found, it will display a message saying "No cocktails found".

Standered stuff and totally not filled with bugs that I don't even know about.

Great work team!
![alt text](image-1.png)

Now time to implement the single cocktail page.

# Single Cocktail Page

Let's implement the `Single Cocktail Page` where we will display the details of a single cocktail.

So, we are getting a list of cocktails on the home page and when the user clicks on a cocktail, they will be redirected to the `Single Cocktail Page` where we will display the details of that cocktail.

Now, That we are going into a new page, we need to fetch the details of the cocktail based on something...

As we have a list of cocktails stored in the `cocktails` state variable, we can use the `id` of the cocktail to fetch the details of that cocktail.

But that will be unuseful because we filtered the data we need and stored it in the `cocktails` state variable. So, some data is already missing.

So, it is a best practice to create a new API endpoint to fetch the details of a single cocktail based on the `id` of the cocktail.

And `cocktail DB` has an endpoint for that.

So, when we are clicking of a cocktail, we will set a dynamic route for the `Single Cocktail Page` and pass the `id` of the cocktail in the URL.

We can get the `id` from the URL using the `useParams` hook from `react-router`. And use that to fetch the details of the cocktail from the API(www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007).

So, let's go to the `SingleCocktail.jsx` file and implement the logic to fetch the details of the cocktail based on the `id` from the URL.

First, we need to add a new state and actions in the `GlobalContext.jsx` and `reducer.js` files to handle the details of the cocktail.

```js {.line-numbers}
// src/context/GlobalContext.jsx
import React, { createContext, useContext } from "react";
import { useReducer } from "react";
import { reducer } from "./reducer";

const appContext = createContext();

export const useAppContext = () => {
  return useContext(appContext);
};

const initialState = {
  cocktails: [],
  loading: true,
  error: null,
  details: {}, // new state for single cocktail details
  singleLoading: true, // new state for single cocktail loading
  singleError: null, // new state for single cocktail error
};

const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <appContext.Provider value={{ ...state, dispatch }}>
      {children}
    </appContext.Provider>
  );
};

export default GlobalContext;

```
> I added a new state variable called `details` to store the details of the cocktail.

```js {.line-numbers}
// src/context/reducer.js
export const SET_COCKTAILS = "SET_COCKTAILS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_DETAILS = "SET_DETAILS";
export const SET_SINGLE_LOADING = "SET_SINGLE_LOADING";
export const SET_SINGLE_ERROR = "SET_SINGLE_ERROR";

export const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === SET_COCKTAILS) {
    return { ...state, cocktails: payload, loading: false, error: false };
  }

  if (type === SET_LOADING) {
    return { ...state, loading: payload };
  }

  if (type === SET_ERROR) {
    return { ...state, error: payload };
  }

  if (type === SET_DETAILS) {
    return { ...state, details: payload, singleLoading: false, singleError: false };
  }
  if (type === SET_SINGLE_LOADING) {
    return { ...state, singleLoading: payload };
  }

  if (type === SET_SINGLE_ERROR) {
    return { ...state, singleError: payload };
  }

  throw new Error(`No matching action type: ${type}`); // This will throw an error if the action type is not recognized.
};

```

> I added a new action called `SET_DETAILS` to handle the details of the cocktail. When this action is dispatched, it will update the `details` state variable with the payload and set the `loading` state to false and `error` to null.


```js {.line-numbers}
// src/pages/SingleCocktail.jsx
import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../context/GlobalContext";
import axios from "axios";
import Loading from "../components/Loading";
import {
  SET_SINGLE_LOADING,
  SET_SINGLE_ERROR,
  SET_DETAILS,
} from "../context/reducer";
import { formatCocktailDetails } from "../context/reducer";
const SingleCocktail = () => {
  const { singleLoading, singleError, details, dispatch } = useAppContext();
  const { id } = useParams();

  const fetchCocktailDetails = async () => {
    dispatch({ type: SET_SINGLE_LOADING, payload: true });
    dispatch({ type: SET_SINGLE_ERROR, payload: null }); // Reset previous error
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = response.data.drinks;
      if (data && data.length > 0) {
        const item = data[0];
        const {
          idDrink,
          strDrink,
          strDrinkThumb,
          strCategory,
          strAlcoholic,
          strGlass,
          strInstructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          strMeasure1,
          strMeasure2,
          strMeasure3,
          strMeasure4,
          strMeasure5,
        } = item; // destructuring the item object
        const cocktailDetails = {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          category: strCategory,
          alcoholic: strAlcoholic,
          glass: strGlass,
          instructions: strInstructions,
          ingredients: [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ].filter(Boolean), // filtering out any null or undefined ingredients
          measures: [
            strMeasure1,
            strMeasure2,
            strMeasure3,
            strMeasure4,
            strMeasure5,
          ].filter(Boolean), // filtering out any null or undefined measures
        };
        dispatch({ type: SET_DETAILS, payload: cocktailDetails });
      } else {
        dispatch({
          type: SET_SINGLE_ERROR,
          payload: {
            type: true,
            message: "No cocktail found for this ID.",
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_SINGLE_ERROR,
        payload: {
          type: true,
          message: "Error fetching cocktail details. Please try again later.",
        },
      });
    } finally {
      dispatch({ type: SET_SINGLE_LOADING, payload: false });
    }
  };

  useEffect(() => {
    fetchCocktailDetails();
    // eslint-disable-next-line
  }, [id]);

  if (singleLoading) {
    return <Loading />;
  }

  if (singleError) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {singleError.message}
      </div>
    );
  }

  if (!details || !details.id) {
    return (
      <div className="alert alert-warning text-center mt-5" role="alert">
        No cocktail details available.
      </div>
    );
  }


  ... // rest of the code stays the same for now

}
export default memo(SingleCocktail);
```

> Here, we are using the `useParams` hook to get the `id` of the cocktail from the URL. Then we are making an API call to fetch the details of the cocktail based on the `id`. We are also dispatching the `SET_LOADING`, `SET_DETAILS`, and `SET_ERROR` actions to update the state in the `GlobalContext`.

The fetching process is similar to the one we did in the `Home` page. We are using the `axios` library to make the API call and then dispatching the `SET_DETAILS` action with the cocktail details.

Now if you look at the logic inside the `fetchCocktailDetails` function, we are destructuring the `item` object to get the details of the cocktail. We are also filtering out any null or undefined ingredients and measures.

This is manual work and we can do it in a better way.

Instead of cluttering the code with a lot of destructuring inside the `fetchCocktailDetails` function, we can move this logic to inside the `reducer.js` file.

Let's create a new function called `formatCocktailDetails` that will take the `item` object as an argument and return a formatted cocktail details object.

```js {.line-numbers}
// src/context/reducer.js
export const formatCocktailDetails = (item) => {
  const {
    idDrink,
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strGlass,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,  
    strMeasure5,
  } = item; // destructuring the item object
  return {
    id: idDrink,
    name: strDrink,
    image: strDrinkThumb,
    category: strCategory,
    alcoholic: strAlcoholic,
    glass: strGlass,
    instructions: strInstructions,
    ingredients: [
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
    ].filter(Boolean), // filtering out any null or undefined ingredients
    measures: [
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
    ].filter(Boolean), // filtering out any null or undefined measures
  };
};

```

> The `formatCocktailDetails` function will take the `item` object as an argument and return a formatted cocktail details object. This way, we can keep the `fetchCocktailDetails` function clean and readable. Now we can use this function inside the `fetchCocktailDetails` function to format the cocktail details.

```js {.line-numbers}
// src/pages/SingleCocktail.jsx
import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../context/GlobalContext";
import axios from "axios";
import Loading from "../components/Loading";
import {
  SET_SINGLE_LOADING,
  SET_SINGLE_ERROR,
  SET_DETAILS,
} from "../context/reducer";
import { formatCocktailDetails } from "../context/reducer";
const SingleCocktail = () => {
  const { singleLoading, singleError, details, dispatch } = useAppContext();
  const { id } = useParams();

  const fetchCocktailDetails = async () => {
    dispatch({ type: SET_SINGLE_LOADING, payload: true });
    dispatch({ type: SET_SINGLE_ERROR, payload: null }); // Reset previous error
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = response.data.drinks;
      if (data && data.length > 0) {
        const cocktailDetails = formatCocktailDetails(data[0]);
        dispatch({ type: SET_DETAILS, payload: cocktailDetails });
      } else {
        dispatch({
          type: SET_SINGLE_ERROR,
          payload: {
            type: true,
            message: "No cocktail found for this ID.",
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_SINGLE_ERROR,
        payload: {
          type: true,
          message: "Error fetching cocktail details. Please try again later.",
        },
      });
    } finally {
      dispatch({ type: SET_SINGLE_LOADING, payload: false });
    }
  };

  useEffect(() => {
    fetchCocktailDetails();
  }, [id]);

  if (singleLoading) {
    return <Loading />;
  } // check if loading

  if (singleError) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {singleError.message}
      </div>
    );
  } // check if there is an error

  if (!details || !details.id) {
    return (
      <div className="alert alert-warning text-center mt-5" role="alert">
        No cocktail details available.
      </div>
    );
  } // check if details is empty

  ... // rest of the code stays the same for now

}
export default memo(SingleCocktail);
```

> Now we are using the `formatCocktailDetails` function to format the cocktail details. This way, we can keep the `fetchCocktailDetails` function clean and readable.

Now, I want to make a new component and send the details to that component as props and render the details there.

Because the `SingleCocktail` component is already cluttered with a lot of code. So, I think it would be better to create a new component called `CocktailDetails` that will display the details of the cocktail.

```js {.line-numbers}
// src/components/CocktailDetails.jsx
import React, { memo } from "react";
import { Link } from "react-router";
import { FaCocktail } from "react-icons/fa";

const CocktailDetails = ({ details }) => {
  const {
    id,
    name,
    image,
    category,
    alcoholic,
    glass,
    instructions,
    ingredients,
    measures,
  } = details;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-primary mb-4">
        <FaCocktail /> Back to Home
      </Link>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded-start" alt={name} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <p className="card-text">
                <strong>Category:</strong> {category}
              </p>
              <p className="card-text">
                <strong>Type:</strong> {alcoholic}
              </p>
              <p className="card-text">
                <strong>Glass:</strong> {glass}
              </p>
              <p className="card-text">
                <strong>Instructions:</strong> {instructions}
              </p>
              <h5>Ingredients:</h5>
              <ul className="list-group list-group-flush">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="list-group-item">
                    {ingredient} - {measures[index] || ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CocktailDetails);
```

Now we just connect this component to the `SingleCocktail` page and send the `details` as props to the `CocktailDetails` component.

```js {.line-numbers}
// src/pages/SingleCocktail.jsx
import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../context/GlobalContext";
import axios from "axios";
import Loading from "../components/Loading";
import {
  SET_SINGLE_LOADING,
  SET_SINGLE_ERROR,
  SET_DETAILS,
} from "../context/reducer";
import { formatCocktailDetails } from "../context/reducer";
import CocktailDetails from "../components/CocktailDetails";
const SingleCocktail = () => {
  const { singleLoading, singleError, details, dispatch } = useAppContext();
  const { id } = useParams();

  const fetchCocktailDetails = async () => {
    dispatch({ type: SET_SINGLE_LOADING, payload: true });
    dispatch({ type: SET_SINGLE_ERROR, payload: null }); // Reset previous error
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = response.data.drinks;
      if (data && data.length > 0) {
        const cocktailDetails = formatCocktailDetails(data[0]);
        dispatch({ type: SET_DETAILS, payload: cocktailDetails });
      } else {
        dispatch({
          type: SET_SINGLE_ERROR,
          payload: {
            type: true,
            message: "No cocktail found for this ID.",
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_SINGLE_ERROR,
        payload: {
          type: true,
          message: "Error fetching cocktail details. Please try again later.",
        },
      });
    } finally {
      dispatch({ type: SET_SINGLE_LOADING, payload: false });
    }
  };

  useEffect(() => {
    fetchCocktailDetails();
  }, [id]);

  if (singleLoading) {
    return <Loading />;
  }

  if (singleError) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {singleError.message}
      </div>
    );
  }

  return (
    <>
      {!singleLoading && !singleError && details ? (
        <CocktailDetails details={details} />
      ) : (
        <div className="alert alert-warning text-center mt-5" role="alert">
          No cocktail details available.
        </div>
      )}
    </>
  );
};

export default memo(SingleCocktail);
```

> Here, we are importing the `CocktailDetails` component and rendering it inside the `SingleCocktail` component. We are also passing the `details` state variable as props to the `CocktailDetails` component.

And that's it. We have successfully implemented the `Single Cocktail Page` where we can see the details of a single cocktail.

And the logical part over...

![alt text](image-2.png)

This is exactly what I had to do make to make this app work. This was a struggle but we made it.

Now is the time for adding a `about` page and this project is done. I'll not be showing you the code for the about page because it's just a static page with some text and images. You can easily create it by yourself.

So, It'll be your task to add a nice little portfolio component in the about page and make it look nice.

And we are done here.

But are we really done?

Before we finish I want to share this project to everyone.

So, I need to deploy this project.

I haven't talked about deployment yet.

So, I think it'll be a good idea to show you how to deploy a react app.

# Deployment

Deploying a React app is very easy