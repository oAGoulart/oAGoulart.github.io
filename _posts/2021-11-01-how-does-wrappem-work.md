---
title: How does WrappEm work?
---

*(Revised on {{ "2024-02-09" |  date: '%B %d, %Y' }})*

[WrappEm] is a small tool that can generate a hooked [PE file] (either an _.exe_ or _.dll_ binary file) which will import your own custom DLL into its process. With this you can inject a payload into a process using another DLL already imported by that process.

I took inspiration to make this tool from [Michael Chourdakis]' article, but his implementation was not suited for my use case (which required it to work for both _32-_ and _64-bit_ binaries), so after some research and testing I created this tool.

The first implementation I made used the same method described in the article to create a proxy DLL, but its implemention was different so it would work with both binaries. The latest version of this tool, which is the one we will discuss today, uses a different method to modify said _PE files_ imports table to force _Windows_ to load your payload DLL into the process, making it completely unnecessary to write any proxy code.

## Modifying the Import Table

The _Import Table_ is what _Windows_ uses to load every library needed by a _PE file_ before it even calls the _entry point_, so that's where we want to focus our attention.

### Finding the Import Table

To find that, all we need to do is load the _PE file_ into memory and parse its contents following the _PE format_ specification. The position of the _Import Table_ will be defined on the second index of the _Data Directory_ member of that file's _Optional Header_, as you can see in the pseudo-code below.

 <figure>
  <img src="/assets/img/wrappem.png" alt="PE Format">
  <figcaption>
    <span>Fig. 1. Typical PE file headers. Adapted from</span>
    <a href="http://sandsprite.com/CodeStuff/Understanding_imports.html" target="_blank">here</a>.
  </figcaption>
</figure>

Because the position is a relative address we then must find the offset from the start of the file (as we loaded the binary file into a buffer), which is given by `offset = virtualAddress - section.VirtualAddress + section.PointerToRawData` where `section` is the section where the _Import Table_ is located (you must find it, see [how I did it](https://github.com/oAGoulart/wrappem/blob/6d0c7f1827c63ccea13e7c8b4140410cd1ea44b5/wrappem.cpp#L97-L109) as an example).

### Adding new entry to the Import Table

Now that we found the _Import Table_ we can create an entry for our own payload library, to do that we must append our new entry to the last section of the _PE file_ and then move the existing _Import Table_ to the end of that section as well (this is the easier way so we don't have to rebuild the entire binary image).

That last part is fairly easy and when you're done with it just patch the addresses in the `NT_HEADERS` (because we moved the _Import Table_) and export the buffer into our now hooked _PE file_.

## Conclusion

As you can see this method is a bit less messy then writing a bunch of proxy code for every exported object inside another _DLL_, the only downside is that you'll modify the original library and have to use that modified binary version for whatever application you want to inject, but if that is acceptable for your specific use case then no worries.

## Read further

1. [PE Format specification](https://docs.microsoft.com/en-us/windows/win32/debug/pe-format)
2. [Understanding the Import Address Table](http://sandsprite.com/CodeStuff/Understanding_imports.html)
3. [DJGPP COFF Spec](http://www.delorie.com/djgpp/doc/coff/)
4. [IMAGE_SECTION_HEADER (Structures)](http://pinvoke.net/default.aspx/Structures.IMAGE_SECTION_HEADER)

[WrappEm]: https://github.com/oAGoulart/wrappem
[PE file]: https://docs.microsoft.com/en-us/windows/win32/debug/pe-format
[Michael Chourdakis]: https://www.codeproject.com/articles/16541/create-your-proxy-dlls-automatically
