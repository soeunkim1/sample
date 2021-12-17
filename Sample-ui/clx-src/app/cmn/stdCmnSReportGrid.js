var util = new ComUtil(app);

// 헤더 텍스트 설정할 MAP 정의
var moMapForHeader = new cpr.utils.ObjectMap();
// 조회여부 : 툴그룹활성화처리를 위해 사용.
var mbList = false;

/**
 * @desc doValueChangedCbbDataSet event 조회조건 콤보박스 데이터셋컨트롤 변경에 따른 이벤트
 * @return void
 */
function doValueChangedCbbDataSet(){
	// 동적그리드를 삭제한다.
	doDynamicGridDelete();

	// 데이터셋명
	var vsDataSet = util.SelectCtl.getValue("cbbDataSet");
	util.DataMap.setValue(app, "dmReqKey", "strSqlId", vsDataSet);
	util.Submit.send(app, "subDatasetColList", function(pbSuccess){
		if(pbSuccess){
			// 툴 그룹 [정렬, 필터, 인쇄] 비활성화, 조건지정활성화
			util.Control.setEnable(app, false, "grpDataTool");
			util.Control.setEnable(app, true, "btnCond");
			
			//그리드 리드로우(조건, 보임, 숨김, 정렬, 합계)
			util.Control.redraw(app, ["grdCmnDatasetCond", "grdCmnDatasetInVisible", "grdCmnDatasetVisible", "grdCmnDatasetSort", "grdCmnDatasetSum"]);	
			
			util.Control.redraw(app, "cbbCondCode");
			
			var vnGrdCmnDatasetCondIdx = util.Grid.getRowCount(app, "grdCmnDatasetCond");
			
//			if(vnGrdCmnDatasetCondIdx > 0 ) util.Control.lookup("grdCmnDatasetCond").updateRow(vnGrdCmnDatasetCondIdx);

			//그리드 라벨 텍스트 설정 (타이틀)
			var vnSelIndex = util.SelectCtl.getSelectedIndex(app, "cbbDataSet");
			var vsDataSetTutil = util.SelectCtl.getLabel(app, "cbbDataSet", vnSelIndex);
			util.Control.setFieldLabel("grdCmnReport", vsDataSetTutil);
			util.Control.redraw(app, "grdCmnReport_title");
			util.DataMap.setValue(app, "dmReqKey", "strExcelFileNm", vsDataSetTutil);
			
			//[조건다이얼로그] 필수파라미터 초기화
			doReqParamInitDatasetCond();
			
			//데이터셋 컬럼 표준여부에 따라 조건그룹활성화처리
			var vnNodeLength = app.lookup("dsDatasetParamList").getRowCount();
			
			if(vnGrdCmnDatasetCondIdx > 0 || vnNodeLength > 0){
				var btnCond = app.lookup("btnCond");
				btnCond.click();
			}
			
			var vnCondColNodeLength = app.lookup("dsCondColList").getRowCount();
			
			if(vnCondColNodeLength < 1){
				util.Control.setEnable(app, false, "grpDataCond");
				util.Control.setEnable(app, true, "lblAddCond");
			}else{
				util.Control.setEnable(app, true, "grpDataCond");
				util.Control.setEnable(app, false, "lblAddCond");
			}
			
			//숨김 그리드에서 본래 있던 데이터가 제대로 저장될 수 있도록 데이터 통신 후 insert 상태로 임의 변경
			util.Grid.setRowStateAll("grdCmnDatasetInVisible", cpr.data.tabledata.RowState.INSERTED);
		}
	});
}


/**
 * @desc   doOpenGrpDatasetCtl  버튼에 해당하는 그룹에 대해 오픈 이벤트 
 * @return  boolean 
 */
function doOpenGrpDatasetCtl(psOpenGrpCtl, paMouPos, pnLeft, pnTop){
	//마우스 좌표
	//var vsMouPos = model.getMousePos(); //현재 마우스 포커스
	//var vaMouPos = vsMouPos.split(",");     //0:Width 1:Height
	
	var vaMouPos = paMouPos;
	
	//버튼 좌표 
	var vsBtnLeft  =vaMouPos[0];
	var vsBtnTop =vaMouPos[1];

	util.Control.updateConstraint(app, psOpenGrpCtl, null, {"left" : pnLeft + "px", "top" : pnTop + "px" });
	
	// 메인화면 관련 그룹 비활성화처리
	//그룹 아이디 목록
	var vaMainCtl = util.getApp().getContainer().getChildren();
	var vaMainGrpCtl = new Array();
	for(var j = 0 ; j < vaMainCtl.length ; j++){
		var vsCtlType = vaMainCtl[j].type;
		if(vsCtlType == "container"){
			vaMainGrpCtl.push(vaMainCtl[j].id);
		}
	}
	
	for(var i = 0 ; i < vaMainGrpCtl.length ; i++){
		var vsGrpId = vaMainGrpCtl[i];
		
		if(vsGrpId != psOpenGrpCtl && "grpDatasetCond" != vsGrpId){
			util.Control.setEnable(app, false, vsGrpId);
		}else{
			util.Control.setEnable(app, true, vsGrpId);
		}
	}
	util.Control.setVisible(app, true, psOpenGrpCtl);
}

/**
 * @desc 
 * @param psOpenGrpCtl
 * @param pnLeft
 * @param pnTop
 */
function doOpenValueCond(psOpenGrpCtl, pnLeft, pnTop){
	util.Control.updateConstraint(app, psOpenGrpCtl, null, { "left" : pnLeft + "px", "top" : pnTop + "px"});
	
	util.Control.setEnable(app, false, "grpDatasetCond");
	util.Control.setVisible(app, true, psOpenGrpCtl);
	util.Control.setEnable(app, true, psOpenGrpCtl);
}

/**
 * @desc 
 * @param psOpenGrpCtl
 */
function doCloseValueCond(psOpenGrpCtl){
	util.Control.setEnable(app, true, "grpDatasetCond");
	util.Control.setVisible(app, false, psOpenGrpCtl);
}

/**
 * @desc   doCloseGrpDatasetCtl  버튼에 해당하는 그룹에 대해 닫기 이벤트 
 * @return  boolean 
 */
