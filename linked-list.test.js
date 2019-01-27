const LinkedList = require('./linked-list.js');

const singlyLinkedList = LinkedList.LinkedList;
const doublyLinkedList = LinkedList.DoublyLinkedList;
const node = LinkedList.Node;
const test = require('ava');

test.beforeEach(t=>{
  t.context.singlyLinkedList = new singlyLinkedList()
                        .pushFront('first')
                        .pushBack('second')
                        .pushBack('third')
                        .pushBack('fourth')
    t.context.doublyLinkedList = new doublyLinkedList()
                        .pushFront('first')
                        .pushBack('second')
                        .pushBack('third')
                        .pushBack('fourth')
})

test('create a list', (t) => {
  t.is(t.context.singlyLinkedList.head.value, "first");
  t.is(t.context.singlyLinkedList.head.next.value, "second");
  t.is(t.context.singlyLinkedList.length, 4)
});

test('pop front', (t)=>{
  t.context.singlyLinkedList.popFront();
  t.is(t.context.singlyLinkedList.head.value, 'second');
  t.is(t.context.singlyLinkedList.length, 3);
});

test('pop back', t=>{
  t.context.singlyLinkedList.popBack();
  t.is(t.context.singlyLinkedList.head.value, 'first');
  t.is(t.context.singlyLinkedList.head.next.next.next, null);
  t.is(t.context.singlyLinkedList.length, 3);
})

test('remove existing value', t=>{
  const list = t.context.singlyLinkedList;
  list.remove('second');
  t.is(list.head.next.value, 'third');
})

test('remove non-existent value', t=>{
  const list = t.context.singlyLinkedList;
  list.remove('fifth');
  t.is(list.length, 4);

})

test('insert at existing position', t=>{
  const list = t.context.singlyLinkedList;
  list.insert(2, 'addition');
  t.is(list.head.next.next.value, 'addition');
  t.is(list.length, 5);
})

test('insert at terminal position', t=>{
  const list = t.context.singlyLinkedList;
  list.insert(4, 'addition');
  t.is(list.head.next.next.next.next.value, 'addition');
  t.is(list.length, 5);
})

test('insert at non-existant position', t=>{
  const list = t.context.singlyLinkedList;
  list.insert(5, 'addition');
  t.is(list.length, 4);
})

test('remove an existing element', t=>{
  const list = t.context.singlyLinkedList;
  list.remove('second');
  t.is(list.head.next.value, 'third');
  t.is(list.length, 3);
})

test('remove an edge element', t=>{
  const list = t.context.singlyLinkedList;
  list.remove('first');
  t.is(list.head.next.value, 'third');
  t.is(list.length, 3);
  list.remove('fourth');
  t.is(list.head.next.next, null);
  t.is(list.length, 2);
})

test('remove an non-existant element', t=>{
  const list = t.context.singlyLinkedList;
  list.remove('fake');
  t.is(list.head.next.next.value, 'third');
  t.is(list.length, 4);
})

test('find an existing element', t=>{
  const list = t.context.singlyLinkedList;
  const result = list.find('second');
  t.is(result.value, 'second')
})

test('find an edge element', t=>{
  const list = t.context.singlyLinkedList;
  const result = list.find('first');
  t.is(result.value, 'first');
  const result2 = list.find('fourth');
  t.is(result2.value, 'fourth');
})

test('find an non-existant element', t=>{
  const list = t.context.singlyLinkedList;
  const result =  list.find('fake');
  t.is(result, null);
})

// testing douby linked list

test('create a doubly list', (t) => {
  const dList = t.context.doublyLinkedList;
  t.is(dList.head.value, "first");
  t.is(dList.head.next.value, "second");
  t.is(dList.head.prev, null);
  t.is(dList.tail.value, 'fourth');
  t.is(dList.length, 4);
})

test('insert at existing position in doublyLinkedList', t=>{
  const list = t.context.doublyLinkedList;
  list.insert(2, 'addition');
  t.is(list.head.next.next.value, 'addition');
  t.is(list.head.next.next.prev.value, 'second');
  t.is(list.length, 5);
})

test('insert at terminal position in doublyLinkedList', t=>{
  const list = t.context.doublyLinkedList;
  list.insert(4, 'addition');
  t.is(list.head.next.next.next.next.value, 'addition');
  t.is(list.tail.value,'addition');
  t.is(list.tail.prev.value, 'fourth');
  t.is(list.length, 5);
  list.insert(0, 'topup');
  t.is(list.head.value, 'topup');
  t.is(list.tail.value,'addition');
  t.is(list.tail.prev.value, 'fourth');
  t.is(list.length, 6);
})

test('insert at non-existant position in doublyLinkedList', t=>{
  const list = t.context.doublyLinkedList;
  list.insert(5, 'addition');
  t.is(list.length, 4);
})

test('remove an existing element in doublyLinkedList', t=>{
  const list = t.context.doublyLinkedList;
  list.remove('second');
  t.is(list.head.next.prev.value, 'first');
  t.is(list.head.next.value, 'third');
  t.is(list.length, 3);
})

test('remove an edge element in doublyLinkedList', t=>{
  const list = t.context.doublyLinkedList;
  list.remove('first');
  t.is(list.head.value, 'second');
  t.is(list.head.prev, null);
  t.is(list.length, 3);
  list.remove('fourth');
  t.is(list.head.next.next, null);
  t.is(list.tail.value, 'third');
  t.is(list.length, 2);
})

test('remove an non-existant element in doublyLinkedList', t=>{
  const list = t.context.doublyLinkedList;
  list.remove('fake');
  t.is(list.head.next.next.value, 'third');
  t.is(list.length, 4);
})

test('find an existing element in doublyLinkedList', t=>{
  const list = t.context.doublyLinkedList;
  const result = list.find('second');
  t.is(result.value, 'second')
})

test('find an edge element in doublyLinkedList', t=>{
  const list = t.context.doublyLinkedList;
  const result = list.find('first');
  t.is(result.value, 'first');
  const result2 = list.find('fourth');
  t.is(result2.value, 'fourth');
})

test('find an non-existant element in doublyLinkedList', t=>{
  const list = t.context.doublyLinkedList;
  const result =  list.find('fake');
  t.is(result, null);
})


