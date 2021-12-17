//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCLectEvalType.xtm"/>

/**
 * 강의평가설문유형배치
 * @class extCcsCLectEvalType
 * @author 박갑수 at 2016. 5. 11
 */
var extCcsCLectEvalType = function() {
	var moPage = new Page();
	
	var moPObject = new PObject();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnDeptNm",
		iCd					:	"",
		iNm					:	"ipbDeptNm",
		iObjDivRcd			:	["CC009OG", "CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"/root/resOnLoad/strLanDivRcd",
		iKeyDate			:	"/root/keyDateMap/ST_DT",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"/root/reqKey/strObjDivRcd",
		oCd					:	"/root/reqKey/strDeptCd",
		oCdNm				:	"ipbDeptNm",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(){}
	}];
	
	// 학문분야검색
	moPObject.moIdsForStdCcsPDclExtendPopup = [
	{
		controlId 			: "btnDclRcd",
		iLanDivRcd 		: "",
		iRefKey 			: "",				
		iCmpDivRcd 		: "cbbCmpDivRcd",
		iDclRcdCd 		: "",
		iDclRcdNm 		: "",					
		iReadOnlyYn 		: "",
		iStdDclRcdYn 	: "",											//학문분야 표준임포트 사용여부
		oOutDclRcdNm 	: "ipbDclRcdNm",						//학문분야 이름
		oOutDclRcdCd 	: "/root/reqDclRcd/strDclRcd",		//학문분야 배열코드															
		func : function(poParam) {
		}
	}];
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onModelConstructDone_ExtCcsCLectEvalType = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcsOpenSub"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbCmpDivRcd", "cbbSbCatRcd", "cbbLectTypeRcd", "cbbLectEvalTypeRcd", "cbbLectEvalTypeRcdBat", "cbbSbLvlRcd", "cbbBatDiv"]);
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
			// Exception 발생시
			}else {
				if(psDiv == "year"){
					util.Control.setValue(app, "cbbSchYearRcd", msSchYearRcd);
				}else if(psDiv == "smt"){
					util.Control.setValue(app, "cbbSmtRcd", msSmtRcd);
				}
			}
		});
	};
	
	/**
	 * @desc [btnDeptNm]소속(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onClick_BtnDeptNm = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [ipbDeptNm]소속 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsOpenSub"])){
			return false;
		}
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
	
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbDeptNm"])){
			return false;
		}

		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
		});
	};
	
	/**
	 * @desc 강의평가설문유형배치 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCcsOpenSub");
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onClick_BtnRestore = function() {
		// 작업취소
		util.Grid.restoreRow(app, "grdCcsOpenSub");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 강의평가설문유형배치 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCcsOpenSub"], "MSG")){
			return false;
		}

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc [btnBatch]설문Batch onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onClick_BtnBatch = function() {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsOpenSub"])){
			// "변경된 사항이 있습니다. 작업저장 혹은 취소 후 실행해 주시기 바랍니다." 메시지
			util.Msg.alert("NLS-WRN-M014");
			
			return false;
		}
		
		var vsTitle = ExtControl.getTextValue("btnBatch");
		// "설문Batch 을(를) 처리하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M018", [vsTitle]) ){
			// "설문Batch
			doAllBat();
		}
	};
	
	/**
	 * @desc 설문Batch
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	function doAllBat() {
		//strCommand: allBat 
		util.Submit.send(app, "subAllBat", function(pbSuccess){
			if(pbSuccess){
				// 조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						// "처리되었습니다." 헤더 메시지
						util.Msg.notify(app, "NLS.INF.M003");
					}
				});
			}else {
				// "처리가 취소되었습니다." 헤더 메시지
				util.Msg.notify(app, "NLS.INF.M013");
			}
		});
	};
	
	/**
	 * @desc [btnDclRcd]학문분야(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onClick_BtnDclRcd = function(sender) {
		// 이수구분
		var vsCmpDivRcd = util.Control.getValue(app, "cbbCmpDivRcd");

		if(ValueUtil.isNull(vsCmpDivRcd)){
			var vsCmpDivRcdTitle = ExtControl.getTextValue("lblCmpDivRcd");
			// 학문분야 선택 시 조회조건의 이수구분은 필수 입력 항목입니다.
			util.Msg.alert("NLS-CCS-M079");
		}else {
			// 학문분야검색팝업 호출
			doOnClickStdCcsPDclExtendPopup(sender);
		}
	};
	
	/**
	 * @desc 학문분야 일괄추가
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onClick_BtnPlus = function() {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsOpenSub"])){
			// "변경된 사항이 있습니다. 작업저장 혹은 취소 후 실행해 주시기 바랍니다." 메시지
			util.Msg.alert("NLS-WRN-M014");
			
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["ipbDclRcdNm"])){
			return false;
		}
		
		var vsTitle = NLS.CCS.DCLRCDADD;
		// 학문분야 일괄추가 을(를) 처리하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M018", [vsTitle]) ){
			// 추가[ADD], 삭제[DEL]
			util.DataMap.setValue(app, "dmReqDclRcd", "strDclRcdDiv", "ADD");
			// 학문분야 일괄추가삭제
			doDclRcdAddDel();
		}
	};
	
	/**
	 * @desc 학문분야 일괄추가삭제
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	function doDclRcdAddDel() {
		//strCommand: dclRcdAddDel 
		util.Submit.send(app, "subDclRcdAddDel", function(pbSuccess){
			if(pbSuccess){
				// 조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						// "처리되었습니다." 헤더 메시지
						util.Msg.notify(app, "NLS.INF.M003");
					}
				});
			}else {
				// "처리가 취소되었습니다." 헤더 메시지
				util.Msg.notify(app, "NLS.INF.M013");
			}
		});
	};
	
	/**
	 * @desc 학문분야 일괄삭제
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onClick_BtnMinus = function() {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsOpenSub"])){
			// "변경된 사항이 있습니다. 작업저장 혹은 취소 후 실행해 주시기 바랍니다." 메시지
			util.Msg.alert("NLS-WRN-M014");
			
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["ipbDclRcdNm"])){
			return false;
		}
		
		var vsTitle = NLS.CCS.DCLRCDDEL;
		// 학문분야 일괄삭제 을(를) 처리하시겠습니까?" 메시지
		if(util.Msg.confirm("NLS-CRM-M018", [vsTitle]) ){
			// 추가[ADD], 삭제[DEL]
			util.DataMap.setValue(app, "dmReqDclRcd", "strDclRcdDiv", "DEL");
			// 학문분야 일괄추가삭제
			doDclRcdAddDel();
		}
	};
	
	/**
	 * @desc [cbbCmpDivRcd]이수구분 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onValueChanged_CbbCmpDivRcd = function() {
		// 이수구분값 변성시 학문분야 초기화
		util.DataMap.setValue(app, "dmReqDclRcd", "strDclRcd", "");
		util.DataMap.setValue(app, "dmReqDclRcd", "strDclRcdNm", "");
		util.Control.redraw(app, ["ipbDclRcdNm"]);
	};
	
	
	/**
	 * @desc [cbbBatDiv]일괄처리구분 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onValueChanged_CbbBatDiv = function() {
		// 컬럼명칭으로 구분
		var vsBatDiv = util.Control.getValue(app, "cbbBatDiv");
		
		util.DataMap.setValue(app, "dmReqKey", "strValue", "");
		
		if(ValueUtil.isNull(vsBatDiv)){
			util.Control.setVisible(app, false, ["ckbBatCtl", "cbbBatCtl", "ipbBatCtl"]);
		}else {
			
			// 컨트롤구분(CHECK, COMBO, INPUT)
			var vsCdPrp2 = ExtInstance.getValue("/root/resOnLoad/batDivList/row", "CD_PRP2" , "child::CD_PRP1='"+ vsBatDiv +"'");
			
			// CHECK
			if(ValueUtil.fixNull(vsCdPrp2) == "CHECK"){
				
				// 체크박스 라벨
				var vsCdPrp4 = ExtInstance.getValue("/root/resOnLoad/batDivList/row", "CD_PRP4" , "child::CD_PRP1='"+ vsBatDiv +"'");
				
				util.Control.setVisible(app, true, ["ckbBatCtl"]);
				util.Control.setVisible(app, false, ["cbbBatCtl", "ipbBatCtl"]);
				
				if(!ValueUtil.isNull(vsCdPrp4)){
					util.DataSet.setValue(app, "dsBatDivCheckList", "CD_NM", vsCdPrp4, "1");

					util.Control.redraw(app, ["ckbBatCtl"]);
				}
				
			// CMOBO
			}else if(ValueUtil.fixNull(vsCdPrp2) == "COMBO"){
				
				// 콤보코드
				var vsCdPrp3 = ExtInstance.getValue("/root/resOnLoad/batDivList/row", "CD_PRP3" , "child::CD_PRP1='"+ vsBatDiv +"'");
				
				util.Control.setVisible(app, true, ["cbbBatCtl"]);
				util.Control.setVisible(app, false, ["ckbBatCtl", "ipbBatCtl"]);
				
				util.DataMap.setValue(app, "dmReqBatDiv", "strCdCls", vsCdPrp3);
				
				if(!ValueUtil.isNull(vsCdPrp3)){
					// 콤보코드목록 구성
					//strCommand: batDivCd 
					util.Submit.send(app, "subBatDivCd", function(pbSuccess){
						if(pbSuccess){
							util.Control.redraw(app, ["cbbBatCtl"]);
						}
					});
				}
				
			// INPUT
			}else {
				
				util.Control.setVisible(app, true, ["ipbBatCtl"]);
				util.Control.setVisible(app, false, ["ckbBatCtl", "cbbBatCtl"]);
			}
		}
	};
	
	/**
	 * @desc [btnAllBatch]일괄처리 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	moPage.onClick_BtnAllBatch = function() {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCcsOpenSub"])){
			// "변경된 사항이 있습니다. 작업저장 혹은 취소 후 실행해 주시기 바랍니다." 메시지
			util.Msg.alert("NLS-WRN-M014");
			
			return false;
		}
		
		// 일괄처리구분 필수 체크
		if(!util.validate(app, ["cbbBatDiv"])){
			return false;
		}
		
		// @을(를) 처리하시겠습니까?
		var vnIdx = util.SelectCtl.getSelectedIndex(app, "cbbBatDiv");
		var vsValue = util.SelectCtl.getLabel(app, "cbbBatDiv", vnIdx);
				
		if(util.Msg.confirm("NLS-CRM-M018", [vsValue]) ){
			// 일괄처리
			doAllBatProc();
		}
	};
	
	/**
	 * @desc 일괄처리
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 11
	 */
	function doAllBatProc() {
		//strCommand: allBatProc 
		util.Submit.send(app, "subAllBatProc", function(pbSuccess){
			if(pbSuccess){
				// 조회
				doList(function(pbSuccess) {
					if (pbSuccess){
						// "처리되었습니다." 헤더 메시지
						util.Msg.notify(app, "NLS.INF.M003");
					}
				});
			}else {
				// "처리가 취소되었습니다." 헤더 메시지
				util.Msg.notify(app, "NLS.INF.M013");
			}
		});
	};

	
	return moPage;
};
