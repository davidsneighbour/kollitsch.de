const cssnano = require('cssnano');
const postcsspresetenv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const doiuse = require('doiuse');

const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
	plugins: [
		// https://github.com/anandthakker/doiuse
		doiuse({
			browsers: [
				">= 0.5%",
				"last 2 major versions",
				"not dead",
				"Chrome >= 60",
				"Firefox >= 60",
				"Firefox ESR",
				"iOS >= 12",
				"Safari >= 12",
				"not op_mini all",
				"not op_mob > 0",
				"not opera > 0",
			],
			ignore: ['rem'],
			ignoreFiles: ['**/normalize.css'],
		}),
		// https://github.com/postcss/autoprefixer
		autoprefixer(),
		// https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env
		postcsspresetenv({
			stage: 2,
			browsers: [
				">= 0.5%",
				"last 2 major versions",
				"not dead",
				"Chrome >= 60",
				"Firefox >= 60",
				"Firefox ESR",
				"iOS >= 12",
				"Safari >= 12",
				"not op_mini all",
				"not op_mob > 0",
				"not opera > 0",
			],
			// https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md
			features: {
				'nesting-rules': true,
			},
			debug: true,
		}),
		purgecss(({
			content: ['./hugo_stats.json'],
			// https://github.com/gohugoio/hugo/issues/10338
			// https://discourse.gohugo.io/t/purgecss-and-highlighting/41021
			safelist: {
				greedy: [/highlight/, /chroma/]
			},
			fontFace: true,
			// variables: true, # @todo check why this breaks font family setup for code
			keyframes: true,
			defaultExtractor: content => {
				const els = JSON.parse(content).htmlElements;
				return [
					...(els.tags || []),
					...(els.classes || []),
					...(els.ids || []),
				];
			}
		})),
		// https://github.com/cssnano/cssnano
		cssnano({
			preset: [
				'default',
				{
					discardComments: {
						removeAll: true,
					},
				},
			],
		}),
	],
};
