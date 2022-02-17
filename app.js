
const myGiphyKey = 'P94kATucYhKheywkZotdJepwXpO7DL0f'
const gifSearchAPIUrl = 'https://api.giphy.com/v1/gifs/search'

async function getGif() {
    const giphyParams = createAPIParams();
    const myGif = await axios.get(gifSearchAPIUrl, giphyParams);
    return myGif;

}

function getSearchTerm() {
    return $('#search-term').val();
}

function createAPIParams() {
    const searchTerm = getSearchTerm();
    return { params: { q: searchTerm, api_key: myGiphyKey } }

}

function getRandomDataFromResponse(response) {
    const randomDataNumber = Math.floor(Math.random() * response.data.pagination.count);
    return response.data.data[randomDataNumber].images.fixed_height.url;
}

function createImgElement(imageUrl) {
    // console.log($(`<img class='gif' src=${imageUrl}>`))
    return $(`<img class='gif' src=${imageUrl}>`)
}

function appendImg(imageElement) {
    imageElement.prependTo($('#gif-section'))
}

$('#search-button').on('click', async function (e) {
    e.preventDefault();
    try {
        const myGif = await getGif();
        const myImageUrl = getRandomDataFromResponse(myGif)
        const myImageElement = createImgElement(myImageUrl)
        appendImg(myImageElement)

    } catch (error) {
        alert('we could not find that type of gif!!')
    }
    // console.log(myGif);
}
)

$('#remove-images-button').on('click', function (e) {
    e.preventDefault();
    $('img').remove()
})

