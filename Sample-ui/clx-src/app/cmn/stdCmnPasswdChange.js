var util = new ComUtil(app);

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 실행 (실패시 cover page)
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess) {
			// 공통코드(비밀번호작성규칙정의[CS017])에 따라 텍스트메시지를 처리한다.
			var vsUserYn 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP1");	//사용여부
			var vsMinLength = util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP2"); // 최소자릿수
			var vsEngUpper 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP3"); // 영대조합
			var vsEngLower 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP4"); // 영소조합
			var vsNumber 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP5"); // 숫자조합
			var vsSpceial 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP6"); // 특수문자조합
			
			var vsLblMinTxt = "";
			
			// 배열정의
			var vaLblMin = new Array();
			
			// 작성규칙정의 사용여부가 Y인 경우만 메시지를 표시한다.
			if(vsUserYn == "Y"){
				if(vsMinLength){
					if(vsEngUpper != "Y" && vsEngLower != "Y" && vsEngLower != "Y" &&  vsNumber != "Y" && vsSpceial != "Y"){
						vsLblMinTxt += vsMinLength+"~16자";
					}else{
						vsLblMinTxt += vsMinLength+"~16자의 ";
					};
				};
				
				// 배열로 입력하여 ','로 연결한다.
				if(vsEngUpper == "Y"){
					vaLblMin.push("영대문자");
				};
				
				if(vsEngLower == "Y"){
					vaLblMin.push("영소문자");
				};
				
				if(vsNumber == "Y"){
					vaLblMin.push("숫자");
				};
				
				if(vsSpceial == "Y"){
					vaLblMin.push("특수문자");
				};
				
				vsLblMinTxt += vaLblMin.join(",");
				
				vsLblMinTxt += "를 조합하여 사용하실 수 있습니다.";
				
				util.Control.setValue(app, app, "lblMinTxt", vsLblMinTxt);
				util.Control.setVisible(app, true, ["lblMinTxt", "lblMinTitle"]);
			}else{
				util.Control.setVisible(app, false, ["lblMinTxt", "lblMinTitle"]);
			};
			
			var vsUserId = util.DataMap.getValue(app, "dmResUserId", "strUserId");
			
			util.DataMap.setValue(app, "dmUserId", "strUserId", vsUserId);
			
			util.Control.setFocus(app, "ipbCurPasswd");
		}; 
	}, true);
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbRePasswdKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbRePasswd = e.control;

	if(e.key == "Enter") {
		app.lookup("btnChange").click();
	};
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnChangeClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnChange = e.control;
	doChange();
}

/**
 * 비밀번호를 변경한다.
 * @return void
 */
function doChange() {
	var vsCurPasswd = util.Control.getValue(app, "ipbCurPasswd");	// 현재비밀번호
	var vsNewPass	= util.Control.getValue(app, "ipbNewPasswd");	// 신규비밀번호
	var vsRePass	= util.Control.getValue(app, "ipbRePasswd");		// 비밀번호 확인
	
	// 필수체크
	if(!util.validate(app, ["ipbCurPasswd", "ipbNewPasswd", "ipbRePasswd"])) {
		return false;
	};
	
	// 현재비밀번호와 신규비밀번호가 같을 경우 오류 메시지 호출
	if(vsCurPasswd == vsNewPass) {
		//현재비밀번호와 신규비밀번호가 동일합니다.
		util.Msg.warn("M207");
		return false;
	};

	var vsUserYn 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP1");	// 사용여부
	var vsMinLength = util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP2");	// 최소자릿수
	var vsEngUpper 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP3");	// 영대조합
	var vsEngLower 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP4");	// 영소조합
	var vsNumber 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP5");	// 숫자조합
	var vsSpceial 	= util.DataSet.getValue(app, "dsPwdVaildChkList", 0, "CD_PRP6");	// 특수문자조합
	
	var voApplyStr = new Array();
	if("Y" == ValueUtil.fixNull(vsEngUpper)) voApplyStr.push("ENG_UPPER");
	if("Y" == ValueUtil.fixNull(vsEngLower)) voApplyStr.push("ENG_LOWER");
	if("Y" == ValueUtil.fixNull(vsNumber))   voApplyStr.push("NUMBER");
	if("Y" == ValueUtil.fixNull(vsSpceial))  voApplyStr.push("SPECIAL");
	
	
	var vsUserId = util.DataMap.getValue(app, "dmResUserId", "strUserId");
	
	if(vsUserYn == "Y") {
		//비밀번호 체크
		if(!checkPasswdValid(vsUserId, vsNewPass, vsRePass, vsMinLength, voApplyStr)) return false;
	};
	
	
	util.Submit.send(app, "subPasswd", function(pbSuccess){
		if(pbSuccess) {
			util.Msg.alert("NLS-INF-M010",["비밀번호"]);
			
			util.Submit.send(app, "subLogout", function(pbSuccessOut){
				if(pbSuccessOut) {
					//var vsConPath = cpr.protocols.Submission.Properties.contextPath;
					
					var vsProtocol 	= location.protocol;
					var vsHost		= location.host;
					var vsPathNm	= location.pathname;
					var vsConPath	= vsProtocol +"//"+ vsHost + vsPathNm;
					
					//ExtPopUp.isPopUp() -> 팝업여부 체크, 변경 후 주석 해제
					//if( ExtPopUp.isPopUp() ) {
					//	opener.location.href =  vsConPath;// + "app/inc/login/login.clx.js";
					//}else{
						util.Msg.alert("NLS-INF-M059");
						window.location.href = vsConPath;// + "app/inc/login/login.clx.js";
					//};
				};
			});
		}else{
			doResetData();
		}
	}, false);
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnResetClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnReset = e.control;
	doResetData();
};

