---
layout: ramble
date: 2025/03/02 13:45:00 -3
title: Injecting payloads in DLLs
---

REMOVED being rewritten.

---
**Read further**

1. [PE Format specification](https://docs.microsoft.com/en-us/windows/win32/debug/pe-format)
2. [Understanding the Import Address Table](http://sandsprite.com/CodeStuff/Understanding_imports.html)
3. [DJGPP COFF Spec](http://www.delorie.com/djgpp/doc/coff/)
4. [IMAGE_SECTION_HEADER (Structures)](http://pinvoke.net/default.aspx/Structures.IMAGE_SECTION_HEADER)

---
_This post was originally titled: "How does WrappEm work?"_<br>
_Posted in 2021. Modified in 2024, 2025._

[WrappEm]: https://github.com/oAGoulart/wrappem
[PE file]: https://docs.microsoft.com/en-us/windows/win32/debug/pe-format
[Michael Chourdakis]: https://www.codeproject.com/articles/16541/create-your-proxy-dlls-automatically