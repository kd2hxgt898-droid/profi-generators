use rocket::serde::json::Json;
use rocket::serde::Serialize;
use rocket::http::Status;

use crate::data::{self, Product};

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct ProductListResponse {
    pub items: Vec<Product>,
    pub total: usize,
}

#[get("/products?<segment>&<collection>&<fuel>")]
pub fn list_products(
    segment: Option<&str>,
    collection: Option<&str>,
    fuel: Option<&str>,
) -> Json<ProductListResponse> {
    let mut items = data::products();

    if let Some(segment) = segment {
        items.retain(|product| {
            matches!(
                (&product.segment, segment),
                (data::Segment::Home, "home") | (data::Segment::Business, "business"),
            )
        });
    }

    if let Some(collection) = collection {
        items.retain(|product| {
            matches!(
                (&product.collection, collection),
                (data::CollectionId::Country, "country")
                    | (data::CollectionId::Comfort, "comfort")
                    | (data::CollectionId::Fortress, "fortress")
                    | (data::CollectionId::Retail, "retail")
                    | (data::CollectionId::Production, "production")
                    | (data::CollectionId::Datacenter, "datacenter")
            )
        });
    }

    if let Some(fuel) = fuel {
        items.retain(|product| {
            matches!(
                (&product.fuel, fuel),
                (data::FuelType::Petrol, "petrol")
                    | (data::FuelType::Diesel, "diesel")
                    | (data::FuelType::Gas, "gas")
                    | (data::FuelType::Turnkey, "turnkey")
            )
        });
    }

    let total = items.len();
    Json(ProductListResponse { items, total })
}

#[get("/products/<id>")]
pub fn get_product(id: &str) -> Result<Json<Product>, Status> {
    data::products()
        .into_iter()
        .find(|product| product.id == id)
        .map(Json)
        .ok_or(Status::NotFound)
}
