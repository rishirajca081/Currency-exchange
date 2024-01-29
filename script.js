const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
  const dropdowns=document.querySelectorAll(".dropdown select");
  const btn=document.getElementById("button");
//   const btn=document.querySelector(".form button");
  const fromcurr=document.getElementById("fromselect");
  const tocurr=document.getElementById("toselect");
  const msg=document.getElementById("msg");
  for(let select of dropdowns){
    for(currcode in countryList){
        let newpotion=document.createElement("option");
        newpotion.innerText=currcode;
        newpotion.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newpotion.selected="selected";
        }
         else if(select.name==="to" && currcode==="INR"){
            newpotion.selected="selected";
        }
        select.append(newpotion);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

  }

  const updateFlag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
  };

  btn.addEventListener("click", async (evt)=> {
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    console.log(amtval);
    if(amtval === "" || amtval<0){
        amount.value="1";
        amtval=1;
    }
    console.log(fromcurr.value);
    console.log(tocurr.value);
    const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data=  await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    let ans=amtval*rate;
    msg.innerText=`${amtval} ${fromcurr.value} = ${ans} ${tocurr.value}`;
    console.log(ans);
  });



