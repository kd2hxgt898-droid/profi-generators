use rocket::serde::json::Json;
use rocket::serde::Serialize;

use crate::data::{self, Testimonial};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct TestimonialsResponse {
    pub items: Vec<Testimonial>,
}

#[get("/testimonials")]
pub fn list_testimonials() -> Json<TestimonialsResponse> {
    Json(TestimonialsResponse {
        items: data::testimonials(),
    })
}
