use chrono::Utc;
use rocket::http::Status;
use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct LeadInput {
    pub name: String,
    pub phone: String,
    pub source: String,
    #[serde(default)]
    pub comment: Option<String>,
    pub consent: bool,
}

#[derive(Debug, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct LeadResponse {
    pub id: String,
    pub status: String,
    pub created_at: String,
}

#[post("/lead", format = "json", data = "<lead>")]
pub fn submit_lead(lead: Json<LeadInput>) -> Result<Json<LeadResponse>, Status> {
    let lead = lead.into_inner();

    if !lead.consent {
        return Err(Status::BadRequest);
    }
    if lead.name.trim().len() < 2 {
        return Err(Status::UnprocessableEntity);
    }
    if lead.phone.chars().filter(|c| c.is_ascii_digit()).count() < 10 {
        return Err(Status::UnprocessableEntity);
    }

    let response = LeadResponse {
        id: Uuid::new_v4().to_string(),
        status: "accepted".to_string(),
        created_at: Utc::now().to_rfc3339(),
    };

    Ok(Json(response))
}
