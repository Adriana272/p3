function buscarCocktail() {
    // Limpiar la pantalla antes de una nueva búsqueda
    limpiarPantalla();

    const nombreCocktail = document.getElementById('nombreCocktail').value;
    buscarCocktailApi(nombreCocktail); // Buscar el cocktail
}

function mostrarCocktailEnPantalla(nombreCocktail, urlFoto) {
    // Crear un elemento de imagen y añadirlo al contenedor
    const img = document.createElement('img');
    img.src = urlFoto;
    document.getElementById('resultado').appendChild(img);

    // Crear un elemento de párrafo para el nombre del cóctel y añadirlo al contenedor
    const p = document.createElement('p');
    p.textContent = `Nombre del cóctel: ${nombreCocktail}`;
    document.getElementById('resultado').appendChild(p);
}

function filtrarCocktails() {
    const input = document.getElementById('nombreCocktail');
    const select = document.getElementById('selectCocktails');
    const initial = input.value[0].toUpperCase();

    select.innerHTML = ''; // Limpiar opciones anteriores

    // Construir la URL de la API con la inicial como parámetro de búsqueda
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${initial}`;

    // Realizamos GET
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.drinks && data.drinks.length > 0) { //si se encuentran cócteles, se itera sobre las distintas opciones
                data.drinks.forEach(cocktail => { //opción por cóctel
                    const option = document.createElement('option');
                    option.textContent = cocktail.strDrink;
                    select.appendChild(option);
                });
            } else { //si no hay cócteles, se muestra un error
                const option = document.createElement('option');
                option.textContent = 'No se encontraron cócteles con dicha inicial';
                select.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function rellenarInput() {
    const input = document.getElementById('nombreCocktail');
    const select = document.getElementById('selectCocktails');
    input.value = select.value;
}

//Buscar cocktail con el nombre escrito
function buscarCocktailApi(nombreCocktail) {
    if (nombreCocktail && nombreCocktail.trim() !== '') {
       
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombreCocktail}`;

        // Realizar GET
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Verificar si se encontró algún cóctel
                if (data.drinks && data.drinks.length > 0) { //Si se encuentra se muestra en la consola la foto y el nombre
                    const cocktail = data.drinks[0];
                    console.log('Nombre del cóctel:', cocktail.strDrink);
                    console.log('Foto del cóctel:', cocktail.strDrinkThumb);
                    mostrarCocktailEnPantalla(cocktail.strDrink, cocktail.strDrinkThumb); //se muestra todo por pantalla
                } else { //No se encuentra el cocktail
                    console.log('No se encontró ningún cóctel con ese nombre');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else { //No se proporcionó ningún nombre
        console.log('Por favor, ingresa un nombre de cóctel válido');
    }
}

function limpiarPantalla() {
    // Limpiar el contenido
    document.getElementById('resultado').innerHTML = '';
}
