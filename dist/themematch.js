// Package: themematch v1.0.2 (built 2017-10-06 16:36:23)
// Copyright: (C) 2017 Michael Wright <mjw@methodanalysis.com>
// License: MIT


(function () {


'use strict';


let csscolorparser;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	csscolorparser = require('csscolorparser-browser');
} else {
	csscolorparser = window.csscolorparser;
}
let parseCSSColor = csscolorparser.parseCSSColor;


let themematch = (function() {


	let themematch = function themematch (params) {

		if (params === undefined)
			params = {};

		this.sub_name = params.name;
		this.themes   = {};
		this.subs     = {};

		if (params.themes !== undefined)
			for (let i = 0; i < params.themes.length; i++)
				this.add_theme(params.themes[i]);

		if (params.subs !== undefined)
			for (let i = 0; i < params.subs.length; i++)
				this.add_sub(params.subs[i]);

	};


	themematch.prototype.name = function () {

		return this.sub_name;

	};


	themematch.prototype.get_themes = function (name) {

		if (name !== undefined)
			return this.themes[name];

		let themes = [];
		let theme_names = Object.keys(this.themes);
		for (let i = 0; i < theme_names.length; i++)
			themes.push(this.themes[theme_names[i]]);

		return themes;

	};


	themematch.prototype.get_subs = function (name) {

		if (name !== undefined)
			return this.subs[name];

		let subs = [];
		let sub_names = Object.keys(this.subs);
		for (let i = 0; i < sub_names.length; i++)
			subs.push(this.subs[sub_names[i]]);

		return subs;

	};


	themematch.prototype.add_theme = function (theme) {

		assert_theme_valid(theme);
		this.themes[theme.name] = theme;

	};


	themematch.prototype.add_sub = function (params) {

		if (params.name === undefined)
			throw new Error('sub must have a name');

		let sub = new themematch(params);
		this.subs[params.name] = sub;

		return sub;

	};


	themematch.prototype.select = function (name) {

		let theme = this.themes[name];

		if (theme === undefined)
			throw new Error('theme "'+name+'" not registered/known');

		let themes = [ theme ];
		let sub_list = this.get_subs();
		for (let i = 0; i < sub_list.length; i++) {
			let sub = sub_list[i];
			let sub_themes = sub.match(theme);
			for (let j = 0; j < sub_themes.length; j++)
				themes.push(sub_themes[j]);
		}

		return themes;

	};


	themematch.prototype.match = function (super_theme) {

		let super_bg_rgb = colset_to_rgb(super_theme.backgrounds);
		let super_fg_rgb = colset_to_rgb(super_theme.foregrounds);

		let scored_themes = [];
		let themes = this.get_themes();
		for (let i = 0; i < themes.length; i++) {
			let theme = themes[i];
			let bg_rgb = colset_to_rgb(theme.backgrounds);
			let fg_rgb = colset_to_rgb(theme.foregrounds);
			let bg_cmp = col_cmp(super_bg_rgb, bg_rgb);
			let fg_cmp = col_cmp(super_fg_rgb, fg_rgb);
			scored_themes.push({
				theme: theme,
				score: bg_cmp + fg_cmp,
			});
		}

		scored_themes.sort(function (a, b) { return a.score - b.score; });

		return this.select(scored_themes[0].theme.name);

	};




	return themematch;


})();


function assert_theme_valid (theme) {

	if (theme.name === undefined)
		throw new Error('theme must have name');

	if (theme.backgrounds === undefined
			|| theme.backgrounds.constructor !== Array
			|| theme.backgrounds.length === 0)
		throw new Error('theme must have backgrounds');

	if (theme.foregrounds === undefined
			|| theme.foregrounds.constructor !== Array
			|| theme.foregrounds.length === 0)
		throw new Error('theme must have foregrounds');

	return theme;

}


function colset_to_rgb (cols) {

	let rgb = [0, 0, 0];
	let weighted_count = 0;
	for (let i = 0; i < cols.length; i++) {
		let rgba = parseCSSColor(cols[i]);
		let weight = cols.length - i;
		rgb[0] += rgba[0] * rgba[3] * weight;
		rgb[1] += rgba[1] * rgba[3] * weight;
		rgb[2] += rgba[2] * rgba[3] * weight;
		weighted_count += weight;
	}

	rgb[0] /= weighted_count;
	rgb[1] /= weighted_count;
	rgb[2] /= weighted_count;

	return rgb;

}


function col_cmp (a, b) {

	return (Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]) + Math.abs(a[2]-b[2])) / 765;

}


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = themematch;
} else {
	window.themematch = themematch;
}


}) ();
