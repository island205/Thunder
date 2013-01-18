var shops = [{
    id: 89734,
    name: '雅科(大光明店)'
},
{
    id: 119067,
    name: '颖尚精菜坊'
},
{
    id: 1881676,
    name: '永华电影城'
},
{
    id: 1796977,
    name: '国泰电影院'
},
{
    id: 5733807,
    name: '樱芝形象'
}],
now = new Date()

function getShop() {
    var
    index = Math.floor(Math.random() * 5)

    return shops[index]
}

function formatDate(d) {
    var currDate = d.getDate();
    var currMonth = d.getMonth() + 1; //Months are zero based
    var currYear = d.getFullYear();
    currDate = currDate < 10 ? '0' + currDate: currDate;
    currMonth = currMonth < 10 ? '0' + currMonth: currMonth;
    return currYear + '-' + currMonth + '-' + currDate;
}

exports.getShop = getShop
function getRandomNumberString(length) {
    var
    i, numberString = ''
    for (i = 0; i < length; i++) {
        numberString += Math.floor(Math.random() * 10)
    }
    return numberString
}

exports.getTicket = function () {
    var
    back = Math.floor(Math.random() * 31),
    date = new Date(now)
    date.setDate(date.getDate() - back)
    return {
        shop: getShop(),
        date: date,
        dateString: formatDate(date),
        number: getRandomNumberString(10)
    }
}

