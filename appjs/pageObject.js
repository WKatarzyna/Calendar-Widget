
function Page(htmlElement) {
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    }, false);
    this.CreateMainPage(htmlElement);
}
//-------------------------------------Tworzenie
Page.prototype.CreateMainPage = function(htmlElement){
    const timeInput = document.createElement('p');
    timeInput.id ="timeInput";
    htmlElement[0].appendChild(timeInput);
    //------------------------------------------------------------------------------
    const dateInput = document.createElement('p');
    dateInput.id ="dateInput";
    htmlElement[0].appendChild(dateInput);
    //------------------------------------------------------------------------------
    const breakLine = document.createElement('hr');
    htmlElement[0].appendChild(breakLine);
    //------------------------------------------------------------------------------
    const placeholder = document.createElement('div');
    placeholder.classList.add('datePlaceholder');
    htmlElement[0].appendChild(placeholder);
    const currentM = document.createElement('p');
    currentM.id = 'current';
    currentM.classList.add('current');
    placeholder.appendChild(currentM);
    const btnHolder = document.createElement('div');
    btnHolder.id ="btnHolder";
    placeholder.appendChild(btnHolder);
    const wrapper= document.createElement('div');
    wrapper.classList.add('wrapper');
    htmlElement[0].appendChild(wrapper);
    const light = document.createElement('div');
    light.id ='light';
    wrapper.appendChild(light);
    this.CreateArrow();
    const btnDisplay = document.createElement('button');
    btnDisplay.classList.add('display');
    //------------------------------------------------------------------------------
    const timePlaceholder = document.querySelector('#timeInput');
    const datePlaceholder = document.querySelector('#dateInput');
    const divCalender = document.createElement('div');
    divCalender.classList.add('calender');
    htmlElement[0].appendChild(divCalender);
    //------------------------------------------------------------------------------
    const hr = document.createElement('hr');
    hr.classList.add('breakline');
    htmlElement[0].appendChild(hr);
    this.CreateClock(timePlaceholder, datePlaceholder);
};
//-------------------------------Zegar ---------------------------------------------------------------------------------
Page.prototype.CreateClock = function (placeholder) {
    const currentDate = new Date();
    const days = ["niedziela","poniedziałek","wtorek","środa", "czwartek", "piątek", "sobota"];
    const months=["stycznia", "lutego","marca", "kwietnia", "maja", "czerwca","lipca", "sierpnia",
        "września", "października", "listopada", "grudnia"];
    const element = document.querySelector('#dateInput');
    element.innerText +=  days[currentDate.getDay()] +"," + ' ' + checkTime(currentDate.getDate()) + " "
        + checkTime(months[currentDate.getMonth()]) + " " +checkTime(currentDate.getFullYear());
    function startTime () {
        let today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();
        hours =checkTime (hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        placeholder.innerHTML = hours + ":" + minutes + ":" + seconds;
        setTimeout(startTime, 500); //milisekundy
    }
    function checkTime(i) {
        if (i < 10) {i = "0" + i}
        return i;
    }
    startTime();
};
//-------------------------------Tworzenie elementów SVG ---------------------------------------------------------------
Page.prototype.CreateArrow = function() {
    const btnHolder = document.querySelector('#btnHolder');
    const up = document.createElement('div');
    up.classList.add('upArrow');
    btnHolder.appendChild(up);
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svgEl.id ="svg";
    svgEl.setAttribute('viewBox', '0 0 100 100');
    up.appendChild(svgEl);
    const upArrow = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    upArrow.setAttribute('points', '70, 20 80, 10 90, 20' );
    svgEl.appendChild(upArrow);
    const down = document.createElement('div');
    down.classList.add('downArrow');
    btnHolder.appendChild(down);
    const svgEl2 = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svgEl2.id ="svg2";
    svgEl2.setAttribute('viewBox', '0 0 100 100');
    down.appendChild(svgEl2);
    const downArrow = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    downArrow.classList.add('downArrow');
    downArrow.setAttribute('points', '30, 10 40, 20 50, 10' );
    svgEl2.appendChild(downArrow);
};
//-------------------------------Tworzenie tabeli miesięcy--------------------------------------------------------------
Page.prototype.CreateMonths = function (resultList) {
    let tr;
    const tbody = document.querySelector('tbody');
    let counter=0;
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            tr = document.createElement('tr');
            tbody.appendChild(tr);
            tr.classList.add('mtable');
        }
        if (i >= resultList.length) {
            const td = document.createElement('td');
            const mBtn = document.createElement('div');
            mBtn.classList.add('greyBtn');
            tr.appendChild(td);
            td.appendChild(mBtn);
            mBtn.id = `${counter+1}`;
            mBtn.textContent = resultList[`${counter++}`];
            mBtn.dataset.number = `${counter}`;
        }
        else {
            const td = document.createElement('td');
            td.classList.add('mCells');
            const mBtn = document.createElement('div');
            mBtn.classList.add('mBtn');
            mBtn.textContent += resultList[i];
            mBtn.dataset.number = i + 1;
            tr.appendChild(td);
            td.appendChild(mBtn);
        }
    }
};
//-------------------------------Tworzenie tabeli dekad-----------------------------------------------------------------
Page.prototype.CreateDecades = function (nFirstDecadeYear, lastDecadeYear, startCalYear) {
    const tbody = document.querySelector('tbody');

    let tr;
    for (let j = 0; j < 16; j++) {
        if (j % 4 === 0) {
            tr = document.createElement('tr');
            tbody.appendChild(tr);
        }
        const td = document.createElement('td');
        tr.appendChild(td);
        const div =document.createElement('div');
        td.appendChild(div);
        div.innerHTML += parseInt(startCalYear)+j;
        div.classList.add('yearBtn');
        div.id = `${parseInt(startCalYear)+j}`;
        div.dataset.number = parseInt(startCalYear)+j;
        if(div.id <nFirstDecadeYear){
            div.classList.add('belowRange');
        }
        if(div.id >lastDecadeYear){
            div.classList.add('aboveRange');
        }
        if(div.id == now){
            div.style.backgroundColor='royalblue';
            div.classList.add('currentYear');
            div.style.color='white';
        }
        if(div.id == now-100){
            const btnHolder = document.querySelector('#btnHolder');
            // while (btnHolder.firstChild ) {
            //     btnHolder.firstChild.remove();
            // };
        }
        if(div.id == now+100){
            const btnHolder = document.querySelector('#btnHolder');
            // while (btnHolder.firstChild ) {
            //     btnHolder.firstChild.remove();
            // };
        }
    }
    appObject.DecadePanel();
};







