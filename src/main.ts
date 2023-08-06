import './style.css'

const countriesContainer = document.getElementById("countries-container");

interface Language{
  name:string;
}
interface Post {
  capital: string;
  flag: string;
  languages: Language[];
  name: string;
  population: number;
  region: string;
}

// Fetch posts from the API
const fetchPosts = (): Promise<Post[]> => {
  return new Promise((resolve, reject) => {

      fetch("https://restcountries.com/v2/all")
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
          console.log(data);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
        });
  });
};

// Asynchronous function to fetch and display 10 posts
const tenPosts = async () => {
  const data: Post[] = await fetchPosts();

  const tenPosts = data.slice(0, length-1);
  tenPosts.forEach((post) => {
    displayPosts(post);
  });
};

tenPosts();

const fetchData = async () => {
  try {
    const response = await fetch('https://restcountries.com/v2/all')
    const countries = await response.json()
    console.log(countries)
  } catch (err) {
    console.error(err)
  }
}
console.log('===== async and await')
fetchData()

// Display fetched posts in the HTML
const displayPosts = (post: Post) => {

  if (countriesContainer) {

    const card = document.createElement("div");
    card.classList.add("card");

    const flagImage = document.createElement("img");
    flagImage.src = post.flag;
    flagImage.alt = `${post.name} flag`;

    const nameElement = document.createElement("h2");
    nameElement.textContent = post.name;

    const capitalElement = document.createElement("p");
    capitalElement.textContent = `Capital: ${post.capital}`;

    const regionElement = document.createElement("p");
    regionElement.textContent = `Region: ${post.region}`;

    const populationElement = document.createElement("p");
    populationElement.textContent = `Population: ${post.population}`;

    const languagesElement = document.createElement("p");
    const languagesNames = post.languages.map((language) => language.name).join(', ');
    languagesElement.textContent = `Languages: ${languagesNames}`;

    card.appendChild(flagImage);
    card.appendChild(nameElement);
    card.appendChild(capitalElement);
    card.appendChild(regionElement);
    card.appendChild(populationElement);
    card.appendChild(languagesElement);

    // Append the card to the container
    countriesContainer.appendChild(card);
  }
};




