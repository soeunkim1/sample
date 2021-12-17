//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnCUserAuthEtrst.xtm"/>


var stdCmnCUserAuthEtrst = function() {
	
	var moPage = this;
	
	var maRelatedIds = [];
	var maMissIds = [];
	//비교할 컬럼 목록
	var maCompareCols = ["MENU_ID", "MENU_NM", "PGM_ID"];
	var msEtrstUserIdBefSave = "";
	
	
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
		 controlId  	: "btnUserPopUp",
		 iKeyDate   	: "/root/resOnLoad/strCutDt",        //기준일자(유효시작일과 종료일)
		 iUseYn   	: "", 	     //사용여부  
		 iUserId		: "ipbUserId", 	    //사용자ID 
		 iUserNm		: "",	//사용자명
		 iUserDivRcd	: "",   //사용자구분
		  
		 oUserDivRcd	: "",
		 oUserId		: "ipbUserId",
		 oUserNm		: "optUserNm",
		 oStatCd		: "",
		 oStatNm 		: "",
		 oDeptCd		: "",
		 oDeptNm		: "",
		 oId			: "",
		 oSsn			: "",
		 oPartyId		: "",
		
		 func : function(poParam){
			var vsUserId = util.Control.getValue(app, "ipbUserId");
			if(!!vsUserId){
				//조회 자동 실행
				util.Header.clickSearch(app);
			}
		 }
	 }
	 ,{
		 controlId  	: "rdBtnUserPopUp",
		 iKeyDate   	: "/root/resOnLoad/strCutDt",         //기준일자(유효시작일과 종료일)
		 iUseYn   	: "Y", 	     //사용여부  
		 iUserId		: "rdIpbEtrstUserNm", 	    //사용자ID 
		 iUserNm		: "",	//사용자명
		 iUserDivRcd	: "rdCbbUserDivRcd",   //사용자구분
		  
		 oUserDivRcd	: "rdCbbUserDivRcd",
		 oUserId		: "rdIpbEtrstUserId",
		 oUserNm		: "rdIpbEtrstUserNm",
		 oStatCd		: "rdOptStatCd",
		 oStatNm 		: "rdOptStatNm",
		 oDeptCd		: "",
		 oDeptNm		: "rdOptOgNm",
		 oId			: "",
		 oSsn			: "",
		 oPartyId		: "",
		
		 func : function(poParam){
			var vsEtrstUserId = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_ID");
			var vsEtrstUserNm = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_NM");
			
			if( !!vsEtrstUserId && !!vsEtrstUserNm){
				moPage.validStatCheck();
			}
		}
	}
	];
	
	/**
	 * @desc 사용자검색팝업 실행후 사용자구분별 상태체크 - 체크로직이 주석처리 되어 기능 동작 안함.
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.27
	 */
	moPage.validStatCheck = function(){
		var vnIdx = util.Grid.getIndex(app, "grdCmnUserAuthEtrst");
		var vsUserDivRcd = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "USER_DIV_RCD", vnIdx);
		var vsStatRcd = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "STAT_RCD", vnIdx);
		var vsEtrstUserNm = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_NM", vnIdx);
		var vsEtrstUserId = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_ID", vnIdx);
		
		/* 기존에 이미 주석처리 되어진 로직
		switch(vsUserDivRcd){
			//학생
			case "CC00501" :
				if(vsStatRcd != "CT301ATTE"){
					//학적상태가 재학인 학생만 가능합니다.
					util.Msg.alert("NLS-CMN-EXT002");
					moPage.setRptAuthExcUserMstbyStatCheck(voRow);
					return false;
				}
			break;
			//교직원	 
			case "CC00502" :	
				if(vsStatRcd == "CF00504"){
					//재직상태가 퇴직인 교직원은 권한위임관리 대상자가 아닙니다.
					util.Msg.alert("NLS-CMN-EXT001");
					moPage.setRptAuthExcUserMstbyStatCheck(voRow);
					return false;
				} 
			break;
			//외부인
			case "CC00509" :	 
			break;
			//대학원생
			case "CC00511" :	
				if(vsStatRcd != "GSR00401"){
					//학적상태가 재학인 학생만 가능합니다.
					util.Msg.alert("NLS-CMN-EXT002");
					moPage.setRptAuthExcUserMstbyStatCheck(voRow);
					return false;
				}
			break;
		}
		*/
		return true;
	};
	
	/**
	 * @desc 사용자검색팝업 실행후 사용자구분별 상태체크후 권한위임대상자 그리드 컬럼 초기화
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.27
	 */
	moPage.setRptAuthExcUserMstbyStatCheck = function(pnIdx){
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_NM", "", pnIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_ID", "", pnIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "USER_DIV_RCD", "", pnIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "STAT_RCD", "", pnIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "STAT_NM", "", pnIdx);
		
	};
	
	/**
	 * @desc 온로드 서브미션 실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.05
	 */
	function doOnLoad() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCmnUserAuthEtrst", "rptCmnUserAuthEtrstPgm"]);
		
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				//Common.addParamCheckUserAuth("subList", page.moPageInfo.authRngRcd);
				
				if(moPageInfo.authRngRcd == "CC00104"){
					util.Control.setEnable(app, false, ["ipbUserId", "btnUserPopUp"]);
					
					util.Control.setValue(app, "ipbUserId", moUserInfo.userId);
					
					util.Control.setValue(app, "optUserNm", moUserInfo.userNm);
					util.DataMap.setValue(app, "dmRoot", "reqList", "strAuthRngRcd", moPageInfo.authRngRcd);
					
					//바로 조회
					doList(function(pbSuccess) {
						// 조회 : "조회되었습니다." header 메세지 표시
						if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
						
						util.Control.setEnable(app, true, ["grpData"]);
					});
				}
								
			}
		}, true);
	};
	
	/**
	 * @desc 신규 버큰 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onClick_BtnInsert = function() {
		moPage.insertSelectedMenu();
	};
	
	/**
	 * @desc 선택한 메뉴를 권한위임 프로그램에 등록
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.insertSelectedMenu = function(){
		//var vsMenuId = ExtTreeView.getSelectedValue("trvCmnMenu");
		var vsMenuId = ExtTreeView.getSelectedItems("trvCmnMenu", "VALUE");
		var vnAuthUserIdx = util.Grid.getIndex(app, "grdCmnUserAuthEtrst");
		
		if(   ValueUtil.isNull(vsMenuId)
			||ValueUtil.isNull(vnAuthUserIdx) ){
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
		for(var i = 0; i < vaIds.length; i++){
			maRelatedIds = []; //초기화
			
			var vsId = vaIds[i];
			
			//부모 자식키를 전역변수에 담는다.
			moPage.getParentIds(vsId, true);
			moPage.getChildIds(vsId);
			
			//전역변수에 담은 키값들로 메뉴목록을 찾아 리피트에 입력한다.
			moPage.validAndInsertData(maRelatedIds);
			
			//처리된 메뉴가 0건 이상인 경우 이관되었습니다. 표시
			if(maRelatedIds.length > 0) util.Msg.notify(app, "NLS.INF.M007"); 
		}
		
	};
	
	/**
	 * @desc 입력받은 키값의 부모메뉴의 키를 maRelatedIds 에 등록한다.
	 * @param
	 * @return 
	 * @author 최경민 2015.11.16
	 */
	moPage.getParentIds = function(psMenuId, pbIsFirst){
		var vsParentMenuId = ExtInstance.getValue("/root/resList/trvCmnMenu/row", "UMENU_ID", "child::MENU_ID='" + psMenuId + "'");
		if(pbIsFirst != true){
				maRelatedIds.push(psMenuId);
		}
		if(!!vsParentMenuId) moPage.getParentIds(vsParentMenuId);
	};
	
	/**
	 * @desc 입력받은 키값과, 자식메뉴의 키를 maRelatedIds 에 등록한다.
	 * @param
	 * @return 
	 * @author 최경민 2015.11.16
	 */
	moPage.getChildIds = function(psMenuId){
		
		maRelatedIds.push(psMenuId);
		
		//입력받은 키를 부모키로 가지는 메뉴 인스턴스를 가져옴
		var voChildList = ExtInstance.getNodeListObj("/root/resList/trvCmnMenu/row[child::UMENU_ID='" + psMenuId + "']");
		
		if(voChildList == null) return;
		
		
		var vnChildCnt = voChildList.length;
		for(var i = 0; i < vnChildCnt; i++){
			var voChildRow = ExtInstance.getNodeToObject(voChildList[i]);
			var vsChildMenuId = voChildRow.MENU_ID;
			
			//자식키 스스로가 자식키를 가지고 있을 경우 새로 검색
			//없을 경우 자식키만 maRelatedIds에 등록
			var vnChildChildCnt = ExtInstance.getNodeListLength(" /root/resList/trvCmnMenu/row[child::UMENU_ID='" + vsChildMenuId + "']");
			if(vnChildChildCnt == 0 || vnChildChildCnt == null) maRelatedIds.push(vsChildMenuId);
			else moPage.getChildIds(vsChildMenuId);
				
		}
		
	};
	
	/**
	 * @desc 입력받은 키값의 배열을 리피트에 존재하는지 체크 후, 없는 경우 등록한다.
	 * @param
	 * @return 
	 * @author 최경민 2015.11.16
	 */
	moPage.validAndInsertData = function(paIds){
		if(paIds == null) return;
		
		for(var i = 0; i < paIds.length; i++){
			var voMenuRow = ExtInstance.getNodeListObj("/root/resList/trvCmnMenu/row[child::MENU_ID='" + paIds[i] + "']");
			var vsMenuNm = ExtInstance.getNodeToObject(voMenuRow[0]).MENU_NM;
			
			if(voMenuRow == null) continue;
			
			if(!moPage.isExistData(voMenuRow)) moPage.insertToRepeat(voMenuRow);
			else maMissIds.push("["+vsMenuNm+"]");
		
		}
		
	};
	
	
	
	/**
	 * @desc 메뉴의 인스턴스 로우를 리피트에 등록
	 * @param
	 * @return 
	 * @author 최경민 2015.11.16
	 */
	moPage.insertToRepeat = function(poMenuRow){
		//신규 행 생성
		var vnInsIdx = util.Grid.insertRow(app, "grdCmnUserAuthEtrstPgm");
		
		//선택한 메뉴의 각 컬럼값을 신규행에 입력
		for(var i = 0; i < maCompareCols.length; i++){
			var vsCompareValue = ExtInstance.getNodeToObject(poMenuRow[0])[maCompareCols[i]];
			util.Grid.setCellValue(app, "grdCmnUserAuthEtrstPgm", maCompareCols[i], vsCompareValue, vnInsIdx);
		}
		
		//디테일 조회 키값으로 값입력
		var vsUserId = util.DataMap.getValue(app, "dmReqAuthPgmList", "strUserId");
		var vsEtrstUserId = util.DataMap.getValue(app, "dmReqAuthPgmList", "strEtrstUserId");
		var vsEtrstUserNm = util.DataMap.getValue(app, "dmReqAuthPgmList", "strEtrstUserNm");
		
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrstPgm", "USER_ID", vsUserId, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrstPgm", "ETRST_USER_ID", vsEtrstUserId, vnInsIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrstPgm", "ETRST_USER_NM", vsEtrstUserNm, vnInsIdx);
		
		msEtrstUserIdBefSave = vsEtrstUserId;
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
		
		//해당 인스턴스 존재여부 체크
		var vnExistDataCnt = ExtInstance.getNodeListLength("/root/resList/rptCmnUserAuthEtrstPgm/row[child::" + vsCondition + "]");
		if(vnExistDataCnt > 0){
			vbResult = true;
		}
		
		return vbResult;
	};
	
	/**
	 * @desc 조회 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onClick_BtnSearch = function() {
		/*페이지방식 함수안에서는 필수값 체크 후 데이터 그룹의 제어가 제대로 되지 않아 xtm 파일내로 옮김
		if(!util.validate(app, "grpSearch")){
			return false;
		}
		*/
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	/**
	 * @desc 조회 서브미션 실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.05
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnUserAuthEtrst");
				ExtTreeView.rebuild("trvCmnMenu");
				
				var vnRoleCnt = util.Grid.getRowCount(app, "grdCmnUserAuthEtrst");
				if(vnRoleCnt > 0) {
					util.Control.setEnable(app, true, maDtlCtrls);
				} else {
					util.Control.setEnable(app, false, maDtlCtrls);
				}
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	};
	
	var maDtlCtrls = ["btnDelPgm", "btnRestorePgm", "rptCmnUserAuthEtrstPgm", "btnInsert"];
	
	/**
	 * @desc 마스터 리피트 상태에 따른 디테일 컨트롤 제어
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	function doMasterRptChangeCtlStatus(){
		if(util.Grid.isModified(app, "grdCmnUserAuthEtrst") ){
			util.Control.setEnable(app, false, ["btnDelPgm", "btnRestorePgm", "rptCmnUserAuthEtrstPgm", "btnInsert"]);
		}else {
			util.Control.setEnable(app, true, ["btnDelPgm", "btnRestorePgm", "rptCmnUserAuthEtrstPgm", "btnInsert"]);
		}
		
		
	};
	
	/**
	 * @desc 저장 실행
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	function doSave() {

		// 리피터 변경사항 체크
		if( !util.Grid.isModified(app, "grdCmnUserAuthEtrst") && !util.Grid.isModified(app, "grdCmnUserAuthEtrstPgm") ){
			
			util.Msg.notify(app, "NLS.WRN.M007");	
			return false;
		}
		
		msEtrstUserIdBefSave = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_ID");
		
		//리피트 validation check
		if(!util.validate(app, ["grdCmnUserAuthEtrst", "grdCmnUserAuthEtrstPgm"])) return false;

		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess){
			if(pbSuccess){
				
				if(util.Grid.isModified(app, "grdCmnUserAuthEtrstPgm")){
					doListAuthPgm(function(pbListSuccess) {
						// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
						if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
					});
				}else {
					doList(function(pbListSuccess) {
						// 조회 : "갱신된 데이터가 조회되었습니다." header 메세지 표시
						if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
						
						//디테일 로우가 바뀌었을 시 이전로우를 찾아가도록한다.
						
						if(!!msEtrstUserIdBefSave){
							//이전로우 찾아가기
							ExtRepeat.selectRowByValues("rptCmnUserAuthEtrst", "ETRST_USER_ID:"+msEtrstUserIdBefSave);
							
						}
					});
				}
				
			}
		});
	};
	
	/**
	 * @desc 권한대상자 목록 리피트 업데이트
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onUpdate_RptCmnUserAuthEtrst = function() {
		ExtRepeat.updateRow("rptCmnUserAuthEtrst");
		
		doMasterRptChangeCtlStatus();
	};
	
	/**
	 * @desc 권한대상자 목록 삭제 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onClick_BtnDel = function() {
		var vsTgtIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUserAuthEtrst");
		if(  ValueUtil.isNull(vsTgtIdx) ){
			//"선택된데이터가없습니다"
			ComMsg.warn("M008");
			return false;
		}
		
		var vaIdxs = null;
		if(String(vsTgtIdx).indexOf(",") != -1){
			vaIdxs = vsTgtIdx.split(",");
		}else{
			vaIdxs = new Array();
			vaIdxs[0] = vsTgtIdx;
		}
		
		var vsRptUserNm = ExtRepeat.getLableIdValue("rptCmnUserAuthEtrst");
		var vsRptPgmNm = ExtRepeat.getLableIdValue("rptCmnUserAuthEtrstPgm");
		
		
		for(var i = 0; i < vaIdxs.length; i++){
			var vnPgmCnt = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "PGM_CNT", vaIdxs[i]);
			
			if( !ValueUtil.isNull(vnPgmCnt) && vnPgmCnt > 0){
				//@ @번째 항목에 대한 @의 데이터가 존재합니다. \n@의 데이터 삭제 후 삭제 가능합니다.
				ComMsg.warn("M214", [vsRptUserNm, String(vaIdxs[i]), vsRptPgmNm, vsRptPgmNm]);
				util.Grid.selectRow(app, "grdCmnUserAuthEtrst", vaIdxs[i], true);
				
				return false;
			}
			
		}
		
		
		util.Grid.deleteRow(app, "grdCmnUserAuthEtrst");
	};
	
	/**
	 * @desc 권한대상자 목록 작업취소 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onClick_BtnRestore = function() {
		util.Grid.restoreRow(app, "grdCmnUserAuthEtrst");
		doMasterRptChangeCtlStatus();
	};
	
	/**
	 * @desc 권한대상자 저장 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onClick_BtnSave = function() {
		doSave();
	};
	
	/**
	 * @desc 권한위임메뉴목록 삭제 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onClick_BtnDelPgm = function() {
		var vsTgtIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCmnUserAuthEtrstPgm");
		if(  ValueUtil.isNull(vsTgtIdx) ){
			//"선택된데이터가없습니다"
			ComMsg.warn("M008");
			return false;
		}
		
		var vaIdxs = null;
		if(String(vsTgtIdx).indexOf(",") != -1){
			vaIdxs = vsTgtIdx.split(",");
		}else{
			vaIdxs = new Array();
			vaIdxs[0] = vsTgtIdx;
		}
		
		var vsRptUserNm = ExtRepeat.getLableIdValue("rptCmnUserAuthEtrst");
		var vsRptPgmNm = ExtRepeat.getLableIdValue("rptCmnUserAuthEtrstPgm");
		
		for(var i = 0; i < vaIdxs.length; i++){
			//권한위임메뉴 목록에서 선택된 로우의 메뉴아이디를 담는다.
			var vsMenuId = util.Grid.getCellValue(app, "grdCmnUserAuthEtrstPgm", "MENU_ID", vaIdxs[i]);
			
			//신규데이터는 체크하지 않는다 2015.12.07 추가
			var vsRowStatus = util.Grid.getRowState(app, "grdCmnUserAuthEtrstPgm", vaIdxs[i]);
			if(vsRowStatus == "insert") continue;
			
			//해당 메뉴의 자식메뉴가 존재하는지는 메뉴목록 트리뷰에서 확인.
			var voChildList = ExtInstance.getNodeListObj("/root/resList/trvCmnMenu/row[child::UMENU_ID='" + vsMenuId + "']");
			
			//자식메뉴가 없으면 다음 선택 로우로 이동
			if(voChildList == null) continue;
			
			//자식메뉴별로 확인
			var vnChildCnt = voChildList.length;
			for(var j = 0; j < vnChildCnt; j++){
				//자식메뉴 ID 
				var voChildRow = ExtInstance.getNodeToObject(voChildList[j]);
				var vsChildMenuId = voChildRow.MENU_ID;
				
				//해당 메뉴 ID가 권한위임메뉴목록에 존재하는지 체크
				var vnExistChildCnt = ExtInstance.getNodeListLength(" /root/resList/rptCmnUserAuthEtrstPgm/row[child::MENU_ID='" + vsChildMenuId + "']");
				if( !ValueUtil.isNull(vnExistChildCnt) && vnExistChildCnt > 0){
					//삭제하려는 @번째 메뉴에 대한 하위메뉴가 등록되어 있습니다. \n하위메뉴를 먼저 삭제 후 진행해주세요.
					util.Msg.alert("NLS-CMM-M035", [String(vaIdxs[i])]);
					util.Grid.selectRow(app, "grdCmnUserAuthEtrstPgm", vaIdxs[i], true);
					return false;
				}
			}	
			
		}
		
		
		util.Grid.deleteRow(app, "grdCmnUserAuthEtrstPgm");
	};
	
	/**
	 * @desc 권한위임메뉴목록 작업취소 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onClick_BtnRestorePgm = function() {
		util.Grid.restoreRow(app, "grdCmnUserAuthEtrstPgm");
	};
	
	moPage.onClick_BtnUserPopUp = function(sender) {
		doOnClickStdCmnPUserSch(sender);
		
	};
	

	
	moPage.onClick_RdBtnUserPopUp = function(sender) {
		doOnClickStdCmnPUserSch(sender);
	};
	
	
	moPage.onValueChanged_RhCkbSelectPgm = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelectPgm");
	};
	
	
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};
	
	/**
	 * @desc 모델 생성 완료시
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onModelConstructDone_StdCmnCUserAuthEtrst = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 신규입력을 위한 기본값 입력
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.setKeyValueForInsert = function(pnInsIdx){
		//조회조건의 값
		var vsUserId = util.DataMap.getValue(app, "dmReqList", "strUserId");
		var vsCutDt = util.DataMap.getValue(app, "dmReqList", "strCutDt");
		
		if(String(vsCutDt).length > 8) vsCutDt = vsCutDt.substring(0, 8);
		
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "USER_ID", vsUserId, pnInsIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "EFFT_ST_DT", vsCutDt, pnInsIdx);
		
	};
	
	/**
	 * @desc 권한대상자 신규 버튼 클릭
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onClick_BtnNew = function() {
		var vnTrvCmnMenuCnt = util.DataSet.getRowCount(app, "dsTrvCmnMenu");
		if(vnTrvCmnMenuCnt == 0){
			// 위임할수 있는 프로그램이 없습니다.
			util.Msg.alert("NLS-WRN-M147");
			return false;
		}
		
		var vnInsIdx = util.Grid.insertRow(app, "grdCmnUserAuthEtrst", "rdIpbEtrstUserNm");
		moPage.setKeyValueForInsert(vnInsIdx);
	};
	
	/**
	 * @desc 권한위임대상자 로우 셀렉트
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onRowSelect_RptCmnUserAuthEtrst = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCmnUserAuthEtrst");
		var vsUptStatus = util.Grid.getRowState(app, "grdCmnUserAuthEtrst", vnIdx);
		
		//바인드 리프레쉬
//TO-BE: <ExtControl.refreshBind> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtControl.refreshBind(["bndAuthUser"]);
		
		moPage.copyDateBeforeChange();
		
		if(vsUptStatus != "insert" && moPage.isChangeUptStatus("rptCmnUserAuthEtrstPgm")){
			//이전 로우로 되돌린다.
			util.Grid.selectRow(app, "grdCmnUserAuthEtrst", mnRptUserIdx, false);
			
		} else {
			//데이터 변경 내역이 없으면 선택한 로우의 권한위임메뉴목록 조회
			doListAuthPgm();
			
			
		}
		
		//moPage.doListAuthPgm();
	};
	
	var mnRptUserIdx = 0; //인덱스 저장
			
	/**
	 * @desc 권한 대상자 목록에서 로우 변경시 데이터셋 변경 상태를 체크하여 진행방향 결정
	 *            전환 전 기존 프로그램의 경우 자동 저장을 하였지만 변경 데이터 체크 프로세스가 바뀌었으므로 저장은 수행하지 않는다.
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.09
	 */
	moPage.isChangeUptStatus = function(psRptId){
	
		var vbIsChanged = false;
		
		if(util.Grid.isModified(app, psRptId) ){
			
			//@1에 변경된 데이터가 있습니다. 계속 진행하시겠습니까?
			//1 : true, 2 : false
			if(util.Msg.confirm("NLS-CRM-M056", [ExtRepeat.getLableIdValue(psRptId)]) ==  1){
				//계속 진행 시 변경 데이터 무시하고 새로 선택한 프로그램으로 조회
				vbIsChanged =  false;
				
			}else{
				//진행이 아닐 시 이전 로우로 돌아간다.
				vbIsChanged = true;
				
			}
			
		} 
		return vbIsChanged;
	
	};
	
	/**
	 * @desc 권한위임메뉴목록 조회
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	function doListAuthPgm(poCallBackFunc){
		
		//권한위임대상자 목록에서 조회 키값 설정
		var vnIdx = util.Grid.getIndex(app, "grdCmnUserAuthEtrst");
		if(ValueUtil.isNull(vnIdx)) return false;
		
		var vsUserId = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "USER_ID", vnIdx);
		var vsEtrstUserId = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_ID", vnIdx);
		var vsEtrstUserNm = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_NM", vnIdx);
		
		util.DataMap.setValue(app, "dmRoot", "reqAuthPgmList", "strUserId", vsUserId);
		util.DataMap.setValue(app, "dmRoot", "reqAuthPgmList", "strEtrstUserId", vsEtrstUserId);
		util.DataMap.setValue(app, "dmRoot", "reqAuthPgmList", "strEtrstUserNm", vsEtrstUserNm);
		
		mnRptUserIdx = vnIdx;
		
		//strCommand: listAuthPgm 
		util.Submit.send(app, "subListAuthPgm", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnUserAuthEtrstPgm");
				
				msEtrstUserIdBefSave = "";
				
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
		
		doMasterRptChangeCtlStatus();
	};
	
	/**
	 * @desc 사용자구분 변경시 사용자 데이터 빈값으로 변경
	 * @param 
	 * @return 
	 * @author 최경민 2015.11.20
	 */
	moPage.onValueChanged_RdCbbUserDivRcd = function() {
		var vnIdx = util.Grid.getIndex(app, "grdCmnUserAuthEtrst");
		
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_NM", "", vnIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "ETRST_USER_ID", "", vnIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "STAT_CD", "", vnIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "STAT_NM", "", vnIdx);
		util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "OG_NM", "", vnIdx);
		
		
	};
	
	moPage.onValueChanged_RdIpbEtrstUserNm = function(sender) {
		doOnChangeStdCmnPUserSch(sender);
	};
	
	
	moPage.onKeyDown_IpbUserId = function(strKeyType, strKeyStatus, sender) {
		/*
		if(strKeyType == 13) { 
			doOnChangeStdCmnPUserSch(sender);
		}
		*/
	};
	
	
	moPage.onKeyDown_RdIpbEtrstUserNm = function(strKeyType, strKeyStatus, sender) {
		/*
		if(strKeyType == 13) { 
			doOnChangeStdCmnPUserSch(sender);
		}
		*/
	};
	
	
	moPage.onValueChanged_IpbUserId = function(sender) {
		doOnChangeStdCmnPUserSch(sender);
		
	};
	
	
	//날짜 체크에서 실패 시 이전값으로 돌리기위해 바꾸기 전 저장해 놓는 변수
	var msOrgStDt = "";
	var msOrgEndDt = "";
	
	/**
	 * @desc 날짜 체크에서 실패 시 이전값으로 돌리기위해 날짜, 시간을 변수에 복사한다.
	 * @param  
	 * @return 
	 * @author 최경민 2015.11.30
	 */
	moPage.copyDateBeforeChange = function(){
		var vnIdx = util.Grid.getIndex(app, "grdCmnUserAuthEtrst");
		
		msOrgStDt = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "EFFT_ST_DT", vnIdx);
		msOrgEndDt = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "EFFT_END_DT", vnIdx);
	}
	
	/**
	 * @desc 시작일자, 종료일자, 시작시간, 종료시간 입력시 비교체크로직을 수행한다.
	 * @param psColNm 
	 * @return 
	 * @author 최경민 2015.11.30
	 */
	moPage.checkCalendarTime = function(psColNm){
		
		var vsStDt = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "EFFT_ST_DT");
		var vsEndDt = util.Grid.getCellValue(app, "grdCmnUserAuthEtrst", "EFFT_END_DT");
		
		if(psColNm == "EFFT_ST_DT"){ //시작일자인 경우
			
			if(vsEndDt != "" && !ValidUtil.checkValue(vsStDt, "compare(rdDipEfftEndDt, <=)")){
				util.Msg.alert("NLS-WRN-M129");
				util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "EFFT_ST_DT", msOrgStDt);
				
			}else {
				msOrgStDt = vsStDt;
			
			}	
		} else if(psColNm == "EFFT_END_DT"){// 종료일자인 경우
		
			if(vsStDt != "" &&!ValidUtil.checkValue(vsEndDt, "compare(rdDipEfftStDt, >=)")){
				util.Msg.alert("NLS-CSS-M064");
				util.Grid.setCellValue(app, "grdCmnUserAuthEtrst", "EFFT_END_DT", msOrgEndDt);
				
			}else {
				msOrgEndDt = vsEndDt;
			
			}
		}  
	};
	
	moPage.onValueChanged_RdDipEfftStDt = function() {
		moPage.checkCalendarTime("EFFT_ST_DT");
	};
	
	
	moPage.onValueChanged_RdDipEfftEndDt = function() {
		moPage.checkCalendarTime("EFFT_END_DT");
	};
	return moPage;
};
