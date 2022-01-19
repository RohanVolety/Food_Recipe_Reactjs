import {useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App=()=>{

const APP_ID = "";
const APP_KEY="";
//const exampleReq=`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
const [recipes,setRecipes]=useState([]);
const[search,setSearch]=useState('');
const [query,setQuery]=useState('chicken');


useEffect(()=>{
getRecipies();
},[query]);

const getRecipies=async()=>{
  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  );
  const data=await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
  
};
const updateSearch=e=>{
  setSearch(e.target.value);

};

const getSearch=e=>{
  e.preventDefault();
  setQuery(search);
  getSearch('');
}

return (
  <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
      <button className="search-button" type="submit">
        search
      </button>
    </form>
    {recipes.map((recipe) => (
      <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
      />
    ))}
  </div>
);
}

export default App;
