function jsonpFlickr(uri) {
    return new Promise(function(resolve, reject) {
        var id = '_' + Math.round(10000 * Math.random());
        window['jsonFlickrFeed']  = function(data) {
            var ele = document.getElementById(id);
            ele.parentNode.removeChild(ele);
            resolve(data);
        }

        var src = uri;
        var script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.addEventListener('error', reject);
        (document.getElementsByTagName('head')[0] || document.body || document.documentElement).appendChild(script)
    });
}

let flickrAPI = {
    fetchPublicFeed: function() {
        return new Promise( (res, rej) => {
            const url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
            jsonpFlickr(url)
                .then( (data) => {
                    res(data);
                }, rej);
        });
    },

    fetchAuthorFeed(authorId) {
        return new Promise( (res, rej) => { 
            const url = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&ids=${authorId}`;
            jsonpFlickr(url)
            .then( (data) => {
                res(data);
            }, rej);
        });
    }
}

export default flickrAPI;