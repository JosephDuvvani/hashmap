function Node() {
  let value = null;
  let nextNode = null;

  return {
    value,
    nextNode,
  };
}

export function LinkedList() {
  let first = null;
  let listSize = 0;

  const append = (value) => {
    const newNode = Node();
    newNode.value = value;

    if (first == null) {
      first = newNode;
      listSize++;
      return;
    }

    let tmpNode = first;
    while (tmpNode.nextNode != null) tmpNode = tmpNode.nextNode;
    tmpNode.nextNode = newNode;
    listSize++;
  };

  const prepend = (value) => {
    const newNode = Node();
    newNode.value = value;

    if (first == null) {
      first = newNode;
      return;
    }

    let tmpNode = first;
    newNode.nextNode = tmpNode;
    first = newNode;
    listSize++;
  };

  const size = () => listSize;

  const head = () => first;

  const tail = () => {
    if (listSize == 0) return null;
    let tmpNode = first;
    while (tmpNode.newNode != null) tmpNode = tmpNode.nextNode;
    return tmpNode;
  };

  const at = (index) => {
    if (listSize == 0) throw new Error("List is empty.");
    else if (index >= listSize || index < 0)
      throw new Error("Index is out of range.");
    let tmpNode = first;
    for (let i = 0; i < index; i++) tmpNode = tmpNode.nextNode;
    return tmpNode;
  };

  const pop = () => {
    if (listSize == 0) throw new Error("List is empty.");
    else if (first.nextNode == null) first = null;

    let prev = null;
    let cur = first;
    while (cur.nextNode != null) {
      prev = cur;
      cur = cur.nextNode;
    }
    prev.nextNode = null;
    listSize--;
  };

  const contains = (value) => {
    if (listSize == 0) throw new Error("List is empty.");

    let tmpNode = first;
    for (let i = 0; i < listSize; i++) {
      if (tmpNode.value == value) return true;
      tmpNode = tmpNode.nextNode;
    }
    return false;
  };

  const find = (value) => {
    if (listSize == 0) throw new Error("List is empty.");

    let tmpNode = first;
    for (let i = 0; i < listSize; i++) {
      if (tmpNode.value == value) return i;
      tmpNode = tmpNode.nextNode;
    }
    return null;
  };

  const toString = () => {
    if (listSize == 0) return "null";
    let myString = "";
    let tmpNode = first;

    while (tmpNode.nextNode != null) {
      myString += `(${tmpNode.value}) -> `;
      tmpNode = tmpNode.nextNode;
    }
    return (myString += `(${tmpNode.value}) -> null`);
  };

  const insertAt = (value, index) => {
    if (index > listSize || index < 0)
      throw new Error("Index is out of range.");
    else if (index == 0) prepend(value);

    const newNode = Node();
    newNode.value = value;
    let tmpNode = first;

    for (let i = 0; i < index - 1; i++) tmpNode = tmpNode.nextNode;

    newNode.nextNode = tmpNode.nextNode;
    tmpNode.nextNode = newNode;
    listSize++;
  };

  const removeAt = (index) => {
    if (index >= listSize || index < 0)
      throw new Error("Index is out of range.");
    else if (index == 0) {
      first = first.nextNode;
      listSize--;
      return;
    }

    let tmpNode = first;

    for (let i = 0; i < index - 1; i++) tmpNode = tmpNode.nextNode;

    tmpNode.nextNode = tmpNode.nextNode.nextNode;
    listSize--;
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}
