# 스크롤 애니메이션

- 스크롤 애니메이션에 따라 캐릭터가 걸어가고 원하는 타이밍에 문장이나 글자를 보이게 한다.
- 튜토리얼 : [React Three Fiber tutorial - Scroll Animations](https://www.youtube.com/watch?v=pXpckHDDNYo&t=1s)

- 핵심 포인트
  - 애니메이션 라이브러리와 threejs는 어떻게 상호작용할 수 있는지

# 처음 배우는 것들

## gsap.timeline() 메서드

```tsx
tl.current = gsap.timeline();
```

- timeline()은 타임라인 객체를 생성한다.

### gsap.timeline().to()

```tsx
tl.current.to(
  ref.current.position,
  {
    duration: 2,
    y: -FLOOR_HEIGHT * (NB_FLOORS - 1)
  },
  0
);
```

- tl.current.to는 애니메이션을 적용하고자 하는 오브젝트의 결과가 어떻게 되었으면 좋겠다는 표현이다.
- 위에 to 함수에 들어간 params를 순서대로 말로 풀어내자면 ref.current. position객체에 `duration: 2`는 2초 동안 `y: number` y방향으로, 마지막 숫자 0은 timeline상 0의 위치에서 동작하는 것을 적용하라는 뜻이다.

### gsap.timeline().from()

```tsx
tl.current.from(atticRef.current.position, { duration: 1.5, y: 2 }, 0);
```

- atticRef.current.position 객체에 1.5동안 y방향으로 얼마만큼 timeline 0의 위치에서 시작하도록 적용해라.

## useLayoutEffect

- 그냥 말로만 들었던 훅을 처음 사용해봤다.

- 역할: useLayoutEffect는 React에서 DOM이 업데이트된 직후에 동기적으로 실행되는 훅입니다. 이 훅은 주로 레이아웃이나 크기, 위치와 같이 DOM을 조작해야 할 때 사용됩니다. useEffect와 유사하지만, 렌더링 후 브라우저가 그리기 전에 실행되기 때문에 useEffect보다 조금 더 빠르게 동작합니다. 이러한 특징 때문에 DOM 조작이나 애니메이션 초기화에 적합합니다.

- 동작 방식:
  1. 컴포넌트가 렌더링되고 DOM이 그려집니다.
  2. 그 후 useLayoutEffect의 콜백 함수가 동기적으로 실행됩니다.
  3. 이 시점에서 애니메이션을 시작하거나 DOM 조작이 가능합니다.
  4. return을 통해 정리(cleanup) 로직도 제공할 수 있습니다.

즉, 이 코드는 gsap.timeline()을 통해 타임라인을 만들고, ref.current와 같은 요소들의 애니메이션을 정의하는데, DOM이 렌더링된 이후 곧바로 실행되도록 설계된 것입니다.
[출처 : ChatGPT 4o]

# 느낀점

지금까지 구현을 하면서 회전이나 이동이 좀 복잡하다고 생각 되었다. 3D는 x,y,z를 transform하는 거라 일단 많이 만들어보고 경험치를 충분히 쌓지 않으면 구현부터 좀 난해할 것 같다.
