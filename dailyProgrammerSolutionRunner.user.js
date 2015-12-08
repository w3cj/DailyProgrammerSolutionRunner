// ==UserScript==
// @name         Daily Programmer Solution Runner
// @namespace    http://www.cjr.co.de/
// @version      0.1
// @description  Runs Daily Programmer solutions when on a solution file page, appending run results to the page.
// @author       w3cj
// @match        https://github.com/*/DailyProgrammer*
// ==/UserScript==

function logResult(val){
    $('.DPresult').append('<pre>' + JSON.stringify(val) + '</pre>');
}

function evalSolution() {    
    var $container = $('.js-file-line-container');
    if($container.length > 0) {
       
       $('.file').append('<div class="file-header DPresult"></div>');
       var code = $container.text().replace(new RegExp('console\.log', 'g'), 'logResult');
       var result = eval(code);
       if(result) {
           logResult(result);
       }
    }
    
    setTimeout(checkPageChanged, 1000);
}

function checkPageChanged() {
    if(!window.currentGithubPage && window.history.state) {
        window.currentGithubPage = window.history.state.url
    }
    
    if(window.history.state && window.history.state.url != window.currentGithubPage) {
        console.log('page changed');
        window.currentGithubPage = window.history.state.url;
        evalSolution();
    } else {
        setTimeout(checkPageChanged, 1000);
        console.log('page not changed');
    }
}

setTimeout(checkPageChanged, 1000);

$(function() {
    evalSolution();
});
