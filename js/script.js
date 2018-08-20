/* Emulation of user information received from the server
share_code - random value is send to method to emulate
             different values received from the server
mill_plan  - random value for name is send to method to emulate
             different values received from the server
*/
var user = {
    share_code: Math.round(Math.random()) ? 'SZOEL99' : null,
    mill_plan: {
        name: Math.round(Math.random()) ? 'whole30' : 'Low carb',
        energy: 1500,
        days: 3
    },
    summary: {
        'subtotal': ['$262.89', '$223.46'],
        'tax': ['', '$223.46'],
        'delivery fee via uber': ['', 'FREE'],
        'delivery tips': ['(3)', '$15.00'],
        'this week’s total': ['$299.58', '$256.90'],
        'charging': ['<img class="visa" src="./img/visa.png" alt="visa">', 'visa 4824',]
    }
};

setSummaryTable(user);
setShareCode(user);
setMillPlan(user);

/*Method set weekly summary table received from the server*/
function setSummaryTable(user) {
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

/*Method set share code received from the server*/
function setShareCode(user) {
    var shareCode = document.querySelector('.share-code');
    userShareCode = user.share_code;
    shareCode.innerHTML = userShareCode ? 'share code: ' + user.share_code : 'Sign up to get code';
}

/*Method set mill plan received from the server*/
function setMillPlan(user) {
    var millPlan = document.querySelector('.mill-plan');
    var millPlanInfo = user.mill_plan;
    millPlan.innerHTML = millPlanInfo.name + ' <br>' + millPlanInfo.days + ' days / wk  •  ' + millPlanInfo.energy + ' cal / day';
}
