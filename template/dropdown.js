define(['component/jade/util'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; } return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),leftIconClass = locals_.leftIconClass,title = locals_.title,isShowRightIcon = locals_.isShowRightIcon,rightIconClass = locals_.rightIconClass;
buf.push("<div type=\"button\" data-toggle=\"dropdown\" class=\"grid-menu-container grid-colchooser dropdown-toggle\">");
if ( leftIconClass != null)
{
buf.push("<span" + (jade.cls(["spritedimage toolbar-icon toolbar-icon-left " + leftIconClass], [true])) + "></span>");
}
buf.push("<span class=\"grid-menu\">" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</span>");
if ( isShowRightIcon)
{
buf.push("<span" + (jade.cls(["spritedimage toolbar-icon " + (rightIconClass || "icon-arrowdown-normal")], [true])) + "></span>");
}
buf.push("</div><ul class=\"dropdown-menu\"></ul>");;return buf.join("");
}});