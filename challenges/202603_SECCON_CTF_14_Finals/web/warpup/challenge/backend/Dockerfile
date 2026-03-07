FROM rust:1.93.0

WORKDIR /app
RUN cargo init
COPY ["Cargo.toml", "Cargo.lock", "./"]
RUN cargo build --release
RUN rm -f target/release/deps/warpup*

COPY index.html index.html
COPY src src
RUN cargo install --locked --path .
RUN rm -rf target

CMD ["warpup"]
