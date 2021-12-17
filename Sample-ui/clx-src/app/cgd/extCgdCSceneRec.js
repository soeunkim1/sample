//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCgdCSceneRec.xtm"/>

/**
 * 현장실습성적입력
 * @class extCgdCSceneRec
 * @author 박갑수 at 2016. 5. 31
 */
var extCgdCSceneRec = function() {
	var moPage = new Page();
	
	// 임포트용 데이터 통신 오브젝트
	var moPObject = new Page();
	
	// 교직원 검색
	 moPObject.moIdsForStdCmnPPrsnSearch = [
	{
		 controlId					: "btnProfObjNo",
		 istrStaffGrpAuth			: "",					
		 istrWkdtyAuth			: "true",				
		 iKeyDate					: "/root/keyDateMap/ST_DT",	
		 iStaffNo					: "ipbProfNm",			
		 iStaffGrpRcd				: "",		
		 iStaffGrpRcdLock		: "", 			
		 iStaffSubGrpRcd		: "",	
		 iStaffSubGrpRcdLock	: "",				
		 iStatusRcd				: "",				
		 iRepNm					: "",				
		 iObjDivRcd				: "",
		 iObjCd						: "",				
		 iObjNm					: "",	
		 istrObjCdInList			: "",
		 iWkgrdRcd				: "",	
		  
		 oObjNo					: "/root/reqKey/strProfObjNo",
		 oStaffNo					: "",					
		 oRepNm					: "ipbProfNm",					
		 oBirthday					: "",					
		 oStatNm					: "",				
		 oStatRcd					: "",					
		 oOgNm					: "",				
		 oOgCd						: "",				
		 oPosNm					: "",				
		 oPosCd					: "",				
		 oWkgrdNm				: "",			
		 oWkgrdRcd				: "",				
		 oStaffGrpRcd				: "",					
		 oStaffSubGrpRcd		: "",				
		 oHoRcd					: "",					
		 oSsn						: "",					
		 oWkdtyRcd				: "",					
		 oWkdtyNm				: "",				
		 func                         : function(poRtnValue){
			// 담당교과목목록 조회
			doChargeSbList();
		 }
	}];
	
	
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId     		: "rdBtnStudNo",
		iStudNo       		: "",		
		iStudId       		: "",
		iStudNm       		: "rdOptRepNm",
		iKeyDate	  		: "/root/keyDateMap/END_DT",
		iObjDivRcd 		: "",
		iObjCd     	  		: "",
		iObjNm 				: "",
		iAuthYN		  		: "",
		iStatRcd				: "CT301ABSE",
		oStudId       		: "",
		oStudNo       		: "rdOptStudNo",		
		oStudNm       	: "rdOptRepNm",
		oSsn          		: "",
		oStatNm 	  		: "rdOptStatNm",
		oStatRcd	  		: "",
		oProcRslt	  		: "",
		oProcRsltYear    : "rdOptProcRsltYear",
		oSaCd         		: "",
		oSaNm         	: "rdOptSaNm",					
		oSpCd         		: "",
		oSpNm         	: "",
		oOgCd 		  		: "",
		oOgNm 		  	: "",
		func 		  			: function(voParam){
									
									if(!ValueUtil.isNull(voParam.Result.strStudId)){
										var vnRptIndex 	= voParam.rptRowIdx;
										var vsStatRcd  	= voParam.Result.strStatRcd;
										var vsStudId 	 	= voParam.Result.strStudId;
										
										if(vsStatRcd != "CT301ABSE"){
										
											//--휴학생만 가능합니다.
											util.Msg.alert("NLS-CGD-M054");
											util.Grid.setCellValue(app, "grdCgdRecInput", "STUD_ID", "", vnRptIndex);
											util.Grid.setCellValue(app, "grdCgdRecInput", "SA_NM", "", vnRptIndex);
											util.Grid.setCellValue(app, "grdCgdRecInput", "STUD_NO", "", vnRptIndex);
											util.Grid.setCellValue(app, "grdCgdRecInput", "REP_NM", "", vnRptIndex);
											util.Grid.setCellValue(app, "grdCgdRecInput", "STAT_NM", "", vnRptIndex);
											util.Grid.setCellValue(app, "grdCgdRecInput", "PROC_RSLT_YEAR", "", vnRptIndex);
											
										}else{
											util.Grid.setCellValue(app, "grdCgdRecInput", "STUD_ID", vsStudId, vnRptIndex);
										}
										
									}
									
									
								   }
	}
	];
	
	
	
	
	// 학년도 학기를 원래데이터로 되돌리기위한 변수
	var msSchYearRcd = "";
	var msSmtRcd = "";
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 31
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31
	 */
	moPage.onModelConstructDone_ExtCgdCSceneRec = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRelEstCii", "rptCgdRecInput"]);
		// 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpDataTop", "grpData"]);
		
		// 권한에따른 교수명 컬럼 검색가능 여부
		doVisibleCtlByAuth();
				
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.DataMap.setValue(app, "dmReqKey", "strPrtOrd", "CGD.STUD_NO");
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "lblPeriod", "cbbPrtOrd"]);
				
				// 현장실습입력기간체크
				doCheckPeriod("onLoad");

				// 조회조건 컨트롤 포커스
				util.Control.setFocus(app, "ipbProfNm");
				
				// 개인권한[CC00104]일경우 담당교과목 조회
				if(moPageInfo.authRngRcd == "CC00104"){
					// 담당교과목목록 조회
					doChargeSbList();
				}				
			}
		}, true);
	};
	
	/**
	 * 권한에 따른 교수명 활성/비활성 처리
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 5. 31
	 */	
	function doVisibleCtlByAuth() {
		
		// 개인권한[CC00104] : 
		if (moPageInfo.authRngRcd == "CC00104") {
			util.Control.setVisible(app, false, ["btnProfObjNo"]);
			util.Control.setEnable(app, false, ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm"]);
						
			util.Control.setValue(app, "ipbProfNm", moUserInfo.userNm);
			util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", moUserInfo.id);
		}
	};
	
	/**
	 * 현장실습입력기간에따른 컨트롤 제어
	 * @param 
	 * @type void
	 * @author 박갑수 at 2016. 6. 2
	 */
	function doCheckPeriod(psCallDiv){
		var vsNotPeriodYn = util.DataMap.getValue(app, "dmResOnLoad", "strNotPeriodYn"); 
		if(ValueUtil.fixNull(vsNotPeriodYn) == "Y"){
			if(ValueUtil.fixNull(psCallDiv) == "onLoad"){
				// 현장실습입력기간이 아닙니다.
				util.Msg.alert("NLS-CGD-EXT005");
			}
			util.Control.setEnable(app, false, ["btnDel", "btnRestore", "btnSave"]);
			util.Control.setReadOnly(app, true, ["rptCgdRecInput"]);
		}else {
			util.Control.setEnable(app, true, ["btnDel", "btnRestore", "btnSave"]);
			util.Control.setReadOnly(app, false, ["rptCgdRecInput"]);
		}
	};
	
	/**
	 * @desc 담당교과목목록 조회
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 31
	 */
	function doChargeSbList() {
		//strCommand: chargeSbList 
		util.Submit.send(app, "subChargeSbList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "cbbSbCd");
				util.SelectCtl.selectItem(app, "cbbSbCd", 0);
			}
		});
	};
	
	/**
	 * @desc [cbbSchYearRcd]학년도 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31
	 */
	moPage.onValueChanged_CbbSchYearRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("year");
		
		// 조회조건(교수명, 담당교과목)항목초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc [cbbSmtRcd]학기 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31
	 */
	moPage.onValueChanged_CbbSmtRcd = function() {
		// 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
		doChangeYearSmt("smt");
		
		// 조회조건(교수명, 담당교과목)항목초기화
		doClearSchCtl();
	};
	
	/**
	 * @desc 학사력 체크 및 해당 학년도 학기에 해당하는 기준일자 조회
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	function doChangeYearSmt(psDiv) {
		//strCommand: date 
		util.Submit.send(app, "subDate", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["dipKeyDate"]);
				
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
	 * @desc 조회조건(교수명, 담당교과목)항목초기화
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	function doClearSchCtl() {
		// 교수명
		util.Control.setValue(app, "ipbProfNm", "");
		util.DataMap.setValue(app, "dmReqKey", "strProfObjNo", "");

		// 담당교과목
		util.Control.setValue(app, "cbbSbCd", "");
	};
	
	/**
	 * @desc [btnProfNm]교수명(돋보기버튼) onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	moPage.onClick_BtnProfObjNo = function(sender) {
		// 교직원검색팝업 호출
		doOnClickStdCmnPPrsnSearch(sender);
	};
	
	/**
	 * @desc [ipbProfNm]교수명 onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	moPage.onValueChanged_IpbProfNm = function(sender) {
		// 리피트 변경사항 체크
		if(util.Grid.isModified(app, ["grdCgdRecInput"])){
			return false;
		}
		
		if(moPageInfo.authRngRcd != "CC00102"){
			return false;
		}
		
		// 값변경시 교직원검색팝업 호출
		doOnChangeStdCmnPPrsnSearch(sender);
	};

	/**
	 * @desc [btnSearch]조회 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	moPage.onClick_BtnSearch = function() {
		// 작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		// 조회조건 필수 체크
		if(!util.validate(app, ["cbbSchYearRcd", "cbbSmtRcd", "ipbProfNm", "cbbSbCd"])){
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
	 * @desc 등급부여비율, 현장실습성적입력 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){

				// 컬럼 추가
				doAddDynamicCol();
				
//				ExtRepeat.rebuild("rptCgdRecInput");
				util.Control.redraw(app, "grdCgdRelEstCii");
				
				// 현장실습입력기간체크
				util.Control.redraw(app, ["lblPeriod"]);
				doCheckPeriod();
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
			}
		});
	};
	
	/**
	 * @desc 다이나믹컬럼추가
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	function doAddDynamicCol() {
		var vnBefColCnt = util.DataMap.getValue(app, "dmTemp", "iColCnt");
		
		// 기존 컨트롤 삭제
		for(var i = 1 ; i <= vnBefColCnt ; i++) {
			ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rdIpbEstNm" + i, "detail", 0 );
			ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rhBtnEstNm" + i, "header", 0 );
		}
		
		// 총점
		ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rdOptEstNmSum", "detail", 0 );
		ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rhBtnEstNmSum", "header", 0 );
		// 등급
		ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rdOptGrdRcdNm", "detail", 0 );
		ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rhBtnGrdRcdNm", "header", 0 );
		// 비고
		ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rdOptRemark", "detail", 0 );
		ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rhBtnRemark", "header", 0 );
		// 이전성적
		ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rdOptFullItemNm", "detail", 0 );
		ExtRepeat.rptDeleteCtl( "rptCgdRecInput", "rhBtnFullItemNm", "header", 0 );
		
		var vnColCnt = util.DataSet.getRowCount(app, "dsEstFactorList");
		
		var vnLeft = 508;
		
		for(var i = 1 ; i <= vnColCnt ; i++) {
			
			var vsEstFactorNm = util.DataSet.getValue(app, "dsEstFactorList", "EST_FACTOR_NM", i);
			var vsPscCii = util.DataSet.getValue(app, "dsEstFactorList", "PSC_CII", i);
			
			var vnWidth = 90;
			if(vsEstFactorNm.length > 4) vnWidth = 100;
			
			// Body추가
			var vsDtlCtlTag = "<input id='rdIpbEstNm" + i + "' colindex='"+i+"' class='ipbRptRight' udattr='notNull=yes' ref='/root/resList/rptCgdRecInput/row/EST_NM_" + i
										+ "' maxlength='3' datatype='num' gridindex='"+ (7 + i) + "' style='left:"+ vnLeft + "px;  top:0px; width:"+ vnWidth +"px; height:23px; '/>";

			ExtRepeat.addRptCtl("rptCgdRecInput", vsDtlCtlTag, "detail", 0);
			
			//이벤트 추가
			model.getControl("rdIpbEstNm" + i).on("xforms-value-changed", function(e) {
				var vsFunc = "onValueChanged_RdIpbEstNm('"+ e.sender.getCtrlId() +"')";
				try{
					vsFunc = "moPage."+ vsFunc;
					eval(vsFunc);
				}catch(e){
					vsFunc = vsFunc;
					eval(vsFunc);
				}
			});
			
			// Header추가
			var vsBtnCtlTag	= "<trigger id='rhBtnEstNm" + i + "' navindex='0' class='rptHeaderReq' sortnode='EST_NM_" + i + "' sorttype='number' gridindex='" + (7 + i) + "'"
									+ " style='left:" + vnLeft + "px; top:0px; width:" + vnWidth + "px; height:25px; '><label></label></trigger>";
									
			ExtRepeat.addRptCtl("rptCgdRecInput", vsBtnCtlTag, "header", 0);
			
			
			if(!ValueUtil.isNull(vsPscCii)){
				vsEstFactorNm = vsEstFactorNm + "(" + vsPscCii + ")";
			}
			
			// 헤더에 컬럼 명 세팅
			ExtControl.setTextValue("rhBtnEstNm" + i, vsEstFactorNm);
			
			vnLeft = vnLeft + vnWidth - 1;
		}
		
		// 총점 컬럼 세팅
		var vsDtlEstNmSumCtl = "<output id='rdOptEstNmSum' colindex='0' class='optRptRight' ref='/root/resList/rptCgdRecInput/row/EST_NM_SUM' gridindex='" + (7 + vnColCnt + 1) + "'"
									+ " style='left:" + vnLeft + "px; top:0px; width:55px; height:23px;' />";
		
		ExtRepeat.addRptCtl("rptCgdRecInput", vsDtlEstNmSumCtl, "detail", 0);
		
		var vsBtnEstNmSumCtl = "<trigger id='rhBtnEstNmSum' navindex='0' class='rptHeader' sortnode='EST_NM_SUM' sorttype='number' gridindex='" + (7 + vnColCnt + 1) + "'"
									+ " style='left:" + vnLeft + "px; top:0px; width:55px; height:25px;' ><label><![CDATA[총점]]></label></trigger>";
								
		ExtRepeat.addRptCtl("rptCgdRecInput", vsBtnEstNmSumCtl, "header", 0);
		
		// 등급 컬럼 세팅
		var vsDtlGrdRcdNmCtl = "<output id='rdOptGrdRcdNm' colindex='0' class='optRptCenter' ref='/root/resList/rptCgdRecInput/row/GRD_RCD_NM' gridindex='" + (7 + vnColCnt + 2) + "'"
									+ " style='left:" + (vnLeft+54) + "px; top:0px; width:55px; height:23px;' />";
		
		ExtRepeat.addRptCtl("rptCgdRecInput", vsDtlGrdRcdNmCtl, "detail", 0);
		
		var vsBtnGrdRcdNmCtl = "<trigger id='rhBtnGrdRcdNm' navindex='0' class='rptHeader' sortnode='GRD_RCD_NM' sorttype='text' gridindex='" + (7 + vnColCnt + 2) + "'"
									+ " style='left:" + (vnLeft+54) + "px; top:0px; width:55px; height:25px;' ><label><![CDATA[등급]]></label></trigger>";
								
		ExtRepeat.addRptCtl("rptCgdRecInput", vsBtnGrdRcdNmCtl, "header", 0);
		
		// 비고 컬럼 세팅
		var vsDtlRemarkCtl = "<output id='rdOptRemark' colindex='0' class='optRpt' ref='/root/resList/rptCgdRecInput/row/REMARK' gridindex='" + (7 + vnColCnt + 3) + "'"
									+ " style='left:" + (vnLeft+108) + "px; top:0px; width:95px; height:23px;' />";
		
		ExtRepeat.addRptCtl("rptCgdRecInput", vsDtlRemarkCtl, "detail", 0);
		
		var vsBtnRemarkCtl = "<trigger id='rhBtnRemark' navindex='0' class='rptHeader' sortnode='REMARK' sorttype='text' gridindex='" + (7 + vnColCnt + 3) + "'"
									+ " style='left:" + (vnLeft+108) + "px; top:0px; width:95px; height:25px;' ><label><![CDATA[비고]]></label></trigger>";
								
		ExtRepeat.addRptCtl("rptCgdRecInput", vsBtnRemarkCtl, "header", 0);
		
		// 이전성적 컬럼 세팅
		var vsDtlFullItemNmCtl = "<output id='rdOptFullItemNm' colindex='0' class='optRpt' ref='/root/resList/rptCgdRecInput/row/FULL_ITEM_NM' gridindex='" + (7 + vnColCnt + 4) + "'"
									+ " style='left:" + (vnLeft+202) + "px; top:0px; width:320px; height:23px;' />";
		
		ExtRepeat.addRptCtl("rptCgdRecInput", vsDtlFullItemNmCtl, "detail", 0);
		
		var vsBtnFullItemNmCtl = "<trigger id='rhBtnFullItemNm' navindex='0' class='rptHeader' sortnode='FULL_ITEM_NM' sorttype='text' gridindex='" + (7 + vnColCnt + 4) + "'"
									+ " style='left:" + (vnLeft+202) + "px; top:0px; width:320px; height:25px;' ><label><![CDATA[이전성적]]></label></trigger>";
								
		ExtRepeat.addRptCtl("rptCgdRecInput", vsBtnFullItemNmCtl, "header", 0);
		
		
		util.Control.redraw(app, "grdCgdRecInput");
		
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCgdRecInput"]);
		
		util.DataMap.setValue(app, "dmRoot", "temp", "iColCnt", vnColCnt);
	};
	
	/**
	 * @desc [rdIpbEstNm]동적컬럼(요소) onValueChanged 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	moPage.onValueChanged_RdIpbEstNm = function(psCtlId) {
		
		
		var vnRptIndex = util.Grid.getIndex(app, "grdCgdRecInput");		
		
		
		// 1. 음수체크
		ValidUtil.checkIntegerDecimal(psCtlId, 3, 0, true);
		
		//--재수강과목일 경우 1이상이 나온다.
		var vsReTlsnCnt = ValueUtil.fixNumber(util.Grid.getCellValue(app, "grdCgdRecInput", "RE_TLSN_CNT" , vnRptIndex));
		
		//--현재 입력한 컨트롤의 node를 가져온다.
		var vsRef = util.Control.getProperty(app, psCtlId, "ref");
		var vsCtlNode = vsRef.substring(vsRef.lastIndexOf("/")+1, vsRef.length);
		
		var vnColCnt = util.DataSet.getRowCount(app, "dsEstFactorList");
		
		
		// 총점
		var vnScr = 0;
		
		for(var i = 1; i <= vnColCnt; i++){
			var vsEstNm = util.Grid.getCellValue(app, "grdCgdRecInput", "EST_NM_" + i, vnRptIndex);
			if(ValueUtil.isNull(vsEstNm)){
				util.Grid.setCellValue(app, "grdCgdRecInput", "EST_NM_" + i, "0", vnRptIndex);
			}
			if(!ValueUtil.isNull(vsEstNm)){
				vnScr = vnScr + Number(vsEstNm);
			}
		}
		
		/*
			재수강이고 95점 이상이면 초기화한다.
		*/
		if(vsReTlsnCnt  > 0 ){
			
			if(ValueUtil.fixNumber(vnScr) >= 95 ){
				//--NLS.CGD.M042 (재수강 학생은 최대 부여 등급이 A0 입니다.)
				util.Msg.alert("NLS-CGD-M042");
				util.Grid.setCellValue(app, "grdCgdRecInput", vsCtlNode, "", vnRptIndex);
				// 해당 리피트 상태 초기화
				//ExtRepeat.undoModify("rptCgdRecInput", vnRptIndex);
				return ;
			}
			
		}
		
		
		
		
		// 2. 점수 항목별 최고점 초과 체크
		var vsColNum = psCtlId.replace("rdIpbEstNm", "");
		var vsEstNm = util.Grid.getCellValue(app, "grdCgdRecInput", "EST_NM_" + vsColNum);
		
		// 만점기준
		var vsPscCii = util.DataSet.getValue(app, "dsEstFactorList", "PSC_CII", vsColNum);
		// 요소명
		var vsEstFactorNm = util.DataSet.getValue(app, "dsEstFactorList", "EST_FACTOR_NM", vsColNum);
		
		// 값이 입력되어있다면 만점기준과 비교
		if(!ValueUtil.isNull(vsEstNm) && !ValueUtil.isNull(vsPscCii)){
			if(Number(vsEstNm) > Number(vsPscCii)){
				// @의 점수는 @점을 초과할 수 없습니다.
				util.Msg.alert("NLS-CGD-EXT002", [vsEstFactorNm, vsPscCii]);
				util.Grid.setCellValue(app, "grdCgdRecInput", "EST_NM_" + vsColNum, "0");
				// 4. 총점, 등급 세팅
				doSetSumScrGrdRcd(psCtlId);
				return false;
			}
		}
		
		// 3. 100점 초과 체크
		if(!ValueUtil.isNull(vsEstNm)){
			if(100 < Number(vsEstNm)){
				// @의 점수는 @점을 초과할 수 없습니다.
				util.Msg.alert("NLS-CGD-EXT002", [vsEstFactorNm, vsPscCii]);
				util.Grid.setCellValue(app, "grdCgdRecInput", "EST_NM_" + vsColNum, "0");
				// 4. 총점, 등급 세팅
				doSetSumScrGrdRcd(psCtlId);
				return false;
			}
		}
		
		// 4. 총점, 등급 세팅
		doSetSumScrGrdRcd(psCtlId);
	};
	
	function doSetSumScrGrdRcd(psCtlId){
		
		var vnRptIndex = util.Grid.getIndex(app, "grdCgdRecInput");
		
		// 교과목의 성적스케일
		var vsRefKey = util.Control.getValue(app, "cbbSbCd");
		var vsRecScaleRcd = ExtInstance.getValue("/root/resList/chargeSbList/row", "REC_SCALE_RCD" , "child::REF_KEY='"+vsRefKey+"'");
		
		var vsRecScaleRcdNm	= ExtInstance.getValue("/root/resOnLoad/listRecScaleRcd/row", "CD_NM", "child::CD = '"+vsRecScaleRcd+"'");
		
		var vnColCnt = util.DataSet.getRowCount(app, "dsEstFactorList");
		
		
		
		
		
		// 총점
		var vnScr = 0;
		
		for(var i = 1; i <= vnColCnt; i++){
			var vsEstNm = util.Grid.getCellValue(app, "grdCgdRecInput", "EST_NM_" + i, vnRptIndex);
			if(ValueUtil.isNull(vsEstNm)){
				util.Grid.setCellValue(app, "grdCgdRecInput", "EST_NM_" + i, "0", vnRptIndex);
			}
			if(!ValueUtil.isNull(vsEstNm)){
				vnScr = vnScr + Number(vsEstNm);
			}
		}

		// 점수
		util.Grid.setCellValue(app, "grdCgdRecInput", "EST_NM_SUM", vnScr, vnRptIndex);
		
				
		
		
		// 등급
		var voNodeObj = ExtInstance.getNodeToObject("/root/resOnLoad/cgdConvGrdStdList/row[child::REC_CII_RCD = '"+vsRecScaleRcd+"' and MAX_SCR >= '"+vnScr+"' and MIN_SCR <= '"+vnScr+"']");
		if(voNodeObj){
			util.Grid.setCellValue(app, "grdCgdRecInput", "GRD_RCD", voNodeObj.GRD_RCD, vnRptIndex);
			util.Grid.setCellValue(app, "grdCgdRecInput", "GRD_RCD_NM", voNodeObj.GRD_NM, vnRptIndex);
		}else {
			//--성적스케일 : [@1] 이며, 점수에 해당하는 등급을 가져올수 없습니다. 관리자(학사운영과) 문의 바랍니다.
			util.Msg.alert("NLS-CGD-EXT003", [vsRecScaleRcdNm]);
			
			util.Grid.setCellValue(app, "grdCgdRecInput", "GRD_RCD", "", vnRptIndex);
			util.Grid.setCellValue(app, "grdCgdRecInput", "GRD_RCD_NM", "", vnRptIndex);
		}
	};
	
	/**
	 * @desc [btnDel]삭제 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	moPage.onClick_BtnDel = function() {
		
		var vsRptIndex = util.Grid.getIndex(app, "grdCgdRecInput");
		var vsUptStatus =  util.Grid.getCellValue(app, "grdCgdRecInput", "CRUD_VALUE", vsRptIndex);
		if(vsUptStatus == 'N'){
			util.Grid.setRowState(app, "grdCgdRecInput" , cpr.data.tabledata.RowState.INSERTED, vsRptIndex);
			util.Grid.restoreRow(app, "grdCgdRecInput");
		}else{
			util.Grid.deleteRow(app, "grdCgdRecInput");
		}
		
		
		
	};
	
	/**
	 * @desc [btnRestore]작업취소 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	moPage.onClick_BtnRestore = function() {
		
		
		var vsRptIndex = util.Grid.getIndex(app, "grdCgdRecInput");
		var vsUptStatus =  util.Grid.getCellValue(app, "grdCgdRecInput", "CRUD_VALUE", vsRptIndex);
		if(vsUptStatus == 'N'){
			util.Grid.setRowState(app, "grdCgdRecInput" , cpr.data.tabledata.RowState.INSERTED, vsRptIndex);
			
		}
		
		// 해당 리피트 상태 초기화
		util.Grid.restoreRow(app, "grdCgdRecInput");
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc 해외연수명단 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 31 
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCgdRecInput"], "MSG")){
			return false;
		}
		
		// 등급필수체크
		if(!doChkGrdRcd()){
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
	 * @desc 등급 필수입력 체크
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 6. 1 
	 */
	function doChkGrdRcd(){
		var vbValid = true;
		
		var vnRowCnt = util.Grid.getRowCount(app, "grdCgdRecInput");
		
		for(var i=0; i<vnRowCnt; i++){
			// 상태가 Update고 등급이 없을경우 에러메시지
			if(cpr.data.tabledata.RowState.UPDATED == util.Grid.getRowState(app, "grdCgdRecInput", i)){
				// 등급코드
				var vsGrdRcd = util.Grid.getCellValue(app, "grdCgdRecInput", "GRD_RCD", i);
				if(ValueUtil.isNull(vsGrdRcd)){
					// "입력된 성적 중에 등급이 없는 학생이 존재합니다. 관리자(학사운영과)에 문의바랍니다."
					util.Msg.alert("NLS-CGD-EXT004");
					
					vbValid = false;
					return vbValid;
				}
			}
		}
		
		return vbValid;
	};

	
	moPage.onClick_BtnNew = function() {
		// 해당 리피트 insert 후 편집 시작할 컬럼 지정
		var vnIdx = util.Grid.insertRow(app, "grdCgdRecInput");
		util.Grid.setRowState(app, "grdCgdRecInput" , cpr.data.tabledata.RowState.UPDATED, vnIdx);
		
		util.Grid.setCellValue(app, "grdCgdRecInput", "CRUD_VALUE", "N", vnIdx);
		
		var vsRefKey = util.DataMap.getValue(app, "dmReqKey", "strSbRefKey");
		util.Grid.setCellValue(app, "grdCgdRecInput", "REF_KEY", vsRefKey, vnIdx);
		
		
	}
	
	moPage.onClick_RdBtnStudNo = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	}
	
	
	moPage.onValueChanged_RdOptRepNm = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	};
	return moPage;
};
