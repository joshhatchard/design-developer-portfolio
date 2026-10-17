var currentPage = 0;
const totalHtmlFiles = 17;
function changePublication(direction) {
	if (currentPage >= 0 && currentPage < totalHtmlFiles) {
		var contentFrame = document.getElementById("contentIFrame");
		var currentPageUrl = contentFrame.src;
		currentPageUrl = currentPageUrl.substring(0, currentPageUrl.lastIndexOf("/") + 1);
		var nextPageUrl = currentPageUrl;
		if (currentPage !== 0)
			currentPageUrl = currentPageUrl + "publication-" + currentPage + ".html";
		else
			currentPageUrl = currentPageUrl + "publication" + ".html";
		contentFrame.classList.remove("pageTurning", "pageTurningReverse");
		void contentFrame.offsetWidth;
		contentFrame.classList.add(direction === "previous" ? "pageTurningReverse" : "pageTurning");
		contentFrame.src = currentPageUrl;
		if ((currentPage + 1) < totalHtmlFiles) {
			nextPageUrl = nextPageUrl + "publication-" + (currentPage + 1) + ".html";
			document.getElementById("dummyIFrame").src = nextPageUrl;
		}
	}
}
function showNextPage() {
	++currentPage;
	changePublication("next");
	showHideArrows();
}
function showPreviousPage() {
	--currentPage;
	changePublication("previous");
	showHideArrows();
}
function showHideArrows() {
	document.getElementsByClassName("prev")[0].disabled = currentPage === 0;
	document.getElementsByClassName("next")[0].disabled = currentPage === (totalHtmlFiles - 1);
	document.getElementById("pageIndicator").textContent = (currentPage + 1) + " / " + totalHtmlFiles;
}
