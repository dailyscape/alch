var fireruneid = 554;
var natureruneid = 561;
var divinechargeid = 36390;

var dailyalchqty = 192;
var dailyalchmkiiqty = 600;

var checkAlch = [
    {id: 11115, alchval: 11475, buylimit: 500},
    {id: 11126, alchval: 12624, buylimit: 500},
    {id: 1683, alchval: 10575, buylimit: 500},
    {id: 11113, alchval: 12120, buylimit: 500},
    {id: 1645, alchval: 10575, buylimit: 500},
    {id: 1664, alchval: 11025, buylimit: 500},
    {id: 24382, alchval: 11520, buylimit: 5000},
    {id: 25800, alchval: 10783, buylimit: 5000},
    {id: 25800, alchval: 8983, buylimit: 5000},
];

const getRunes = function() {
    const sampleRow = document.querySelector('#sample_row');
    const table = document.getElementById('alchtable');
    const tbody = table.querySelector('tbody');

    let fireruneprice = rsapidata[fireruneid].price;
    let fireruneqty = 7500;
    let natureruneprice = rsapidata[natureruneid].price;
    let natureruneqty = 11500;
    let divinechargeprice = rsapidata[divinechargeid].price / 3000;

    // let alchemiserprice = (fireruneprice * 5) + natureruneprice;
    // let alchemisermkiiprice = natureruneprice;
    let alchemiserprice = (fireruneprice * 5) + natureruneprice + (45 / 8 * divinechargeprice);
    let alchemisermkiiprice = natureruneprice + (150 / 25 * divinechargeprice);

    document.getElementById('firerune').innerHTML = '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + fireruneid + '"> ' + fireruneprice + ' x' + fireruneqty + ' = ' + (fireruneprice * fireruneqty).toLocaleString();
    document.getElementById('naturerune').innerHTML = '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + natureruneid + '"> ' + natureruneprice+ ' x' + natureruneqty + ' = ' + (natureruneprice * natureruneqty).toLocaleString();
    document.getElementById('divinecharge').innerHTML = '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + divinechargeid + '"> ' + divinechargeprice.toFixed(2);

    document.getElementById('alchemiser').innerHTML = alchemiserprice.toFixed(1).toLocaleString();
    document.getElementById('alchemisermkii').innerHTML = alchemisermkiiprice.toFixed(1).toLocaleString();

    for (let item of checkAlch) {

        let rowClone = sampleRow.content.cloneNode(true);
        let newRow = rowClone.querySelector('tr');

        newRow.children[0].innerHTML = rsapidata[item.id].name;
        newRow.children[1].innerHTML = rsapidata[item.id].price.toLocaleString();
        newRow.children[1].dataset.value = rsapidata[item.id].price;
        newRow.children[2].innerHTML = Math.floor(rsapidata[item.id].price + item.alchval - rsapidata[item.id].price - alchemiserprice).toLocaleString();
        newRow.children[2].dataset.value = rsapidata[item.id].price + item.alchval - rsapidata[item.id].price - alchemiserprice;
        newRow.children[3].innerHTML = item.alchval.toLocaleString();
        newRow.children[3].dataset.value = item.alchval;
        newRow.children[4].innerHTML = Math.floor(item.alchval - rsapidata[item.id].price - alchemiserprice).toLocaleString();
        newRow.children[4].dataset.value = (item.alchval - rsapidata[item.id].price - alchemiserprice);
        newRow.children[5].innerHTML = Math.floor((item.alchval - rsapidata[item.id].price - alchemiserprice) * dailyalchqty).toLocaleString();
        newRow.children[5].dataset.value = Math.floor((item.alchval - rsapidata[item.id].price - alchemiserprice) * dailyalchqty);
        newRow.children[6].innerHTML = Math.floor(item.alchval - rsapidata[item.id].price - alchemisermkiiprice).toLocaleString();
        newRow.children[6].dataset.value = (item.alchval - rsapidata[item.id].price - alchemisermkiiprice);
        newRow.children[7].innerHTML = Math.floor((item.alchval - rsapidata[item.id].price - alchemisermkiiprice) * dailyalchmkiiqty).toLocaleString();
        newRow.children[7].dataset.value = ((item.alchval - rsapidata[item.id].price - alchemisermkiiprice) * dailyalchmkiiqty);

        tbody.appendChild(newRow);
    }
}

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
                    return a.children[columnindex].innerHTML.localeCompare(b.children[columnindex].innerHTML)
                } else if (columnindex == 0) {
                    th.dataset.sort = 'asc';
                    return b.children[columnindex].innerHTML.localeCompare(a.children[columnindex].innerHTML)
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
        return parseFloat(b.children[defaultSortColumn].dataset.value) - parseFloat(a.children[defaultSortColumn].dataset.value);
    });

    for (let sortedrow of tableRows) {
        tbody.appendChild(sortedrow);
    }
}

window.onload = function() {
    getRunes();
    makeSortable();
    defaultSort();
};
