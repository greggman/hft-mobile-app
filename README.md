HappyFunTimes Mobile App
========================

This is an attempt at creating a mobile app for HappyFunTimes

### Reasons to have an app

*   Can prevent the phone from sleeping

    The phone generally goes to sleep if the user is not interacting with it.
    An app can prevent this but web page can not.

*   Can access features not availabe in some browsers

    As of iOS8.3 iOS Safari can not access the mic or video and even
    camera picture access has issues. Android Chrome has no such problems
    but allowing iOS to do the same means waiting for Apple to offer
    those features or use an app.

*   Can go fullscreen on iOS

    Browsers have a UI (the address bar, etc), going fullscreen means
    getting rid of that wasted space.

    You can already do this through web standards on Android Chrome but
    Apple has not provided this feature to iOS Safari yet.

*   Can force an orientation

    Android Chrome can already do this ones it goes fullscreen.
    iOS no such luck.

### Reason to **NOT** have an app

*   Users can't just connect to your game

    Before a user can play your game they have to download an app

*   Installation mode might not work

    Installation mode works by overriding all networking. This is awesome
    because it means your users, at least on iOS just connect to your WiFi
    and they are magically connected to your game. On Android they can
    go to any URL and they'll be taken to your game.

    But, with an app users will need access to the internet to download the app
    so can't let HappyFunTimes override all networking since users won't
    have internet access and therefore won't be able to download the app.

*   There may be lots of network traffic

    In installation mode, since users connect to your WiFi and HappyFunTimes
    controls all networking it means users are not using bandwidth reading
    facebook or posting pictures to instagram etc.. That means your game
    should run with less latency and a better user experience.

    But (see above), because in order to let users install the app they'll
    need internet access you'll be enabling them to use all the network
    bandwidth for things other than your installtion.

You can potentially work around these last 2 issues by providing 2 networks.
One with internet, one with HappyFunTimes. They can use the one with internet
to download the app and then connect to the HappyFunTimes network to interact
with your game. You can also require them to download the app over cellular
service.

Unfortunately this way is very confusing for many users. To download the app
they need to know to NOT connect to the HappyFunTimes network, download the app,
then only after connect to the HappyFunTimes WiFi.

## Building

The app is written using Phonegap which is effectively just a webpage which
seems like a perfect fit.

I've only built on OSX so far

### OSX

   * Install the Java JDK (verison 7)
   * Install ant
   * Install phonegap
   * Install Xcode
   * Download the android SDK
   * run `<android-sdk>/tools/android update sdk --no-ui` (downloads buttloads!)
   * add `<android-sdk>/platform-tools:<android-sdk>/tools:<ant>/bin` to your PATH
   * `export SDK_PATH=<android-sdk>`
   * `export ANT_HOME=<ant>`

With all that setup you should be able to type

    phonegap build ios
    phonegap run ios

    phonegap build android
    phonegap run android

The app will connect to http://happyfuntimes.net immediately when it starts
