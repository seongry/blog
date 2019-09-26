---
title: 프로그래머스 베스트앨범(javascript)
date: 2019-09-25
tags:
  - algorithm
  - javascript
  - 프로그래머스
---

# 문제 설명

스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다. 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

1. 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
2. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.

노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때, 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

## 제한사항

- genres[i]는 고유번호가 i인 노래의 장르입니다.
- plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
- genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
- 장르 종류는 100개 미만입니다.
- 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
- 모든 장르는 재생된 횟수가 다릅니다.

**입출력 예**

| genres                                | plays                      | return       |
| ------------------------------------- | -------------------------- | ------------ |
| [classic, pop, classic, classic, pop] | [500, 600, 150, 800, 2500] | [4, 1, 3, 0] |

**입출력 예 설명**

classic 장르는 1,450회 재생되었으며, classic 노래는 다음과 같습니다.

- 고유 번호 3: 800회 재생
- 고유 번호 0: 500회 재생
- 고유 번호 2: 150회 재생

pop 장르는 3,100회 재생되었으며, pop 노래는 다음과 같습니다.

- 고유 번호 4: 2,500회 재생
- 고유 번호 1: 600회 재생
  따라서 pop 장르의 [4, 1]번 노래를 먼저, classic 장르의 [3, 0]번 노래를 그다음에 수록합니다.

# 나의 풀이

```javascript
function solution(genres, plays) {
  var answer = [],
    total = [], //각 장르별 전체 플레이된 수
    top = {} //각 장르별 가장 많이 플레이된 음악 두곡(내림차순)
  for (let i = 0; i < genres.length; i++) {
    //합계 구하기
    let index = total.findIndex(e => e.name === genres[i])
    if (index < 0) {
      //아직 추가되지 않은 경우 새로 배열 추가
      total.push({
        name: genres[i],
        val: plays[i],
      })
    } else {
      //이미 카운트 된 장르의 경우 합산
      let temp = total[index]
      total[index].val = temp.val + plays[i]
    }

    //장르별 많이 들은 노래 구하기
    if (!top[genres[i]]) {
      //없는 경우 추가
      top[genres[i]] = [i]
    } else {
      //있는 경우 비교해서 교체
      let temp = top[genres[i]]
      if (temp.length < 2) {
        plays[temp[0]] < plays[i]
          ? top[genres[i]].unshift(i)
          : top[genres[i]].push(i)
      } else {
        if (plays[temp[0]] < plays[i]) {
          top[genres[i]].unshift(i)
          top[genres[i]].pop()
        } else if (plays[temp[1]] < plays[i]) {
          top[genres[i]].pop()
          top[genres[i]].push(i)
        }
      }
    }
  }

  //내림차순 정렬
  total.sort((a, b) => {
    return a.val > b.val ? -1 : a.val < b.val ? 1 : 0
  })

  //합산
  total.forEach(item => {
    answer = answer.concat(top[item.name])
  })

  return answer
}
```
