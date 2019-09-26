---
title: 프로그래머스 조이스틱(javascript)
date: 2019-09-24
tags:
  - algorithm
  - javascript
  - 프로그래머스
---

# 문제 설명

조이스틱으로 알파벳 이름을 완성하세요. 맨 처음엔 A로만 이루어져 있습니다.
ex) 완성해야 하는 이름이 세 글자면 AAA, 네 글자면 AAAA

조이스틱을 각 방향으로 움직이면 아래와 같습니다.

```
▲ - 다음 알파벳
▼ - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로)
◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
▶ - 커서를 오른쪽으로 이동
```

예를 들어 아래의 방법으로 JAZ를 만들 수 있습니다.

```
- 첫 번째 위치에서 조이스틱을 위로 9번 조작하여 J를 완성합니다.
- 조이스틱을 왼쪽으로 1번 조작하여 커서를 마지막 문자 위치로 이동시킵니다.
- 마지막 위치에서 조이스틱을 아래로 1번 조작하여 Z를 완성합니다.
  따라서 11번 이동시켜 "JAZ"를 만들 수 있고, 이때가 최소 이동입니다.
  만들고자 하는 이름 name이 매개변수로 주어질 때, 이름에 대해 조이스틱 조작 횟수의 최솟값을 return 하도록 solution 함수를 만드세요.
```

## 제한 사항

name은 알파벳 대문자로만 이루어져 있습니다.
name의 길이는 1 이상 20 이하입니다.

## 입출력 예

| name   | return |
| ------ | ------ |
| JEROEN | 56     |
| JAN    | 23     |

# 나의 풀이

탐욕법 문제. 주어진 상황에서 가장 최선의 방법을 선택할 것.

그래서 문자 변환 후 다음 문자로 넘어갈 때 A가 아닌 문자를 만날때 가장 적게 걸리는 경우를 찾도록 했다.

다만 이 문제도 대부분의 테스트를 통과했지만 테스트 5번 항목에서 실패 했다.

'AABAAAAAAABBB' 인 경우 12가 return 되도록 해야 하는데 해결 하지 못했다.

```javascript
function solution(name) {
  let answer = 0,
    start = "A".charCodeAt(0),
    end = "Z".charCodeAt(0),
    index = 0,
    reverse = false,
    init = ""

  for (let i = 0; i < name.length; i++) {
    init += "A"
  }

  while (init !== name) {
    let left = 0,
      right = 0
    if (init[index] !== name[index]) {
      answer +=
        name[index].charCodeAt(0) - start < end - name[index].charCodeAt(0)
          ? name[index].charCodeAt(0) - start
          : end - name[index].charCodeAt(0) + 1
      init = init.substring(0, index) + name[index] + init.substring(index + 1)
    }

    if (init !== name) {
      if (!reverse) {
        for (let i = index + 1; i < name.length; i++) {
          left += 1
          if (name[i] !== "A") {
            break
          }
        }

        for (let i = name.length - 1; i > index; i--) {
          right += 1
          if (name[i] !== "A") {
            break
          }
        }

        if (right < left) {
          reverse = true
        }
      }

      if (reverse && !index) {
        index = name.length - 1
      } else {
        reverse ? index-- : index++
      }

      answer += 1
    }
  }
  return answer
}
```
