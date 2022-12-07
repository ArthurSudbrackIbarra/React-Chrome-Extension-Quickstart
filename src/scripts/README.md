# Scripts Directory

This directory contains the `content.ts` file, which is responsible for injecting the React app into the page and for listening and responding to messages from it. The content script has direct access to the DOM of the page it is injected into, and can therefore interact with it.

## What to Change Here?

The only thing you need to change in `content.ts` is the message handling logic. You should respond the messages you receive from the React app with the appropriate data. There is a comment in the file that explains where and how to do this.
