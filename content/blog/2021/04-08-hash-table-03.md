---
title: "[자료구조] Hash Table 03"
date: 2021-04-08
tags:
  - 자료구조
  - algorithm
  - javascript
---

### Linear Probing 기법

`폐쇄 해슁` 또는 `Close Hashing 기법` 중 하나: 해쉬 테이블 저장공간 안에서 충돌 문제를 해결하는 기법
충돌이 일어나면, 해당 hash address의 다음 address부터 맨 처음 나오는 빈공간에 저장하는 기법
저장공간 활용도를 높이기 위한 기법

```javascript
const hashTable = Array.from(Array(8)).map(() => 0);
const getKey = data => {
  return `${data.charCodeAt(0)}${data.charCodeAt(1)}${data.charCodeAt(2)}`;
};
const hashFunction = key => {
  return key % 8;
};

const saveData = (data, value) => {
  const index = getKey(data);
  const hashAddress = hashFunction(index);

  if (!hashTable[hashAddress]) {
    hashTable[hashAddress] = [index, value];
  } else {
    for (let i = hashAddress; i < hashTable.length; i++) {
      if (hashTable[i][0] === index) {
        hashTable[i] = [index, value];
        return;
      } else if (!hashTable[i]) {
        hashTable[i] = [index, value];
        return;
      }
    }
  }
};

const readData = data => {
  const index = getKey(data);
  const hashAddress = hashFunction(index);

  if (hashTable[hashAddress][0] === index) {
    return hashTable[hashAddress][1];
  } else {
    for (let i = hashAddress + 1; i < hashTable.length; i++) {
      if (hashTable[i][0] === index) {
        return hashTable[i][1];
      }
    }

    return null;
  }
};

saveData("react", "리액트");
saveData("svelte", "스벨트");
saveData("vue", "뷰");

console.log(hashTable);

console.log(readData("svelte"));
console.log(readData("angular"));
```

### 빈번한 충돌을 개선하는 방법

충돌을 해결 할 수 있는 여러 기법들이 있지만, 사실 충돌이 덜 발생하는 것이 제일 좋다.

_해쉬 함수를 재정의 및 해쉬 테이블 저장공간을 확대_
가장 간단하면서 일반적인 방법

만약 8개의 공간을 가진 해쉬 테이블에 50%(4개)의 데이터를 저장한다면
충돌이슈가 있을 수 있기 때문에 저장공간을 두 배로(16개) 늘린다.

### 참고: 해쉬 함수와 키 생성 함수

유명한 해쉬 함수들이 있음: `SHA`(Secure hash Algorithm, 안전한 해시 알고리즘)
어떤 데이터도 유일한 고정된 크기의 고정값을 리턴해주므로, 해쉬 함수로 유용하게 활용 가능

## 시간 복잡도

- 일반적인 경우(충돌이 없을 경우) O(1)
- 최악의 경우(충돌이 모두 발생하는 경우)는 O(n)

> 해쉬 테이블의 경우, 일반적인 경우를 기대하고 만들기 때문에 시간 복잡도는 O(1) 이라고 말할 수 있음
