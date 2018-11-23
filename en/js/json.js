function prop_func(x) {
  // Add active class to the current button (highlight it)
  const prop_btn = document.getElementById("nav-rfrd");
  const prop_lis = prop_btn.getElementsByClassName("nav-rfrd-link");
  for (var i = 0; i < prop_lis.length; i++) {
    prop_lis[i].addEventListener("click", function() {
      var current = prop_btn.getElementsByClassName("StepActive");
      current[0].className = current[0].className.replace(" StepActive", "");
      this.className += " StepActive";
    });
  }
  // Build Json for prop
  const prop = '{ "prop" : [' +
'{ "num":"07" , "name":"反空污公投" , "redesign_img":"img/step2-1_red.gif" },' +
'{ "num":"08" , "name":"反燃煤電廠" , "redesign_img":"img/step2-2_red.gif" },' +
'{ "num":"09" , "name":"反日本核食"  , "redesign_img":"img/step2-3_red.gif" },' +
'{ "num":"10" , "name":"民法限異性婚" , "redesign_img":"img/step2-2_red.gif" },' +
'{ "num":"11" , "name":"反性平教育" , "redesign_img":"img/step2-2_red.gif" },' +
'{ "num":"12" , "name":"同婚立專法" , "redesign_img":"img/step2-2_red.gif" },' +
'{ "num":"13" , "name":"東奧正名" , "redesign_img":"img/step2-2_red.gif" },' +
'{ "num":"14" , "name":"同婚修民法" , "redesign_img":"img/step2-2_red.gif" },' +
'{ "num":"15" , "name":"性平教育" , "redesign_img":"img/step2-2_red.gif" },' +
'{ "num":"16" , "name":"以核養綠" , "redesign_img":"img/prop-4_red.gif" } ]}';
  const prop_obj = JSON.parse(prop);

  // Replace Desc for Redesign and Current
  let prop_num = prop_obj.prop[x].num;
  document.getElementById("prop_num").innerHTML = prop_num;
  let prop_name = prop_obj.prop[x].name;
  document.getElementById("prop_name").innerHTML = prop_name;

  document.querySelector('#viz').scrollIntoView({ 
    behavior: 'smooth' 
  });

}
