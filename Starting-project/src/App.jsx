import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx"
import  TabButton  from "./components/TabButton.jsx";
import {useState} from 'react'

// let tabbutton = "Please click on" # Will not update the UI so we use concept of State
let tabcontent = "Please click on"
let [userState, setUserState] = useState(tabcontent)
function App() {
  
  let handleClick = (state) =>{
    setUserState(
      tabcontent=state
    );
  }
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Time to get started!</h2>
          <ul>
            {CORE_CONCEPTS.map((concept, idx) => (
              <CoreConcept key={idx} {...concept} />
            ))}
          </ul>
        </section>
        <section id= "examples">
          <h2>Examples</h2>
          <menu>
            {/* <TabButton label="Components"/> */}
            <TabButton onSelect={() => handleClick('Components')}>Components</TabButton>
            <TabButton onSelect={()=> handleClick('JSX')}>JSX</TabButton>
            <TabButton onSelect={()=>handleClick('Props')}>Props</TabButton>
            <TabButton onSelect={()=>handleClick('State')}>State</TabButton>
          </menu>
          {tabcontent}
        </section>
      </main>
    </div>
  );
}

export default App;
