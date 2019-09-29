---
title: 프로그래머스 단어 변환(javascript)
date: 2019-09-26
tags:
  - algorithm
  - javascript
  - 프로그래머스
---

# 문제 설명

두 개의 단어 begin, target과 단어의 집합 words가 있습니다. 아래와 같은 규칙을 이용하여 begin에서 target으로 변환하는 가장 짧은 변환 과정을 찾으려고 합니다.

```
1. 한 번에 한 개의 알파벳만 바꿀 수 있습니다.
2. words에 있는 단어로만 변환할 수 있습니다.
```

예를 들어 begin이 hit, target가 cog, words가 [hot,dot,dog,lot,log,cog]라면 hit -> hot -> dot -> dog -> cog와 같이 4단계를 거쳐 변환할 수 있습니다.

두 개의 단어 begin, target과 단어의 집합 words가 매개변수로 주어질 때, 최소 몇 단계의 과정을 거쳐 begin을 target으로 변환할 수 있는지 return 하도록 solution 함수를 작성해주세요.

## 제한사항

- 각 단어는 알파벳 소문자로만 이루어져 있습니다.
- 각 단어의 길이는 3 이상 10 이하이며 모든 단어의 길이는 같습니다.
- words에는 3개 이상 50개 이하의 단어가 있으며 중복되는 단어는 없습니다.
- begin과 target은 같지 않습니다.
- 변환할 수 없는 경우에는 0를 return 합니다.

### 입출력 예

| begin | target | words                          | return |
| ----- | ------ | ------------------------------ | ------ |
| hit   | cog    | [hot, dot, dog, lot, log, cog] | 4      |
| hit   | cog    | [hot, dot, dog, lot, log]      | 0      |

### 입출력 예 설명

**예제 #1**

문제에 나온 예와 같습니다.

**예제 #2**

target인 cog는 words 안에 없기 때문에 변환할 수 없습니다.

# 나의 풀이

```javascript
function bfs(search, target, words, count, result) {
  let queue = []
  //형제부터 우선 탐색
  for (let i = 0; i < words.length; i++) {
    let unmatch = words[i].split("").reduce((acc, cur, idx) => {
      return cur !== search[idx] ? acc + 1 : acc
    }, 0)

    //search를 words중 하나로 바꿀 수 있는 경우
    if (unmatch === 1) {
      if (target === words[i]) {
        //바꾼글자가 target인 경우 result에 추가
        result.push(count + 1)
      }

      let clone = words.slice()
      clone.splice(1, i)
      queue.push({
        search: words[i],
        words: clone,
      })
    }
  }

  //이후 아래로 내려감
  if (queue.length) {
    count++
    for (let i = 0; i < queue.length; i++) {
      bfs(queue[i].search, target, queue[i].words, count, result)
    }
  }
}

function solution(begin, target, words) {
  var result = []
  //target으로 아예 바꿀 수 없는 경우
  if (words.findIndex(word => word === target) < 0) {
    return 0
  }

  bfs(begin, target, words, 0, result)
  return Math.min.apply(null, result)
}
```

BFS를 직접 구현해볼 수 있어서 시간은 오래걸렸지만 보람있었다.

다만 BFS의 인자가 너무 많아진 건 아쉽다.
