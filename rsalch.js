var fireruneid = 554;
var natureruneid = 561;
var divinechargeid = 36390;

var checkAlch = [
    {id: 11115, alchval: 11475},
    {id: 11126, alchval: 12624},
    {id: 1683, alchval: 10575},
    {id: 11113, alchval: 12120},
    {id: 1645, alchval: 10575},
    {id: 1664, alchval: 11025},
    {id: 24382, alchval: 11520}
];

const getRunes = function() {
    const sampleRow = document.querySelector('#sample_row');
    const table = document.getElementById('alchtable');
    const tbody = table.querySelector('tbody');

    let fireruneprice = rsapidata[fireruneid].price;
    let natureruneprice = rsapidata[natureruneid].price;
    let divinechargeprice = rsapidata[divinechargeid].price / 3000;

    // let alchemiserprice = (fireruneprice * 5) + natureruneprice;
    // let alchemisermkiiprice = natureruneprice;
    let alchemiserprice = (fireruneprice * 5) + natureruneprice + (45 / 8 * divinechargeprice);
    let alchemisermkiiprice = natureruneprice + (150 / 25 * divinechargeprice);

    document.getElementById('firerune').innerHTML = '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + fireruneid + '"> ' + fireruneprice;
    document.getElementById('naturerune').innerHTML = '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + natureruneid + '"> ' + natureruneprice;
    document.getElementById('divinecharge').innerHTML = '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + divinechargeid + '"> ' + divinechargeprice.toFixed(2);

    document.getElementById('alchemiser').innerHTML = alchemiserprice;
    document.getElementById('alchemisermkii').innerHTML = alchemisermkiiprice;

    for (let item of checkAlch) {

        let rowClone = sampleRow.content.cloneNode(true);
        let newRow = rowClone.querySelector('tr');

        newRow.children[0].innerHTML = rsapidata[item.id].name;
        newRow.children[1].innerHTML = rsapidata[item.id].price.toLocaleString();
        newRow.children[2].innerHTML = item.alchval.toLocaleString();
        newRow.children[3].innerHTML = (item.alchval - rsapidata[item.id].price - alchemiserprice).toFixed(2);
        newRow.children[4].innerHTML = (item.alchval - rsapidata[item.id].price - alchemisermkiiprice).toFixed(2);

        tbody.appendChild(newRow);
    }
}

window.onload = function() {
    getRunes();
};