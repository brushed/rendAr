/*
---
script: rendAr.js
version: v0.4
description: rendAr utilises the Mootools Slick engine to generate DOM objects from clean, elegant templates.
license: MIT-style
download: http://mootools.net/forge/p/rendar/v0.1
source: https://github.com/Mr5o1/rendAr
demo: http://leviwheatcroft.com/rendAr/demo.htm

authors:
- Levi Wheatcroft (leviwheatcroft.com)

provides:
- Array.rendAr

requires:
- core/1.3.0:Element
- core/1.3.0:Elements
- core/1.3.0:Array

...
*/
Element.Properties.attach = {

	//Usage:
	//	new Element('div',{ attach:this });		//this.element now refers to div
	//	new Element('div',{ attach:[this] });	//this.element now refers to div
	//	new Element('div',{ attach:[this,'myproperty'] }); //this.myproperty now refers to div
	//	['div',{attach:[this,'myproperty'] }].rendAr();

	set: function( object ){
		if(!object[0]) object = [object];
		object[0][ object[1] || 'element' ] = this;
	}

};


Array.implement({

    rendAr: function() {
      var elements = [],type;
        this.each( function(item){
            type = typeOf(item);
            if ( type == 'elements' ) elements.append(item);
            else if ( item.grab /*isElement*/ ) elements.push(item);
            else if ( item.big  /*isString*/ ) elements.push(new Element(item));
            else if ( type == 'object' ) elements.getLast().set(item);
            else if ( item.pop /*isArray*/ ) elements.getLast().adopt(item.rendAr());
         });
      return elements[1] ? new Elements(elements) : elements[0];
   }

});
