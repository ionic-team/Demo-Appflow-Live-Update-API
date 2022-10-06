# Demo App: Live Update API

This app demonstrates some of the basic methods provided through the [Live Update API](https://ionic.io/docs/appflow/deploy/api) to allow developers the ability to create custom live update methods with their Appflow apps. 

This repo is a companion piece to [Live Update API tutorial](https://ionic.io/docs/appflow/tutorial/live_updates_api). The tutorial walks through the entire creation process of this app. The master branch contains the completed app, but other branches are provided to highlight different stages in the development of this app for your reference. 

## Prerequisites

To use this app, it is assumed that you have:

1) [An Appflow account](https://ionic.io/pricing) with the ability to run native builds
2) [The ionic cli installed](https://ionicframework.com/docs/cli)

## Preparing the App

These steps will need to be followed to prepare the app such that it will be configured to listen for live updates on a channel associated with your Appflow account. 

1) Fork the repo
2) Clone the forked repo locally
3) Open a terminal in the project directory and run `npm i` to get the latest compatible [@capacitor/android](https://www.npmjs.com/package/@capacitor/android) and [cordova-plugin-ionic](https://www.npmjs.com/package/cordova-plugin-ionic) plugins in the `package-lock.json` file.
4) Create a new app in the Appflow dashboard and assign the forked repo to this Appflow app. 
5) Find the app id for the Appflow app and add it as an `id` key in the project's `ionic.config.json` file.
5) Run `ionic deploy configure` and select the app id, live update channel, and `none` for the live update method
6) Run `npx cap sync android` to ensure the project's android directory is updated
7) Commit and push changes to the forked repo
8) Run a new android debug build on this commit to obtain the android build artifacts

With the android build artifacts created, the app can be launched from an emulator or test device.