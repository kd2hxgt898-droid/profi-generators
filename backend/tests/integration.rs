use rocket::http::{ContentType, Status};
use rocket::local::blocking::Client;

fn build_client() -> Client {
    let rocket = rocket::build()
        .attach(profi_generators_backend::cors::make_cors())
        .mount(
            "/api",
            rocket::routes![
                profi_generators_backend::routes::health::health,
                profi_generators_backend::routes::products::list_products,
                profi_generators_backend::routes::products::get_product,
                profi_generators_backend::routes::collections::list_collections,
                profi_generators_backend::routes::testimonials::list_testimonials,
                profi_generators_backend::routes::faq::list_faq,
                profi_generators_backend::routes::quiz::recommend,
                profi_generators_backend::routes::lead::submit_lead,
                profi_generators_backend::routes::checklist::get_checklist,
            ],
        );

    Client::tracked(rocket).expect("valid rocket instance")
}

#[test]
fn health_endpoint_returns_ok() {
    let client = build_client();
    let response = client.get("/api/health").dispatch();
    assert_eq!(response.status(), Status::Ok);
    let body = response.into_string().unwrap();
    assert!(body.contains("ok"));
}

#[test]
fn products_endpoint_lists_at_least_15() {
    let client = build_client();
    let response = client.get("/api/products").dispatch();
    assert_eq!(response.status(), Status::Ok);
    let body = response.into_string().unwrap();
    assert!(body.contains("\"total\""));
    assert!(body.contains("Zongshen"));
}

#[test]
fn products_endpoint_filters_by_segment() {
    let client = build_client();
    let response = client.get("/api/products?segment=business").dispatch();
    assert_eq!(response.status(), Status::Ok);
    let body = response.into_string().unwrap();
    assert!(body.contains("Profi Retail Gas"));
}

#[test]
fn product_by_id_returns_expected() {
    let client = build_client();
    let response = client.get("/api/products/zongshen-bqh-2800").dispatch();
    assert_eq!(response.status(), Status::Ok);
    let body = response.into_string().unwrap();
    assert!(body.contains("BQH 2800"));
}

#[test]
fn product_by_id_returns_404_for_unknown() {
    let client = build_client();
    let response = client.get("/api/products/no-such-product").dispatch();
    assert_eq!(response.status(), Status::NotFound);
}

#[test]
fn collections_endpoint_returns_six() {
    let client = build_client();
    let response = client.get("/api/collections").dispatch();
    assert_eq!(response.status(), Status::Ok);
    let body = response.into_string().unwrap();
    assert!(body.contains("country"));
    assert!(body.contains("datacenter"));
}

#[test]
fn testimonials_feature_kristovsky() {
    let client = build_client();
    let response = client.get("/api/testimonials").dispatch();
    let body = response.into_string().unwrap();
    assert!(body.contains("Крестовский"));
    assert!(body.contains("Uma2rman"));
}

#[test]
fn faq_returns_eight_items() {
    let client = build_client();
    let response = client.get("/api/faq").dispatch();
    assert_eq!(response.status(), Status::Ok);
    let body = response.into_string().unwrap();
    assert!(body.contains("гипермаркете"));
}

#[test]
fn quiz_recommend_returns_three_configs() {
    let client = build_client();
    let body = serde_json::json!({
        "object": "home",
        "load": "comfort",
        "gas": "mainline",
        "neighbours": "dense",
        "placement": "outside",
        "start": "auto"
    })
    .to_string();
    let response = client
        .post("/api/quiz/recommend")
        .header(ContentType::JSON)
        .body(body)
        .dispatch();
    assert_eq!(response.status(), Status::Ok);
    let text = response.into_string().unwrap();
    assert!(text.contains("config-economy"));
    assert!(text.contains("config-balanced"));
    assert!(text.contains("config-premium"));
}

#[test]
fn lead_requires_consent() {
    let client = build_client();
    let body = serde_json::json!({
        "name": "Иван",
        "phone": "+7 977 305 99 39",
        "source": "quiz",
        "consent": false
    })
    .to_string();
    let response = client
        .post("/api/lead")
        .header(ContentType::JSON)
        .body(body)
        .dispatch();
    assert_eq!(response.status(), Status::BadRequest);
}

#[test]
fn lead_accepts_valid() {
    let client = build_client();
    let body = serde_json::json!({
        "name": "Иван",
        "phone": "+7 977 305 99 39",
        "source": "quiz",
        "consent": true
    })
    .to_string();
    let response = client
        .post("/api/lead")
        .header(ContentType::JSON)
        .body(body)
        .dispatch();
    assert_eq!(response.status(), Status::Ok);
    let text = response.into_string().unwrap();
    assert!(text.contains("accepted"));
}

#[test]
fn checklist_returns_seven_items() {
    let client = build_client();
    let response = client.get("/api/checklist").dispatch();
    assert_eq!(response.status(), Status::Ok);
    let body = response.into_string().unwrap();
    assert!(body.contains("Три фазы"));
    assert!(body.contains("Конфликт с соседями"));
}
