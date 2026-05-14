# 프로젝트: 청기백기 색깔 테스트

## 기술 스택
- Granite 기반 React Native (앱인토스 미니앱)
- TypeScript strict mode
- React Native StyleSheet (스타일링)
- 파일 기반 라우팅 (`pages/` 디렉토리)

## 아키텍처 규칙
- CRITICAL: 페이지는 `pages/` 폴더에, `createRoute(path, options)` + `export const Route` 패턴으로 작성
- CRITICAL: 라우트 타입은 `src/router.gen.ts`에서 `RegisterScreenInput` / `RegisterScreen` 인터페이스로 선언
- CRITICAL: TestScreen 진행 중에는 광고 표시 금지
- 컴포넌트는 `src/components/`, 훅은 `src/hooks/`, 타입은 `src/types/`, 유틸은 `src/utils/`
- 색상 상수는 `src/constants/colors.ts`에서 관리 (COLOR_HEX, COLOR_LABELS, COLOR_TEXT)
- `@apps-in-toss/framework` 미설치 시 BannerAdSlot은 플레이스홀더로 동작

## 화면 구조
- `/` - HomeScreen: 규칙 설명 + 예시 + 시작하기
- `/test` - TestScreen: 30초 타이머 + 색상 문제 + 4개 선택 버튼
- `/result` - ResultScreen: 등급/점수/정답률 + 다시 하기/상세 분석/공유
- `/detail-result` - DetailResultScreen: 보상형 광고 후 상세 분석

## 네비게이션 패턴
- TestScreen → ResultScreen: `navigation.replace('/result', { result })`
- ResultScreen "다시 하기": `navigation.replace('/test')`
- ResultScreen → DetailResultScreen: `navigation.navigate('/detail-result', { result })`
- DetailResultScreen "다시 하기": `navigation.navigate('/')` (홈으로)

## 개발 프로세스
- 커밋 메시지는 conventional commits 형식을 따를 것 (feat:, fix:, docs:, refactor:)

## 명령어
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
npm run test     # 테스트
npm run typecheck # TypeScript 타입 체크
