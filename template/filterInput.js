define(['component/jade/util'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; } return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),placeholder = locals_.placeholder;
buf.push("<input" + (jade.attr("placeholder", placeholder, true, false)) + " class=\"grid-filter-input\"/><button class=\"filter_search_icon_small\"></button>");;return buf.join("");
}});