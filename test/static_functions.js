(function () {


"use strict";


let themematch;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	themematch = require('./../dist/themematch.js');
	require('chai-jasmine');
} else {
	themematch = window.themematch;
}

let assert_theme_valid = themematch.prototype.assert_theme_valid;
let colset_to_rgb      = themematch.prototype.colset_to_rgb;
let col_cmp            = themematch.prototype.col_cmp;


describe('assert_theme_valid', function() {

	it('requires name', function() {
		try {
			assert_theme_valid({
				backgrounds: [ '#ffffff' ],
				foregrounds: [ '#ffffff' ],
			});
			throw new Error('no exception for theme without name');
		} catch (err) {
			if (!/must have name/.exec(err))
				throw err;
		}
	});

	it('requires backgrounds value', function() {
		try {
			assert_theme_valid({
				name: 'white on white',
				foregrounds: [ '#ffffff' ],
			});
			throw new Error('no exception for theme without backgrounds');
		} catch (err) {
			if (!/must have backgrounds/.exec(err))
				throw err;
		}
	});

	it('requires backgrounds non empty array', function() {
		try {
			assert_theme_valid({
				name: 'white on white',
				backgrounds: [],
				foregrounds: [ '#ffffff' ],
			});
			throw new Error('no exception for theme without backgrounds');
		} catch (err) {
			if (!/must have backgrounds/.exec(err))
				throw err;
		}
	});

	it('requires foregrounds value', function() {
		try {
			assert_theme_valid({
				name: 'white on white',
				backgrounds: [ '#ffffff' ],
			});
			throw new Error('no exception for theme without foregrounds');
		} catch (err) {
			if (!/must have foregrounds/.exec(err))
				throw err;
		}
	});

	it('requires foregrounds non empty array', function() {
		try {
			assert_theme_valid({
				name: 'white on white',
				backgrounds: [ '#ffffff' ],
				foregrounds: [],
			});
			throw new Error('no exception for theme without foregrounds');
		} catch (err) {
			if (!/must have foregrounds/.exec(err))
				throw err;
		}
	});

	it('returns theme', function() {
		let theme = {
			name: 'white on white',
			backgrounds: [ '#ffffff' ],
			foregrounds: [ '#ffffff' ],
		};
		let rv = assert_theme_valid(theme);
		expect(rv).toBe(theme);
	});

});


describe('colset_to_rgb', function() {

	it('returns rgb for single col', function() {
		let rgb = colset_to_rgb(['#405060']);
		expect(rgb.constructor).toBe(Array);
		expect(rgb.length).toBe(3);
		expect(typeof rgb[0]).toBe('number');
		expect(typeof rgb[1]).toBe('number');
		expect(typeof rgb[2]).toBe('number');
	});

	it('returns rgb for multiple cols', function() {
		let rgb = colset_to_rgb(['#405060','#3070b0']);
		expect(rgb.constructor).toBe(Array);
		expect(rgb.length).toBe(3);
		expect(typeof rgb[0]).toBe('number');
		expect(typeof rgb[1]).toBe('number');
		expect(typeof rgb[2]).toBe('number');
	});

	it('returns rgb of available col for single col', function() {
		let rgb = colset_to_rgb(['#405060']);
		expect(rgb).toEqual([64, 80, 96]);
	});

	it('returns rgb double weighting first col for two cols', function() {
		let rgb = colset_to_rgb(['#405060','#3070b0']);
		expect(rgb).toEqual([176/3, 272/3, 368/3]);
	});

});


describe('col_cmp', function() {

	it('black and black difference is 0', function() {
		expect(col_cmp([0, 0, 0], [0, 0, 0])).toEqual(0);
	});

	it('white and white difference is 0', function() {
		expect(col_cmp([255, 255, 255], [255, 255, 255])).toEqual(0);
	});

	it('green and green difference is 0', function() {
		expect(col_cmp([0, 255, 0], [0, 255, 0])).toEqual(0);
	});

	it('black and white difference is 1', function() {
		expect(col_cmp([0, 0, 0], [255, 255, 255])).toEqual(1);
	});

	it('red and blue difference is 2/3', function() {
		expect(col_cmp([255, 0, 0], [0, 0, 255])).toEqual(2/3);
	});

});


})();
