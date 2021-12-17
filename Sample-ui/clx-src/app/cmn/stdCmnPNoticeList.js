//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnPNoticeList.xtm"/>

var stdCmnPNoticeList = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	var msContent = "";
	
	moPObject.moIdsForStdCmnFileUtil = [{
		controlId : "btnFileDownLoad",
		iFileSerialNo : "optFileSerialNo",
		iFileSubPath : "stdCmnSMainNotice",
		iTableName : "CMN_BOARD",
		iIsDirectUpLoad : null,
		isFileSelectorOnly : null,
		iIsHideDelete : true,
		iIsDownloadOnly : true,
		iFileExtFilter : null,
		oFileSerailNo : "optFileSerialNo",
		oTmpFilePath : null, //리피트일경우 null로 지정
		oFileCnt : "optFileCnt",
		oFileDataChanged : null,
		func : null
	}];
	
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
		/**
		 * @desc  mainBoard.html에서 호출하여 공지사항의 상세 내용 입력
		 * @param
		 * @return msContent
		 * @author 강현우2016.02.02
		 */		
		moPage.getTxtContent = function() {
			return msContent;
			
		};
		
		
	function doListDtl() {
				
			// 호출한 페이지에서 파라미터 받기.													
			var vnNoticeSeq =  ExtPopUp.getParentVal("mnNoticeSeq");
			util.DataMap.setValue(app, "dmReqKey", "SEQ", vnNoticeSeq);
			
			//서브미션 실행
			//strCommand: listDetail 
			util.Submit.send(app, "subListDtl", function(pbSuccess){
				if(pbSuccess){
					//컨트롤 rebuild
					moPage.reDrawNoticeGrp();
					util.Control.redraw(app, "grpDataImp");
				if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				}
			}, true);
	};
	
	/**
		 * @desc  공지사항 선택 - 컨트롤 위치 및 사이즈 조정
		 * @param poRow
		 * @return void
		 * @author 강현우 2016.02.02
		 */		
		moPage.reDrawNoticeGrp = function() {
			
			// 상세 내용안에 보여질 데이터들(제목, 내용, 링크, 파일1,2,3)
			var vsTitle = util.DataSet.getValue(app, "dsResBoard", "TITLE");
			var vsContent = util.DataSet.getValue(app, "dsResBoard", "CONT");
			var vsLink = util.DataSet.getValue(app, "dsResBoard", "LINK_URL");
				
			// "제목"은 고정이므로 고정위치 값을 지정해 놓는다.
			var vsTotalTop = 65;
			// 컨트롤의 높이
			var vsCtlHeight = 25;
			// "첨부파일" 레이블의 높이
			var vsLblFileHeight = 0;
			// "내용"의 높이조절
			var vnContHeg = 0;
			// "링크"의 위치 
			var vsLinkTop = Number(util.Control.getStyleAttr(app, "lblLink", "top")) - 1;
			
			// 링크가 값이 없으면 링크 레이블을 숨김
			if (ValidUtil.checkValue(vsLink, "notNull=yes")) {
				util.Control.setStyleAttr(app, "lblLink", "top", vsTotalTop);
				util.Control.setStyleAttr(app, "lblLinkContent", "top", vsLinkTop);
				util.Control.setValue(app, "lblLinkContent", vsLink);
				vsTotalTop = vsLinkTop + vsCtlHeight;
				util.Control.setVisible(app, true, "lblLink");
				util.Control.setVisible(app, true, "lblLinkContent");
			} else {
				util.Control.setVisible(app, false, "lblLink");
				util.Control.setVisible(app, false, "lblLinkContent");
				vnContHeg += vsCtlHeight;
			}
			
			// 파일업로드가 되어있는 경우
			var vnFileCnt = util.DataSet.getValue(app, "dsResBoard","FILE_CNT");

			if (vnFileCnt != 0) {
				// 파일 부분 위치 조정
				util.Control.setStyleAttr(app, "lblFile", "top", vsTotalTop - 1);
				util.Control.setStyleAttr(app, "btnFileDownLoad", "top", vsTotalTop - 1);
				util.Control.setStyleAttr(app, "lblFileCnt", "top", vsTotalTop - 1);
				util.Control.setStyleAttr(app, "optFileCnt", "top", vsTotalTop - 1);
				
				util.Control.setValue(app, "optFileCnt", vnFileCnt);
				util.Control.setVisible(app, true, "lblFile");
				util.Control.setVisible(app, true, "btnFileDownLoad");
				util.Control.setVisible(app, true, "lblFileCnt");
				util.Control.setVisible(app, true, "optFileCnt");
				
				// 파일 하단 부분 위치값 조정 
				var vsFileTop = Number(util.Control.getStyleAttr(app, "lblFile", "top"));
				vsTotalTop = Number(vsFileTop) + vsCtlHeight;
				vsLblFileHeight += vsCtlHeight;
			}
			else {
				util.Control.setVisible(app, false, "btnFileDownLoad");
				util.Control.setVisible(app, false, "lblFile");
				util.Control.setVisible(app, false, "lblFileCnt");
				util.Control.setVisible(app, false, "optFileCnt");
				
				vnContHeg += vsCtlHeight;
			}
			// "내용" 레이블 사이즈와 위치 변경 
			util.Control.setStyleAttr(app, "lblContent", "top", vsTotalTop - 1);
			var vsContentHeight = util.Control.getStyleAttr(app, "lblContent", "height"); //465px
			var vnContentHeight = vsContentHeight.replace(/[^0-9]/g, ''); //465
			util.Control.setStyleAttr(app, "lblContent", "height", (Number(vnContentHeight) + vnContHeg));
			
			// htmlObject 그룹 사이즈와 위치 변경
			util.Control.setStyleAttr(app, "grpDataImpContent", "top", vsTotalTop - 2);
			var vsGroupHeight = util.Control.getStyleAttr(app, "grpDataImpContent", "height"); //465px
			var vnGroupHeight = vsContentHeight.replace(/[^0-9]/g, ''); //465
			util.Control.setStyleAttr(app, "grpDataImpContent", "height", (Number(vnGroupHeight) + vnContHeg));

			// htmlObject 사이즈와 위치 변경 
			var vsHojHeight = util.Control.getStyleAttr(app, "hojContent", "height");
			var vnHojHeight = vsHojHeight.replace(/[^0-9]/g, '');
			var domContent = model.window().document.getElementById("hojContent");
			
			
			// htmlObject 영역에 내용을 가져와 보여준다.(html태그 속성 유지)
			moPage.setTxtContent(vsContent);
			ExtSubPage.setPage("hojContent", "inc/common/mainBoard.html", true, "auto");
						
			if (domContent != null) {
				// html이 불러와진 상태라면 body의 위치와 크기 속성을 직접 조작
				domContent.style.top = vsTotalTop+"px";
				domContent.style.height = (Number(vnHojHeight) + vnContHeg)+"px";
			}
			else {
				// 공지사항을 최초 선택 시에는 컨트롤 위치를 조작
				util.Control.setStyleAttr(app, "hojContent", "top", vsTotalTop - 1);
				util.Control.setStyleAttr(app, "hojContent", "height", (Number(vnHojHeight) + vnContHeg));
			}
			
			util.Control.setValue(app, "optTitleContent", vsTitle);
			
		};
		
			/**
		 * @desc  첨부파일 다운로드 클릭
		 * @param
		 * @return void
		 * @author 강현우2016.02.02
		 */		
	moPage.onClick_BtnFileDownLoad = function(sender) {
			doOnClickStdCmnPFileUtil(sender);
		}
		
	
	/**
		 * @desc  공지사항의 내용 값 설정
		 * @param psContent
		 * @return void
		 * @author 강현우2016.02.02
		 */		
		moPage.setTxtContent = function(psContent) {
			msContent = psContent;
		};
		
	
