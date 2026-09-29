import { HashMap } from "./hashmap.js";

let test = new HashMap();
// test cases
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// changing before update
test.set("lion", "brown")

// adding element after the capacity being full
test.set('moon', 'silver')

// changing after update
test.set("apple", "white")

console.log(test.get("hat"))
console.log(test.has("banana"))
test.remove("banana")
console.log(test.has("banana"))

console.log(test.entries())

console.log(test)