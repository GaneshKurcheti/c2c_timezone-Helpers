"use strict";

var CtoCTimezone = (function() {
    /*
    * Starts the conversion process.
    */
    var initiateConversion = function(){
      if (window.removeEventListener)
        window.removeEventListener('load', initiateConversion);
      else if (window.detachEvent)
        window.detachEvent('onload', initiateConversion);
      var nodesToConvert=document.querySelectorAll('[data-ctoc-timezone="server"]');
      for(var i = 0; i < nodesToConvert.length; i++){
        convertToClient(nodesToConvert[i]);
      }
    };

    /*  
    * The actual method that handles the conversion of the server time to client.

    * params node: represents any node that is needed to be converted   
    */
    var convertToClient = function(node){
      node.innerHTML=""
      var timeToConvert=node.getAttribute('data-ctoc-time');
      var clientTime = new Date(timeToConvert);
      if(node.getAttribute('data-ctoc-req-zone')!="" && node.getAttribute('data-ctoc-req-zone')!=null)
      {
        // Need to handle this to convert to zonal specific Date Object 
        clientTime = node.getAttribute('data-ctoc-req-zone')
      }
      var result=clientTime;
      if(node.getAttribute('data-ctoc-callback')!="" && node.getAttribute('data-ctoc-callback')!=null){
        executeCallback(node.getAttribute('data-ctoc-callback') , clientTime);
      }
      node.innerHTML=result;
      node.setAttribute("data-ctoc-timezone","client");
    };

    /*
    * When user intends to send the date object generated to the other call back function.

    * This is used if the user dont intend to get the converted timezone value just to the html page.

    * Params callbackString: This is the required method to which the date object need to be sent.

    * Params ctocTime: This the time object that is need to convert. 
    */

    var executeCallback = function(callbackString,ctocTime){
      var namespacesCheck = callbackString.split(".");
      var functionToCall = namespacesCheck.pop();
      var context= window;
      for(var i = 0; i < namespacesCheck.length; i++) {
        context = context[namespacesCheck[i]];
      }
      return context[functionToCall].apply(context, ctocTime);
    };

    /*

    * This object is exposed to external world to facilitate the instant load.

    */

    var ctoCTimezone = {};
    ctoCTimezone.runInstaLoad =function(){
      initiateConversion();
    };
    
    // Convert elements on the window load. 

    if (window.addEventListener)
    window.addEventListener('load', initiateConversion);
    else if (window.attachEvent)
    window.attachEvent('onload', initiateConversion);

    return ctoCTimezone;
})();