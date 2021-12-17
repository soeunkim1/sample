//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCcsPDclExtend.xtm"/>

/**
 * 학문분야
 * @class /stdCcsPDclExtend
 * @author 최영경 at 2016. 1. 26
 */
var stdCcsPDclExtend = function() {

	var moPage = new Page();

	
	/************************
	 *  멤버변수
	 ************************/
	var savePopYn = "";
	
	// 팝업 내부사용 변수
	var moDclRcd = 
	{
		controlId : "",
		strCmpDivRcd : "",
		strDclRcdCd : "",
		strDclRcdNm : "",
		strRefKey : "",
		strStdDclRcdYn : "",
		voRow	  : "",
		vsColId	  : "",		
		openedByChange : false,
		// 선택가능 범위를 제한함.
		// 검색어 기본값 지정
		Result : {
			DCL_RCD_NM : "",
			DCL_RCD_CD : ""
		}
	};
	
	
	
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 최영경 at 2016. 1. 19
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	
	
	
	/**
	 * @desc 화면오픈
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 1. 19
	 */
	moPage.onLoad = function() {
		
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptDclExtend"]);
		
		// 호출한 페이지에서 파라미터 받기.
		if (ExtPopUp.isPopUp()) {
			
			var voDclRcd =  ExtPopUp.getParentVal("moDclRcd");
			
			// 파라미터  값복사 (deep copy)
			for (var key in voDclRcd) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moDclRcd [key] = voDclRcd [key];
			}			
			
			// 팝업이 뜬후에는 false로 고침.
			moDclRcd.openedByChange = false;
		}
		
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var vsCmpdivRcd = moDclRcd.iCmpDivRcd ;
		
		util.DataMap.setValue(app, "dmReqKey", "strCmpDivRcd", vsCmpdivRcd);
		
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {			
			
				util.Control.redraw(app, "grdDclExtend");	
				
				doSetDclRcdList();
				
			} else {
				//onLoad 실패시 화면닫기
				app.close();
			}
		});
		
		
		
		
	};
	
	
	/**
	 * @desc 체크박스에 데이터를 반영한다.
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 1. 19
	 */
	function doSetDclRcdList() {	
	
		var vsDclRcd = new String(moDclRcd.iDclRcdCd);
		var vaDclRcd 	 = new Array();
		if (vsDclRcd.match(",") == null) {
			//학문분야가 하나일 경우
			vaDclRcd[0] = vsDclRcd;
		}else{
			//학문분야가 여러개일경우
			vaDclRcd = vsDclRcd.split(",");
		}
		
		
		/*
			부모창에서 받아온 학문분야 코드를 
			리피터에 체크를 한다. 
		*/
		for( var i = 0 ; i<vaDclRcd.length ; i++){
			
			//--"/root/resOnLoad/yearList/row", "CD_NM", "CA0060000", "child::CD='CA0061961'"
			ExtInstance.setValue("/root/resOnLoad/dclRcdList/row" , "CHECK_DCL", "Y", "child::CD_PRP2 = '"+vaDclRcd[i]+"'");
			
			
		}
		
		ExtRepeat.refresh("rptDclExtend");
		
		
		
	};
	
	
	
	/**
	 * @desc 체크된 학문분야를 가져온다.	 
	 * @param vpKind (CD, Nm) 학문분야코드, 학문분야명칭을 리턴한다.
	 * @return 학문분야코드 및 학문분야명칭
	 * @author 최영경 at 2016. 1. 19
	 */
	function doGetDclRcdList(vpKind){
		
		var vnNodeList = ExtInstance.getNodeListLength("/root/resOnLoad/dclRcdList/row[child::CHECK_DCL = 'Y']");
		var voRtnXml = ExtInstance.getNodeObj("/root/resOnLoad/dclRcdList/row[child::CHECK_DCL = 'Y']");
		
		
		
		
		var vsDclRcdCd 		= "";  //-- CAL001,CAL002
		var vsDclRcdNm 		= "";  //--NCS여부,현장실습
		var vnCnt 					= 0;		
		
		/*
			부모페이지로 "," 구분자로 합쳐서 내려 보내기위한 작업을 한다.
		*/
		var vsRptid = "rptDclExtend";
		var vnRptCnt = util.Grid.getRowCount(app, vsRptid);
		for(var i = 1 ; i<=vnRptCnt ; i++){
			var vsCheckDcl = util.Grid.getCellValue(app, vsRptid, "CHECK_DCL", i);
			if(vsCheckDcl == 'Y'){
				var vsCd = util.Grid.getCellValue(app, vsRptid, "CD_PRP2", i);
				var vsNm = util.Grid.getCellValue(app, vsRptid, "CD_PRP2_NM", i);
				if(vnCnt == 0){
					vsDclRcdCd = vsCd;
					vsDclRcdNm = vsNm;
				}else{
					vsDclRcdCd = vsDclRcdCd+","+vsCd;
					vsDclRcdNm = vsDclRcdNm+","+vsNm;
				}
				vnCnt++;
			}
		}
		
		
		if("CD" == vpKind){
			return vsDclRcdCd;
		}else{
			return vsDclRcdNm;
		}
		
	};
	
	
	
	
	/**
	 * @desc 선택닫기
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 1. 19
	 */
	moPage.onClick_BtnCloseOk= function(){
		
		
		
		moDclRcd.Result.DCL_RCD_NM = moPage.doGetDclRcdList("NM");//학문분야이름
		moDclRcd.Result.DCL_RCD_CD = moPage.doGetDclRcdList("CD");//학문분야코드
		savePopYn	  = "Y"		
		if('Y' == moDclRcd.strStdDclRcdYn){			
			ExtPopUp.closeLayeredPopup("doCallBackStdCcsPDclExtendStd", moDclRcd);
		}else{
			ExtPopUp.closeLayeredPopup("doCallBackStdCcsPDclExtend", moDclRcd);
		}
		
		
	};
	
	
	
	/**
	 * @desc 화면닫기
	 * @param 
	 * @return void
	 * @author 최영경 at 2016. 1. 19
	 */
	moPage.onClick_BtnCloseCancel= function(){
		app.close();
	};
	
	
	
	
	
	return moPage;
};
