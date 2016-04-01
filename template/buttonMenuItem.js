define(['component/jade/util'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; } return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),text = locals_.text,linkText = locals_.linkText;
jade_mixins["generateTitle"] = function(text, linkText){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if ( linkText)
{
buf.push("<span class=\"primary\">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</span><a class=\"secondary text-right\">" + (jade.escape(null == (jade_interp = linkText) ? "" : jade_interp)) + "</a>");
}
else
{
buf.push(jade.escape(null == (jade_interp = text) ? "" : jade_interp));
}
};
buf.push("<div class=\"anchor\">");
jade_mixins["generateTitle"](text, linkText);
buf.push("</div>");;return buf.join("");
}});