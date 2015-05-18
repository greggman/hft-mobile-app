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
  return "?" + Object.keys(obj).filter(function(key) {
    return obj[key] !== undefined;
  }).map(function(key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
  }).join("&");
}

function searchStringToObject(str, opt_obj) {
  if (str[0] === '?') {
    str = str.substring(1);
  }
  var results = opt_obj || {};
  str.split("&").forEach(function(part) {
    var pair = part.split("=").map(decodeURIComponent);
    results[pair[0]] = pair[1] !== undefined ? pair[1] : true;
  });
  return results;
}

/**
 * Reads the query values from a URL like string.
 * @param {String} url URL like string eg. http://foo?key=value
 * @param {Object} [opt_obj] Object to attach key values to
 * @return {Object} Object with key values from URL
 * @memberOf module:Misc
 */
function parseUrlQueryString(str, opt_obj) {
  var dst = opt_obj || {};
  try {
    var q = str.indexOf("?");
    var e = str.indexOf("#");
    if (e < 0) {
      e = str.length;
    }
    var query = str.substring(q + 1, e);
    searchStringToObject(query, dst);
  } catch (e) {
    console.error(e);
  }
  return dst;
}

function recordState() {
  window.state = window.state || [];
  window.state.push(new Error(Array.prototype.join.call(arguments, " ")));
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
        window.plugins.insomnia.keepAwake();
        window.StatusBar.hide();
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
                // give it a moment because `handleOpenURL` is called late
                recordState("queue start");
                setTimeout(function() {
                  app.startHappyFunTimes(url);
                }, 500);
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
    startHappyFunTimes: function(url) {
      recordState("startHappyFunTimes");
      // local test
      //var baseUrl = "http://localhost:1337";
      // specfic ip test
      //var baseUrl = "http://172.16.101.166:1337";
      // local stage test
      //var baseUrl = "http://local.happyfuntimes.net";
      // live
      var baseUrl = "http://happyfuntimes.net";
      if (baseUrl !== "http://happyfuntimes.net") {
        var domainElem = document.getElementById("hft-domain");
        domainElem.appendChild(document.createTextNode(baseUrl));
        domainElem.style.display = "block";
      }

      if (app.hftInfo && app.hftInfo.goto) {
        try {
          var u = new URL(app.hftInfo.goto);
          baseUrl = u.origin + u.pathname;
          recordState("got hft:", baseUrl);
        } catch (e) {
          recordState(e);
        }
      }
      var hftUrl = baseUrl + objectToSearchString({
        cordovaurl: url,
        restarturl: window.location.href,
      });
      recordState("set href:", hftUrl);
      window.location.href = hftUrl;
    },
    //
    showRetry: function() {

    },
};

// Called by nl.x-services.plugins.launchmyapp plugin
// when app os opened by URL? Not sure when this is called though :(
function handleOpenURL(url) {
  recordState("got handleOpenURL:" + url);
  app.hftInfo = parseUrlQueryString(url);
}
