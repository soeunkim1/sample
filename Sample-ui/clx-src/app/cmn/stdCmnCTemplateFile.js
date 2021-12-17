//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./stdCmnCTemplateFile.xtm"/>

var stdCmnCTemplateFile = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author xxxx at 2017.04.10
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};


				
	/**
	 * @desc 
	 * @return 
	 * @author xxxx 2017.04.10
	 */
	moPage.onModelConstructDone_stdCmnCTemplateFile = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCmnTemplateFile");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grp_rptCmnTemplateFile");
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
				
				util.Control.redraw(app, "cbbUnitSystemRcd");
			}
		});
	}

	/**
	 * @desc 
	 * @param 
	 * @return 
	 * @author xxxx 2017.04.10
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCmnTemplateFile");
			}
		});
		
		
	}

	/**
	 * @desc 리피트 panel click event
	 * @param
	 * @return void
	 * @author xxxx 2017.04.10
	 */
	moPage.onValueChanged_RhCkbSelect = function() {
//TO-BE: <ExtRepeat.selectedAllPanel> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.selectedAllPanel("rhCkbSelect");
	};


	
	moPage.onClick_BtnSearch = function() {
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};
	
	
	moPage.onClick_BtnUpload = function() {
		FileUtil.getFileName(true, null, function(psFileNm){
			if(psFileNm) {
				var vaFileNm = psFileNm.split(",");			
				if(vaFileNm.length > 2) return;
				//strCommand: upload 
				util.Submit.send(app, "subUpload", function(pbSuccess){
											
					if(pbSuccess){
						doList();
					}
				});
				
			}
		}, null, false);
	};
	
	
	moPage.onClick_RdBtnDown = function() {
		

		var vsFileNm = util.Grid.getCellValue(app, "grdCmnTemplateFile", "FILE_NM");
		var voParam = {
							"strFileSubPath" :"stdCmnCTemplateFile",
							"strFileNm" :vsFileNm,
							"strOriFileNm" : vsFileNm,
							"strTmpFilePath" :"",
							"strCommand" : "fileDownLoad"
				}

		//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
		FileUtil.downloadFile("std.cmn.StdCmnFileTransUtil.ex", voParam);
				
				
	};
	
	
	moPage.onClick_RdBtnDel = function() {
		if(!util.Msg.confirm("NLS-CRM-M004") )	return;	
		
		util.DataMap.setValue(app, "dmReqList", "strFileSerialNo", util.Grid.getCellValue(app, "grdCmnTemplateFile", "FILE_SERIAL_NO"));
		util.DataMap.setValue(app, "dmReqList", "strFileNm", util.Grid.getCellValue(app, "grdCmnTemplateFile", "FILE_NM"));
		
		//strCommand: delete 
		util.Submit.send(app, "subDelete", function(pbSuccess){
			if(pbSuccess){
				doList(function(pbListSuccess) {
					if (pbListSuccess) util.Msg.notify(app, "NLS.INF.M025");
				});
			}
		});
	};
	return moPage;
};

