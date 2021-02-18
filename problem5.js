class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
  
class LinkedList {
  constructor() {
    this.head = null;
  }
  
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  
  insertLast(item) {
    //if no items, insert as first item
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      //move through the list until you hit a node that points to null, signifying last node
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      //the last node will now point to the new node
      tempNode.next = new _Node(item, null);
    }
  }
  
  insertBefore(item, keyVal) {
    //start at list head
    let currNode = this.head;
    // if no head, then list is empty
    if (!currNode) {
      return null;
    }
  
    //if the node containing the key value is the head, just insert first
    if (currNode.value === keyVal) {
      this.insertFirst(item);
      return;
    }
  
    //find the node with the keyValue, once it is the next
    while ((currNode.next.value !== keyVal) & (currNode.next.next !== null)) {
      currNode = currNode.next;
    }
  
    if (currNode.next.value === keyVal) {
      let tempNode = new _Node(item, currNode.next);
      currNode.next = tempNode;
    } else {
      console.log('item to insert before not found');
      return;
    }
  }
  
  insertAfter(item, keyVal) {
    //start at list head
    let currNode = this.head;
    // if no head, then list is empty
    if (!currNode) {
      return null;
    }
  
    //find the node with the keyValue, once it is the next
    while ((currNode.value !== keyVal) & (currNode.next !== null)) {
      currNode = currNode.next;
    }
  
    //if the node to insert after is the last node, just insert last
    if (currNode.value === keyVal && currNode.next === null) {
      this.insertLast(item);
      return;
    }
  
    if (currNode.value === keyVal) {
      let tempNode = new _Node(item, currNode.next);
      currNode.next = tempNode;
    } else {
      console.log('item to insert before not found');
      return;
    }
  }
  
  insertAt(index, item) {
    //NOTE - this function assumes 0 indexing of the list. Therefore, if you pass in the number 1 with your item to add, it will be stored in the SECOND position. Passing in 0 will store a value in the FIRST position.
    if (!this.head) {
      console.log('list is empty, nothing to insert before');
      return;
    }
    // if index is 0, just insert first
    if (index === 0) {
      this.insertFirst(item);
      return;
    }
  
    //else, move through list, iterating a count variable. When count === index, take current Node value and use for insertBefore
    let count = 0;
    //start at head
    let currNode = this.head;
    while (count !== index && currNode.next !== null) {
      currNode = currNode.next;
      count++;
    }
    if (count === index) {
      this.insertBefore(item, currNode.value);
      return;
    } else {
      console.log('this index does not exist');
      return;
    }
  }
  
  find(item) {
    //start at list head
    let currNode = this.head;
    // if no head, then list is empty
    if (!this.head) {
      return null;
    }
    //check the value of current node for the item
    while (currNode.value !== item) {
      // return null if reach end without finding item
      if (currNode.next === null) {
        return null;
      } else {
        //move to next node
        currNode = currNode.next;
      }
    }
  
    //sweet, found it
  
    return currNode;
  }
  
  remove(item) {
    // if list is empty return null
    if (!this.head) {
      return null;
    }
  
    // if node to remove its head, make next node the new head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
  
    // start at the head otherwise
    let currNode = this.head;
    //keep track of previous node to re-route next value once on correct node to delete
    let previousNode = this.head;
    // find right node
    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    // if currNode is null you hit the end of the list
    if (currNode === null) {
      console.log('item not found');
    } else {
      //otherwise, set the previous node to point to the next node, dropping out the node to delete
      previousNode.next = currNode.next;
    }
  }
}
  
function display(list) {
  //if no items, respond with nothing to print
  if (list.head === null) {
    console.log('List is empty');
  } else {
    //move through the list until you hit a node that points to null, signifying last node
    let tempNode = list.head;
    while (tempNode) {
      console.log(tempNode.value);
      tempNode = tempNode.next;
    }
  }
}
  
function size(list) {
  if (!list.head) {
    console.log('list is empty');
    return;
  }
  
  //else, move through list, iterating a count variable. When count === index, take current Node value and use for insertBefore
  let count = 1;
  //start at head
  let currNode = list.head;
  while (currNode.next !== null) {
    currNode = currNode.next;
    count++;
  }
  console.log(`This list is ${count} items long`);
  return count;
}
  
function isEmpty(list) {
  if (!list.head) {
    return true;
  }
  return false;
}
  
function reverseLL(
  list,
  currNode = list.head,
  nextNode = list.head.next,
  timesToRun = size(list) - 1,
  timesRan = 0
) {
  // if list is empty, return error
  if (isEmpty(list)) {
    console.log('Attempting to reverse an empty list');
    return list;
  }
  
  //if there is no second item, cant reverse
  if (list.head.next === null) {
    console.log('Cannot reverse an list with one item');
    return list;
  }
  
  // BASE CASE FOR ALL LOOPS
  // if you are out of times to run and at the end of the list, the list is reversed so return it
  if (timesToRun === 0) {
    console.log('list reversed');
    display(list);
    return list;
  }
  
  // BASE CASE FOR ONE LOOP
  // if times to run equals times ran, decrement times to run, reset times ran, and send list in again with fresh nodes from beginning
  if (timesRan === timesToRun) {
    timesRan = 0;
    timesToRun--;
    return reverseLL(list, list.head, list.head.next, timesToRun, timesRan);
  }
  
  // otherwise, you need to do a swap so swap currNode and nextNode values
  let temp = currNode.next.value;
  nextNode.value = currNode.value;
  currNode.value = temp;
  //then, increment times ran, change nodes, and send it in again
  timesRan++;
  
  return reverseLL(list, currNode.next, nextNode.next, timesToRun, timesRan);
}
  
// console.log(reverseLL(createemptyLL())); // 'Attempting to reverse an empty list'
// console.log(reverseLL(createLL(['Boomer']))); // 'Cannot reverse an list with one item'
// console.log(reverseLL(createLL(['Boomer', 'Apollo']))); // 'Apollo', 'Boomer'
// console.log(reverseLL(createLL(['Boomer', 'Apollo', 'Jake']))); // 'Jake', 'Apollo', 'Boomer'
console.log(reverseLL(createLL([1, 2, 3, 4]))); // 4 3 2 1
  
function createLL(insertion) {
  let SLL = new LinkedList();
  insertion.map((item) => SLL.insertLast(item));
  return SLL;
}
  
function createemptyLL() {
  let SLL = new LinkedList();
  return SLL;
}