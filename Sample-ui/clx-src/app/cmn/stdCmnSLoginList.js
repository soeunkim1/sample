//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnSLoginList.xtm"/>


var stdCmnSLoginList = function() {

	var moPage = this;
	
	// 탭정의
	var TAB = {
		USER : "tpcUserCnnt",
		PGM : "tpcPgmCnnt",
		USE : "tpcUserUse",
		DOWN : "tpcDownCnnt"
	};
	
	// 탭버튼정의
	var TAB_BTN = {
		// 사용자별 접속현황
		tpcUserCnnt : "tabBtnUserCnnt", 
		// 프로그램별 접속현황  
		tpcPgmCnnt : "tabBtnPgmCnnt",
		// 사용자별 접속현황
		tpcUserUse : "tabBtnUserUse",
		
		tpcDownCnnt : "tabBtnDownCnnt"
	};
	
	/**
	 * @desc ModelConstructDone event
	 * @return void
	 * @author Kim Bora 2015. 11. 19.
	 */
	function doOnLoad() {
		// 1. 리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCmnCnnt", "rptCmnUseCnnt", "rptCmnPgm", "rptCmnRecUser", "rptCmnUser", "rptUserPgm", "rptCmnDown"]);
		// 2. 검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData"]);
		// 3. 첫번째 탭버튼 선택
		util.Tab.setSelectedTabItem(app, "tabMain", TAB.USER);

		// 4. 서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				var vsStDt = util.DataMap.getValue(app, "dmResOnLoad", "strStDt");       // 기준 시작일자
				var vsEndDt = util.DataMap.getValue(app, "dmResOnLoad", "strEndDt"); // 기준 종료일자
				
				util.Control.setValue(app, "dipStDt", vsStDt);
				util.Control.setValue(app, "dipEndDt", vsEndDt);
				
					
				setTimeout(function(){
						util.Header.clickSearch(app);					
				}, 200);
			}
		}, true);
	}
	/**
	 * @desc 조회한다.
	 * @return void
	 * @author Kim Bora 2015. 11. 19.
	 */
	function doList(){
		
		
		// 선택된 탭아이디 
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
		
		switch (vsSelTabId) {
			// 2-1. 사용자별접속현황
			case TAB.USER : {
				doListCnnt(function(pbSuccess) {
					if(pbSuccess){
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});	
				break;
			}
			// 2-2. 프로그램별 접속현황
			case TAB.PGM : {
				util.Control.setVisible(app, true, ["lblMenuId", "ipbMenuId"]);
				
				doListPgm(function(pbSuccess) {
					if(pbSuccess){
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});			
				break;
			}
			// 2-3. 사용자별 사용현황
			case TAB.USE : {
				doListUser(function(pbSuccess) {
					if(pbSuccess){
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});
				break;
			}
			
			// 2-4. 출력 현황
			case TAB.DOWN : {
				doLisDown(function(pbSuccess) {
					if(pbSuccess){
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});
				break;
			}
		}
	}
	
	/**
	 * @desc 첫번째 탭(사용자별 접속현황) 접속현황 목록을 조회한다.
	 * @param {Object} 서브미션 실행 후 처리될 콜백 함수
	 * @return void
	 * @author Kim Bora 2015. 11. 19.
	 */
	function doListCnnt(poCallBackFunc){
		// 1. 조회조건 필수체크 : 기준일자
		if(!util.validate(app, ["dipStDt", "dipEndDt"])){
			return false;
		}
		
		// 2. 조회 서브미션 호출
		//strCommand: listCnnt 
		util.Submit.send(app, "subListCnnt", function(pbSuccess){
			if(pbSuccess){
				// 접속현황 목록 
				util.Control.redraw(app, "grdCmnCnnt");
				
				var vnCnt = util.Grid.getRowCount(app, "grdCmnCnnt");
				if(vnCnt < 1){
					util.Control.reset(app, "rptCmnUseCnnt");
				}
				
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}	
	
	/**
	 * @desc 첫번째 탭(사용자별 접속현황) 접속현황 목록 선택에 따른 사용자접속목록을 조회한다.
	 * @param {Object} 서브미션 실행 후 처리될 콜백 함수
	 * @return void
	 * @author Kim Bora 2015. 11. 19.
	 */
	function doListUseCnnt(poCallBackFunc){
		// 1. 조회조건 : 접속현황 목록의 값 
		//var vsOrd = ExtRepeat.getValue("rptCmnCnnt", "ORD");
		var vsUserDivRcd = util.Grid.getCellValue(app, "grdCmnCnnt", "USER_DIV_RCD");
		
		//ExtInstance.setValue("/root/reqListUseCnnt/strOrd", vsOrd);
		util.DataMap.setValue(app, "dmReqListUseCnnt", "strUserDivRcd", vsUserDivRcd);
		
		// 2. 조회 서브미션 호출
		//strCommand: listUseCnnt 
		util.Submit.send(app, "subListUseCnnt", function(pbSuccess){
			if(pbSuccess){
				// 사용자접속 목록
				util.Control.redraw(app, "grdCmnUseCnnt");
				
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
	/**
	 * @desc 두번째 탭(프로그램별 접속현황) 프로그램목록을 조회한다.
	 * @param {Object} 서브미션 실행 후 처리될 콜백 함수
	 * @return void
	 * @author Kim Bora 2015. 11. 19.
	 */
	function doListPgm(poCallBackFunc){
		// 1. 조회조건 필수체크 : 기준일자
		if(!util.validate(app, ["dipStDt", "dipEndDt"])){
			return false;
		}
		
		// 2. 조회 서브미션 호출
		//strCommand: listPgm 
		util.Submit.send(app, "subListPgm", function(pbSuccess){
			if(pbSuccess){
				// 프로그램 목록 
				util.Control.redraw(app, "grdCmnPgm");
				
				var vnCnt = util.Grid.getRowCount(app, "grdCmnPgm");
				if(vnCnt < 1){
					util.Control.reset(app, "rptCmnRecUser");
				}
				
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
	/**
	 * @desc 두번째 탭(사용자별 사용현황) 프로그램 목록 선택에 따른 최근접속사용자목록을 조회한다.
	 * @param {Object} 서브미션 실행 후 처리될 콜백 함수
	 * @return void
	 * @author Kim Bora 2015. 11. 19.
	 */
	function doListRecUser(poCallBackFunc){
		
	}
	
	/**
	 * @desc 세번째 탭(사용자별 사용현황) 사용자목록을 조회한다.
	 * @param {Object} 서브미션 실행 후 처리될 콜백 함수
	 * @return void
	 * @author Kim Bora 2015. 11. 19.
	 */
	function doListUser(poCallBackFunc){
		// 1. 조회조건 필수체크 : 기준일자
		if(!util.validate(app, ["dipStDt", "dipEndDt"])){
			return false;
		}
		
		// 2. 조회 서브미션 호출
		//strCommand: listUser 
		util.Submit.send(app, "subListUser", function(pbSuccess){
			if(pbSuccess){
				// 사용자 목록 
				util.Control.redraw(app, "grdCmnUser", true);
				
				var vnCnt = util.Grid.getRowCount(app, "grdCmnUser");
				if(vnCnt < 1){
					util.Control.reset(app, "rptUserPgm");
				}
				
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
	function doLisDown(poCallBackFunc){
		// 1. 조회조건 필수체크 : 기준일자
		if(!util.validate(app, ["dipStDt", "dipEndDt"])){
			return false;
		}
		
		// 2. 조회 서브미션 호출
		//strCommand: listDown 
		util.Submit.send(app, "subListDown", function(pbSuccess){
			if(pbSuccess){
				// 사용자 목록 
				util.Control.redraw(app, "grdCmnDown", true);
				
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
	/**
	 * @desc 세번째 탭(사용자별 사용현황) 사용자목록 선택에 따른 프로그램목록을 조회한다.
	 * @param {Object} 서브미션 실행 후 처리될 콜백 함수
	 * @return void
	 * @author Kim Bora 2015. 11. 19.
	 */
	function doListUserPgm(poCallBackFunc){
		// 1. 조회조건 : 사용자 목록에서 선택한 행의 사용자 Id
		var vsUserId = util.Grid.getCellValue(app, "grdCmnUser", "USER_ID");
		util.DataMap.setValue(app, "dmReqListUser", "strUseUserId", vsUserId);
		
		// 2. 조회 서브미션 호출
		//strCommand: listUserPgm 
		util.Submit.send(app, "subListUserPgm", function(pbSuccess){
			if(pbSuccess){
				// 프로그램목록
				util.Control.redraw(app, "grdUserPgm");
				
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
	/**
	 * @desc  탭변경 이벤트
	 * @param {String} psCaseId 탭ID
	 * @return void
	 * @author Kim Bora 2015. 11. 19.
	 */
	function doTabChange(psCaseId){
		var vsSelTabId = util.Tab.getSelectedId(app, "tabMain");
	
		// 1. 현재 선택된 탭과 선택한 탭이 같은 경우 조회하지 않는다.
		if(vsSelTabId == psCaseId) return false;
		
		// 2. 탭변경
		util.Tab.setSelectedTabItem(app, "tabMain", psCaseId);
			
		// 3. 조회조건 메뉴ID 컨트롤에 대한 비활성화처리 
		// => 두번째 탭(프로그램별 접속현황) 선택인 경우만 조회조건이 보여진다.
		util.Control.setVisible(app, false, ["lblMenuId", "ipbMenuId"]);
		util.Control.reset(app, "ipbMenuId");
		
		// 4. 탭변경 후 처리 로직
		switch (psCaseId) {
			// 2-1. 사용자별접속현황
			case TAB.USER : {
				doListCnnt(function(pbSuccess) {
					if(pbSuccess){
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});
				
				break;
			}
			// 2-2. 프로그램별 접속현황
			case TAB.PGM : {
				util.Control.setVisible(app, true, ["lblMenuId", "ipbMenuId"]);
				
				doListPgm(function(pbSuccess) {
					if(pbSuccess){
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});
				
				break;
			}
			// 2-3. 사용자별 사용현황
			case TAB.USE : {
				doListUser(function(pbSuccess) {
					if(pbSuccess){
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});

				break;
			}
			
			// 2-4. 출력 사용현황
			case TAB.DOWN : {
				doLisDown(function(pbSuccess) {
					if(pbSuccess){
						// 조회 : "조회되었습니다." header 메세지 표시
						util.Msg.notify(app, "NLS.INF.M024");
					}
				});

				break;
			}
		}
	}
	
	moPage.onClick_BtnSearch = function() {
		doList();
	}
		
	moPage.onModelConstructDone_StdCmnSLoginList = function() {
		doOnLoad();
	};
	
	moPage.onClick_TabBtnUserCnnt = function() {
		doTabChange(TAB.USER);
	};
	
	moPage.onClick_TabBtnPgmCnnt = function() {
		doTabChange(TAB.PGM);
	};
	
	moPage.onClick_TabBtnUserUse = function() {
		doTabChange(TAB.USE);
	};
		
	moPage.onKeyDown_IpbMenuId = function(strKeyType, strKeyStatus) {
		// 엔터키 입력시 조회
		if(e.keyCode == cpr.events.KeyCode.ENTER){
			util.Header.clickSearch(app);
		}
	};
	
	
//	moPage.onClick_TabBtnUserUse1 = function() {
//		moPage.doTabChange(TAB.DOWN);
//	}
	
	
	function doListRecUser(poCallBackFunc){
		// 1. 조회조건 : 프로그램 목록에서 선택한 행의 메뉴Id
		var vsMenuId = util.Grid.getCellValue(app, "grdCmnPgm", "MENU_ID");
		util.DataMap.setValue(app, "dmReqListRecUser", "strPgmId", vsMenuId);
		
		// 2. 조회 서브미션 호출
		//strCommand: listRecUser 
		util.Submit.send(app, "subListRecUser", function(pbSuccess){
			if(pbSuccess){
				// 최근 접속 사용자
				util.Control.redraw(app, "grdCmnRecUser");
				
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}
	
	
	moPage.onClick_TabBtnDownCnnt = function() {
		doTabChange(TAB.DOWN);
	};
	return moPage;
};
