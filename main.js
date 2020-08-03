const searchField = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const div = document.getElementById('results');
const name = document.createElement('h1');
const height = document.createElement('h4');
const weight = document.createElement('h4');
const img = document.createElement('img');
const listType = document.createElement('ul');
let backSRC = '';
let frontSRC = '';

searchButton.addEventListener('click', lookForPokemon);

async function lookForPokemon(type) {
    div.innerHTML = '';
    const pokemonId = typeof type === 'object' ? searchField.value : type;
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).catch(() => {
        name.textContent = "No pokemon found matching that description";
        div.appendChild(name);
    });

    name.textContent = "Name: " + data.name;
    height.textContent = "Height: " + data.height;
    weight.textContent = "Weight: " + data.weight;
    frontSRC = data.sprites.front_default;
    backSRC = data.sprites.back_default;
    img.src = frontSRC;
    img.alt = "Pokemon Image";

    div.appendChild(name);
    div.appendChild(height);
    div.appendChild(weight);
    div.appendChild(img);
    const list = document.createElement('ul');
    data.types.forEach(element => {
        const type = document.createElement('li');
        type.textContent = element.type.name;
        type.addEventListener('click', typeList);
        list.appendChild(type);
    });
    div.appendChild(list);
}



img.addEventListener('mouseover', () => {
    img.src = backSRC;
});
img.addEventListener('mouseout', () => {
    img.src = frontSRC;
});

async function typeList(e) {
    const type = e.target.textContent;
    await fetch(`https://pokeapi.co/api/v2/type/${type}/`).then(response => response.json()).then(data => {
        listType.innerHTML = '';
        data.pokemon.forEach(element => {
            const pok = document.createElement('li');
            pok.textContent = element.pokemon.name;
            pok.addEventListener('click', function () { lookForPokemon(element.pokemon.name) });
            listType.appendChild(pok);
        });
        div.appendChild(listType);
    });

}
