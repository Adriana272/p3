document.addEventListener("DOMContentLoaded", function() {
    const botoncervezaaleatoria = document.getElementById("botoncervezaaleatoria");
    const botontodaslascervezas = document.getElementById("botontodaslascervezas");
    const detallescerveza = document.getElementById("detallescerveza");

    botoncervezaaleatoria.addEventListener("click", function() {
        fetchRandomBeer();
    });

    botontodaslascervezas.addEventListener("click", function() {
        fetchAllBeers();
    });

    function fetchRandomBeer() {
        fetch("https://api.punkapi.com/v2/beers/random")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener la cerveza aleatoria");
                }
                return response.json();
            })
            .then(data => {
                const beer = data[0];
                const beerHTML = `
                    <h2>${beer.name}</h2>
                    <p><strong>Estilo:</strong> ${beer.style}</p>
                    <p><strong>ABV:</strong> ${beer.abv}%</p>
                    <p><strong>Descripción:</strong> ${beer.description}</p>
                    <img src="${beer.image_url}" alt="${beer.name}" style="max-width: 200px;">
                `;
                detallescerveza.innerHTML = beerHTML;
            })
            .catch(error => {
                console.error("Error:", error);
                detallescerveza.innerHTML = "<p>Ocurrió un error al buscar la cerveza aleatoria.</p>";
            });
    }

    function fetchAllBeers() {
        fetch("https://api.punkapi.com/v2/beers")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener todas las cervezas");
                }
                return response.json();
            })
            .then(data => {
                let beerHTML = "<h2>Todas las Cervezas</h2>";
                data.forEach(beer => {
                    beerHTML += `
                        <div>
                            <h3>${beer.name}</h3>
                            <p><strong>Estilo:</strong> ${beer.style}</p>
                            <p><strong>ABV:</strong> ${beer.abv}%</p>
                            <p><strong>Descripción:</strong> ${beer.description}</p>
                            <img src="${beer.image_url}" alt="${beer.name}" style="max-width: 200px;">
                        </div>
                    `;
                });
                detallescerveza.innerHTML = beerHTML;
            })
            .catch(error => {
                console.error("Error:", error);
                detallescerveza.innerHTML = "<p>Ocurrió un error al obtener todas las cervezas.</p>";
            });
    }
});