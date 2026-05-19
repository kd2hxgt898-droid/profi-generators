# Frontend — Профи генераторы

Премиум SPA на Vite + React 18 + TypeScript (strict) с shadcn/ui, Tailwind, Framer Motion и PWA.

## Установка

```bash
npm install
npm run dev    # http://localhost:5173 (прокси /api → http://127.0.0.1:8001)
```

## Скрипты

| Скрипт              | Назначение                                    |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Дев-сервер с HMR                              |
| `npm run build`     | TypeScript-билд + production bundle           |
| `npm run preview`   | Превью прод-сборки на 4173                    |
| `npm run lint`      | ESLint (`--max-warnings=0`)                   |
| `npm run format`    | Prettier                                      |
| `npm run typecheck` | `tsc -b --noEmit`                             |
| `npm test`          | Vitest unit-тесты                             |
| `npm run test:watch`| Vitest watch                                  |
| `npm run e2e`       | Playwright E2E                                |

## Структура

```
src/
├── api/              # apiGet/apiPost, ApiError, TanStack Query hooks, mock-fallback
├── components/
│   ├── layout/       # Header, Footer, AppLayout
│   ├── seo/          # Meta + JSON-LD
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── language-switcher.tsx
│   └── ui/           # shadcn/ui (button, card, input, dialog, …)
├── features/
│   ├── hero/         # интерактив свет ВКЛ/ВЫКЛ + тумблер резерва
│   ├── boutique/     # сегмент-тоггл, коллекции, карточки, silence-meter
│   ├── quiz/         # 6 вопросов, zustand-store, decibel-scale, result
│   ├── checklist/    # превью «7 фатальных ошибок»
│   ├── testimonials/ # featured Кристовский + аудио-мок
│   ├── lead/         # форма заявки (RHF + Zod)
│   ├── social-proof/ # ribbon Uma2rman
│   └── usp/          # USP grid
├── i18n/             # ru.ts, en.ts, index.ts
├── lib/              # constants, utils
├── pages/            # Home, Boutique, Quiz, Services, About, Faq, Contacts, Privacy, NotFound
├── styles/           # theme.css (CSS-переменные, утилиты)
├── test/             # vitest setup
├── types/            # api.ts (Product, Testimonial, …)
├── App.tsx
└── main.tsx
```

## Строгий TypeScript

`tsconfig.json` — `strict: true`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`. Все API-типы — в `src/types/api.ts`. Внешние данные парсятся через `zod` либо приводятся к типу через явный `as`.

## Темы

`ThemeProvider` (`src/components/theme-provider.tsx`) — `dark` / `light` / `system`. Переменные — в `src/styles/theme.css` через CSS custom properties (HSL).

## i18n

`react-i18next` + `i18next-browser-languagedetector`, RU/EN, lazy-load удалён в пользу синхронных модулей (~12 KB). Ключи — типизированные через `Translations`.

## Тесты

- **Unit (Vitest)**: `src/**/*.test.{ts,tsx}`. Конфиг — `vitest.config.ts` (jsdom, setup-mocks для `IntersectionObserver`/`matchMedia`).
- **E2E (Playwright)**: `e2e/*.spec.ts`. Конфиг — `playwright.config.ts`. Дев-сервер запускается автоматически (`webServer`).

## PWA

`vite-plugin-pwa` подключён в `vite.config.ts`. Манифест и иконки — в `public/`:

```
public/
├── icons/icon-192.png
├── icons/icon-512.png
├── icons/icon-maskable-512.png
├── icons/apple-touch-icon.png
├── favicon.svg
├── robots.txt
└── files/profi-checklist.txt    # PDF-мок чек-листа
```

## API-клиент

```ts
import { apiGet, apiPost, ApiError } from "@/api/client";
const products = await apiGet<Product[]>("/api/products?segment=home");
```

Все хуки вокруг — `useProducts`, `useCollections`, `useTestimonials`, `useFaq`, `useQuizRecommend`, `useSubmitLead` (см. `src/api/hooks.ts`). Если бэкенд недоступен — фолбэк на `src/api/mock.ts`.
