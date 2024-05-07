---
title: Learning Go
date: 05/01/2024
description: Channels
---
I've been learning Go for the past week, mostly from the [official tour](https://go.dev/tour/welcome/1). Most of the syntax and features are similar to other languages - except for the `channel` construct which I've never seen before.\
\
A channel is means of communication between goroutines. Goroutines are similar to a lightweight version of OS threads, handled by the Go runtime.\
\
With channels, you can send and receive data between goroutines, making parallel processing easy. You can actually look at the official implementation of channels in the [go code repo](https://github.com/golang/go/blob/master/src/runtime/chan.go).\\
\
[This talk](https://www.youtube.com/watch?v=KBZlN0izeiY) also explained the working of channels in depth, the slides of which can be found [here](https://speakerdeck.com/kavya719/understanding-channels).
