---
title: "[자료구조] Hash Table 01"
date: 2021-04-01
tags:
  - 자료구조
  - algorithm
  - javascript
---

# 해쉬 테이블

## 해쉬 구조

### Hash Table: Key에 Value(데이터)를 저장하는 데이터 구조

- Key를 통해 바로 데이터를 받아올 수 있으므로, 속도가 획기적으로 빨라짐
- javascript엔 Map
- 보통 배열로 미리 Hash Table 사이즈만큼 생성 후에 사용(공간과 탐색 시간을 맞바꾸는 기법)

## 용어

- 해쉬(Hash): 임의 값을 고정 길이로 변환하는 것
- 해쉬 테이블(Hash Table): 키 값의 연산에 의해 직접 접근이 가능한 데이터 구조
- 해싱 함수(Hashing Function) : Key에 대해 산술 연산을 이용해 데이터 위치를 찾을 수 있는 함수
- 해쉬 값(Hash Value) 또는 해쉬 주소(Hash Address): Key를 해싱 함수로 연산해서, 해쉬 값을 알아내고, 이를 기반으로 해쉬 테이블에서 해당 Key에 대한 데이터 위치를 일관성 있게 찾을 수 있음
- 슬롯(Slot): 한 개의 데이터를 저장할 수 있는 공간
- 저장할 데이터에 대해 Key를 추출할 수 있는 별도 함수도 존재할 수 있음

## 구현

### 초간단 해쉬 테이블 만들기

slot과 해쉬 주소(index)를 가지고 있음

```javascript
const hashTable = Array.from(Array(10)).map(() => 0);
```

### 초간단 해쉬 함수만들기

다양한 해쉬 함수 고안 기법이 있다
**가장 간단한 방식: Division 법**
나누기를 통한 나머지 값을 사용하는 기법

```javascript
const hashFunction = key => {
  return key % 5;
};
```

실제 Key 값이 얼마든 고정된 길이(1~4)로 나오게 됨

### 해쉬 테이블에 저장해보기

데이터에 따라 필요시 key 생성 방법 정의가 필요함

```javascript
const data1 = "React";
const data2 = "Vue";
const data3 = "Angular";
```

여기에선 임의의 key 생성 방법 정의로 첫번째 문자열의 아스키 코드 값을 Key로 사용

```javascript
console.log(
  hashFunction(data1.charCodeAt(0)),
  hashFunction(data2.charCodeAt(0)),
  hashFunction(data3.charCodeAt(0))
);

const storageData = (data, value) => {
  const key = data.charCodeAt(0);
  const hashAddress = hashFunction(key);
  hashTable[hashAddress] = value;
};

storageData("Andy", "01011112222");
storageData("Dave", "01011113333");
storageData("Tony", "01011114444");
```

데이터 읽어오기

```javascript
const getData = data => {
  const key = data.charCodeAt(0);
  const hashAddress = hashFunction(key);

  return hashTable[hashAddress];
};

console.log(getData("Andy")); //01011112222
console.log(getData("Tony")); //01011114444
```

## 자료 구조 해쉬 테이블의 장단점과 주요 용도

### 장점

- 데이터 저장/읽기 속도가 빠르다.(== 검색속도가 빠르다)
- 해쉬는 키에 대한 데이터가 있는지(중복) 확인이 쉬움

### 단점

- 일반적으로 저장공간이 좀더 많이 필요하다
- **여러 키에 해당하는 주소가 동일할 경우 충돌을 해결하기 위한 별도 자료구조가 필요함**

### 주요 용도

- 검색이 많이 필요한 경우
- 저장, 삭제, 읽기가 빈번한 경우
- 캐쉬 구현시(중복 확인이 쉽기 때문)
