;Widget = (function() {
		'use strict';
		/* -- CONSTRUCTOR -- */
		var Widget = Class.extend(function(options) {
				/* Initialize variables */
				this.isWidget      = true;
				this.isReady       = false;
				this.isVisible     = false;
				this.fragment      = null;
				this.rootElement   = null;
				this.parentElement = null;
				this.elements = {};
				this.classes  = ['widget'];
				
				/* Set options */
				this.setOptions(options||{});
			}),
			_prototype;
		_prototype = Widget.prototype;
		/* -- PUBLIC -- */
		_prototype.setOptions = function(options) {
			if (typeof options == 'object') {
				if (options.nodeName) this.setFragment(options);
			}
			this.__applyClassNames();
			return this;
		}
		_prototype.setFragment = function(el) {
			if (el.nodeType == 11)
				this.fragment = el;
			else {
				this.fragment = document.createDocumentFragment();
				this.fragment.appendChild(el);
			}
			if (this.fragment.childNodes.length)
				this.setRootElement(this.fragment.firstChild);
			return this;
		}
		_prototype.setRootElement = function(el) {
			this.rootElement = el;
			this.__parseClassNames();
			return this;
		}
		_prototype.append = function(elem) {
			elem.appendChild(this.fragment);
			this.parentElement = elem;
			this.fragment = null;
			return this;
		}
		_prototype.appendTo = function(elem) {
			elem.appendChild(this.fragment);
			this.parentElement = elem;
			this.fragment = null;
			return this;
		}
		_prototype.prependTo = function(elem) {
			if (elem.childNodes.length)
				elem.insertBefore(this.fragment, elem.firstChild);
			else
				elem.appendChild(this.fragment);
			this.parentElement = elem;
			this.fragment = false;
			return this;
		}
		_prototype.show = function(parent, callback, animate) {
			var _widget = this;
			if (typeof parent == 'function')
				callback = parent;
			if (callback === false) animate = false;
			callback = callback || function(){};
			if (this.isVisible) callback();
			else {
				if (parent) this.appendTo(parent);
				if (this.parentElement && animate !== false) {
					this.__setVisible();
					callback();
				} else {
					this.__setVisible();
					callback();
				}
			}
			return this;
		}
		_prototype.hide = function(callback, animate) {
			var _widget = this;
			callback = callback || function(){};
			if (callback === false) animate = false;
			if (!this.isVisible) callback();
			else {
				if (this.parentElement && animate !== false) {
					this.__setHidden();
					callback();
				} else {
					this.__setHidden();
					callback();
				}
			}
			return this;
		}
		_prototype.remove = function(callback, animate) {
			var _widget  = this;
			if (callback === false) animate = false;
			callback = callback || function(){};
			if (this.parentElement) {
				this.hide(function() {
					_widget.parentElement.removeChild(_widget.rootElement);
					_widget.parentElement = false;
					callback();
				}, animate);
			} else {
				callback();
			}
			return this;
		}
		_prototype.addClass = function(className) {
			if (this.classes.indexOf(className) === -1) this.classes.push(className);
			return this.__applyClassNames();
		}
		_prototype.removeClass = function(className) {
			var i = this.classes.indexOf(className);
			if (i !== -1) this.classes.splice(i, 1);
			return this.__applyClassNames();
		}
		/* -- PRIVATE -- */
		_prototype.__setHidden = function() {
			this.isVisible = false;
			return this.addClass('hidden');
		}
		_prototype.__setVisible = function() {
			this.isVisible = true;
			return this.removeClass('hidden');
		}
		_prototype.__applyClassNames = function() {
			this.rootElement.className = this.classes.join(' ')+(this.isVisible ? '' : ' hidden');
			return this;
		}
		_prototype.__parseClassNames = function() {
			var classes = this.rootElement.className.split(' ');
			for (var i in classes) {
				this.addClass(classes[i].trim());
			}
			return this;
		}
		/* -- RETURN -- */
		return Widget;
	})();
	
	
	/*
	
	USAGE:
	
		new Widget(
			div(
				{ id: 'myWidget' },
				p('This is a widget'),
				button('I am a button')
			)
		).show(document.body);
	
	
	*/
	
	