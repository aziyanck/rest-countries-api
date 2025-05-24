const box = document.querySelector(".content-box");
const filter = document.querySelector("#filter-r");
const toSearch = document.querySelector("#search");

const darkBtn = document.getElementById("darkModeToggle");
const body = document.body;

let allCountries = [];

const url =
  "https://restcountries.com/v3.1/all?fields=population,region,capital,flags,name";

window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.toggle("dark");
    toSearch.classList.toggle("dark");
    filter.classList.toggle("dark");
  }
};

async function getData() {
  try {
    const response = await fetch(url);
    allCountries = await response.json();

    //allCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    filterCountries(allCountries);
    displayCountries(allCountries);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayCountries(data) {
  let html = "";
  data.forEach((country) => {
    html += `
        <div class="details  flex flex-col w-[250px] h-[max-content] overflow-clip hover:cursor-pointer hover:scale-105 rounded-lg m-4 shadow-xl ">
          <div class="img w-full h-[150px]">
            <img src="${country.flags.png}" alt="${
      country.name.common
    } Flag"class="w-full  h-full object-cover" />
          </div>

          <div class="data m-4">
            <h1 class="country font-extrabold">${country.name.common}</h1>
            <p><span class="font-semibold" >Population:</span> ${country.population.toLocaleString()}</p>
            <p><span class="font-semibold" >Region:</span> ${country.region}</p>
            <p><span class="font-semibold" >Capital:</span> ${
              country.capital ? country.capital[0] : "N/A"
            }</p>
          </div>
        </div>
      `;
  });
  box.innerHTML = html;
}

function filterCountries(data) {
  const regions = [...new Set(data.map((c) => c.region).filter(Boolean))];
  regions.sort();

  let optionsHTML = `<option selected disabled>Select an option</option>`;

  regions.forEach((region) => {
    optionsHTML += `<option value="${region}">${region}</option>`;
  });

  filter.innerHTML = optionsHTML;
}

filter.addEventListener("change", (e) => {
  const selectedRegion = e.target.value;
  const filtered = allCountries.filter((c) => c.region === selectedRegion);
  displayCountries(filtered);
});

toSearch.addEventListener("input", (e) => {
  const key = e.target.value;
  const filtered = allCountries.filter((c) =>
    c.name.common.toLowerCase().includes(key.toLowerCase())
  );
  displayCountries(filtered);
});

darkBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  toSearch.classList.toggle("dark");
  filter.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  console.log("Dark mode toggled");
});

getData();
