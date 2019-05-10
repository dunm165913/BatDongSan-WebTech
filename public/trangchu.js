var dangnhap=document.querySelector('.dangnhap');
var dangki=document.querySelector('.dangki');
var popupdangnhap=document.querySelector('.popupdangnhap');
var popupdangki=document.querySelector('.popupdangki');
var manhinhden=document.querySelector('.manhinhden');
var manhinhdendk=document.querySelector('.manhinhdendk');
// var div=document.getElementsByTagName('div');

hienthidangnhap=function(){
  console.log("asfsGva");
// div[0].classList.add('manhinhden');
popupdangnhap.classList.remove('an');
popupdangnhap.classList.add('hien');
// popupdangnhap.classList.add('manhinhden');
}
dangnhap.addEventListener('click',hienthidangnhap);
trangbandau=function(){
  console.log("trang bna dau");
  popupdangnhap.classList.add('an');
  popupdangnhap.classList.remove('hien');
}
manhinhden.addEventListener('click',trangbandau);


hienthidangki=function(){
  console.log("dk");
  popupdangki.classList.remove('an');
popupdangki.classList.add('hien');
  
}
dangki.addEventListener('click', hienthidangki);
// trangbandaudk=function(){
//   console.log("trang bna dau");
  
//   popupdangki.classList.remove('hien');
//   popupdangki.classList.add('an');
// }
// manhinhden.addEventListener('click',trangbandaudk);
trangbandaudk=function(){
  console.log("trang bna dau");
  popupdangki.classList.add('an');
  popupdangki.classList.remove('hien');
}
manhinhdendk.addEventListener('click',trangbandaudk);
function dangki(){
let a= $('#form').serialize();
console.log(a)
};