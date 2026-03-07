use futures::{Stream, StreamExt};
use std::fs;
use warp::Filter;

#[tokio::main]
async fn main() {
    // GET /
    let index = warp::get()
        .and(warp::path::end())
        .and(warp::fs::file("./index.html"));

    // POST /file
    let file = warp::post()
        .and(warp::path("file"))
        .and(warp::path::end())
        .and(warp::body::stream())
        .then(read_file);

    let routes = index.or(file);
    warp::serve(routes).run(([0, 0, 0, 0], 3000)).await;
}

async fn read_file(
    body: impl Stream<Item = Result<impl bytes::Buf, warp::Error>>,
) -> impl warp::Reply {
    let path: String = body
        .fold(String::from("./"), |mut path, buf| async move {
            let mut buf = buf.unwrap();
            while buf.has_remaining() {
                let chunk = buf.chunk();
                path += &String::from_utf8(chunk.into()).unwrap_or_default();
                buf.advance(chunk.len());
            }
            path
        })
        .await;

    fs::read_to_string(&path).unwrap_or(format!("Not Found: {}", &path).into())
}
