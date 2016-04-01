define(['component/jade/util'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; } return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),text = locals_.text;
buf.push("<div class=\"anchor dropdown-submenu-item\"><span>" + (jade.escape(null == (jade_interp = text || '') ? "" : jade_interp)) + "</span><span class=\"spritedimage grid-expand-icon pull-right\"></span><ul class=\"dropdown-submenu hidden\"></ul></div>");;return buf.join("");
}});