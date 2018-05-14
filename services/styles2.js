const loadQueryPoints = (event) => {
  console.log($(event).val());

  let data
  const value = $(event).val()
  if (value === 'bakmi') {
    data = DATA[0]
  } else if (value === 'padang') {
    data = DATA[1]
  }

  var instance = M.FormSelect.getInstance(event);

  console.log('====================================');
  console.log(instance);
  console.log('====================================');

  $('#queryPoints').empty()
  var i = 1;
  $('#queryPoints').append('<option value="" disabled selected>Pilih Query Points</option>')
  data.forEach((d) => {
    // console.log(d);
    
     $('#queryPoints').append(`
      <option value="${d.id}"> ${i} . (${d.lat} || ${d.lng})</option>
    `)
    i++;
  })

  $('#queryPoints').formSelect();
}

$(document).ready(function(){
  $('select').formSelect();
});
document.querySelector('#nilaiK').addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    generateQueryPoints()
  }
});