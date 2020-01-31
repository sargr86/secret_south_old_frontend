export default class SelectImageToMakeCoverOnPageLoad {
  static set(event) {
    // Removing previous selected cover
    const selectedCover = document.querySelector('.selected');
    if (selectedCover) {
      selectedCover.classList.remove('selected');
    }

    // Marking selected image as cover by star icon
    const target = event.target as HTMLElement;
    target.classList.add('selected');
  }
}
