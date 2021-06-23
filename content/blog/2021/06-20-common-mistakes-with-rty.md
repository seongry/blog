---
title: "(번역) Common mistakes with React Testing Library"
date: 2021-06-20
tags:
  - react
  - react-testing-library
  - 번역
---

React Testing Library를 유용하게 잘 쓰고 있는 사람으로서, 공감도 가고 새로운 꿀팁도 많이 배웠던 좋은 글이라 번역해봤습니다.

원문: [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

저는 사람들이 React Testing Library로 만드는 실수를 자주 봅니다.

안녕하세요 👋 저는 당시 테스트 환경에 만족하지 않아서 React Testing Library를 만들었습니다. 이것은 DOM Testing Library로 확장되었으며 이제 우리는 모든 인기 있는 자바스크립트 프레임워크 및 DOM을 대상으로 하는 테스팅 툴을(과 그렇지 않은 테스팅 툴을) 위한 Testing Library 구현체를 가졌습니다.

시간이 지남에 따라, 저희는 API에 약간의 변경을 가했고, 최적이 아닌 패턴을 발견했습니다. 저희가 제공한 유틸리티를 사용하기 위한 "더 나은 방법"을 문서화하려는 노력에도, 여전히 최적이 아닌 패턴에 따라 작성된 블로그 포스팅이나 테스트를 보고 있으며, 이들 중 일부를 살펴보고 왜 좋지 않은지, 어떻게 이러한 함정을 피해서 테스트를 개선할 수 있는지 설명하고 싶습니다.

> Note: 저는 각 항목의 중요도에 따라 라벨을 매겼습니다.
>
> - 낮음: 이것은 보통 그냥 제 개인적 의견이며, 자유롭게 무시하셔도 괜찮습니다.
> - 중간: 버그를 경험하거나, 신뢰도를 잃거나, 필요치 않은 작업을 하게 될지도 모릅니다.
> - 높음: 꼭 이 조언을 들으세요! 신뢰도가 낮거나 문제가 있는 테스트가 있을 수 있습니다.

## Tesing Library ESLint 플러그인을 사용하지 않기

> 중요도: medium

만약 일반적인 실수들을 피하고 싶다면, 공식 ESLint 플러그인이 많은 도움이 될 것입니다:

- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)
- [eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom)

**조언: Testing Library에 ESLint 플러그인을 설치하고 사용하세요**

## `render`의 리턴 값에 대한 변수 이름으로 `wrapper`를 사용하기

> 중요도: 낮음

```javascript
// ❌
const wrapper = render(<Example prop="1" />);
wrapper.rerender(<Example prop="2" />);
// ✅
const { rerender } = render(<Example prop="1" />);
rerender(<Example prop="2" />);
```

`wrapper`라는 이름은 `enzyme`의 오래된 코드이며 여기선 필요하지 않습니다. `render`의 리턴 값은 아무것도 "감싸지(wrapping)" 않습니다. 이것은 (다음 항목 덕분에) 어쨌든 실제로 필요하지 않은 단순한 유틸리티의 조합 입니다.

**조언: `render`로 부터 필요한 것을 구조 분해하거나, (wrapper 대신) `view`라고 부르세요**

## `cleanup`을 사용하기

> 중요도: 중간

```javascript
// ❌
import { render, screen, cleanup } from "@testing-library/react";
afterEach(cleanup);
// ✅
import { render, screen } from "@testing-library/react";
```

