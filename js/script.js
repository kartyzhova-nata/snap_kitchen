// Emulation of user information taken from the server
var user = {
    share_code: Math.round(Math.random()) ? 'SZOEL99' : null,
    summary: {
        'subtotal': ['$262.89', '$223.46'],
        'tax': ['', '$223.46'],
        'delivery fee via uber': ['', 'FREE'],
        'delivery tips': ['(3)', '$15.00'],
        'this week’s total': ['$299.58', '$256.90'],
        'charging': ['<img class="visa" src="./img/visa.png" alt="visa">', 'visa 4824',]
    }
};

setSummaryTable ();
setShareCode();

function setSummaryTable() {
    var table = document.querySelector('.summary-table');

    var summary = user.summary;
    Object.keys(summary).forEach(function(key){
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        
        td.innerHTML = key;
        tr.appendChild(td);

        for (var item = 0; item < summary[key].length; item++) {
            var td = document.createElement('td');
            td.innerHTML = summary[key][item];
            tr.appendChild(td);
        }

        table.appendChild(tr);
    });
}

function setShareCode() {
    var shareCode = document.querySelector('.share-code');
    userShareCode = user.share_code;
    shareCode.innerHTML = userShareCode ? 'share code: ' + user.share_code : 'Sign up to get code';
}
