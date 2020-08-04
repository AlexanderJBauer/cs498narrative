/* global document, window */
import { outerHeight } from './helpers';

let LAST_KNOWN_Y = 0;
const slideOpactiyUpdate = () => {
  const windowHeight = window.innerHeight;
  const viewTop = window.scrollY;
  const viewMidpoint = viewTop + windowHeight / 2;
  const viewBottom = viewTop + windowHeight;
  const scrollDirection = viewTop > LAST_KNOWN_Y ? 'down' : 'up';

  const sections = document.querySelectorAll('section');
  const sectionHolders = document.querySelectorAll('.section-holder');
  const sectionOffests = [0];
  sectionHolders.forEach((sectionHolder, index) => {
    if (index !== 0) {
      sectionOffests.push(
        outerHeight(sectionHolders[index - 1]) + sectionOffests[index - 1],
      );
    }
  });

  const isOutSlide = (sectionTopOffset, sectionBottomOffest) => {
    if (
      scrollDirection === 'down'
      && sectionBottomOffest < viewMidpoint
      && sectionBottomOffest > viewTop
    ) {
      return true;
    }

    if (
      scrollDirection === 'up'
      && sectionTopOffset > viewMidpoint
      && sectionTopOffset < viewBottom
    ) {
      return true;
    }

    return false;
  };

  const isInSlide = (sectionTopOffset, sectionBottomOffest) => {
    if (
      scrollDirection === 'down'
      && sectionTopOffset < viewMidpoint
      && sectionTopOffset > viewTop - 50
    ) {
      return true;
    }

    if (
      scrollDirection === 'up'
      && sectionBottomOffest > viewMidpoint + 10
      && sectionBottomOffest < viewBottom + 10
    ) {
      return true;
    }

    return false;
  };

  let outSlideTop;
  let outSlideBottom;
  let outSlide;
  let inSlideTop;
  let inSlideBottom;
  let inSlide;

  // NodeLists only have forEach available, so no find()
  sections.forEach((section, index) => {
    const sectionTopOffset = sectionOffests[index];
    const sectionBottomOffest = sectionTopOffset + outerHeight(section);
    if (isOutSlide(sectionTopOffset, sectionBottomOffest)) {
      outSlideTop = sectionTopOffset;
      outSlideBottom = sectionBottomOffest;
      outSlide = section;
    }
  });

  sections.forEach((section, index) => {
    const sectionTopOffset = sectionOffests[index];
    const sectionBottomOffest = sectionTopOffset + outerHeight(section);
    if (isInSlide(sectionTopOffset, sectionBottomOffest)) {
      inSlideTop = sectionTopOffset;
      inSlideBottom = sectionBottomOffest;
      inSlide = section;
    }
  });

  const animationIn = 'fade-in-long';
  const animationOut = 'fade-out-long';

  const hasOneOf = (section, classNames) => !!classNames.find(
    (className) => section.classList.contains(className),
  );

  if (outSlide && !hasOneOf(outSlide, ['hidden', 'fade-out-long'])) {
    outSlide.classList.remove('visible');
    outSlide.classList.remove(animationIn);
    outSlide.addEventListener('animationend', function animated(event) {
      if (event.animationName === animationOut) {
        outSlide.classList.remove(animationOut);
        outSlide.classList.add('hidden');
        outSlide.removeEventListener('animationend', animated);
      }
    });
    outSlide.classList.add(animationOut);
  }

  if (inSlide && !hasOneOf(inSlide, ['visible', 'fade-in-long'])) {
    inSlide.classList.remove('hidden');
    inSlide.classList.remove(animationOut);
    inSlide.addEventListener('animationend', function animated(event) {
      if (event.animationName === animationIn) {
        inSlide.classList.remove(animationIn);
        inSlide.classList.add('visible');
        inSlide.removeEventListener('animationend', animated);
      }
    });
    inSlide.classList.add(animationIn);
  }

  // console.log({
  //   LAST_KNOWN_Y,
  //   viewTop,
  //   scrollDirection,
  //   inSlide,
  //   outSlide,
  //   windowHeight,
  //   viewMidpoint,
  //   outSlideBottom,
  //   outSlideTop,
  //   inSlideTop,
  //   inSlideBottom,
  // });

  LAST_KNOWN_Y = viewTop;
};

export default () => {
  slideOpactiyUpdate();
  window.addEventListener('scroll', slideOpactiyUpdate);
};
