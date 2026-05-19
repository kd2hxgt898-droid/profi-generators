use serde::{Deserialize, Serialize};

const PRODUCTS_JSON: &str = include_str!("products.json");
const COLLECTIONS_JSON: &str = include_str!("collections.json");
const TESTIMONIALS_JSON: &str = include_str!("testimonials.json");
const FAQ_JSON: &str = include_str!("faq.json");

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum FuelType {
    Petrol,
    Diesel,
    Gas,
    Turnkey,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Segment {
    Home,
    Business,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum CollectionId {
    Country,
    Comfort,
    Fortress,
    Retail,
    Production,
    Datacenter,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Product {
    pub id: String,
    pub name: String,
    pub brand: String,
    pub fuel: FuelType,
    pub collection: CollectionId,
    pub segment: Segment,
    pub price: u64,
    pub power_kw: f32,
    pub phases: u8,
    pub silence_level: u8,
    pub badges: Vec<String>,
    pub coverage: Vec<String>,
    pub image: String,
    pub short_description: String,
    pub highlights: Vec<String>,
    pub start_type: String,
    pub enclosure: String,
    pub warranty_years: u8,
    /// Расширенный лендинг (опционально), прокидывается на фронт как JSON.
    #[serde(default)]
    pub landing: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Collection {
    pub id: CollectionId,
    pub segment: Segment,
    pub background: String,
    pub badge: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Testimonial {
    pub id: String,
    pub name: String,
    pub role: String,
    pub rating: u8,
    pub date: String,
    pub short: String,
    pub text: String,
    pub audio_url: String,
    pub featured: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FaqItem {
    pub id: String,
    pub question: String,
    pub answer: String,
}

pub fn products() -> Vec<Product> {
    serde_json::from_str(PRODUCTS_JSON).expect("products.json must be valid")
}

pub fn collections() -> Vec<Collection> {
    serde_json::from_str(COLLECTIONS_JSON).expect("collections.json must be valid")
}

pub fn testimonials() -> Vec<Testimonial> {
    serde_json::from_str(TESTIMONIALS_JSON).expect("testimonials.json must be valid")
}

pub fn faq() -> Vec<FaqItem> {
    serde_json::from_str(FAQ_JSON).expect("faq.json must be valid")
}
