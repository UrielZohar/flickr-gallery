import getImageTemplate from '../templates/imageTemplate.js'
import utils from './utils.js'


class PictureComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let newNode = document.createElement("DIV");
        newNode.className = "flickr-image";
        let imageUrl = this.getAttribute('imageUrl');
        let author = utils.extractStringBetweenQuotationMarks(this.getAttribute('author'));
        let title = this.getAttribute('title');
        let date_taken = utils.getFormattedDate(this.getAttribute('date_taken'));
        let link = this.getAttribute('link');
        newNode.innerHTML = getImageTemplate({
            imageUrl,
            author,
            title,
            link,
            date_taken
        });
        newNode.getElementsByClassName("author-href")[0].onclick = (e) => {
            this.loadGalleryByAuthor(this.getAttribute('author_id'));
            return false;
        }
        this.appendChild(newNode);
    }

    loadSpecificAuthorGallery(authorId) {
        
    }
}

customElements.define('picture-component', PictureComponent);