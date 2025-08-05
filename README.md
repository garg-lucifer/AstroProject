To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

Features -->

1. Online and Offline Support for both journals and horoscopes
2. One Journal for each day which can be created, deleted, updated and read.

The design is kept in such a way that they follow the Component Composition and the Presentational Components such that even in future anything comes up the logic can be added into
the hooks and the UI uses those hooks as a data source or data manipulation source. As for the
local storage, there could be a central manager that manages the local storage but currently the
usage is less hence managed easily and manager would be an overkill at this stage. There could
be central color codes for design management and english texts could be in a seperate file for
easily managing translation to multiple languages using let's say ii8n. For the simplicity of the UI and the time availability Context API is used to pass the data across app but other state management library could be explored such as redux or zustand based on complete requirements.
