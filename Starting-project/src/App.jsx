import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx"
import  TabButton  from "./components/TabButton.jsx";

function App() {
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
            <TabButton>Components</TabButton>
            <TabButton>JSX</TabButton>
            <TabButton>Props</TabButton>
            <TabButton>State</TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;
