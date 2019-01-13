
function getImageTemplate(content) {
    return `
        <div class="image-section">
            <a href="${content.link}" target="blank">
                <img src="${content.imageUrl}">
            </a>
        </div>
        <div class="author-section">
            <div class="author">
                <a class="author-href" href="#">${content.author}</a>
            </div>
        </div>
        <div class="title-section">
            <div class="title">${content.title}</div>
            <div class="date-taken">${content.date_taken}</div>
        </div>
    `
}

export default getImageTemplate;