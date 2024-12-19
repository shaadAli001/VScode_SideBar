import { useState } from "react";
import "./styles.css";
import explorer from "./Data/Folderdata";
import Folder from "../Components/Folder";
import useTraverseTree from "../Hooks/use-traverse-tree";

export default function App() {
  const [exploreData, setExploreData] = useState(explorer);
  let { insertNode } = useTraverseTree();

  const handleSubmit = (folderId, item, isFolder) => {
    const finalTree = insertNode(exploreData, folderId, item, isFolder);
    setExploreData(finalTree);
  };

  return (
    <div className="App">
      <Folder handleSubmit={handleSubmit} explorer={exploreData} />
    </div>
  );
}
