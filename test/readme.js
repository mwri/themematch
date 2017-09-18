(function () {


"use strict";


let themematch;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	themematch = require('./../dist/themematch.js');
	require('chai-jasmine');
} else {
	themematch = window.themematch;
}


describe('setup', function () {

	let tm;

	it('bit by bit', function () {

		tm = new themematch();

		tm.add_theme({ name: 'dark', backgrounds: [ '#000000' ], foregrounds: [ '#ffffff' ] });
		tm.add_theme({ name: 'light', backgrounds: [ '#ffffff' ], foregrounds: [ '#000000' ] });
		tm.add_theme({ name: 'sunset', backgrounds: [ '#ffffaa' ], foregrounds: [ '#990000' ] });
		tm.add_theme({ name: 'ocean', backgrounds: [ '#aaffdd' ], foregrounds: [ '#006600' ] });

		let sidebar_tm = tm.add_sub({
			name: 'sidebar',
			themes: [
				{ name: 'sb_normal', backgrounds: [ '#dddddd' ], foregrounds: [ '#333333' ] },
				{ name: 'sb_inverse', backgrounds: [ '#333333' ], foregrounds: [ '#eeeeee' ] },
				{ name: 'sb_muddy', backgrounds: [ '#eeee66' ], foregrounds: [ '#991111' ] },
			],
		});
		let feature_tm = tm.add_sub({
			name: 'feature',
			themes: [
				{ name: 'f_dark', backgrounds: [ '#222222' ], foregrounds: [ '#dddddd' ] },
				{ name: 'f_light', backgrounds: [ '#dddddd' ], foregrounds: [ '#222222' ] },
				{ name: 'f_muddy', backgrounds: [ '#aaeebb' ], foregrounds: [ '#992200' ] },
				{ name: 'f_watery', backgrounds: [ '#99eecc' ], foregrounds: [ '#227744' ] },
			],
		});

	});

	['dark','light','sunset','ocean'].map((selection) => {
		it('select '+selection+' works', function () {

			let themes = tm.select(selection);
			expect(themes.length).toBe(3);

		});
	});

	it('all in one go', function () {

		tm = new themematch({
			themes: [
				{ name: 'dark', backgrounds: [ '#000000' ], foregrounds: [ '#ffffff' ] },
				{ name: 'light', backgrounds: [ '#ffffff' ], foregrounds: [ '#000000' ] },
				{ name: 'sunset', backgrounds: [ '#ffffaa' ], foregrounds: [ '#990000' ] },
				{ name: 'ocean', backgrounds: [ '#aaffdd' ], foregrounds: [ '#006600' ] },
			],
			subs: [
				{ name: 'sidebar',
					themes: [
						{ name: 'sb_normal', backgrounds: [ '#dddddd' ], foregrounds: [ '#333333' ] },
						{ name: 'sb_inverse', backgrounds: [ '#333333' ], foregrounds: [ '#eeeeee' ] },
						{ name: 'sb_muddy', backgrounds: [ '#eeee66' ], foregrounds: [ '#991111' ] },
					] },
				{ name: 'feature',
					themes: [
						{ name: 'f_dark', backgrounds: [ '#222222' ], foregrounds: [ '#dddddd' ] },
						{ name: 'f_light', backgrounds: [ '#dddddd' ], foregrounds: [ '#222222' ] },
						{ name: 'f_muddy', backgrounds: [ '#aaeebb' ], foregrounds: [ '#992200' ] },
						{ name: 'f_watery', backgrounds: [ '#99eecc' ], foregrounds: [ '#227744' ] },
					] },
			],
		});

	});

	['dark','light','sunset','ocean'].map((selection) => {
		it('select '+selection+' works', function () {

			let themes = tm.select(selection);
			expect(themes.length).toBe(3);

		});
	});

});


})();