function doCloseGrpDatasetCtl(psCloseGrpCtl){						
	util.Control.setVisible(app, false, psCloseGrpCtl);
	
	// 메인화면 관련 그룹 비활성화처리
	var vaMainGrpCtl = ["grpSearch", "grpData"];
	
	util.Control.setEnable(app, true, vaMainGrpCtl);
	util.Control.setEnable(app, mbList, "grpDataTool");
}

/**
 * @desc   doList       조회버튼 이벤트
 * @param {Function} poCallBackFunc 콜백정의
 * @return void
 */
function doList(poCallBackFunc) {		
	// 동적그리드를 삭제한다.
	doDynamicGridDelete();
	
	// 파라미터설정 -> 조건다이얼로그에 설정한 값
	doSetReqParamDatasetCond();
	
	var vsSqlId = util.SelectCtl.getValue("cbbDataSet");
	var vsSqlFileNm = util.DataSet.findRow(app, "dsDataSetList", "SQL_ID == '" + vsSqlId + "'").getValue("SQL_FILE_NM");
	//빌더5 sqlFileNm StdCmnTmp -> 빌더6 CmnTmp으로 변경 되어 std 부분 자르기
	vsSqlFileNm = new String(vsSqlFileNm).substring(3);
	util.DataMap.setValue(app, "dmReqKey", "strSqlFileNm", vsSqlFileNm);
	
	var vsLmtNum = util.DataSet.findRow(app, "dsDataSetList", "SQL_ID == '" + vsSqlId + "'").getValue("LMT_NUM");
	util.DataMap.setValue(app, "dmReqKey", "strLmtNum", vsLmtNum);

	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			var vsFileDir = util.DataMap.getValue(app, "dmExcelFileInfo", "strFileDir");
			//파일명
			var vsFileNm = util.DataMap.getValue(app, "dmExcelFileInfo", "strFileNm");
			//변환파일명(실제 서버에 저장된 파일명)
			var vsFileChgNm = util.DataMap.getValue(app, "dmExcelFileInfo", "strFileChgNm");
			var vsTmpFilePath = util.DataMap.getValue(app, "dmExcelFileInfo", "strTmpFilePath");
			
			if(!ValueUtil.isNull(vsTmpFilePath)){
				var voFileParam = {
					"strFileSubPath" : "",
					"strFileNm" : vsFileChgNm,
					"strOriFileNm" : vsFileNm,
					"strTmpFilePath" :vsTmpFilePath,
					"strCommand" : "fileDownLoad"
				}
				util.Msg.alert("NLS-INF-M070", [vsLmtNum]);
				
				//다운로드 받을 파일 위치, 다운로드 받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
//				FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voFileParam);
				return;
			}
			
			//컬럼을 통해 동적 그리드를 생성한다.
			doDynamicGrid();
			
			mbList = true;
			util.Control.setEnable(app, mbList, "grpDataTool");
			
			util.Control.redraw(app, "grdCmnReport");
			
			// 조회 후 콜백함수 수행
			if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess); 
		}
	})	;
}	

/**
 * @desc   doReqParamInitDatasetCond  [조건지정] 필수파라미터 초기화 
 * @return  void
 */
function doReqParamInitDatasetCond(){
	util.Control.reset(app, "frfCmnReqParam");
	
	// 필수파라미터 프리폼안의 컨트롤들을 가져온다.
	var vaFrfCtrls = app.lookup("frfCmnReqParam").getChildren();
	
	for( var j = 0 ; j < vaFrfCtrls.length; j++){
		if("lblTitlefrfReqParam" == vaFrfCtrls[j].id) continue;
		util.Control.setVisible(app, false, vaFrfCtrls[j].id);
	}
	
	var vnNodeLength = util.DataSet.getRowCount("dsDatasetParamList");
	
	if(vnNodeLength == 0){
		util.Control.setVisible(app, false, "frfCmnReqParam");
	}else if(vnNodeLength < 3){
		util.Control.setVisible(app, true, "frfCmnReqParam");
	}else{
		uitl.Control.setVisible(true, "frfCmnReqParam");
	}	
}

/**
 * @desc  doReqParamCtlDatasetCond  [조건지정] 필수 파라미터 컨트롤 위치조절
 * @return void
 */
