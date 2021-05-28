// const fs = require('fs')
// const path = require('path')
const serveStatic = require('serve-static')

let StaticInitFunc = function (RED) {
  function StaticNode(n) {
    RED.nodes.createNode(this, n)

    const node = this
    const folder = n.folder
    
    const serve = serveStatic(folder, { index: ["index.html", "index.htm"] })


    node.on("input", function (msg) {
      const req = msg.req
      const res = msg.res._res
      req.pathname = req.path = req.url = `/${Object.values(req.params)[0]}`
      serve(req, res, function (t) {
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("static", StaticNode);
};

module.exports = StaticInitFunc;
