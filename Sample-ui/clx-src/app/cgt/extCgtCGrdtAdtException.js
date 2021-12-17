//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgtCGrdtAdtException.xtm"/>


var extCgtCGrdtAdtException = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
	/* 
	 * 객체 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCmnPObjSch = [
	{
		controlId 	: "btnDeptNmPop",
		iCd 		: "",
		iNm 		: "ipbDeptNm",
		iObjDivRcd 	: ["CC009OG","CC009SA"],
		iLanDivRcd 	: "",
		iKeyDate 	: "",
		oObjDivRcd 	: "/root/reqKey/strDeptObjDivRcd",
		oCd 		: "/root/reqKey/strDeptCd",
		oCdNm 		: "ipbDeptNm",
		oStDt 		: "",
		oEndDt 		: "",
		oLanDivRcd 	: "",
		func 		: ""
	}
	];
	
	/* 
	 * 학생 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId     	: "btnStudNoPop",
		iStudNo       	: "ipbStudNo",
		iStudId       	: "",
		iStudNm       	: "",
		iKeyDate	  	: "",
		iObjDivRcd 		: "",
		iObjCd     	  	: "",
		iObjNm 			: "",
		iAuthYN		  	: "",
		oStudId       	: "/root/reqKey/strStudId",
		oStudNo       	: "ipbStudNo",
		oStudNm       	: "",
		oSsn          	: "",
		oStatNm 	  	: "",
		oStatRcd	  	: "",
		oProcRslt	  	: "",
		oProcRsltYear	: "",
		oSaCd         	: "",
		oSaNm         	: "",					
		oSpCd         	: "",
		oSpNm         	: "",
		oOgCd 		  	: "",
		oOgNm 		  	: "",
		func 		  	: ""
	}
	];
	
	// 학점 취득현황 팝업 필수정의사항
	moPage.moStudRecCmpPopup = {
		strStudId	  : "" ,
		strOpenPgmDiv : "XTM"
	};
	
	/**
	 * @desc Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 객체검색 Import onLoad
	 * @return void
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	};
	
	/**
	 * @desc 온로드
	 * @return void
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onModelConstructDone_ExtCgtCGrdtAdtException = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptAdtRslt","frfAdtRslt","rptScrngRslt"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch",["grpData"]);
		
		//졸업학년도학기 임포트
		doOnLoadImpCgtSch(function(pbSuccess){
			if(pbSuccess){
				//strCommand: onLoad 
				util.Submit.send(app, "subOnload", function(pbSuccess){
					util.Control.redraw(app, "cbbAdtRsltRcd");
				});	
			}
		});
		
	};
	
	/**
	 * @desc 팝업호출시 기준일자 셋팅
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	function doSetPopKeyDate() {
		var vsKeyDate = ExtInstance.getValue("instance('impExtCgtSch')/root/reqKey/strKeyDate").substr(0,8);
		moPObject.moIdsForStdCmnPObjSch[0].iKeyDate = vsKeyDate;
		moPObject.moIdsForStdCsrPStSearch[0].iKeyDate = vsKeyDate;
	};
	
	/**
	 * @desc 학과 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onClick_BtnDeptNmPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학과명 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onValueChanged_IpbDeptNm = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCmnPObjSch(sender);
	};
	
	/**
	 * @desc 학번 변경 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onClick_BtnStudNoPop = function(sender) {
		doSetPopKeyDate();
		doOnClickStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 학번 검색 팝업 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doSetPopKeyDate();
		doOnChangeStdCsrPStSearch(sender);
	};
	
	/**
	 * @desc 졸업학년도/졸업학기 변경시 학과, 학번 초기화
			- 2017.01.10 초기화로직 주석	
	 * @param 
	 * @return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	function doSetKeyDateYearSmtImp(){
//		ExtControl.reset(["ipbDeptNm", "ipbStudNo"]);
//		ExtInstance.setValue("/root/reqKey/strDeptCd", "");
//		ExtInstance.setValue("/root/reqKey/strDeptObjDivRcd", "");
//		ExtInstance.setValue("/root/reqKey/strStudId", "");
	};
	
	/**
	 * @desc 조회조건 수행
	 * @param
	 * @@return 
	 * @author Aeyoung Lee at 2016. 7. 8.
	 */
	moPage.onClick_BtnSearch = function() {
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}	
		
		if(!util.validate(app, ["grpSearch"])){
			return false;
		}
		
		doList(function(pbSuccess){
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});	
	};
	
	/**
	 * @desc  졸업사정결과 목록을 조회한다.
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 7. 8.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdAdtRslt");
				
				// 확정데이터 존재여부
				var vsCgtCnfmYn = util.DataMap.getValue(app, "dmResList", "strCgtCnfmYn");
				
				if(vsCgtCnfmYn == "Y"){
					// 졸업확정절차(학위증서번호부여)전에만 수정가능합니다.
					util.Msg.alert("NLS-CGT-M032");
					util.Control.setEnable(app, false, ["frfAdtRslt","btnRestore","btnSave"]);	
				}else{
					util.Control.setEnable(app, true, ["frfAdtRslt","btnRestore","btnSave"]);	
				}	
				
				//moPage.doCompareFrfEnable();	
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc  졸업사정결과 목록 row select 이벤트
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016. 7. 8.
	 */
	moPage.onRowSelect_RptAdtRslt = function() {
		// 리피트 특정 row 데이터를 프리폼 copy
//TO-BE: <ExtRepeat.copyRowForm> 그리드-프리폼인 경우에는 selection바인딩으로 처리하기 때문에 불필요함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.copyRowForm("rptAdtRslt","frfAdtRslt");
		
		doCompareFrfEnable();
	};
	
	/**
	 * @desc  마스터 리피트 상태에 따른 디테일 프리폼 비활성화 제어
	 *			    1. index가 지정되지 않았을 경우
	 *			    2. 현재 index의 로우가 삭제 상태일 경우 
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 7. 8.
	 */
	function doCompareFrfEnable() {
		
		var vnIdx = util.Grid.getIndex(app, "grdAdtRslt");
		
		// 마스터 로우 없을경우 프리폼 리셋
		var vsRowCnt = util.Grid.getRowCount(app, "grdAdtRslt");
		if( vsRowCnt <= 0 || !vnIdx){
			util.Control.reset(app, "frfAdtRslt");
		}	
		
		util.DataMap.setValue(app, "dmReqSubKey", "strSchYearRcd", util.Grid.getCellValue(app, "grdAdtRslt", "SCH_YEAR_RCD", vnIdx));
		util.DataMap.setValue(app, "dmReqSubKey", "strSmtRcd", util.Grid.getCellValue(app, "grdAdtRslt", "SMT_RCD", vnIdx));
		util.DataMap.setValue(app, "dmReqSubKey", "strStudId", util.Grid.getCellValue(app, "grdAdtRslt", "STUD_ID", vnIdx));
		
		// 기준별 사정결과 자료 조회 서브미션
		//strCommand: listBySub 
		util.Submit.send(app, "subListBySub", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdScrngRslt");
			}
		}); 
			
	};
	
	/**
	 * @desc  졸업사정결과 목록 성적상세 버튼 클릭 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016. 7. 8.
	 */
	moPage.onClick_RdBtnPopup = function() {
		
		moStudRecCmpPopup.strStudId = util.Grid.getCellValue(app, "grdAdtRslt", "STUD_ID");
				
		var vsUrl = "../../inc/ccr/extCcrSStudRecCmpList.jsp";
		var vnWidth  = 800;
	    var vnHeight = 700;
	    var vnTop    = (window.screen.availHeight - vnHeight) / 2;
	    var vnLeft   = (window.screen.availWidth - vnWidth) / 2;
		
		 if (vnTop < 0) vnTop = 0;
	     if (vnLeft < 0) vnLeft = 0;
		
		var vsOption = "menubar=0,resizable=yes,scrollbars=yes,status=0,top="+vnTop+",left="+vnLeft+",width="+vnWidth+",height="+vnHeight;
		
		window.open(vsUrl, "extCcrSStudRecCmpList",  vsOption);
	};
	
	/**
	 * @desc  졸업사정결과 프리폼 변경 이벤트
	 * @return void
	 * @author Aeyoung Lee 2016. 7. 8.
	 */
	moPage.onUpdate_FrfAdtRslt = function() {
		// 프리폼 업데이트내용 그리드 반영
//TO-BE: <ExtFreeForm.updateToRpt> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtFreeForm.updateToRpt("rptAdtRslt", "frfAdtRslt");
	};
	
	/**
	 * @desc  작업취소 버튼 클릭이벤트
	 * @return void
	 * @author Aeyoung Lee 2016. 7. 8.
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdAdtRslt");
		
		// 로우가 없는 경우 rowSelect 이벤트가 일어나지 않으므로 이벤트 추가
		doCompareFrfEnable();
	};
	
	/**
	 * @desc  작업저장 버튼 클릭이벤트
	 * @return void
	 * @author Aeyoung Lee 2016. 7. 8.
	 */
	moPage.onClick_BtnSave = function() {
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdAdtRslt"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdAdtRslt")) return false;
		
		//모든 데이터를 체크하기 위해 변경
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess){
					if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
		
	};
	
	return moPage;
};
