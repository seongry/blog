---
title: 프로그래머스 네트워크(javascript)
date: 2019-09-26
tags:
  - algorithm
  - javascript
  - 프로그래머스
---

# 문제 설명

네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

## 제한사항

- 컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
- 각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
- i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
- computer[i][i]는 항상 1입니다.

### 입출력 예

| n   | computers                         | return |
| --- | --------------------------------- | ------ |
| 3   | [[1, 1, 0], [1, 1, 0], [0, 0, 1]] | 2      |
| 3   | [[1, 1, 0], [1, 1, 1], [0, 1, 1]] | 1      |

### 입출력 예 설명

예제 #1

아래와 같이 2개의 네트워크가 있습니다.
![예제_1](https://grepp-programmers.s3.amazonaws.com/files/ybm/5b61d6ca97/cc1e7816-b6d7-4649-98e0-e95ea2007fd7.png)

예제 #2

아래와 같이 1개의 네트워크가 있습니다.
![예제_2](https://grepp-programmers.s3.amazonaws.com/files/ybm/7554746da2/edb61632-59f4-4799-9154-de9ca98c9e55.png)

# 나의 풀이

```javascript
function dfs(start, computers, visited) {
  visited[start] = 1 //방문한 곳으로 남김
  for (let i = 0; i < computers.length; i++) {
    if (!visited[i] && computers[start][i]) {
      //해당 위치에서 다음 네트워크로 갈 수 있는 경우
      dfs(i, computers, visited) //다음 네트워크 탐색
    }
  }
}

function solution(n, computers) {
  var answer = 0,
    visited = []

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      //첫 방문일 경우
      answer++ //네트워크 추가
      dfs(i, computers, visited) //해당 부분부터 탐색
    }
  }
  return answer
}
```

처음에는 for문을 이용해서 비재귀형태로 작성했다가,

제대로된 dfs의 탐색으로 풀어보고 싶어서 다른 언어로 작성된 풀이로 어떤 식으로 구현했는지 참고한 뒤 다시 재 작성해보았다.
