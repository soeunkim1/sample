//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSCurClsSmtPrt.xtm"/>

/**
 * 강의실현황
 * @class extCcsSRoomPcnd
 * @author 박갑수 at 2016. 7. 6
 */
var extCcsSCurClsSmtPrt = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 객체검색팝업 호출
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId			:	"btnSaCd",
		iCd					:	"",
		iNm					:	"ipbSaCd",
		iObjDivRcd			:	["CC009SA"],
		iStartObject    	:   "",
		iOtDivRcd			:	"",
		iOtIsTreeView	:	"",
		iLanDivRcd		:	"",
		iKeyDate			:	"dipKeyDate",
		iKeyEndDate		:	"",
		oObjDivRcd		:	"",
		oCd					:	"/root/reqKey/strSaCd",
		oCdNm				:	"ipbSaCd",
		oBegDt				:	"",
		oEndDt				:	"",
		oLanDivRcd		:	"",
		func 					:  function(poRtnValue){
			// 검색조건이 있을경우 조회
			var vsSaNm = util.DataMap.getValue(app, "dmReqKey", "strSaNm");
			var vsKeyDate = util.DataMap.getValue(app, "dmReqKey", "strKeyDate");
			
				// 학사부서 입력시 이수과정목록, 교과그룹목록 GET
			doSpCuList(function(pbSuccess) {
				if (pbSuccess){						
					if(ValueUtil.isNull(vsSaNm)){
						util.Control.setValue(app, "cbbCuCd", "");					
					}
				}
			});
			
		}
	}];
	
	
	
	
	// 학년도 ,학기, 출력순서를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 7. 6
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 6
	 */
	moPage.onModelConstructDone_ExtCcsSRoomPcnd = function() {
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				// 조회조건 컨트롤 refresh(학년도, 학기)
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbCuDivRcd"]);
				
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				page.doChangeYearSmt();
				
				util.DataMap.setValue(app, "dmReqKey", "strDiv", "DEPT");
				util.Control.redraw(app, "radDiv");
				
				page.onValueChanged_RadDiv();
				
				util.Control.setFocus(app, "ipbSaCd");
			}
		}, true);
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
	 */
	function doChangeYearSmt(psDiv) {
		
		
		util.DataMap.setValue(app, "dmKeyDateMap", "SMT", "CA00390");
		var vsSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){				
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				util.DataMap.setValue(app, "dmKeyDateMap92", "SMT", "CA00392");
				util.DataMap.setValue(app, "dmKeyDateMap", "YEAR", vsSchYearRcd);
				
				//strCommand: date 
				util.Submit.send(app, "subDate92", function(pbSuccess){
					if(pbSuccess){										
					
					}
				});
				
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
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 7. 9
	 */
	moPage.onClick_BtnSearch = function() {
		
		
		var vsSchDiv = util.DataMap.getValue(app, "dmReqKey", "strDiv");
		
		
		if(vsSchDiv == 'DEPT'){
			// 조회조건 필수 체크
			if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbSaCd", "cbbCuCd"])){
				return false;
			}
		}else{
			if(!util.validate(app, ["cbbSchYearRcd"])){
				return false;
			}
		}
		
		
		var vsSchYearRcd = util.Control.getValue(app, "cbbSchYearRcd");
		var vsSmtRcd = util.Control.getValue(app, "cbbSmtRcd");
		var vsSaCd	= util.DataMap.getValue(app, "dmReqKey", "strSaCd");
		var vsCuDiv	= util.DataMap.getValue(app, "dmReqKey", "strCuDiv");
		var vsCuDivRcd	= util.DataMap.getValue(app, "dmReqKey", "strCuDivRcd");
		var vsCuCd   = util.DataMap.getValue(app, "dmReqKey", "strCuCd");
		
		if(vsSchDiv == 'DEPT'){
			vsCuDivRcd = "";
		}else{
			vsSaCd = "";
			vsCuCd = "";
		}
		
		var voParam = {				
				p_strKeyDate 		: util.DataMap.getValue(app, "dmKeyDateMap", "ST_DT"),			// 기준일자	
				p_strKeyDate92 		: util.DataMap.getValue(app, "dmKeyDateMap92", "ST_DT"),			// 기준일자	
				p_strSchYearRcd	: vsSchYearRcd,															//학년도
				p_strSaCd				: vsSaCd,																		//학사부서코드
				p_strCuCd				: vsCuCd,				// 교과그룹코드
				p_strCuDiv             : vsCuDiv,
				p_strCuDivRcd             : vsCuDivRcd,
				p_strCheckAuthId 	: moUserInfo.id																// 사용자ID
		};
		
		var vsTitle = "교육과정";
		
		var voOzFormParam = {
			  TITLE 		 : vsTitle			// 리포트타이틀
			, SUB_TITLE 	 : "" 					// 리포트서브타이틀		
			, FORM_TYPE : "flash"
		};
		
		util.Report.open(app, "hojReport", "extCcsSCurClsSmtPrt", voOzFormParam, voParam);
	}
	
	
	moPage.onClick_BtnSaCd = function(sender) {
		// 객체검색팝업 호출
		doOnClickStdCmnPObjSch(sender);
	}
	
	moPage.onValueChanged_IpbSaCd = function(sender) {
		
		
		// 값변경시 객체검색팝업 호출
		doOnChangeStdCmnPObjSch(sender);
	}
	
	
	
	/**
	 * @desc 이수과정, 교과그룹목록 조회
	 * @param poCallBackFunc 콜백정의, 교과목코드
	 * @return void
	 * @author 박갑수 at 2016. 2. 1
	 */
	function doSpCuList(poCallBackFunc, psCuCd) {
		//strCommand: getSaSpCu 
		util.Submit.send(app, "subSpCuList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, [ "cbbCuCd"]);
				util.SelectCtl.selectItem(app, "cbbCuCd", 0);				
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	
	
	
	
	
	moPage.onValueChanged_RadDiv = function() {
		
		var vsSchDiv = util.DataMap.getValue(app, "dmReqKey", "strDiv");
		var vaCtl = ['lblSaNm','ipbSaCd','btnSaCd','lblCuCd','cbbCuCd'];
		var vaCtl1 = ['cbbCuDivRcd','lblCuCd1'];
		
		
		if(vsSchDiv == 'DEPT'){
			util.Control.setVisible(app, true, vaCtl );
			util.Control.setVisible(app, false, vaCtl1 );
			
			
		}else{
			util.Control.setVisible(app, false, vaCtl);
			util.Control.setVisible(app, true, vaCtl1 );
			
		}
	};
	return moPage;
};
