export default function TabButton(props) {
  let handleClick = () =>{
    console.log("Clicked")
  }
  return (
    <li>
      <button onClick={handleClick}>{props.children}</button>
    </li>
  );
}
