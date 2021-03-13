---
title: [자료구조] Stack
date: 2021-03-10
tags:
  - data structure
  - algorithm
  - javascript
---

# Stack

데이터를 "제한적으로" 접근할 수 있는 구조(Queue와 비슷)
가장 나중에 쌓은 데이터를 가장 먼저 빼낼 수 있는(LIFO) 데이터 구조

## 대표적인 스택의 활용

컴퓨터 내부의 프로세스 구조의 함수 동작 방식

## 주요 기능

- push(): 데이터를 스택에 넣기
- pop(): 데이터를 스택에서 꺼내기

## 스택 구조와 프로세스 스택

- 스택 구조는 프로세스 실행 구조의 가장 기본
  자바스크립트 엔진의 Call Stack도 stack!

## 자료 구조 스택의 장단점

### 장점

- 구조가 단순해서 구현이 쉽다.
- 데이터 저장/읽기 속도가 빠르다.

### 단점(일반적인 스택 기준)

- 데이터 최대 갯수를 미리 정해야 한다.
- (1)번의 단점으로 인해, 저장 공간의 낭비가 발생할 수 있음
  - 미리 최대 갯수만큼 저장 공간을 확보해야 함

```javascript
class Stack {
  maxLength;
  _stack;
  constructor(length) {
    this.maxLength = length;
    this._stack = [];
  }
  get() {
    return this._stack;
  }
  push(value) {
    if (this._stack.length >= this.maxLength) {
      return;
    }
    this._stack.push(value);
  }
  pop() {
    return this._stack.splice(-1, 1)[0];
  }
}

const stack = new Stack(3);
stack.push("1st");
stack.push("2nd");
stack.push("3nd");
stack.push("4th"); // 여기는 포함되지 않는다.
console.log(stack.get());
console.log(stack.pop());
```
