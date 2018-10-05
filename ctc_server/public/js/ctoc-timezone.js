"use strict";

var CtoCTimezone = (function () {
  /*
  * Starts the conversion process.
  */
  var initiateConversion = function () {
    if (window.removeEventListener)
      window.removeEventListener('load', initiateConversion);
    else if (window.detachEvent)
      window.detachEvent('onload', initiateConversion);
    var nodesToConvert = document.querySelectorAll('[data-ctoc-timezone="server"]');
    for (var i = 0; i < nodesToConvert.length; i++) {
      convertToClient(nodesToConvert[i]);
    }
  };

  /*  
  * The actual method that handles the conversion of the server time to client.

  * params node: represents any node that is needed to be converted   
  */
  var convertToClient = function (node) {
    node.innerHTML = ""
    var timeToConvert = node.getAttribute('data-ctoc-time');
    var clientTime = new Date(timeToConvert);
    var zone = node.getAttribute('data-ctoc-req-zone');
    if (node.getAttribute('data-ctoc-req-zone') != "" && node.getAttribute('data-ctoc-req-zone') != null) {
      // Need to handle this to convert to zonal specific Date Object 
      var clientTimeZone = node.getAttribute('data-ctoc-req-zone')
      clientTime = calcTime(clientTime, clientTimeZone)

    }
    
    var reqFormat=node.getAttribute('data-ctoc-req-format')
    var clientTimeString=convertToFormat(reqFormat,clientTime,clientTimeZone)
    var result = clientTimeString;
    // if (node.getAttribute('data-ctoc-callback') != "" && node.getAttribute('data-ctoc-callback') != null) {
    //   executeCallback(node.getAttribute('data-ctoc-callback'), clientTime);
    // }
    node.innerHTML = result;
    node.setAttribute("data-ctoc-timezone", "client");
  };





  /*
  * When user intends to send the date object generated to the other call back function.

  * This is used if the user dont intend to get the converted timezone value just to the html page.

  * Params callbackString: This is the required method to which the date object need to be sent.

  * Params ctocTime: This the time object that is need to convert. 
  */

  // var executeCallback = function (callbackString, ctocTime) {
  //   var namespacesCheck = callbackString.split(".");
  //   var functionToCall = namespacesCheck.pop();
  //   var context = window;
  //   for (var i = 0; i < namespacesCheck.length; i++) {
  //     context = context[namespacesCheck[i]];
  //   }
  //   return context[functionToCall].apply(context, ctocTime);
  // };





  function calcTime(clientTime, timeZone) {
      var offset;
      const  offsetarray = [
      ['CET', '1'], ['DFT', '1'], ['MET', '1'], ['WAT', '1'], ['WEST', '1'], ['CAT', '2'], ['CEST', '2'], ['EET', '2'], ['HAEC', '2'],
      ['KALT', '2'], ['MEST', '2'], ['SAST', '2'], ['WAST', '2'], ['AST', '3'], ['EAT', '3'], ['EEST', '3'], ['FET', '3'], ['IDT', '3'], ['IOT', '3'], ['MSK', '3'], ['SYOT', '3'],
      ['TRT', '3'], ['IRST', '3.5'], ['AZT', '4'], ['GET', '4'], ['GST', '4'], ['MUT', '4'], ['RET', '4'], ['SAMT', '4'], ['SCT', '4'], ['VOLT', '4'],
      ['AFT', '4.5'], ['IRDT', '4.5'], ['HMT', '5'], ['MAWT', '5'], ['MVT', '5'], ['ORAT', '5'], ['PKT', '5'], ['TFT', '5'], ['TJT', '5'], ['TMT', '5'], ['UZT', '5'], ['YEKT', '5'],
      ['IST', '5.5'], ['SLST', '5.5'], ['NPT', '5.75'], ['BIOT', '6'], ['BST', '6'], ['BTT', '6'], ['KGT', '6'], ['OMST', '6'], ['VOST', '6'], ['CCT', '6.5'], ['MMT', '6.5'], ['ACT', '6.5'],
      ['CXT', '7'], ['DAVT', '7'], ['HOVT', '7'], ['ICT', '7'], ['KRAT', '7'], ['THA', '7'], ['WIT', '7'], ['AWST', '8'], ['BDT', '8'], ['CHOT', '8'], ['CIT', '8'],
      ['CT', '8'], ['HKT', '8'], ['HOVST', '8'], ['IRKT', '8'], ['MST', '8'], ['MYT', '8'], ['PHT', '8'], ['SGT', '8'], ['SST', '8'], ['ULAT', '8'], ['WST', '8'], ['ACWST', '8.75'],
      ['CWST', '8.75'], ['CHOST', '9'], ['EIT', '9'], ['JST', '9'], ['KST', '9'], ['TLT', '9'], ['ULAST', '9'], ['YAKT', '9'], ['ACST', '9.5'], ['AEST', '10'], ['CHST', '10'], ['CHUT', '10'],
      ['DDUT', '10'], ['PGT', '10'], ['VLAT', '10'], ['ACDT', '10.5'], ['LHST', '10.5'], ['AEDT', '11'], ['KOST', '11'], ['MIST', '11'], ['NCT', '11'],
      ['NFT', '11'], ['PONT', '11'], ['SAKT', '11'], ['SBT', '11'], ['SRET', '11'], ['VUT', '11'], ['FJT', '12'], ['GILT', '12'], ['MAGT', '12'], ['MHT', '12'], ['NZST', '12'],
      ['PETT', '12'], ['TVT', '12'], ['WAKT', '12'], ['CHAST', '12.75'], ['NZDT', '13'], ['PHOT', '13'], ['TKT', '13'], ['TOT', '13'], ['CHADT', '13.75'],
      ['LINT', '14'], ['AZOST', '0'], ['EGST', '0'], ['GMT', '0'], ['UTC', '0'], ['WET', '0'], ['AZOT', '-01'], ['CVT', '-01'], ['EGT', '-01'], ['BRST', '-02'], ['FNT', '-02'],
      ['PMDT', '-02'], ['UYST', '-02'], ['NDT', '-02.5'], ['ADT', '-03'], ['AMST', '-03'], ['ART', '-03'], ['BRT', '-03'], ['CLST', '-03'], ['FKST', '-03'], ['GFT', '-03'],
      ['PMST', '-03'], ['PYST', '-03'], ['ROTT', '-03'], ['SRT', '-03'], ['UYT', '-03'], ['NST', '-03.5'], ['NT', '-03.5'], ['AMT', '-04'], ['BOT', '-04'],
      ['CLT', '-04'], ['COST', '-04'], ['ECT', '-04'], ['EDT', '-04'], ['FKT', '-04'], ['GYT', '-04'], ['PYT', '-04'], ['VET', '-04'], ['CDT', '-05'], ['COT', '-05'],
      ['EASST', '-05'], ['EST', '-05'], ['PET', '-05'], ['CST', '-06'], ['EAST', '-06'], ['GALT', '-06'], ['MDT', '-06'], ['PDT', '-07'],
      ['AKDT', '-08'], ['CIST', '-08'], ['PST', '-08'], ['AKST', '-09'], ['GAMT', '-09'], ['GIT', '-09'], ['HDT', '-09'], ['MART', '-09.5'], ['MIT', '-09.5'], ['CKT', '-10'], ['HST', '-10'],
      ['SDT', '-10'], ['TAHT', '-10'], ['NUT', '-11'], ['BIT', '-12'], ['IDLW', '-12']  ,['Pacific/Pago_Pago','-11'],['Pacific/Honolulu','-10'],['America/Anchorage','-9'],['America/Vancouver','-8'],['America/Los_Angeles','-8'],['America/Tijuana','-8'],['America/Edmonton','-7'],['America/Denver','-7'],['America/Phoenix','-7'],['America/Mazatlan','-7'],
      ['America/Winnipeg','-6'],['America/Regina','-6'],['America/Chicago','-6'],['America/Mexico_City','-6'],['America/Guatemala','-6'],['America/El_Salvador','-6'], 
      ['America/Managua','-6'],['America/Costa_Rica','-6'],['America/Montreal','-5'],['America/New_York','-5'],['America/Indianapolis','-5'],['America/Panama','-5'], 
      ['America/Bogota','-5'],['America/Lima','-5'],['America/Halifax','-4'],['America/Puerto_Rico','-4'],['America/Caracas','-4'],['America/Santiago','-4'], ['America/St_Johns','-3.5'],['America/Sao_Paulo','-3'], 
      ['Atlantic/Azores','-1'],['Etc./UTC','0'], ['UTC','0'],  ['Atlantic/Reykjavik','0'],['Europe/Dublin','0'],['Europe/London','0'],['Europe/Lisbon','0'], ['Africa/Casablanca','0'], 
      ['Africa/Nouakchott','0'],['Europe/Oslo','1'],['Europe/Stockholm','1'],['Europe/Copenhagen','1'],['Europe/Berlin','1'],['Europe/Amsterdam','1'],['Europe/Brussels','1'],['Europe/Luxembourg','1'], 
      ['Europe/Paris','1'],['Europe/Zurich','1'],['Europe/Madrid','1'],['Europe/Rome','1'],['Africa/Algiers','1'],['Africa/Tunis','1'],['Europe/Warsaw','1'],['Europe/Prague','1'], 
      ['Europe/Vienna','1'],['Europe/Budapest','1'],['Europe/Sofia','2'],['Europe/Istanbul','2'],['Europe/Athens','2'],['Asia/Nicosia','2'],['Asia/Beirut','2'],['Asia/Damascus','2'], 
      ['Asia/Jerusalem','2'],['Asia/Amman','2'],['Africa/Tripoli','2'],['Africa/Cairo','2'],['Africa/Johannesburg','2'],['Europe/Moscow','3'],['Asia/Baghdad','3'],['Asia/Kuwait','3'], 
      ['Asia/Riyadh','3'],['Asia/Bahrain','3'],['Asia/Qatar','3'],['Asia/Aden','3'],['Africa/Khartoum','3'],['Africa/Djibouti','3'],['Africa/Mogadishu','3'],['Asia/Dubai','4'],['Asia/Muscat','4'], 
      ['Asia/Yekaterinburg','5'],['Asia/Tashkent','5'],['Asia/Calcutta','5.5'],['Asia/Novosibirsk','6'],['Asia/Almaty','6'],['Asia/Dacca','6'],['Asia/Krasnoyarsk','7'],['Asia/Bangkok','7'], 
      ['Asia/Saigon','7'],['Asia/Jakarta','7'],['Asia/Irkutsk','8'],['Asia/Shanghai','8'],['Asia/Hong_Kong','8'],['Asia/Taipei','8'],['Asia/Kuala_Lumpur','8'],['Asia/Singapore','8'], 
      ['Australia/Perth','8'],['Asia/Yakutsk','9'],['Asia/Seoul','9'],['Asia/Tokyo','9'],['Australia/Darwin','9.5'],['Australia/Adelaide','9.5'],['Asia/Vladivostok','10'],['Australia/Brisbane','10'], 
      ['Australia/Sydney','10'],['Australia/Hobart','10'],['Asia/Magadan','11'],['Asia/Kamchatka','12'], ['Pacific/Auckland','12'] ]


    var myMap = new Map(offsetarray);



    // convert to msec
    // add local time zone offset 
    // get UTC time in msec

    var utc = clientTime.getTime() + (clientTime.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset

    if (typeof (timeZone) === 'string') {
      if(timeZone.includes(":"))
      {
        var colonIndex=timeZone.indexOf(":");
        var minutes=timeZone.substring(colonIndex+1);
        var minutesInHours=parseFloat(parseInt(minutes)/60);
        offset=parseFloat(parseInt(timeZone.substring(0,colonIndex))+minutes);
        var newdate = new Date(utc + (3600000 * offset));
      }
      else{
        offset=timeZone;
      var newdate = new Date(utc + (3600000 * parseFloat(myMap.get(offset), 10)));
      }
    }
    else
    {
      offset=timeZone;
      var newdate = new Date(utc + (3600000 * offset));
    }

    return newdate

  }


  var convertToFormat = function (dateformat, newdate,clientTimeZone) {
    var req_Format=dateformat;
    if(dateformat!=""&&dateformat!=null){
      var formattemp = dateformat;
    }
    else{
      var formattemp = "ddd MMM dd yyyy hh:mm:ss ";
      dateformat="ddd MMM dd yyyy hh:mm:ss ";
    }
    var i = 0,j;
    var countchar = 0;
    var formatchar;
    var formatteddate = "";
    const Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
      while (i < formattemp.length) {
        formatchar = dateformat.charAt(i);
        for (countchar = 0; i < formattemp.length; i++) {
          if (formatchar != dateformat.charAt(i)) {
            if (formatchar == 'D' && dateformat.charAt(i) == 'o') {
              formatchar = 'o';
              i++;
            }
            break;
          }
          else
            countchar++;
        }
        switch (formatchar) {
          case 'o':
            formatteddate = formatteddate.concat(newdate.getDate());
            switch (newdate.getDate() % 10) {
              case 1:
                formatteddate = formatteddate.concat("st");
                break;
              case 2:
                formatteddate = formatteddate.concat("nd");
                break;
              case 3:
                formatteddate = formatteddate.concat("rd");
                break;
              default:
                formatteddate = formatteddate.concat("th");
            }
            break;

          case 'D':
          case 'd':
            if (countchar == 4)
              formatteddate = formatteddate.concat(Days[newdate.getDay()]);

            else if (countchar == 3)
              formatteddate = formatteddate.concat(Days[newdate.getDay()].substring(0, 3));

            else
              formatteddate = formatteddate.concat(newdate.getDate());
            break;

          case 'M':
            if (countchar == 2)
              formatteddate = formatteddate.concat(parseInt(newdate.getMonth()) + 1);
            else if (countchar == 3)
              formatteddate = formatteddate.concat(Months[newdate.getMonth()].substring(0, 3));
            else if (countchar == 4)
              formatteddate = formatteddate.concat(Months[newdate.getMonth()]);
            break;

          case 'Y':
          case 'y':
            if (countchar == 2)
              formatteddate = formatteddate.concat(newdate.getFullYear() % 100);
            else
              formatteddate = formatteddate.concat(newdate.getFullYear());
            break;
          case 'H':
          case 'h':
            if (countchar == 2)
              formatteddate = formatteddate.concat(newdate.getHours());
            break;
          case 'm':
            if (countchar == 2)
              formatteddate = formatteddate.concat(newdate.getMinutes());
            break;
          case 's':
            if (countchar == 2)
              formatteddate = formatteddate.concat(newdate.getSeconds());
            break;
          case 'a':
            if (newdate.getHours() > 12)
              formatteddate = formatteddate.concat("pm");
            else
              formatteddate = formatteddate.concat("am");
            break;
          default:
            for ( j = 0; j < countchar; j++)
              formatteddate = formatteddate.concat(formatchar);
            break;
        

      }
      
      
    }
    if( req_Format!= "" && req_Format != null)
      formatteddate= formatteddate+" "+clientTimeZone;
     
      
    return formatteddate;
  }
    /*

    * This object is exposed to external world to facilitate the instant load.

    */

    var ctoCTimezone = {};
    ctoCTimezone.runInstaLoad = function () {
      initiateConversion();
    };

    // Convert elements on the window load. 

    if (window.addEventListener)
      window.addEventListener('load', initiateConversion);
    else if (window.attachEvent)
      window.attachEvent('onload', initiateConversion);

    return ctoCTimezone;
  })();