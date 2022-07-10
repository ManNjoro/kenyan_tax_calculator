const btn = document.querySelector('#btn');
let bsalary = document.querySelector('#bsalary');
let allowance = document.querySelector('#allowance');
let resultsamount = document.querySelector('.resultsamount')
let taxOnTaxable = document.querySelector('.taxOnTaxable');
let relief = document.querySelector('.relief');
let monthRelief = 2400;
let yearRelief = 28800;
let paye = document.querySelector('.paye');
let nhifContribution = document.querySelector('.nhif');
let netPay = document.querySelector('.netPay');
let beforePension = document.querySelector('.beforepension');
let deductableNssf = document.querySelector('.deductable_nssf');
let chargableIncome = document.querySelector('.chargableIncome');
let taxOffRelief = document.querySelector('.taxOffRelief');
let afterPension = document.querySelector('.afterPension');
let benefits = document.querySelector('.benefits');
let month = document.querySelector('#month');
let year = document.querySelector('#year');
let nssfYes = document.querySelector('#nssfYes');
let nssfNo = document.querySelector('#nsffNo');
let newNssf = document.querySelector('#newNssf');
let old = document.querySelector('#old');
let nhifYes = document.querySelector('#nhifYes');


const add = () => {
    let gross =parseFloat (bsalary.value) + parseFloat (allowance.value);
    return gross;
}
 btn.addEventListener("click",()=>{
    beforePension.innerHTML=add(); 
    
    nhifContribution.innerHTML = nhif();
    deductableNssf.innerHTML=nssfContribution();
    benefits.innerHTML=parseFloat (allowance.value);
    netPay.innerHTML=netpay();
    monthly();
 })

//year
const calculateYearTax = () => {
    let gross =parseFloat (bsalary.value) + parseFloat (allowance.value);
    let taxableIncome = gross - (nssfContribution());
    let tax;

    if(taxableIncome <= 147580){
        tax = ((taxableIncome - 0)* 10/100);
    }
    else if(taxableIncome >= 147581 && taxableIncome <= 286623){
        tax = (((taxableIncome -147581)* 15/100) + 14758);
    }
    else if(taxableIncome >= 286624 && taxableIncome <= 425666){
        tax = (((taxableIncome - 286624)* 20/100) + 35614.45);
    }
    else if(taxableIncome >= 425667 && taxableIncome <= 564709){
        tax = (((taxableIncome - 425667)* 25/100) + 63423.05);
    }
    else if(taxableIncome > 564709){
        tax = (((taxableIncome - 564709)* 30/100) + 98183.8);
    }
    else{
        console.log('error!');
    }
    relief.innerHTML = yearRelief;
    let yearPaye = tax-yearRelief;
    paye.innerHTML= yearPaye.toFixed(2);
    taxOffRelief.innerHTML= paye.innerHTML;
    return parseFloat(tax).toFixed(2);
}
//NHIF
const nhif = () =>{
    let gross =parseFloat (bsalary.value) + parseFloat (allowance.value);
let nhif = 0;
if(gross>1000 && gross<6000){
    nhif=150;
}
else if(gross>5999 && gross<8000){
    nhif=300;
}
else if(gross > 7999 && gross < 12000){
    nhif=400;
}
else if(gross > 11999 && gross < 15000){
    nhif=500;
}
else if(gross > 14999 && gross < 20000){
    nhif=600;
}
else if(gross > 19999 && gross < 25000){
    nhif=750;
}
else if(gross > 24999 && gross < 30000){
    nhif=850;
}
else if(gross > 29999 && gross < 35000){
    nhif=900;
}
else if(gross > 34999 && gross < 40000){
    nhif=950;
}
else if(gross > 39999 && gross < 45000){
    nhif=1000;
}
else if(gross > 44999 && gross < 50000){
    nhif=1100;
}
else if(gross > 49999 && gross < 60000){
    nhif=1200;
}
else if(gross > 59999 && gross < 70000){
    nhif=1300;
}
else if(gross > 69999 && gross < 80000){
    nhif=1400;
}
else if(gross > 79999 && gross < 90000){
    nhif=1500;
}
else if(gross > 89999 && gross < 100000){
    nhif=1600;
}
else if(gross >= 100000){
    nhif=1700;
}
else if(gross<1000){
    alert('salary is less than 1000ksh');
}
if(year.checked==true && nhifYes.checked==true){
    nhif*=12;
}
else if(month.checked==true && nhifYes.checked==true){
    nhif+=0;
}
else if(nhifYes.checked==false){
    nhif=0;
}
return nhif;
}
//NSSF
const nssfContribution = () =>
{
    let nssf;
    let gross =parseFloat (bsalary.value) + parseFloat (allowance.value);
    if(nssfYes.checked==true && newNssf.checked==true){
        nssf= (0.12 * gross);
    }
    else if(nssfYes.checked==true && old.checked==true){
        nssf = 200;
    }
    else{
        nssf = 0;
    }
    resultsamount.innerHTML=gross - nssf;
    chargableIncome.innerHTML = resultsamount.innerHTML;
    afterPension.innerHTML = resultsamount.innerHTML;
    return nssf;
}
//net pay
const netpay = () =>
{
    let netIncome;
    let gross =parseFloat (bsalary.value) + parseFloat (allowance.value);
    if(nhifYes.checked == true && month.checked==true){
        netIncome = (gross - nssfContribution())-((calculate_tax()-monthRelief)+ (nhif()));
    }
    else if(nhifYes.checked == true && year.checked==true){
        netIncome = (gross - ( nssfContribution()))-((calculateYearTax()-yearRelief)+ (nhif()));
    }
    else if(nhifYes.checked == false && month.checked==true){
        netIncome = (gross - nssfContribution())-(calculate_tax()-monthRelief);
    }
    else if(nhifYes.checked == false && year.checked==true){
        netIncome = (gross - nssfContribution())-(calculateYearTax()-yearRelief);
    }
    else{
        netIncome=0;
    }
    
    return parseFloat(netIncome).toFixed(2);
}
const calculate_tax = () =>{
    let gross =parseFloat (bsalary.value) + parseFloat (allowance.value);
    let taxableIncome = gross - nssfContribution();
    let tax;

    if(taxableIncome <= 12998){
        tax = ((taxableIncome - 0)* 10/100);
    }
    else if(taxableIncome >= 12999 && taxableIncome <= 23885){
        tax = (((taxableIncome -12999)* 15/100) + 1229.8);
    }
    else if(taxableIncome >= 23886 && taxableIncome <= 35472){
        tax = (((taxableIncome - 23886)* 20/100) + 2967.85);
    }
    else if(taxableIncome >= 35473 && taxableIncome <= 47059){
        tax = (((taxableIncome - 35473)* 25/100) + 5285.25);
    }
    else if(taxableIncome > 47059){
        tax = (((taxableIncome - 47059)* 30/100) + 8182);
    }
    else{
        console.log('error');
    }
    relief.innerHTML=monthRelief;
    let fixedPaye= tax-monthRelief;
    (paye.innerHTML)= fixedPaye.toFixed(2);
    taxOffRelief.innerHTML= paye.innerHTML;
    return parseFloat(tax).toFixed(2);
}
const monthly = () =>{
    if(month.checked == true){
        taxOnTaxable.innerHTML=calculate_tax();
    }
    else{
        taxOnTaxable.innerHTML=calculateYearTax();
    }
    
}