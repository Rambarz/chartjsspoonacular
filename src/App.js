import "./App.css";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";

function App() {
  const [recipe, setRecipe] = useState();
  const [doughnotData, setDoughnotData] = useState();

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    //EXCHANGE IT WITH YOUR API KEY!!!
    const data = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?minCarbs=50&maxCarbs=500&apiKey=APIKEYHEREASANUMBER`
    );
    const res = await data.json();
    const recipeDoughnutNutritionData = [
      parseInt(res[0].carbs),
      parseInt(res[0].fat),
      parseInt(res[0].protein),
    ];
    const recipeDoughnutNutritionLabels = ["Carbs", "Fat", "Protein"];
    const doughnut = {
      width: "500px",
      height: "500px",
      labels: recipeDoughnutNutritionLabels,
      datasets: [
        {
          label: "Recipe",
          data: recipeDoughnutNutritionData,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
        },
      ],
    };
    setDoughnotData(doughnut);
    setRecipe(res[0]);
    console.log(res[0]);
  };

  if (recipe === undefined) {
    return <div className="loading">Loading....</div>;
  } else {
    return (
      <div className="App">
        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="recipe-image-section">
          <p className="recipe-title">Beispielbild:</p>
          <img className="recipe-img" src={recipe.image} alt="recipe" />
        </div>
        <div className="nutrition-section">
          <p className="recipe-title">Inhalte:</p>
          <Doughnut
            width={500}
            height={500}
            className="doughnut"
            data={doughnotData}
          />
        </div>
      </div>
    );
  }
}

export default App;
