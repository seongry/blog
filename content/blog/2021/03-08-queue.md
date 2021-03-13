---
title: [자료구조] Queue
date: 2021-03-08
tags:
  - 자료구조
  - algorithm
  - javascript
---

부족한 CS 일반 지식을 채우기 위해 인강으로 학습 중이다.
까먹을 때 즘 다시 볼 겸, 공부의 기록으로 남겨 두면 좋을 것 같아서 공유해본다.

# Queue

가장 먼저 넣은 데이터를 가장 먼저 꺼낼 수 있는 구조 -> FIFO
`줄을 서는 행위`와 유사
Stack이랑은 꺼내는 순서가 반대

## 알아둘 용어

- Enqueue: 큐에 데이터를 넣는 기능
- Dequeue: 큐에 데이터를 빼는 기능

## 큐가 많이 쓰이는 곳?

멀티태스킹을 위한 프로세스 스케쥴링 방식으 구현하기 위해 많이 사용됨

```javascript
class Queue {
  _queue;
  constructor() {
    this._queue = [];
  }
  get() {
    return this._queue;
  }
  enqueue(data) {
    this._queue.push(data);
  }
  dequeue() {
    return this._queue.splice(0, 1);
  }
}

const queue = new Queue();

queue.enqueue("typescript");
console.log("Enqueue: ", queue.get());

queue.enqueue("hello");
queue.enqueue("world");
queue.dequeue();
console.log("Dequeue: ", queue.get());
```
