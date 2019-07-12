---
title: Gatsby 블로그 만드는 법
date: 2019-03-16
tags:
  - blog
  - gatsby
---

![dance](https://l56spuxk1t14k3seci6s2bja-wpengine.netdna-ssl.com/wp-content/uploads/GIF/2014/12/-Cookie-Monster-Dance-GIF-2015.gif)

우여곡절 끝에 드디어 블로그가 완성되었다.😂😂
개발자가 되고 나서 많은 정보를 얻어가던 곳이 개인이 운영하는 블로그이기도해서 나도 이런 블로그를 운영 해보고 싶다하는 생각이 항상 있었다.

아직 1차로 오픈했을 뿐이고.. 다듬고 추가할 부분도 아직 많이 남아 있지만
글을 써가면서 차근차근 다듬어 나갈 예정.
어릴때 꾸미던 다이어리처럼 이것저것 꾸며보고싶은 욕심이 많이 생긴다. 

기념비적인 첫번째 포스팅은 내가 Gatsby로 블로그를 만든 과정을 기록해두기로 했다.

## 1. 왜 Gatsby 인가?
사실 블로그를 만들려고 시도한 적이 이번이 처음은 아니다.
이 블로그가 완성되기전까지 맘에 쏙 드는 블로그를 얼마나 찾아다녔었는지...

### 목표
내가 생각하는 블로그가 충족 해야하는 목표는 아래와 같다.
1. 직접 꾸미기 편할 것
> 나의 기록장인 동시에 장난감이기도 하므로..
> 원하는 기능 추가나 스타일 변경을 손쉽게 할 수 있어야 했다.
2. 잘 알고 있는 언어로 작성할 수 있을 것
> 1번 목표를 달성하려면 제가 알고 있는 언어 선에서 개발되어야 하기 때문에..
3. 마크다운을 사용할 것
> 여러 에디터가 마크다운을 지원하고 있고, 블로그를 쓰기로 했으니 마크다운 문법에도 익숙 해지고 싶어서 목표에 추가.

### 후보 리스트
이러한 목표를 가지고 이용가능한 블로그를 리스트로 내려보자면 아래와 같다.
1. 티스토리, 네이버 블로그 등 블로깅 서비스를 제공하는 사이트 이용
> 기존에 있는 서비스를 이용하는 방법도 있지만.. 
> 이렇게 블로그를 직접 만들어보는 것도 하나의 공부가 될 것 같아서 패스
2. Jekyll
> 지킬은 테마가 풍부하지만... Ruby 기반이였고, 
> 직접 다이어리 꾸미듯 꾸미고 싶은 욕심이 있었기에 초반에 고민했지만... 패스
3. vanilla JS
> 직접 꾸밀 거면 그냥 직접 만들자! 하고 프레임워크의 도움 없이 도전 했던 적도 있었지만...
> 퍼포먼스가 영 시원찮아서 패스
4. hexo
> nodeJS 기반인 게 참 맘에 들고 거의 이쪽으로 굳어질 뻔 했었지만...

그러다가 알게 된게 **Gatsby** 였고... 
요새 리액트 공부에 빠져 있었기 때문에 ```starter```로 바로 시작해보니 '아 이거다!' 싶어서 바로 결정!
## 2. How to
가장 많은 정보는 [Gatsby](https://www.gatsbyjs.org/) 공식 페이지에 있다.

### 2.1 Gatsby-Cli 설치
우선 node, npm이 설치 되어 있어야 한다.
```bash
npm install -g gatsby-cli
```
Gatsby는 블로그용 스타터도 제공하고 있다.(참고로 나도 하단의 스타터를 사용했다😅)

사용할 스타터가 있다면 아래의 코드처럼 추가해주시면 프로젝트가 생성됩니다.
```bash
gatsby [디렉토리 이름] https://github.com/gatsbyjs/gatsby-starter-blog
``` 

### 2.2 개발모드에서 실행
설치가 끝나면 해당 디렉토리에서 개발모드에서 실행
```bash
gatsby develop
```

개발중인 화면은 ```localhost:8000``` 에서 확인 할 수 있다!

### 2.3 github pages로 배포하기

나는 깃헙페이지를 이용해서 배포하는 방식을 이용중이라 해당 방법에 대해 설명한다.
우선 깃헙에서 ```[자신의 깃헙 id].github.io``` 으로 새 저장소를 만든다.
그리고 gh-pages을 개발모드로 설치해준다
```bash
npm install --save --dev gh-pages
```
그다음 ```package.json``` 파일에 스크립트를 추가한다
```bash
"deploy": "gatsby build && gh-pages -d public -b master -r [내 깃헙 주소]"
```
이제 배포 하고싶을땐 ```npm run deploy``` 를 터미널에 입력하면 짠! 배포 끝!
### 2.4 코드 스타일 추가하기

```javascript
function foo() {
      var bar = '';
}
```
이런 깔끔한 코드 스타일을 추가 하기 위해선 몇가지 작업이 필요하다.
바로 [prismjs](https://prismjs.com/) ! 공식 홈페이지에 여러 테마도 있지만 나는 **OKADIA** 테마를 선택했다. 이유는 그냥 내가 주로 보는 코드 색과 제일 비슷해서😊
적용하기 위해선 우선 gatsby 플러그인을 설치해야한다.
```bash
npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs
```
혹시 내가 적어둔 starter 팩을 사용하시는 분이라면 이미 해당 플러그인이 설치되어 있으므로 넘어가셔도 좋다!
그다음 개츠비 환경설정 파일인 ```gatsby-config.js``` 에 플러그인을 추가해준다.
```javascript
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
                {
                    resolve: `gatsby-remark-prismjs`,
                    options: {
                      classPrefix: 'language-',
                      inlineCodeMarker: null,
                      aliases: {},
                      showLineNumbers: false,
                    }
                },
            ],
        },
  }
```

다음으론 ```gatsby-browser.js``` 에 css 파일을 추가 해주어야 한다.
```bash
require("prismjs/themes/prism-[테마이름(ex: okadia)].css")
```

이제  ``` '''[언어이름(ex: javascript)]''' ``` 를 입력하면( ' 자로 쓰여있지만 사실` 를 써주어야 한다!)
해당 언어로 색이 입혀져 있는 것을 확인 할 수 있다

모든 소스는 내 [깃헙](https://github.com/raina94/blog)에서 확인 할 수 있으니
막히실 땐 언제든 방문하셔서 코드를 뒤적거리셔도 좋다😃