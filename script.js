const box = document.querySelector('.content-box');

const url = 'https://restcountries.com/v3.1/all?&fields=population,region,capital,flags,name'

async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


getData();