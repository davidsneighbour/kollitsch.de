import { chromium } from "playwright";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
	.option("url", {
		describe: "URL to capture a screenshot of",
		demandOption: true,
		type: "string"
	})
	.option("output", {
		describe: "Output file name",
		default: "header.jpg",
		type: "string"
	})
	.option("width", {
		describe: "Viewport width",
		default: 1200,
		type: "number"
	})
	.option("height", {
		describe: "Viewport height",
		default: 600,
		type: "number"
	})
	.help()
	.alias("help", "h").argv;

export const takeScreenshot = async (url, output, width, height) => {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.setViewportSize({ width, height });
	await page.goto(url);
	await page.screenshot({ path: output });
	await browser.close();
};

// @ts-ignore
takeScreenshot(argv.url, argv.output, argv.width, argv.height);
