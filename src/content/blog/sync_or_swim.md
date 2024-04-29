---
title: "Sync or Swim"
date: "12/28/2023"
description: "Demystifying concurrency in Rust"
---

In programming, whenever we want to speed up things, there are a bunch of techniques we can use. However, there is a whole
bunch of terminlogy associated, and it drives me crazy remebering their nuances.

<br />
So here's a blog post, mostly to remind myself.

## Firstly, a few definitions

#### Concurrency

When multiple tasks are happening _around_ the same time. For example, loading multiple tabs in your web browser.

#### Parallelism

When a single task is done by multiple actors - which are usually CPU cores. For example, if you have to compute the sum of two numbers 1000 times, doing it 500 times on 1 core, and 500 times on another would be parallelism.

#### Thread

In simple terms, a thread is a piece of executing context. In practical terms, when you run a piece of code, it loads all the necessary data into a thread (usually a single 1) and executes it. You also have a separate thread for web-browsing. You can switch between these threads as you like.

#### Multithreading

Multiple threads within the same process. A code and web browser are on different threads, but they are not multi-threaded, because they are not of the same process.

#### Synchronous vs Asynchronous programming

These are programming models. I.e, instructing how the code is to be executed. Synchronous programming means the code runs in the order in which it is stated. In async programming, the code is written and executed concurrently. If you run an async program on multiple threads, you acheive parallelism.

### Examples

Okay, lets write some code. The example I'm going to is simple - do `3 + 4`, 1,000,000 times.

### Single Threaded, Synchronous

This is the simplest form. We just add numbers in one thread, one by one. No concurrency, No parallelism.

```rust
    use std::time::Instant;
    use sync_or_swim::add;

    fn runner() {
        for _ in 0..1_000_000 {
            let _ = add(3, 5);
        }
    }
    fn main() {
        let now = Instant::now();

        runner();
        let elapsed = now.elapsed();
        println!("Took: {:.2?}", elapsed);
    }
```

For loop, run add a million times, and calculate duration. This takes about 4-8ms.

### Single Threaded - Asynchronous

```rust
    use futures::{executor::block_on, future::join_all};
    use std::time::Instant;
    use sync_or_swim::add_async;

    async fn runner() {
        let mut fnc_values = vec![];
        for _ in 0..1_000_000 {
            fnc_values.push(add_async(3, 5));
        }
        let _ = join_all(fnc_values).await;
    }
    fn main() {
        let now = Instant::now();

        block_on(runner());
        let elapsed = now.elapsed();
        println!("Took: {:.2?}", elapsed);
    }
```

Instead of adding one-by-one, add asynchronously.

- Firstly, we create a modified version of `add`, `add_async`, which is just the former with an `async` tag. We also make the runner async.
- Now, in the runner, store all the `Futures` (result of an async operation, like a `Promise`) in a vector. Calling `join_all` on the vector is akin to calling `await` on all of the futures at once.
- `block_on` blocks the caller until the provided future (`runner` in this case), has run to completion.

Running this takes around 550-600ms.

### Multi Threaded - Synchronous

Okay, what if we split the 1M adds into multiple threads? The adds are still executed one by one.

```rust
    use std::{thread, time::Instant};

    use sync_or_swim::add;

    const TOTAL_TASKS: i32 = 1_000_000;
    const NUM_THREADS: i32 = 4;

    fn runner(num: i32) {
        for _ in 0..num {
            add(3, 5);
        }
    }
    fn main() {
        let now = Instant::now();
        let mut handles = Vec::new();
        let tasks_per_thread: i32 = TOTAL_TASKS / NUM_THREADS;
        for _ in 0..NUM_THREADS {
            handles.push(thread::spawn(move || {
                runner(tasks_per_thread);
            }))
        }
        for handle in handles {
            handle.join().unwrap();
        }
        let elapsed = now.elapsed();
        println!("Took: {:.2?}", elapsed);
    }
```

- Split the addition into 4 threads. This means each thread will add 250_000 times.
- Create a new thread using the thread::spawn syntax. Use the `move` keyword to force the closure to take ownership of the `tasks_per_thread` variable.
- Modify the `runner` to take in an argument to specify the number of `add`s.

Running this takes around 1-1.5ms. 4x faster than the single threaded code, using 4 threads.

### Multi Threaded - Asynchronous

Now, not only do we create multiple threads, but we also make the `add`s async.

```rust
    use std::{thread, time::Instant};

    use futures::{executor::block_on, future::join_all};
    use sync_or_swim::add_async;

    const TOTAL_TASKS: i32 = 1_000_000;
    const NUM_THREADS: i32 = 4;

    async fn runner(num: i32) {
        let mut fnc_values = vec![];
        for _ in 0..num {
            fnc_values.push(add_async(3, 5));
        }

        let _ = join_all(fnc_values).await;
    }
    fn main() {
        let now = Instant::now();
        let mut handles = Vec::new();
        let tasks_per_thread: i32 = TOTAL_TASKS / NUM_THREADS;
        for _ in 0..NUM_THREADS {
            handles.push(thread::spawn(move || {
                block_on(runner(tasks_per_thread));
            }))
        }
        let elapsed = now.elapsed();
        println!("Took: {:.2?}", elapsed);
    }
```

The difference here is that each thread is blocked until `runner` runs to completion. This runs in ~160ms.

### A note on performance

Asynchronous usage does more harm than good here.

<br />
Adding numbers is not I/O bound. I/O bound operations tend to take longer, making context switching useful. Scraping data from multiple websites is a good candidate.

If you keep switching between tasks that do not take as long, then asynchronous usage just adds extra overhead.
