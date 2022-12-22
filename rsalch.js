const storage = window.localStorage;

var fireruneid = 554;
var natureruneid = 561;
var divinechargeid = 36390;

var skipids = ['554', '561', '36390'];

var dailyalchqty = 192;
var dailyalchmkiiqty = 600;

const getRunes = function() {
    const sampleRow = document.querySelector('#sample_row');
    const table = document.getElementById('alchtable');
    const tbody = table.querySelector('tbody');

    let fireruneprice = rsapidata[fireruneid].price;
    let fireruneqty = 7500;
    let natureruneprice = rsapidata[natureruneid].price;
    let natureruneqty = 11500;
    let divinechargeprice = rsapidata[divinechargeid].price / 3000;

    let alchemiserprice = (fireruneprice * 5) + natureruneprice + (45 / 8 * divinechargeprice);
    let alchemisermkiiprice = natureruneprice + (150 / 25 * divinechargeprice);

    document.getElementById('firerune').innerHTML = '<img class="item_icon" src="/rsdata/images/' + fireruneid + '.gif"> ' + fireruneprice + (rsapidata[fireruneid].price > rsapidata[fireruneid].last ? '<span class="trend_positive">▲</span>' : rsapidata[fireruneid].price < rsapidata[fireruneid].last ? '<span class="trend_negative">▼</span>' : '<span class="coin">●</span>') + ' x' + fireruneqty + ' = ' + (fireruneprice * fireruneqty).toLocaleString();
    document.getElementById('firerune').setAttribute('title', 'Change: ' + (rsapidata[fireruneid].price > rsapidata[fireruneid].last ? '+' : '') + (rsapidata[fireruneid].last != rsapidata[fireruneid].price ? (rsapidata[fireruneid].price - rsapidata[fireruneid].last).toLocaleString() : '0'));
    document.getElementById('naturerune').innerHTML = '<img class="item_icon" src="/rsdata/images/' + natureruneid + '.gif"> ' + natureruneprice + (rsapidata[natureruneid].price > rsapidata[natureruneid].last ? '<span class="trend_positive">▲</span>' : rsapidata[natureruneid].price < rsapidata[natureruneid].last ? '<span class="trend_negative">▼</span>' : '<span class="coin">●</span>') + ' x' + natureruneqty + ' = ' + (natureruneprice * natureruneqty).toLocaleString();
    document.getElementById('naturerune').setAttribute('title', 'Change: ' + (rsapidata[natureruneid].price > rsapidata[natureruneid].last ? '+' : '') + (rsapidata[natureruneid].last != rsapidata[natureruneid].price ? (rsapidata[natureruneid].price - rsapidata[natureruneid].last).toLocaleString() : '0'));
    document.getElementById('divinecharge').innerHTML = '<img class="item_icon" src="/rsdata/images/' + divinechargeid + '.gif"> ' + divinechargeprice.toFixed(2) + (rsapidata[divinechargeid].price > rsapidata[divinechargeid].last ? '<span class="trend_positive">▲</span>' : rsapidata[divinechargeid].price < rsapidata[divinechargeid].last ? '<span class="trend_negative">▼</span>' : '<span class="coin">●</span>');
    document.getElementById('divinecharge').setAttribute('title', 'Change: ' + (rsapidata[divinechargeid].price > rsapidata[divinechargeid].last ? '+' : '') + (rsapidata[divinechargeid].last != rsapidata[divinechargeid].price ? (rsapidata[divinechargeid].price - rsapidata[divinechargeid].last).toLocaleString() : '0') + ' per 3000 charges');

    document.getElementById('alchemiser').innerHTML = alchemiserprice.toFixed(1).toLocaleString();
    document.getElementById('alchemisermkii').innerHTML = alchemisermkiiprice.toFixed(1).toLocaleString();

    for (let itemid in rsapidata) {
        if ("highalch" in rsapidata[itemid] && !skipids.includes(itemid)) {
            let rowClone = sampleRow.content.cloneNode(true);
            let newRow = rowClone.querySelector('tr');

            newRow.dataset.id = itemid;

            let isFav = storage.getItem('alch-' + itemid) ?? 'false';
            if (isFav !== 'false') {
                newRow.dataset.fav = 'true';
            }

            newRow.children[1].dataset.name = rsapidata[itemid].name;
            newRow.children[1].innerHTML = '<img class="item_icon" src="/rsdata/images/' + itemid + '.gif">' + rsapidata[itemid].name;
            newRow.children[2].innerHTML = rsapidata[itemid].price.toLocaleString();
            newRow.children[2].innerHTML = '<span title="Change: ' + (rsapidata[itemid].price > rsapidata[itemid].last ? '+' : '') + (rsapidata[itemid].last != rsapidata[itemid].price ? (rsapidata[itemid].price - rsapidata[itemid].last).toLocaleString() : '0') + '">' + rsapidata[itemid].price.toLocaleString() + (rsapidata[itemid].price > rsapidata[itemid].last ? '<span class="trend_positive">▲</span>' : rsapidata[itemid].price < rsapidata[itemid].last ? '<span class="trend_negative">▼</span>' : '<span class="coin">●</span>') + '</span>';
            newRow.children[2].dataset.value = rsapidata[itemid].price;
            newRow.children[3].innerHTML = Math.floor(rsapidata[itemid].highalch - alchemiserprice).toLocaleString();
            newRow.children[3].dataset.value = rsapidata[itemid].highalch - alchemiserprice;
            newRow.children[4].innerHTML = (rsapidata[itemid].highalch - rsapidata[itemid].price).toLocaleString();
            newRow.children[4].dataset.value = rsapidata[itemid].highalch;
            newRow.children[5].innerHTML = Math.floor(rsapidata[itemid].highalch - rsapidata[itemid].price - alchemiserprice).toLocaleString();
            newRow.children[5].dataset.value = (rsapidata[itemid].highalch - rsapidata[itemid].price - alchemiserprice);
            newRow.children[6].innerHTML = Math.floor((rsapidata[itemid].highalch - rsapidata[itemid].price - alchemiserprice) * dailyalchqty).toLocaleString();
            newRow.children[6].dataset.value = Math.floor((rsapidata[itemid].highalch - rsapidata[itemid].price - alchemiserprice) * dailyalchqty);
            newRow.children[7].innerHTML = Math.floor(rsapidata[itemid].highalch - rsapidata[itemid].price - alchemisermkiiprice).toLocaleString();
            newRow.children[7].dataset.value = (rsapidata[itemid].highalch - rsapidata[itemid].price - alchemisermkiiprice);
            newRow.children[8].innerHTML = Math.floor((rsapidata[itemid].highalch - rsapidata[itemid].price - alchemisermkiiprice) * dailyalchmkiiqty).toLocaleString();
            newRow.children[8].dataset.value = ((rsapidata[itemid].highalch - rsapidata[itemid].price - alchemisermkiiprice) * dailyalchmkiiqty);

            tbody.appendChild(newRow);
        }
    }
};