/**
 * 초기화한다. ( 비밀번호를 입력할 컨트롤 전부를 초기화한다.)
 * @return void
 */
function doResetData() {
	// 비밀번호 입력할 컨트롤을 전부 초기화한다.
	util.Control.reset(app, ["ipbCurPasswd", "ipbNewPasswd", "ipbRePasswd"]);
	// 현재 비밀번호에 포커스처리
	util.Control.setFocus(app, "ipbCurPasswd");
};

/*
 * 비밀번호 변경시 체크
 */
function checkPasswdValid(psUserId, psNewPassWord, psNewPassWordRe, psMinPwdLength, paApplyStr) {
	 if (psNewPassWord != psNewPassWordRe)
	  {
		  //입력하신 비밀번호와 비밀번호확인이 일치하지 않습니다.
		  util.Msg.notify(app, "NLS-WRN-M200", "INFO");
		  return false;
	  };
	
	  if (psNewPassWord.length < psMinPwdLength)
	  {
		  //비밀번호는 문자, 숫자, 특수문자의 조합으로 psMinPwdLength~16자리로 입력해주세요.
		  util.Msg.notify(app, "NLS-WRN-M201", "INFO", [psMinPwdLength]);
		  return false;
	  };
	  
	  if(psNewPassWord.search(/[^ㄱ-ㅎ가-힣\s]/g) == -1){
		 //공백문자나 한글제한.
		 util.Msg.notify(app, "NLS-WRN-M206", "INFO");
		 return false;
	  };
	   
		for(var l = 0 ; l < paApplyStr.length ; l++){
			var regexp; 
			//영대
			if("ENG_UPPER" == paApplyStr[l]){
				
				regexp = /[A-Z]/;
				if(psNewPassWord.search(regexp) == -1) {
					util.Msg.notify(app, "NLS-WRN-M205", "INFO", ["영문대문자"]);
					return false;
				}
				
			//영소	
			}else if("ENG_LOWER" == paApplyStr[l]){
				
				regexp = /[a-z]/;
				if(psNewPassWord.search(regexp) == -1) {
					util.Msg.notify(app, "NLS-WRN-M205", "INFO", ["영문소문자"]);
					return false;
				}
				
			//숫자	
			}else if("NUMBER" == paApplyStr[l]){
				
				regexp =  /[0-9]/;
				if(psNewPassWord.search(regexp) == -1) {
					util.Msg.notify(app, "NLS-WRN-M205", "INFO", ["숫자"]);
					return false;
				};
				
			//특수문자	
			}else if("SPECIAL" == paApplyStr[l]){
				
				regexp = /\W|\s/g;
				if(psNewPassWord.search(regexp) == -1) {
					util.Msg.notify(app, "NLS-WRN-M205", "INFO", ["특수문자"]);
					return false;
				};
			
			}else{
				
			}
			
			
		}
		
	  if (psUserId == psNewPassWord)
	  {
		  //비밀번호에 아이디를 사용할 수 없습니다.
		  util.Msg.notify(app, "NLS-WRN-M202", "INFO", ["영문소문자"]);
		  return false;
	  }
	  
	  var SamePass_0 = 0; //동일문자 카운트
	  var SamePass_1 = 0; //연속성(+) 카운드
	  var SamePass_2 = 0; //연속성(-) 카운드
	  
	  var chr_pass_0;
	  var chr_pass_1;
	  
	  for (var i = 0; i < psNewPassWord.length; i++)
	  {
		  chr_pass_0 = psNewPassWord.charAt(i);
		  chr_pass_1 = psNewPassWord.charAt(i + 1);
		  
		  //동일문자 카운트
		  if (chr_pass_0 == chr_pass_1)
		  {
			  SamePass_0 = SamePass_0 + 1
		  }
		  
		  //연속성(+) 카운드
		  if (chr_pass_0.charCodeAt(0) - chr_pass_1.charCodeAt(0) == 1)
		  {
			  SamePass_1 = SamePass_1 + 1
		  }
		  
		  //연속성(-) 카운드
		  if (chr_pass_0.charCodeAt(0) - chr_pass_1.charCodeAt(0) == - 1)
		  {
			  SamePass_2 = SamePass_2 + 1
		  }
	  }
	  if (SamePass_0 > 1)
	  {
		  //동일문자를 3번 이상 사용할 수 없습니다.
		 util.Msg.notify(app, "NLS-WRN-M203", "INFO");
		 return false;
	  }
	  
	  if (SamePass_1 > 1 || SamePass_2 > 1)
	  {
		  //연속된 문자열(123 또는 321, abc, cba 등)을\n 3자 이상 사용 할 수 없습니다.
		  util.Msg.notify(app, "NLS-WRN-M204", "INFO");
		  return false;
	  }
	  return true;
}


/*
 * "다음에변경" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFindPwClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnFindPw = e.control;
	//popup일 경우 app close
	//app.close();
	
}