function doReqParamCtlDatasetCond(){
	var voNodeList = app.lookup("dsDatasetParamList");
	
	var vnNodeLength = voNodeList.getRowCount();
			
//	var vnPTop = Number(util.Control.getStyleAttr("frfCmnReqParam", "top"));
//	var vnPLeft = Number(util.Control.getStyleAttr("frfCmnReqParam", "left"));
	var vnPTop = cpr.utils.ParamUtil.parseSize(util.Control.getConsraint("frfCmnReqParam", "grpDatasetCond").top).size;
	var vnPLeft = cpr.utils.ParamUtil.parseSize(util.Control.getConsraint("frfCmnReqParam", "grpDatasetCond").left).size;
	
	var voNode = "";
	
	var vnTop = 5;
	var vnLeft = 5;
	var vnLblCtlWidth = 85;
	var vnEtcCtlWidth = 100;	
	
	var vnLblCtlGap = 5;
	var vnEtcCtlGap = 10;
	
	for (var i = 0; i < vnNodeLength; i++) {
		voNode = voNodeList.getRow(i);
		var vsReqParamRcd = voNode.getValue("REQ_PARAM_RCD");
		var vsReqParamDef = voNode.getValue("REQ_PARAM_DEF");

		if(i  == 2){
			vnTop +=  25;
			vnLeft = 5;
		}

		switch (vsReqParamRcd) {
			//기준일
			case "CM90201" : {
				// 기준일 라벨 
				util.Control.updateConstraint(app, "lblFrfBaseDate", "frfCmnReqParam", {"top" : vnTop + "px", "left" : vnLeft + "px"})
				util.Control.setVisible(app, true, "lblFrfBaseDate");
											
				vnLeft += vnLblCtlWidth + vnLblCtlGap;
				
				// 기준일 dateInput
				util.Control.updateConstraint(app, "dipFrfBaseDate", "frfCmnReqParam", {"top" : vnTop + "px", "left" : vnLeft + "px"});
				util.Control.setVisible(app, true, "dipFrfBaseDate");

				if(!ValueUtil.isNull(vsReqParamDef)){
					util.Control.setValue(app, app, "dipFrfBaseDate", vsReqParamDef);
				}		
				
				vnLeft += vnEtcCtlWidth + vnEtcCtlGap;
				
				break;
			}
			//언어키
			case "CM90202" : {
				// 언어키 라벨 
				util.Control.updateConstraint(app, "lblFrfLanDivRcd", "frfCmnReqParam", {"top" : vnTop + "px", "left" : vnLeft + "px"});
				util.Control.setVisible(app, true, "lblFrfLanDivRcd");
											
				vnLeft += vnLblCtlWidth + vnLblCtlGap;
				
				// 언어키 콤보박스
				util.Control.updateConstraint(app, "cbbFrfLanDivRcd", "frfCmnReqParam", {"top" : vnTop + "px", "left" : vnLeft + "px"});
				util.Control.setVisible(app, true, "cbbFrfLanDivRcd");
		
				if(!ValueUtil.isNull(vsReqParamDef)){
					util.Control.setValue(app, app, "cbbFrfLanDivRcd", vsReqParamDef);
				}		
				
				vnLeft += vnEtcCtlWidth + vnEtcCtlGap;
				
				break;
			}
			//학년도
			case "CM90203" : {
				// 학년도 라벨 
				util.Control.updateConstraint(app, "lblFrfSchYearRcd", "frfCmnReqParam", {"top" : vnTop + "px", "left" : vnLeft + "px"});
				util.Control.setVisible(app, true, "lblFrfSchYearRcd");
											
				vnLeft += vnLblCtlWidth + vnLblCtlGap;
				
				// 학년도 콤보박스
				util.Control.updateConstraint(app, "cbbFrfSchYearRcd", "frfCmnReqParam", {"top" : vnTop + "px", "left" : vnLeft + "px"});
				util.Control.setVisible(app, true, "cbbFrfSchYearRcd");

				if(!ValueUtil.isNull(vsReqParamDef)){
					util.Control.setValue(app, app, "cbbFrfSchYearRcd", vsReqParamDef);
				}		
				
				vnLeft += vnEtcCtlWidth + vnEtcCtlGap;
				
				break;
			}
			//학기
			case "CM90204" : {
				
				// 학기 라벨 
				util.Control.updateConstraint(app, "lblFrfSmtRcd", "frfCmnReqParam", {"top" : vnTop + "px", "left" : vnLeft + "px"});
				util.Control.setVisible(app, true, "lblFrfSmtRcd");
											
				vnLeft += vnLblCtlWidth + vnLblCtlGap;
				
				// 학기 콤보박스
				util.Control.updateConstraint(app, "cbbFrfSmtRcd", "frfCmnReqParam", {"top" : vnTop + "px", "left" : vnLeft + "px"});
				util.Control.setVisible(app, true, "cbbFrfSmtRcd");

				if(!ValueUtil.isNull(vsReqParamDef)){
					util.FreeForm.setValue("cbbFrfSmtRcd", vsReqParamDef);
				}	

				vnLeft += vnEtcCtlWidth + vnEtcCtlGap;
				
				break;
			}
		}
	}
}

/**
 * @desc  doSetReqParamDatasetCond  [조건지정] 필수 파라미터 value값 조회조건instance set
 * @return void
 */
function doSetReqParamDatasetCond(){
	var voNodeList = app.lookup("dsDatasetParamList");
	var vnNodeLength = voNodeList.getRowCount();
		
	// 조회조건이 되는 파라미터값 set
	for (var i = 0; i < vnNodeLength; i++) {
		voNode = voNodeList.getRow(i);
		var vsReqParamRcd = voNode.getValue("REQ_PARAM_RCD");
		var vsReqParamKey = voNode.getValue("REQ_PARAM_KEY");
							
		switch (vsReqParamRcd) {
			//기준일
			case "CM90201" : {
				util.DataMap.setValue(app, "dmReqList", "strKeyDate", vsReqParamKey + "|" + util.Control.getValue(app, "dipFrfBaseDate"));
				break;
			}
			//언어키
			case "CM90202" : {
				util.DataMap.setValue(app, "dmReqList", "strLanDivRcd", vsReqParamKey + "|" + util.SelectCtl.getValue("cbbFrfLanDivRcd"));
				break;
			}
			//학년도
			case "CM90203" : {
				util.DataMap.setValue(app, "dmReqList", "strSchYearRcd", vsReqParamKey + "|" + util.SelectCtl.getValue("cbbFrfSchYearRcd"));
				break;
			}
			//학기
			case "CM90204" : {
				util.DataMap.setValue(app, "dmReqList", "strSmtRcd", vsReqParamKey + "|" + util.SelectCtl.getValue("cbbFrfSmtRcd"));
				break;
			}
		}
	}
}

/**
 * @desc   doReqParamValidationDatasetCond  [조건지정] 필수파라미터 유효성 체크
 * @return  Boolean 
 */
function doReqParamValidationDatasetCond(){
	// 필수파라미터 프리폼안의 컨트롤들을 가져온다.
	var vaFrfCtrls = app.lookup("frfCmnReqParam").getChildren();

	var vaCtrl = new Array();
	for( var j = 0 ; j < vaFrfCtrls.length; j++){
		var vsCtlType = util.Control.getType(vaFrfCtrls[j].id);
		
		if(vsCtlType == "output" || vaFrfCtrls[j].id == null) continue;
		
		if(util.Control.isVisible(vaFrfCtrls[j].id)){
			vaCtrl.push(vaFrfCtrls[j].id);
		}
	}
	
	if(vaCtrl.length > 0){
		 if (!util.validate(app, vaCtrl)) return false;
	}

	return true;
}

/**
 * @desc   doColumnTypeFilterDatasetCond  [조건지정] 조건명컬럼에 따른 조건절 필터링 함수 
 * @return  void
 */
