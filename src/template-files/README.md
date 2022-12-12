# ::PROJECT_NAME=my-react-extension::

A Chrome extension built using React.

## How to Build and Test

Follow the steps below to build and test your extension.

### First Time Setup

1. In the root directory, run `npm run build` to build your extension.
2. In Chrome, go to `chrome://extensions`.
3. Enable developer mode in the top right corner.
4. Click "Load unpacked" in the top left corner and select the `build` directory in the root of your project.

### Rebuilding and Reloading

Now that your extension has already been loaded into Chrome, whenever you make new changes to it, you can simply run `npm run build` again to rebuild your extension and then reload it in Chrome by clicking the circular arrow icon.

## How to Use

Once you have loaded your extension into Chrome, you can use it by navigating to any website and pressing the `::TOGGLE_EXTENSION_KEYBIND=Alt::` key. This will toggle the extension popup on and off.
