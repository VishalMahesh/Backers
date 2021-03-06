const MultiImageHelper = (img, single) => {
  if (img !== '') {
    var images = img.split(',');
    if (single) {
      return images[0];
    } else {
      return images;
    }
  } else {
    return img;
  }
};

export default MultiImageHelper;
