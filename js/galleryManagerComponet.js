import flickrAPI from './flickrAPI.js';

class GalleryManager extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // set backToPublicFeed button
        this.backToPublicFeed = document.createElement("DIV");
        this.backToPublicFeed.className = "back-feed hide";
        this.backToPublicFeed.innerHTML = `<a href="#">< Back To Public Feed</a>`
        this.backToPublicFeed.getElementsByTagName("A")[0].onclick = () => {
            this.picturesNode.innerHTML = "";
            this.backToPublicFeed.classList.add("hide");
            this.makePicturesFromItems(this.allItems);
            return false;
        }
        this.picturesNode = document.createElement("DIV");
        this.galleryWrapper = document.createElement("DIV");
        this.galleryWrapper.className = "gallery-wrapper";
        this.picturesNode.className ="gallery-manager";
        flickrAPI.fetchPublicFeed()
        .then( res => {
            // save all the items
            this.allItems = res.items;
            this.makePicturesFromItems(this.allItems);
            this.galleryWrapper.appendChild(this.backToPublicFeed);
            this.galleryWrapper.appendChild(this.picturesNode)
            this.appendChild(this.galleryWrapper);
        });
    }

    loadGalleryByAuthor(authorId) {
        this.backToPublicFeed.classList.remove("hide");
        this.picturesNode.innerHTML = "";
        flickrAPI.fetchAuthorFeed(authorId)
        .then( (res) => {
            this.makePicturesFromItems(res.items);
        });
    }

    makePicturesFromItems(items) {
        for (let idx = 0; idx < items.length; idx++) {
            // create a new picture
            let newPicture = document.createElement("picture-component");  
            let item = items[idx];
            newPicture.setAttribute('imageUrl', item.media.m);
            newPicture.setAttribute('link', item.link);
            newPicture.setAttribute('author', item.author);
            newPicture.setAttribute('date_taken', item.date_taken);
            newPicture.setAttribute('title', item.title);
            newPicture.setAttribute('author_id', item.author_id);
            newPicture.loadGalleryByAuthor = (authorId) => {
                this.loadGalleryByAuthor(authorId);
            }

            // append it to the node of all the pictures
            this.picturesNode.appendChild(newPicture);
        }
    }


}

customElements.define('gallery-manager', GalleryManager);