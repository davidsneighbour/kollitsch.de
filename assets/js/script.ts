/* eslint-disable import/no-extraneous-dependencies */
import Alpine from 'alpinejs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Popper from '@popperjs/core';
import { Collapse, Tab, Tooltip } from 'bootstrap';
import 'web-vitals-element';
import 'libs/liteyoutube/lite-yt-embed';

// @ts-ignore
window.Alpine = Alpine;

Alpine.start();

// Bootstrap Tabs
const triggerTabList = Array.prototype.slice.call(document.querySelectorAll('#myTab button'));
triggerTabList.forEach((triggerElement: Element) => {
	const tabTrigger = new Tab(triggerElement);
	triggerElement.addEventListener('click', (event: { preventDefault: () => void }) => {
		event.preventDefault();
		tabTrigger.show();
	});
});

// Bootstrap Collapsibles
const collapseElementList = Array.prototype.slice.call(document.querySelectorAll('.collapse'));
collapseElementList.forEach((collapseElement: Element) => new Collapse(collapseElement, {
	toggle: false,
}).hide());

// Bootstrap Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
