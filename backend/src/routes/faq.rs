use rocket::serde::json::Json;
use rocket::serde::Serialize;

use crate::data::{self, FaqItem};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct FaqResponse {
    pub items: Vec<FaqItem>,
}

#[get("/faq")]
pub fn list_faq() -> Json<FaqResponse> {
    Json(FaqResponse { items: data::faq() })
}
