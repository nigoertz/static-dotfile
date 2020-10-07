let serveStatic = require("serve-static");

let StaticInitFunc = function (RED) {
  function StaticNode(n) {
    RED.nodes.createNode(this, n);

    var node = this;
    var folder = n.folder;
    var serve = serveStatic(folder, {
      index: ["index.html", "index.htm"],
    });

    node.on("input", function (msg) {
      let {
        req,
        res: { _res },
      } = msg;
      let _req = Object.assign({}, req);
      _req.pathname = _req.path = _req.url = `/${req.path
        .replace(req.baseUrl, "")
        .replace(req.path.match(_req.route.path)[0], "")}`;
      serve(_req, _res, function () {
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("static", StaticNode);
};

module.exports = StaticInitFunc;
