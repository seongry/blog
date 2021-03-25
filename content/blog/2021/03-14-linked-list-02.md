---
title: "[자료구조] Linked list 02"
date: 2021-03-14
tags:
  - 자료구조
  - algorithm
  - javascript
---

## 특정 노드를 삭제하기

고려해야 하는 조건들

### head node를 삭제하는 경우

\_head의 값을 변경해야함
\_length를 변경해야함

### tail node를 삭제하는 경우

\_tail의 값을 변경해야함
\_tail 앞의 node의 주솟값을 null로 바꿔야함
\_length를 변경해야함

### 중간에 있는 node를 삭제하는 경우

- 삭제하려는 node의 앞에 있는 node의 주솟값을 삭제하려는 node의 뒤에 있는 node로 바꿔 줘야 함
- \_length를 변경해야함

```javascript
class Node {
  _data;
  _next;

  constructor(value, next = null) {
    this._data = value;
    this._next = next;
  }
}

// 저번에 만들었던 linked list 구현 재탕
class LinkedList {
  _head;
  _tail;
  _length;
  constructor(node) {
    this._head = node;
    this._length = 1;
  }
  desc() {
    let node = this._head;
    while (node) {
      console.log(node);
      node = node._next;
    }
  }
  append(value) {
    let lastNode = this._head;
    while (lastNode._next) {
      lastNode = lastNode._next;
    }
    lastNode._next = new Node(value);
    this._tail = lastNode._next;
    this._length++;

    return lastNode._next;
  }
  insertAt(data, searchedData) {
    let node = this._head;
    let search = true;
    while (search) {
      if (node._data === searchedData || node._next === null) {
        search = false;
        break;
      }
      node = node._next;
    }
    node._next = new Node(data, node._next);

    this._length++;
    return node._next;
  }
  deleteAt(index) {
    if (index === 0) {
      // 삭제하려고 하는 게 head 일때
      if (!this._head) {
        return;
      }
      this._head = this._head._next;
      this._length -= 1;
    } else {
      // 그 외 나머지
      let find = this._head;
      for (let i = 0; i < index - 1; i++) {
        find = find._next;
      }

      if (find) {
        find._next = find._next._next;
        this._length -= 1;
      }
    }
  }
}

const linkedList = new LinkedList(new Node(1));
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);

console.log("=== 삭제전 linkedList ===");
linkedList.desc();

// linkedList.deleteAt(0);
linkedList.deleteAt(2);
// linkedList.deleteAt(3);
// linkedList.deleteAt(4);

console.log("=== N번째 index 삭제 후 linkedList ===");
linkedList.desc();
```
