import { LinkedList } from "./linked-list.js";

export function HashMap() {
  let capacity = 16;
  let loadFactor = 0.75;
  let totalEntries = 0;
  let buckets = [];

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    let hashes = [];
    let tmpCapacity = 16;

    while (tmpCapacity <= capacity) {
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % tmpCapacity;
      }
      hashes.push(hashCode);
      tmpCapacity *= 2;
    }

    return hashes;
  };

  const set = (key, value) => {
    const hashes = hash(key);
    for (let index of hashes) {
      const lastHash = hashes.indexOf(index) === hashes.length - 1;
      if (index < 0 || index >= capacity)
        throw new Error("Trying to access index out of bounds");
      else if (!buckets[index] && !lastHash) continue;
      else if (buckets[index]) {
        let tmpList = buckets[index];
        let curNode = tmpList.head();
        for (let i = 0; i < tmpList.size(); i++) {
          if (curNode.value.key === key) {
            curNode.value.value = value;
            return;
          }
          curNode = curNode.nextNode;
        }
      }

      //On Last Hash
      if (lastHash) {
        if (!buckets[index]) {
          const newList = LinkedList();
          const nodeValue = { key: key, value: value };

          newList.append(nodeValue);
          buckets[index] = newList;
          totalEntries++;
          if (totalEntries > capacity * loadFactor) capacity *= 2;
          return;
        }
        let list = buckets[index];
        let node = list.head();
        for (let i = 0; i < list.size(); i++) {
          if (node.nextNode == null && lastHash) {
            list.append({ key: key, value: value });
            totalEntries++;
            if (totalEntries > capacity * loadFactor) capacity *= 2;
            return;
          }

          node = node.nextNode;
        }
      }
    }
  };

  const get = (key) => {
    const hashes = hash(key);
    for (let index of hashes) {
      const lastHash = hashes.indexOf(index) === hashes.length - 1;
      if (index < 0 || index >= buckets.length)
        throw new Error("Trying to access index out of bounds");
      else if (!buckets[index] && lastHash) return null;
      else if (!buckets[index]) continue;

      let tmpList = buckets[index];
      let curNode = tmpList.head();
      for (let i = 0; i < tmpList.size(); i++) {
        const data = curNode.value;
        if (data.key === key) return data.value;
        curNode = curNode.nextNode;
      }
    }

    return null;
  };

  const has = (key) => {
    const hashes = hash(key);
    for (let index of hashes) {
      const lastHash = hashes.indexOf(index) === hashes.length - 1;
      if (index < 0 || index >= buckets.length) return false;
      else if (!buckets[index] && lastHash) return false;
      else if (!buckets[index]) continue;

      let tmpList = buckets[index];
      let curNode = tmpList.head();
      for (let i = 0; i < tmpList.size(); i++) {
        const data = curNode.value;
        if (data.key === key) return true;
        curNode = curNode.nextNode;
      }
    }

    return false;
  };

  const remove = (key) => {
    const hashes = hash(key);
    for (let index of hashes) {
      if (index < 0 || index >= buckets.length) return false;
      else if (!buckets[index] && lastHash) return false;
      else if (!buckets[index]) continue;

      let tmpList = buckets[index];
      let curNode = tmpList.head();
      for (let i = 0; i < tmpList.size(); i++) {
        const data = curNode.value;
        if (data.key === key) {
          tmpList.removeAt(i);
          totalEntries--;
          return true;
        }
        curNode = curNode.nextNode;
      }
    }

    return false;
  };

  const length = () => totalEntries;

  const clear = () => {
    buckets = [];
    capacity = 16;
    totalEntries = 0;
  };

  const keys = () => {
    let arr = [];
    if (buckets.length === 0) return arr;

    for (let list of buckets) {
      if (!list) continue;

      let tmpNode = list.head();
      for (let i = 0; i < list.size(); i++) {
        const data = tmpNode.value;
        arr.push(data.key);
        tmpNode = tmpNode.nextNode;
      }
    }

    return arr;
  };

  const values = () => {
    let arr = [];
    if (buckets.length === 0) return arr;

    for (let list of buckets) {
      if (!list) continue;

      let tmpNode = list.head();
      for (let i = 0; i < list.size(); i++) {
        const data = tmpNode.value;
        arr.push(data.value);
        tmpNode = tmpNode.nextNode;
      }
    }

    return arr;
  };

  const entries = () => {
    let arr = [];
    if (buckets.length === 0) return arr;

    for (let list of buckets) {
      if (!list) continue;

      let tmpNode = list.head();
      for (let i = 0; i < list.size(); i++) {
        arr.push(tmpNode.value);
        tmpNode = tmpNode.nextNode;
      }
    }

    return arr;
  };

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}
