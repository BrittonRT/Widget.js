Widget.js
=========

An extensible UI component, utilizing Class.js to allow for simple, stateful, easily programmable DOM structures.

Requires <a href="https://github.com/BrittonRT/Class.js">Class.js</a>, <a href="https://github.com/BrittonRT/Node.fragment.js">Node.fragment.js</a> is recommended.

<pre>
USAGE:  // note, this example uses Node.fragment.js
	
	new Widget(
		div(
			{ id: 'myWidget' },
			p('This is a widget'),
			button('I am a button')
		)
	).show(document.body);
</pre>