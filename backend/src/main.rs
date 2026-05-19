use profi_generators_backend::{cors, routes};
use rocket::serde::json::Value;
use rocket::{Build, Rocket};
use rocket::{catch, catchers, launch, routes};

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
        .attach(cors::make_cors())
        .mount(
            "/api",
            routes![
                routes::health::health,
                routes::products::list_products,
                routes::products::get_product,
                routes::collections::list_collections,
                routes::testimonials::list_testimonials,
                routes::faq::list_faq,
                routes::quiz::recommend,
                routes::lead::submit_lead,
                routes::checklist::get_checklist,
            ],
        )
        .register("/", catchers![not_found])
}

#[catch(404)]
fn not_found() -> Value {
    rocket::serde::json::json!({ "status": "error", "code": 404 })
}
