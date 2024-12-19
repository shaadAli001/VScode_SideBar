export default function useTraverseTree() {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.isFolder && tree.id === folderId) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }
  return { insertNode };
}
