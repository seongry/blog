---
title: 프로그래머스 숫자야구(javascript)
date: 2019-10-02
tags:
  - algorithm
  - javascript
  - 프로그래머스
---

# 문제 설명

숫자 야구 게임이란 2명이 서로가 생각한 숫자를 맞추는 게임입니다.

각자 서로 다른 1~9까지 3자리 임의의 숫자를 정한 뒤 서로에게 3자리의 숫자를 불러서 결과를 확인합니다. 그리고 그 결과를 토대로 상대가 정한 숫자를 예상한 뒤 맞힙니다.

```
* 숫자는 맞지만, 위치가 틀렸을 때는 볼
* 숫자와 위치가 모두 맞을 때는 스트라이크
* 숫자와 위치가 모두 틀렸을 때는 아웃
```

예를 들어, 아래의 경우가 있으면

```
A : 123
B : 1스트라이크 1볼.
A : 356
B : 1스트라이크 0볼.
A : 327
B : 2스트라이크 0볼.
A : 489
B : 0스트라이크 1볼.
```

이때 가능한 답은 324와 328 두 가지입니다.

질문한 세 자리의 수, 스트라이크의 수, 볼의 수를 담은 2차원 배열 baseball이 매개변수로 주어질 때, 가능한 답의 개수를 return 하도록 solution 함수를 작성해주세요.

## 제한사항

- 질문의 수는 1 이상 100 이하의 자연수입니다.
- baseball의 각 행은 [세 자리의 수, 스트라이크의 수, 볼의 수] 를 담고 있습니다.

## 입출력 예

| baseball                                             | return |
| ---------------------------------------------------- | ------ |
| [[123, 1, 1], [356, 1, 0], [327, 2, 0], [489, 0, 1]] | 2      |

### 입출력 예 설명

문제에 나온 예와 같습니다.

# 나의 풀이

```javascript
function solution(baseball) {
  var answer = [],
    numbers = []

  function strike(cur, target, num) {
    //스트라이크인지 판별
    let temp = 0
    for (let i = 0; i < 3; i++) {
      if (String(cur)[i] === String(target)[i]) {
        temp++
      }
    }

    return temp === num
  }
  function ball(cur, target, num) {
    //볼인지 판별
    let temp = 0
    for (let i = 0; i < 3; i++) {
      if (String(cur).indexOf(String(target)[i]) >= 0) {
        temp++
      }
    }

    return temp === num
  }

  //답이 될 수 있는 모든 숫자 리스트 생성
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      for (let z = 1; z < 10; z++) {
        if (z !== i && z !== j && i !== j) {
          numbers.push(i * 100 + j * 10 + z)
        }
      }
    }
  }

  for (let i = 0; i < numbers.length; i++) {
    let flag = true
    for (let j = 0; j < baseball.length && flag; j++) {
      let s = strike(numbers[i], baseball[j][0], baseball[j][1])
      let b = ball(numbers[i], baseball[j][0], baseball[j][1] + baseball[j][2])
      //일치하는 숫자를 찾는 것이므로 스트라이크 + 볼의 갯수만큼 찾도록

      if (!s || !b) {
        flag = false
      }
    }
    if (flag) {
      answer.push(numbers[i])
    }
  }

  return answer.length
}
```

완전탐색으로 문제를 풀기 위해 가능성이 있는 숫자들(numbers)에서 주어진 조건이 모두 만족하는 경우만 answer에 추가하도록 짰다.
