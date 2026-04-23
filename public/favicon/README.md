# Hanzawa-Kanji 파비콘 설치 가이드

## 📁 파일 구성

```
public/
├── favicon.svg              ← 모던 브라우저용 (벡터, 투명)
├── favicon.ico              ← 레거시 IE (16+32+48 합본, 투명)
├── favicon-16x16.png        ← 브라우저 탭 (투명)
├── favicon-32x32.png        ← 브라우저 탭 (투명)
├── favicon-48x48.png        ← 윈도우 바로가기 (투명)
├── favicon-96x96.png        ← 구글 TV / 안드로이드 (투명)
├── apple-touch-icon.png     ← iOS 홈스크린 180×180 (크림 배경*)
├── icon-192.png             ← PWA 일반 (투명)
├── icon-512.png             ← PWA 스플래시 (투명)
├── icon-maskable-192.png    ← PWA 안드로이드 적응형 (크림 배경*)
├── icon-maskable-512.png    ← PWA 안드로이드 적응형 (크림 배경*)
└── site.webmanifest         ← PWA 매니페스트
```

> **\*배경이 필수인 두 가지:**
>
> - `apple-touch-icon.png` — iOS는 투명 영역을 검은색으로 채워버립니다 (iOS 사양).
> - `icon-maskable-*.png` — 안드로이드가 사각형을 원/둥근사각으로 잘라 쓰기 때문에 safe zone(80%) 바깥은 어차피 잘려요. 배경을 깔아둬야 자연스럽게 보입니다.
>
> 나머지는 전부 투명이라 **도장이 자연스럽게 둥글게** 떠 있어요.

## 🔧 HTML 설정 (index.html)

`<head>` 안에 추가:

```html
<!-- 기본 파비콘 -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

<!-- iOS 홈스크린 -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

<!-- PWA -->
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#e2513c" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="半澤漢字" />
```

## 🎨 컬러 값

| 용도          | HEX       | 역할               |
| ------------- | --------- | ------------------ |
| 도장          | `#e2513c` | 코랄 레드          |
| 한자/링       | `#fbf5e1` | 크림 페이퍼 (역상) |
| manifest 배경 | `#f5ecd4` | 앱 메인 배경       |
