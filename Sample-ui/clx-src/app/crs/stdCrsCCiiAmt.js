//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCCiiAmt.xtm"/>


var stdCrsCCiiAmt = function() {
		
	var moPage = new Page();
	
	//조건에 따라 리피트헤더명 변경해야하는 컨트롤아이디 배열
	var maChangeCol = []; 
	
	// 리피트 ref : detail ctrl
	var moFldNames = {
		REG_FEE_CAT_SA : "rdCbbRegFeeCatSa",
		REG_FEE_CAT_SP : "rdCbbRegFeeCatSp",
		REG_FEE_CAT_STUD : "rdCbbRegFeeCatStud",
		SHYR_FROM : "rdIpbShyrFrom",
		SHYR_TO : "rdIpbShyrTo",
		SMT_FROM : "rdIpbSmtFrom",
		SMT_TO : "rdIpbSmtTo",
		GRDT_TGT_YN : "rdChkGrdtTgtYn",
		RE_ENTR_YN : "rdChkReEntrYn",
		BKG_PNT_FROM : "rdIpbBkgPntFrom",
		BKG_PNT_TO : "rdIpbBkgPntTo",
		BKG_TIME_FROM : "rdIpbBkgTimeFrom",
		BKG_TIME_TO : "rdIpbBkgTimeTo",
		DGR_CRS : "rdCbbDgrCsr"
	};
	
	// 리피트 detail ctrl : 컬럼 사이즈
	var moRdtails = {
		rdCbbRegFeeCatSa : 160,
		rdCbbRegFeeCatSp : 160,
		rdCbbRegFeeCatStud : 160,
		rdIpbShyrFrom : 80,
		rdIpbShyrTo : 70,
		rdIpbSmtFrom : 80,
		rdIpbSmtTo : 70,
		rdChkGrdtTgtYn : 100,
		rdChkReEntrYn : 100,
		rdIpbBkgPntFrom : 140,
		rdIpbBkgPntTo : 125,
		rdIpbBkgTimeFrom : 140,
		rdIpbBkgTimeTo : 125,
		rdCbbDgrCsr : 100
	};
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-15
	 */
	moPage.onLoad = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCrsCiiAmt");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		
		//리피트 동적컬럼 초기화
		doInitFldVisible();
		doOnLoad();
		
		util.Control.setFocus(app, "cbbCrsMenuItem");
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2016-02-15
	 */
	moPage.onClick_BtnSearch = function() {
		//작업영역 리피트 변경 내역 체크
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}	
		
		doList(function(pbSuccess){
			if(pbSuccess){
				util.Msg.notify(app, "NLS.INF.M024");
				
			}	
		});	
	};
	
	/**
	 * @desc 신규 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */		
	moPage.onClick_BtnNew = function() {
		doSetNewRow();
	};
	
	/**
	 * @desc 삭제 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */	
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdCrsCiiAmt");
		// 조건에 따라서 리피트 헤더명 변경
		page.doChangeColText();
	};
	
	/**
	 * @desc 작업취소 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */	
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCrsCiiAmt");
		// 조건에 따라서 리피트 헤더명 변경
		page.doChangeColText();
	};
	
	/**
	 * @desc 작업저장 click event
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */	
	moPage.onClick_BtnSave = function() {
		doSave();
		
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doOnLoad(){
		doOnLoadImpNS("CRS");
		// 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbCrsMenuItem"]);
				util.SelectCtl.selectItem(app, "cbbCrsMenuItem", 0);
			}
		}, true);
	};
	
	
	/**
	 * @desc  등록금기준금액을 조회한다
	 * @param {Function} poCallBackFunc 콜백정의
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doList(poCallBackFunc) {
		
		if(!util.validate(app, ["cbbYearImpNS", "cbbSmtImpNS", "cbbCrsMenuItem"])){
			return false;
		}
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", util.Control.getValue(app, "cbbSmtImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "YEAR", util.Control.getValue(app, "cbbYearImpNS"));
		util.DataMap.setValue(app, "dmReqKey", "SMT", util.Control.getValue(app, "cbbSmtImpNS"));
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				// 조건에 맞는 컬럼 showColumn 적용
				doChkVisibleFld();
				util.Control.redraw(app, "grdCrsCiiAmt");
				// 조건에 따라서 리피트 헤더명 변경
				doChangeColText();
				
				if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		}); 
	};
	
	/**
	 * @desc   조회시에 리피트 컬럼을 모두 안보이도록 설정
	 * @return  void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doInitFldVisible(){
		
		for (key in moFldNames){
			var vsRdColumn = moFldNames[key];
			util.Grid.hideColumn(app, "rptCrsCiiAmt",vsRdColumn);
		}
	};
	
	/**
	 * @desc   조건에 맞게 리피트의 showColumn 적용
	 * @return  void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doChkVisibleFld(){
		// 리피트 컬럼 초기화
		doInitFldVisible();
		
		var vaFldNm = new Array();
		var vaCondType = new Array();
		
		var vnNodeListSize = util.DataSet.getRowCount(app, "dsListCondFld");
		
		for ( var k = 1 ; k <= vnNodeListSize ; k++){
			var vsFldNm = util.DataSet.getValue(app, "dsListCondFld", "CD_PRP1", k);
			var vsCondType = util.DataSet.getValue(app, "dsListCondFld", "COND_TYPE_RCD", k);
			
			vaFldNm.push(vsFldNm);
			vaCondType.push(vsCondType);
		}
		
		doFldVisible(vaFldNm, vaCondType);
	};
	
	/**
	 * @desc   단일인지 멀티인지 조건에 맞게 보여질 컬럼 셋팅
	 * @return  void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doFldVisible(paFldNm, paCondType){
		
		maChangeCol = [];
		
		var doHideFld = function(psFldNm, pbChange){
			var vsRdColumn = moFldNames[psFldNm];
			var vnRdColumnSize = moRdtails[vsRdColumn];
			util.Grid.showColumn(app, "rptCrsCiiAmt", vsRdColumn , vnRdColumnSize);
			
			if(pbChange) maChangeCol.push(vsRdColumn);				
		}
		
		for(var m = 0, n = paFldNm.length; m < n; m++){
			
			var vsCondType = paCondType[m]; 
			var vsFldNm = paFldNm[m];
			
			for (key in moFldNames){	
				var msFldDtl = key;
				
				// 단일값
				if(vsCondType == "CR002SING"){
					if(msFldDtl == vsFldNm || msFldDtl == vsFldNm + "_FROM"){
						if(msFldDtl.indexOf("FROM") >= 0){
							doHideFld(msFldDtl, true);  
						}else doHideFld(msFldDtl);
					}
				// 범위값	
				}else if(vsCondType == "CR002RANG"){
					if(msFldDtl == vsFldNm || msFldDtl == vsFldNm + "_FROM" || msFldDtl == vsFldNm + "_TO"){
						doHideFld(msFldDtl);
					}
				}
			}
		}
	};
	
	/**
	 * @desc   조건에 따라서 리피트 헤더명 변경(FROM만 있는 경우 FROM 문구제거)
	 * @return  void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doChangeColText(){
		var vnSize = maChangeCol.length;
		var vsPreText, vsColId, vsHeaderColNm;
		
		for(var i = 0; i < vnSize; i++){
			vsColId = maChangeCol[i];
			vsHeaderColNm = "rhBtn" + vsColId.substring(5, vsColId.length);
			vsPreText = ExtControl.getTextValue(vsHeaderColNm);
			if(vsPreText){
				var vnCutIndex = vsPreText.indexOf("From");
				if(vnCutIndex <= 0) continue;
				vnCutIndex--; 
				ExtControl.setTextValue(vsHeaderColNm, vsPreText.substring(0, vnCutIndex));	
			}
		}
	};
	
	/**
	 * @desc  신규로우를 추가한다.
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doSetNewRow() {
		var vnMaxSerialNo = Number(moPage.doFindMaxSerialNoII()) + Number(1);
		var vsItemCd     = util.DataMap.getValue(app, "dmReqKey", "strItemCd");
		var vsSchYearRcd = util.DataMap.getValue(app, "dmReqKey", "strSchYearRcd");
		var vsSmtRcd     = util.DataMap.getValue(app, "dmReqKey", "strSmtRcd");
		
		//해당 리피트 insertRow 후 편집 시작할 컬럼 지정		
		var voNewRow = util.Grid.insertRow(app, "grdCrsCiiAmt", "rdIpbPri");	
		
		util.Grid.setCellValue(app, "grdCrsCiiAmt", "PRI"		 , 0			, voNewRow);
		util.Grid.setCellValue(app, "grdCrsCiiAmt", "SERIAL_NO"	 , vnMaxSerialNo, voNewRow);
		util.Grid.setCellValue(app, "grdCrsCiiAmt", "ITEM_CD"     , vsItemCd		, voNewRow);
		util.Grid.setCellValue(app, "grdCrsCiiAmt", "SCH_YEAR_RCD", vsSchYearRcd , voNewRow);
		util.Grid.setCellValue(app, "grdCrsCiiAmt", "SMT_RCD"     , vsSmtRcd		, voNewRow);
	};
	
	
	/**
	 * @desc  순번을 순차적으로 주기위해서 호출시점의 최대값을 구함
	 * @return vnMaxSerialNo 순번최대값
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doFindMaxSerialNoII(){
		var vnMaxSerialNo = 1;
		var vnSize = util.DataSet.getRowCount(app, "dsRptCrsCiiAmt");
		if(vnSize != 0) {
			var voInstRow = null;
      		var voMap = null;
			for(var i = 1; i <= vnSize; i++){
				var vnTemp = util.DataSet.getValue(app, "dsRptCrsCiiAmt", "SERIAL_NO", i);
				if(Number(vnTemp) > Number(vnMaxSerialNo)) vnMaxSerialNo = vnTemp;
			} 
		}else vnMaxSerialNo = 0;
		return vnMaxSerialNo;
	};
	
	/**
	 * @desc  등록금기준금액을 저장한다.
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doSave() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCrsCiiAmt"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "grdCrsCiiAmt")) return false;
		
		var vbSaved = false;
		
		if(doCheckSaveData()){
			//strCommand: save 
			util.Submit.send(app, "subSave", function(pbSuccess){
				if(pbSuccess){
					doList(function(pbListSuccess){
						if(pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
					});
				}
			});
		}
		
		return vbSaved;
	};
	
	/**
	 * @desc 저장하기 전에 체크사항 
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doCheckSaveData() {
		
		var vnRptCnt = util.Grid.getRowCount(app, "grdCrsCiiAmt");
		var vsMRowStatus;
		
		var vsDetailChilds = ExtRepeat.getRepChildIDList("rptCrsCiiAmt", "detail", "" , ",");
		var vaDetailColList = vsDetailChilds.split(",");
		var voMap = new Map();
			
		for(var k = 1, l = vnRptCnt; k <= l; k++){
			
			vsMRowStatus = util.Grid.getRowState(app, "grdCrsCiiAmt", k);
			if(vsMRowStatus == "delete") continue;
			
			//1. 기준값 중복체크 확인
			var vsTotValue = "";
			for(var i = 0, j = vaDetailColList.length; i < j; i++) {
				var vsColId = vaDetailColList[i];
				if(vsColId != "rdChkSelect" && vsColId != "rdOptUptStatus" && vsColId != "rdOptNo" && vsColId != "rdIpbAmt"){
					vsTotValue += (util.Grid.getCellValue(app, "grdCrsCiiAmt", vsColId, k) + ",");
				}	
			}
			
			if(k != 1 && voMap.get(vsTotValue) == "alreadY"){
				util.Msg.alert("NLS-CRS-M005");
				return false;
			}
			voMap.put(vsTotValue, "alreadY"); 
			
			//2. 화면에 보여지는 필드들이 모두 비었는지 확인
			if(vsMRowStatus == "insert" || vsMRowStatus == "update"){
				var vnCnt = 0;
				var vbPassed = false;	
				
				for (key in moFldNames){	
					
					var vnNodeListSize = util.DataSet.getRowCount(app, "dsListCondFld");
					for ( var m = 1 ; m <= vnNodeListSize ; m++){
						var vsFldNm = util.DataSet.getValue(app, "dsListCondFld", "CD_PRP1", m);
						
						if(key == vsFldNm){
							vnCnt++;
							var vsValue = util.Grid.getCellValue(app, "grdCrsCiiAmt", key, k);
							if(!ValueUtil.isNull(vsValue)){
								vbPassed = true;	
							}	
						}	
					}
				}
				
				if(vnCnt == 0) vbPassed = true;
				if(!vbPassed){
					util.Msg.alert("NLS-CRS-M053");
					return vbPassed;
				}	
			}
		}
		
		return true;
	};
	
	
	/**
	 * @desc   그리드의 값이 변경되었을때 각컬럼별 유효성 체크
	 * @param {String } psDiv 컬럼값
	 * @return void
	 * @author Aeyoung Lee 2016-02-15
	 */
	function doChkGrxValid(psDiv){
		
		var vnRowIdx = util.Grid.getIndex(app, "grdCrsCiiAmt");
		var vsChkValue = util.Grid.getCellValue(app, "grdCrsCiiAmt", psDiv, vnRowIdx);
		var vnFromIndex = psDiv.indexOf("FROM");
		var vnToIndex = psDiv.indexOf("TO");
		
		// 마이너스값 체크
		var doChkMinus = function(psValue){
			if(psValue < 0){
				util.Msg.alert("NLS-CRS-M014");
				util.Grid.setCellValue(app, "grdCrsCiiAmt", psDiv , "", vnRowIdx);
				return false;
			}
			return true;
		}
		
		// From값과 To값을 비교체크
		var modValue = function(psFromVal, psToVal){
			if(psFromVal > psToVal){
				util.Msg.alert("NLS-CRS-M001");
				util.Grid.setCellValue(app, "grdCrsCiiAmt", psDiv, "", vnRowIdx);
				return false;
			}
			return true;
		};
		
		// 우선순위, 금액
		if(psDiv == "PRI" || psDiv == "AMT"){
			if(!doChkMinus(vsChkValue)) return;
		}
		
		// From, To 가 속한 컬럼
		if(vnFromIndex >= 0 || vnToIndex >= 0){			
			if(!doChkMinus(vsChkValue)) return;
			var vsColCutId = null;
			
			//From이 들어있는 컬럼일경우	
			if(vnFromIndex >= 0){
				vsColCutId = psDiv.substring(0, vnFromIndex);
				var vsToId = vsColCutId + "TO";
				var vsToValue = util.Grid.getCellValue(app, "grdCrsCiiAmt", vsToId, vnRowIdx);
				// To값이 0이 아닌경우에만 체크..
				if(vsToValue != 0){
					if(!modValue(vsChkValue, vsToValue)) return;
				}	
			}else{
				// To가 들어있는 컬럼일경우
				vsColCutId = psDiv.substring(0, vnToIndex);
				var vsFromId = vsColCutId + "FROM";
				var vsFromValue = util.Grid.getCellValue(app, "grdCrsCiiAmt", vsFromId, vnRowIdx); 
				// From값이 0이 아닌경우에만 체크
				if(vsFromValue != 0){
					if(!modValue(vsFromValue, vsChkValue)) return;
				}	
			}
		}	
	};	
	
	return moPage;
};

