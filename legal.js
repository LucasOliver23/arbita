(function(){
  var L=window.LEGAL||{};
  var LABEL={responsavel:'NOME OU RAZÃO SOCIAL',documento:'CPF OU CNPJ',email:'E-MAIL DE CONTATO',cidade:'CIDADE/UF',site:'ENDEREÇO DO SITE',vigencia:'DATA'};
  document.querySelectorAll('[data-f]').forEach(function(el){
    var k=el.getAttribute('data-f'),v=(L[k]||'').trim();
    if(v){
      if(k==='email'&&el.tagName==='A'){el.href='mailto:'+v}
      el.textContent=v;
    }else{el.textContent='['+(LABEL[k]||k)+']';el.classList.add('ph');el.removeAttribute('href')}
  });
  var toc=document.getElementById('toc');
  if(toc){document.querySelectorAll('article h2[id]').forEach(function(h){var a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;toc.appendChild(a)})}
})();
