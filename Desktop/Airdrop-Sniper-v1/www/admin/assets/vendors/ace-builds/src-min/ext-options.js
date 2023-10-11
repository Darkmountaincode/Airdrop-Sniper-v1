define(
  "ace/ext/menu_tools/settings_menu.css",
  ["require", "exports", "module"],
  function (e, t, n) {
    n.exports =
      "#ace_settingsmenu, #kbshortcutmenu {\n    background-color: #F7F7F7;\n    color: black;\n    box-shadow: -5px 4px 5px rgba(126, 126, 126, 0.55);\n    padding: 1em 0.5em 2em 1em;\n    overflow: auto;\n    position: absolute;\n    margin: 0;\n    bottom: 0;\n    right: 0;\n    top: 0;\n    z-index: 9991;\n    cursor: default;\n}\n\n.ace_dark #ace_settingsmenu, .ace_dark #kbshortcutmenu {\n    box-shadow: -20px 10px 25px rgba(126, 126, 126, 0.25);\n    background-color: rgba(255, 255, 255, 0.6);\n    color: black;\n}\n\n.ace_optionsMenuEntry:hover {\n    background-color: rgba(100, 100, 100, 0.1);\n    transition: all 0.3s\n}\n\n.ace_closeButton {\n    background: rgba(245, 146, 146, 0.5);\n    border: 1px solid #F48A8A;\n    border-radius: 50%;\n    padding: 7px;\n    position: absolute;\n    right: -8px;\n    top: -8px;\n    z-index: 100000;\n}\n.ace_closeButton{\n    background: rgba(245, 146, 146, 0.9);\n}\n.ace_optionsMenuKey {\n    color: darkslateblue;\n    font-weight: bold;\n}\n.ace_optionsMenuCommand {\n    color: darkcyan;\n    font-weight: normal;\n}\n.ace_optionsMenuEntry input, .ace_optionsMenuEntry button {\n    vertical-align: middle;\n}\n\n.ace_optionsMenuEntry button[ace_selected_button=true] {\n    background: #e7e7e7;\n    box-shadow: 1px 0px 2px 0px #adadad inset;\n    border-color: #adadad;\n}\n.ace_optionsMenuEntry button {\n    background: white;\n    border: 1px solid lightgray;\n    margin: 0px;\n}\n.ace_optionsMenuEntry button:hover{\n    background: #f0f0f0;\n}";
  },
),
  define(
    "ace/ext/menu_tools/overlay_page",
    [
      "require",
      "exports",
      "module",
      "ace/lib/dom",
      "ace/ext/menu_tools/settings_menu.css",
    ],
    function (e, t, n) {
      "use strict";
      var r = e("../../lib/dom"),
        i = e("./settings_menu.css");
      r.importCssString(i, "settings_menu.css", !1),
        (n.exports.overlayPage = function (t, n, r) {
          function o(e) {
            e.keyCode === 27 && u();
          }
          function u() {
            if (!i) return;
            document.removeEventListener("keydown", o),
              i.parentNode.removeChild(i),
              t && t.focus(),
              (i = null),
              r && r();
          }
          function a(e) {
            (s = e),
              e &&
                ((i.style.pointerEvents = "none"),
                (n.style.pointerEvents = "auto"));
          }
          var i = document.createElement("div"),
            s = !1;
          return (
            (i.style.cssText =
              "margin: 0; padding: 0; position: fixed; top:0; bottom:0; left:0; right:0;z-index: 9990; " +
              (t ? "background-color: rgba(0, 0, 0, 0.3);" : "")),
            i.addEventListener("click", function (e) {
              s || u();
            }),
            document.addEventListener("keydown", o),
            n.addEventListener("click", function (e) {
              e.stopPropagation();
            }),
            i.appendChild(n),
            document.body.appendChild(i),
            t && t.blur(),
            { close: u, setIgnoreFocusOut: a }
          );
        });
    },
  ),
  define(
    "ace/ext/modelist",
    ["require", "exports", "module"],
    function (e, t, n) {
      "use strict";
      function i(e) {
        var t = a.text,
          n = e.split(/[\/\\]/).pop();
        for (var i = 0; i < r.length; i++)
          if (r[i].supportsFile(n)) {
            t = r[i];
            break;
          }
        return t;
      }
      var r = [],
        s = function (e, t, n) {
          (this.name = e),
            (this.caption = t),
            (this.mode = "ace/mode/" + e),
            (this.extensions = n);
          var r;
          /\^/.test(n)
            ? (r =
                n.replace(/\|(\^)?/g, function (e, t) {
                  return "$|" + (t ? "^" : "^.*\\.");
                }) + "$")
            : (r = "^.*\\.(" + n + ")$"),
            (this.extRe = new RegExp(r, "gi"));
        };
      s.prototype.supportsFile = function (e) {
        return e.match(this.extRe);
      };
      var o = {
          ABAP: ["abap"],
          ABC: ["abc"],
          ActionScript: ["as"],
          ADA: ["ada|adb"],
          Alda: ["alda"],
          Apache_Conf: [
            "^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd",
          ],
          Apex: ["apex|cls|trigger|tgr"],
          AQL: ["aql"],
          AsciiDoc: ["asciidoc|adoc"],
          ASL: ["dsl|asl|asl.json"],
          Assembly_x86: ["asm|a"],
          AutoHotKey: ["ahk"],
          BatchFile: ["bat|cmd"],
          BibTeX: ["bib"],
          C_Cpp: ["cpp|c|cc|cxx|h|hh|hpp|ino"],
          C9Search: ["c9search_results"],
          Cirru: ["cirru|cr"],
          Clojure: ["clj|cljs"],
          Cobol: ["CBL|COB"],
          coffee: ["coffee|cf|cson|^Cakefile"],
          ColdFusion: ["cfm"],
          Crystal: ["cr"],
          CSharp: ["cs"],
          Csound_Document: ["csd"],
          Csound_Orchestra: ["orc"],
          Csound_Score: ["sco"],
          CSS: ["css"],
          Curly: ["curly"],
          D: ["d|di"],
          Dart: ["dart"],
          Diff: ["diff|patch"],
          Dockerfile: ["^Dockerfile"],
          Dot: ["dot"],
          Drools: ["drl"],
          Edifact: ["edi"],
          Eiffel: ["e|ge"],
          EJS: ["ejs"],
          Elixir: ["ex|exs"],
          Elm: ["elm"],
          Erlang: ["erl|hrl"],
          Forth: ["frt|fs|ldr|fth|4th"],
          Fortran: ["f|f90"],
          FSharp: ["fsi|fs|ml|mli|fsx|fsscript"],
          FSL: ["fsl"],
          FTL: ["ftl"],
          Gcode: ["gcode"],
          Gherkin: ["feature"],
          Gitignore: ["^.gitignore"],
          Glsl: ["glsl|frag|vert"],
          Gobstones: ["gbs"],
          golang: ["go"],
          GraphQLSchema: ["gql"],
          Groovy: ["groovy"],
          HAML: ["haml"],
          Handlebars: ["hbs|handlebars|tpl|mustache"],
          Haskell: ["hs"],
          Haskell_Cabal: ["cabal"],
          haXe: ["hx"],
          Hjson: ["hjson"],
          HTML: ["html|htm|xhtml|vue|we|wpy"],
          HTML_Elixir: ["eex|html.eex"],
          HTML_Ruby: ["erb|rhtml|html.erb"],
          INI: ["ini|conf|cfg|prefs"],
          Io: ["io"],
          Ion: ["ion"],
          Jack: ["jack"],
          Jade: ["jade|pug"],
          Java: ["java"],
          JavaScript: ["js|jsm|jsx|cjs|mjs"],
          JSON: ["json"],
          JSON5: ["json5"],
          JSONiq: ["jq"],
          JSP: ["jsp"],
          JSSM: ["jssm|jssm_state"],
          JSX: ["jsx"],
          Julia: ["jl"],
          Kotlin: ["kt|kts"],
          LaTeX: ["tex|latex|ltx|bib"],
          Latte: ["latte"],
          LESS: ["less"],
          Liquid: ["liquid"],
          Lisp: ["lisp"],
          LiveScript: ["ls"],
          Log: ["log"],
          LogiQL: ["logic|lql"],
          Logtalk: ["lgt"],
          LSL: ["lsl"],
          Lua: ["lua"],
          LuaPage: ["lp"],
          Lucene: ["lucene"],
          Makefile: ["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],
          Markdown: ["md|markdown"],
          Mask: ["mask"],
          MATLAB: ["matlab"],
          Maze: ["mz"],
          MediaWiki: ["wiki|mediawiki"],
          MEL: ["mel"],
          MIPS: ["s|asm"],
          MIXAL: ["mixal"],
          MUSHCode: ["mc|mush"],
          MySQL: ["mysql"],
          Nginx: ["nginx|conf"],
          Nim: ["nim"],
          Nix: ["nix"],
          NSIS: ["nsi|nsh"],
          Nunjucks: ["nunjucks|nunjs|nj|njk"],
          ObjectiveC: ["m|mm"],
          OCaml: ["ml|mli"],
          PartiQL: ["partiql|pql"],
          Pascal: ["pas|p"],
          Perl: ["pl|pm"],
          pgSQL: ["pgsql"],
          PHP_Laravel_blade: ["blade.php"],
          PHP: ["php|inc|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp|module"],
          Pig: ["pig"],
          Powershell: ["ps1"],
          Praat: ["praat|praatscript|psc|proc"],
          Prisma: ["prisma"],
          Prolog: ["plg|prolog"],
          Properties: ["properties"],
          Protobuf: ["proto"],
          Puppet: ["epp|pp"],
          Python: ["py"],
          QML: ["qml"],
          R: ["r"],
          Raku: ["raku|rakumod|rakutest|p6|pl6|pm6"],
          Razor: ["cshtml|asp"],
          RDoc: ["Rd"],
          Red: ["red|reds"],
          RHTML: ["Rhtml"],
          Robot: ["robot|resource"],
          RST: ["rst"],
          Ruby: ["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],
          Rust: ["rs"],
          SaC: ["sac"],
          SASS: ["sass"],
          SCAD: ["scad"],
          Scala: ["scala|sbt"],
          Scheme: ["scm|sm|rkt|oak|scheme"],
          Scrypt: ["scrypt"],
          SCSS: ["scss"],
          SH: ["sh|bash|^.bashrc"],
          SJS: ["sjs"],
          Slim: ["slim|skim"],
          Smarty: ["smarty|tpl"],
          Smithy: ["smithy"],
          snippets: ["snippets"],
          Soy_Template: ["soy"],
          Space: ["space"],
          SPARQL: ["rq"],
          SQL: ["sql"],
          SQLServer: ["sqlserver"],
          Stylus: ["styl|stylus"],
          SVG: ["svg"],
          Swift: ["swift"],
          Tcl: ["tcl"],
          Terraform: ["tf", "tfvars", "terragrunt"],
          Tex: ["tex"],
          Text: ["txt"],
          Textile: ["textile"],
          Toml: ["toml"],
          TSX: ["tsx"],
          Turtle: ["ttl"],
          Twig: ["twig|swig"],
          Typescript: ["ts|typescript|str"],
          Vala: ["vala"],
          VBScript: ["vbs|vb"],
          Velocity: ["vm"],
          Verilog: ["v|vh|sv|svh"],
          VHDL: ["vhd|vhdl"],
          Visualforce: ["vfp|component|page"],
          Wollok: ["wlk|wpgm|wtest"],
          XML: ["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],
          XQuery: ["xq"],
          YAML: ["yaml|yml"],
          Zeek: ["zeek|bro"],
          Django: ["html"],
        },
        u = {
          ObjectiveC: "Objective-C",
          CSharp: "C#",
          golang: "Go",
          C_Cpp: "C and C++",
          Csound_Document: "Csound Document",
          Csound_Orchestra: "Csound",
          Csound_Score: "Csound Score",
          coffee: "CoffeeScript",
          HTML_Ruby: "HTML (Ruby)",
          HTML_Elixir: "HTML (Elixir)",
          FTL: "FreeMarker",
          PHP_Laravel_blade: "PHP (Blade Template)",
          Perl6: "Perl 6",
          AutoHotKey: "AutoHotkey / AutoIt",
        },
        a = {};
      for (var f in o) {
        var l = o[f],
          c = (u[f] || f).replace(/_/g, " "),
          h = f.toLowerCase(),
          p = new s(h, c, l[0]);
        (a[h] = p), r.push(p);
      }
      n.exports = { getModeForPath: i, modes: r, modesByName: a };
    },
  ),
  define(
    "ace/ext/themelist",
    ["require", "exports", "module"],
    function (e, t, n) {
      "use strict";
      var r = [
        ["Chrome"],
        ["Clouds"],
        ["Crimson Editor"],
        ["Dawn"],
        ["Dreamweaver"],
        ["Eclipse"],
        ["GitHub"],
        ["IPlastic"],
        ["Solarized Light"],
        ["TextMate"],
        ["Tomorrow"],
        ["XCode"],
        ["Kuroir"],
        ["KatzenMilch"],
        ["SQL Server", "sqlserver", "light"],
        ["Ambiance", "ambiance", "dark"],
        ["Chaos", "chaos", "dark"],
        ["Clouds Midnight", "clouds_midnight", "dark"],
        ["Dracula", "", "dark"],
        ["Cobalt", "cobalt", "dark"],
        ["Gruvbox", "gruvbox", "dark"],
        ["Green on Black", "gob", "dark"],
        ["idle Fingers", "idle_fingers", "dark"],
        ["krTheme", "kr_theme", "dark"],
        ["Merbivore", "merbivore", "dark"],
        ["Merbivore Soft", "merbivore_soft", "dark"],
        ["Mono Industrial", "mono_industrial", "dark"],
        ["Monokai", "monokai", "dark"],
        ["Nord Dark", "nord_dark", "dark"],
        ["One Dark", "one_dark", "dark"],
        ["Pastel on dark", "pastel_on_dark", "dark"],
        ["Solarized Dark", "solarized_dark", "dark"],
        ["Terminal", "terminal", "dark"],
        ["Tomorrow Night", "tomorrow_night", "dark"],
        ["Tomorrow Night Blue", "tomorrow_night_blue", "dark"],
        ["Tomorrow Night Bright", "tomorrow_night_bright", "dark"],
        ["Tomorrow Night 80s", "tomorrow_night_eighties", "dark"],
        ["Twilight", "twilight", "dark"],
        ["Vibrant Ink", "vibrant_ink", "dark"],
      ];
      (t.themesByName = {}),
        (t.themes = r.map(function (e) {
          var n = e[1] || e[0].replace(/ /g, "_").toLowerCase(),
            r = {
              caption: e[0],
              theme: "ace/theme/" + n,
              isDark: e[2] == "dark",
              name: n,
            };
          return (t.themesByName[n] = r), r;
        }));
    },
  ),
  define(
    "ace/ext/options",
    [
      "require",
      "exports",
      "module",
      "ace/ext/menu_tools/overlay_page",
      "ace/lib/dom",
      "ace/lib/oop",
      "ace/config",
      "ace/lib/event_emitter",
      "ace/ext/modelist",
      "ace/ext/themelist",
    ],
    function (e, t, n) {
      "use strict";
      e("./menu_tools/overlay_page");
      var r = e("../lib/dom"),
        i = e("../lib/oop"),
        s = e("../config"),
        o = e("../lib/event_emitter").EventEmitter,
        u = r.buildDom,
        a = e("./modelist"),
        f = e("./themelist"),
        l = { Bright: [], Dark: [] };
      f.themes.forEach(function (e) {
        l[e.isDark ? "Dark" : "Bright"].push({
          caption: e.caption,
          value: e.theme,
        });
      });
      var c = a.modes.map(function (e) {
          return { caption: e.caption, value: e.mode };
        }),
        h = {
          Main: {
            Mode: { path: "mode", type: "select", items: c },
            Theme: { path: "theme", type: "select", items: l },
            Keybinding: {
              type: "buttonBar",
              path: "keyboardHandler",
              items: [
                { caption: "Ace", value: null },
                { caption: "Vim", value: "ace/keyboard/vim" },
                { caption: "Emacs", value: "ace/keyboard/emacs" },
                { caption: "Sublime", value: "ace/keyboard/sublime" },
                { caption: "VSCode", value: "ace/keyboard/vscode" },
              ],
            },
            "Font Size": {
              path: "fontSize",
              type: "number",
              defaultValue: 12,
              defaults: [
                { caption: "12px", value: 12 },
                { caption: "24px", value: 24 },
              ],
            },
            "Soft Wrap": {
              type: "buttonBar",
              path: "wrap",
              items: [
                { caption: "Off", value: "off" },
                { caption: "View", value: "free" },
                { caption: "margin", value: "printMargin" },
                { caption: "40", value: "40" },
              ],
            },
            "Cursor Style": {
              path: "cursorStyle",
              items: [
                { caption: "Ace", value: "ace" },
                { caption: "Slim", value: "slim" },
                { caption: "Smooth", value: "smooth" },
                { caption: "Smooth And Slim", value: "smooth slim" },
                { caption: "Wide", value: "wide" },
              ],
            },
            Folding: {
              path: "foldStyle",
              items: [
                { caption: "Manual", value: "manual" },
                { caption: "Mark begin", value: "markbegin" },
                { caption: "Mark begin and end", value: "markbeginend" },
              ],
            },
            "Soft Tabs": [
              { path: "useSoftTabs" },
              {
                ariaLabel: "Tab Size",
                path: "tabSize",
                type: "number",
                values: [2, 3, 4, 8, 16],
              },
            ],
            Overscroll: {
              type: "buttonBar",
              path: "scrollPastEnd",
              items: [
                { caption: "None", value: 0 },
                { caption: "Half", value: 0.5 },
                { caption: "Full", value: 1 },
              ],
            },
          },
          More: {
            "Atomic soft tabs": { path: "navigateWithinSoftTabs" },
            "Enable Behaviours": { path: "behavioursEnabled" },
            "Wrap with quotes": { path: "wrapBehavioursEnabled" },
            "Enable Auto Indent": { path: "enableAutoIndent" },
            "Full Line Selection": {
              type: "checkbox",
              values: "text|line",
              path: "selectionStyle",
            },
            "Highlight Active Line": { path: "highlightActiveLine" },
            "Show Invisibles": { path: "showInvisibles" },
            "Show Indent Guides": { path: "displayIndentGuides" },
            "Highlight Indent Guides": { path: "highlightIndentGuides" },
            "Persistent HScrollbar": { path: "hScrollBarAlwaysVisible" },
            "Persistent VScrollbar": { path: "vScrollBarAlwaysVisible" },
            "Animate scrolling": { path: "animatedScroll" },
            "Show Gutter": { path: "showGutter" },
            "Show Line Numbers": { path: "showLineNumbers" },
            "Relative Line Numbers": { path: "relativeLineNumbers" },
            "Fixed Gutter Width": { path: "fixedWidthGutter" },
            "Show Print Margin": [
              { path: "showPrintMargin" },
              {
                ariaLabel: "Print Margin",
                type: "number",
                path: "printMarginColumn",
              },
            ],
            "Indented Soft Wrap": { path: "indentedSoftWrap" },
            "Highlight selected word": { path: "highlightSelectedWord" },
            "Fade Fold Widgets": { path: "fadeFoldWidgets" },
            "Use textarea for IME": { path: "useTextareaForIME" },
            "Merge Undo Deltas": {
              path: "mergeUndoDeltas",
              items: [
                { caption: "Always", value: "always" },
                { caption: "Never", value: "false" },
                { caption: "Timed", value: "true" },
              ],
            },
            "Elastic Tabstops": { path: "useElasticTabstops" },
            "Incremental Search": { path: "useIncrementalSearch" },
            "Read-only": { path: "readOnly" },
            "Copy without selection": { path: "copyWithEmptySelection" },
            "Live Autocompletion": { path: "enableLiveAutocompletion" },
            "Custom scrollbar": { path: "customScrollbar" },
          },
        },
        p = function (e, t) {
          (this.editor = e),
            (this.container = t || document.createElement("div")),
            (this.groups = []),
            (this.options = {});
        };
      (function () {
        i.implement(this, o),
          (this.add = function (e) {
            e.Main && i.mixin(h.Main, e.Main),
              e.More && i.mixin(h.More, e.More);
          }),
          (this.render = function () {
            (this.container.innerHTML = ""),
              u(
                [
                  "table",
                  { role: "presentation", id: "controls" },
                  this.renderOptionGroup(h.Main),
                  [
                    "tr",
                    null,
                    [
                      "td",
                      { colspan: 2 },
                      [
                        "table",
                        { role: "presentation", id: "more-controls" },
                        this.renderOptionGroup(h.More),
                      ],
                    ],
                  ],
                  ["tr", null, ["td", { colspan: 2 }, "version " + s.version]],
                ],
                this.container,
              );
          }),
          (this.renderOptionGroup = function (e) {
            return Object.keys(e)
              .map(function (t, n) {
                var r = e[t];
                return (
                  r.position || (r.position = n / 1e4),
                  r.label || (r.label = t),
                  r
                );
              })
              .sort(function (e, t) {
                return e.position - t.position;
              })
              .map(function (e) {
                return this.renderOption(e.label, e);
              }, this);
          }),
          (this.renderOptionControl = function (e, t) {
            var n = this;
            if (Array.isArray(t))
              return t.map(function (t) {
                return n.renderOptionControl(e, t);
              });
            var r,
              i = n.getOption(t);
            t.values &&
              t.type != "checkbox" &&
              (typeof t.values == "string" && (t.values = t.values.split("|")),
              (t.items = t.values.map(function (e) {
                return { value: e, name: e };
              })));
            if (t.type == "buttonBar")
              r = [
                "div",
                { role: "group", "aria-labelledby": t.path + "-label" },
                t.items.map(function (e) {
                  return [
                    "button",
                    {
                      value: e.value,
                      ace_selected_button: i == e.value,
                      "aria-pressed": i == e.value,
                      onclick: function () {
                        n.setOption(t, e.value);
                        var r = this.parentNode.querySelectorAll(
                          "[ace_selected_button]",
                        );
                        for (var i = 0; i < r.length; i++)
                          r[i].removeAttribute("ace_selected_button"),
                            r[i].setAttribute("aria-pressed", !1);
                        this.setAttribute("ace_selected_button", !0),
                          this.setAttribute("aria-pressed", !0);
                      },
                    },
                    e.desc || e.caption || e.name,
                  ];
                }),
              ];
            else if (t.type == "number")
              (r = [
                "input",
                {
                  type: "number",
                  value: i || t.defaultValue,
                  style: "width:3em",
                  oninput: function () {
                    n.setOption(t, parseInt(this.value));
                  },
                },
              ]),
                t.ariaLabel
                  ? (r[1]["aria-label"] = t.ariaLabel)
                  : (r[1].id = e),
                t.defaults &&
                  (r = [
                    r,
                    t.defaults.map(function (e) {
                      return [
                        "button",
                        {
                          onclick: function () {
                            var t = this.parentNode.firstChild;
                            (t.value = e.value), t.oninput();
                          },
                        },
                        e.caption,
                      ];
                    }),
                  ]);
            else if (t.items) {
              var s = function (e) {
                  return e.map(function (e) {
                    return [
                      "option",
                      { value: e.value || e.name },
                      e.desc || e.caption || e.name,
                    ];
                  });
                },
                o = Array.isArray(t.items)
                  ? s(t.items)
                  : Object.keys(t.items).map(function (e) {
                      return ["optgroup", { label: e }, s(t.items[e])];
                    });
              r = [
                "select",
                {
                  id: e,
                  value: i,
                  onchange: function () {
                    n.setOption(t, this.value);
                  },
                },
                o,
              ];
            } else
              typeof t.values == "string" && (t.values = t.values.split("|")),
                t.values && (i = i == t.values[1]),
                (r = [
                  "input",
                  {
                    type: "checkbox",
                    id: e,
                    checked: i || null,
                    onchange: function () {
                      var e = this.checked;
                      t.values && (e = t.values[e ? 1 : 0]), n.setOption(t, e);
                    },
                  },
                ]),
                t.type == "checkedNumber" && (r = [r, []]);
            return r;
          }),
          (this.renderOption = function (e, t) {
            if (t.path && !t.onchange && !this.editor.$options[t.path]) return;
            var n = Array.isArray(t) ? t[0].path : t.path;
            this.options[n] = t;
            var r = "-" + n,
              i = n + "-label",
              s = this.renderOptionControl(r, t);
            return [
              "tr",
              { class: "ace_optionsMenuEntry" },
              ["td", ["label", { for: r, id: i }, e]],
              ["td", s],
            ];
          }),
          (this.setOption = function (e, t) {
            typeof e == "string" && (e = this.options[e]),
              t == "false" && (t = !1),
              t == "true" && (t = !0),
              t == "null" && (t = null),
              t == "undefined" && (t = undefined),
              typeof t == "string" &&
                parseFloat(t).toString() == t &&
                (t = parseFloat(t)),
              e.onchange
                ? e.onchange(t)
                : e.path && this.editor.setOption(e.path, t),
              this._signal("setOption", { name: e.path, value: t });
          }),
          (this.getOption = function (e) {
            return e.getValue ? e.getValue() : this.editor.getOption(e.path);
          });
      }).call(p.prototype),
        (t.OptionPanel = p);
    },
  );
(function () {
  window.require(["ace/ext/options"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
