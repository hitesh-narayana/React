import TabButton from "./TabButton";
import { EXAMPLES } from "../data";
import {useState} from "react";
import Section from "./Section";

function Snippets() {
  const [userData, setUserData] = useState(null);

  const tabs = ["components", "jsx", "props", "state"];

  let handleClick = (tab) => {
    setUserData(tab);
  };

  let tabContent = <p>Select any topic</p>;
  if (userData) {
    tabContent = (
      <div id="tab-content">
        <h2>{EXAMPLES[userData].title}</h2>
        <p>{EXAMPLES[userData].description}</p>
        <pre>
          <code>{EXAMPLES[userData].code}</code>
        </pre>
      </div>
    );
  }
  return (
    <Section id="examples" title="Snippets">
      <menu>
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            onSelect={() => handleClick(tab)}
            isSelected={userData === tab}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabButton>
        ))}
      </menu>
      {tabContent}
    </Section>
  );
}

export default Snippets;
