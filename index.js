// root div for all html
const ROOT_ELEMENT_ID = 'root';
const rootElement = document.getElementById(ROOT_ELEMENT_ID);

// parent div for the narrative
const narrative = document.createElement('div');
narrative.classList.add('page-content');
narrative.classList.add('flex');

// Add animation class, and listener. Will not start until added to DOM.
narrative.classList.add('fade-in');
narrative.addEventListener('animationend', function animated(event) {
  if (event.animationName === 'fade-in') {
    narrative.classList.remove('fade-in');
    narrative.removeEventListener('animationend', animated);
  }
});

// Add HTML and JavaScript to narrative node
const tocHtml = `
<nav class="toc">
  <ul>
    <li>
      <a href="#introduction">Introduction</a>
      <ul>
        <li><a href="#thing">The 1990 thing that escalated things</a></li>
      </ul>
    </li>
    <li>
      <a href="#arrests">Drug related arrests since 1985</a>
    </li>
    <li>
      <a href="#incarcerations">Drug related incarcerations since 1985</a>
    </li>
    <li>
      <a href="#deaths">Drug related deaths since 1985 (maybe by drug)</a>
    </li>
    <li>
      <a href="#explore">Explore normalized data</a>
    </li>
  </ul>
  <svg class="toc-marker" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#444" stroke-width="3" fill="transparent" stroke-dasharray="0, 0, 0, 1000" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0.5, -0.5)" />
  </svg>
</nav>
`;

const drugArrestsGrid = 'hello';

