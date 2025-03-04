import CoreConcepts from "./components/CoreConcepts.jsx"
import Header from "./components/Header/Header.jsx";
import Snippets from "./components/Snippets.jsx";

function App() {

  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Snippets />
      </main>
    </>
  );
}

export default App;