'use strict';

var gProjs = [
    createProj('Touch Nums', 'HTML and CSS basics', 'First board-game project, based on connecting basic HTML and CSS with Javascript to create a fun and good looking game', 'September 12, 2019', ['Matrix', 'Board-games']),
    createProj('Guess Who', 'jQuery and Bootstrap', 'This project uses for the first time these two libraries for JS and for styling with CSS', 'October 5, 2019', ['Data-tree', 'Framework', 'Library'])
]

function createProj(name, title, desc, date, labels) {
    var id = name.toLowerCase().replace(' ', '-')
    return {
        id,
        name,
        title,
        desc,
        projUrl: `projs/${id}/index.html`,
        imgUrl: `img/portfolio/${id}.JPG`,
        projItemImgUrl: `img/portfolio/${id}-thumbnail.JPG`,
        date,
        labels
    }
}

function getProjs() {
    return gProjs;
}

function getProjById(projId) {
    return gProjs.find(function(proj) {
        return proj.id === projId
    })
}

