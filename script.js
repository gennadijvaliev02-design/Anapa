const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.setAttribute('aria-label','Открыть меню');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const cards=[...document.querySelectorAll('.gallery-card')];
const lightbox=document.querySelector('#lightbox');
let current=0;
function showPhoto(index){current=(index+cards.length)%cards.length;const card=cards[current];lightbox.querySelector('img').src=card.dataset.image;lightbox.querySelector('img').alt=card.querySelector('img').alt;lightbox.querySelector('figcaption').textContent=card.dataset.caption+' · '+(current+1)+' / '+cards.length;}
cards.forEach((card,index)=>card.addEventListener('click',()=>{showPhoto(index);lightbox.showModal();document.body.classList.add('modal-open');}));
lightbox.querySelector('.close-lightbox').addEventListener('click',()=>lightbox.close());
lightbox.querySelector('.previous').addEventListener('click',()=>showPhoto(current-1));
lightbox.querySelector('.next').addEventListener('click',()=>showPhoto(current+1));
lightbox.addEventListener('close',()=>document.body.classList.remove('modal-open'));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(current-1);}});
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#goal').value=a.dataset.service;}));
document.querySelector('#consult-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const message=`Здравствуйте! Хочу проконсультироваться в НА КЕРАТИНЕ 323.\nИнтересует: ${data.get('goal')}.\nДлина: ${data.get('length')}.\nВолосы: ${data.get('color')}.\nПодскажите, пожалуйста, подходящую процедуру, стоимость и свободное время.`;window.open('https://wa.me/79180676287?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');});
const mobileBook=document.querySelector('.mobile-book');
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.target.id==='consult')mobileBook.classList.toggle('hidden',entry.isIntersecting);}},{threshold:.15});
observer.observe(document.querySelector('#consult'));
