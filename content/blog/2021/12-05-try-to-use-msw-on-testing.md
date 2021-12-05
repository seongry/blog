---
title: "테스트 환경에 MSW 도입"
date: 2021-12-06
tags:
  - javascript
  - TIL
---

회사에서 도입해보고 괜찮았던 라이브러리 사용 후기.
사내에서 공유하려고 작성했던 글인데 블로그에도 올려본다 😊

# MSW란?

MSW(Mocking Service Worker)는 서비스 워커 API를 이용해서 실제 리퀘스트를 인터셉트하는 API 모킹 라이브러리다.

## 사용했을때 이점

- 실제 API가 개발되기 전에 API를 모킹해서 없는 API를 가지고 미리 개발을 진행할 수 있어서 시간을 절약할 수 있다.
- 테스트코드 작성시 api통신을 회피하기위한 테스트코드를 작성하지 않아도 된다.

## axios-mock-adapter 와의 차이점은?

결과물 자체는 동일할지 모르나 MSW는 `서비스워커`의 존재로 인해 차이점이 생긴다.
MSW에서 서비스워커는 네트워크 레벨에서 요청을 가로채도록 설계되어 있기때문에 다른 mocking 라이브러리에 비해 여러가지 이점을 가진다.

- mocking의 여부와 상관없이 동일한 애플리케이션의 동작을 보장한다.
- 좀 더 유저가 사용하는 방식처럼 테스트를 할 수 있다.

# 테스트 환경에 MSW 세팅하기

### 패키지 설치

가장 먼저 패키지를 설치한다.

```tsx
yarn add msw --dev
```

### handler만들기

```tsx
// mocks/handlers.ts

import { rest } from 'msw';

const mockData = {
	foo: 'bar'
};

export const handlers = [
  rest.get('/test', async (req, res, ctx) => {
		if (req.body.somthing === bad) {
      return res(ctx.status(400));
    }
    return res(ctx.json(mockData));
	}),
	...
];
```

MMT는 rest api를 사용하니 rest api의 handler를 만들어준다.

이제 "/test"라는 POST 요청을 하게되면 {foo: 'bar'}라는 응답이 돌아오게 될 것이다.

### server 만들기

```tsx
// mocks/server.ts

import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

서비스워커는 브라우저용이라 테스트 환경에는 `worker`를 셋업하지 않는다. 대신 node 기반인 테스트환경에서 사용할 수 있는 `server` 를 만들어준다.

### fixture 추가 (Optional)

다음으로 모든 테스트가 모킹이 필요한 것은 아니니 msw가 필요한 테스트에서만 사용할 수 있도록 fixture를 만들어둔다.

```tsx
// helper/fixture.tsx
import { server } from "../../mocks/server";

export const prepareMsw = () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};
```

이 `prepareMsw`를 나중에 필요한 테스트코드 실행전에 붙여두면 MSW가 api를 모킹해준다!

이러면 이제 msw를 사용할 준비가 끝났다 :)

# 실제 테스트에 적용하기

적용법은 매우 간단하다.

```tsx
describe('Custom Dialog test', () => {
  prepareMsw(); // (1)
  const { bad, good } = mockEPassData;

  test('should return value, when pass valid data', async () => {
    const { getByTestId, getByRole } = renderWithClient(<Dialog />);

    userEvent.type(getByTestId('A'), good.value);
		...

    userEvent.click(getByRole('button', { name: /등록/i })); // (2)

    await waitFor(() => getByTestId('success'));

    expect(getByTestId('success')).toBeVisible();
  });
});
```

handler에 등록된 api를 호출하는 테스트코드에 (1)처럼 아까 만들어둔 `prepareMsw` 함수를 실행시키도록 하면 된다.

테스트코드를 실행해보면 실제 유저가 행동하는 것처럼 submit 버튼을 클릭하면 실제 컴포넌트에서 POST 호출을 하게될 것이고, MSW가 그 요청을 가로채서 준비해둔 값을 return 해준다.

따로 jest 모킹이나 스파이 코드 없이도 테스트코드가 터지지 않는다.(이 부분이 생산성 향상을 크게 느낀 부분이다)

# 사용 후 느낀점

테스트코드를 작성하면서 가장 답답하게 느꼈던 요소 중 하나가, 실제 작성한 컴포넌트/훅 의 기능을 테스트하려고 코드를 짰을때 앱의 기능과 관련없는 부분을 회피하기 위해 적지않은 양의 리소스를 들여야 하는 부분이 크게 느껴졌는데 이런 부분을 해소해줘서 좋았다.

덕분에 코드 작업량이 줄어들고 테스트코드가 좀 더 본래 하려던 테스트에 집중할 수 있게되고 코드 가독성도 좋아져서 만족했다.

아직 브라우저에는 적용하지 않았지만 브라우저에도 셋팅하면 백엔드 개발자를 기다릴 필요 없이 병행해서 일을 할 수 있어서 시간 절약에도 많은 도움이 될 것 같다.

# Referance

- [https://mswjs.io/](https://mswjs.io/)
- [https://www.youtube.com/watch?v=v77fjkKQTH0](https://www.youtube.com/watch?v=v77fjkKQTH0)
