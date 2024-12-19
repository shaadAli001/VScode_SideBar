import { useState } from "react";

export default function Folder({ handleSubmit, explorer }) {
  const [expanded, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleBtn = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
    setExpanded(true);
  };

  const onAddFolder = (e) => {
    if (e.target.value && e.keyCode === 13) {
      handleSubmit(explorer.id, e.target.value, showInput.isFolder);
      console.log(explorer.items);
      setShowInput({ ...setShowInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: "5px", cursor: "pointer" }}>
        <div className="folder" onClick={() => setExpanded(!expanded)}>
          <span>📁 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleBtn(e, true)}>Folder +</button>
            <button onClick={(e) => handleBtn(e, false)}>File +</button>
          </div>
        </div>
        <div
          style={{
            display: expanded ? "block" : "none",
            paddingLeft: "1.5rem",
          }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                onKeyDown={(e) => onAddFolder(e)}
                type="text"
                className="inputContainer__input"
                onBlur={() =>
                  setShowInput({ ...setShowInput, visible: false })
                } /* Go away if clicked Outside */
                autoFocus
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <Folder handleSubmit={handleSubmit} explorer={exp} key={exp.id} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name}</span>;
  }
}
