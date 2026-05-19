use rocket::serde::json::Json;
use rocket::serde::Serialize;

use crate::data::{self, Collection};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct CollectionListResponse {
    pub items: Vec<Collection>,
}

#[get("/collections?<segment>")]
pub fn list_collections(segment: Option<&str>) -> Json<CollectionListResponse> {
    let mut items = data::collections();
    if let Some(segment) = segment {
        items.retain(|collection| {
            matches!(
                (&collection.segment, segment),
                (data::Segment::Home, "home") | (data::Segment::Business, "business")
            )
        });
    }
    Json(CollectionListResponse { items })
}