function doColumnTypeFilterDatasetCond(){
	var vsNodeset = "";
	
	var vsColumnNm = util.Grid.getCellValue(app, "grdCmnDatasetCond", "COLUMN_NM"); // 컬럼명
	
	if(ValueUtil.isNull(vsColumnNm)){
		util.Msg.warn("M226");
		util.Control.setFocus(app, "gdCbbColumnNmCond");
		return;
	}
	
	var vsColType = util.DataSet.findRow(app, "dsCondColList", "COND_KEY == '" + vsColumnNm + "'").getValue("TYPE");
	
	if(ValueUtil.fixNull(vsColType) != ""){
		vsNodeset = "CD_PRP1 == '" + vsColType + "'";
	}
	
	// 조건절 노드셋 설정
//	util.Control.setUserAttr("gdCbbCondTypeCond", "nodeset", vsNodeset);
	util.SelectCtl.setInsBind("gdCbbCondTypeCond", vsNodeset);
	
	util.Control.redraw(app, "gdCbbCondTypeCond");
}

/**
 * @desc   doDynamicGridtDelete  동적그리드를 삭제한다.
 * @return  void
 */
function doDynamicGridDelete(){
	var vnSize = moMapForHeader.size();
	if(vnSize > 0){	
		var vaKeys = moMapForHeader.keys();

		for(var i = 0 ; i < vaKeys.length ; i++){
			var vsKey = vaKeys[i];
			var vsHeaderId = "ghBtn" + vsKey; //헤더ID
			
			var voHeaderCol = util.Grid.getHeaderColumn(app, "grdCmnReport", vsKey)[0];
			if(!ValueUtil.isNull(voHeaderCol)){
				app.lookup("grdCmnReport").deleteColumn(voHeaderCol.colIndex);
			}
		}
		
		// 그리드를 다시 그린다.
		util.Control.redraw(app, "grdCmnReport");
	}	
}

/**
 * @desc   doDynamicGrid  동적그리드를 생성한다.
 * @return  void
 * @author Kim Bora 2015. 12. 08.
 */
function doDynamicGrid(){
	// 이전 값(MAP)을 clear
	moMapForHeader.removeAll();
	
	// 1. 컬럼 갯수를 가져온다.
	var vnLen = util.DataSet.getRowCount("dsDatasetColList");
	
	// 2. 컬럼 갯수만큼 for문을 통해 동적그리드를 생성한다.
	for( var i = 0; i < vnLen ; i++){		
		// 2-1. 컬럼명, 컬럼별칭
		var vsColumnName = util.DataSet.getValue(app, "dsDatasetColList", i, "COLUMN_NM");    // 명(sorting시 설정)
		var vsColumnAlias = util.DataSet.getValue(app, "dsDatasetColList", i, "COLUMN_ALIAS"); // 별칭
		var vsColumnType = util.DataSet.getValue(app, "dsDatasetColList", i, "COLUMN_TYPE"); // 컬럼타입
		
		// 2-2.  목록 detail
		var vcGrdCmnReportDtl = app.lookup("gdOpt" + vsColumnName);
		
		// 2-3.  목록 header
		var vcGrdCmnReportHeader = app.lookup("ghBtn" + vsColumnName);
									
		// 2-4.  목록 detail 삭제
		// 2-5.  목록 header 삭제
//		if(vcGrdCmnReportDtl && vcGrdCmnReportHeader){
//			var voHeaderColumn = util.Grid.getHeaderColumn("grdCmnReport", vsColumnName)[0];
//			util.Control.lookup("grdCmnReport").deleteColumn(1);
//		}
							
		// 2-6.  목록 생성(header, detail)
		doCreateGrdDetailColumn(vsColumnName, vsColumnType, vsColumnAlias, i);
		
		// 2-7. 조회 전 동적그리드를 삭제하기 위해 ObjectMap으로 담아준다.
		if(!ValueUtil.isNull(vsColumnAlias)){
			moMapForHeader.put(vsColumnName, vsColumnName);				
		}
	}
					
	// 3. 그리드를 다시 그린다.
	util.Control.redraw(app, "grdCmnReport");
	
	// 4. 컬럼제어목록의 숨김컬럼이 있는 경우 제어해주도록 이벤트실행
	var vnCntInVisibleCol = util.Grid.getRowCount(app, "grdCmnDatasetInVisible");
	if(vnCntInVisibleCol > 0){
		var btnSaveVisible = app.lookup("btnSaveVisible");
		btnSaveVisible.click();
	}			
}

/**
 * @desc  doCreateRptDetailColumn  동적리피트 목록의 컬럼생성
 * @param psColumnNm    컬럼명
 * @param psColumnType  컬럼타입
 * @param psColumnAlias  컬럼별칭(sort)
 * @return void
 */
function doCreateGrdDetailColumn(psColumnNm, psColumnType, psColumnAlias, pnIdx){
	var vnLastIdx = util.DataSet.getRowCount("dsDatasetColList");
	var vnColIdx = pnIdx + 1;
	var vsCtls;
	// 1. 타입에 따라 detail컨트롤 설정에 대한 처리
	if(psColumnType == "DATE"){
		vsCtls = (function() {
			var vcOutput = new cpr.controls.Output("gdOpt" + psColumnNm);
			vcOutput.dataType = "date";
			vcOutput.format = "YYYY-MM-DD";
			vcOutput.style.css("textAlign", "center");
			if(vcOutput.isBindable("value")){
				vcOutput.bind("value").toDataColumn(psColumnNm);
			}
			return vcOutput;
		})()
	}else if(psColumnType == "DATETIME"){
		vsCtls = (function() {
			var vcOutput = new cpr.controls.Output("gdOpt" + psColumnNm);
			vcOutput.dataType = "date";
			vcOutput.format = "YYYY-MM-DD hh:mm:ss";
			vcOutput.style.css("textAlign", "center");
			if(vcOutput.isBindable("value")){
				vcOutput.bind("value").toDataColumn(psColumnNm);
			}
			return vcOutput;
		})()
	}else if(psColumnType == "Int"){
		vsCtls = (function() {
			var vcOutput = new cpr.controls.Output("gdOpt" + psColumnNm);
			vcOutput.dataType = "number";
			vcOutput.format = "000,000";
			if(vcOutput.isBindable("value")){
				vcOutput.bind("value").toDataColumn(psColumnNm);
			}
			return vcOutput;
		})()
	}else if(psColumnType == "Float"){
		vsCtls = (function() {
			var vcOutput = new cpr.controls.Output("gdOpt" + psColumnNm);
			vcOutput.dataType = "number";
			vcOutput.format = "000.00";
			if(vcOutput.isBindable("value")){
				vcOutput.bind("value").toDataColumn(psColumnNm);
			}
			return vcOutput;
		})()
	}else{
		vsCtls = (function() {
			var vcOutput = new cpr.controls.Output("gdOpt" + psColumnNm);
			if(vcOutput.isBindable("value")){
				vcOutput.bind("value").toDataColumn(psColumnNm);
			}
			return vcOutput;
		})()
	}
	
	//2. header 추가
	var vcHeaderCtls;
	if(psColumnType == "Int" || psColumnType == "Float"){
		vcHeaderCtls = (function() {
			var vcOutput = new cpr.controls.Output("ghBtn" + psColumnNm);
			vcOutput.value = psColumnAlias;
//			vcOutput.bind("value").toLanguage("");
//			vcOutput.bind("value").toLanguage("");
			return vcOutput;
		})()
	}else{
		vcHeaderCtls = (function() {
			var vcOutput = new cpr.controls.Output("ghBtn" + psColumnNm);
			vcOutput.value = psColumnAlias;
//			vcOutput.bind("value").toLanguage("");
//			vcOutput.bind("value").toLanguage("");
			return vcOutput;
		})()
	}
	
	// 3. detail과 header 컨트롤 추가
	util.Grid.addColumn("grdCmnReport", {
			columnLayout : [{
				width : "150px"
			}],
			header : [{
				rowIndex : 0,
				colIndex : vnColIdx,
				colSpan : 1,
				control : vcHeaderCtls
			}],
			detail : [{
				rowIndex : 0,
				colIndex : vnColIdx,
				colSpan : 1,
				rowSpan : 1,
				columnName : psColumnNm,
				sortColumnName : psColumnNm,
				control : vsCtls
			}]
		});
}

