window.feednami = {}, feednami.load = function (e, n) {
    var o = "https://api.feednami.com/api/v1",
        a = e;
    "object" == typeof e && (a = e.url);
    var t = "url=" + encodeURIComponent(a);
    e.format && (t += "&include_xml_document&format=" + e.format), e.includeXml && (t += "&include_xml_document");
    var d = o + "/feeds/load?" + t;
    if (window.XDomainRequest) {
        var l = document.createElement("script"),
            c = "jsonp_callback_" + (new Date).getTime() + "_" + Math.round(1e6 * Math.random());
        d += "&jsonp_callback=" + c, window[c] = function (e) {
            n(e), document.body.removeChild(l), window[c] = null;
            try {
                delete window[c]
            } catch (o) {}
        }, l.src = d, document.body.appendChild(l)
    } else {
        var i = new XMLHttpRequest;
        i.onreadystatechange = function () {
            4 == i.readyState && n(JSON.parse(i.responseText))
        }, i.open("GET", d), i.send()
    }
}, feednami.loadGoogleFormat = function (e, n) {
    return feednami.load({
        url: e,
        format: "google",
        includeXml: !0
    }, n)
};