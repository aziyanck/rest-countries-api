const box = document.querySelector('.content-box');

const url = 'https://restcountries.com/v3.1/all?fields=population,region,capital,flags,name';

async function getData() {
  try {
    const response = await fetch(url);
    const countries = await response.json();

    let html = '';

    countries.forEach(country => {
      html += `
        <div class="details bg-white flex flex-col w-[250px] h-[max-content] overflow-clip rounded-lg m-4 shadow-xl">
          <div class="img w-full h-[150px]">
            <img src="${country.flags.png}" alt="${country.name.common} Flag" class="w-full h-full object-cover" />
          </div>
          <div class="data m-4">
            <h1 class="country font-extrabold">${country.name.common}</h1>
            <p><span class="font-semibold" >Population:</span> ${country.population.toLocaleString()}</p>
            <p><span class="font-semibold" >Region:</span> ${country.region}</p>
            <p><span class="font-semibold" >Capital:</span> ${country.capital ? country.capital[0] : 'N/A'}</p>
          </div>
        </div>
      `;
    });

    box.innerHTML = html;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData();
