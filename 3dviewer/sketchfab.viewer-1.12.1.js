(function (t, e) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = e();
    } else if (typeof define === "function" && define.amd) {
        define([], e);
    } else if (typeof exports === "object") {
        exports.Sketchfab = e();
    } else {
        t.Sketchfab = e();
    }
})(self, function () {
    "use strict";

    var t = {
        d: function (e, i) {
            for (var n in i) {
                t.o(i, n) &&
                    !t.o(e, n) &&
                    Object.defineProperty(e, n, {
                        enumerable: true,
                        get: i[n],
                    });
            }
        },
        o: function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        },
    };

    var e = {};

    function i(t) {
        return i =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype
                          ? "symbol"
                          : typeof t;
                  },
        i(t);
    }

    t.d(e, { default: () => h });

    var n = function (t, e) {
        t.forEach(function (t) {
            this[t] = function () {
                var i,
                    n = e._requestIdCounter++,
                    s = Array.prototype.slice.call(arguments);
                if (s.length > 0) {
                    var r = s[s.length - 1];
                    if (typeof r === "function") i = s.pop();
                }
                if (i) e._pendingRequests[n] = i.bind(this);
                e._target.postMessage(
                    {
                        type: "api.request",
                        instanceId: e.getIdentifier(),
                        requestId: n,
                        member: t,
                        arguments: s,
                    },
                    e.getDomain()
                );
            };
        }, this);

        this.addEventListener = function (t, i, n) {
            if (t === "viewerready" && e.isViewerReady) i();
            if (!e._eventListeners[t]) e._eventListeners[t] = [];
            e._eventListeners[t].push(i);
            if (n && this.setListenerOptions) {
                n.name = t;
                this.setListenerOptions(n);
            }
        };

        this.removeEventListener = function (t, i) {
            if (e._eventListeners[t]) {
                var n = e._eventListeners[t].indexOf(i);
                if (n !== -1) e._eventListeners[t].splice(n, 1);
            }
        };
    };

    var s = function (t, e, i) {
        this._target = t;
        this._requestIdCounter = 0;
        this._pendingRequests = {};
        this._eventListeners = {};
        this._ready = false;
        this._domain = i;
        this._instanceId = e;
        this.listenServer();
    };

    s.prototype = {
        getIdentifier: function () {
            return this._instanceId;
        },
        getDomain: function () {
            return this._domain;
        },
        setIdentifier: function (t) {
            this._instanceId = t;
        },
        use: function (t, e) {
            this._version = t;
            this._ready = true;
            var i = this._requestIdCounter++;
            this._pendingRequests[i] = function (t, i, s) {
                if (t) e.call(this, t);
                else e.call(this, null, new n(s, this));
            }.bind(this);
            this._target.postMessage(
                {
                    type: "api.initialize",
                    requestId: i,
                    name: t,
                    instanceId: this._instanceId,
                },
                this._domain
            );
        },
        listenServer: function () {
            if (!this._serverReceiveMessageBinded) {
                var t = ["api.initialize.result", "api.request.result", "api.event"];
                this._serverReceiveMessageBinded = function (e) {
                    if (
                        e.origin === this._domain &&
                        e.data &&
                        e.data.type &&
                        e.data.instanceId &&
                        e.data.instanceId === this.getIdentifier()
                    ) {
                        var i = e.data.type;
                        if (t.indexOf(i) !== -1) {
                            if (i === "api.event") {
                                var n = e.data.results,
                                    s = n[0];
                                if (this._eventListeners["*"] || this._eventListeners.all) {
                                    ["*", "all"].forEach(
                                        function (t) {
                                            var e = this._eventListeners[t];
                                            if (e) e.forEach(function (t) { t.apply(t, n); });
                                        }.bind(this)
                                    );
                                } else {
                                    var r = n.slice(1),
                                        o = this._eventListeners[s];
                                    if (o) o.forEach(function (t) { t.apply(t, r); });
                                    else if (s === "viewerready") this.isViewerReady = true;
                                }
                            } else {
                                var a = e.data.requestId,
                                    d = this._pendingRequests[a];
                                if (!d) return;
                                d.apply(null, e.data.results);
                                this._pendingRequests[a] = void 0;
                            }
                        }
                    }
                }.bind(this);
                window.addEventListener("message", this._serverReceiveMessageBinded);
            }
        },
    };

    const r = s;
    var o = /[&|;]+/g;

    function a(t) {
        if (i(t) === "object") {
            var e = t,
                n = {};
            Object.keys(e).forEach(function (t) {
                n[t] = Array.isArray(e[t]) ? e[t] : [e[t]];
            });
            return n;
        } else {
            if (t[0] === "?") t = t.substr(1);
            return t.split(o).reduce(function (t, e) {
                if (e.length === 0) return t;
                var i = e.indexOf("="),
                    n = i === -1 ? e.length : i,
                    s = decodeURIComponent(e.substr(0, n).replace(/\+/g, "%20")),
                    r = decodeURIComponent(e.substr(n + 1).replace(/\+/g, "%20"));
                if (t[s] === void 0) t[s] = [];
                t[s].push(r);
                return t;
            }, {});
        }
    }

    window.SketchfabAPIClient = r;

    var d = function (t, e) {
        var n = t,
            s = e;
        if (i(t) === "object") {
            s = t;
            n = null;
        }
        this._version = n;
        this._target = s;
        if (!window.sketchfabAPIinstances) window.sketchfabAPIinstances = [];
        window.sketchfabAPIinstances.push(this);
        this._apiId = window.sketchfabAPIinstances.length.toString();
        if (this._target.id) this._apiId += "_" + this._target.id;
        if (!this._target.allow) this._target.allow = "vr; autoplay; fullscreen";
        this._client = void 0;
        this._options = void 0;
        this._domain = "sketchfab.com";
        this._domain = this._domain === "same-as-current" ? window.location.hostname : this._domain;
        this._urlTemplate = "https://YYYY/models/XXXX/embed";
        this._url = this._urlTemplate.replace("YYYY", this._domain);
        this._transmitOptions = {};
        this._getURLOptions();
    };

    d.prototype = {
        _urlOptionsDict: {
            skfb_api_version: { default: "1.12.1", type: "string" },
        },
        _optionsLoaded: function (t) {
            this._urlOptions = t;
            this._version = this._getURLOption("skfb_api_version", this._version);
        },
        _getURLOption: function (t, e) {
            var i = this._urlOptionsDict[t];
            if (!i) return e;
            if (e == null) e = i.default;
            var n = this._urlOptions[t];
            return n && n.length ? n[0] : e;
        },
        _getURLOptions: function () {
            if (!window || !window.location.search) return this._optionsLoaded({});
            var t = a(window.location.search);
            for (var e in t) {
                if (e.startsWith("skfb_")) this._transmitOptions[e.substr(5)] = t[e];
            }
            return this._optionsLoaded(t);
        },
        getEmbedURL: function (t, e) {
            var i = this._url + "?api_version=" + this._version + "&api_id=" + this._apiId;
            if (e) {
                Object.keys(e).forEach(function (t) {
                    if (e[t] != null && typeof e[t] !== "function") i += "&" + t.toString() + "=" + e[t].toString();
                });
            }
            var n = this._transmitOptions;
            Object.keys(this._transmitOptions).forEach(function (t) {
                i += "&" + t.toString() + "=" + n[t].toString();
            });
            return i.replace("XXXX", t);
        },
        init: function (t, e) {
            this._options = e;
            this._uid = t;
            this._realInit();
        },
        _initializeAPIEmbed: function (t) {
            if (
                t.data &&
                t.data.instanceId &&
                this._apiId === t.data.instanceId &&
                t.data.type === "api.ready" &&
                this._target.src
            ) {
                if (t.data.error !== void 0) {
                    this.error(t.data.error);
                    window.removeEventListener("message", this._initializeAPIEmbedBinded);
                    return;
                }
                var e = this._target.src.split("/");
                e = "https://" + e[2];
                if (this._client) {
                    console.log(
                        "reusing a Sketchfab instance for multiple client is not supported, please create a new sketchfab instance"
                    );
                    window.removeEventListener("message", this._client._serverReceiveMessageBinded);
                }
                this._client = new window.SketchfabAPIClient(this._target.contentWindow, this._apiId, e);
                this._client.use(
                    this._version,
                    function (t, e) {
                        if (t) throw t;
                        this.success.call(this, e);
                    }.bind(this)
                );
                window.removeEventListener("message", this._initializeAPIEmbedBinded);
            }
        },
        _realInit: function () {
            if (!this._initializeAPIEmbedBinded) this._initializeAPIEmbedBinded = this._initializeAPIEmbed.bind(this);
            window.addEventListener("message", this._initializeAPIEmbedBinded);
            this._target.src = this.getEmbedURL(this._uid, this._options);
        },
        success: function (t) {
            if (this._options.success && typeof this._options.success === "function") this._options.success(t);
        },
        error: function (t) {
            if (this._options.error && typeof this._options.error === "function") this._options.error(t);
        },
        show: function () {
            var t = this._target.style.top;
            this._target.style.top = "-1000vh";
            Promise.resolve().then(
                function () {
                    this._target.style.top = t;
                }.bind(this)
            );
        },
    };

    const h = d;
    return e.default;
});
