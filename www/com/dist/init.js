!function() {
    "use strict";
    window.MF_MODULE_LOADER = window.MF_MODULE_LOADER || {
        config: {
            domain: window.location.hostname,
            path: "/libmfelivemakeup-web/",
            version: "stable",
            optimize: !1
        },
        loadScript: function(t, o) {
            var n = document.createElement("script");
            n.type = "text/javascript",
            n.src = t,
            n.onreadystatechange = o,
            n.onload = o,
            document.body.appendChild(n)
        },
        getUrlPath: function() {
            var t = MF_MODULE_LOADER.config.domain
              , o = MF_MODULE_LOADER.config.path
              , n = MF_MODULE_LOADER.config.version;
            return location.protocol + "//" + t + o + ("" == n ? "" : n + "/")
        },
        init: function(t, o) {
            for (var n in t)
                MF_MODULE_LOADER.config[n] = t[n];
            var i = "./dist/import.min.js";
            MF_MODULE_LOADER.loadScript(i, function() {
                return MF_MODULE_LOADER.load(o)
            })
        },
        load: function() {
            console.log("WARN: please call MF_MODULE_LOADER.init first and wait for it to complete")
        },
        getGitVersion: function() {
            return "2.0.2"
        }
    }
}();
