import './App.css';
import firebase from './firebase.js';
import { useEffect, useState } from 'react'

/*
*
* Explore Japan App
* -  -  -  -  -  -  -  -  -  -  -  -  -  -  
*
* Landing view which would be main app.js (home page) 
*
* Region component which will show firebase comments associated with that region 
*
* Comment box component that will allow the use to post a comment to the region object in firebase
*
* Set this all up for one region and make sure it is working and I am happy with it (and then I can add another region, and so on...)
*
* Props (tell components how to change - build a component to respond to the prop)
*
*
* 1st level Homepage is our App.jsx
* 2nd level call region component 
*     3rd level comment box component (inside region component)   
*
* Homepage : nav & li - also has our landing page img (map of Japan)
*
* Region component: call to firebase, loop through that data and display it
*
* final component: takes users information into text field, user then submits info with submit button, component posts that information to firebase
*
* Stretch Goals:
*
* 1st: Set up our region component so that it refreshes itself when new info is added to firebase
*
* 2nd: To use props for each component so that I can add different regions (make 1 component that is uses a prop that can then change the context of the region component to be different regions)
*/

function App() {
  const [selectedRegion, setSelectedRegion] = useState("Kanto");
  const [recommendationsList, setRecommendationsList] = useState([])
  const [userInput, setUserInput] = useState("")
  
  const selectRegion = (event) => {
    setSelectedRegion(event.target.value);
  }

  //testing
  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push(userInput);
    setUserInput('');
  }
  //testing ^

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
    // e.target.value 
    setUserInput(e.target.value)
  }





  return (
  <>  
    <div className="App">
      <nav>
        <ul class="regionNav">
          <li><button value="kanto" onClick={selectRegion}>Kanto</button></li>
          <li><button value="kansai" onClick={selectRegion}>Kansai</button></li>
          <li><button value="hokkaido" onClick={selectRegion}>Hokkaido</button></li>
          <li><button value="kyushu" onClick={selectRegion}>Kyushu</button></li>
        </ul>
      </nav>
      <h1>Experience Japan Together!</h1>
      <div>
        { selectedRegion }
      </div>

      {/*  testing  */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Write your comment here</label>
        <input 
        id=""
        type="text"
        value={ userInput }
        onChange={ handleChange }
        />
        </form>

        <ul>
          {
            recommendationsList.map(recommendation => {
              return(
                <li key={ recommendation.id }>
                  {recommendation.comment}
                </li>
              )
            })
          }
        </ul>
        {/* testing */}
    </div>
  </>
  );
}

export default App;
