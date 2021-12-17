//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCcsCLectEvalStud.xtm"/>

/**
 * 강의평가입력(학생용)
 * @class extCcsCLectEvalStud
 * @author 박갑수 at 2016. 5. 13
 */
var extCcsCLectEvalStud = function() {
	var moPage = new Page();
	
	// 리피터 현재 인덱스 - 변경체크시 false일경우 되돌리기 위함
	var mnNowIdx = 1;
	
	/**
	 * @desc import 헤더 초기화
	 * @param 
	 * @return  void
	 * @author 박갑수 at 2016. 5. 13
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		// import 헤더 초기화
		doHeaderOnLoad();
	};
	
	/**
	 * @desc onLoad 실행
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 13
	 */
	moPage.onModelConstructDone_ExtCcsCLectEvalStud = function() {
		// 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCcrTlsnReq"]);
		// 검색조건 초기 설정
		// ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		util.Control.setValue(app, "ipbStudNm", moUserInfo.userNm);
		util.DataMap.setValue(app, "dmReqKey", "strStudId", moUserInfo.id);
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, ["cbbSchYearRcd", "cbbSmtRcd", "rdbLanDivRcd"]);
				
				// 조회
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
			}
		}, true);
	};
	
	/**
	 * @desc 수강과목 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 13
	 */
	function doList(poCallBackFunc) {
		// 디테일 초기화 - 작업변경체크 피하기위해
		util.Control.redraw(app, "frfCcsLectEvalRslt");
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "grdCcrTlsnReq");
				
				mnNowIdx = util.Grid.getIndex(app, "grdCcrTlsnReq");  
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc [rptCcrTlsnReq]수강과목 onRowSelect 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 13
	 */
	moPage.onRowSelect_RptCcrTlsnReq = function() {
		// 프리폼 변경사항 체크
		if(util.Grid.isModified(app, ["frfCcsLectEvalRslt"], "CRM")){
			// 로직구현....
			util.Grid.selectRow(app, "grdCcrTlsnReq", mnNowIdx, false);
			
			return false;
		}
		
		mnNowIdx = util.Grid.getIndex(app, "grdCcrTlsnReq");
		// 강의평가 제외
		var vsLectEvalXcpYn = util.Grid.getCellValue(app, "grdCcrTlsnReq", "LECT_EVAL_XCP_YN");
		
		// 교과목 라벨 세팅, 코멘트 보이기여부
		var vsSbNm = util.Grid.getCellValue(app, "grdCcrTlsnReq", "SB_CD_NM");
		ExtControl.setTextValue("lblComment", vsSbNm);
		var vsLectEvalYn = util.Grid.getCellValue(app, "grdCcrTlsnReq", "LECT_EVAL_YN");
		if(ValueUtil.fixNull(vsLectEvalYn) == "Y"){
			// 코멘트 보이기여부
			util.Control.setVisible(app, true , ["lblComment1"]);
			util.Control.setVisible(app, false , ["btnSave"]);
			util.Control.setReadOnly(app, true, ["frfCcsLectEvalRslt"]);
		}else {
			util.Control.setVisible(app, false , ["lblComment1"]);
			if(ValueUtil.fixNull(vsLectEvalXcpYn) == "Y"){
				util.Control.setVisible(app, false , ["btnSave"]);
			}else{
				util.Control.setVisible(app, true , ["btnSave"]);
			}
			util.Control.setReadOnly(app, false, ["frfCcsLectEvalRslt"]);
		}
		
		// 강의평가 제외가 Y일경우 경고메시지
		if(ValueUtil.fixNull(vsLectEvalXcpYn) == "Y"){
			util.Control.setVisible(app, false, ["frfCcsLectEvalRslt"]);
			
			// "강의평가제외가 Y인 교과목은 강의평가를 작성할 수 없습니다." 메시지
			util.Msg.alert("NLS-CCS-EXT009");
		}else {
			util.Control.setVisible(app, true, ["frfCcsLectEvalRslt"]);
			// 강의평가항목 조회
			doListDtl();
		}
	};
	
	/**
	 * @desc 강의평가항목 조회
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 13
	 */
	function doListDtl(poCallBackFunc) {
		var vnIdx = util.Grid.getIndex(app, "grdCcrTlsnReq");
		util.DataMap.setValue(app, "dmReqSelRow", "strRefKey", util.Grid.getCellValue(app, "grdCcrTlsnReq", "REF_KEY", vnIdx));
		util.DataMap.setValue(app, "dmReqSelRow", "strLectDivRcd", util.Grid.getCellValue(app, "grdCcrTlsnReq", "LECT_EVAL_TYPE_RCD", vnIdx));
		util.DataMap.setValue(app, "dmReqSelRow", "strProfObjNo", util.Grid.getCellValue(app, "grdCcrTlsnReq", "PROF_OBJ_NO", vnIdx));
		util.DataMap.setValue(app, "dmReqSelRow", "strSaCd", util.Grid.getCellValue(app, "grdCcrTlsnReq", "SA_CD", vnIdx));
		
		//strCommand: listDtl 
		util.Submit.send(app, "subListDtl", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "frfCcsLectEvalRslt");
				
				// 다이나믹 생성
				doDynamicRptRender();
			}
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * @desc 강의평가항목 다이나믹 생성
	 * @param poCallBackFunc 콜백정의
	 * @return void
	 * @author 박갑수 at 2016. 5. 13
	 */
	function doDynamicRptRender(){
		
		var vnLength = Number(util.DataMap.getValue(app, "dmResList", "strFctorRsltCnt"));
		
		var vnRptDetailTop = 65 * vnLength;
		var vnTxtCtlTop = 5;
		var vnTxtCtlOjvHeight = 55;
		var vnTxtCtlSjvHeight = 95;
		
		var vnLblCtlTop = 5;
		var vnRdbCtlTop = 30;
		var vnTabOrder = 10;
		
		// 작업저장버튼 보이기여부
		var vbSaveBtnVisible = false;
		
		for(var i=1; i<=vnLength; i++){
			
			// 객관식, 주관식 구분 : 객관식[1], 주관식[2]
			var vsSjvOjvDivRcd = util.DataSet.getValue(app, "dsFrfCcsLectEvalRslt", "SJV_OJV_DIV_RCD_" +  i, "1");
			var vsAnsTypeRcd = util.DataSet.getValue(app, "dsFrfCcsLectEvalRslt", "ANS_TYPE_RCD_" +  i, "1");
			var vsAns = util.DataSet.getValue(app, "dsFrfCcsLectEvalRslt", "ANS_" +  i, "1");
//			// 답변이 없을때 작업저장 보기이여부 설정
//			if(ValueUtil.isNull(vsAns) && vsSjvOjvDivRcd == "1"){
//				vbSaveBtnVisible = true;
//			}else {
//				vbSaveBtnVisible = false;
//			}
			
			
			// 객관식일경우 
			if(ValueUtil.fixNull(vsSjvOjvDivRcd) == "1"){
				
				///////////////////////////// 			TxtArea 추가						/////////////////////////////
				var vsTxtCtlAttr = "<textarea id='txt_" + i +"' class='ipbFrf' ref='/root/resList/frfCcsLectEvalRslt/row/QUEST_ARA_NM_"+ i +"'  enable='False' scrolltype='none' style='left:5px; top:"+ vnTxtCtlTop +"px; width:105px; height:"+ vnTxtCtlOjvHeight +"px; font-weight:bold; '/>";
				ExtRepeat.addRptCtl("frfCcsLectEvalRslt", vsTxtCtlAttr, "detail");
				
				vnTxtCtlTop = vnTxtCtlTop + 65;
				
				
				///////////////////////////// 			Label 추가							/////////////////////////////
				var vsLblCtlAttr = "<label id='lbl_" + i +"' class='lblComn' ref='/root/resList/frfCcsLectEvalRslt/row/QUEST_CONT_"+ i +"' style='left:115px; top:"+ vnLblCtlTop +"px; width:1075px; height:20px; '/>";
				ExtRepeat.addRptCtl("frfCcsLectEvalRslt", vsLblCtlAttr, "detail");
				
				vnLblCtlTop = vnLblCtlTop + 65;
					
				
				///////////////////////////// 			RadioButton 추가				/////////////////////////////
				var vsRdbCtlAttr = "<select1 id='rdb_" + i +"' colindex='"+ vnTabOrder +"'  class='rdbFrf' ref='/root/resList/frfCcsLectEvalRslt/row/ANS_"+ i +"' appearance='full' style='left:115px; top:"+ vnRdbCtlTop +"px; width:1075px; height:20px; border-width:0; '>"
											+ "<choices><itemset nodeset='/root/resList/lectRsltTypeList/row'><label ref='ANS_CONT'/><value ref='SERIAL_NO'/></itemset></choices></select1>";
				ExtRepeat.addRptCtl("frfCcsLectEvalRslt", vsRdbCtlAttr, "detail");
				
				ExtControl.setAttr("rdb_" + i, "nodeset", "/root/resList/lectRsltTypeList/row[child::ANS_TYPE_RCD = '"+vsAnsTypeRcd+"'] " );
				util.Control.redraw(app, "rdb_" + i);
				
				vnTabOrder = vnTabOrder + 10;
				vnRdbCtlTop = vnRdbCtlTop + 65;
				
				
			// 주관식일경우
			}else {
				///////////////////////////// 			TxtArea 추가						/////////////////////////////
				var vsTxtCtlAttr = "<textarea id='txt_" + i +"' class='ipbFrf' ref='/root/resList/frfCcsLectEvalRslt/row/QUEST_ARA_NM_"+ i +"'  enable='False' scrolltype='none' style='left:5px; top:"+ vnTxtCtlTop +"px; width:105px; height:"+ vnTxtCtlSjvHeight +"px; font-weight:bold; '/>";
				ExtRepeat.addRptCtl("frfCcsLectEvalRslt", vsTxtCtlAttr, "detail");
				
				vnTxtCtlTop = vnTxtCtlTop + 105;
				vnRptDetailTop = vnRptDetailTop+50;		// 리피터 detail 높이 추가
				
				///////////////////////////// 			Label 추가							/////////////////////////////
				var vsLblCtlAttr = "<label id='lbl_" + i +"' class='lblComn' ref='/root/resList/frfCcsLectEvalRslt/row/QUEST_CONT_"+ i +"' style='left:115px; top:"+ vnLblCtlTop +"px; width:1075px; height:20px; '/>";
				ExtRepeat.addRptCtl("frfCcsLectEvalRslt", vsLblCtlAttr, "detail");
				
				vnLblCtlTop = vnLblCtlTop + 105;
				
				///////////////////////////// 			TxtArea(주관식) 추가			/////////////////////////////
				var vsTxtCtlSjvAttr = "<textarea id='txtSjv_" + i +"' class='ipbFrf' ref='/root/resList/frfCcsLectEvalRslt/row/ANS_"+ i +"' maxlength='500' style='left:115px; top:"+ vnRdbCtlTop +"px; width:1075px; height:70px; '/>";
				ExtRepeat.addRptCtl("frfCcsLectEvalRslt", vsTxtCtlSjvAttr, "detail");
				
				vnRdbCtlTop = vnRdbCtlTop + 105;
				
			}
		}
		
		// 프리폼 높이 설정
		ExtControl.getControl("frfCcsLectEvalRslt").rowHeight = vnRptDetailTop;
		
//		ExtControl.setReadOnly(!vbSaveBtnVisible, ["frfCcsLectEvalRslt"]);
		// 작업저장버튼 보이기여부
//		ExtControl.setVisible(vbSaveBtnVisible , ["btnSave"]);
		
		util.Control.redraw(app, "frfCcsLectEvalRslt");
//		// 스크롤이 상단에 위치되기위해
//		var vsLectEvalRslt = ExtControl.getControl("frfCcsLectEvalRslt");
//		vsLectEvalRslt.vScrollbar.SCROLLINFO.value = 0;
	};
	
	/**
	 * @desc [btnSave]작업저장 onClick 이벤트
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 13
	 */
	moPage.onClick_BtnSave = function() {
		// 작업저장
		doSave();
	};
	
	/**
	 * @desc 강의평가항목 변경사항 저장
	 * @param 
	 * @return void
	 * @author 박갑수 at 2016. 5. 13
	 */
	function doSave() {
		
		// 리피트 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCcsLectEvalRslt"], "MSG")){
			return false;
		}
		
		// 리피트 필수값체크
		if(!moPage.checkNotNullRpt()){
			return false;
		}
		
		// "저장된 강의평가는 수정할 수 없습니다. \n계속 진행하시겠습니까?"
		if (!util.Msg.confirm("NLS-CRM-M086") ) {
			return false;
		}
		
		var vsPkValue = "REF_KEY:" + util.Grid.getCellValue(app, "grdCcrTlsnReq", "REF_KEY");
		
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				ExtControl.getControl("rptCcrTlsnReq").pk_values =  vsPkValue;
				
				doList(function(pbListSuccess) {
					// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	
	/**
	 * @desc 강의평가항목 필수체크
	 * @param 
	 * @return boolean
	 * @author 박갑수 at 2016. 5. 13
	 */
	moPage.checkNotNullRpt = function() {
		// 유효성 true or false
		var vbValid = true;
		
		var vnLength = Number(util.DataMap.getValue(app, "dmResList", "strFctorRsltCnt"));
		
		for(var i=1; i<=vnLength; i++){
		
			// 객관식, 주관식 구분 : 객관식[1], 주관식[2]
			var vsSjvOjvDivRcd = util.DataSet.getValue(app, "dsFrfCcsLectEvalRslt", "SJV_OJV_DIV_RCD_" +  i, "1");
			// 객관식만 필수체크
			if(ValueUtil.fixNull(vsSjvOjvDivRcd) == "2") continue;
			var vsRdbValue = util.Control.getValue(app, "rdb_" + i);
		
			if(ValueUtil.isNull(vsRdbValue)){
				// "강의평가항목의 [@]번 항목은 필수 입력 항목입니다. \n항목을 모두 입력해 주시기 바랍니다." 메시지
				util.Msg.alert("NLS-CCS-EXT008", [i]);
				
				util.Control.setFocus(app, "rdb_" + i);
				vbValid = false;
				return vbValid;
			}
		}
	
		return vbValid;
	};
	
	return moPage;
};
