# Backend — Профи генераторы

Mock API на Rust 1.83+ и Rocket 0.5. Источник данных — JSON в `src/data/`. Без БД, всё в памяти.

## Запуск

```bash
cargo run            # http://127.0.0.1:8001 (debug см. Rocket.toml)
cargo build --release
cargo test           # 12 интеграционных кейсов
cargo clippy
```

Конфиг — `Rocket.toml` (default + release профили: address, port, log level).

## Архитектура

```
src/
├── main.rs       # rocket::build, mount routes, catcher 404
├── lib.rs        # экспорт модулей для интеграционных тестов
├── cors.rs       # rocket_cors::CorsOptions
├── data/
│   ├── mod.rs    # лoad_* функции, структуры (Product, Collection, Testimonial, FaqItem)
│   ├── products.json
│   ├── collections.json
│   ├── testimonials.json
│   └── faq.json
└── routes/
    ├── mod.rs
    ├── health.rs
    ├── products.rs       # GET /api/products[?segment=home|business], GET /api/products/<id>
    ├── collections.rs    # GET /api/collections
    ├── testimonials.rs   # GET /api/testimonials
    ├── faq.rs            # GET /api/faq
    ├── checklist.rs      # GET /api/checklist
    ├── quiz.rs           # POST /api/quiz/recommend
    └── lead.rs           # POST /api/lead

tests/
└── integration.rs        # rocket::local::blocking, проверка всех эндпоинтов
```

## Эндпоинты

| Метод | URL                       | Тело                                    | Ответ                            |
| ----- | ------------------------- | --------------------------------------- | -------------------------------- |
| GET   | `/api/health`             | —                                       | `{ "status": "ok" }`             |
| GET   | `/api/products`           | query: `?segment=home\|business`        | `Product[]`                      |
| GET   | `/api/products/<id>`      | —                                       | `Product` или `404`              |
| GET   | `/api/collections`        | —                                       | `Collection[]` (3 home + 3 biz)  |
| GET   | `/api/testimonials`       | —                                       | `Testimonial[]` (featured)       |
| GET   | `/api/faq`                | —                                       | `FaqItem[]` (8 шт.)              |
| GET   | `/api/checklist`          | —                                       | 7 пунктов                        |
| POST  | `/api/quiz/recommend`     | `QuizAnswers` JSON                      | 3 конфигурации                   |
| POST  | `/api/lead`               | `LeadInput` JSON (consent обязателен)   | `LeadResponse` или 400           |

## CORS

`rocket_cors::CorsOptions` — `Allow-Origin: *` (для dev), методы `GET, POST, OPTIONS`, заголовки `Content-Type, Accept`. Для прода — заменить на whitelist домена.

## Тесты

12 кейсов в `tests/integration.rs` через `rocket::local::blocking::Client`:

- health, faq, testimonials (featured Кристовский), checklist (7 пунктов)
- products: фильтр по сегменту, валидный id, 404 для неизвестного
- collections: 6 коллекций
- quiz: 3 конфигурации в ответе
- lead: валидные данные, требование `consent: true`

```bash
cargo test
# running 12 tests ... test result: ok. 12 passed; 0 failed
```

## Конфигурация Cargo.toml

Бинарник + библиотека (`lib` + `bin`) — нужно для интеграционных тестов, чтобы они могли импортировать модули.
