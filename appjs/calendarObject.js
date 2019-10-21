function Calendar () {
    // this.qSelectedMonth();
}
Calendar.prototype.SelectedMonth = function (dInMonth, firstInMonth, previousMonthDays) {
    let n = firstInMonth;
    if(n === 0){
        n = 7;
    }
    let day ='';
    const divTable = document.querySelector(".calender");
    divTable.innerHTML='';
    const tab = document.createElement ('table');
    tab.classList.add( 'calender-table');
    const tbody = document.createElement('tbody');
    tbody.id ='tbody';
    const thead =document.createElement('thead');
    divTable.appendChild(tab);
    tab.appendChild(thead);
    const divFront = document.createElement('div');
    divFront.classList.add('front');
    tab.appendChild(tbody);
    const tr1 = document.createElement ('tr');
    thead.appendChild(tr1);
    //nagłówki dni tygodnia
    switch(n){
        case 0:
            day="nie";
            break;
        case 1:
            day ="pon";
            break;
        case 2:
            day="wto";
            break;
        case 3:
            day="śro";
            break;
        case 4:
            day ="czw";
        case 5:
            day="pią";
        case 6:
            day ="sob";
            break;
        default:
            break;
    }
    let number = n-2;
    let counter=1;
    const weekDays =['pon', 'wto','śro','czw','pią','sob','nie'];
    for(let i =0; i <weekDays.length; i++){
        const tWeek = document.createElement('th');
        tWeek.innerHTML= weekDays[i];
        tr1.appendChild(tWeek)
    }
    let tr;

    for(let j =0; j <42; j++){
        if (j % 7 === 0) {
            tr = document.createElement('tr');
            tr.classList.add('active');
            tbody.appendChild(tr);

        }
        if(j<n-1){
            const tdBtn = document.createElement('td');
            tbody.appendChild(tr);
            tr.appendChild(tdBtn);
            let div = document.createElement('div');
            tdBtn.appendChild(div);
            div.innerHTML =`${previousMonthDays-(number)}`;
            div.classList.add('grey');
            number--;
        }
        else if (j + 2 - n > dInMonth) {
            let tdBtn = document.createElement('td');
            let div = document.createElement('div');
            tr.appendChild(tdBtn);
            tdBtn.appendChild(div);
            div.classList.add('grey');
            div.textContent = `${counter++}`;
        } else {
            let tdBtn = document.createElement('td');
            let div = document.createElement('div');
            tdBtn.appendChild(div);
            div.classList.add('daysBtn');
            div.textContent = `${j + 2 - n}`;// komórki z dniami miesiąca
            div.dataset.number = `${j + 2 - n}`;
            div.id = `${j + 2 - n}`;
            let date = new Date();
            let newDate = date.getMonth();
            let yy = date.getFullYear();
            if (div.textContent == currentDay && month === newDate && year === yy) {
                div.classList.add('currentDay');
            }
            tr.appendChild(tdBtn);
}
};
this.RegularHolidays();
this.GetMovableFeasts();
}
Calendar.prototype.RegularHolidays = function() {
    let jan1;
    let jan6;
    let may1;
    let may3;
    let aug15;
    let nov1;
    let nov11;
    let dec25;
    let dec26;
    switch(month){
        case 0:
            jan1= document.querySelector('[data-number~="1"]');
            jan1.classList.add('holidays');
            jan6 = document.querySelector('[data-number~="6"]');
            jan6.classList.add('holidays');
            jan1.title="Nowy Rok";
            jan6.title ="Trzech Króli";
            break;
        case 4:
            may1= document.querySelector('[data-number~="1"]');
            may1.classList.add('holidays');
            may3= document.querySelector('[data-number~="3"]');
            may3.classList.add('holidays');
            may1.title ="Święto Pracy";
            may3.title ="Święto Konstytucji 3 Maja";

            break;
        case 7:
            aug15 =document.querySelector('[data-number~="15"]');
            aug15.classList.add('holidays');
            aug15.title = "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny";
            break;
        case 10:
            nov1 =document.querySelector('[data-number~="1"]');
            nov1.classList.add('holidays');
            nov11 =document.querySelector('[data-number~="11"]');
            nov11.classList.add('holidays');
            nov1.title = "Wszystkich Świętych";
            nov11.title ="Święto Niepodległości";
            break;
        case 11:
            dec25 =document.querySelector('[data-number~="25"]');
            dec25.classList.add('holidays');
            dec26=document.querySelector('[data-number~="26"]');
            dec26.classList.add('holidays');
            dec25.title="Boże Narodzenie (pierwszy dzień)";
            dec26.title ="Boże Narodzenie (drugi dzień)";
            break;
        default:
            break;
    }
};
// ---------------------------------------------sekcja świąt ruchomych---------------------
Calendar.prototype.GetMovableFeasts = function() {
    let easterDate; //Wielkanoc + Poniedziałek wielkanocny
    let selectDay = document.querySelectorAll('.daysBtn');
    let a, b, c, d, e, f, g, h, i, k, l, m, p;
    if (year < 1) return
    a = year % 19;
    b = Math.floor(year / 100);
    c = year % 100;
    d = Math.floor(b / 4);
    e = b % 4;
    f = Math.floor((b + 8) / 25);
    g = Math.floor((b - f + 1) / 3);
    h = (19 * a + b - d - g + 15) % 30;
    i = Math.floor(c / 4);
    k = c % 4;
    l = (32 + 2 * e + 2 * i - h - k) % 7;
    m = Math.floor((a + 11 * h + 22 * l) / 451);
    p = (h + l - 7 * m + 114) % 31;
    let day = p + 1;
    let easterMonth = Math.floor((h + l - 7 * m + 114) / 31);
    if (day < 10) day = day;
    if (easterMonth < 10) easterMonth = easterMonth;
     easterDate = year +"-" + "0" +easterMonth+"-"+ day;
    let eMonth = easterMonth - 1;
    let easterDay = day;
    if (month === eMonth) {
        for (let i = 0; i < selectDay.length; i++) {
            if (i === easterDay) {
                selectDay[i - 1].classList.add('holidays');//Wielkanoc
                selectDay[i - 1].title = "Wielkanoc";
                selectDay[i].classList.add('holidays');//Poniedziałek Wielkanocny
                selectDay[i].title="Poniedziałek Wielkanocny";
            }
        }
    }
  let date = new Date(`${easterDate}`);// Boże Ciało
    date.setDate(date.getDate()+60);
    let xdate = date.getMonth();
    let feastDate = date.getDate();
    if (month === xdate) {
        for (let i = 0; i <= selectDay.length; i++) {
            if (i === feastDate ) {
                selectDay[i - 1].classList.add('holidays');
                selectDay[i - 1].title ="Boże Ciało";
            }
        }
    }
    let newDate = new Date(`${easterDate}`);
    newDate.setDate(newDate.getDate()+49);
    let mfeastDate = newDate.getMonth();
    let dFeastDate = newDate.getDate();
    if (month === mfeastDate) {
        for (let i = 0; i <= selectDay.length; i++) {
            if (i === dFeastDate) {
                selectDay[i - 1].classList.add('holidays');
                selectDay[i - 1].title ="Zesłanie Ducha Świętego (Zielone Świątki)";
            }
        }
    }
};

