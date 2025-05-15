---
layout: analysis
title: "00400000h"
description: >-
  "Shadow Watch is a turn-based, isometric game of stealth, intrigue and combat. You have been given command of a team of six highly trained operatives with orders to find out who is behind the attacks against those working on the ISS." - Red Storm Entertainment
analysis:
  name: Shadow Watch
  time: 2024-09-23 15:07:00 -0300
  type: Game
  sheet:
    - key: s_Title
      value:
        type: string
        raw: Shadow Watch
    - key: s_Devs
      value:
        type: string
        raw: Red Storm Entertainment
      note: see &#60;<a href="http://www.redstorm.com">http://www.redstorm.com</a>&#62;
    - key: e_Crm
      value:
        type: defname
        raw: GOG
    - key: s_EntryFile
      value:
        type: string
        raw: ShadowWatch.exe
      note: 8D91F16BC60A8A9DA5B3C0F7A68999EE231D6753
    - key: d_LinkTime
      value:
        type: number
        raw: 944417248
      note: at December 5, 1999 6:07:28 PM GMT
    - key: d_LinkerVersion
      value:
        type: number
        raw: "2.50"
    - key: d_TargetOs
      value:
        type: number
        raw: 4.0
      note: known as Windows 95
    - key: e_TargetArch
      value:
        type: defname
        raw: INTEL_386
    - key: e_RunTime
      value:
        type: defname
        raw: JRE
      note: version 1.1.8 (1999-04-08)
    - key: s_Engine
      value:
        type: string
        raw: York
      note: proprietary Java engine
    - key: v_Imports
      value:
        type: array
        raw:
          - KERNEL32.DLL
          - USER32.DLL
      note: from the import table of s_EntryFile, not all loaded libraries
---

### system::MinRequired()

<div class="ascii">
    CPU: Pentium 133Mhz
 Memory: 32 MB RAM required
  Video: DirectX compatible 2D video card with 2MB VRAM capable of 16bit colors
     HD: ~700 MB uncompressed space
DirectX: 6.1
</div>

### fs::DirTree()

<div class="ascii">
              ╭─ NOTE ────────────────────────────╮
              │  not all files/folders are shown  │
              ╰───────────────────────────────────╯
</div>
<div class="ascii">
root/
├── <span class="vpad">Dx.dll</span>          <span class="comment">// loaded in rse.ge.ui.RSEUIMgr.loadUIFactory()</span>
├── GameuxInstallHelper.dll
├── readme.txt
├── ShadowWatch.exe <span class="comment">// PE file, entry</span>
│   ⋮
├── sw.dat          <span class="comment">// PE file, its own JREW (1.1.8)</span>
│   ⋮
├── york.res        <span class="comment">// loaded in rse.ge.ui.VRootContainer.workLoop()</span>
├── york.rsc        <span class="comment">// JAR file, contains the game and engine</span>
├── art/
├── cfg/
├── jre/
├── save/
├── scores/
├── sound/
├── strings/
└── video/
</div>

### entry::CallStack()

<div class="ascii">
  ShadowWatch.exe
┌────────┬───────────────────────┐
│ 402b80 ┆ entry()               │
│ 401000 ┆ WinMain()             │ <span class="comment">// all params are unused</span>
│ 401580 ┆ LaunchProgram("sw")   │
│ 4015bd ┆ CreateProcessA()─ ─ ─ ┼ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│ 4015cf ┆ WaitForSingleObject() │                    ╷
└────────┴───────────────────────┘     sw.dat         ▼
                                    ┌────────┬────────────────────────┐
                                    │ 402cd0 ┆ entry()                │
                                    │ 401000 ┆ WinMain()              │
                                    │ 4010c0 ┆ main()                 │
              ┌─────────────────────┼ 401230 ┆ CallStaticVoidMethod() │
              ▼         york.rsc    └────────┴────────────────────────┘
      ┌──────────────────────────┐
      │ rse.york.YorkMain.main() │
      └──────────────────────────┘
</div>

#### Remarks:
1. In `ShadowWatch.exe`, checks for valid CD-ROM volume "SHDWWTCH" (bypassed in this version), then renames "sw.dat" into "sw.exe", calls it and when "sw.exe" returns (after it is terminated) renames it back into "sw.dat".
1. Game can be launched from the JRE (that's basically what `sw.dat` is), tested with my own built JRE (1.1.8_010), which allows for debugging with JDK-provided interface `javai_g.dll` (if linked with `javai_g.lib`).
1. Both executables' malloc/calloc use GlobalAlloc for heap allocation, it also does small block heap (sbh) allocations (but using GlobalAlloc regardless). Very early (i.e. old) Visual C++ definitions.
1. In `sw.dat`, at WinMain, user-defined (not CRT) `argv = malloc(argc*sizeof(char*))` and `cmdln = malloc(strlen(lpCmdLine))` are not free()'ed before program termination.
1. Only supports 4:3 aspect ratios [{ 640, 480 }, { 800, 600 }, { 1024, 768 }] (will be streched on widescreen since it only runs on fullscreen).
1. Documentation mentions not allowing Alt+Tab, does not seem to be the case on Windows 11 (maybe GOG fixed it?).
