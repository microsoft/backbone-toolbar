define(['component/jade/util'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; } return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),leftIconClass = locals_.leftIconClass,classes = locals_.classes,text = locals_.text;
if ( leftIconClass)
{
classes = ['spritedimage', 'toolbar-icon', 'toolbar-icon-left', leftIconClass]
buf.push("<span" + (jade.cls([classes], [true])) + "></span>");
}
buf.push("<input type=\"button\"" + (jade.attr("value", text || '', true, false)) + " class=\"grid-menu\"/>");;return buf.join("");
}});