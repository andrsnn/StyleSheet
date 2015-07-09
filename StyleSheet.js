define(function(require){

	return function StyleSheet(options){

		var sheet = (function() {
	        // Create the <style> tag
	        var style = document.createElement("style");

	        // Add a media (and/or media query) here if you'd like!
	        // style.setAttribute("media", "screen")
	        // style.setAttribute("media", "only screen and (max-width : 1024px)")

	        // WebKit hack :(
	        style.appendChild(document.createTextNode(""));

	        // Add the <style> element to the page
	        document.head.appendChild(style);

	        return style.sheet;
    	})();



		if (options){
			if (options.existing){

			}
		}

		var Styles = [];

		var HardcodedStyles = [

			"accelerator", "azimuth", "background", "background-attachment", "background-color", "background-image", "background-position", "background-position-x", "background-position-y", "background-repeat", "behavior", "border", "border-bottom", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-style", "border-top-width", "border-width", "bottom   ", "caption-side", "clear", "clip", "color", "content", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "elevation", "empty-cells ", "filter", "float", "font", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "height", "ime-mode", "include-source", "layer-background-color", "layer-background-image", "layout-flow", "layout-grid", "layout-grid-char", "layout-grid-char-spacing", "layout-grid-line", "layout-grid-mode", "layout-grid-type", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "max-height", "max-width", "min-height", "min-width", "-moz-binding", "-moz-border-radius", "-moz-border-radius-topleft", "-moz-border-radius-topright", "-moz-border-radius-bottomright", "-moz-border-radius-bottomleft", "-moz-border-top-colors", "-moz-border-right-colors", "-moz-border-bottom-colors", "-moz-border-left-colors", "-moz-opacity", "-moz-outline", "-moz-outline-color", "-moz-outline-style", "-moz-outline-width", "-moz-user-focus", "-moz-user-input", "-moz-user-modify", "-moz-user-select", "orphans", "outline", "outline-color", "outline-style", "outline-width", "overflow", "overflow-X", "overflow-Y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "pitch", "pitch-range", "play-during", "position", "quotes", "-replace", "richness", "right", "ruby-align", "ruby-overhang", "ruby-position", "-set-link-source", "size", "speak", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "table-layout", "text-align", "text-align-last", "text-decoration", "text-indent", "text-justify", "text-overflow", "text-shadow", "text-transform", "text-autospace", "text-kashida-space", "text-underline-position", "top", "unicode-bidi", "-use-link-source", "vertical-align", "visibility", "voice-family", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom"

		];

		Object.defineProperty(this, 'allStyles', {
		    get: function() {
		      
		      return HardcodedStyles;
		    }
		  });

		var Attribute = function(attr){
			this.attr = attr;
			this.alias = "";
			this.rules = {};
		}

		this.getStyle = function(){
			return Styles;
		}

		var buildRules = function(attr,obj){
			var newRule = attr + " { ";
				for (var sub in obj){
					newRule += sub + ":" + obj[sub] + "; ";
				}
			newRule += " } ";
			return newRule;
		}

		StyleSheet.prototype.findStyleAttr = function(attr){
			var rules = sheet.rules;
			var found = {found: null, index: null}
			for (var i = 0; i < rules.length; i++) {
				if (attr == rules[i].selectorText){
					found.found = rules[i];
					found.index = i;
				}
				
			}
			return found;
		}

		StyleSheet.prototype.findAttr = function(attr){
			var found = {found:null, index:null};
			for (var i = 0; i < Styles.length; i++) {
				if (Styles[i].attr = attr){
					found.found = Styles[i];
					found.index = i;
				}
			}
			return found;
		}


		StyleSheet.prototype.addAttribute = function(attr, callback){
			if (typeof attr === "undefined"
				|| attr.length === 0){

				return callback(new Error("Attribute must be defined."));
			}
			
			Styles.push(new Attribute(attr));
//			Styles[attr] = {};
			var insert = attr + " { }";
			sheet.insertRule(insert,0);
			console.log(sheet);
			
			//sheet.insertRule("kiosk-controller::shadow kiosk-pager { background-color:red; }", 0);			
			callback(null, true, "Success.");

		}

		StyleSheet.prototype.removeAttribute = function(attr, callback){
			if (typeof attr === "undefined"
				|| attr.length === 0){
				return callback(new Error("Attribute must be defined."));
			}
			

			sheet.deleteRule(this.findStyleAttr(Styles[attr]).index);
			//index, 
			Styles.splice(this.findAttr(attr).index ,1);
			console.log(sheet, Styles);
			//delete Styles[attr];
			callback(null, true, "Attribute Deleted.");

		}

		//overwrites rule
		StyleSheet.prototype.addRule = function(attr, rule, callback){
			if (typeof attr === "undefined"
				|| attr.length === 0){
				return callback(new Error("Attribute must be defined."));
			}
			if (typeof rule === "undefined"
				|| rule.length === 0){
				return callback(new Error("Rule must be defined."));
			}

			var attribute = this.findAttr(attr).found;
			if (typeof attribute === "undefined"){
				callback(null, false, "Attribute Not Found.");
			}
			else {
				for (var sub in rule){
					attribute.rules[sub] = rule[sub];
				}	

								
				sheet.deleteRule(this.findStyleAttr(attr).index);
				sheet.insertRule(buildRules(attr,attribute.rules), 0);
				
				callback(null, true, "Success.");

			}
		}

		StyleSheet.prototype.removeRule = function(attr,rule,callback){
			if (typeof attr === "undefined"
				|| attr.length === 0){
				return callback(new Error("Attribute must be defined."));
			}
			if (typeof rule === "undefined"
				|| rule.length === 0){
				return callback(new Error("Rule must be defined."));
			}

			var attribute = this.findAttr(attr);
			if (typeof attribute === "undefined"){
				callback(null, false, "Attribute Not Found.");
			}
			else {
				
				sheet.deleteRule(this.findStyleAttr(attribute.found).index);

				var key,value;
				for (var key in rule){
					value = rule[key];
				}

				delete attribute.found.rules[key];
				sheet.insertRule(buildRules(attr,attribute.found.rules), 0);

				callback(null, true, "Success.");
			}
		}

		//StyleSheet.prototype.addAlias = function()

		StyleSheet.prototype.set = function(obj, callback){

		}

		StyleSheet.prototype.buildFileString = function(callback){
			var ret;
			
			
			if (callback){

			}
			else {
				return ret;
			}
		}


}

});