//	moPage.onRowSelect_RptCmnBoard = function() {
//		//
//		//var vnRow = ExtRepeat.getIndex("rptCmnBoard");
//		//if (vnRow == null) {
//		//	return;
//		//}
//		//
//		////공지사항 상세내용을 팝업으로 띄움(부모함수 호출)
//		//ExtPopUp.getParentScript("openNoticeDetail", vnRow);
//		//
//		//ExtControl.setVisible(true, "grpDataImp");
//		//var domContent = model.window().document.getElementById("hojContent");
//		//if(domContent != null) domContent.style.display = "inline";
//		//
//		//moPage.doListDtl();
//		//
//		////model.load("/xtm/cmn/stdCmnPNoticeDetail.xtm", null);
//		//
//		////전체 공지사항 팝업 제거 
//		////ExtPopUp.closeLayeredPopup();
//	}
	
	
	
	moPage.onModelConstructDone_StdCmnPNoticeList = function() {
		//세션정보를 이용해 사용자 구분코드값 세팅
			util.DataMap.setValue(app, "dmRoot", "reqKey", "strUserDivRcd", moUserInfo.userDivRcd);
			
			var vsEventStatr = ExtPopUp.getParentVal("mnEventStart");
			doGrpVisible(vsEventStatr);
			
			
			if(vsEventStatr == "L"){
				// 팝업 온로드시 공지사항 전체 목록을 가져온다.
				doList(function(pbSuccess) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
			
			}else{
				doList(function(pbSuccess) {
					
					doListDtl();
					// 조회 : "조회되었습니다." header 메세지 표시
					if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
				});
				
				
			}
	};
	
	
	
	function doGrpVisible(psStatus){
		
		if(psStatus == "L"){
			
			util.Control.setVisible(app, true, "grpDataBoard");
			util.Control.setVisible(app, false, ["grpDataImp"]);

			var domContent = model.window().document.getElementById("hojContent");
			
			if(domContent != null) domContent.style.display = "none";
			
		}else{
			util.Control.setVisible(app, false, "grpDataBoard");
			util.Control.setVisible(app, true, ["grpDataImp"]);

			var domContent = model.window().document.getElementById("hojContent");
			
			if(domContent != null) domContent.style.display = "inline";
		}
	
		
	}
	/**
	 * @desc  공지사항 목록 전체 조회
	 * @param poCollBackFunc
	 * @return void
	 * @author 강현우 2016.02.18
	 */	
	function doList(poCollBackFunc) {
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess) {
			if (pbSuccess) {
				
				util.Control.redraw(app, "grdCmnBoard");
			}
			if (util.isFunc(poCollBackFunc)) {
				poCollBackFunc(pbSuccess);
			}
		});
		
	};
	
	moPage.onClick_BtnClose = function() {
		app.close();
	}
	
	moPage.onClick_BtnList = function() {
		//ExtPopUp.closeLayeredPopup();
		// 부모함수 호출(공지사항 전체목록 팝업)
		//model.load("/xtm/cmn/stdCmnPNoticeList.xtm", null);
		util.Control.setVisible(app, true, "grpDataBoard");
		util.Control.setVisible(app, false, ["grpDataImp"]);
		
		var domContent = model.window().document.getElementById("hojContent");
		domContent.style.display = "none";
	}
	
	moPage.onClick_BtnFileDownLoad = function(sender) {
			doOnClickStdCmnPFileUtil(sender);
		}
	
	
	moPage.onClick_RdOptTitle = function() {
		var vnRow = util.Grid.getIndex(app, "grdCmnBoard");
		if (vnRow == null) {
			return;
		}
		
		//공지사항 상세내용을 팝업으로 띄움(부모함수 호출)
		ExtPopUp.getParentScript("openNoticeDetail", vnRow);
		
		util.Control.setVisible(app, true, "grpDataImp");
		var domContent = model.window().document.getElementById("hojContent");
		if(domContent != null) domContent.style.display = "inline";
		
		doListDtl();
		
		//model.load("/xtm/cmn/stdCmnPNoticeDetail.xtm", null);
		
		//전체 공지사항 팝업 제거 
		//ExtPopUp.closeLayeredPopup();
	};
	return moPage;
};
