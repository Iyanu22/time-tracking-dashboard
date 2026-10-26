const previousLabel = { daily: "Yesterday", weekly: "Last Week", monthly: "Last Month" };
const hrs = (n) => `${n}${n === 1 ? "hr" : "hrs"}`;
const slug = (title) => title.toLowerCase().replace(/\s+/g, "-"); // "Self Care" -> "self-care"

const dashboard = document.querySelector(".dashboard");
const buttons = document.querySelectorAll(".timeframes button");

let activities = []; 



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

async function init() {
  try {
    const res = await fetch("./data.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    activities = await res.json();

       activities.forEach((a) => {
      a.el = document.querySelector(`.card.${slug(a.title)}`);
    });
    activities = activities.filter((a) => a.el); 

    buttons.forEach((b) => b.addEventListener("click", () => render(b.dataset.timeframe)));
    render("weekly");
  } catch (err) {
    console.error("Could not load activity data:", err);
    showError();
  }
}

function showError() {
  const message = document.createElement("p");
  message.className = "error-message";
  message.setAttribute("role", "alert");
  message.textContent = "Sorry, we couldn't load your activity data. Please refresh the page or try again later.";
  dashboard.appendChild(message);
}

init();