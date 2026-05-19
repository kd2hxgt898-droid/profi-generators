use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct QuizAnswers {
    pub object: String,
    pub load: String,
    pub gas: String,
    pub neighbours: String,
    pub placement: String,
    pub start: String,
}

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct QuizRecommendation {
    pub id: String,
    pub title: String,
    pub fuel: String,
    pub power_kw: f32,
    pub enclosure: String,
    pub start_type: String,
    pub total_price: u64,
    pub highlights: Vec<String>,
}

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct QuizResultResponse {
    pub configurations: Vec<QuizRecommendation>,
    pub note: String,
}

#[post("/quiz/recommend", format = "json", data = "<answers>")]
pub fn recommend(answers: Json<QuizAnswers>) -> Json<QuizResultResponse> {
    let answers = answers.into_inner();

    let base_power: f32 = match answers.load.as_str() {
        "minimum" => 5.0,
        "comfort" => 10.0,
        "maximum" => 16.0,
        _ => 8.0,
    };

    let fuel = match answers.gas.as_str() {
        "mainline" | "tank" => "gas",
        _ => match answers.object.as_str() {
            "industry" | "business" => "diesel",
            _ => "petrol",
        },
    };

    let enclosure = match answers.neighbours.as_str() {
        "dense" => "silent",
        "industrial" => "open",
        _ => "all-weather",
    };

    let start_type = match answers.start.as_str() {
        "auto" | "remote" => "auto",
        _ => "electric",
    };

    let multiplier = if matches!(enclosure, "silent") { 1.25 } else { 1.0 };
    let base_price = (base_power as u64) * 30_000;

    let configurations = vec![
        QuizRecommendation {
            id: "config-economy".to_string(),
            title: "Эконом-конфигурация".to_string(),
            fuel: fuel.to_string(),
            power_kw: base_power - 1.5,
            enclosure: enclosure.to_string(),
            start_type: start_type.to_string(),
            total_price: ((base_price as f32) * 0.85 * multiplier) as u64,
            highlights: vec![
                "Минимальный набор для запуска без вашего участия".into(),
                "Шумозащитный кожух".into(),
                "Гарантия 5 лет".into(),
            ],
        },
        QuizRecommendation {
            id: "config-balanced".to_string(),
            title: "Оптимальная конфигурация".to_string(),
            fuel: fuel.to_string(),
            power_kw: base_power,
            enclosure: enclosure.to_string(),
            start_type: start_type.to_string(),
            total_price: ((base_price as f32) * multiplier) as u64,
            highlights: vec![
                "Оптимальный баланс мощности и цены".into(),
                "АВР с двойной блокировкой".into(),
                "Подогрев для зимнего пуска".into(),
                "Установка за 1 день".into(),
            ],
        },
        QuizRecommendation {
            id: "config-premium".to_string(),
            title: "Премиум-конфигурация".to_string(),
            fuel: fuel.to_string(),
            power_kw: base_power + 4.0,
            enclosure: enclosure.to_string(),
            start_type: "auto".to_string(),
            total_price: ((base_price as f32) * 1.4 * multiplier) as u64,
            highlights: vec![
                "Запас по мощности 30%".into(),
                "Премиум-кожух 55 дБ".into(),
                "Расширенная гарантия 10 лет".into(),
                "Управление через мобильное приложение".into(),
            ],
        },
    ];

    let note = match answers.placement.as_str() {
        "inside" => {
            "Учли вентиляцию, отвод выхлопа и виброкомпенсаторы по СНиП".to_string()
        }
        "outside" => "Подобрали всепогодный кожух с подогревом для зимы".to_string(),
        _ => "Инженер составит детальный проект на бесплатном выезде".to_string(),
    };

    Json(QuizResultResponse {
        configurations,
        note,
    })
}
