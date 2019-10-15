'use script';


function shuffle(items) {
    var keepItem;
    for (var i = 0; i < items.length; i++) {
        var randIdx = getRandomInt(1, items.length - 1);
        keepItem = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keepItem;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






