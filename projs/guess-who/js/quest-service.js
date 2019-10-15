const QUESTS_KEY = 'quests';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gSpeechBubblesCnt = 5;


function createQuestsTree() {
    gQuestsTree = loadQuests();
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Singer?');
        gQuestsTree.yes.yes = createQuest('Leonard Cohen');
        gQuestsTree.yes.no = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Actor?');
        gQuestsTree.no.yes = createQuest('Jennifer Aniston');
        gQuestsTree.no.no = createQuest('Rita');
    }
    saveQuests();
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gPrevQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // Create and Connect the 2 Quests to the quetsions tree
    gPrevQuest[lastRes] = createQuest(newQuestTxt);
    gPrevQuest[lastRes].no = gCurrQuest;
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt);
    saveQuests();
}

function getCurrQuestText() {
    return gCurrQuest.txt;
}

function restartGame() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function saveQuests() {
    saveToStorage(QUESTS_KEY, gQuestsTree);
}

function loadQuests() {
    return loadFromStorage(QUESTS_KEY);
}

function getRndSpeechBubbleNum() {
    return getRandomInt(1, gSpeechBubblesCnt);
}