/**
 * @desc  doSetColVisibleOrder  [컬럼제어] 보이기 컬럼 상하 로우 이동
 * @param {string} psOrderDiv    순서구분(UP/DOWN)
 * @return void
 */
function doSetColVisibleOrderDatasetVisible(psOrderDiv){
	var vnOrder = psOrderDiv == "UP" ? -1 : 1;
	// 현재선택된 인덱스
	var vnIdx = util.Grid.getIndex(app, "grdCmnDatasetVisible");
	var vnSelectIdx = vnIdx+vnOrder;
	
	changeRowIndex("dsCmnDatasetVisible", vnIdx, vnSelectIdx);
	util.Grid.selectRow(app, "grdCmnDatasetVisible", vnSelectIdx);
	
	//기존 소스
//	var vsColVisbleValue = util.Grid.getCellValue("grdCmnDatasetVisible", "COLUMN_NM", vnIdx);
//	var vnSelectIdx = vnIdx+vnOrder;
//	util.Grid.selectRows("grdCmnDatasetVisible", vnSelectIdx);
//	
//	var vsBefColVisibleValue = util.Grid.getCellValue("grdCmnDatasetVisible", "COLUMN_NM", vnSelectIdx);
//	
//	util.Grid.setCellValue("grdCmnDatasetVisible", "COLUMN_NM", vsColVisbleValue, vnSelectIdx);
//	util.Grid.setCellValue("grdCmnDatasetVisible", "COLUMN_NM", vsBefColVisibleValue, vnIdx);
}

/**
 * 두 개의 행의 순서를 변경
 * @param psDatasetId
 * @param pnIdx
 * @param vnSelectIdx
 */
function changeRowIndex(psDatasetId, pnIdx, pnSelectIdx){
	var vcDataset = app.lookup(psDatasetId);
	vcDataset.changeRowIndex(pnIdx, pnSelectIdx);
}

/**
 * @desc  doMoveColDatasetVisible  [컬럼제어] 보이기/숨김 컬럼 좌우이동
 * @param {string} psAddColGrdId     옮겨질 그리드ID
 * @param {string} psDelColGrdId	  더해질 그리드ID
 * @return void
 */
function doMoveColDatasetVisible(psAddColGrdId, psDelColGrdId){
	var vsSelIdx = util.Grid.getCheckOrSelectedRowIndex(app, psAddColGrdId);
	
	// 선택된 내역이 없는 경우
	if(String(vsSelIdx).isEmpty()) return false;
	
	var vaIdx = null;
	if(String(vsSelIdx).indexOf(",") != -1){
		vaIdx = String(vsSelIdx).split(",");
	}else{
		vaIdx = new Array();
		vaIdx = vsSelIdx;
	}

	for(var i = 0 ; i < vaIdx.length ; i++){
		var vnIdx = vaIdx[i];
		var vsColValue = util.Grid.getCellValue(app, psAddColGrdId, "COLUMN_NM", vnIdx);
		
		var vnNewIdx = util.Grid.insertRow(app, psDelColGrdId);
		util.Grid.setCellValue(app, psDelColGrdId, "COLUMN_NM", vsColValue, vnNewIdx);
	}
	
	if(util.Grid.getRowCount(app, psAddColGrdId) == 1){
		util.Control.reset(app, app, psAddColGrdId);
	}else{
//		var vsPath = util.Control.getUserAttr(psAddColGrdId, "nodeset");
//		util.Control.lookup(psAddColGrdId).deleteRow(vnIdx, vsPath);
		util.Grid.deleteRow(app, psAddColGrdId, vaIdx);
	}
	
	util.Control.redraw(app, psAddColGrdId);
}


/**
 * @desc  doColsSortSumDatasetSort  [정렬] 정렬 및 합계를 적용한다.
 * @param void
 * @return void
 */
