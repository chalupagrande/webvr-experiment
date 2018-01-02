# 3 

Experiments with WebVR adn ThreeJS

### Getting Started 

``` 
$ npm install
$ gulp
```

`gulp` will serve the files on `localhost:3000`. You can use your smart phone's browser to navigate to your host computer's localhost. This demo uses `DeviceOrientationControls` and `StereoEffect`. This works best for a Google Cardboard like experience. 


#### Notes 
- `ray-input` contructor not working as documented. 
- Using NPMs ThreeJS Modules tends to cause problems. 
- WebVR-UI and the ThreeJS WEBVR utility dont seem to be compatible with current chrome WebVR Build. 