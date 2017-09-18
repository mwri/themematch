(function () {


"use strict";


let themematch;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	themematch = require('./../dist/themematch.js');
	require('chai-jasmine');
} else {
	themematch = window.themematch;
}


let tm;


describe('select', function () {

	it('setup', function () {

		tm = new themematch({
			themes: [
				{ name: 'dark', backgrounds: [ '#000000' ], foregrounds: [ '#ffffff' ], },
				{ name: 'light', backgrounds: [ '#ffffff' ], foregrounds: [ '#000000' ], },
				{ name: 'sunset', backgrounds: [ '#ffffaa' ], foregrounds: [ '#990000' ], },
				{ name: 'ocean', backgrounds: [ '#aaffdd' ], foregrounds: [ '#006600' ], },
			],
			subs: [
				{ name: 'sidebar', themes: [
					{ name: 'sb_normal', backgrounds: [ '#dddddd' ], foregrounds: [ '#333333' ], },
					{ name: 'sb_inverse', backgrounds: [ '#333333' ], foregrounds: [ '#eeeeee' ], },
					] },
				{ name: 'topbar', themes: [
					{ name: 'tb_normal', backgrounds: [ '#eeeeee' ], foregrounds: [ '#222222' ], },
					{ name: 'tb_grey', backgrounds: [ '#bbbbbb' ], foregrounds: [ '#555555' ], },
					] },
				{ name: 'feature',
					themes: [
						{ name: 'f_dark', backgrounds: [ '#222222' ], foregrounds: [ '#dddddd' ], },
						{ name: 'f_light', backgrounds: [ '#dddddd' ], foregrounds: [ '#222222' ], },
						{ name: 'f_muddy', backgrounds: [ '#aaeebb' ], foregrounds: [ '#992200' ], },
						{ name: 'f_watery', backgrounds: [ '#99eecc' ], foregrounds: [ '#227744' ], },
					],
					subs: [
						{ name: 'widget', themes: [
							{ name: 'w_greyred', backgrounds: [ '#606060' ], foregrounds: [ '#ff1111' ], },
							{ name: 'w_greygreen', backgrounds: [ '#808080' ], foregrounds: [ '#00ee00' ], },
							{ name: 'w_greyblue', backgrounds: [ '#808080' ], foregrounds: [ '#2222ff' ], },
							] },
					] },
			],
		});

	});

});


describe('select', function () {

	it('throws an exception selecting unknown theme', function () {

		try {
			let theme_set = tm.select('four oh four');
			throw new Error('no exception selecting unknown theme');
		} catch (err) {
			if (!/not registered\/known/.exec(err))
				throw err;
		}

	});

	it('finds good matches for dark theme', function () {

		let theme_set = tm.select('dark');
		expect(
			theme_set.map(function (t) { return t.name; })
		).toEqual([
			'dark',
			'sb_inverse',
			'tb_grey',
			'f_dark',
			'w_greyred',
		]);

	});

	it('finds good matches for light theme', function () {

		let theme_set = tm.select('light');
		expect(
			theme_set.map(function (t) { return t.name; })
		).toEqual([
			'light',
			'sb_normal',
			'tb_normal',
			'f_light',
			'w_greyblue',
		]);

	});

	it('finds good matches for sunset theme', function () {

		let theme_set = tm.select('sunset');
		expect(
			theme_set.map(function (t) { return t.name; })
		).toEqual([
			'sunset',
			'sb_normal',
			'tb_normal',
			'f_muddy',
			'w_greyred',
		]);

	});

	it('finds good matches for ocean theme', function () {

		let theme_set = tm.select('ocean');
		expect(
			theme_set.map(function (t) { return t.name; })
		).toEqual([
			'ocean',
			'sb_normal',
			'tb_normal',
			'f_watery',
			'w_greygreen',
		]);

	});

});


})();
