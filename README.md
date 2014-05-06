# AndroidBridge
> support callback function for bridge between javascript and Android

## Usage
setup Java:
```Java
public void passDataToApp(String type, String dataJson, String handlerName) {
    String result = "result here";
    // ...
    webView.loadUrl("javascript:AndroidBridge.callHandler('" + handlerName + "', '" + result + "');"); 
}
```

setup Javascript:
```Javascript
(function () {
    var AndroidBridge = window.AndroidBridge;
    AndroidBridge.setInvoker(appBindJs, 'passDataToJava');
})();
```

then invoke from Javascript:
```Javascript
(function () {
    var AndroidBridge = window.AndroidBridge;
    var type = '1';
    var data = {foo: 'bar'};
    AndroidBridge.invoke(type, data, function (response) {
        console.log(response);
    });
})();
```

## Api
### AndroidBridge.setInvoker
+ **param**
    - **object** context
    - **string** invoker

**example**
```Javascript
AndroidBridge.setInvoker(appBindJs, 'passDataToJava');
```

### AndroidBridge.invoke
+ **param**
    - any arguments
    - ...
    - **function** callback

**example**
```Javascript
AndroidBridge.invoke(1, {foo: 'bar'}, function (response) {
    console.log(response);
});
```

### AndroidBridge.callHandler
+ **param**
    - **string** handlerName
    - any arguments
    - ...

**exmaple**
```Javascript
AndroidBridge.callHandler('1399358347906v1EoKltD', 'response here');
```
in java:
```JAVA
String result = "response here";
webView.loadUrl("javascript:AndroidBridge.callHandler('" + handlerName + "', '" + result + "');"); 
```

handlers can receive arguments with any length.
e.g.:
```JAVA
webView.loadUrl("javascript:AndroidBridge.callHandler('" + handlerName + "', 'foo', 'bar', 'baz');"); 
```
    
### AndroidBridge.releaseInvoker
just for unit test
**exmaple**
```Javascript
AndroidBridge.releaseInvoker();
```