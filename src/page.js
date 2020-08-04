/* global document */
export default () => {
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

  const sectionMap = {
    intro: 'War on Drugs: A Failing Solution',
    arrestsByYear: 'Drug related arrests since 1980',
    arrestsByRace: 'Drug related arrests since 1980 by race',
    explore: 'Explore arrest data since 1980',
  };

  const sectionIds = Object.keys(sectionMap);
  const sectionTitles = Object.values(sectionMap);

  // Add HTML and JavaScript to narrative node
  const navbarHtml = `
  <nav class="toc">
    <ul>
      <li>
        <a href="#${sectionIds[0]}" onClick="slideOpactiyUpdate()">
          ${sectionTitles[0]}
        </a>
      </li>
      <li>
        <a href="#${sectionIds[1]}" onClick="slideOpactiyUpdate()">
          ${sectionTitles[1]}
        </a>
      </li>
      <li>
        <a href="#${sectionIds[2]}" onClick="slideOpactiyUpdate()">
          ${sectionTitles[2]}
        </a>
      </li>
      <li>
        <a href="#${sectionIds[3]}" onClick="slideOpactiyUpdate()">
          ${sectionTitles[3]}
        </a>
      </li>
    </ul>
    <svg class="toc-marker" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <path stroke="#444" stroke-width="3" fill="transparent" stroke-dasharray="0, 0, 0, 1000" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0.5, -0.5)" />
    </svg>
  </nav>
  `;

  const articleHtml = `
  <article class="contents">
    <div class="section-holder">
      <section class="hidden">
        <h1 id="${sectionIds[0]}">${sectionTitles[0]}</h1>
        <p>
          The war on drugs, coined by Nixon in 1971, is a global campaign led by the U.S. federal government aiming to reduce the illegal drug trade in the United States.
          Nixon's administration dramatically increased the size and presence of federal drug control agencies, and pushed through measures such as mandatory sentencing and no-knock warrants.
        </p>
        <p>
          Although Nixon's administration increased the power of drug control agencies, they did repeal the federal 2–10-year mandatory minimum sentences
          for possession of marijuana in 1970. They also started federal demand reduction programs and drug-treatment programs.
          The ease on marijuana policy continued between 1973 and 1977, which saw eleven states decriminalize marijuana possession.
          President Jimmy Carter won the election on a campaign platform that included marijuana decriminalization.
          In October of 1977, the Senate Judiciary Committee voted to decriminalize possession of up to an ounce of marijuana for personal use.
        </p>
        <p>
          Public perception took a shift however when parents became increasingly worried about the high rate of marijuana usage among teens.
          In the first term of his presidency Ronald Reagan signed the <strong>Comprehensive Crime Control Act of 1984</strong>.
          The act expanded penalties towards possession of cannabis, established a federal system of mandatory minimum sentences, and established procedures for civil asset forfeiture.
        </p>
        <p>
          In recent years, the "War on Drugs" has seen some criticism. Some of those criticisms are that it has not fixed the drug problem in the United States,
          and that it disproportionately targets minorities.
        </p>
        <p>
          We will be taking a look at the number of drug related arrests in aggregate, by race, and in relation to other offenses since 1980 to see if there is any
          correlation with the Comprehensive Crime Control Act of 1984.
        </p>
      </section>
    </div>
    <div class="section-holder">
      <section class="hidden">
        <h1 id="${sectionIds[1]}">${sectionTitles[1]}</h1>
        <p>
          Here is a chart of the number of arrests for drug abuse violations since the year 1980. The change in color marks the passing of the Comprehensive Crime Control Act of 1984.
        </p>
        <div class="chart" id="drugRelatedArrestsByYear"></div>
        <p>
          There is a significant increase in the number of drug abuse violation arrests after 1984. The number has more than doubled since then.
          The "War on Drugs" has clearly not reduced the number of drug related incidents in the last 25 years.
        </p>
      </section>
    </div>
    <div class="section-holder">
      <section class="hidden">
        <h1 id="${sectionIds[2]}">${sectionTitles[2]}</h1>
        <p>
          Here is a chart of the number of arrests for drug abuse violations by race since the year 1980.
          The black vertical line marks the passing of the Comprehensive Crime Control Act of 1984.
        </p>
        <div class="chart" id="drugRelatedArrestsByRace"></div>
        <p>
          From the given graph, it can be seen that no race has seen disproportionate growth in relation to their state in 1984.
          That being said, blacks accounted for ~28% of all drug abuse violation arrests in 2017 while only comprising ~13% of the population.
          Roughly the same was true in 1984, ~30%:~12%.
        </p>
        <p>In the next section you, the reader, will be able to investigate trends over the years further by selecting what you wish to show.</p>
      </section>
    </div>
    <div class="section-holder">
      <section class="hidden">
        <h1 id="${sectionIds[3]}">${sectionTitles[3]}</h1>
        <p>
          In general, you will notice a downwards trend in offenses other than drug abuse violations.
        </p>
        <p>
          To add a new line to the chart, fill in the three inputs and click on the '+' button.
          <br>
          To remove a line from the chart, click on the 'X' button next to an entry in the list.
        <div class="chart" id="exploreChart"></div>
        <div id="configEditor"></div>
      </section>
    </div>
  </article>
  `;

  narrative.insertAdjacentHTML('beforeend', navbarHtml);
  narrative.insertAdjacentHTML('beforeend', articleHtml);

  // Add animation to splash page, and add new page to DOM
  const splashPage = rootElement.firstElementChild;
  splashPage.addEventListener('animationend', () => {
    splashPage.remove();
  });
  splashPage.classList.add('fade-out');

  // Add narrative to dom right after triggering out animation
  rootElement.appendChild(narrative);
};
