(function(){
 const menu=document.querySelector('.mobile-toggle'), nav=document.querySelector('.nav');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Fermer ✕':'Menu ☰';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu ☰';}));}
 const progress=document.querySelector('.progress');const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?(window.scrollY/max*100):100)+'%'};window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
 const quiz=document.querySelector('[data-quiz]');
 if(quiz){
  const questions=[
   {q:"À l'origine, l'hypergamie concerne surtout des mariages et des différences de statut social.",correct:true,why:"Exact. Le terme décrit un type d'union observé dans un contexte social, pas un instinct universel."},
   {q:"Si une personne épouse quelqu'un de plus diplômé, cela prouve pourquoi elle l'a choisi.",correct:false,why:"Non. Observer une différence de diplôme ne permet pas de connaître les motivations du couple."},
   {q:"Dans de nombreux pays, l'hypergamie fondée sur le niveau d'études a diminué.",correct:true,why:"Oui. C'est documenté par plusieurs études démographiques internationales."},
   {q:"Le sens viral du terme sur les réseaux est parfaitement identique au sens en sociologie.",correct:false,why:"Non. La version virale transforme souvent une tendance sociale en affirmation générale sur toutes les femmes."}
  ];let idx=0,score=0,done=false;const question=quiz.querySelector('.q'),buttons=[...quiz.querySelectorAll('[data-answer]')],feedback=quiz.querySelector('.feedback'),next=quiz.querySelector('.quiz-next'),count=quiz.querySelector('.score');
  function draw(){const item=questions[idx];question.textContent=item.q;count.textContent=`QUESTION ${idx+1} / ${questions.length}`;feedback.textContent='Choisis une réponse.';next.classList.remove('show');buttons.forEach(b=>{b.disabled=false;b.style.background='';b.style.color='';});done=false;}
  buttons.forEach(b=>b.addEventListener('click',()=>{if(done)return;done=true;const value=b.getAttribute('data-answer')==='true',item=questions[idx];if(value===item.correct)score++;feedback.textContent=(value===item.correct?'✓ Bonne réponse. ':'✕ Pas exactement. ')+item.why+(idx===questions.length-1?' Score final : '+score+'/'+questions.length+'.':'');buttons.forEach(x=>{x.disabled=true;if((x.getAttribute('data-answer')==='true')===item.correct){x.style.background='#d6f76c';x.style.color='#101413';}});next.classList.add('show');next.textContent=idx===questions.length-1?'Recommencer':'Question suivante →';}));
  next.addEventListener('click',()=>{if(idx===questions.length-1){idx=0;score=0;draw();feedback.textContent='Score précédent : '+quiz.dataset.lastScore+'/'+questions.length+'. Nouvelle partie !';}else{idx++;draw();}});
  buttons.forEach(b=>b.addEventListener('click',()=>{if(idx===questions.length-1){quiz.dataset.lastScore=String(score);}}));draw();
 }
})();
