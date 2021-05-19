function slider() {
	"use strict";
	// Triggers
	const prev = document.getElementById('prev');
	const next = document.getElementById('next');
	// Slides
	const slideWrapper = document.getElementById('slider-image');
	const slides = document.querySelectorAll('.slide');
	let slidesLength = slides.length;
	const currentSlide = slides[0];
	const lastSlide = slides[slidesLength - 1];
	const cloneFirstSlide = currentSlide.cloneNode(true);
	const cloneLastSlide = lastSlide.cloneNode(true);
	// Contents
	const contentWrapper = document.getElementById('slider-content');
	const contents = document.querySelectorAll('.content');
	let contentsLength = contents.length;
	const currentContent = contents[0];
	const lastContent = contents[contentsLength - 1];
	const cloneFirstContent = currentContent.cloneNode(true);
	const cloneLastContent = lastContent.cloneNode(true);

	let index = 1;

	function addClones() {
		slideWrapper.appendChild(cloneFirstSlide);
		slideWrapper.insertBefore(cloneLastSlide, currentSlide);
		slideWrapper.style.left = -currentSlide.offsetWidth + "px";
		contentWrapper.appendChild(cloneFirstContent);
		contentWrapper.insertBefore(cloneLastContent, currentContent);
		contentWrapper.style.left = -currentContent.offsetWidth + "px";
	}

	function onResize() {
		window.addEventListener('resize', () => {
			slideWrapper.style.left = -currentSlide.offsetWidth * index + "px";
			contentWrapper.style.left = -currentContent.clientWidth * index + "px";
		});
	}

	function changeSlide() {
		slideWrapper.style.left = -currentSlide.offsetWidth * index + "px";
		contentWrapper.style.left = -currentContent.clientWidth * index + "px";
	}

	function moveSlide(direction) {
		slidesLength = document.querySelectorAll('.slide').length;
		slideWrapper.classList.add('transition');

		if (direction === -1) {
			index--;
			changeSlide();

			if (index === 0) {
				index = 3;
				slideWrapper.addEventListener("transitionend", () => {
					slideWrapper.style.left = -currentSlide.offsetWidth * index + "px";
					contentWrapper.style.left = -currentContent.offsetWidth * index + "px";
				});
			}
		}
		if (direction === 1) {
			index++;
			changeSlide();

			if (index === slidesLength -1) {
				index = 1;
				slideWrapper.addEventListener("transitionend", () => {
					slideWrapper.style.left = -currentSlide.offsetWidth * index + "px";
					contentWrapper.style.left = -currentContent.offsetWidth * index + "px";
				});
			}
		}

		slideWrapper.addEventListener("transitionend", () => {
			slideWrapper.classList.remove('transition');
		});
	}

	addClones();

	prev.addEventListener('click', () => moveSlide(-1));
	next.addEventListener('click', () => moveSlide(1));

	onResize();
}