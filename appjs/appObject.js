let page, calendar, ndate,month, year, currentDay, date, now

let AppObject = function AppObject (htmlElement){
    page = new Page(htmlElement);
    this.CreatePageObject(htmlElement);
    calendar = new Calendar(htmlElement);
    ndate = new DateMonth();
    this.CreatePrevMonthTable();
    this.CreateNextMonthsTable();
    this.YearSection();
    this.SelectmonthSec();
    this.DecadePanel();
};
AppObject.prototype = {
    CreatePageObject: function(htmlElement){
    },
    CreatePrevMonthTable: function (){
        ndate.PrevMonth(); // początkowa tabela
        const BtnPrevMonth = document.querySelector('.upArrow');
        BtnPrevMonth.addEventListener('click',function(){
            month--;
    if (month < 0) {
        month = 11;
        year--
    }
    ndate.PrevMonth();
        });
    },

    CreateNextMonthsTable: function (){
        const BtnNextMonth = document.querySelector('.downArrow');
        BtnNextMonth.addEventListener('click',function(){
            month++;
            if (month >11) {
                month =0;
                year++
            }
            ndate.PrevMonth();
        });
    },
    YearSection: function() {
       const dateSection=  document.querySelector('#current');
       dateSection.addEventListener('click', ndate.DisplayMonths);

    },
    SelectmonthSec: function (){
        const btnHolder =document.querySelector('#btnHolder');
        const monthBtn = document.querySelectorAll('.mBtn');
        const greyBtn = document.querySelectorAll('.greyBtn');
        const tbody = document.createElement('tbody');
        const thead =document.createElement('thead');
        greyBtn.forEach(btn => btn.addEventListener('click', function(){
            month =this.dataset.number-1;
            year+=1;
            document.querySelector('#current').textContent="";
            while (tbody.firstChild ) {
                tbody.firstChild.remove();

            }
            while (thead.firstChild ) {
                thead.firstChild.remove();
            }
            while (btnHolder.firstChild ) {
                btnHolder.firstChild.remove();
            }
            page.CreateArrow();
            ndate.CurrentDateSec();
            ndate.PrevMonth();
            appObject.CreateNextMonthsTable();
            appObject.CreatePrevMonthTable();
            appObject.DecadesSec();
        }));

        monthBtn.forEach(btn => btn.addEventListener('click', function(){
            month =this.dataset.number -1;
            document.querySelector('#current').textContent="";
            while (tbody.firstChild ) {
                tbody.firstChild.remove();
            }
            while (thead.firstChild ) {
                thead.firstChild.remove();
            }
            while (btnHolder.firstChild ) {
                btnHolder.firstChild.remove();
            }
            page.CreateArrow();
            ndate.CurrentDateSec();
            ndate.PrevMonth();
            appObject.CreateNextMonthsTable();
            appObject.CreatePrevMonthTable();
            appObject.DecadesSec();
        }));
    },

    DecadesSec: function(){
        document.querySelector('#current').addEventListener('click',function(){
            const tbody = document.querySelector('tbody');
            const thead =document.querySelector('thead');
            while (tbody.firstChild ) {
                tbody.firstChild.remove();
            }
            while (thead.firstChild ) {
                thead.firstChild.remove();
            }
            ndate.DecadesRange(now);
            ndate.DecadeCalcRange(year);
        })
    },
    ChangeDecades: function(){
        document.querySelector('.upArrow').addEventListener('click',function(){
            const tbody = document.querySelector('tbody');
            const thead =document.querySelector('thead');
            while (tbody.firstChild ) {
                tbody.firstChild.remove();
            }
            while (thead.firstChild ) {
                thead.firstChild.remove();
            }
            year -=10;  //2009 końcowy rok kolejnej dekady

            if(year >1920) {
                ndate.DecadeCalcRange(year)

            }
            else {
                const btnHolder = document.querySelector('#btnHolder');
                while (btnHolder.firstChild ) {
                    btnHolder.firstChild.remove();

                };
            }
        });
        document.querySelector('.downArrow').addEventListener('click',upDecade)

            function upDecade(){
                const tbody = document.querySelector('tbody');
                const thead =document.querySelector('thead');
                while (tbody.firstChild ) {
                    tbody.firstChild.remove();
                }
                while (thead.firstChild ) {
                    thead.firstChild.remove();
                }
                year+=10;  //2029 końcowy rok kolejnej dekady
            }
    },
    DecadePanel: function (){
        const btnHolder =document.querySelector('#btnHolder');
        const yearBtn = document.querySelectorAll('.yearBtn');
        yearBtn.forEach(btn => btn.addEventListener('click', function(){
            const tbody = document.querySelector('tbody');
            while (tbody.firstChild ) {
                tbody.firstChild.remove();
            }
            while (btnHolder.firstChild ) {
                btnHolder.firstChild.remove();
            }
            document.querySelector('#current').textContent="";
            year = parseInt(this.dataset.number);
            ndate.DisplayMonths();
        }));
    }
};