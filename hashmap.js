import { Node } from "./node.js";

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new Array(capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let current = this.buckets[index];

    if (!current) {
      this.buckets[index] = new Node(key, value);
      this.size++;
      return;
    }

    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      if (!current.next) break;
      current = current.next;
    }

    current.next = new Node(key, value);
    this.size++;
    if (this.size > this.capacity * this.loadFactor) this.resize();
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let current = this.buckets[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return undefined;
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let current = this.buckets[index];

    while (current) {
      if (current.key === key) return true;
      current = current.next;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let current = this.buckets[index];
    if (current?.key === key) {
      this.buckets[index] = current.next;
      this.size--;
      return true;
    }

    while (current?.next) {
      if (current.next.key === key) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let current = this.buckets[i];

      while (current) {
        keys.push(current.key);
        current = current.next;
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let current = this.buckets[i];

      while (current) {
        values.push(current.value);
        current = current.next;
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let current = this.buckets[i];

      while (current) {
        entries.push([current.key, current.value]);
        current = current.next;
      }
    }
    return entries;
  }

  resize() {
    const oldBuckets = this.buckets;

    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;

    for (let i = 0; i < oldBuckets.length; i++) {
      let current = oldBuckets[i];

      while (current) {
        this.set(current.key, current.value);
        current = current.next;
      }
    }
  }
}

export { HashMap };
