import './App.css';
import firebase from './firebase.js';
import { useEffect, useState } from 'react'



function App() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [recommendationsList, setRecommendationsList] = useState([])
  const [userInput, setUserInput] = useState("")
  
  const selectRegion = (event) => {
    setSelectedRegion(event.target.value);
  }

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push(userInput);
    setUserInput('');
  }
  

  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const data = response.val();
      const newState = [];
      
      for (let property in data) {
        newState.push({
          comment: data[property],
          id: property,
        })
      }
      setRecommendationsList(newState)
    })

  }, [])
  const handleChange = (e) => {
    setUserInput(e.target.value)
  }


  const removeComment = (remove) => {
    const dbRef = firebase.database().ref();
    dbRef.child(remove).remove();
  }


return (
<>
    <header>
      <nav>
        <ul class="regionNav">
          <li><button value="Hokkaido Region" onClick={selectRegion}>Hokkaido</button></li>
          <li><button value="Tohoku Region" onClick={selectRegion}>Tohoku</button></li>
          <li><button value="Kanto Region" onClick={selectRegion}>Kanto</button></li>
          <li><button value="Chubu Region" onClick={selectRegion}>Chubu</button></li>
          <li><button value="Kansai Region" onClick={selectRegion}>Kansai</button></li>
          <li><button value="Chugoku Region" onClick={selectRegion}>Chugoku</button></li>
          <li><button value="Shikoku Region" onClick={selectRegion}>Shikoku</button></li>
          <li><button value="Kyushu Region" onClick={selectRegion}>Kyushu</button></li>
          <li><button value="Okinawa Region" onClick={selectRegion}>Okinawa</button></li>
        </ul>
      </nav>
      <img src="japanRegionMap1.png" alt="A map of Japan" />
    </header>
  <div className="wrapper">
    <div className="App">
      
      <div class="region">
      <h1>What Will You Do In: <span> { selectedRegion }</span></h1>
      </div>

      
        <form onSubmit={handleSubmit}>
          <label htmlFor="newComment">Write your comments below:</label>
            <input 
            required="true"
            placeholder="Please type in your adventure here"
            id="newComment"
            type="text"
            value={ userInput }
            onChange={ handleChange }
            />
            <button>Submit</button>
          </form>
      <div class="submitContainer">
          <ul class="addedComments">
            {
              recommendationsList.map(recommendation => {
                return(
                  <li key={ recommendation.id }>
                    {recommendation.comment}
                    <button onClick={ () => removeComment(recommendation.id) }>Remove</button>
                  </li>
                )
              })
            }
          </ul>
      </div> 
      {/* end of App div */}
    </div>
  </div>
</>  
  );
}


export default App;
