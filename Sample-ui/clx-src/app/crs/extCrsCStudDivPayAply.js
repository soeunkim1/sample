//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCrsCStudDivPayAply.xtm"/>


var extCrsCStudDivPayAply = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/**
	 * @desc import 헤더 초기화
	 * @member extCrsCStudDivPayAply
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 5. 20.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc import 학생정보 임포트 초기화
	 * @member extCrsCStudDivPayAply
	 * @param 
	 * @return void
	 * @author Aeyoung Lee 2016. 5. 20.
	 */
	moPage.onLoadImportDone_ImpStudInfo = function() {
		impStudInfo();
	};
	
	/**
	 * @desc 화면 온로드
	 * @member extCrsCStudDivPayAply
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 5. 20.
	 */	
	moPage.onModelConstructDone_ExtCrsCStudDivPayAply = function() {
		
		if(moUserInfo.userDivRcd != "CC00501"){
			//학생만 사용가능한 화면입니다.
			util.Msg.alert("NLS-CRS-M093");
			util.coverPage(app);
			return;
		}	
		
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptDivPayApply"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", ["grpData","grpDataDtl"]);
		//학년도학기 비활성화
		util.Control.setEnable(app, false, ["cbbYearImpNS", "cbbSmtImpNS"]);
		
		//온로드 서브미션
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			
			util.Control.redraw(app, ["cbbDivPayStatRcd"]);
		});
		
		var vsStudId = moUserInfo.id;
		
		//학년도 학기 검색임포트
		doOnLoadImpNS("CRS", function(pbSuccess){
			if(pbSuccess){
				
				var vsStDt = ExtInstance.getValue("instance('impCommonN')/root/date/ST_DT");
				ExtInstance.setValue("/root/reqKey/strSchYearRcd", ExtInstance.getValue("instance('impCommonN')/root/date/YEAR"));
				ExtInstance.setValue("/root/reqKey/strSmtRcd", ExtInstance.getValue("instance('impCommonN')/root/date/SMT"));
				util.DataMap.setValue(app, "dmReqKey", "strStDt", vsStDt);
				ExtInstance.setValue("/root/reqKey/strEndDt", ExtInstance.getValue("instance('impCommonN')/root/date/END_DT"));
				util.DataMap.setValue(app, "dmReqKey", "strStudId", vsStudId);
				
				// 학번에 해당하는 학생정보를 가져온다. 
				setImpStudInfo(vsStudId, vsStDt, null, function(pbStudSuccess){
					if(pbStudSuccess){
						util.Header.clickSearch(app);
					}
				});
			}
		});
	};
	
	/**
	 * @desc 조회 버튼 클릭 이벤트
	 * @member extCrsCStudDivPayAply
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 5. 20.
	 */
	moPage.onClick_BtnSearch = function() {
		if(!util.validate(app, ["grpSearch"])) return false;
		
		// 분납상태 체크 및 분납조회
		doList(function(pbSuccess){
			if(pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});	
	};
	
	/**
	 * @desc 조회 서브미션 실행
	 * @member extCrsCStudDivPayAply
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 5. 20.
	 */
	function doList(poCallbackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdDivPayApply");
				
				util.Control.redraw(app, ["cbbDivPayStatRcd", "dipDivPayReqDt"]);
				
				// 분납신청, 분납취소 버튼 제어
				var vsBtnApply = util.DataMap.getValue(app, "dmResList", "strBtnApplyEnableCtrl");
				var vsBtnCancel = util.DataMap.getValue(app, "dmResList", "strBtnCancelEnableCtrl");
				
				util.Control.setEnable(app, vsBtnApply == "F" ? false : true, "btnSaveApply");
				util.Control.setEnable(app, vsBtnCancel == "F" ? false : true, "btnSaveCancel");
			}
			
			if(util.isFunc(poCallbackFunc)) poCallbackFunc(pbSuccess); 
		}, true);	
			
	};
	
	/**
	 * @desc 분납신청 버튼 클릭 이벤트
	 * @member extCrsCStudDivPayAply
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 5. 20.
	 */
	moPage.onClick_BtnSaveApply = function() {
		
		var vnTotPayFee = Number(util.Grid.getCellValue(app, "grdDivPayApply", "TOT_FEE", 4));
		if(vnTotPayFee <= 0){
			// 전액장학생은 분납신청을 할 수 없습니다.	
			util.Msg.alert("NLS-CRS-M106");
			return;
		}	
		
		//strCommand: createDivPay 
		util.Submit.send(app, "subCreateDivPay", function(pbSuccess){
			if(pbSuccess){
				// 분납상태 체크 및 분납조회
				doList(function(pbSuccess){
					if(pbSuccess){
						// 분납신청이 처리되었습니다.
						util.Msg.alert("NLS-CRS-M081");
						util.Msg.notify(app, "NLS.CRS.M081");
					}	
				});	
			}
		});	
	};
	
	/**
	 * @desc 분납취소 버튼 클릭 이벤트
	 * @member extCrsCStudDivPayAply
	 * @param
	 * @return void
	 * @author Aeyoung Lee 2016. 5. 20.
	 */
	moPage.onClick_BtnSaveCancel = function() {
		
		//strCommand: cancelDivPay 
		util.Submit.send(app, "subCancelDivPay", function(pbSuccess){
			if(pbSuccess){
				// 분납상태 체크 및 분납조회
				doList(function(pbSuccess){
					if(pbSuccess){
						//분납취소가 처리되었습니다.
						util.Msg.alert("NLS-CRS-M082");
						util.Msg.notify(app, "NLS.CRS.M082");
					}	
				});	
			}
		});	
	};
	
	return moPage;
};
