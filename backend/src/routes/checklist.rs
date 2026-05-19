use rocket::serde::json::Json;
use rocket::serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct ChecklistItem {
    pub idx: u8,
    pub title: String,
    pub text: String,
}

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct ChecklistResponse {
    pub title: String,
    pub author: String,
    pub url: String,
    pub items: Vec<ChecklistItem>,
}

#[get("/checklist")]
pub fn get_checklist() -> Json<ChecklistResponse> {
    let items: Vec<ChecklistItem> = vec![
        ("Три фазы там, где они не нужны", "Перекос фаз сжигает технику — для частного дома часто лучше мощный однофазный."),
        ("Смертельная ловушка: выхлопные газы", "Только нержавеющие виброкомпенсаторы и герметичные системы газовыхлопа."),
        ("Экономия на сечении кабеля", "При пуске насоса тонкий кабель плавится. Запас сечения — от 30%."),
        ("Генератор задохнулся: нет приточки", "Без вытяжки в гараже — заглохнет за 15 минут от перегрева."),
        ("Дешёвый АВР — взрыв в щитке", "Используйте блоки с механической и электрической блокировкой."),
        ("Забытый регламент ТО", "Масло окисляется, даже когда генератор стоит. Замена раз в год обязательна."),
        ("Конфликт с соседями (шум)", "До 15 метров до забора — только премиальный шумозащитный кожух."),
    ]
    .into_iter()
    .enumerate()
    .map(|(idx, (title, text))| ChecklistItem {
        idx: (idx + 1) as u8,
        title: title.to_string(),
        text: text.to_string(),
    })
    .collect();

    Json(ChecklistResponse {
        title: "7 фатальных ошибок при выборе генератора".to_string(),
        author: "Profi Generators".to_string(),
        url: "/files/profi-checklist.pdf".to_string(),
        items,
    })
}