오랜 시간 동안 `cleanup`은 자동으로 이루어지고 (대부분 주요 테스팅 프레임워크에서 지원됨) 더는 거기에 대해 걱정할 필요가 없습니다. [더 알아보기](https://testing-library.com/docs/react-testing-library/api#cleanup)

**조언: `cleanup`을 사용하지 마세요**

## `screen` 사용하지 않기

> 중요도: 중간

```javascript
// ❌
const { getByRole } = render(<Example />);
const errorMessageNode = getByRole("alert");
// ✅
render(<Example />);
const errorMessageNode = screen.getByRole("alert");
```

`screen`은 [DOM Testing Library 6.11.0 버전에서 추가되었으며](https://github.com/testing-library/dom-testing-library/releases/tag/v6.11.0) (즉 `@testing-library/react@>=9` 에 접근할 수 있어야 한다는 의미입니다.), `render`를 가져오는 곳과 동일한 import문에서 나옵니다:

```javascript
import { render, screen } from "@testing-library/react";
```

`screen`을 사용해서 얻는 이점은 더는 필요한 쿼리를 추가/제거 할 때 `render`를 호출해 최신 상태로 구조 분해할 필요가 없다는 것입니다. 당신이 필요한 건 `screen`을 입력하는 것뿐입니다. 그리고 에디터의 자동완성 마법이 나머지를 처리합니다.

이것의 유일한 예외는 이를 피해야 하는 `container`나 `baseElement`를 세팅한 경우입니다.(솔직히 이러한 옵션에 대한 합법적인 사용례를 더는 생각할 수 없었으며 현재로서는 역사적인 이유로만 존재합니다.)

`debug` 대신 `screen.debug`를 사용할 수도 있습니다.

**조언: 쿼리와 디버깅을 위해 `screen`을 사용하세요**

## 잘못된 [단언문](https://ko.wikipedia.org/wiki/%ED%91%9C%EB%AA%85)을 사용하기

> 중요도: 높음

```javascript
const button = screen.getByRole("button", { name: /disabled button/i });
// ❌
expect(button.disabled).toBe(true);
// 에러 메세지:
//  expect(received).toBe(expected) // Object.is equality
//
//  Expected: true
//  Received: false
// ✅
expect(button).toBeDisabled();
// 에러 메세지:
//   Received element is not disabled:
//     <button />
```

위에서 사용한 `toBeDisabled` 단언문은 `jest-dom`에 있습니다. 훨씬 나은 에러 메세지를 받을 수 있으므로 `jest-dom`을 사용하는 것을 추천합니다.

**조언: [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom#tobedisabled)를 설치해서 사용하세요**

## `act`로 불필요하게 감싸기

> 중요도: 중간

```javascript
// ❌
act(() => {
  render(<Example />);
});
const input = screen.getByRole("textbox", { name: /choose a fruit/i });
act(() => {
  fireEvent.keyDown(input, { key: "ArrowDown" });
});
// ✅
render(<Example />);
const input = screen.getByRole("textbox", { name: /choose a fruit/i });
fireEvent.keyDown(input, { key: "ArrowDown" });
```

저는 사람들이 항상 "act" 경고문을 보고 필사적으로 경고문을 지우기 위해 이렇게 `act`로 감싸는 것을 봤습니다만, 그 사람들이 몰랐던 것은 `render`와 `fireEvent`는 항상 `act`로 감싸져 있다는 것입니다! 따라서 이런 행동은 유용하지 않습니다.

대부분의 경우, `act` 경고문을 본다면, 무언가 그냥 침묵하는 것이 아니라 무언가 기대하지 않은 일이 당신의 테스트에서 일어나고 있다는 것을 말해주고 있는 것입니다. 제 블로그 포스팅(과 비디오)에서 여기에 대해 배울 수 있습니다.: ["not wrapped in act(...)" 경고문 고치기.](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning)

**조언: 언제 `act`가 필요한지 배우고 불필요하게 `act`로 감싸지 않기**

## 잘못된 쿼리를 사용하기

> 중요도: 높음

```javascript
// ❌
// DOM이 동작한다고 가정하기:
// <label>Username</label><input data-testid="username" />
screen.getByTestId("username");
// ✅
// 레이블을 연결하고 타입을 설정해 DOM을 접근가능하도록 변경
// <label for="username">Username</label><input id="username" type="text" />
screen.getByRole("textbox", { name: /username/i });
```

저희는 ["어떤 쿼리를 써야 하나요?"](https://testing-library.com/docs/guide-which-query)라는 쿼리들의 사용 우선순위 페이지를 운영하고 있습니다. 혹시 당신의 목표가 사용자가 당신의 앱을 사용할 때 작동할 것이라는 확신을 주는 테스트라는 저희의 목적과 일치한다면, 가능한 최종 사용자가 하는 방식에 가깝게 DOM을 쿼리하는 것이 좋습니다. 저희가 제공하는 쿼리들은 이를 도와드립니다만, 모든 쿼리들이 동일하게 생성되진 않습니다.

### `container`를 사용하여 요소 쿼리

"잘못된 쿼리를 사용하기"의 하위 섹션으로 `container`에서 직접 쿼리하는 것에 대해 이야기해 보고 싶습니다.

```javascript
// ❌
const { container } = render(<Example />);
const button = container.querySelector(".btn-primary");
expect(button).toHaveTextContent(/click me/i);
// ✅
render(<Example />);
screen.getByRole("button", { name: /click me/i });
```

유저들이 UI와 상호작용할 수 있는데 `querySelector`를 사용해서 쿼리하면 많은 신뢰도를 잃고, 테스트가 읽기 힘들어지며, 테스트가 더 자주 중단될 것이라고 확신합니다. 다음 하위 섹션에서 이어서 진행됩니다.

### 텍스트로 쿼리하지 않음

"잘못된 쿼리를 사용하기"의 하위 섹션으로, 왜 제가 테스트 ID나 그 외 기술적인 것들을 사용하는 대신 _실제_ 텍스트(localization을 예로 들면, 저는 기본 locale을 추천합니다.)로 쿼리하는 것을 추천하는지에 대해 이야기하고 싶습니다.

```javascript
// ❌
screen.getByTestId("submit-button");
// ✅
screen.getByRole("button", { name: /submit/i });
```

실제 텍스트로 쿼리하지 않으면, 번역이 올바르게 적용되는지 확인하기 위해 추가 작업을 해야 합니다. 이것에 관련된 제가 듣는 가장 큰 불만은 컨텐츠 작성자가 테스트를 망가뜨리게 한다는 것입니다. 이에 대한 반박으로 먼저, 만약 컨텐츠 작성자가 "유저이름"을 "이메일"로 바꾸는 경우, 그것은 제가 명백히 알아야 하는 변경 점이라는 것입니다.(제 구현체를 바꿔야 하니까요) 또, 뭔가 망가지는 상황이 있더라도 분류하고 문제를 고치는 게 쉬워서 해당 문제를 고치는데 전혀 시간이 걸리지 않습니다.

따라서 비용은 매우 낮은데, 번역이 올바르게 적용되고 테스트를 읽고 쓰기 더 쉬워진다는 확신을 얻을 수 있다는 이득이 있습니다.

모든 사람이 제게 동의하지 않을 수 있다고 말씀드렸습니다, 이것에 자세히 알고 싶다면 [이 트위터 스레드](https://twitter.com/kentcdodds/status/1203179007644012544)를 읽어보세요.

### `*ByRole`를 대부분 사용하지 않기

"잘못된 쿼리를 사용하기"의 하위 섹션으로, `*ByRole`에 대해 이야기 하고 싶습니다. 최근 버전에서는, `*ByRole` 쿼리는 많은 개선이 있었고(멋진 작업을 해주신 [Sebastian Silbermann](https://twitter.com/sebsilbermann) 감사합니다) 이제 컴포넌트 출력물을 쿼리하는데 가장 권장되는 접근 방식입니다. 제가 좋아하는 기능들 몇 개를 보시죠.

`name` 옵션을 사용하면 엘리먼트에 대해 스크린 리더(screen reader)에서 읽을 [접근가능한 이름(Accessible Name)](https://www.w3.org/TR/accname-1.1/)으로 엘리먼트를 쿼리할 수 있습니다.

```javascript
// DOM이 동작한다고 가정하기
// <button><span>Hello</span> <span>World</span></button>
screen.getByText(/hello world/i);
// ❌ 아래와 같은 에러와 함께 실패함:
// 다음과 같은 텍스트를 가진 엘리먼트를 찾을 수 없습니다: /hello world/i.
// 이것은 다수의 엘리먼트들에 의해 텍스트가 부서졌기 때문일 수 있습니다.
// 이런 경우, 텍스트 matcher를 더 유연하게 만들기 위해 함수를 제공할 수 있습니다.
screen.getByRole("button", { name: /hello world/i });
// ✅ 동작함!
```

사람들이 `*ByRole` 쿼리를 사용하지 않는 이유는 엘리먼트에 배치된 암시적인 역할에 익숙하지 않기 때문입니다. [여기 MDN의 규칙 리스트가 있습니다](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles). 그래서 `*ByRole` 쿼리의 제가 좋아하는 기능의 또 다른 점은 지정한 역할을 가진 엘리먼트를 찾을 수 없는 경우, 일반적인 `get*`이나 `find*` 변형과 마찬가지로 전체 DOM의 로그를 남길 뿐 아니라 쿼리 할 수 있는 모든 사용 가능한 역할들도 로그를 남깁니다!

```javascript
// 작동하는 DOM 구조가 있다고 가정
// <button><span>Hello</span> <span>World</span></button>
screen.getByRole("blah");
```

이것은 아래 에러 메세지와 함께 실패할 것입니다:

```javascript
TestingLibraryElementError: "blah" 규칙을 가진 접근가능한 엘리먼트를 찾을 수 없었습니다.
접근가능한 규칙은 아래와 같습니다:
  button:
  Name "Hello World":
  <button />
  --------------------------------------------------
<body>
  <div>
    <button>
      <span>
        Hello
      </span>
      <span>
        World
      </span>
    </button>
  </div>
</body>
```

버튼 역할을 가지려고 버튼에 `role=button` 를 추가할 필요가 없었다는 것에 주의하세요. 이건 우리를 다음 조언으로 완벽하게 이어지게 하는 암묵적인 역할을 합니다.

**조언: ["어떤 쿼리를 써야할까요" 가이드](<[https://testing-library.com/docs/guide-which-query](https://testing-library.com/docs/guide-which-query)>)를 읽고 추천을 따르세요.**

## `aria-`, `role` 및 기타 접근성 속성(accessibility attributes)을 잘못 추가하기

> 중요도: 높음

```javascript
// ❌
render(<button role="button">Click me</button>);

// ✅
render(<button>Click me</button>);
```

손쉬운 접근성 속성은 좋든 싫든 불필요할 뿐 아니라(앞에서 본 사례처럼), 스크린 리더와 서비스 이용자들을 혼란스럽게 만듭니다. 접근성 속성은 정말 의미론적 HTML이 use case를 만족시키지 못할 때만 필요합니다.([downshift의 autocomplete 처럼](<[https://github.com/downshift-js/downshift](https://github.com/downshift-js/downshift)>) 접근성이 향상된 비 네이티브 UI를 만들고 싶을 때 처럼요) 혹시 이게 당신이 만들던 거라면, 접근성을 향상시키는 기존의 라이브러리를 이용하거나 WAI-ARIA practices를 따르세요. 거기엔 [좋은 예시들](<[https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html)>)이 있습니다.

> Note: "role"을 통해 `input` 에 접근성을 향상시키기 위해선 `type` 속성을 지정해야 합니다!

**조언: 불필요하거나 잘못된 접근성 속성 추가를 피하세요**

## `@testing-library/user-event` 사용하지 않기

> 중요도: 중간

```javascript
// ❌
fireEvent.change(input, { target: { value: "hello world" } });
// ✅
userEvent.type(input, "hello world");
```

[`@testing-library/user-event`](<[https://github.com/testing-library/user-event](https://github.com/testing-library/user-event)>)는 `fireEvent` 의 기반으로 빌드된 패키지지만, 사용자 상호작용과 더 유사한 여러 메서드들을 제공합니다. 앞의 예제에서, `fireEvent.change` 는 단순히 input의 하나의 변경 이벤트를 트리거할 것입니다. 하지만 `type` 호출은 문자마다 `keyDown`, `keyPress`, `keyUp` 이벤트들을 트리거합니다. 이쪽이 훨씬 실제 사용자 상호작용과 유사하죠. 이것은 변경 이벤트를 수신하지 않는 라이브러리와도 잘 동작한다는 이점이 있습니다.

저희는 계속 `@testing-library/user-event` 가 약속한 것을 가져다주는지 확인하고 있습니다: 특정 작업을 수행할 때 유저가 실행할 모든 동일한 이벤트를 실행합니다. 저는 저희가 아직 거기에 도달했다고 생각하지는 않기 때문에 `@testing-library/dom` 에 포함되지 않았습니다.(언젠가 미래엔 될지도 모르지만요) 하지만 `fireEvent` 보다 `@testing-library/user-event`의 유틸리티를 사용하는 것을 강력히 추천합니다.

**조언: 가능한 `fireEvent` 보다 `@testing-library/user-event` 를 사용하세요**

## 존재 여부를 확인하는 경우 외의 모든 곳에 `query*` 변형을 사용하기

> 중요도: 높음

```javascript
// ❌
expect(screen.queryByRole("alert")).toBeInTheDocument();
// ✅
expect(screen.getByRole("alert")).toBeInTheDocument();
expect(screen.queryByRole("alert")).not.toBeInTheDocument();
```

쿼리들의 `query*` 변형이 노출되는 _유일한_ 이유는 쿼리와 일치하는 엘리먼트가 없을 때 에러를 발생하지 않고 호출할 수 있는 함수를 갖기 때문입니다.(아무 요소도 찾을 수 없으면 `null`을 반환합니다.) 이것이 유용한 유일한 이유는 엘리먼트가 페이지에 렌더링 되지 않았는지 확인하는 것입니다.

**조언: `query*` 변형은 엘리먼트를 찾을 수 없다는 단언을 할 때만 사용하세요**

## `find*` 로 쿼리할 수 있는 엘리먼트를 `waitFor` 를 사용해서 기다리기

> 중요도: 높음

```javascript
// ❌
const submitButton = await waitFor(() =>
  screen.getByRole("button", { name: /submit/i })
);
// ✅
const submitButton = await screen.findByRole("button", { name: /submit/i });
```

저 두 줄의 코드는 근본적으로 같지만(`find*` 쿼리는 내부에서 `waitFor`을 사용합니다), 두 번째 코드가 더 간단하고 더 나은 에러메세지를 받을 수 있습니다.

**조언: 즉시 사용할 수 없는 무언가를 쿼리하고 싶을 때는 언제든지 `find*`을 사용하세요**

## `waitFor` 에 빈 콜백을 넘겨주기

> 중요도: 높음

```javascript
// ❌
await waitFor(() => {});
expect(window.fetch).toHaveBeenCalledWith("foo");
expect(window.fetch).toHaveBeenCalledTimes(1);
// ✅
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith("foo"));
expect(window.fetch).toHaveBeenCalledTimes(1);
```

`waitFor` 의 목적은 특정한 것이 일어날 때까지 기다리게 하는 것입니다. 만약 빈 콜백을 넘겨준다면 모의 작업의 방식 덕분에 "이벤트 루프의 한 틱(tick)"만 기다리면 되기 때문에 오늘은 동작*할지도 모릅니다.* 하지만 비동기 로직을 리펙터링하면 쉽게 실패하는 취약한 테스트가 남게 됩니다.

**조언: `waitFor` 내부의 명확한 단언문을 기다립니다**

## 단일 `waitFor` 콜백 안의 다중 단언문을 가지기

> 중요도: 낮음

```javascript
// ❌
await waitFor(() => {
  expect(window.fetch).toHaveBeenCalledWith("foo");
  expect(window.fetch).toHaveBeenCalledTimes(1);
});
// ✅
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith("foo"));
expect(window.fetch).toHaveBeenCalledTimes(1);
```

앞의 예시에서 `window.fetch`가 두 번 호출된다고 가정해봅시다. 따라서 `waitFor` 호출은 실패하지만, 우리는 테스트 실패를 보기 전에 타임아웃을 기다려야 합니다. waitFor 안에 단일 단언문만 넣음으로써, 우리는 UI가 우리가 기대했던 대로 단언한 상태가 될 때까지 기다리거나, 단언문들 중 하나가 실패하면 더 빨리 실패를 볼 수 있습니다.

**조언: 콜백안에는 하나의 단언문만 넣으세요**

## `waitFor`에 사이드 이펙트 수행하기

> 중요도: 높음

```javascript
// ❌
await waitFor(() => {
  fireEvent.keyDown(input, { key: "ArrowDown" });
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});
// ✅
fireEvent.keyDown(input, { key: "ArrowDown" });
await waitFor(() => {
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});
```

`waitFor`은 수행한 작업과 단언문 전달 사이에 비결정적 시간이 있는 테스트를 위한 것입니다. 이러한 이유로, 콜백은 비결정적 횟수와 빈도로 호출될(혹은 에러 검사할) 수 있습니다.(DOM이 변경될 때 마다도 호출됩니다). 따라서 이것은 사이드 이펙트가 여러 번 실행될 수 있다는 뜻입니다!

또한 이건 `waitFor` 내부에 스냅샷 단언문을 사용할 수 없다는 의미이기도 합니다. 만약 스냅샷 단언문을 사용하고 싶다면, 우선 특정 단언문을 기다리고, 그다음 스냅샷을 찍으면 됩니다.

**조언: `waitFor` 콜백 바깥에 사이드 이펙트를 넣고 콜백 안에는 단언문만 사용하세요**

## `get*` 변형을 단언문처럼 사용하기

> 중요도: 낮음

```javascript
// ❌
screen.getByRole("alert", { name: /error/i });
// ✅
expect(screen.getByRole("alert", { name: /error/i })).toBeInTheDocument();
```

이건 그리 큰 문제는 아니지만, 문제에 대해 언급하고 제 의견을 드려야 할 것 같습니다. 만약 `get*` 쿼리들이 엘리먼트를 찾는 데 실패했다면, 쿼리들은 디버깅에 도움이 될 수 있도록 전체 DOM 구조를(문법에 하이라이팅까지 해서) 보여주는 아주 유용한 에러 메세지를 던질 겁니다. 이것 때문에, 단언문은 절대로 실패할 가능성이 없습니다.(왜냐면 쿼리들이 단언문이 실행되기 전에 에러를 던질 테니까요).

이러한 이유에서, 많은 사람들은 단언문을 건너뜁니다. 솔직히 이래도 정말 괜찮아요, 다만 저는 개인적으로 보통 코드를 읽는 사람에게 이것이 리펙터링 이후에 붙어있는 오래된 쿼리가 아니라 그것이 존재함을 명확하게 알려주기 위해 단언문을 유지합니다.

**조언: 뭔가 존재함을 단언하고 싶으면, 단언문을 명시적으로 만드세요**

## 결론

테스트 라이브러리 도구 제품군의 메인테이너로서, 가능한 효과적으로 사용할 수 있는 API를 만들기 위해 최선을 다하고 부족한 부분은 올바르게 문서화하려고 노력하고 있습니다. 다만 이는 매우 어려울 수 있습니다(특히 API의 변경,개선 등). 이 문서가 도움되었길 바랍니다. 저희는 당신이 자신감을 가지고 소프트웨어를 더 성공적으로 전달할 수 있길 바랍니다.

행운을 빕니다!
