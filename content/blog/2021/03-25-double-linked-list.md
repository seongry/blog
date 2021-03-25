---
title: "[자료구조] Double linked list"
date: 2021-03-25
tags:
  - 자료구조
  - algorithm
  - javascript
---

# 다양한 링크드 리스트 구조

## Double linked list (이중 연결 리스트)

기존의 링크드 리스트는 항상 head -> tail 단방향으로만 검색해야 하기 때문에 찾고자 하는 데이터가 뒤에 있으면 검색시간이 오래 걸린다.
이를 보완하기 위해, 앞에서도 뒤에서도 검색할 수 있는 링크드 리스트를 만듦. 내가 찾고자 하는 데이터의 위치만 알고 있다면 검색 시간을 줄일 수 있다.

### 이중 연결 리스트의 구조

`이전 데이터 주소` - `데이터` - `다음 데이터 주소` 의 구조를 가지고 있다
이중 연결 리스트라고도 함
장점: 양방향으로 연결 되어 있어서 노드 탐색이 양쪽으로 모두 가능

```javascript
class Node {
  _data;
  _prev;
  _next;
  constructor(value, prev = null, next = null) {
    this._prev = prev;
    this._data = value;
    this._next = next;
  }
}

class DoubleLinkedList {
  _head;
  _tail;
  constructor(value) {
    this._head = new Node(value);
    this._tail = this._head;
  }

  insert(value) {
    if (!this._head) {
      this._head = new Node(value);
      this._tail = this._head;
    } else {
      let node = this._head;
      while (node._next) {
        node = node._next;
      }
      const newNode = new Node(value);
      node._next = newNode;
      newNode._prev = node;

      this._tail = newNode;
    }
  }

  desc() {
    let node = this._head;
    while (node) {
      console.log(node._data);
      node = node._next;
    }
  }

  searchFromHead(searchValue) {
    if (!this._head) {
      //방어코드
      return false;
    }

    let node = this._head;

    while (node) {
      if (node._data === searchValue) {
        return node;
      }
      node = node._next;
    }

    return false;
  }

  searchFromTail(searchValue) {
    if (!this._tail) {
      return false;
    }

    let node = this._tail;

    while (node) {
      if (node._data === searchValue) {
        return node;
      }
      node = node._prev;
    }

    return false;
  }

  insertBefore(value, searchValue) {
    if (!this._head) {
      this._head = new Node(value);
      return;
    }

    let searchedNode = this.searchFromTail(searchValue);

    if (!searchedNode) {
      return;
    }

    const newNode = new Node(value);

    if (this._head === searchedNode) {
      this._head = newNode;
      newNode._next = searchedNode;
      searchedNode._prev = newNode;
    } else {
      newNode._next = searchedNode;
      newNode._prev = searchedNode._prev;
      searchedNode._prev._next = newNode;
      searchedNode._prev = newNode;
    }
  }

  insertAfter(value, searchValue) {
    if (!this._head) {
      this._head = new Node(value);
      return;
    }

    let searchedNode = this.searchFromHead(searchValue);

    if (!searchedNode) {
      return;
    }

    const newNode = new Node(value);

    if (this._tail === searchedNode) {
      this._tail = newNode;
      newNode._prev = searchedNode;
      searchedNode._next = newNode;
    } else {
      newNode._prev = searchedNode;
      newNode._next = searchedNode._next;
      searchedNode._next = newNode;
      searchedNode._next._prev = newNode;
    }
  }
}

const test = new DoubleLinkedList(0);

test.insert(1);
test.insert(2);
test.insert(3);
test.insert(4);

console.log("=== insert test ===");
console.log(test.desc());

console.log("=== insertBefore test ===");

test.insertBefore(3.5, 4);

console.log(test.desc());

console.log("=== insertAfter test ===");

test.insertAfter(2.5, 2);
console.log(test.desc());
```
