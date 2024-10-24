---
layout: ramble
date: 2024/10/03 21:10:01 +3
title: Turning Acer notebook on without power button
---

A few weeks ago I ran into a quite frustrating issue: my Acer notebook wouldn't turn on. At first I thought: maybe it is a battery issue, so I tried removing it, but it didn't work. Then, I tried removing the BIOS battery (wouldn't make sense that it was the problem, but still), and it also didn't work. But one thing that I noticed, the connected charger power LED was always blue, so I knew it was getting power and there was only one option left: the power button.

There's only two small problems (with most notebooks): (a) the power button is not a separate hardware from the keyboard itself, even using the same interface and connector; (b) the keyboard is fixed in place with plastic rivets, making it impossible to replace it without the proper tools.

I didn't have a multimeter with me and also wouldn't be able to go and use my uni's lab for a few days so I knew what had to be done: trial and error, the only tool an scientist needs (insert Willem Dafoe image). So here is how I turned my Acer notebook back on: if you remove the backplate and look for the keyboard's FFC connector (white rectangle with 28 pins) you should see two labels on the PCB (JKB1 and 28). JKB1 is the first pin and 28 is the last one. Shorting JKB1 and the pin right next to it should power the notebook on (the fan will spin up and the second LED should light up).

NOTE: all pins from the FFC connector can be shorted, but **DO NOT** short anything else in your motherboard unless you know what you are doing.

<div class="ascii">
        ┌───────┐
        │      ─┼─ JKB1 (+V pin)       ─┬──► short this two
        │      ─┼─      (power button) ─┘    pins with a small
        │      ─┼─                           flathead screwdriver
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
FFC     │      ─┼─
───►    │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─
        │      ─┼─ 28
        └───────┘
</div>