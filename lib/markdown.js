module.exports = function (RED) {
  const { Marked } = require("marked");
  const { markedHighlight } = require("marked-highlight");
  const hljs = require("highlight.js");

  function Markdown(config) {
    RED.nodes.createNode(this, config);
    var self = this;
    self.language = config.language;

    this.on("input", function (msg) {
      var marked = new Marked(
        markedHighlight({
          langPrefix: "hljs language-",
          highlight(code, lang, info) {
            var language = hljs.getLanguage(self.language) ? self.language : "javascript";
            return hljs.highlight(code, { language }).value;
          },
        })
      );

      msg.payload = marked.parse(msg.payload);
      self.send(msg);
    });
  }

  RED.nodes.registerType("markdown", Markdown);
};
