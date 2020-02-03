export default class SetImageAsCover {
  static set(event, index, images) {
    // Removing previous images marked as cover
    const coverImg = document.querySelector('.coverStar');
    if (coverImg) {
      coverImg.classList.remove('coverStar');
    }

    // Getting current star icon and marking it as selected
    const el = event.target;
    el.classList.add('coverStar');

    return images.find((img, ind) => ind === index);
  }
}
