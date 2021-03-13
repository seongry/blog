---
title: "[자료구조] Linked list 01"
date: 2021-03-13
tags:
  - 자료구조
  - algorithm
  - javascript
---

# Linked list

- 큐, 스택과 마찬가지로 대표적인 자료구조
- 쉬운 문제로 링크드리스트 구현을 내는 경우도 많다

## 링크드 리스트 구조

- 연결 리스트 라고도함
- 배열: 불변 길이 (자바스크립트는 아니지만), 순차적으로 연결된 공간에 데이터를 나열하는 데이터 구조
- 링크드 리스트: 가변 길이, 떨어진 곳에 존재하는 데이터를 화살표로 연결해서 관리하는 데이터 구조

## 기본 구조와 용어

일반적인 링크드 리스트는 자신의 `값`(데이터 값)과 함께 다음 값이 저장된 `주솟값`(포인터)을 같이 가지고 있다.

- Node: 데이터 저장 단위(데이터값, 포인터)로 구성
- Pointer: 각 노드 안에서, 다음이나 이전의 노드와의 연결 정보를 가지고 있는 공간
- 첫번째 값만 알수 있으면 전체 값을 알 수 있다. -> 반대로 첫번째 값을 모르면 전체 값을 알 수가 없다.
- head: 리스트의 첫번째 node
- tail: 리스트의 마지막 node
- next: 다음 노드를 가리키는 next pointer, tail.next는 null이다
- legnth: 리스트의 총 node의 갯수

## 링크드 리스트의 장단점

C언어 기준의 배열과 링크드 리스트

### 장점

- 미리 데이터 공간을 할당하지 않아도 됨
  - 배열은 미리 데이터 공간을 할당 해야됨

### 단점

- 연결을 위한 별도 데이터 공간이 필요하므로, 저장공간 효율이 높지 않음
- 원하는 값을 찾기 위해선 항상 첫번째 값에서 부터 순차적으로 탐색해야하므로(연결 정보를 찾는 시간이 필요하므로) 접근 속도가 느림
- 중간 데이터 삭제시, 혹은 중간에 데이터를 추가로 끼워넣을 시, 앞,뒤 데이터의 연결을 재구성해야 하는 부가적인 작업 필요

```javascript
//Simple Linked list 구현

// Node와 Node 연결하기
class Node {
  _data;
  _next;

  constructor(value, next = null) {
    this._data = value;
    this._next = next;
  }
}

const node1 = new Node(1);
const node2 = new Node(2);
node1._next = node2;
console.log(node1);

//링크드 리스트로 데이터 추가하기

console.log("==== Simple Linked List ====");

function getLastNode(node) {
  if (node._next === null) {
    return node;
  }
  getLastNode(node._next);
}
class SimpleLinkedList {
  _head;
  _next;
  _tail;
  _length;
  constructor(node) {
    this._head = node;
    this._length = 1;
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
}
const head = new Node("hello");
const simple = new SimpleLinkedList(head);
const world = simple.append("world");
console.log(head);
console.log(world);
const javascript = simple.append("javascript");
console.log(javascript);
console.log(world);

console.log("=== head, tail, length check ===");
console.log("head:", simple._head);
console.log("tail:", simple._tail);
console.log("length:", simple._length);
```

### 링크드 리스트의 복잡한 기능1

링크드 리스트 데이터 사이에 데이터를 추가

```javascript
console.log('==== Add "insertAt" Method ====');

class ExtendSLL extends SimpleLinkedList {
  constructor(node) {
    super(node);
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
}

const head2 = new Node(1);
const extendsTest = new ExtendSLL(head2);
const test1 = extendsTest.append(2);
const test2 = extendsTest.append(3);
console.log("=== insert at 이전 ===");
console.log(head2);
console.log(test1);
console.log(test2);

const test3 = extendsTest.insertAt(1.5, 1);
const test4 = extendsTest.append(4);
console.log("=== results: ===");
console.log(head2);
console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);

console.log("=== head, tail, length check ===");
console.log("head:", extendsTest._head);
console.log("tail:", extendsTest._tail);
console.log("length:", extendsTest._length);
```
