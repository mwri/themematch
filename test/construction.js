(function () {


"use strict";


let themematch;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	themematch = require('./../lib/themematch.js');
	require('chai-jasmine');
} else {
	themematch = window.themematch;
}


describe('constructor', function () {

	it('succeeds with no parameters', function () {
		let tm = new themematch();
		expect(tm.get_themes()).toEqual([]);
		expect(tm.get_subs()).toEqual([]);
	});

	it('succeeds with empty parameters', function () {
		let tm = new themematch({});
		expect(tm.get_themes()).toEqual([]);
		expect(tm.get_subs()).toEqual([]);
	});

	it('succeeds with themes parameter (and theme added)', function () {
		let tm = new themematch({
			themes: [
				{ name: 'name', backgrounds: [ 'red' ], foregrounds: [ 'green' ] },
			],
		});
		expect(tm.get_themes().map(function (t) { return t.name; })).toEqual(['name']);
		expect(tm.get_subs()).toEqual([]);
	});

	it('succeeds with subs parameter (and sub added)', function () {
		let tm = new themematch({
			subs: [
				{ name: 'name' },
			],
		});
		expect(tm.get_themes()).toEqual([]);
		expect(tm.get_subs().map(function (s) { return s.name(); })).toEqual(['name']);
	});

});


describe('add_theme', function () {

	it('succeeds', function () {
		let tm = new themematch();
		tm.add_theme({
			name:        'name',
			backgrounds: [ 'red' ],
			foregrounds: [ 'green' ]
		});
		expect(tm.get_themes().map(function (t) { return t.name; })).toEqual(['name']);
		expect(tm.get_themes('name').name).toEqual('name');
	});

});


describe('add_sub', function () {

	it('succeeds', function () {
		let tm = new themematch();
		tm.add_sub({
			name: 'name',
		});
		expect(tm.get_subs().map(function (s) { return s.name(); })).toEqual(['name']);
		expect(tm.get_subs('name').name()).toEqual('name');
	});

	it('throws error when name is missing', function () {
		let tm = new themematch();
		try {
			tm.add_sub({
			});
			throw new Error('error should have been thrown for missing name');
		} catch (err) {
			if (!/must have a name/.exec(err))
				throw err;
		}
	});

});


})();
