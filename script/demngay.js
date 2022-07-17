/*function checkNL(i){
    if(i%4 ==0 && i%100!=0 || i%400 ==0){
        return true;
    }
    else{
        return false;
    }
}
let day = +prompt("Enter star day");
let month = +prompt("Enter star Month");
let year = +prompt("Enter star year");
let day1 = +prompt("Enter end day");
let month1 = +prompt("Enter end month");
let year1 = +prompt("enter end year");
let count =0;
function DayOfMonth(i){
    switch(i){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if(checkNL(i)){
                return 29;
            } 
            else{
                return 28;
            }
    }
}
while(year1 > year || month1 > month || day1 > day ){
    while(year1> year){
        if(checkNL(year)){
            count+= 366;
        }
        else{
            count+=365;
        }
        year++;
    }
    while(month1>month){
        count += DayOfMonth(month);
        month++;
    }
    while(day1>day){
        count+=1;
        day++;
    }
}
alert("Day = "+ count);*/
let day1 = new Date("10/7/2022").getTime();
let day2 = new Date("17/7/2022").getTime();
alert("Day = " + Math.round((day2-day1)/(3600*24*1000)))