function doColsSortSumDatasetSort(){
//	ExtRepeat.setCRUDAttr("rptCmnReport", "alltype", "true");
//	ExtRepeat.setCRUDAttr("rptCmnDatasetSort", "alltype", "true");
//	ExtRepeat.setCRUDAttr("rptCmnDatasetSum", "alltype", "true");

	util.Submit.send(app, "subColsSum", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnReport");
//			ExtRepeat.setCtlRptRowCnt("rptCmnReport");
			// 정렬 그룹 close
			doCloseGrpDatasetCtl("grpDatasetSort");
		}
	});
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	//서브미션 실행
	util.Submit.send(app, "subOnLoad", function(pbSuccess){
		if(pbSuccess){
			//콤보박스 리드로우
			util.Control.redraw(app, "cbbDataSet");
			//리드로우
			util.Control.redraw(app, "frfCmnReqParam");
			
			util.Control.setEnable(app, false, "btnCond");
			
			//동적으로 그린 그리드를 삭제한다.
			doDynamicGridDelete();	
		}
	});
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbbDataSetSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var cbbDataSet = e.control;
	doValueChangedCbbDataSet();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCondClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCond = e.control;
	var vnNodeLength = app.lookup("dsDatasetParamList").getRowCount();
	var vnCondColNodeLength = app.lookup("dsCondColList").getRowCount();
	
	if(vnNodeLength == 0 && vnCondColNodeLength == 0){
		util.Msg.alert("NLS-CMM-M051");
		return;
	}
	
	//1. 조건지정 그룹을 활성화 한다.
	var vaMouPos = [event.clientX, event.clientY];
	doOpenGrpDatasetCtl("grpDatasetCond", vaMouPos, 350, 68);
	
	//2. [조건지정] 필수파라미터 컨트롤 위치 조정
	doReqParamCtlDatasetCond();
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	//1. 조회조건 필수체크 : 데이터셋 명
	if(!util.validate(app, ["cbbDataSet"])) return false;
	
	//2. 조건 그룹 내역 유효성체크 (필수파라미터 및 조건 그리드)
	if(!doReqParamValidationDatasetCond() || !util.validate(app, "grdCmnDatasetCond")){
		//조건지정버튼실행
		var btnCond = app.lookup("btnCond");
		btnCond.click();
		return false;
	}
	
	//3. 조회한다.
	doList(function(pbSuccess){
		//조회되었습니다
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
}

/*
 * "컬럼제어" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnColVisibleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnColVisible = e.control;
	//컬럼제어 그룹을 활성화한다.
	var vaMouPos = [e.clientX, e.clientY];
	doOpenGrpDatasetCtl("grpDatasetVisible", vaMouPos, 405, 80);
}

/*
 * "정렬" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSortClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSort = e.control;
	//정렬 그룹을 활성화 한다.
	var vaMouPos = [e.clientX, e.clientY];
	doOpenGrpDatasetCtl("grpDatasetSort", vaMouPos, 405, 80);
}

/*
 * 인풋 박스에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGdIpbValueCondClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var gdIpbValueCond = e.control;
	var vsCondColNm = util.Grid.getCellValue(app, "grdCmnDatasetCond", "COLUMN_NM");
	
	if(ValueUtil.isNull(vsCondColNm)){
		return false;
	}
	
	var vsColType = util.DataSet.findRow(app, "dsCondColList", "COND_KEY == '" + vsCondColNm + "'").getValue("COND_TYPE_CD");
	
	if(vsColType == "CM01603"){
		var vsColClsCd = util.DataSet.findRow(app, "dsCondColList", "COND_KEY == '" + vsCondColNm + "'").getValue("CD_NM");
		
		var vsNodest = "";
		if(ValueUtil.fixNull(vsColClsCd) != ""){
			vsNodest = "CD_CLS == '" + vsColClsCd + "'";
		}
		//조건절 노드셋 설정
//		util.Control.setUserAttr("cbbCondCode", "nodest", vsNodest);
		util.SelectCtl.setInsBind("cbbCondCode", vsNodest);
		
		util.Control.redraw(app, "cbbCondCode");
		
		doOpenValueCond("grpCode", event.clientX - 250, event.clientY - 85);
		util.Control.setFocus(app, null);
		
	}else if(vsColType == "CM01604"){
		app.lookup("ipbSaNm").iObjDivRcd = "CC009SA";
		doOpenValueCond("grpSaCd", event.clientX - 250, event.clientY -85);
		util.Control.setFocus(app, null);
	}else if(vsColType == "CM01605"){
		app.lookup("ipbSaNm").iObjDivRcd = "CC009OG";
		util.Control.setFocus(app, null);
		doOpenValueCond("grpSaCd", event.clientX - 250, event.clientY -85);	
	}else if(vsColType == "CM01602"){
		util.Control.setFocus(app, null);
		doOpenValueCond("grpDate", event.clientX - 250, event.clientY - 85);
	}
	
	//Value-change가 제대로 발생하지 않아 value-change 로직을 click 이벤트 시 발생하도록 변경
	var vsCondCol = util.DataSet.findRow(app, "dsCondColList", "COND_KEY == '" + vsCondColNm + "'").getValue("COND_COL");
	//텍스트 유형인 경우에는 값변경시... 실제 비교값 컬럼 업데이트
	if(vsColType == "CM01601" || vsColType == "CM01606" ){
		util.Grid.setCellValue(app, "grdCmnDatasetCond", "REAL_VALUE", util.Grid.getCellValue(app, "grdCmnDatasetCond","VALUE"));
	}
	
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "COND_COL", vsCondCol);
	
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "COND_COL_TYPE", vsColType);
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onGdIpbValueCondValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var gdIpbValueCond = e.control;
	var vsCondColNm = util.Grid.getCellValue(app, "grdCmnDatasetCond", "COLUMN_NM");
	
	if(ValueUtil.isNull(vsCondColNm)){
		return false;
	}
	
	var vsColType = util.DataSet.findRow(app, "dsCondColList", "COND_KEY == '" + vsCondColNm + "'").getValue("COND_TYPE_CD");
	var vsCondCol = util.DataSet.findRow(app, "dsCondColList", "COND_KEY == '" + vsCondColNm + "'").getValue("COND_COL");
	//텍스트 유형인 경우에는 값변경시... 실제 비교값 컬럼 업데이트
	if(vsColType == "CM01601" || vsColType == "CM01606" ){
		util.Grid.setCellValue(app, "grdCmnDatasetCond", "REAL_VALUE", util.Grid.getCellValue(app, "grdCmnDatasetCond","VALUE"));
	}
	
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "COND_COL", vsCondCol);
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "COND_TYPE_CD", vsColType);
	
	//COND_TYPE이 아웃풋과 연결되어 있기 때문에 해당 라벨로 value를 찾아 값 재설정
	var vsColTypeCond = util.Control.getValue(app, "gdOptCondTypeCond");
	if(!ValueUtil.isNull(vsColTypeCond)){
		util.SelectCtl.selectItem(app, "gdCbbCondTypeCond", util.SelectCtl.getValueFromLabel("gdCbbCondTypeCond", vsColTypeCond));
	}
}

/*
 * 콤보 박스에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onGdCbbCondTypeCondFocus(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbCondTypeCond = e.control;
	doColumnTypeFilterDatasetCond();
}

/*
 * "조건추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNewCondClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnNewCond = e.control;	
	var vnCnt = util.Grid.getRowCount(app, "grdCmnDatasetCond");
	util.Grid.insertRow(app, "grdCmnDatasetCond", vnCnt);
}

/*
 * "조건삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteCondClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDeleteCond = e.control;
	var vnGrdIdx = util.Grid.getIndex(app, "grdCmnDatasetCond");
	
	//로우 건수 체크
	var vaIdxs = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnDatasetCond");
	
	if(!ValueUtil.isNull(vaIdxs)){
//		var voIdx = vsIdxs.split(",");
		for(var i = 0 ; i < vaIdxs.length ; i++){
			var vsReqYn = util.DataSet.getValue(app, "dsCmnDatasetCond", vaIdxs[i], "MAND_YN");
			if(vsReqYn == "Y"){
				//필수조건은 삭제할 수 없습니다.
				util.Msg.warn("M122", ["필수조건"]);
				return false;
			}
		}
	}
	util.Grid.deleteRow(app, "grdCmnDatasetCond");
}

/*
 * "적용" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveCondClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSaveCond = e.control;
	//1. 조건 그룹 내역 유효성 체크(필수파라미터 및 조건그리드)
	if(!doReqParamValidationDatasetCond() || !util.validate(app, "grdCmnDatasetCond")){
		return false;
	}
	
	//2. 조회한다.
	doList(function(pbSuccess){
		//조회되었습니다.
		if(pbSuccess) util.Msg.alert("NLS-INF-M024");
	});
	
	//3.조건그룹 close
	doCloseGrpDatasetCtl("grpDatasetCond");
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancleCondClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCancleCond = e.control;
	//조건그룹 close
	doCloseGrpDatasetCtl("grpDatasetCond");
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCodeClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCode = e.control;
	var vsCode = util.SelectCtl.getValue("cbbCondCode");
	
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "VALUE", vsCode);
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "REAL_VALUE", vsCode);
	
	//부서구분코드 값 설정 후 콤보박스 리셋
	util.Control.reset(app, "cbbCondCode");
	
	doCloseValueCond("grpCode");
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCodeCencleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCodeCencle = e.control;
	doCloseValueCond("grpCode");
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCode1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCode1 = e.control;
	var vsDate = util.SelectCtl.getValue("ipbDate");
	
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "VALUE", vsDate);
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "REAL_VALUE", vsDate);
	util.SelectCtl.setValue(app, "ipbDate", "");
	
	doCloseValueCond("grpDate");
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCodeCencle1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCodeCencle1 = e.control;
	doCloseValueCond("grpDate");
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCode2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCode2 = e.control;
	var vsSaCd = util.DataMap.getValue(app, "dmTempCond", "strSaCd");
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "VALUE", vsSaCd, null);
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "REAL_VALUE", vsSaCd, null);
	
	util.Control.setValue(app, app, "ipbSaNm", "");
	
	doCloseValueCond("grpSaCd");
}

/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCodeCencle2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCodeCencle2 = e.control;
	doCloseValueCond("grpSaCd");
}

/*
 * "▲" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnColUpVisibleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnColUpVisible = e.control;
	doSetColVisibleOrderDatasetVisible("UP");
}

/*
 * "▼" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnColDownVisibleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnColDownVisible = e.control;
	doSetColVisibleOrderDatasetVisible("DOWN");
}

/*
 * "RESET" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnResetVisibleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnResetVisible = e.control;
	//재조회를 통해 RESET 한다.
	util.Submit.send(app, "subColsVisibleResetList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, ["grdCmnDatasetVisible", "grdCmnDatasetInVisible"]);
		}
	});
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveColVisibleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSaveColVisible = e.control;
	// 조회조건의 데이터셋value
	var vsSqlId = util.SelectCtl.getValue("cbbDataSet");
	// 조회조건의 데이터셋value에 따른 언어키를 가져온다.
	var vsLanDivRcd = util.DataSet.findRow(app, "dsDataSetList", "SQL_ID == '" + vsSqlId + "'").getValue("LAN_DIV_RCD");
	
	util.DataMap.setValue(app, "dmReqColVisColsKey", "strLanDivRcd", vsLanDivRcd);
	
	// 데이터셋 사용자정의컬럼을 저장한다.
	util.Submit.send(app, "subColsVisibleSave", function(pbSuccess){
		if(pbSuccess){
			//숨김 그리드에서 본래 있던 데이터가 제대로 저장될 수 있도록 데이터 통신 후 insert 상태로 임의 변경
			util.Grid.setRowStateAll("grdCmnDatasetInVisible", cpr.data.tabledata.RowState.INSERTED);
			util.Control.redraw(app, ["grdCmnDatasetVisible", "grdCmnDatasetInVisible", "grdCmnReport"]);
			
			// 적용버튼이벤트를 호출한다.
			var btnSaveVisible = app.lookup("btnSaveVisible");
			btnSaveVisible.click();
		}
	});
}

/*
 * "적용" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveVisibleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSaveVisible = e.control;
	//1. 컬럼 갯수를 가져온다.
	var vnLen = app.lookup("dsDatasetColList").getRowCount();
	
	//2. 컬럼 갯수만큼 for문을 통해 동적그리드를 생성한다.
	for(var i = 0 ; i < vnLen ; i++){
		//2-1. 컬럼명, 컬럼별칭
		var vsColumnName = util.DataSet.getValue(app, "dsDatasetColList", i, "COLUMN_NM"); //명(sorting 설정)
		var vsColumnAilas = util.DataSet.getValue(app, "dsDatasetColList", i, "COLUMN_ALIAS"); //별칭
		var vsColumnType = util.DataSet.getValue(app, "dsDatasetColList", i, "COLUMN_TYPE"); //컬럼타입
		
		//2-2. 목록 detail
		var vcGrdCmnReportDtl = app.lookup("gdOpt" + vsColumnName);
		
		//2-3. 목록 header
		var vcGrdCmnReportHeader = app.lookup("ghBtn" + vsColumnName);
		
		//2-4 목록 detail과 header 삭제
		if(vcGrdCmnReportDtl && vcGrdCmnReportHeader){
			var voHeaderColumn = util.Grid.getHeaderColumn(app, "grdCmnReport", vsColumnName)[0];
			if(voHeaderColumn){
				app.lookup("grdCmnReport").deleteColumn(voHeaderColumn.colIndex);
			}
		}
	}
	
	//보임컬럼 갯수
	var vnColVisible = util.Grid.getRowCount(app, "grdCmnDatasetVisible");
	
	//2. 보임컬럼설정처리
	for(var j = 0 ; j < vnColVisible ; j++){
		var vsColVisibleNm = util.Grid.getCellValue(app, "grdCmnDatasetVisible", "COLUMN_NM", j);
		var vsVisibleColType = util.DataSet.findRow(app, "dsDatasetColList", "COLUMN_NM == '" + vsColVisibleNm + "'").getValue("COLUMN_TYPE"); //컬럼명에 따른 컬럼타입가져오기
		var vsVisibleColAlias = util.DataSet.findRow(app, "dsDatasetColList", "COLUMN_NM == '" + vsColVisibleNm + "'").getValue("COLUMN_ALIAS"); //컬럼명에 따른 컬럼타입가져오기
		
		doCreateGrdDetailColumn(vsColVisibleNm, vsVisibleColType, vsVisibleColAlias, j);
	}
	
	//3. 그리드를 다시 그린다.
	util.Control.redraw(app, "grdCmnReport");
	
	//4. 컬럼제어그룹 close
	doCloseGrpDatasetCtl("grpDatasetVisible");
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancleVisibleClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCancleVisible = e.control;
	//컬럼제어그룹 close
	doCloseGrpDatasetCtl("grpDatasetVisible");
}

/*
 * "기준추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNewSortClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnNewSort = e.control;
	//정렬 그리드 신규행 추가
	util.Grid.insertRow(app, "grdCmnDatasetSort");
}

/*
 * "기준삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteSortClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDeleteSort = e.control;
	//정렬 그리드 삭제
	util.Grid.deleteRow(app, "grdCmnDatasetSort");
}

/*
 * "합계추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnNewSumClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnNewSum = e.control;
	//합계 그리드 신규행 추가
	var vnIdx = util.Grid.insertRow(app, "grdCmnDatasetSum");
	util.Grid.setCellValue(app, "grdCmnDatasetSum", "SUM_COL_TYPE", "", vnIdx);
}

/*
 * "합계삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteSumClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDeleteSum = e.control;
	//합계 그리드 삭제
	util.Grid.deleteRow(app, "grdCmnDatasetSum");
}

/*
 * "RESET" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnResetSortClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnResetSort = e.control;
	util.Control.reset(app, app, ["grdCmnDatasetSort", "grdCmnDatasetSum"]);
}

/*
 * "적용" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveSortClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSaveSort = e.control;
	//1. 정렬 그룹 내역 유효성체크(정렬파라미터 및 합계그리드)
	if(!util.validate(app, ["grdCmnDatasetSort", "grdCmnDatasetSum"])){
		return false;
	}
	
	//2. 정렬 및 합계 적용한다.
	doColsSortSumDatasetSort();
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancleSortClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCancleSort = e.control;
	//정렬 그룹 close
	doCloseGrpDatasetCtl("grpDatasetSort");
}


/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnColVisInsertClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnColVisInsert = e.control;
	doMoveColDatasetVisible("grdCmnDatasetVisible", "grdCmnDatasetInVisible");
}


/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnColVisRemoveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnColVisRemove = e.control;
	doMoveColDatasetVisible("grdCmnDatasetInVisible", "grdCmnDatasetVisible");
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdCbbCondTypeCondSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbCondTypeCond = e.control;
	var vsCondColNm = util.Grid.getCellValue(app, "grdCmnDatasetCond", "COLUMN_NM");
	
	if(ValueUtil.isNull(vsCondColNm)){
		return false;
	}
	
	//조건지정 그리드 콤보박스의 label 과 value 설정을 CD_NM으로 동일하게 할 경우, value가 중복되는 문제로 임의적으로 라벨값을 COND_TYPE에 넣어줌
	var vsCondType = util.SelectCtl.getLabelByValue(app, ("gdCbbCondTypeCond", util.SelectCtl.getValue("gdCbbCondTypeCond"));
	util.Grid.setCellValue(app, "grdCmnDatasetCond", "COND_TYPE", vsCondType);
}


/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onGdCbbColumnNmSortSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbColumnNmSort = e.control;
	var vnIdx = util.Grid.getIndex(app, "grdCmnDatasetSort");
	var vsColumnNm = util.Grid.getCellValue(app, "grdCmnDatasetSort", "COLUMN_NM", vnIdx);
	var vsColType = util.DataSet.findRow(app, "dsDatasetColList", "COLUMN_NM == '" + vsColumnNm + "'").getValue("COLUMN_TYPE");
	
	util.Grid.setCellValue(app, "grdCmnDatasetSort", "COLUMN_TYPE", vsColType, vnIdx);
}


/*
 * 콤보 박스에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onGdCbbSumTypeFocus(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.ComboBox
	 */
	var gdCbbSumType = e.control;
	var vsColumnNm = util.Grid.getCellValue(app, "grdCmnDatasetSum", "SUM_COL"); //컬럼명
	var vsColumnType = util.DataSet.findRow(app, "dsDatasetColList", "COLUMN_NM == '" + vsColumnNm + "'").getValue("COLUMN_TYPE"); //컬럼명에 따른 컬럼타입 가져오기
	
	if(!("Int" == vsColumnType || "Float" == vsColumnType)){
//		util.Control.setUserAttr("gdCbbSumType", "nodeset", "CD == 'COUNT'" );
		//선행데이터로 이루어진 콤보박스이기 때문에 컬럼명이 아닌 value로 필터
		util.SelectCtl.setInsBind("gdCbbSumType", "value == 'COUNT'");
	}else{
//		util.Control.setUserAttr("gdCbbSumType", "nodeset", psAttrValue);
		app.lookup("gdCbbSumType").clearFilter();
	}
	
	util.Control.redraw(app, "gdCbbSumType");
}




