const API_KEY = "9e6e78fe"
const URL = `https://www.omdbapi.com/?apikey=${API_KEY}`

export async function cercarPerText(text) {
    const url = `${URL}&s=${text}`
    const resposta = await fetch(url)
    const dades = await resposta.json()

    console.log(dades)

    return dades.Search
}

export async function detallPelicula(imdbID) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=9e6e78fe`
    const resposta = await fetch(url)
    const dades = await resposta.json()
    if (dades.Response === "False") {
        return null
    }
    return dades
}