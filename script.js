const activities = [
  { title: "Work",      cls: "work",      icon: "icon-work.svg",      timeframes: { daily: { current: 5, previous: 7 }, weekly: { current: 32, previous: 36 }, monthly: { current: 103, previous: 128 } } },
  { title: "Play",      cls: "play",      icon: "icon-play.svg",      timeframes: { daily: { current: 1, previous: 2 }, weekly: { current: 10, previous: 8 },  monthly: { current: 23,  previous: 29 } } },
  { title: "Study",     cls: "study",     icon: "icon-study.svg",     timeframes: { daily: { current: 0, previous: 1 }, weekly: { current: 4,  previous: 7 },  monthly: { current: 13,  previous: 19 } } },
  { title: "Exercise",  cls: "exercise",  icon: "icon-exercise.svg",  timeframes: { daily: { current: 1, previous: 1 }, weekly: { current: 4,  previous: 5 },  monthly: { current: 11,  previous: 18 } } },
  { title: "Social",    cls: "social",    icon: "icon-social.svg",    timeframes: { daily: { current: 1, previous: 3 }, weekly: { current: 5,  previous: 10 }, monthly: { current: 21,  previous: 23 } } },
  { title: "Self Care", cls: "self-care", icon: "icon-self-care.svg", timeframes: { daily: { current: 0, previous: 1 }, weekly: { current: 2,  previous: 2 },  monthly: { current: 7,   previous: 11 } } }
];

const previousLabel = { daily: "Yesterday", weekly: "Last Week", monthly: "Last Month" };
const hrs = (n) => `${n}${n === 1 ? "hr" : "hrs"}`;

const dashboard = document.querySelector(".dashboard");
const buttons = document.querySelectorAll(".timeframes button");

// Build the cards once, then only update the text when the timeframe changes
activities.forEach((a) => {
  const card = document.createElement("article");
  card.className = `card ${a.cls}`;
  card.innerHTML = `
    <img class="card-icon" src="./images/${a.icon}" alt="">
    <div class="card-body">
      <div class="card-header">
        <h2 class="card-title">${a.title}</h2>
        <button type="button" class="card-menu" aria-label="More options for ${a.title}">
          <img src="./images/icon-ellipsis.svg" alt="">
        </button>
      </div>
      <p class="current"></p>
      <p class="previous"></p>
    </div>`;
  a.el = card;
  dashboard.appendChild(card);
});

function render(timeframe) {
  activities.forEach((a) => {
    const { current, previous } = a.timeframes[timeframe];
    a.el.querySelector(".current").textContent = hrs(current);
    a.el.querySelector(".previous").textContent = `${previousLabel[timeframe]} - ${hrs(previous)}`;
  });
  buttons.forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.timeframe === timeframe))
  );
}

buttons.forEach((b) => b.addEventListener("click", () => render(b.dataset.timeframe)));
render("weekly");