function DateMonth() {
 this.date = new Date();
 this.m = this.date.getMonth();
 this.y = this.date.getUTCFullYear(); // rok obecny
 this.day = this.date.getDate();
 month= this.m;
 year = this.y;
 now = this.y;
 currentDay = this.day;
 date = this.date;
//--------------------------- Data -------------------------------------------------------------------
DateMonth.prototype.CurrentDateSec = function() {
    const current = document.querySelector('#current');
    const months=["styczeń", "luty","marzec", "kwiecień", "maj", "czerwiec","lipiec", "sierpień", "wrzesień", "październik", "listopad","grudzień"];
    function checkTime(i) {
        if (i < 10) {i = "0" + i}
        return i;
    }
    current.innerText +=  checkTime(months[month]) + " " + checkTime(year);
};
//----------------------------Wybór miesięcy w danym roku-----------------------------------------------
    DateMonth.prototype.PrevMonth = function () {
        const tbody = document.querySelector('tbody');
        // while (tbody.firstChild) {
        //     tbody.firstChild.remove();
        // }
        const current = document.querySelector('#current');
        current.innerText ='';
        this.CurrentDateSec();
        function getMonthDays () {
            return new Date(year, month+1, 0).getDate(); // liczy dni w miesiacu za miesiąc poprzedni  now.getMonth()+1- lipiec 31 dni
        }
        function getPrevMonthDays () {
            return new Date(year, month, 0).getDate();
        }
        function getFirstDay (){
            let lastday  = new Date(year, month+1, 0);// ostatni dzien miesiąca w czerwcu   now.getMonth()0-czerwiec, now.getMonth()-1-maj now.getMonth()-2 Kwiecień
            let firstday = new Date(lastday.getFullYear(), lastday.getMonth(), 1);
            return firstday.getDay();
        }
        let dNumbPrevMonth = getMonthDays();
        let prevMonthfDay= getFirstDay();
        let prevMonthDays= getPrevMonthDays();
        calendar.SelectedMonth(dNumbPrevMonth, prevMonthfDay, prevMonthDays);
    }
}
//-------------------------------------generowanie tabeli miesiecy/dekad-------------------------------------------------------
DateMonth.prototype.DisplayMonths = function() {
    month = 6;
    let resultList = [];
    const tbody = document.querySelector('tbody');
    const thead = document.querySelector('thead');
    document.querySelector('#current').innerHTML = year;
    document.querySelector('#current').remove();
    const current = document.createElement('p');
    current.id = 'current';
    current.textContent = year;
    document.querySelector('.datePlaceholder').insertBefore(current, document.querySelector('.datePlaceholder').childNodes[0]);
    const btnHolder = document.querySelector('#btnHolder');
    while (btnHolder.firstChild) {
        btnHolder.firstChild.remove();
    }
    page.CreateArrow();
    document.querySelector('.upArrow').addEventListener('click', function () {
        year = document.querySelector('#current').innerHTML = year;
        year--;
        document.querySelector('#current').innerHTML = year;
    });
    document.querySelector('.downArrow').addEventListener('click', function (event) {
        event.stopPropagation();
        event.stopPropagation();
        year = document.querySelector('#current').innerHTML = year;
        year++;
        document.querySelector('#current').innerHTML = year;
    });
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    }
    while (thead.firstChild) {
        thead.firstChild.remove();
    }
    let last = new Date(year, month - 5, 0);
    let firstday = new Date(last.getFullYear(), last.getMonth(), 1); //01/01/2019
    let lastday = new Date(year, month + 6, 0); //31/12/2019
    let startDate = new Date(firstday);
    let endDate = new Date(lastday);
    let monthNameList = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrze", "paź", "lis", "gru"];
    while (startDate <= endDate) {
        let stringDate = monthNameList[startDate.getMonth()];
        resultList.push(stringDate);
        startDate.setMonth(startDate.getMonth() + 1);
    }
    page.CreateMonths(resultList);
    appObject.SelectmonthSec();
    appObject.DecadesSec();
};
// ----------------------------------------------------Dekady--------------------------------------------------------
DateMonth.prototype.DecadesRange = function() {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    }
    const btnHolder = document.querySelector('#btnHolder');
    while (btnHolder.firstChild ) {
        btnHolder.firstChild.remove();
    }
    document.querySelector('#current').textContent ="";
    page.CreateArrow();
    appObject.ChangeDecades();
};
DateMonth.prototype.DecadeCalcRange = function (yearNumber) {
    let n = yearNumber.toString();
    let sDecade = (''+yearNumber).slice(0,3),
        nDecade = parseInt(sDecade),
        nFirstDecadeYear = parseInt(sDecade + '0'),//obciecie ostatniej cyfry dodanie 0
        range = nFirstDecadeYear + ' - ' + (9 + nFirstDecadeYear),
        isOdd = nDecade % 2,
        startCalYear = '' + (nDecade-1) + (isOdd ? '7':'9');
    let lastDecadeYear = nFirstDecadeYear+9;// wyznaczenie daty poczatkowej
    document.querySelector('#current').textContent= nFirstDecadeYear + "-" + lastDecadeYear;  // zakres
    page.CreateDecades(nFirstDecadeYear, lastDecadeYear, startCalYear, range)

};



