//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsSLectEvalPrt05.xtm"/>

/**
 * 외래강사시간내역
 * @class stdCcsCCurClsFrf
 * @author 유형기 at 2016. 7. 5
 */
var extCcsSLectEvalPrt05 = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	

	
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 유형기 at 2016. 7. 5
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 7. 5
	 */
	moPage.onModelConstructDone_StdCcsCOpenSubFrf = function() {
		
		
		// 리피트 초기 설정
		//ExtRepeat.init(["rptCcsOpenSub"]);
		
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				
				var vsCutDt = util.DataMap.getValue(app, "dmResOnLoad", "strCutDt");
				var vsMm = vsCutDt.substring(5,6);
				
				vsMm = ValueUtil.fixNumber(vsMm);
				util.DataMap.setValue(app, "dmReqKey", "strMm", vsMm);
				

				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "cbbMm"]);
				util.SelectCtl.selectItem(app, "cbbProfDiv", 0);
				// 학년도 학기값 되돌리기위한 값
				msSchYearRcd = util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				msSmtRcd = util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				
				
			}
		}, true);
	};
	
	
	
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 7. 5
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 7. 5
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 7. 5
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
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 유형기 at 2016. 7. 5
	 */
	moPage.onClick_BtnSearch = function() {
		 
		 
		 // 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd"])){
			return false;
		}
		
		page.doList();
	};
	
	
	
	
	/**
	 * @desc 외래강사 시간내역 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 유형기 at 2016. 7. 5
	 */
	function doList() {	
	
	
	
		var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
		var vsSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
		var vsKeyDate 		= util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");				//--기준일자 		
		var vsMm				= util.DataMap.getValue(app, "dmReqKey", "strMm");
		var vsSchDiv			= util.DataMap.getValue(app, "dmReqKey", "strSchDiv");
		
		

		var voParam = {
				p_strLanDivRcd 			: msDefaultLocale,	 												// 언어키
				p_strKeyDate 			: vsKeyDate,  														// 기준일
				p_strSchYearRcd		: vsSchYearRcd,  													// 학년도
				p_strSmtRcd 				: vsSmtRcd,  															// 학기				
				p_strMm 					: vsMm,  																// 월				
				p_strSchDiv 				: vsSchDiv,  																// 명예교수 /  비전임,외래강사
				p_strMenuId 				: moPageInfo.menuId,												// 메뉴ID
				p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
			};
		
		var vsSchYearRcdNm = ExtInstance.getValue("/root/resOnLoad/schYearRcdList/row", "CD_NM" , "child::CD='"+ vsSchYearRcd +"'");
		var vsSchDiv              = util.DataMap.getValue(app, "dmReqKey", "strSchDiv");
		
		if(vsSchDiv == "CF007018"){
			var vsTitle = vsSchYearRcdNm + " " + vsMm + "월" + " " + "명 예 교 수 시 간 내 역";
	    }else if(vsSchDiv == "CF00311"){
			var vsTitle = vsSchYearRcdNm + " " + vsMm + "월" + " " + "비 전 임 교 원 시 간 내 역";
		}else{
			var vsTitle = vsSchYearRcdNm + " " + vsMm + "월" + " " + "외 래 강 사 시 간 내 역";	
		}
		var voOzFormParam = {
				
				  TITLE :  vsTitle //리포트타이틀
				, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
				, FORM_TYPE : "flash"
			};	
			
			util.Report.open(app, "hojReport", "extCcsSLectEvalPrt05", voOzFormParam, voParam);
					
					
		/*
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				
				var vsSchYearRcd 	= util.DataMap.getValue(app, "dmKeyDateMap", "YEAR");
				var vsSmtRcd 		= util.DataMap.getValue(app, "dmKeyDateMap", "SMT");
				var vsKeyDate 		= util.DataMap.getValue(app, "dmKeyDateMap", "END_DT");				//--기준일자 
				var vsSaCdList 		= util.DataMap.getValue(app, "dmResList", "strListSaCd");				//--기준일자 
				var strStaffGrpRcd 	= util.DataMap.getValue(app, "dmReqKey", "strStaffGrpRcd");
				
				
				

				var voParam = {
						p_strLanDivRcd 			: msDefaultLocale,	 												// 언어키
						p_strKeyDate 			: vsKeyDate,  														// 기준일
						p_strSchYearRcd	: vsSchYearRcd,  														// 학년도
						p_strSmtRcd 		: vsSmtRcd,  																	// 학기
						p_strSaCd	 	: vsSaCdList,  													      	 			// 부서코드
						p_strStaffGrpRcd : strStaffGrpRcd,																//--교원하위그룹
						p_strMenuId 				: moPageInfo.menuId,												// 메뉴ID
						p_strCheckAuthId 		: moUserInfo.id														// 사용자ID
					};
					
				var voOzFormParam = {
						  TITLE : "교과분담명세표" //리포트타이틀
						, SUB_TITLE : "서브타이틀" //리포트서브타이틀		
						, FORM_TYPE : "flash"
					};	
					
					util.Report.open(app, "hojReport", "extCcsSLectEvalPrt01", voOzFormParam, voParam);
			}
		});
		*/
		
		
		
		
	};
	
	return moPage;
};
