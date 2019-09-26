---
title: 프로그래머스 완주하지 못한 선수(javascript)
date: 2019-09-23
tags:
  - algorithm
  - javascript
  - 프로그래머스
---

# 문제

수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

### 제한사항

- 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
- completion의 길이는 participant의 길이보다 1 작습니다.
- 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
- 참가자 중에는 동명이인이 있을 수 있습니다.

### 입출력 예

| participant                             | completion                       | return |
| --------------------------------------- | -------------------------------- | ------ |
| [leo, kiki, eden]                       | [eden, kiki]                     | leo    |
| [marina, josipa, nikola, vinko, filipa] | [josipa, filipa, marina, nikola] | vinko  |
| [mislav, stanko, mislav, ana]           | [stanko, ana, mislav]            | mislav |

### 입출력 예 설명

예제 #1leo는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #2vinko는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #3mislav는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.

# 나의 풀이

```javascript
function solution(participant, completion) {
  participant.sort() //1
  completion.sort()

  for (let i = 0; i < participant.length; i++) {
    //2
    if (participant[i] !== completion[i]) return participant[i]
  }
}
```

동명이인 부분을 어떻게 할까 생각하다, 오름차순으로 정렬 후(1) 다른 이름을 가진 경우를 찾아내기로 했다(2).

# 다른 사람의 풀이

```javascript
function solution(participant, completion) {
  var dic = completion.reduce(
    (obj, t) => ((obj[t] = obj[t] ? obj[t] + 1 : 1), obj),
    {}
  ) //1
  return participant.find(t => {
    if (dic[t]) dic[t] = dic[t] - 1
    //2
    else return true //3
  })
}
```

해결 후 다른 사람의 풀이를 살펴보다 딕셔너리를 이용한 사람의 예시를 보았다.

완주한 목록에서 이름을 기준으로 count한 리스트를 만들고(1)

전체 목록에서 이름으로 찾아서 동명이인 인 경우 한 명분 깎고(2), 없는 경우 해당 이름을 리턴(3) 하도록 구현했다.
