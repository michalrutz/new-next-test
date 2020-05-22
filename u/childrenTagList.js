function childrenTagList(containerId, TAG) {
  const children = document.getElementById(containerId).children;
  const inputList = [];

  for (let i = 0; i < children.length; i++) {
    if (children[i].tagName === TAG) {
      inputList.push(children[i]);
    }
  }
  return inputList;
}

export default childrenTagList;
