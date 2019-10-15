'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // hide the game-start section
    $('.game-start').hide();
    $('.speech-bubble').css('display', '');
    renderQuest();
    // show the quest section
    $('.quest').show();
    renderQuest();
}

function renderQuest() {
    // select the <h2> inside quest and update its text by the currQuest text
    var currQuest = getCurrQuestText();
    var speechBubbleSrc = `img/speech-bubble/${getRndSpeechBubbleNum()}.png`;
    $('.speech-bubble').attr("src", speechBubbleSrc);
    if (isChildless(gCurrQuest)) {
        $('.quest h4').show();
        $('.speech-bubble').hide();
    }
    $('.quest h2').text(currQuest);
}

function onUserResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        $('.quest').hide();
        if (res === 'yes') {
            $('.end-game').show();
        } else {
            // hide and show new-quest section
            $('.new-quest').show();
        }
    } else {
        // update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // Get the inputs' values
    var newQuestTxt = $('[name="newQuest"]').val();
    var newGuessTxt = $('[name="newGuess"]').val();
    // Call the service addGuess
    if (!newQuestTxt || !newGuessTxt) return;
    addGuess(newQuestTxt, newGuessTxt, gLastRes);
    $('[name="newQuest"]').val('');
    $('[name="newGuess"]').val('');
    onRestartGame();
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.end-game').hide();
    $('.game-start').show();
    $('.quest h4').hide();
    gLastRes = null;
    restartGame();
}

