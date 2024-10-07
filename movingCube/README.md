# Toy Project

이번 스터디에서는 토이 프로젝트를 통해서 지금까지 배운 것을 토대로 간단한 프로젝트를 진행해본다.

## 만들어보고 싶은 것

- [controls/pointerlock](https://threejs.org/examples/#misc_controls_pointerlock)
- 예제는 1인칭이지만 3인칭으로
- Threejs(vanillaJS)로 만들어보기
- [R3F](https://r3f.docs.pmnd.rs/getting-started/introduction)로 해보기

## 만들면서 배우고 싶은 것

- 마우스의 움직임에 따라 카메라 움직임을 제어하는 것
- 키보드로 카메라 움직임을 제어하는 것
- 약간의 물리적인 부분
- 간단한 월드 생성

# 만들면서 알게 된 것

## 1 주차

### 마우스의 움직임에 따라 카메라 움직임을 제어하는 것

- `OrbitControls`을 사용하면 마우스로 카메라 움직임을 제어할 수 있다.

### 약간의 물리적인 부분

`@react-three/rapier`라이브러리를 사용하면 간단하게 해결된다.

```shell
yarn add @react-three/rapier
```

-[React Three Fiber Third Person Control](https://medium.com/@m.mhde96/react-three-fiber-third-person-control-a0476c189dd1)

### 느낀점

어쨌든 threejs의 기초 지식이 굉장히 중요하고 R3F는 각 라이브러리를 통해서 선언적으로 더 편리하게 구현하는 느낌이다.

## 2주차

### 키보드 컨트롤

키보드 컨트롤이 어려울 것 같았는데 rapier에서 제공해주는
`KeyboardControls`와 `useKeyboardControls`이 있어서 아주 쉽게 구현할 수 있었다.

- [React Three Fiber Tutorial - Rapier Physics Engine](https://youtu.be/OpYtwrtpePY?si=mym-XSXZnOQi7O-t)
- [예시코드](https://github.com/wass08/r3f-physics/blob/main/src/components/Experience.jsx)

### 애니메이션

react fiber에서 `useFrame`이란 훅을 제공하는데 이 `useFrame`은 `requestAnimationFrame`처럼 매초마다 60프레임을 랜더링한다.

## 부록

**todo**

- [ ] @react-three/rapier 알아보기
- [x] light 종류 공부 안했던거 다시 공부하고 적용해보기
- [x] 키보드로 특정 사물 움직이는거 해보기
- [ ] 키보드로 사물을 움직일 때 카메라가 사물을 focus하는거 익히기
