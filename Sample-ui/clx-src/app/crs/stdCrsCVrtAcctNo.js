//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCrsCVrtAcctNo.xtm"/>


var stdCrsCVrtAcctNo = function() {
		
	var moPage = new Page();
		
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2106-04-07
	 */
	moPage.onLoadImportDone_ImpTitle = function() {		
		doHeaderOnLoad();
	};
	
	/**
	 * @desc  조건 Import onLoad
	 * @return void
	 * @author Aeyoung Lee 2106-04-07
	 */
	moPage.onLoadImportDone_ImpCssScalCollSch = function() {
		onLoadOptGrpImp("CB01902", "getVacctStudGrplist", null);
	};
	
	/**
	 * @desc 온로드 실행
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2106-04-07
	 */
	moPage.onModelConstructDone_StdCrsCVrtAcctNo = function() {
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){		
			if(pbSuccess) {
				util.Control.redraw(app, ["cbbBankCd","cbbUseDivCd","cbbVrtAcctRegBank"]);
				
				util.SelectCtl.selectItem(app, "cbbBankCd", 0);
				util.SelectCtl.selectItem(app, "cbbUseDivCd", 0);
				util.SelectCtl.selectItem(app, "cbbVrtAcctRegBank", 0);
			}
			
		});
	};
	
	/**
	 * @desc 가상계좌부여 버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2106-04-07
	 */
	moPage.onClick_BtnSaveVrtAcctReg = function() {
		
		util.Msg.notify(app, "null");
		
		if(!doValidationImp()) return;
		
		if(!util.validate(app, ["cbbBankCd", "cbbUseDivCd"])) return; 
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: updStdCrsVrtAcct 
		util.Submit.send(app, "subRegVrtAcct", function(pbSuccess){
			if(pbSuccess){
				var vsTotalStudNo = util.DataMap.getValue(app, "dmResList", "totalStudNo");
				var vsProcAcctNo = util.DataMap.getValue(app, "dmResList", "procAcctNo");	
				
				// 학생선택그룹에 가상계좌가 부여되었습니다.
				util.Msg.notify(app, "NLS.CRS.M046");
				
				// 총@1명의 학생중 @2명에게 가상계좌가 부여되었습니다.
				util.Msg.alert("NLS-CRS-M048", [vsTotalStudNo, vsProcAcctNo]);
			}
			
			util.removeCover(app);
		}); 
	};
	
	/**
	 * @desc 가상계좌초기화 버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2106-04-07
	 */
	moPage.onClick_BtnSaveVrtAcctInit = function() {
		// 해당 은행 가상계좌의 학생에게 할당된 내용이 모두 삭제됩니다. 계속하시겠습니까?
		if (!util.Msg.confirm("NLS-CRS-M042") ) return;
		
		if(!doValidationImp()) return;
		
		if(!util.validate(app, ["cbbBankCd", "cbbUseDivCd"])) return;
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: initVrtAcct 
		util.Submit.send(app, "subInitVrtAcct", function(pbSuccess){
			if(pbSuccess){
				var vsStudCount = util.DataMap.getValue(app, "dmResList", "studCount");
				var vsUpdCount = util.DataMap.getValue(app, "dmResList", "updCount");	
				
				// 총 @1 명의 학생 중 @2 명의 가상계좌가 초기화되었습니다. 
				util.Msg.alert("NLS-CRS-M077", [vsStudCount, vsUpdCount]);
			}
			
			util.removeCover(app);
		});
	};
	
	/**
	 * @desc 가상계좌업로드 버튼 클릭 이벤트
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2106-04-07
	 */
	moPage.onClick_BtnSaveVrtAcctUpLoad = function() {
		if(!util.validate(app, ["optFilePath", "cbbVrtAcctRegBank"])) return false;
		
		var vaFileNm = util.Control.getValue(app, "optFilePath").split(",");
		if(vaFileNm.length > 2) return;
		
		// 2016.10.14 배치처리전 커버페이지 씌우는 로직추가
		util.coverPage(app);
		
		//strCommand: crtVrtAcct 
		util.Submit.send(app, "subCrtVrtAcct", function(pbSuccess){
			if(pbSuccess){
				util.Msg.notify(app, "NLS.INF.M003");
			}
			
			util.Control.setValue(app, "optFilePath", "");
			util.removeCover(app);
			
		}, true); 
	};
	
	/**
	 * @desc 가상계좌업로드 파일 선택 버튼 
	 * @param 
	 * @return 
	 * @author Aeyoung Lee 2106-04-07
	 */
	moPage.onClick_BtnSaveBrowse = function() {
		FileUtil.getFileName(true, ["xls", "xlsx", "txt"], function(psFileNm){
			util.Control.setValue(app, "optFilePath", psFileNm);
		},"",false);
	};
	
	return moPage;
};

