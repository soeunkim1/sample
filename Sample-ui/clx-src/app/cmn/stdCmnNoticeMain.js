//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnNoticeMain.xtm"/>


var stdCmnNoticeMain = function() {
	var moPage = new Page();
	
	var vsSeq = 1;
	var msContent = "";
	var noticeAttr;
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	function doList(poCollBackFunc){
		
				//strCommand: mainlist 
				util.Submit.send(app, "subList", function(pbSuccess){
			
			if(pbSuccess){
				util.Control.redraw(app, "grdNotice");
				// 조회 : "조회되었습니다." header 메세지 표시
				util.Msg.notify(app, "NLS.INF.M024");
			}
			// 조회 후 콜백함수 수행 
			// 만약 이것이 함수 이면 콜백동작 
			if(util.isFunc(poCollBackFunc)){
				poCollBackFunc(pbSuccess);
			}
		});
		
	};
	
	moPage.onModelConstructDone_StdCmnNoticeMain = function() {
		doList();
	};
	
	// 선택한 공지사항의 세부 내용을 보여준다. 
	moPage.reDrawNoticeGrp = function(poRow) {
		
	  var vnNullCnt = 0;
	  var vsTitle = util.DataSet.getValue(app, "dsResBoard", "TITLE", poRow);
	  var vsContent = util.DataSet.getValue(app, "dsResBoard", "CONT", poRow);
	  var vsLink = util.DataSet.getValue(app, "dsResBoard", "LINK_URL", poRow);
	  var vsFile1 = util.DataSet.getValue(app, "dsResBoard", "FILE_NM1", poRow);
	  var vsFile2 = util.DataSet.getValue(app, "dsResBoard", "FILE_NM2", poRow);
	  var vsFile3 = util.DataSet.getValue(app, "dsResBoard", "FILE_NM3", poRow);
	  
	  var vsFileOrgNm1 = util.DataSet.getValue(app, "dsResBoard", "FILE_ORG_NM1", poRow);
	  var vsFileOrgNm2 = util.DataSet.getValue(app, "dsResBoard", "FILE_ORG_NM2", poRow);
	  var vsFileOrgNm3 = util.DataSet.getValue(app, "dsResBoard", "FILE_ORG_NM3", poRow);

	  if(!vsLink) vnNullCnt++; 
	  if(!vsFile1) vnNullCnt++; 
	  if(!vsFile2) vnNullCnt++; 
	  if(!vsFile3) vnNullCnt++; 
		
	  var vsTotalTop = 40;
	  var vsCtlHeight = 23;  
	  var vsLblFileHeight = 0;
	
	// 링크가 값이 없으면 링크 레이블을 숨김
	  if(ValidUtil.checkValue(vsLink,"notNull=yes")) {
		ExtControl.setAttr("lblLink", "top", vsTotalTop);  
		ExtControl.setAttr("lblLinkContent", "top", util.Control.getProperty(app, "lblLink","top"));
		util.Control.setValue(app, "lblLinkContent",vsLink);
		vsTotalTop =  util.Control.getProperty(app, "lblLink","top") + vsCtlHeight;
	  } else {
		ExtControl.setAttr("lblLink", "visible", false);
		ExtControl.setAttr("lblLinkContent", "visible", false);
	  }
	  
	// 파일업로드가 되어있지 않으면 파일첨부란을 보여주지 않는다. 
	 if((ValidUtil.checkValue(vsFile1,"notNull=yes")) || (ValidUtil.checkValue(vsFile2,"notNull=yes")) || (ValidUtil.checkValue(vsFile3,"notNull=yes"))){
		ExtControl.setAttr("lblFile", "top", vsTotalTop);
	 }
	

	  if(ValidUtil.checkValue(vsFile1,"notNull=yes")){
		ExtControl.setAttr("lblFile1", "top", vsTotalTop); 
		util.Control.setValue(app, "lblFile1", vsFile1);
		util.Control.setValue(app, "lblFileOrgNm1", vsFileOrgNm1);
		vsTotalTop = util.Control.getProperty(app, "lblFile1", "top") + vsCtlHeight;
		vsLblFileHeight += vsCtlHeight;
	  }else{
		ExtControl.setAttr("lblFile1","visible", false);
	  }
	  if(ValidUtil.checkValue(vsFile2,"notNull=yes")){
		ExtControl.setAttr("lblFile2", "top", vsTotalTop); 
		util.Control.setValue(app, "lblFile2", vsFile1);
		util.Control.setValue(app, "lblFileOrgNm2", vsFileOrgNm1);
		vsTotalTop = util.Control.getProperty(app, "lblFile2", "top") + vsCtlHeight;
		vsLblFileHeight += vsCtlHeight;
	  }else{
		ExtControl.setAttr("lblFile2","visible", false);
	  }
	 if(ValidUtil.checkValue(vsFile3,"notNull=yes")){
		ExtControl.setAttr("lblFile3", "top", vsTotalTop); 
		util.Control.setValue(app, "lblFile3", vsFile1);
		util.Control.setValue(app, "lblFileOrgNm3", vsFileOrgNm1);
		vsTotalTop = util.Control.getProperty(app, "lblFile3", "top") + vsCtlHeight;
		vsLblFileHeight += vsCtlHeight;
	  }else{
		ExtControl.setAttr("lblFile3","visible", false);
	  }
	  
	 if(ValidUtil.checkValue(vsFile1,"notNull=yes") || ValidUtil.checkValue(vsFile1,"notNull=yes") || ValidUtil.checkValue(vsFile1,"notNull=yes")){
		ExtControl.setAttr("lblFile", "height", vsLblFileHeight -3);
	 }else{
		ExtControl.setAttr("lblFile","visible", false);
	 }
	
	ExtControl.setAttr("lblContent","top", vsTotalTop);
	ExtControl.setAttr("lblContent","height", util.Control.getProperty(app, "lblContent","height")-vsTotalTop + 40);
	
	ExtControl.setAttr("txtContent","top", vsTotalTop);
	ExtControl.setAttr("txtContent","height", util.Control.getProperty(app, "txtContent","height")-vsTotalTop + 40);
 
	util.Control.setValue(app, "lblTitleContent", vsTitle);
	util.Control.setValue(app, "txtContent",vsContent);
	util.Control.redraw(app, "grp2");
	
	//ExtControl.setAttr("txtContent","src", "mainBoard.html");
	 //this.setTxtContent(vsContent);
	ExtControl.setAttr("rptNotice" ,"visible", false);
	ExtControl.setAttr("grp2", "visible", true);
	};
	
	moPage.getTxtContent = function() {
		return msContent;
		
	};
	
	moPage.setTxtContent = function(psContent) {
		msContent = psContent;
	};
	
	
	// 공지사항 선택시 
	moPage.onRowSelect_RptNotice = function() {
			
		var vnRow = util.Grid.getIndex(app, "grdNotice");
		if( vnRow == null) { return; }
		
		vsSeq =util.Grid.getCellValue(app, "grdNotice","rdIpbSeq", vnRow);
		util.DataMap.setValue(app, "dmReqHit", "SEQ", vsSeq);
		
		//조회수 + 1 서브미션 
		//strCommand: noticehitount 
		util.Submit.send(app, "subHitPlus", function(pbSuccess){
			
			if(pbSuccess){
				reDrawNoticeGrp(vnRow);
				
			}
		});
	};
	
	// 목록보기 클릭 시 다시 공지사항 화면으로 
	moPage.onClick_Button3 = function() {

		ExtControl.setAttr("rptNotice", "visible", true);
		ExtControl.setAttr("grp2", "visible", false);
		doList();
	 
	};
	return moPage;
};
