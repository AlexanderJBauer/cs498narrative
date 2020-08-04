/* global document window */
let toc;
let tocPath;
let tocItems;

// Factor of screen size that the element must cross
// before it's considered visible
const TOP_MARGIN = 0;
const BOTTOM_MARGIN = 0.2;

let pathLength;

let lastPathStart;
let lastPathEnd;

const sync = () => {
  const windowHeight = window.innerHeight;

  let pathStart = pathLength;
  let pathEnd = 0;

  let visibleItems = 0;

  tocItems.forEach((item) => {
    const targetBounds = item.target.getBoundingClientRect();

    if (targetBounds.bottom > windowHeight * TOP_MARGIN
      && targetBounds.top < windowHeight * (1 - BOTTOM_MARGIN)) {
      pathStart = Math.min(item.pathStart, pathStart);
      pathEnd = Math.max(item.pathEnd, pathEnd);

      visibleItems += 1;

      item.listItem.classList.add('visible');
    } else {
      item.listItem.classList.remove('visible');
    }
  });

  // Specify the visible path or hide the path altogether
  // if there are no visible items
  if (visibleItems > 0 && pathStart < pathEnd) {
    if (pathStart !== lastPathStart || pathEnd !== lastPathEnd) {
      tocPath.setAttribute('stroke-dashoffset', '1');
      tocPath.setAttribute(
        'stroke-dasharray',
        `1, ${pathStart}, ${pathEnd - pathStart}, ${pathLength}`,
      );
      tocPath.setAttribute('opacity', 1);
    }
  } else {
    tocPath.setAttribute('opacity', 0);
  }

  lastPathStart = pathStart;
  lastPathEnd = pathEnd;
};

const drawPath = () => {
  tocItems = [].slice.call(toc.querySelectorAll('li'));

  // Cache element references and measurements
  tocItems = tocItems.map((item) => {
    const anchor = item.querySelector('a');
    const target = document.querySelector(
      `#${anchor.getAttribute('href').slice(1)}`,
    );

    return {
      listItem: item,
      anchor,
      target,
    };
  });

  // Remove missing targets
  tocItems = tocItems.filter((item) => !!item.target);

  const path = [];
  let pathIndent;

  tocItems.forEach((item, i) => {
    const x = item.anchor.offsetLeft - 5;
    const y = item.anchor.offsetTop;
    const height = item.anchor.offsetHeight;

    if (i === 0) {
      path.push('M', x, y, 'L', x, y + height);
      item.pathStart = 0;
    } else {
      // Draw an additional line when there's a change in
      // indent levels
      if (pathIndent !== x) path.push('L', pathIndent, y);

      path.push('L', x, y);

      // Set the current path so that we can measure it
      tocPath.setAttribute('d', path.join(' '));
      item.pathStart = tocPath.getTotalLength() || 0;

      path.push('L', x, y + height);
    }

    pathIndent = x;

    tocPath.setAttribute('d', path.join(' '));
    item.pathEnd = tocPath.getTotalLength();
  });

  pathLength = tocPath.getTotalLength();

  sync();
};

export default () => {
  toc = document.querySelector('.toc');
  tocPath = document.querySelector('.toc-marker path');
  drawPath();
  window.addEventListener('resize', drawPath, false);
  window.addEventListener('scroll', sync, false);
};
