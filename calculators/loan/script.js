function calcLoan(){
      const P=parseFloat($('ln-amt').value),r=parseFloat($('ln-rate').value)/100/12,n=parseFloat($('ln-yr').value)*12;
      if(!P||!r||!n)return alert('Fill all fields.');
      const emi=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1),tot=emi*n,int=tot-P;
      $('r-emi').textContent='$'+fmt(emi);$('r-int').textContent='$'+fmt(int);$('r-tot').textContent='$'+fmt(tot);
      showResult('r');
    }