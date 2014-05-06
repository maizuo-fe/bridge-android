# AppBridge
> support callback function for bridge between javascript and java

## Usage
setup Java:
```Java
public void passDataToApp(String type, String dataJson, String handlerName) {
    String result = "result here";
    // ...
    webView.loadUrl("javascript:AppBridge.callHandler('" + handlerName + "', '" + result + "');"); 
}
```

setup Javascript:
```Javascript
(function () {
    var AppBridge = window.AppBridge;
    AppBridge.setInvoker(appBindJs, 'passDataToJava');
})();
```

then invoke from Javascript:
```Javascript
(function () {
    var AppBridge = window.AppBridge;
    var type = '1';
    var data = {foo: 'bar'};
    AppBridge.invoke(type, data, function (response) {
        console.log(response);
    });
})();
```

## Api
### AppBridge.setInvoker
**param**
    - **object** context
    - **string** invoker
**example**
```Javascript
AppBridge.setInvoker(appBindJs, 'passDataToJava');
```

### AppBridge.invoke
**param**
    - any arguments
    - ...
    - **function** callback
**example**
```Javascript
AppBridge.invoke(1, {foo: 'bar'}, function (response) {
    console.log(response);
});
```

### AppBridge.callHandler
**param**
    - **string** handlerName
    - any arguments
    - ...
**exmaple**
```Javascript
AppBridge.callHandler('1399358347906v1EoKltD', 'response here');
```
in java:
```JAVA
String result = "response here";
webView.loadUrl("javascript:AppBridge.callHandler('" + handlerName + "', '" + result + "');"); 
```
    
### AppBridge.releaseInvoker
just for unit test
**exmaple**
```Javascript
AppBridge.releaseInvoker();
```