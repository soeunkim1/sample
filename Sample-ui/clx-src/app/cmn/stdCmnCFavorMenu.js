//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnCFavorMenu.xtm"/>


var stdCmnCFavorMenu = function() {
	var moPage = this;
	
	/**
	 * 사용자검색팝업 관련 설정사항 
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  [IN]
	 *   1. controlId        : 최초 이벤트의 버튼이나 리피트 id
	 *   2. iKeyDate    	: 기준일자(유효시작일과 종료일)
	 *   3. iUseYn       	: 사용여부
	 *   4. iUserId          : 사용자ID 
	 *   5. iUserNm        : 사용자명
	 *   6. iUserDivRcd   : 사용자구분 
	 *  [OUT]
	 *   7. oUserDivRcd  : 사용자구분코드
	 *   8. oUserId			: 사용자ID
	 *   9. oUserNm       : 사용자명
	 *  10. oStatCd        : 상태코드
	 *  11. oStatNm       : 상태명
	 *  12. oDeptCd       : 소속부서코드
	 *  13. oDeptNm      : 소속부서명
	 *  14. oId              : 오브젝트ID
	 *  15. oSsn            : 주민번호
	 *  16. oPartyId        : 외부인ID
	 *  17. func             : 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 */
	moPage.moIdsForStdCmnPUserSch = [
	{
		 controlId  	: "btnUserPop",
		 iKeyDate   	: "",        //기준일자(유효시작일과 종료일)
		 iUseYn   	: "", 	     //사용여부  
		 iUserId		: "ipbUserId", 	    //사용자ID 
		 iUserNm		: "",	//사용자명
		 iUserDivRcd	: "",   //사용자구분
		  
		 oUserDivRcd	: "",
		 oUserId		: "ipbUserId",
		 oUserNm		: "",
		 oStatCd		: "",
		 oStatNm 		: "",
		 oDeptCd		: "",
		 oDeptNm		: "",
		 oId			: "",
		 oSsn			: "",
		 oPartyId		: "",
		
		 func : function(poParam){
//			var vsUserId = ExtControl.getValue("ipbUserId");
//			if(!!vsUserId){
//				//조회 자동 실행
//				ExtModel.dispatch("btnSearch", "DOMActivate");
//			}
		 }
	 }];
	
	/******************************************************************************************************
		/**
		 * 메뉴검색팝업 관련 설정사항
		 * 각 변수별 설명
		 *  iXXX : 팝업으로 input 전달될 파라미터
		 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
		 *  [IN]
		 *   1. controlId          : 최초 이벤트의 버튼이나 컨트롤 id
		 *   2. iSystemRcd     : 단위시스템코드
		 *   3. iMenuId       	 : 메뉴 ID
		 *   4. iMenuNm         : 메뉴명
		 *  [OUT]
		 *   5. oSystemRcd    : 단위시스템코드
		 *   6. oMenuId          : 메뉴ID
		 *   7. oMenuNm        : 메뉴명
		 *   9. func                 : 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
		 * @member moIdsForStdCmnPMenuSch
		 * @type Array
		 * @author Kim Bora
		*******************************************************************************************************/	
	moPage.moIdsForStdCmnPMenuSch = [{
		controlId : "btnMenuNm",
		iSystemRcd : "", 	                    //단위시스템코드
		iMenuId : "ipbMenuNm", 		//메뉴ID
		iMenuNm : "", 		                    //메뉴명
		
		oSystemRcd : "",
		oMenuId : "/root/reqSchMenu/strMenuId",
		oMenuNm : "ipbMenuNm",
		func : function(){
			doMenuSearchAfter();
		}
	}];
	
	/**
	 * @desc 메뉴검색 팝업 콜백함수
	 * @return void
	 * @author Oh.hyun.teak 2015.12.02
	 */
	
	function doMenuSearchAfter(){
		var vsMenuId      = util.DataMap.getValue(app, "dmReqSchMenu", "strMenuId");
		
		if(vsMenuId !="")
		{
			//펼쳐진 트리 모두 감추기
			util.Tree.expandAllItems(app, "trvAuthMenu",false);
			
			//메뉴명 으로 검색
			ExtTreeView.findItemValue("trvAuthMenu", vsMenuId, "value",  true);
			
		}
		
	}
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	function doOnLoad() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCmnPsnMenu");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		//사용권한범위 설정
		var vsAuthRngRcd = moPageInfo.authRngRcd;
		util.DataMap.setValue(app, "dmRoot", "reqList", "client_AuthRngRcd", vsAuthRngRcd);
		
		
		if(vsAuthRngRcd == "CC00104"){
			
			//세션정보를 이용해 사용자ID값 세팅
			util.Control.setValue(app, "ipbUserId", moUserInfo.userId);
			util.DataMap.setValue(app, "dmRoot", "reqList", "strId", moUserInfo.id);
			
			//조회조건 고정 후 자동 조회
//TO-BE: <조회조건 그룹에 대한 활성화 처리> - 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//			ExtGroup.setGrpSchCtlEnable("grpSearch", false, ["grpData"]);
			
			doList(function(pbSuccess) {
				// 조회 : "조회되었습니다." header 메세지 표시
				if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
			});
		}
		
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
				util.Control.redraw(app, "grdCmnPsnMenu");
				ExtTreeView.rebuild(["trvAuthMenu"]);
				
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
		if(!util.Grid.isModified(app, "grdCmnPsnMenu", "MSG")){
			return false;
		}
		//리피트 validation check
		if(!util.validate(app, "grdCmnPsnMenu")) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				//메인페이지 즐겨찾기메뉴 재조회
				doFavorMenu();
				
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
		// 데이터 변경상태 체크 메시지 
		if(util.Grid.isModified(app, "", "CRM")){
			return false;
		}
		
		/*페이지방식 함수안에서는 필수값 체크 후 데이터 그룹의 제어가 제대로 되지 않아 xtm 파일내로 옮김*/
		if(!util.validate(app, "ipbUserId")){
			return false;
		}
		
		doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
					});
	};
	
	/**
	 * @desc 삭제 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onClick_BtnDel = function() {
		util.Grid.deleteRow(app, "grdCmnPsnMenu");
	};
	
	/**
	 * @desc 작업취소 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCmnPsnMenu");
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
	 * @desc 리비트 업데이트
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onUpdate_RptCmnPsnMenu = function() {
		ExtRepeat.updateRow("rptCmnPsnMenu");
	};
	
	/**
	 * @desc 모델 생성 완료 이벤트
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onModelConstructDone_StdCmnCFavorMenu = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 사용자검색팝업연결 - 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onClick_BtnUserPop = function(sender) {
		//사용자검색팝업
		doOnClickStdCmnPUserSch(sender);
		
	};
	
	/**
	 * @desc 사용자검색팝업연결
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.onValueChanged_IpbUserId = function(sender) {
		//사용자검색팝업
		doOnChangeStdCmnPUserSch(sender);
	};
	
	
	
	moPage.onClick_BtnInsert = function() {
		moPage.insertSelectedMenu();
	};
	
	var maRelatedIds = [];
	var maMissIds = [];
	//비교할 컬럼 목록
	var maCompareCols = ["MENU_ID", "MENU_NM", "PGM_ID"];
	var msTopMenuCode = "";
	var mnInsertRowCnt = 0;
	
	moPage.insertSelectedMenu = function(){
		
		//var vsMenuId = ExtTreeView.getSelectedValue("trvAuthMenu"); 
		var vsMenuId = ExtTreeView.getSelectedItems("trvAuthMenu", "VALUE");
		var vsUserId = util.DataMap.getValue(app, "dmRoot", "reqList", "strUserId");
		
		if(  ValueUtil.isNull(vsMenuId)
			&& ValueUtil.isNull(vsUserId) ){
			//이관할 데이터를 선택하세요. 
			util.Msg.alert("NLS-INF-M006");
			return;
		}
		
		var vaIds = null;
		if(String(vsMenuId).indexOf(",") != -1){
			vaIds = vsMenuId.split(",");
		}else{
			vaIds = new Array();
			vaIds[0] = vsMenuId;
		}
		
		
		
		maMissIds = [];
		mnInsertRowCnt = 0;
		
		for(var i = 0; i < vaIds.length; i++){
			//초기화
			msTopMenuCode = "";
			maRelatedIds = []; 
			
			var vsId = vaIds[i];
			
			//부모 자식키를 전역변수에 담는다.
			moPage.getParentIds(vsId, true);
			moPage.getChildIds(vsId);
			
			//전역변수에 담은 키값들로 메뉴목록을 찾아 리피트에 입력한다.
			moPage.validAndInsertData(maRelatedIds);
			
			
		}
		
		//기존에는 중복등으로 인해 미등록된 메뉴가 0건인 경우 "이관되었습니다." 표시로직이었으나
		//상위메뉴이거나 menuheader 인경우도 maMissIds에 추가되므로 
		//리피트에 입력한 경우가 1건 이상인 경우 표시하도록 수정
		//if(maMissIds.length == 0) Common.setMsgStatus(NLS.INF.M007); 
		if(mnInsertRowCnt > 0) util.Msg.notify(app, "NLS.INF.M007"); 
		
	};
	
	/**
	 * @desc 입력받은 키값의 부모메뉴의 키를 maRelatedIds 에 등록한다.
	 * @param
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.getParentIds = function(psMenuId, pbIsFirst){
		var vsParentMenuId = ExtInstance.getValue("/root/resList/trvAuthMenu/row", "UMENU_ID", "child::MENU_ID='" + psMenuId + "'");
		if(pbIsFirst != true){
				maRelatedIds.push(psMenuId);
		}
		
		//부모 존재시 계속진행, 최상위인경우 전역변수에 값입력
		if(!!vsParentMenuId){ 
			moPage.getParentIds(vsParentMenuId);
		} else {
			//부모가 없는 경우는 자신이 최상위 이므로 파라메터를 최상위코드로 친다.
			msTopMenuCode = psMenuId;
			
		}
	};
	
	/**
	 * @desc 입력받은 키값과, 자식메뉴의 키를 maRelatedIds 에 등록한다.
	 * @param
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.getChildIds = function(psMenuId){
		
		var vsMenuLvl = ExtInstance.getValue("/root/resList/trvAuthMenu/row", "MENU_LVL", "child::MENU_ID='" + psMenuId + "'");
		var vsMenuNm = ExtInstance.getValue("/root/resList/trvAuthMenu/row", "MENU_NM", "child::MENU_ID='" + psMenuId + "'");
		
		//상위폴더 (프로그램의 바로 위 폴더를 제외한) 선택시
		if(vsMenuLvl == "0" || vsMenuLvl == "1"){
			//선택된목록이 없습니다. 목록을 선택해주세요
			//ComMsg.warn("M145");
			
			//알림 메시지 수정 2015.12.07
			//중메뉴 이상의 메뉴는 선택할 수 없습니다.\n최하위 메뉴를 선택하여 주세요.
			ComMsg.warn("M220");
			
			maMissIds.push("["+vsMenuNm+"]");
			return false;
		}
		
		//입력받은 키를 배열에 등록
		maRelatedIds.push(psMenuId);
		
		//입력받은 키를 부모키로 가지는 메뉴 인스턴스를 가져옴
		var voChildList = ExtInstance.getNodeListObj("/root/resList/trvAuthMenu/row[child::UMENU_ID='" + psMenuId + "']");
		
		if(voChildList == null) return;
		
		var vnChildCnt = voChildList.length;
		for(var i = 0; i < vnChildCnt; i++){
			var voChildRow = ExtInstance.getNodeToObject(voChildList[i]);
			var vsChildMenuId = voChildRow.MENU_ID;
			
			//자식키 스스로가 자식키를 가지고 있을 경우 새로 검색
			//없을 경우 자식키만 maRelatedIds에 등록
			var vnChildChildCnt = ExtInstance.getNodeListLength(" /root/resList/trvAuthMenu/row[child::UMENU_ID='" + vsChildMenuId + "']");
			if(vnChildChildCnt == 0 || vnChildChildCnt == null) maRelatedIds.push(vsChildMenuId);
			else moPage.getChildIds(vsChildMenuId);
				
		}
		
	};
	
	/**
	 * @desc 입력받은 키값의 배열을 리피트에 존재하는지, 메뉴헤더 인지 체크 후, 없는 경우 등록한다.
	 * @param
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	moPage.validAndInsertData = function(paIds){
		if(paIds == null) return;
		
		for(var i = 0; i < paIds.length; i++){
			var voMenuRow = ExtInstance.getNodeListObj("/root/resList/trvAuthMenu/row[child::MENU_ID='" + paIds[i] + "']");
			
			if(voMenuRow == null) continue;
			
			var voRowObj = ExtInstance.getNodeToObject(voMenuRow[0]);
			var vsMenuNm = voRowObj.MENU_NM;
			var vsPgmId = voRowObj.PGM_ID; //메뉴헤더 체크를 위해 가져옴
			
			if(!moPage.isExistData(voMenuRow) && "MENUHEADER" != vsPgmId) moPage.insertToRepeat(voMenuRow);
			else maMissIds.push("["+vsMenuNm+"]");
		
		}
		
	};
	
	/**
	 * @desc 메뉴의 인스턴스 로우로 리피트에 이미 존재하는지 체크
	 * @param
	 * @return 
	 * @author 최경민 2015.11.16
	 */
	moPage.isExistData = function(poMenuRow){
		var vbResult = false;
		var vsCondition = "";
		
		//비교 조건문 생성
		for(var i = 0; i < maCompareCols.length; i++){
			if(i > 0) {
				vsCondition += " and ";
			}
			var vsConValue = ExtInstance.getNodeToObject(poMenuRow[0])[maCompareCols[i]];
			vsCondition +=maCompareCols[i] + "='" + vsConValue + "' ";
		}
		var vsMenuNm = ExtInstance.getNodeToObject(poMenuRow[0]).MENU_NM;
		
		
		//해당 인스턴스 존재여부 체크
		var vnExistDataCnt = ExtInstance.getNodeListLength("/root/resList/rptCmnPsnMenu/row[child::" + vsCondition + "]");
		if(vnExistDataCnt > 0){
			// vsMenuNm 은 등록된 즐겨찾기 메뉴입니다.
			ComMsg.warn("M211", [vsMenuNm]);
			vbResult = true;
		}
		
		return vbResult;
	};
	
	/**
	 * @desc 메뉴의 인스턴스 로우를 리피트에 등록
	 * @param
	 * @return 
	 * @author 최경민 2015.11.16
	 */
	moPage.insertToRepeat = function(poMenuRow){
		//신규 행 생성
		var vnInsIdx = util.Grid.insertRow(app, "grdCmnPsnMenu");
		
		//선택한 메뉴의 각 컬럼값을 신규행에 입력
		for(var i = 0; i < maCompareCols.length; i++){
			var vsCompareValue = ExtInstance.getNodeToObject(poMenuRow[0])[maCompareCols[i]];
			util.Grid.setCellValue(app, "grdCmnPsnMenu", maCompareCols[i], vsCompareValue, vnInsIdx);
		}
		
		
		var vsUserId = util.DataMap.getValue(app, "dmReqList", "strUserId");
		var vsLanDivRcd = msDefaultLocale; //언어키 - 헤더의 기본설정언어
		
		
		util.Grid.setCellValue(app, "grdCmnPsnMenu", "USER_ID", vsUserId, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnPsnMenu", "LAN_DIV_RCD", vsLanDivRcd, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnPsnMenu", "TOP_MENU_CODE", msTopMenuCode, vnInsIdx);
		
		//신규입력시 로우카운트에 맞춰서 자동으로 출력순서를 입력한다.
		//2015.12.08 추가
		var vnRptCnt = util.Grid.getRowCount(app, "grdCmnPsnMenu");
		util.Grid.setCellValue(app, "grdCmnPsnMenu", "PRT_ORD", vnRptCnt, vnInsIdx);
		
		//입력건수 +1
		mnInsertRowCnt++;
	};
	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc 좌측 메뉴에 위치한 즐겨찾기목록 재조회
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.24
	 */
	function doFavorMenu(){
		var voMainWindow = Common.findMainWindow();
		var offset=voMainWindow.location.href.indexOf(voMainWindow.location.host)+voMainWindow.location.host.length;
    	var ctxPath=voMainWindow.location.href.substring(offset,voMainWindow.location.href.indexOf('/',offset+1));
		voMainWindow.doFavorList(ctxPath);
	};
	
	
	
	moPage.onValueChanged_IpbPgmId = function(sender) {
		doOnChangeStdCmnPMenuSch(sender);
	};
	
	
	moPage.onClick_BtnPgmNm = function(sender) {
		doOnClickStdCmnPMenuSch(sender);
	};
	
	
	return moPage;
	

};
