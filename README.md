# Ninety-Nine
This is an AngularJS / Bootstrap 3.x implementation of the card game [99](https://en.wikipedia.org/wiki/Ninety-nine_%28addition_card_game%29).

# Play Now
## Play in your Web Browser
You can play this now on [KeithOtt.com](http://keithott.com/99/).

## Android Version
You can download this for your Android device:
- [Google Play](https://play.google.com/store/apps/details?id=com.keithott.ninetynine)
- [Amazon Appstore](http://www.amazon.com/gp/product/B0178EWJCC/ref=mas_pm_ninety-nine_-_99_card_game)

# Development
## Running
1. Install [Yarn](https://yarnpkg.com/)
2. From the root directory of this project, run:
```
yarn install
```
3. Open scripts/app.js and ensure IS_CORDOVA is set to false
5. Open index.html in a web server, such as [Mongoose](https://cesanta.com/).  
(HINT: Drop Mongoose in the root directory of this project and then just double-click it.)

## Deploying
There's currently no build process; just deploy this entire directory, including node_moduels.  (But you'll probably want to skip the .git folder)

## What about the Android App?
I've used Cordova to package the Android app, but the project isn't really in a state to be released.  I currently have no plans to release the source to it, but if you're really interested feel free to contact me at [ducttape12@yahoo.com](mailto:ducttape12@yahoo.com).

# License
Copyright 2018 Keith Ott

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.