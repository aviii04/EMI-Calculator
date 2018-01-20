function startOver() {
    document.loan_form.loan_amt.value = "180000";
    document.loan_form.month.value = "360";
    document.loan_form.rate.value = "6";
    document.loan_form.extra.value = "0";
    document.getElementById("loan_info").innerHTML = "";
    document.getElementById("table").innerHTML = "";
}

function validate() {
    var loan_amt = document.loan_form.loan_amt.value;
    var month = document.loan_form.month.value;
    var rate = document.loan_form.rate.value;
    var extra = document.loan_form.extra.value;

    if (loan_amt <= 0 || isNaN(Number(loan_amt)))
    {
        alert("Please enter a valid loan amount");
        document.loan_form.loan_amt.value = "";
    }
    else if (month <= 0 || isNaN(Number(month)) || parseInt(month)!=month)
    {
        alert("Please enter a valid month");
        document.loan_form.month.value = "";
    }
    else if (extra < 0 || isNaN(Number(extra)))
    {
        alert("Please enter a valid extra payment");
        document.loan_form.extra.value = "0";
    }
    else {
        alert("Validation is Successful");
        /*alert(parseInt(loan_amt) + parseInt(month));
        alert();
        alert();
        alert();*/
        calculate(parseFloat(loan_amt), parseInt(month), parseFloat(rate), parseFloat(extra));    
    }
}

function calculate(loan_amt,month,rate,extra) {
    i = rate / 100;
    //alert(i);
    var monthly_payment = loan_amt * (i / 12) * Math.pow((1 + i / 12), month) / (Math.pow((1 + i / 12), month) - 1);
    alert(monthly_payment);
   var info = "";
   info += "<table width='250'>";
   info += "<tr><td>Loan Amount:</td>";
   info += "<td align='right'>" + loan_amt + "</td></tr>";

   info += "<tr><td>No. of Months:</td>";
   info += "<td align='right'>" + month + "</td></tr>";

   info += "<tr><td>Rate of Interest:</td>";
   info += "<td align='right'>" + rate + "%</td></tr>";

   info += "<tr><td>Monthly Payment:</td>";
   info += "<td align='right'>" + round(monthly_payment,2) + "</td></tr>";

   info += "<tr><td>Extra:</td>";
   info += "<td align='right'>" + extra + "</td></tr>";

   info += "<tr><td>Total Payment:</td>";
   info += "<td align='right'>" + round(monthly_payment + extra, 2) + "</td></tr>";

   info += "</table>";
   //alert("Hii"+info);*/
  // alert("rounded value"+round(monthly_payment, 2));
   document.getElementById("loan_info").innerHTML = info;

    //------------------------------------------------------------------------------

   var table = "";
   table += "<table cellpadding='15' border='1'>";
   table += "<tr>";
   table += "<td width='30'>0</td>";
   table += "<td width='60'>&nbsp</td>";
   table += "<td width='60'>&nbsp</td>";
   table += "<td width='60'>&nbsp</td>";
   table += "<td width='100'>&nbsp</td>";
   table += "<td width='70'>" + round(loan_amt,2) + "</td >";
   table += "</tr>";
   //table += "</table>";

   //document.getElementById("table").innerHTML = table;

   var current_balance = loan_amt;
   var payment_counter = 1;
   var total_interest = 0;
   monthly_payment += extra;
  // table = "";
   while (current_balance > 0)
   {
    //   monthly_payment = monthly_payment + extra;
       towards_interest = (i / 12) * current_balance;

       if (monthly_payment > current_balance) {
           monthly_payment = current_balance + towards_interest;
       }
       towards_balance = monthly_payment - towards_interest;
       total_interest = total_interest + towards_interest;
       current_balance = current_balance - towards_balance;

       table += "<tr>";
       table += "<td>" + payment_counter + "</td>";
       table += "<td>" + round(monthly_payment, 2) + "</td>";
       table += "<td>" + round(towards_balance, 2) + "</td>";
       table += "<td>" + round(towards_interest, 2) + "</td>";
       table += "<td>" + round(total_interest, 2) + "</td>";
       table += "<td>" + round(current_balance, 2) + "</td>";
       table += "</tr>";

       payment_counter++;
   }
   table += "</table>";
   document.getElementById("table").innerHTML = table;
   
}

function round(num, dec)
{
    return (Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
}