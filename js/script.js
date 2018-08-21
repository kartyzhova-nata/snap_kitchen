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
        subtotal: {
            old_price: 262.80,
            new_price: 223.46,
        },
        tax: {
            old_price: 21.78,
            new_price: 18.4,
        },
        delivery_fee_via_uber: {
            old_price: null,
            new_price: 'FREE',
        },
        delivery_tips: {
            count: 3,
            price: 15,
        },
        week_total: {
            old_price: 299.58,
            new_price: 256.86,
        },
        charging: {
            type: 'visa',
            card: 'visa 4824',
        }
    }
};

var summary_labels = {
    subtotal: 'subtotal',
    tax: 'tax',
    delivery_fee_via_uber: 'delivery fee via uber',
    delivery_tips: 'delivery tips',
    week_total: 'this week’s total',
    charging: 'charging'
};

setSummaryTable(user);
setShareCode(user);
setMillPlan(user);

/*Method set weekly summary table received from the server*/
function setSummaryTable(user) {
    var table = document.querySelector('.summary-table');

    var summary = user.summary;
    Object.keys(summary).forEach(function(key) {
        var tr = document.createElement('tr');

        _set_summary_label(tr, key);

        if (key === 'delivery_tips') {
            _set_delivery_tips(tr, summary[key], table);
            return;
        }

        if (key === 'charging') {
            _set_charging(tr, summary[key], table)
            return;
        }

        var td_old = document.createElement('td');
        var old_price = summary[key].old_price;
        td_old.innerHTML = old_price ? ((old_price === 'FREE') ? old_price : '$' + old_price) : '';
        td_old.classList.add('line-through')
        tr.appendChild(td_old);

        var td_new = document.createElement('td');
        var new_price = summary[key].new_price;
        td_new.innerHTML = new_price ? ((new_price === 'FREE') ? new_price : '$' + new_price) : '';
        tr.appendChild(td_new);

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


function _get_summary_label(key) {
    return summary_labels[key];
}

function _set_summary_label(tr, key) {
    var td = document.createElement('td');
    td.innerHTML = _get_summary_label(key);
    tr.appendChild(td);
}

function _set_delivery_tips(tr, delivery_tips, table) {
    var td_count = document.createElement('td');
    td_count.innerHTML = '(' + delivery_tips.count + ')';
    tr.appendChild(td_count);

    var td_price = document.createElement('td');
    td_price.innerHTML = '$' + delivery_tips.price;
    tr.appendChild(td_price);

    table.appendChild(tr);
}

function _set_charging(tr, charging, table) {
    var td_type = document.createElement('td');
    td_type.innerHTML = '<img class="visa" src="./img/visa.png" alt="visa">';
    tr.appendChild(td_type);

    var td_card = document.createElement('td');
    td_card.innerHTML = charging.card;
    tr.appendChild(td_card);

    table.appendChild(tr);
}
