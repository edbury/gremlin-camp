---
{"aliases":["SPSS and Sonoma","SPSS Sonoma Fix"],"date-created":"2023-10-25T17:36","date-modified":"2023-10-25T18:31","dg-publish":true,"tags":["gspp"],"title":"SPSS and Sonoma","permalink":"/spaces/school/support-notes/spss-sonoma-fix/","dgPassFrontmatter":true}
---


# SPSS and Sonoma

Currently, the official SPSS releases don't support macOS Sonoma (14.0). Here's a quick guide to getting yourself up and running again if SPSS fails to start after updating your OS.

If you'd like to tackle this on your own by setting up an IBM account, you can find the official resources [on the IBM site](https://www.ibm.com/mysupport/s/defect/aCI3p0000004Khs/dt243265).

## The Fix

> Note: these instructions are for SPSS 29.0, 29.0.1, and 29.0.1.1. If you have an older version, you'll need to check the link above for the appropriate resources.

### Download the patch

First, You'll need to grab a copy of the of the patched file. If you have an IBM account, you can follow the link above. To make it simple, I'm also hosting a copy of the exact same file on Dropbox—you can grab it [here](https://www.ibm.com/mysupport/s/defect/aCI3p0000004Khs/dt243265?language=en_US).

After downloading the patch, unzip it. This should give you a directory called `29.0.1.1-IM-S29STATC-MAC-IF001` with two files inside: `Readme_29.0.1.1-1.txt` and `libplatdep.dylib`. 

Keep this window open, so you can easily grab the file in our next step.

### Copy the file

Now that you have the patched file, we'll need to copy it over to SPSS. Before we get started, make sure that you've quit SPSS.

All clear? Great.

Open up the application Terminal. You'll see something like this:

![](https://i.imgur.com/sXcwBQ7.png)

From here, you're going to input the command: `cd "/Applications/IBM SPSS Statistics/SPSS Statistics.app/Contents/lib/"`. You can either type that our or copy it from here. Then hit <kbd>Enter</kbd>.

You are now in the "lib" directory, and your screen should look like this:

![](https://i.imgur.com/i4Fj3DR.png)

Type `open .` and hit <kbd>Enter</kbd>. This will open up the directory above in Finder to make things easier to work with. Once that opens, you can quit Terminal; we're all done in there.

At this point, you should have your SPSS "lib" directory and the patch file directory both open in separate Finder windows:

![](https://i.imgur.com/h0qd8HS.png)

Finally, drag the `libplatdep.dylib` from the patch directory over to your "lib" directory. You'll get a warning that looks like this:

![](https://i.imgur.com/tUiF3HU.png)

Hit "Replace" to overwrite the outdated file with the one that works on Sonoma. 

### Celebrate

Congrats! You're done. SPSS should now open as normal on macOS Sonoma.
