function Slider() {
	"use strict";
	// Get Triggers
	const prev = document.getElementById("prev");
	const next = document.getElementById("next");
	// Touches Triggers
	let touchStartX = 0;
	let touchEndX = 0;
	// Set all variables related to the slides component
	const slideWrapper = document.getElementById("slider-image");
	const slides = document.querySelectorAll(".slide");
	let slidesLength = slides.length;
	const currentSlide = slides[0];
	const lastSlide = slides[slidesLength - 1];
	const cloneFirstSlide = currentSlide.cloneNode(true);
	const cloneLastSlide = lastSlide.cloneNode(true);
	// Set all variables related to the content component
	const contentWrapper = document.getElementById("slider-content");
	const contents = document.querySelectorAll(".content");
	let contentsLength = contents.length;
	const currentContent = contents[0];
	const lastContent = contents[contentsLength - 1];
	const cloneFirstContent = currentContent.cloneNode(true);
	const cloneLastContent = lastContent.cloneNode(true);
	// Media Query
	const mediaQueryMAX = window.matchMedia("(max-width: 50em)");
	const mediaQueryMIN = window.matchMedia("(min-width: 50em)");
	// Set Index to 1
	let index = 1;

	function matchMedia() {
		// Check if the media query is true
		if (mediaQueryMAX.matches) {
			document.querySelector(".slider-content").style.maxHeight =
				currentContent.clientHeight + "px";
			document.querySelector(".slider-content").style.overflow = "hidden";
		}

		if (mediaQueryMIN.matches) {
			document.querySelector(".slider-content").removeAttribute("style");
		}
	}

	function addClones() {
		slideWrapper.appendChild(cloneFirstSlide);
		slideWrapper.insertBefore(cloneLastSlide, currentSlide);
		slideWrapper.style.left = -currentSlide.offsetWidth + "px";
		contentWrapper.appendChild(cloneFirstContent);
		contentWrapper.insertBefore(cloneLastContent, currentContent);
		contentWrapper.style.top = -currentContent.clientHeight + "px";
	}

	function onResize() {
		window.addEventListener("resize", () => {
			slideWrapper.style.left = -currentSlide.offsetWidth * index + "px";
			contentWrapper.style.top =
				-currentContent.clientHeight * index + "px";

			matchMedia();
		});
	}

	function changeSlide() {
		slideWrapper.style.left = -currentSlide.offsetWidth * index + "px";
		contentWrapper.style.top = -currentContent.clientHeight * index + "px";
	}

	function moveSlide(direction) {
		slidesLength = document.querySelectorAll(".slide").length;
		slideWrapper.classList.add("transitionLeft");
		contentWrapper.classList.add("transitionTop");

		if (direction === -1) {
			index--;
			changeSlide();

			if (index === 0) {
				index = 3;
				slideWrapper.addEventListener("transitionend", () => {
					slideWrapper.style.left =
						-currentSlide.offsetWidth * index + "px";
					contentWrapper.style.top =
						-currentContent.clientHeight * index + "px";
				});
			}
		}
		if (direction === 1) {
			index++;
			changeSlide();

			if (index === slidesLength - 1) {
				index = 1;
				slideWrapper.addEventListener("transitionend", () => {
					slideWrapper.style.left =
						-currentSlide.offsetWidth * index + "px";
					contentWrapper.style.top =
						-currentContent.clientHeight * index + "px";
				});
			}
		}

		slideWrapper.addEventListener("transitionend", () => {
			slideWrapper.classList.remove("transitionLeft");
			contentWrapper.classList.remove("transitionTop");
		});
	}

	function dragStart(e) {
		touchStartX = e.touches[0].clientX;
	}

	function dragAction(e) {
		touchEndX = e.touches[0].clientX;
	}

	function dragEnd() {
		handleGesture();
	}

	function handleGesture() {
		if (touchEndX < touchStartX) {
			moveSlide(1);
		}
		if (touchEndX > touchStartX) {
			moveSlide(-1);
		}
	}

	// Events
	/// Click Events
	prev.addEventListener("click", () => moveSlide(-1));
	next.addEventListener("click", () => moveSlide(1));
	/// Key Event
	document.addEventListener("keydown", e => {
		if (e.key === "ArrowLeft") moveSlide(-1);
		if (e.key === "ArrowRight") moveSlide(1);
	});
	/// Touch Events
	slideWrapper.addEventListener("touchstart", dragStart);
	slideWrapper.addEventListener("touchmove", dragAction);
	slideWrapper.addEventListener("touchend", dragEnd);

	addClones();
	matchMedia();
	onResize();

	// Checking Media Query on resize
	mediaQueryMAX.addEventListener("change", matchMedia);
	mediaQueryMIN.addEventListener("change", matchMedia);
}