const articleHtml = `
<article class="contents">
  <section>
    <h1 id="introduction">Introduction</h1>
    <p>
      Brief intro to US policy on drgu use
    </p>
    <h2 id="thing">The 1990 thing that escalated things</h2>
    <p>
      Brief description on that, and then lets get into the data
    </p>
  </section>
  <section>
    <h1 id="arrests">Drug related arrests since 1985</h1>
    <p>
      Description of the graphich

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum metus nisi. Aliquam a lobortis augue. Quisque at nisi rutrum, iaculis libero fermentum, pellentesque ligula. Nullam sit amet nunc eget ante volutpat condimentum. Vestibulum placerat tortor quis ligula commodo posuere. Vestibulum nec erat venenatis, blandit mauris et, tincidunt lacus. Nam lacinia diam ac est eleifend, tincidunt aliquet sapien mattis. Aenean venenatis lacus sed nibh dapibus, eu fermentum risus placerat.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum metus nisi. Aliquam a lobortis augue. Quisque at nisi rutrum, iaculis libero fermentum, pellentesque ligula. Nullam sit amet nunc eget ante volutpat condimentum. Vestibulum placerat tortor quis ligula commodo posuere. Vestibulum nec erat venenatis, blandit mauris et, tincidunt lacus. Nam lacinia diam ac est eleifend, tincidunt aliquet sapien mattis. Aenean venenatis lacus sed nibh dapibus, eu fermentum risus placerat.
    </p>
    ${drugArrestsGrid}
    <p>
      Thoughts on graph
    </p>
  </section>
  <section>
    <h1 id="incarcerations">Drug related incarcerations since 1985</h1>
    <p>
      Description of the graphich

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum metus nisi. Aliquam a lobortis augue. Quisque at nisi rutrum, iaculis libero fermentum, pellentesque ligula. Nullam sit amet nunc eget ante volutpat condimentum. Vestibulum placerat tortor quis ligula commodo posuere. Vestibulum nec erat venenatis, blandit mauris et, tincidunt lacus. Nam lacinia diam ac est eleifend, tincidunt aliquet sapien mattis. Aenean venenatis lacus sed nibh dapibus, eu fermentum risus placerat.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum metus nisi. Aliquam a lobortis augue. Quisque at nisi rutrum, iaculis libero fermentum, pellentesque ligula. Nullam sit amet nunc eget ante volutpat condimentum. Vestibulum placerat tortor quis ligula commodo posuere. Vestibulum nec erat venenatis, blandit mauris et, tincidunt lacus. Nam lacinia diam ac est eleifend, tincidunt aliquet sapien mattis. Aenean venenatis lacus sed nibh dapibus, eu fermentum risus placerat.

    </p>
    ${drugArrestsGrid}
    <p>
      Thoughts on graph
    </p>
  </section>
  <section>
    <h1 id="deaths">Drug related deaths since 1985 (maybe by drug)</h1>
    <p>
      Description of the graphich

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum metus nisi. Aliquam a lobortis augue. Quisque at nisi rutrum, iaculis libero fermentum, pellentesque ligula. Nullam sit amet nunc eget ante volutpat condimentum. Vestibulum placerat tortor quis ligula commodo posuere. Vestibulum nec erat venenatis, blandit mauris et, tincidunt lacus. Nam lacinia diam ac est eleifend, tincidunt aliquet sapien mattis. Aenean venenatis lacus sed nibh dapibus, eu fermentum risus placerat.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum metus nisi. Aliquam a lobortis augue. Quisque at nisi rutrum, iaculis libero fermentum, pellentesque ligula. Nullam sit amet nunc eget ante volutpat condimentum. Vestibulum placerat tortor quis ligula commodo posuere. Vestibulum nec erat venenatis, blandit mauris et, tincidunt lacus. Nam lacinia diam ac est eleifend, tincidunt aliquet sapien mattis. Aenean venenatis lacus sed nibh dapibus, eu fermentum risus placerat.
    </p>
    ${drugArrestsGrid}
    <p>
      Thoughts on graph
    </p>
  </section>
  <section>
    <h1 id="explore">Normalized data exploration (compare to other types of arrest and deaths)</h1>
    <p>
      Description of the graphich

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum metus nisi. Aliquam a lobortis augue. Quisque at nisi rutrum, iaculis libero fermentum, pellentesque ligula. Nullam sit amet nunc eget ante volutpat condimentum. Vestibulum placerat tortor quis ligula commodo posuere. Vestibulum nec erat venenatis, blandit mauris et, tincidunt lacus. Nam lacinia diam ac est eleifend, tincidunt aliquet sapien mattis. Aenean venenatis lacus sed nibh dapibus, eu fermentum risus placerat.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum metus nisi. Aliquam a lobortis augue. Quisque at nisi rutrum, iaculis libero fermentum, pellentesque ligula. Nullam sit amet nunc eget ante volutpat condimentum. Vestibulum placerat tortor quis ligula commodo posuere. Vestibulum nec erat venenatis, blandit mauris et, tincidunt lacus. Nam lacinia diam ac est eleifend, tincidunt aliquet sapien mattis. Aenean venenatis lacus sed nibh dapibus, eu fermentum risus placerat.
    </p>
    ${drugArrestsGrid}
    <p>
      Thoughts on graph
    </p>
  </section>
</article>
`;

narrative.insertAdjacentHTML('beforeend', tocHtml);
narrative.insertAdjacentHTML('beforeend', articleHtml);

// Add animation to splash page, and add new page to DOM
const splashPage = rootElement.firstElementChild;
splashPage.addEventListener('animationend', () => {
  splashPage.remove();
});
splashPage.classList.add('fade-out');

// Add narrative to dom right after triggering out animation
rootElement.appendChild(narrative);

/// ///////////////////////////////////// Nav bar javascript ////////////////////////////////////////////////////////////
const toc = narrative.querySelector('.toc');
const tocPath = narrative.querySelector('.toc-marker path');
let tocItems;

// Factor of screen size that the element must cross
// before it's considered visible
const TOP_MARGIN = 0.1;
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
    const target = narrative.querySelector(
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

drawPath();
window.addEventListener('resize', drawPath, false);
window.addEventListener('scroll', sync, false);

