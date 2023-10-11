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
    "ace/ext/menu_tools/get_editor_keyboard_shortcuts",
    ["require", "exports", "module", "ace/lib/keys"],
    function (e, t, n) {
      "use strict";
      var r = e("../../lib/keys");
      n.exports.getEditorKeybordShortcuts = function (e) {
        var t = r.KEY_MODS,
          n = [],
          i = {};
        return (
          e.keyBinding.$handlers.forEach(function (e) {
            var t = e.commandKeyBinding;
            for (var r in t) {
              var s = r.replace(/(^|-)\w/g, function (e) {
                  return e.toUpperCase();
                }),
                o = t[r];
              Array.isArray(o) || (o = [o]),
                o.forEach(function (e) {
                  typeof e != "string" && (e = e.name),
                    i[e]
                      ? (i[e].key += "|" + s)
                      : ((i[e] = { key: s, command: e }), n.push(i[e]));
                });
            }
          }),
          n
        );
      };
    },
  ),
  define(
    "ace/ext/keybinding_menu",
    [
      "require",
      "exports",
      "module",
      "ace/editor",
      "ace/ext/menu_tools/overlay_page",
      "ace/ext/menu_tools/get_editor_keyboard_shortcuts",
    ],
    function (e, t, n) {
      "use strict";
      function i(t) {
        if (!document.getElementById("kbshortcutmenu")) {
          var n = e("./menu_tools/overlay_page").overlayPage,
            r = e(
              "./menu_tools/get_editor_keyboard_shortcuts",
            ).getEditorKeybordShortcuts,
            i = r(t),
            s = document.createElement("div"),
            o = i.reduce(function (e, t) {
              return (
                e +
                '<div class="ace_optionsMenuEntry"><span class="ace_optionsMenuCommand">' +
                t.command +
                "</span> : " +
                '<span class="ace_optionsMenuKey">' +
                t.key +
                "</span></div>"
              );
            }, "");
          (s.id = "kbshortcutmenu"),
            (s.innerHTML = "<h1>Keyboard Shortcuts</h1>" + o + "</div>"),
            n(t, s);
        }
      }
      var r = e("../editor").Editor;
      n.exports.init = function (e) {
        (r.prototype.showKeyboardShortcuts = function () {
          i(this);
        }),
          e.commands.addCommands([
            {
              name: "showKeyboardShortcuts",
              bindKey: { win: "Ctrl-Alt-h", mac: "Command-Alt-h" },
              exec: function (e, t) {
                e.showKeyboardShortcuts();
              },
            },
          ]);
      };
    },
  );
(function () {
  window.require(["ace/ext/keybinding_menu"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
