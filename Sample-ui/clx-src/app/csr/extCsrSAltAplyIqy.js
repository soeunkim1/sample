//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCsrSAltAplyIqy.xtm"/>


var extCsrSAltAplyIqy = function() {
	var moPage = new Page();
	var moPObject = new PObject();
	
	moPObject.moIdsForExtCsrAplyAbs = [
	{
		controlId 					: "btnNewAbsReq",
		iStudId 						: "/root/reqList/strStudId",
		iUseTabNm				: "CSR_SHREG",
		func : function() {
			doOnLoad();
		}
	}
	];
	
	moPObject.moIdsForExtCsrAplyRetu = [
	{
		controlId 					: "btnNewRtnReq",
		iStudId 						: "/root/reqList/strStudId",
		iUseTabNm				: "CSR_SHREG",
		func : function() {
			doOnLoad();
		}
	}
	];
	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc 온로드 실행
	 * @return void
	 * @author Choi In Seong 2016. 01. 11.
	 */
	moPage.onModelConstructDone_StdCsrCAplyYearSmt = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @return void
	 * @author Choi In Seong 2016. 01. 11.
	 */
	function doOnLoad() {
		
		util.DataMap.setValue(app, "dmReqList", "strStudId", moUserInfo.id);
		
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Msg.notify(app, "NLS.INF.M024");
				
				util.Control.redraw(app, ["frfRtnResult"]);
				debugger;
				var vsAbsPlanYn = util.DataMap.getValue(app, "dmResOnLoad", "strAbsPlanYn");
				var vsRtnPlanYn = util.DataMap.getValue(app, "dmResOnLoad", "strRtnPlanYn");
				var vsKeyDate = util.DataMap.getValue(app, "dmResOnLoad", "strKeyDate");
				
				var strAbsStDt = util.DataMap.getValue(app, "dmResOnLoad", "strAbsStDt");
				var strAbsEndDt = util.DataMap.getValue(app, "dmResOnLoad", "strAbsEndDt");
				var strRtnStDt = util.DataMap.getValue(app, "dmResOnLoad", "strRtnStDt");
				var strRtnEndDt = util.DataMap.getValue(app, "dmResOnLoad", "strRtnEndDt");

				ExtControl.setTextValue("lblAbsTitle", ComMsg.getMsg(NLS.CSR.EXT002, [strAbsStDt, strAbsEndDt]));
				// 군휴학 타이틀
				if(vsAbsPlanYn == "N"){
					ExtControl.setAttr("lblAbsTitle", "class", "title_red");
				}else{
					ExtControl.setAttr("lblAbsTitle", "class", "title_green");
				}
				
				ExtControl.setTextValue("lblRtnTitle", ComMsg.getMsg(NLS.CSR.EXT003, [strRtnStDt, strRtnEndDt]));
				//복학 타이틀
				if(vsRtnPlanYn == "N"){
					ExtControl.setAttr("lblRtnTitle", "class", "title_red");
				}else{
					ExtControl.setAttr("lblRtnTitle", "class", "title_green");
				}
				
				var vsAbsRowYn = util.DataMap.getValue(app, "dmResOnLoad", "frfAbsResultYn");
				var vsRtnRowYn = util.DataMap.getValue(app, "dmResOnLoad", "frfRtnResultYn");
				
				// 군휴학, 복학 데이터 존재여부 체크
				if(vsAbsRowYn == "Y"){
					util.Control.setVisible(app, true, ["frfAbsResult"]);
				}else{
					util.Control.setVisible(app, false, ["frfAbsResult"]);
				}
				if(vsRtnRowYn == "Y"){
					util.Control.setVisible(app, true, ["frfRtnResult"]);
				}else{
					util.Control.setVisible(app, false, ["frfRtnResult"]);
				}
				
				// 신청상태 / 비고
				var vsAbsAplyStatRcd = util.FreeForm.getValue(app, "frfAbsResult","APLY_STAT_RCD");
				var vsAbsRemark = util.FreeForm.getValue(app, "frfAbsResult","CANCEL_REMARK");
				var vsRtnAplyStatRcd = util.FreeForm.getValue(app, "frfRtnResult","APLY_STAT_RCD");
				var vsRtnRemark = util.FreeForm.getValue(app, "frfRtnResult","CANCEL_REMARK");
				
				// 신청 불가 사유
				var vsAbsAplyFalseRsn = util.DataMap.getValue(app, "dmResOnLoad", "strAbsAplyFalseRsn");
				var vsRtnAplyFalseRsn = util.DataMap.getValue(app, "dmResOnLoad", "strRtnAplyFalseRsn");
				
				if(!ValueUtil.isNull(vsAbsAplyFalseRsn)){
					ExtControl.setTextValue("lblAbsAplyFalseRsn", ComMsg.getMsg(NLS.CSR.EXT004, [vsAbsAplyFalseRsn]));
					util.Control.setVisible(app, true, ["lblAbsAplyFalseRsn"]);
				}else{
					if(vsAbsAplyStatRcd=="CSR10330"){
						if(!ValueUtil.isNull(vsAbsRemark)){
							ExtControl.setTextValue("lblAbsAplyFalseRsn", ComMsg.getMsg(NLS.CSR.EXT011, [vsAbsRemark]));
							util.Control.setVisible(app, true, ["lblAbsAplyFalseRsn"]);
						}else{
							ExtControl.setTextValue("lblAbsAplyFalseRsn", "");
							util.Control.setVisible(app, false, ["lblAbsAplyFalseRsn"]);
						}
					}else{
						ExtControl.setTextValue("lblAbsAplyFalseRsn", "");	
						util.Control.setVisible(app, false, ["lblAbsAplyFalseRsn"]);
					}
				}
				
				if(!ValueUtil.isNull(vsRtnAplyFalseRsn)){
					ExtControl.setTextValue("lblRtnAplyFalseRsn", ComMsg.getMsg(NLS.CSR.EXT004, [vsRtnAplyFalseRsn]));
					util.Control.setVisible(app, true, ["lblRtnAplyFalseRsn"]);
				}else{
					if(vsRtnAplyStatRcd=="CSR10330"){
						if(!ValueUtil.isNull(vsRtnRemark)){
							ExtControl.setTextValue("lblRtnAplyFalseRsn", ComMsg.getMsg(NLS.CSR.EXT011, [vsRtnRemark]));
							util.Control.setVisible(app, true, ["lblRtnAplyFalseRsn"]);
						}else{
							ExtControl.setTextValue("lblRtnAplyFalseRsn", "");
							util.Control.setVisible(app, false, ["lblRtnAplyFalseRsn"]);
						}
					}else{
						ExtControl.setTextValue("lblRtnAplyFalseRsn", "");
						util.Control.setVisible(app, false, ["lblRtnAplyFalseRsn"]);
					}
				}
				
				// 라벨 refresh
				util.Control.redraw(app, [ "lblRtnTitle", "lblRtnAplyFalseRsn"]);
				
				// 군휴학, 복학 신청 가능 여부에 따른 컨트롤 제어
				var vsAbsYn = util.DataMap.getValue(app, "dmResOnLoad", "strAbsYn");
				var vsRtnYn = util.DataMap.getValue(app, "dmResOnLoad", "strRtnYn");
				
				// 신청가능
				if(vsAbsYn == "Y"){
					util.Control.setEnable(app, true, ["btnNewAbsReq"]);
					
					ExtControl.setAttr("lblAbsAply", "class", "circle_green_fill");
					ExtControl.setAttr("lblAbsProc", "class", "circle_yellow");
					ExtControl.setAttr("lblAbsFalse", "class", "circle_red");
					
					ExtControl.setAttr("btnNewAbsReq", "class", "btn_b_green");
					
					ExtControl.setAttr("lblFrfAbsAplyDt", "class", "text_green");
					ExtControl.setAttr("lblFrfAbsProcResult", "class", "text_green");
					ExtControl.setAttr("optFrfAbsAplyDt", "class", "text_green");
					ExtControl.setAttr("optFrfAbsProcResult", "class", "text_green");
					ExtControl.setAttr("lblAbsAplyFalseRsn", "class", "condition_text02");
					
				// 진행중
				}else if(vsAbsYn == "P"){
					util.Control.setEnable(app, true, ["btnNewAbsReq"]);
					
					ExtControl.setAttr("lblAbsAply", "class", "circle_green");
					ExtControl.setAttr("lblAbsProc", "class", "circle_yellow_fill");
					ExtControl.setAttr("lblAbsFalse", "class", "circle_red");
					
					ExtControl.setAttr("btnNewAbsReq", "class", "btn_b_yellow");

					ExtControl.setAttr("lblFrfAbsAplyDt", "class", "text_yellow");
					ExtControl.setAttr("lblFrfAbsProcResult", "class", "text_yellow");
					ExtControl.setAttr("optFrfAbsAplyDt", "class", "text_yellow");
					ExtControl.setAttr("optFrfAbsProcResult", "class", "text_yellow");
					
				// 신청불가
				}else{
					util.Control.setEnable(app, false, ["btnNewAbsReq"]);
					
					ExtControl.setAttr("lblAbsAply", "class", "circle_green");
					ExtControl.setAttr("lblAbsProc", "class", "circle_yellow");
					ExtControl.setAttr("lblAbsFalse", "class", "circle_red_fill");
					
					ExtControl.setAttr("btnNewAbsReq", "class", "btn_b_gray");

					ExtControl.setAttr("lblFrfAbsAplyDt", "class", "text_red");
					ExtControl.setAttr("lblFrfAbsProcResult", "class", "text_red");
					ExtControl.setAttr("optFrfAbsAplyDt", "class", "text_red");
					ExtControl.setAttr("optFrfAbsProcResult", "class", "text_red");
					ExtControl.setAttr("lblAbsAplyFalseRsn", "class", "condition_text01");
					
				}
				
				//신청가능
				if(vsRtnYn == "Y"){
					util.Control.setEnable(app, true, ["btnNewRtnReq"]);
					
					ExtControl.setAttr("lblRtnAply", "class", "circle_green_fill");
					ExtControl.setAttr("lblRtnProc", "class", "circle_yellow");
					ExtControl.setAttr("lblRtnFalse", "class", "circle_red");
					
					ExtControl.setAttr("btnNewRtnReq", "class", "btn_b_green");
					
					ExtControl.setAttr("lblFrfRtnAplyDt", "class", "text_green");
					ExtControl.setAttr("lblFrfRtnProcResult", "class", "text_green");
					ExtControl.setAttr("optFrfRtnAplyDt", "class", "text_green");
					ExtControl.setAttr("optFrfRtnProcResult", "class", "text_green");
					ExtControl.setAttr("lblRtnAplyFalseRsn", "class", "condition_text02");
					
				// 진행중
				}else if(vsRtnYn == "P"){
					util.Control.setEnable(app, true, ["btnNewRtnReq"]);
					
					ExtControl.setAttr("lblRtnAply", "class", "circle_green");
					ExtControl.setAttr("lblRtnProc", "class", "circle_yellow_fill");
					ExtControl.setAttr("lblRtnFalse", "class", "circle_red");
					
					ExtControl.setAttr("btnNewRtnReq", "class", "btn_b_yellow");
					
					ExtControl.setAttr("lblFrfRtnAplyDt", "class", "text_yellow");
					ExtControl.setAttr("lblFrfRtnProcResult", "class", "text_yellow");
					ExtControl.setAttr("optFrfRtnAplyDt", "class", "text_yellow");
					ExtControl.setAttr("optFrfRtnProcResult", "class", "text_yellow");
					
				// 신청불가
				}else{
					util.Control.setEnable(app, false, ["btnNewRtnReq"]);
					
					ExtControl.setAttr("lblRtnAply", "class", "circle_green");
					ExtControl.setAttr("lblRtnProc", "class", "circle_yellow");
					ExtControl.setAttr("lblRtnFalse", "class", "circle_red_fill");
					
					ExtControl.setAttr("btnNewRtnReq", "class", "btn_b_gray");

					ExtControl.setAttr("lblFrfRtnAplyDt", "class", "text_red");
					ExtControl.setAttr("lblFrfRtnProcResult", "class", "text_red");
					ExtControl.setAttr("optFrfRtnAplyDt", "class", "text_red");
					ExtControl.setAttr("optFrfRtnProcResult", "class", "text_red");
					ExtControl.setAttr("lblRtnAplyFalseRsn", "class", "condition_text01");
					
				}
			}
		});
	}
	
	/**
	 * @desc 군휴학신청 메뉴로 이동
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 30
	 */
	
//	moPage.onClick_BtnAbsReq = function(sender) {
//		// 메뉴열기 
//		// 학사의 휴학신청
//		// 프로그램 완성 후 링크 예정 2016.04.01
//		doOnClickExtCsrPAplyAbs(sender);
//	};
	
	
	/**
	 * @desc 복학신청 메뉴로 이동
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 3. 30
	 */
	
//	moPage.onClick_BtnRtnReq = function(sender) {
//		// 메뉴열기 
//		// 학사의 복학신청
//		doOnClickExtCsrPAplyRetu(sender);
//	};
	
	
	moPage.onClick_BtnRtnReq = function(sender) {
		// 메뉴열기 
		// 학사의 복학신청
		doOnClickExtCsrPAplyRetu(sender);
	}
	
	
//	moPage.onClick_BtnNewRtnReq1 = function(sender) {
//		// 메뉴열기 
//		// 학사의 복학신청
//		doOnClickExtCsrPAplyRetu(sender);
//	}
	
	
	
	
//	moPage.onClick_BtnAbsReq = function() {
//		doOnClickExtCsrPAplyAbs(sender);
//	};
	
	return moPage;
};
