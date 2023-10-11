define(
  "ace/mode/pascal_highlight_rules",
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
        var e = this.createKeywordMapper(
          {
            "keyword.control":
              "absolute|abstract|all|and|and_then|array|as|asm|attribute|begin|bindable|case|class|const|constructor|destructor|div|do|do|else|end|except|export|exports|external|far|file|finalization|finally|for|forward|goto|if|implementation|import|in|inherited|initialization|interface|interrupt|is|label|library|mod|module|name|near|nil|not|object|of|only|operator|or|or_else|otherwise|packed|pow|private|program|property|protected|public|published|qualified|record|repeat|resident|restricted|segment|set|shl|shr|then|to|try|type|unit|until|uses|value|var|view|virtual|while|with|xor",
          },
          "identifier",
          !0,
        );
        (this.$rules = {
          start: [
            {
              caseInsensitive: !0,
              token: [
                "variable",
                "text",
                "storage.type.prototype",
                "entity.name.function.prototype",
              ],
              regex:
                "\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?(?=(?:\\(.*?\\))?;\\s*(?:attribute|forward|external))",
            },
            {
              caseInsensitive: !0,
              token: [
                "variable",
                "text",
                "storage.type.function",
                "entity.name.function",
              ],
              regex: "\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?",
            },
            { caseInsensitive: !0, token: e, regex: /\b[a-z_]+\b/ },
            {
              token: "constant.numeric",
              regex:
                "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b",
            },
            { token: "punctuation.definition.comment", regex: "--.*$" },
            { token: "punctuation.definition.comment", regex: "//.*$" },
            {
              token: "punctuation.definition.comment",
              regex: "\\(\\*",
              push: [
                {
                  token: "punctuation.definition.comment",
                  regex: "\\*\\)",
                  next: "pop",
                },
                { defaultToken: "comment.block.one" },
              ],
            },
            {
              token: "punctuation.definition.comment",
              regex: "\\{",
              push: [
                {
                  token: "punctuation.definition.comment",
                  regex: "\\}",
                  next: "pop",
                },
                { defaultToken: "comment.block.two" },
              ],
            },
            {
              token: "punctuation.definition.string.begin",
              regex: '"',
              push: [
                { token: "constant.character.escape", regex: "\\\\." },
                {
                  token: "punctuation.definition.string.end",
                  regex: '"',
                  next: "pop",
                },
                { defaultToken: "string.quoted.double" },
              ],
            },
            {
              token: "punctuation.definition.string.begin",
              regex: "'",
              push: [
                { token: "constant.character.escape.apostrophe", regex: "''" },
                {
                  token: "punctuation.definition.string.end",
                  regex: "'",
                  next: "pop",
                },
                { defaultToken: "string.quoted.single" },
              ],
            },
            { token: "keyword.operator", regex: "[+\\-;,/*%]|:=|=" },
          ],
        }),
          this.normalizeRules();
      };
    r.inherits(s, i), (t.PascalHighlightRules = s);
  },
),
  define(
    "ace/mode/folding/coffee",
    [
      "require",
      "exports",
      "module",
      "ace/lib/oop",
      "ace/mode/folding/fold_mode",
      "ace/range",
    ],
    function (e, t, n) {
      "use strict";
      var r = e("../../lib/oop"),
        i = e("./fold_mode").FoldMode,
        s = e("../../range").Range,
        o = (t.FoldMode = function () {});
      r.inherits(o, i),
        function () {
          (this.getFoldWidgetRange = function (e, t, n) {
            var r = this.indentationBlock(e, n);
            if (r) return r;
            var i = /\S/,
              o = e.getLine(n),
              u = o.search(i);
            if (u == -1 || o[u] != "#") return;
            var a = o.length,
              f = e.getLength(),
              l = n,
              c = n;
            while (++n < f) {
              o = e.getLine(n);
              var h = o.search(i);
              if (h == -1) continue;
              if (o[h] != "#") break;
              c = n;
            }
            if (c > l) {
              var p = e.getLine(c).length;
              return new s(l, a, c, p);
            }
          }),
            (this.getFoldWidget = function (e, t, n) {
              var r = e.getLine(n),
                i = r.search(/\S/),
                s = e.getLine(n + 1),
                o = e.getLine(n - 1),
                u = o.search(/\S/),
                a = s.search(/\S/);
              if (i == -1)
                return (
                  (e.foldWidgets[n - 1] = u != -1 && u < a ? "start" : ""), ""
                );
              if (u == -1) {
                if (i == a && r[i] == "#" && s[i] == "#")
                  return (
                    (e.foldWidgets[n - 1] = ""),
                    (e.foldWidgets[n + 1] = ""),
                    "start"
                  );
              } else if (
                u == i &&
                r[i] == "#" &&
                o[i] == "#" &&
                e.getLine(n - 2).search(/\S/) == -1
              )
                return (
                  (e.foldWidgets[n - 1] = "start"),
                  (e.foldWidgets[n + 1] = ""),
                  ""
                );
              return (
                u != -1 && u < i
                  ? (e.foldWidgets[n - 1] = "start")
                  : (e.foldWidgets[n - 1] = ""),
                i < a ? "start" : ""
              );
            });
        }.call(o.prototype);
    },
  ),
  define(
    "ace/mode/pascal",
    [
      "require",
      "exports",
      "module",
      "ace/lib/oop",
      "ace/mode/text",
      "ace/mode/pascal_highlight_rules",
      "ace/mode/folding/coffee",
    ],
    function (e, t, n) {
      "use strict";
      var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("./pascal_highlight_rules").PascalHighlightRules,
        o = e("./folding/coffee").FoldMode,
        u = function () {
          (this.HighlightRules = s),
            (this.foldingRules = new o()),
            (this.$behaviour = this.$defaultBehaviour);
        };
      r.inherits(u, i),
        function () {
          (this.lineCommentStart = ["--", "//"]),
            (this.blockComment = [
              { start: "(*", end: "*)" },
              { start: "{", end: "}" },
            ]),
            (this.$id = "ace/mode/pascal");
        }.call(u.prototype),
        (t.Mode = u);
    },
  );
(function () {
  window.require(["ace/mode/pascal"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
