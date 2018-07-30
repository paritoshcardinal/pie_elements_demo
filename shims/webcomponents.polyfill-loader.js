

function loadJS(path) {
    var script = document.createElement('script');

    // Assign a URL to the script element
    script.src = path;

    // Get the first script tag on the page (we'll insert our new one before it)
    var ref = document.querySelector('script');

    // Insert the new node before the reference node
    ref.parentNode.insertBefore(script, ref);
}


function thisBrowserType() {

    var browserType = "";
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    switch (true) {
        case (isFirefox):
            browserType = "isFirefox";
            break;

        case (isEdge):
            browserType = "isEdge";
            break;
        case (isChrome):
            browserType = "isChrome";
            break;

        case (isSafari):
            browserType = "isSafari";
            break;

        case (isIE):
            browserType = "isIE";
            break;

        case (isEdge):
            browserType = "isEdge";
            break;
        case (isOpera):
            browserType = "isOpera";
            break;
    }


    return browserType;
}

