const bmiText=document.getElementById("bmi");
const descText=document.getElementById("desc");

const tipsBox = document.getElementById("tips");

const form =document.querySelector("form");
form.addEventListener("reset",handlereset);
form.addEventListener("submit",handlesubmit);

function handlereset()
{
    bmiText.textContent="0";
    bmiText.className="";
    descText.textContent="N/A";

    tipsBox.hidden = true;
    tipsBox.className = "tips";
    tipsBox.innerHTML = "";

}

function handlesubmit(e)
{
    e.preventDefault();   /*stop page refreshig*/
   const weight=parseFloat(form.weight.value);
   const height=parseFloat(form.height.value);
   if(isNaN(weight) || isNaN(height) || weight<=0 || height<=0)
   {
    alert("Please enter a valid height or weight");
    return;
   }
   const heightInMetre=height/100;   /*bmi calculation formula.*/
   const bmi=weight/Math.pow(heightInMetre,2);
   const desc=Interpret(bmi);

   bmiText.textContent=bmi.toFixed(2);  /*making it to 2 decimal places*/
   bmiText.className=desc;
   descText.innerHTML=`You are <strong>${desc} </strong>`;


   const tips = getHealthTips(desc);
tipsBox.className = `tips ${desc}`; // color matches category
tipsBox.innerHTML = `
  <h4>Health tips</h4>
  <ul>${tips.map(t => `<li>${t}</li>`).join("")}</ul>
  <p style="margin-top:.5rem;font-size:.8rem;color:slategray">
    General tips only; check with a healthcare professional for personal advice.
  </p>
`;
tipsBox.hidden = false;

}

function Interpret(bmi)
{
    if(bmi<18.5)
        return "underweight";
    else if(bmi<25)
        return "healthy";
    else if(bmi<30)
        return "overweight";
    else
        return "obese";
}

function getHealthTips(category) {
  const tips = {
    underweight: [
      "Aim for 3 meals + 2–3 snacks daily.",
      "Choose nutrient- and calorie-dense foods (nuts, dairy, eggs, legumes, healthy oils).",
      "Include enough protein to support muscle (about 1–1.2 g/kg/day).",
      "Try light strength training 2–3×/week."
    ],
    healthy: [
      "follow the same and stay active",
      "Prioritize sleep and hydration."
    ],
    overweight: [
      "Focus on whole foods and portion sizes; limit sugary drinks/ultra-processed snacks.",
      "Target 150–300 min/week of activity + 2× strength training.",
      "Build habits: plan meals, eat slowly, track patterns."
    ],
    obese: [
      "Set gradual goals (5–10% weight reduction can improve health markers).",
      "Consult a healthcare professional or dietitian for a tailored plan.",
      "Increase daily movement and strength training; start low-impact if needed.",
      "Support habits: stock healthy options, sleep 7–9 hours."
    ],
  };
  return tips[category] || tips["healthy"];
}
