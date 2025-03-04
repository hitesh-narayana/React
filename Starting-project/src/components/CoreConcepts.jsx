import { CORE_CONCEPTS } from "../data.js";
import CoreConcept from "./CoreConcept.jsx"

function CoreConcepts() {
  return (
    <section id="core-concepts">
      <ul>
        {CORE_CONCEPTS.map((concept, idx) => (
          <CoreConcept key={idx} {...concept} />
        ))}
      </ul>
    </section>
  );
}

export default CoreConcepts;
