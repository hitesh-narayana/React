import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx"
import  TabButton  from "./components/TabButton.jsx";
import {useState} from 'react'

// let tabbutton = "Please click on" # Will not update the UI so we use concept of State
function App() {
  const [userData, setUserData] = useState("Please Click on ")
  let handleClick = (state) =>{
    setUserData(state);
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
          {userData}
        </section>
      </main>
    </div>
  );
}

export default App;
