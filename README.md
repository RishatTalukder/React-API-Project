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
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

> I also imported the `Minty` theme from `Bootswatch`. You can choose any other theme from [here](https://bootswatch.com/).