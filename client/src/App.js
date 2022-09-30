import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav";
import RecipeDetails from "./Components/RecipeDetails";
import Leading from "./Components/Leading";
import Home from "./Components/Home";
import CreateRecipe from "./Components/Create";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Leading />}></Route>
          <Route exact path="/" element={<Nav />}>
          <Route exact path="/home" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route exact path="/create" element={<CreateRecipe />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
