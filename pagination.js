var settings = require('./config/settings');

module.exports = function(currentPage, limit, totalEntries) {
    var firstPages = [],
        prevPages = [],
        nextPages = [],
        lastPages = [],
        i;

    var noElementsOnPage = settings.pagination.numberOfElementsOnPage;
    var noFirstPages = settings.pagination.numberOfFirstPages;
    var noPrevPages = settings.pagination.numberOfPrevPages;
    var noNextPages = settings.pagination.numberOfNextPages;
    var noLastPages = settings.pagination.numberOfLastPages;
    var totalPages = Math.ceil(totalEntries / noElementsOnPage);

    /*
    console.log("Total entries: " + totalEntries);
    console.log("Total pages: " + totalPages);
    console.log("Current page: " + currentPage);
    */

    if (currentPage - noPrevPages > noFirstPages) {
        for (i = 1; i <= noFirstPages; i++) {
            firstPages.push(i);
        }
        for (i = currentPage - noPrevPages; i < currentPage; i++) {
            prevPages.push(i);
        }
    } else {
        for (i = 1; i < currentPage; i++) {
            prevPages.push(i);
        }
    }

    if ((currentPage + noNextPages) < (totalPages - noLastPages)) {
        for (i = currentPage + 1; i <= currentPage + noNextPages; i++) {
            nextPages.push(i);
        }
        for (i = totalPages - noLastPages; i <= totalPages; i++) {
            lastPages.push(i);
        }
    } else {
        for (i = currentPage + 1; i <= totalPages; i++) {
            nextPages.push(i);
        }
    }

    return {
        firstPages  : firstPages,
        prevPages   : prevPages,
        nextPages   : nextPages,
        lastPages   : lastPages
    };
};