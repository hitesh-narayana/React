export default function CoreConcept(props) {
    return (
      <li>
        <ul>
          <img src={props.image} alt={props.title} />
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </ul>
      </li>
    );
  }