---
title: "Hooks, Dependencies and Stale Closures"
date: 2022-06-05
tags:
  - react
  - 번역
  - NOT_READY
---

[원문](https://tkdodo.eu/blog/hooks-dependencies-and-stale-closures)

dependency나 hook 같은 단어의 번역은 리액트 공식문서를 기준으로 동일한 단어를 사용했습니다. (dependency는 의존성, hook은 훅, 갈고리 등이 아닌 hook으로)

---

[클로저](<https://ko.wikipedia.org/wiki/%ED%81%B4%EB%A1%9C%EC%A0%80_(%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)>)로 작업하는 것은 꽤 까다로운 일이 될 수 있습니다. 특히 리엑트에서 의존성를 가진 hook을 다룰때 까다로운 일이 될 수 있습니다. (useEffect, useMemo, useCallback을 생각해 보세요.) 많은 버그와 좌절들이 (리액트가 자체적으로 도입한 것이 아님에도) 해당 개념에 밀접하게 연관되어 있습니다. 클로저는 오히려 hook이 의존하는 언어 개념입니다.

저는 Mark Erikson의 이 질문을 좋아합니다.

![mark-erikson-tweet](./assets/hook-closure-1.png)
