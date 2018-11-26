// Build Json for prop
const prop = '{ "prop" : [' +
  '{"num": "07", "name": "","full_case": "Do you agree that the electricity output of thermal power plants should be lowered by \'at least 1 percent per year on average\'?" , "Reasoning": "1. 國內歷年來已有許多實證研究證明，PM2.5確會造成國民呼吸道疾病，也是台灣慢性病危險因子的前四名，對老人及兒童之影響尤其明顯。<br><br>2. 蔡政府為實現2025年非核家園之政見，根據經濟部規劃的能源配比，2025年我國燃煤發電占比將達到30%、天然氣50%、再生能源20%。而在過渡期間則燃煤高達50%、天然氣30%、再生能源10%、核能10%之局面，可看出不管在任何階段，火力發電占比均達80%，實在是對台灣環境及國民健康不可承受之重。<br><br>3. 台灣約有8成電力來自於火力發電機組，燃煤及燃氣之43座發電機組中，有28座位於中南部，占65%，其中台中火力電廠更是全球第二大火力發電廠，對中南部居民造成更高的健康風險。"},' +
  '{"num": "08","name": "","full_case": "Do you agree that Taiwan should establish an energy policy that undertakes not to construct any new coal-fired power plants or generators or expand existing facilities (including the expansion of the Shen\'ao Power Plant)?","Reasoning": "本項公民投票，主要針對政府的能源政策目標，預計2025年各項能源發電占比達到燃氣發電50%、燃煤發電30%、再生能源20%。根據上述政策目標，預計在2025年燃煤發電量，大約只需要815億度到995億度之間。然而，2016年台灣的燃煤發電量就已經約1200億度，已經遠超過未來所需的燃煤發電量，顯而易見地未來有些燃煤機組及電廠在未達除役年限就必須停止運轉。而在此背景下，政府還要投資增加深澳燃煤電廠更新擴建計畫，顯然與政府2025年的能源政策目標背道而馳。"},' +
  '{"num": "09","name": "","full_case": "Do you agree the government should maintain the ban on imports of agricultural products and food from areas in Japan affected by the Fukushima Daiichi nuclear plant disaster on March 11, 2011, including Fukushima, Ibaraki, Gunma, Tochigi and Chiba prefectures?","Reasoning": "我們主張將核災相關地區的食品是否進口之議題訴諸公投，本項公民投票提案之理由分述如下：<br><br>1. 目前全台相關檢測單位之儀器及人力量能不足，在2016立法院公聽會時，核研所表示，該所編制內只有「10人」「兼職」進行食品檢測，如果增加檢驗的量超過一成，那就需要編列預算，添購儀器以及增加人力。<br><br>2. 台日地位位置相近，貿易往來密切，加上國人喜愛食用日本食材，因此潛在的風險較高，政府自然應該嚴格把關，謹慎保障國人的健康與食安。<br><br>3. 我國自2013年起，即不斷敦促日本與我國針對簽署「經濟貿易夥伴協定（EPA）」進行談判，而日本311福島核災周邊地區食品的進口，正是台日雙方談判重點。如我國在雙方開始談判前，即片面同意進口核災周邊地區食品，不啻於放棄我方最大的談判籌碼，後續貿易談判的結果勢必更將對日本做出更大讓步，嚴重不利於我國之相關產業。<br><br>4. 開放進口核災相關地區的食品之舉與政府2025年非核家園之政策背道而馳。"},' +
  '{"num": "10","name": "","full_case": "Do you agree that the Civil Code should restrict marriage to be formed between a man and a woman?","Reasoning": "1. 我國現行法尚無婚姻定義及婚姻當事人性別結構之立法明文<br><br>2. 本公投案不排除同性二人依其他法律規定行使釋字第748號所稱之「婚姻自由」- 亦即「同性二人得為經營共同生活之目的，成立具有親密性及排他性之永久結合關係」<br><br>3.民法婚姻規定仍維持一男一女之結合，惟得以其他法律規定保障同性別二人之結合關係，如此可兼顧法律安定性與立法經濟原則，具有高度的公益性<br><br>4.民法婚姻定義應由公投決定：按憲法第二條:「中華民國之主權屬於國民全體。」憲法第十七條明定，人民有創制之權"},' +
  '{"num": "11","name": "","full_case": "Do you agree that the Ministry of Education and individual schools should not cover LGBT materials in gender education in elementary and middle schools, as detailed in the Enforcement Rules for the Gender Equity Education Act?","Reasoning": "1. 基於保護兒少身心健康之重大公共利益，教育部及各級學校不應對國民中小學階段之學生實施同志教育<br><br>2. 本公投案通過後，教育部應為實現本公投案內容之必要處置，亦即教育部應廢止其所主管之性平法施行細則所定的同志教育<br><br>3. 本公投案並無牴觸憲法平等權或比例原則<br><br>4. 同志教育之實施應交付公投決定<br><br>"},' +
  '{"num": "12","name": "","full_case": "Do you agree that the right of same-sex couples living together permanently should be regulated under other special laws that are independent from the Civil Code?","Reasoning": "1. 大法官748解釋肯認得以制定特別法或其他形式保障同性二人之永久結合關係<br><br>2. 「異性婚姻」與「同性結合」在生理、心理與社會理解上仍有諸多不同。現行民法婚姻規範，均係以異性婚姻為前提所為設計，是故國家保障同性別二人之永久共同生活權益，宜以民法婚姻規定以外之形式保障之，如此既不影響傳統異性婚姻及其衍生的法律關係，又可兼顧少數群體之保障，實屬符合法安定性及立法經濟之最佳模式<br><br>"},' +
  '{"num": "13","name": "","full_case": "Do you agree that Taiwan should use the name “Taiwan” to apply for participating in all international sporting events, including the 2020 Summer Olympics in Tokyo?","Reasoning": "1. 根據《奧林匹克憲章》第30條，國家奧會的名稱必須反映領土範圍和傳統，再經國際奧會執行委員會核准。然而，現行的「中華台北」並未反映領土範圍和傳統，事實上，許多台灣選手並非來自台北<br><br>2. 在歷史上，台灣選手曾有一次以Formosa（福爾摩沙）、三次以Taiwan（台灣）的名義參加奧運。「正名」也有國際先例。「荷蘭奧會」曾於1992年就成功向國際奧會提出申請，將他們的國家奧會由Holland正名為Netherlands，其後便持續以「尼德蘭」的名義參與奧運<br><br>3. 「正名」並不會影響台灣選手的參賽權利，中華奧會和台灣選手參賽資格是可以脫鉤的。2016年影響剛結束的巴西里約奧運就是一例，巴西奧會主席紐曼因為涉嫌買票，因此國際奧會針對紐曼個人和巴西奧會做出懲處，將巴西奧會停權，但國際奧會在這項處分中強調，仍會保障巴西選手的獎學金與參賽資格"},' +
  '{"num": "14","name": "","full_case": "Do you agree that the right of same-sex couples getting married should be regulated under the Civil Code?","Reasoning": "1. 「現行民法」被大法官釋字第748號認證為「立法不足」（將結婚當事人限於一男一女始得締結。）所以我們現在要求立法者，必須修正「民法婚姻章」的適用對象，擴大讓同性別二人可以建立婚姻關係<br><br>2. 從法律的觀點看，「民法以外的婚姻專法」不但延續歧視造成的傷害，還會製造法律解釋適用的困難，增加社會成本。德國同性伴侶法路途崎嶇，歷經各項龐雜調整，期間耗費社會成本不計其數<br><br>3. 本主文並未違反公投法「一案一事項」要求。我們不認為下福盟等提出的主文，與我們主文效果相同。當他們提出：「你是否同意民法婚姻規定應限定在一男一女的結合？」、「你是否同意以民法婚姻規定以外之其他形式來保障同性別二人經營永久共同生活的權益？」，若認「不同意票」較多，也只意味著「婚姻不限定於一男一女」或是「不以民法婚姻規定以外的形式保障同性別二人，經營共同生活」。此外，「不以民法婚姻規定形式以外的方式」保障同性別二人能經營共同生活，其實也不等於願意特以「民法婚姻『章』」賦予同性二人婚姻地位<br><br>"},' +
  '{"num": "15","name": "","full_case": "Do you agree that the gender equity education taught at all stages of the national curriculum stipulated in the Gender Equity Education Act should cover emotional, sex, and LGBT education?","Reasoning": "1. 無論霸凌是言語的或肢體的，都傳達出明確的訊息，同性戀或雙性戀青少年感覺到自己不被接受，是次等的族群，因而對未來感到絕望。而完善的性別平等教育可以成為拆彈大隊，成為安全網，不再輕易失去任何一個脆弱的靈魂"},' +
  '{"num": "16","name": "","full_case": "Do you agree to abolish Section 1 of Article 95 of the Electricity Act, which states that \'all nuclear power generating facilities shall cease operations by 2025?\'","Reasoning": "1. 無條件「非核」的代價是高污染與對環境的破壞<br><br>2. 燃氣發電成本主要來自燃料採購，故發電成本會隨著國際石化燃料價格的波動而極不穩定，若將其作為基載電力勢必導致電價大幅震盪。日本停核後因大量依賴燃氣發電導致連年入超，基於現實考量，日本政府已宣布重啟核電<br><br>3. 當二氧化碳減排為全球共識時，我國卻因核電機組停轉，碳排不減反增，還得面對空汙增加的肺癌風險，最終導致地方政府對燃煤電廠的燃煤使用祭出上限，此舉預估將使全國人民生活在缺電、限電、與斷電的陰影下<br><br>"}]}';

const prop_obj = JSON.parse(prop);

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
  // Replace Desc for Redesign and Current
  let prop_num = prop_obj.prop[x].num;
  document.getElementById("prop_num").innerHTML = prop_num;
  document.getElementById("i_prop_num").innerHTML = prop_num;
  let prop_name = prop_obj.prop[x].name;
  document.getElementById("prop_name").innerHTML = prop_name;
  document.getElementById("i_prop_name").innerHTML = prop_name;
  let full_case = prop_obj.prop[x].full_case;
  document.getElementById("full_case").innerHTML = full_case;
  let reasoning = prop_obj.prop[x].Reasoning;
  document.getElementById("reasoning").innerHTML = reasoning;

  document.querySelector('#viz').scrollIntoView({ 
    behavior: 'smooth' 
  });

}
