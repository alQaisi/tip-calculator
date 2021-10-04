var buttons=document.getElementsByClassName("tibBtn");
var selectedTib=document.querySelector('.selected');
var bill=document.querySelector('#bill');
var pplNum=document.querySelector("#pplNum");
var billParent=document.querySelectorAll(".input")[0];
var pplNumParent=document.querySelectorAll(".input")[1];
var resTxt=document.querySelectorAll(".resTxt");
var reset=document.querySelector('.reset');
var customBtn=document.querySelector('.custom');
var values={
    tib:undefined,
    bill:0,
    pplNum:0
};
Array.from(buttons).forEach((item,index)=>{
    index==5?item.addEventListener('click',customTib):item.addEventListener('click',selectTib);
});
reset.addEventListener('click',resetFunc);
bill.addEventListener("input",inputChange);
bill.addEventListener('focusin',focusIn);
bill.addEventListener('focusout',focusOut);
pplNum.addEventListener("input",inputChange);
pplNum.addEventListener('focusin',focusIn);
pplNum.addEventListener('focusout',focusOut);
function focusIn(evt){
    if(evt.target.name=='bill'){
        billParent.classList.remove("warning");
        document.querySelector("#warning").style.display='none';
    }else{
        pplNumParent.classList.remove("warning");
        document.querySelector("#warning2").style.display='none';
    }
}
function focusOut(evt){
    if(evt.target.value==0){
        if(evt.target.name=='bill'){
            document.querySelector("#warning").style.display='initial';
            billParent.classList.add('warning');
        }else{
            document.querySelector("#warning2").style.display='initial';
            pplNumParent.classList.add('warning');
        }
        resTxt[0].textContent="$0.00";
        resTxt[1].textContent="$0.00";
    }
}
function selectTib(evt){
    if (selectedTib!=undefined )
        selectedTib.classList.toggle('selected');
    evt.target.classList.add('selected');
    selectedTib=evt.target;
    if (selectedTib.name!='tib')
        values.tib=evt.target.value.match(/\d+/)[0]
    calculate();
}
function customTib(evt){
    selectTib(evt);
    const element=evt.target;
    changeAttributes(element,{
        value:"",
        type:'number',
        placeholder:"0",
        style:"text-align:right;",
        min:"0",
        max:"100"
    });
    element.addEventListener("input",inputChange);
}
function changeAttributes(element,attributes){
    for(const attribute in attributes){
        element.setAttribute(attribute,attributes[attribute]);
    }
}
function inputChange(evt){
    const name=evt.target.name;
    values[name]=evt.target.value;
    calculate();
}
function enforceMinMax(element){
    element.value=Number(element.value);
    if(element.value != ""){
      if(parseInt(element.value) < parseInt(element.min)){
        element.value = element.min;
      }
      if(parseInt(element.value) > parseInt(element.max)){
        element.value = element.max;
      }
    }
}
function calculate(){
    if(values.pplNum!=0 && values.tib!=undefined && values.bill!=0){
        values.bill=(bill.value*1).toFixed(2);
        pplNum.value=Math.floor(pplNum.value);
        values.pplNum=pplNum.value;
        var tibAmount=((values.bill*(values.tib/100))/values.pplNum).toFixed(2)*1;
        var total=(tibAmount+(values.bill/values.pplNum)).toFixed(2)*1;
        resTxt[0].textContent=`$${tibAmount}`;
        resTxt[1].textContent=`$${total}`;
        reset.classList.remove('disabled');
        reset.classList.add('enabled');
    }
}
function resetFunc(){
    bill.value="0";
    pplNum.value="0";
    values={
        tib:undefined,
        bill:0,
        pplNum:0
    };
    if(customBtn.type=='number')
        changeAttributes(customBtn,{
            type:'button',
            value:"Custom",
            style:"text-align:center;",
        });
    billParent.classList.remove("warning");
    document.querySelector("#warning").style.display='none';
    pplNumParent.classList.remove("warning");
    document.querySelector("#warning2").style.display='none';
    resTxt[0].textContent="$0.00";
    resTxt[1].textContent="$0.00";
    selectedTib.classList.toggle('selected');
    reset.classList.add('disabled')
    reset.classList.remove('enabled')
}
