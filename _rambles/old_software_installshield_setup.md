---
layout: ramble
date: 2024/09/26 20:39:32 -3
title: Old software InstallShield setup
---

Some software from the early-2000s are shipped and packaged with 16-bit installers from InstallShield. Those 16-bit programs cannot be run on 64-bit Windows and the alternative &lt;[winevdm](https://github.com/otya128/winevdm)&gt; (a 16-bit Windows emulator) does not always work. In my case, using the following alternative worked:

<table style="border: 1px solid;">
  <tbody>
    <tr>
      <td style="width: 25ch">
        <a href="{% link files/InstallShield3.7z %}" target="_blank">InstallShield3.7z</a> (<a href="{% link files/InstallShield3.7z.sig %}" target="_blank">SIG</a>)
        <br>┕🢒 setup32.exe (<a href="{% link files/setup32.exe.sha256 %}" target="_blank">SHA</a>)
      </td>
      <td>
        For InstallShield 3, this is the install engine that gets extracted from <code>_INST32I.EX_</code> by the 16-bit <code>setup.exe</code> (which is the launcher). Put this in the setup folder and run it instead of the <code>setup.exe</code>.<br>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        NOTE: The integrity of the executable file was <b>MANUALLY</b> verified, but is provided 'AS IS', without warranty of any kind, for archival purposes only. If you believe I missed something, please contact me as soon as possible.
      </td>
    </tr>
  </tbody>
</table>

### proven use cases

#### ** java development kit 1.1.8\_010 setup

ISSUE:

The version &lt;[1.1.8\_010](https://www.oracle.com/java/technologies/java-archive-downloads-javase11-downloads.html)&gt; (win/i586) of the JDK comes packaged with the 16-bit InstallShield launcher. Using winevdm did not work.

SOLUTION:
1. after running `jdk-1_1_8_010-windows-i586.exe` wait for the error popup window (**DO NOT** press _OK_)
1. open the temporary folder shown in the message (should be at ~/AppData/Local/Temp/{the temp. folder})
1. copy all files to another folder, preferably at user home (~/jdk118setup)
1. close the popup window
1. extract `InstallShield3.7z` at the new folder (~/jdk118setup) and run `setup32.exe`

NOTES:

Do not run `setup32.exe` in compatibility mode **UNLESS** the setup screen doesn't show up. Before running it again **MAKE SURE** the process is terminated (you might need to use the task manager's details tab). If you have winevdm installed you might need to uninstall **IF** it tries to start an emulation.