const makeSortable = function() {
    const table = document.getElementById('alchtable');
    const ths = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');

    for (let th of ths) {
        th.addEventListener('click', function(e) {
            const tableRows = Array.from(tbody.querySelectorAll('tr'));
            let columnindex = [...ths].indexOf(th);
            let sortstate = this.dataset.sort;

            tableRows.sort((a, b) => {
                if (columnindex == 0 && sortstate == 'asc') {
                    th.dataset.sort = 'desc';
                    return a.children[columnindex].dataset.name.localeCompare(b.children[columnindex].dataset.name);
                } else if (columnindex == 0) {
                    th.dataset.sort = 'asc';
                    return b.children[columnindex].dataset.name.localeCompare(a.children[columnindex].dataset.name);
                } else if (sortstate == 'asc') {
                    th.dataset.sort = 'desc';
                    return parseFloat(b.children[columnindex].dataset.value) - parseFloat(a.children[columnindex].dataset.value);
                } else {
                    th.dataset.sort = 'asc';
                    return parseFloat(a.children[columnindex].dataset.value) - parseFloat(b.children[columnindex].dataset.value);
                }
            });

            for (let sortedrow of tableRows) {
                tbody.appendChild(sortedrow);
            }
        });
    };
};

const defaultSort = function() {
    let defaultSortColumn = 6;

    const table = document.getElementById('alchtable');
    const tbody = table.querySelector('tbody');

    const tableRows = Array.from(tbody.querySelectorAll('tr'));

    tableRows.sort((a, b) => {
        if (a.dataset.fav == 'true' && b.dataset.fav == 'false') {
            return -1;
        } else if (b.dataset.fav == 'true' && a.dataset.fav == 'false') {
            return 1;
        }

        return parseFloat(b.children[defaultSortColumn].dataset.value) - parseFloat(a.children[defaultSortColumn].dataset.value);
    });

    for (let sortedrow of tableRows) {
        tbody.appendChild(sortedrow);
    }
};

const favEventListeners = function() {
    let favButtons = document.querySelectorAll('tr.item_row .fav button.fav-btn');
    for (let favButton of favButtons) {
        favButton.addEventListener('click', function() {
            let thisRow = this.closest('tr');
            let thisItemId = thisRow.dataset.id;
            let newState = (thisRow.dataset.fav === 'true') ? 'false' : 'true'
            thisRow.dataset.fav = newState;

            if (newState === 'true') {
                storage.setItem('alch-' + thisItemId, newState);
            } else {
                storage.removeItem('alch-' + thisItemId);
            }
        });
    }
};

window.onload = function() {
    getRunes();
    makeSortable();
    defaultSort();
    favEventListeners();
};
