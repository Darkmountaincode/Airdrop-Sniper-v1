define(
  "ace/mode/properties_highlight_rules",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules",
  ],
  function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      s = function () {
        var e = /\\u[0-9a-fA-F]{4}|\\/;
        this.$rules = {
          start: [
            { token: "comment", regex: /[!#].*$/ },
            { token: "keyword", regex: /[=:]$/ },
            { token: "keyword", regex: /[=:]/, next: "value" },
            { token: "constant.language.escape", regex: e },
            { defaultToken: "variable" },
          ],
          value: [
            { regex: /\\$/, token: "string", next: "value" },
            { regex: /$/, token: "string", next: "start" },
            { token: "constant.language.escape", regex: e },
            { defaultToken: "string" },
          ],
        };
      };
    r.inherits(s, i), (t.PropertiesHighlightRules = s);
  },
),
  define(
    "ace/mode/properties",
    [
      "require",
      "exports",
      "module",
      "ace/lib/oop",
      "ace/mode/text",
      "ace/mode/properties_highlight_rules",
    ],
    function (e, t, n) {
      "use strict";
      var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("./properties_highlight_rules").PropertiesHighlightRules,
        o = function () {
          (this.HighlightRules = s), (this.$behaviour = this.$defaultBehaviour);
        };
      r.inherits(o, i),
        function () {
          this.$id = "ace/mode/properties";
        }.call(o.prototype),
        (t.Mode = o);
    },
  );
(function () {
  window.require(["ace/mode/properties"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
