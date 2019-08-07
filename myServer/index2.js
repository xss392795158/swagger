/* eslint-disable */
// const getNum = (value) => {
//   if(typeof value=='string') {
//     return value;
//   } else {
//     if(!value) {
//       return '';
//     } else {
//       return value * 2;
//     }
//   }
// }

window.createDiv = function(value) {
  var oDiv = document.createElement('div')
  oDiv.id = 'myDiv'
  oDiv.innerHTML = value
  document.body.appendChild(oDiv)
}

// module.exports = getNum;