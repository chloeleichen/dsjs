// implmentation#1
// singly linked list
let Node = function(element){
  return{
    next: null,
    value: element,
    prev: null
  };
}


class LinkedList {
  constructor(){
    this.length = 0;
    this.head = null;
  }
// O(1)
  pushFront(element){
    const node = Node(element);
    if(this.head === null){
      this.head = node;
    } else{
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }
//O(1)
  topFront(){
    return this.head;    
  }
//
  popFront(){
    this.head = this.head.next;
    this.length--;
    return this; 
  }

  pushBack(element){
    let node = Node(element);
    if(this.head === null){
      this.head = node;
    } else{
      let current = this.head;
      while(current.next){
        current = current.next;
      }
      current.next = node;
    }
   this.length ++;
   return this;
  }

  topBack(){
    let current = this.head;
    while(current.next){
      current = current.next;
    }
    return current;
  }

  popBack(){
    if(this.head === null){
      return this;
    }
    let current = this.head;
    let i = 0;
    while(i < this.length - 2){
      current = current.next;
      i ++;
    }
    current.next = null;
    this.length--;
    return this;
  }
  
  insert(position, element){
    if(position < 0 || this.length < position){
      console.log('error: not enough space to insert')
      return this;
    }
    let i = 0;
    let current = this.head;
    let rest;
    const node = Node(element);
    // insert at location n, means leave the n-1 element before intact
    while(i++ < position - 1){
      current = current.next;
      rest = current.next;
    }
    current.next = node;
    node.next = rest;
    this.length ++;
    return this;
  }

  remove(element){
    if(this.head === null){
      console.log('empty list');
      return this;
    }
    let i = 0;
    let current = this.head;
    if(this.head.value === element) this.popFront();
    while(i++ < this.length - 1){ 
      if(current.next.value === element){
        current.next = current.next.next ? current.next.next : null;
        this.length--;
        return this;
      } else {
        current = current.next;
      }
    }
    console.log('cannot find element to delete')
    return this;
   }

  find(element){
    if(this.head === null){
      console.log('empty list');
      return this;
    }
    let current = this.head;
    const rfind = (_current)=>{
      let result;
      if (_current.value == element) {
        return _current;
      } else if (_current.next === null) {
        console.log('cannot find'); 
        return null;
      } else {
       return rfind(_current.next);
      }
    }
  return rfind(this.head);
  }
}

class DoublyLinkedList  extends LinkedList {
  constructor(){
  super();
  this.head = null;
  this.tail = null;
  this.length = null;

  }
}

DoublyLinkedList.prototype.insert = function(position, element){
  if(position < 0 || position > this.length){
    console.log('illegal insert position');
    return false;
  }
  if(position == 0){
   return this.pushFront(element);
  }

  if(position === this.length){
    return this.pushBack(element);
  }
  
  let node = Node(element);
  let i = 0;
  let previous;
  let current = this.head;
  while (i++ < position){
    previous = current;
    current = current.next;
  }
  previous.next = node;
  node.next= current;
  node.prev = previous;
  current.prev = node;
  this.length ++;
}

DoublyLinkedList.prototype.pushFront = function(element){
  const node = Node(element);
    if(this.head === null){
      this.head = node;
      this.tail = node;
    } else{
      node.next = this.head;
      this.head = node;
      this.head.next.prev = node;
    }
    this.length++;
    return this;
}

DoublyLinkedList.prototype.pushBack = function(element){
  let node = Node(element);
    if(this.head === null){
      this.head = node;
      this.tail = node;
    } else{
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
   }
   this.length ++;
   return this;
}

DoublyLinkedList.prototype.remove = function(element){
 if(this.head.value === element){
    return this.popFront();
  }

  if(this.tail.value === element){
    return this.popBack();
  }
  
  let i = 0;
  let current = this.head;
  let previous;
  while(i++ < this.length - 1){
    if(current.next.value === element){
      previous = current;
      current.next = current.next.next;
      current.next.prev = previous;
      this.length --;
      return this; 
    }
    current = current.next;
  }
 console.log('cannot find element to remove');
 return this;
}

DoublyLinkedList.prototype.popFront = function(){
  if(this.head === null){
    return this;
  }
  this.head = this.head.next;
  this.head.prev = null;
  this.length--;
  return this; 
}

DoublyLinkedList.prototype.popBack = function(){
  if(this.head === null){
      return this;
    }
  this.tail = this.tail.prev;
  this.tail.next = null;
  this.length--;
  return this;
}

// remove nth from end of length unknown
const removeNthFromEnd = (list, n) => {
  let dummy = list.head;
  let current = list.head;
  if(n === 0){
    while(current.next.next){
      current = current.next;
    }
    current.next = null;
    return current;
  }
  // move forward n place, left length - n place to move
  // when n =0, remove first item, dummy length needs to be 0
  for(let i = 0; i <= n + 1; i++){
    dummy = dummy.next;
  }

  while(dummy){
    dummy=dummy.next;
    current=current.next;
  }
  current.next =current.next.next ? current.next.next : null;
  return list; 
}


/** 
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function(head) {
   /* - in addition to filtering, also acts as base case for below recursion */
   if (head === null || head.next === null)   return head;
    
   // - traverses to end of list
   // - create a new head pointer which points to the last element
  
  let reversed = reverseList(head.next); 
     
  // redirects current node's next next back to itself */
  // head pointer moves along reversed
   head.next.next = head; 
     
  //- sets current node's next to null
  //- gets replaced by previous line as recursion progesses */
  head.next = null;      
  return reversed;
};


const reverseListIterate = function(head) {
  let prev = null;
  let current = head;
  while(current){
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

const node = new LinkedList().pushBack(1).pushBack(2).pushBack(9).pushBack(18).pushBack(25);
const node2 = new LinkedList().pushBack(1).pushBack(2).pushBack(4);
const node3 = new LinkedList().pushBack(5);

// merge two sorted list & return a new sorted list
function mergeTwoList(l1, l2){
  let node = Node(0);
  let head = node;
  let head1 = l1;
  let head2 = l2;
  while(head1 && head2){
    if(head1.value < head2.value){
      head.next = head1;
      head1 = head1.next;
    } else {
      head.next = head2;
      head2 = head2.next;
    }
    head = head.next;
  }
  head.next = head1 ? head1 : head2;
  return node.next;
}


//const reversed = listToString(reverseList(node.head));

const merged = listToString(mergeTwoList(node2.head, node3.head));
console.log(merged);

function listToString(list){
  let array = [list.value];
  let current = list;
  while(current.next){
    array.push(current.next.value);
    current = current.next;
  }

  return array;
}

module.exports= {
  LinkedList,
  DoublyLinkedList,
  Node, 
  removeNthFromEnd
}
