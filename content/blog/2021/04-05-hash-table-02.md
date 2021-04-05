---
title: "[자료구조] Hash Table 02"
date: 2021-04-05
tags:
  - 자료구조
  - algorithm
  - javascript
---

## 충돌(Collision) 해결 알고리즘 (좋은 해쉬 함수 사용하기)

충돌이란? 한개 이상의 데이터가 동일한 어드레스에 저장되는 경우
해쉬 테이블의 가장 큰 문제는 충돌(Collision)의 경우.
이 문제를 `충돌(Collision)` 또는 `해쉬 충돌(Hash Collision)`이라고 부른다.

### Chaining 기법

`개방 해슁` 또는 `Open Hashing 기법` 중 하나: 해쉬 테이블 저장공간 외의 공간을 활용하는 기법
충돌이 일어나면, 링크드 리스트를 사용해서 데이터를 추가로 뒤에 연결(chaining)시켜서 저장하는 기법

```javascript
const hashTable = Array.from(Array(8)).map(() => 0);
const getKey = data => {
  return `${data.charCodeAt(0)}${data.charCodeAt(1)}${data.charCodeAt(2)}`;
};
const hashFunction = key => {
  return key % 8;
};
const saveData = (data, value) => {
  //링크드 리스트에 넣었을때 어떤 데이터가 어떤 값을 가지는지 알 수 있게 하기 위해서 필요함
  const indexKey = getKey(data);
  const hashAddress = hashFunction(indexKey);
  if (hashTable[hashAddress] !== 0) {
    for (let i = 0; i < hashTable[hashAddress].lenth; i++) {
      if (hashTable[hashAddress][i][0] === indexKey) {
        // 이미 해당 키로 값이 들어갔는지 확인 후 값 업데이트
        hashTable[hashAddress][i][1] = value;
        return;
      }
    }
    //새로운 키라면 추가
    hashTable[hashAddress].push([indexKey, value]);
  } else {
    hashTable[hashAddress] = [[indexKey, value]];
  }
};
const readData = data => {
  const indexKey = getKey(data);
  const hashAddress = hashFunction(indexKey);
  const findData =
    hashTable[hashAddress] &&
    hashTable[hashAddress].find(savedData => indexKey === savedData[0]);

  return findData ? findData[1] : null;
};

saveData("react", "리액트");
saveData("svelte", "스벨트");
saveData("vue", "뷰");

console.log(hashTable);

console.log(readData("svelte"));
console.log(readData("angular"));
```
