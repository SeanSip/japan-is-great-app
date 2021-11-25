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
  const [selectedRegion, setSelectedRegion] = useState("");
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


  const removeComment = (remove) => {
    // get access to our database
    const dbRef = firebase.database().ref();

    // use a new firebase methods to remove an item
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
      <img src="japanRegionMap1.png" alt="" />
    </header>
  <div className="wrapper">
    <div className="App">
      
      <div class="region">
      <h1>What Will You Do In: <span> { selectedRegion }</span></h1>
      </div>

      
        <form onSubmit={handleSubmit}>
          <label htmlFor="newComment">Write your comments below:</label>
            <input 
            placeholder="Please type in your adventure here"
            id="newComment"
            type="text"
            value={ userInput }
            onChange={ handleChange }
            />
          </form>
      <div class="submitContainer">
          <ul class="addedComments">
            {
              recommendationsList.map(recommendation => {
                return(
                  <li key={ recommendation.id }>
                    <button onClick={ () => removeComment(recommendation.id) }>Remove</button>
                    {recommendation.comment}
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
