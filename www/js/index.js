/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


function objectToSearchString(obj) {
  return "?" + Object.keys(obj).map(function(key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
  }).join("&");
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var httpd = ( cordova && cordova.plugins && cordova.plugins.CorHttpd ) ? cordova.plugins.CorHttpd : null;
        var port = 18679;
        var endPort = 18699;
        function startServer() {
          if (httpd) {
            httpd.startServer({
                'www_root' : "",
                'port' : port,
                'localhost_only' : false
            }, function( url ) {
              // if server is up, it will return the url of http://<server ip>:port/
              // the ip is the active network connection
              // if no wifi or no cell, "127.0.0.1" will be returned.
              if (url.toLowerCase().indexOf("error") < 0) {
                // local test
                var baseUrl = "http://localhost:1337";
                // specfic ip test
                // var baseUrl = "http://192.168.2.9:1337";
                // local stage test
                // var baseUrl = "http://local.happyfuntimes.net";
                // live
                //var baseUrl = "http://happyfuntimes.net";
                //
                var hftUrl = baseUrl + objectToSearchString({
                  cordovaurl: url,
                })
                console.log("goto: " + hftUrl);
//                window.location.href = hftUrl;
              } else {
                console.error("port: " + port + " url: " + url);
                tryNextPort();
              }
            }, function( error ) {
               console.error("port: " + port + " error: " + error);
               tryNextPort();
            });
          }
        };
        function tryNextPort() {
          if (port < endPort) {
            ++port;
            startServer();
          }
        };
        startServer();
    },
    //
    showRetry: function() {

    },
};

function handleOpenURL(url) {
  console.log("handleOpenURL got called with: " + url);
}
