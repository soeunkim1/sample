//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnCIPAccessFilter.xtm"/>


var stdCmnCIPAccessFilter = function() {
	var moPage = this;
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	function doOnLoad() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCmnIpFilter");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, ["cbbUserDivRcd"]);
				
			}
		}, true);
	};
	
	/**
	 * @desc 조회 실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnIpFilter");
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};

	/**
	 * @desc 저장 실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	function doSave() {

		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, "grdCmnIpFilter", "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCmnIpFilter")) return false;

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
	 * @desc 조회 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onClick_BtnSearch = function() {
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 모델생성완료 이벤트
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onModelConstructDone_StdCmnCIPAccessFilter = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 신규 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onClick_BtnNew = function() {
		var vnInsIdx = util.Grid.insertRow(app, "grdCmnIpFilter", "rdCbbUserDivRcd");
		
		//초기값 설정
		var vsUserDivRcd = util.DataMap.getValue(app, "dmReqList", "strUserDivRcd");
		util.Grid.setCellValue(app, "grdCmnIpFilter", "USER_DIV_RCD", vsUserDivRcd, vnInsIdx);
	};
	
	/**
	 * @desc 삭제 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdCmnIpFilter");
	};
	
	/**
	 * @desc 작업취소 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCmnIpFilter");
	};
	
	/**
	 * @desc 저장 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc 리피트 업데이트 이벤트
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onUpdate_RptCmnIpFilter = function() {
		ExtRepeat.updateRow("rptCmnIpFilter");
	};
	
	
	
	
	moPage.onRowSelect_RptCmnIpFilter = function() {
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind("bndArrowFrom");
	};
	
	
	moPage.onValueChanged_RdIpbPermitIpFinal = function() {
		var vsIpFinal = util.Grid.getCellValue(app, "grdCmnIpFilter","PERMIT_IP_FINAL");
		
		if(vsIpFinal.indexOf("*") != -1){
			util.Grid.setCellValue(app, "grdCmnIpFilter", "PERMIT_IP_FINAL", "");
			return false;
		}
	};
	
	
	moPage.onValueChanged_RdIpbPermitIpSt = function() {
		var vsIpSt = util.Grid.getCellValue(app, "grdCmnIpFilter","PERMIT_IP_ST");
		
		if(vsIpSt.indexOf("*") != -1){
			util.Grid.setCellValue(app, "grdCmnIpFilter", "PERMIT_IP_FINAL", "");
			return false;
		}
	};
	return moPage;
};
