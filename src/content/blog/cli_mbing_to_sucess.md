---
title: CLI-mbing to sucess
date: 01/14/2024
description: Building CLI apps in rust
---

# Introduction

I've been wanting to build a real world application in Rust, and a simple CLI tool came to mind. To make it fun, I settled on a MyAnimeList client.

My goal was the following

- Understand how to create CLI apps
- The details about publishing a cargo crate
- And everything else in between

You can find my project, [mal-cli](https://github.com/rkaahean/mal-cli). I found a few takeaways while doing this.

## Parsing CLI arguments in Rust

The first step is parsing the CLI arguments. Rust has a handy little library, `clap`.
You can define the CLI arguments as a `struct`, for example -

```rust
#[derive(Parser, Debug)]
struct Args {
	#[clap(subcommand)]
	command: Commands,
}

#[derive(Subcommand, Debug)]
enum Commands {
	List {
		// Numer of anime to show in list
		num: Option<i32>,
	},
	Season {
		// Get seasonal anime
		#[clap(long)]
		season: Option<String>,
		#[clap(long)]
		year: Option<i32>,
	},
}
```

`Args` defines the structure of our CLI commands. Here, we have a single entry, `command`, which in turn will contain different subcommands.

\
 `#[clap(subcommand)]` tells the parser that the enum contains the various subcommands. Without it, `clap` would not know how to parse the CLI. Similar case for `#[derive(SubCommand)]`. Here's an image of the compiler error without the macros.

\
![Image](/src/content/blog/images/1.png)

\
The subcommands are defined as enums, which themselves contains additional parameters. For example

```bash
mal-cli list 10
```

lists the 10 anime in your list. Note that you do not need to provide the `num` argument name.

\
`num` is also an `Optional<i32>` type. So providing it is not necessary.
If you wanted to explicitly state the argument name, that's where `#[clap(long)]` macro comes in.

```bash
mal-cli season --season=fall --year=2023
```

You can use `#[clap(short)]` if you wanted to do `-s` as a shorthand instead.

## Handling data sources

Handling JSON data was a bit tricky. In Python, using the `request` library, you can simply do a `response.json()` to load JSON.

\
That's easy to do when you don't have to worry about types! In Rust, for JSON deserialization, we have the `serde_json` crate. It handles JSON by returning a `Value` object.

This object could by of a variety of types! A `String`, `Array`, `Bool`, `Number` (& more). The idea is that you need to explicitly handle parsing a JSON attribute.

\
For example, if the returned value is

```json
{
  "node": 10
}
```

Then we would handle it like so -

```rust
let object = serde_json::from_str(json_text);
let node_value = object.get("node").unwrap().as_i64().unwrap();
```

\
That's a lot of `unwraps()`! And things get messy with more complex and nested JSONs. Thankfully, there's a way to provide a struct and get it automatically deserialized with the `#[derive(Deserialize)]` trait.

```rust
#[derive(Deserialize)]
pub struct AnimeList {
	id: i64,
	title: String,
	status: String,
	finish_date: String,
}

// json_text needs to be in the same format as the struct.
let anime_list: AnimeList = serde_json::from_str(json_text);
```

It generates the types at compile time and compares it against the JSON you are trying to parse.

## Interactive outputs

Finally, to make the CLI more interesting to use, I opted for the `inquire` crate. It provides a minimal interactive UI to the user, with the ability to choose options, enter dates and ask questions.

Under the hood, it (kinda) uses [crossterm](https://github.com/crossterm-rs/crossterm), with which you can manipulate the CLI to your hearts content. Think background color, cursor position.

## The other stuff

I also published the `mal-cli` as a [cargo](https://crates.io/crates/mal-cli) crate. This was really easy to do

```bash
cargo publish
```

I had to deal with `OAuth` in getting an `access_token` so that I can use the API. I might write about this later, but you can create your own mini local server with the `tiny_http` crate, and parse incoming requests

```rust
let server = Server::http("127.0.0.1:8080").unwrap();
for rq in server.incoming_requests() {

}
```

You can also set environment variables using the `std::env` import. But this only sets the variable value for the lifetime of the program, so you might need other way to cache data.
