---
title: 프로그래머스 큰 수 만들기(javascript)
date: 2019-09-24
tags:
  - algorithm
  - javascript
  - 프로그래머스
---

# 문제 설명

어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.

예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다. 이 중 가장 큰 숫자는 94 입니다.

문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다. number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.

## 제한 조건

number는 1자리 이상, 1,000,000자리 이하인 숫자입니다.

k는 1 이상 number의 자릿수 미만인 자연수입니다.

## 입출력 예

| number     | k   | return |
| ---------- | --- | ------ |
| 1924       | 2   | 94     |
| 1231234    | 3   | 3234   |
| 4177252841 | 4   | 775841 |

# 나의 풀이

**1차 풀이**

```javascript
function solution(number, k) {
    var array = number.split(''),//문자를 잘라내기
        min = Math.min.apply(null, array),
        temp = 0;
    while(temp < k){
        let remove = {
            val: 0,
            index: -1,
        };
        for(let i = 0; i < array.length; i++) {
            let slice = array.slice();//배열을 순회하기 위해 복제
            slice.splice(i,1);//복제한 배열에서 한 글자 제거
            if(Number(slice.join('')) > remove.val){
                //제거된 결과값이 가장 큰 경우 제거할 변수에 넣기
                remove = {
                    val: Number(slice.join('')),
                    index: i
                };
            }
        };

        if(remove.index > -1) {
            //가장 큰 수를 찾아낸 뒤 제거
            array.splice(remove.index,1);
        }
        temp++;
    }
    return array.join('');
```

처음에는 가장 작은 숫자를 제거 하려다 답이 틀렸다는 것을 깨닫고 탐욕법을 사용 할 수 있도록 변경했다.

테스트 케이스는 전부 통과했지만 채점 시엔 반은 맞고.. 반은 틀리고.. 반은 시간 초과.. 타노스인줄

**2차 풀이**

```javascript
function solution(number, k) {
  var index = 0

  while (index < k) {
    for (let i = 0; i < number.length; i++) {
      if (
        number[i] < number[i + 1] ||
        (number[i] === "0" && number[i + 1] === "0")
      ) {
        number = number.replace(number[i], "")
        break
      }
    }
    index++
  }
  return number
}
```

앞글자가 뒷글자보다 작은 경우를 먼저 지워나가면 큰 숫자가 만들어 져서 다시 짜본 결과.

(배열의 길이가 무수히 길어지면, 배열로 변환할 때 걸리는 시간도 길어진다고 해서 문자열 비교로 변경도 해봤다)

대부분의 테스트는 통과했지만 시간 초과되는 한문제를 해결 하지 못했다.ㅜㅠ
