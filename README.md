# Профи генераторы — премиум-сайт

Премиум-сайт компании «Профи генераторы» (продажа, монтаж и обслуживание электростанций / ИБП). Реализован как монорепо: фронтенд на **React 18 + TypeScript + shadcn/ui** и API-мок на **Rust + Rocket**.

> Дизайн — dark-first, навигационный сине-чёрный + золото; интерактив «Свет ВКЛ/ВЫКЛ» в hero, бутик готовых решений, квиз с чек-листом, социальный капитал Кристовского / Uma2rman.

## Структура монорепо

```
.
├── backend/           # Rust + Rocket 0.5 (mock JSON API)
├── frontend/          # Vite + React 18 + TS strict + shadcn/ui
├── docs/              # архитектура и контент-стратегия
├── каталог/           # исходные скриншоты товаров с profi-generator.ru
├── фоновое фото/      # исходные фото для hero и коллекций
├── Бутик готовых решений.md
├── Квиз.md
├── Чек-лист.md
└── Промт для сайта генератор профи.md
```

## Быстрый старт

Требования: **Node.js ≥ 18**, **Rust ≥ 1.83**, **npm ≥ 9**.

```bash
# 1. Backend (Rocket, порт 8001; если 8000 занят другим процессом — не конфликтуем)
cd backend
cargo run

# 2. Frontend (Vite, порт 5173, прокси /api → :8001)
cd frontend
npm install
npm run dev
```

Откройте `http://localhost:5173`.

## Команды

### Frontend (`/frontend`)

| Команда             | Описание                                      |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Дев-сервер Vite (HMR)                         |
| `npm run build`     | TypeScript build + Vite production bundle     |
| `npm run preview`   | Превью прод-сборки                            |
| `npm run lint`      | ESLint (React + TS strict)                    |
| `npm run format`    | Prettier (`src/**/*.{ts,tsx,css,md}`)         |
| `npm run typecheck` | `tsc -b --noEmit`                             |
| `npm test`          | Vitest unit-тесты (исключая `e2e/`)           |
| `npm run e2e`       | Playwright E2E (квиз, тёмная/светлая темы)    |

### Backend (`/backend`)

| Команда                | Описание                                      |
| ---------------------- | --------------------------------------------- |
| `cargo run`            | Запуск Rocket (`127.0.0.1:8001` в debug)      |
| `cargo test`           | Интеграционные тесты эндпоинтов               |
| `cargo build --release`| Релиз-бинарник                                |
| `cargo clippy`         | Линтер                                        |

## Стек

**Frontend**: Vite, React 18, TypeScript (strict), shadcn/ui, Radix UI, Tailwind CSS, Framer Motion, TanStack Query, React Router v6, Zustand, react-i18next, React Hook Form + Zod, react-helmet-async, vite-plugin-pwa, Vitest, Playwright.

**Backend**: Rust 1.83+, Rocket 0.5, serde/serde_json, rocket_cors, chrono, uuid.

## Дизайн-система

- **Цвета**: navy `#0A0E14` → gold `#D4A24C` / `#F2C674` → cream `#F8F4ED`. Светлая тема — кремовый + графит + то же золото.
- **Типографика**: Manrope (UI/тело) + Cormorant Garamond (заголовки).
- **Темы**: dark / light / system; переключатель в хедере, сохраняется в `localStorage`.
- **Анимации**: Framer Motion — fade-in, parallax hero, прогресс-бары квиза, токовый поток (SVG).
- **Иконки**: lucide-react.

## Локализация

Поддерживаются **RU** (по умолчанию) и **EN**. Переключатель — в хедере. Хранение выбранного языка — `localStorage`. Источники: `frontend/src/i18n/ru.ts`, `frontend/src/i18n/en.ts`.

## Темы

Dark / Light / System через `ThemeProvider` (`frontend/src/components/theme-provider.tsx`). Тогглер — в хедере; реактивно подхватывает изменения системной темы.

## SEO и PWA

- **Meta**: react-helmet-async per-page (title, description, OG, Twitter Cards).
- **JSON-LD**: Organization, LocalBusiness, FAQPage, Review (Кристовский), Product.
- **PWA**: `vite-plugin-pwa`, `manifest.webmanifest`, иконки 192/512/maskable/apple-touch, оффлайн-shell.
- **`robots.txt`** в `frontend/public/`.

## Тесты

- **Vitest** (unit): `frontend/src/**/*.test.{ts,tsx}` — quiz-store, segment-toggle и др.
- **Playwright** (e2e): `frontend/e2e/quiz.spec.ts` — пройти квиз и получить рекомендации.
- **Cargo** (backend): `backend/tests/integration.rs` — 12 интеграционных кейсов на все эндпоинты.

## API (mock)

См. подробности в [`docs/architecture.md`](./docs/architecture.md).

| Метод | URL                       | Описание                              |
| ----- | ------------------------- | ------------------------------------- |
| GET   | `/api/health`             | health-check                          |
| GET   | `/api/products`           | список товаров (фильтр `?segment=`)   |
| GET   | `/api/products/<id>`      | товар по id                           |
| GET   | `/api/collections`        | 6 коллекций (3 home + 3 business)     |
| GET   | `/api/testimonials`       | отзывы (featured: Кристовский)        |
| GET   | `/api/faq`                | 8 FAQ-вопросов                        |
| GET   | `/api/checklist`          | 7 пунктов «фатальных ошибок»          |
| POST  | `/api/quiz/recommend`     | 3 конфигурации по ответам квиза       |
| POST  | `/api/lead`               | приём лида с формы / квиза            |

## Документация

- [`docs/architecture.md`](./docs/architecture.md) — архитектура, потоки данных, диаграмма квиза.
- [`docs/content-strategy.md`](./docs/content-strategy.md) — копирайтинг, точки социального капитала, тон-оф-войс.

## Лицензия

Проприетарный проект. © Профи генераторы, 2013–2026.
