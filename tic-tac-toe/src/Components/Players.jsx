import { useState } from "react";

function Players({ name, move, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };
  
  const handleBlur=()=>{
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <li className={isActive?'active':undefined}>
      <span className="player-info">
        <span className="player-symbol">{move}</span>
        {isEditing ? (
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
            required
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </span>
    </li>
  );
}

export default Players;
