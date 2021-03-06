//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCmnPNoticeDetail.xtm"/>
/******************************************************************************************************
 *  공통파일업로드 관련 설정사항
 *  ▶ 설정가능 유형
 *      1. 인스턴스
 *      2. 리피트 디테일 셀 ID
 *      3. 컨트롤 ID
 *  ▶ 각 변수별 설명
 *      iXXX : 팝업에 전달될  input 파라미터
 *      oXXX : 팝업에서 선택한 값을 받을 데이터
 *  	1. controlId 			: 최초 이벤트의 버튼이나 그리드 id             						(필수)
 *  	2. iFileSerialNo		: 파일순번                                										(선택)
 *  	3. iFileSubPath 		: 저장될 파일 폴더(appworks.properties에 정의된 폴더 경로)	(필수)
 *  	4. iTableName 		: 파일업로드에 사용될 업무단 테이블명								(필수)
 *  	5. iIsHideDelete 		: 삭제버튼 숨기기 여부 													(선택)
 *								  	  default : false;
 *		6. iIsDownloadOnly	: 다운로드만 가능할지 여부(업로드X)									(선택)
 *								      default : false;
 *		7. iIsDirectUpLoad   : auto save기능을 사용하지 않고 파일업로드 팝업을 이용하여 업로드 후 업로드된 정보만 리턴받아 제어 할 경우 사용
 *									  default : false;
 *		8. isFileSelectorOnly : 파일 셀럭터를 이용하여 응용프로그램에서 탬프 파일 경로만 취득하여 제어할 경우경우 사용
 *									  default : false;
 *		9. iFileExtFilter		: 업로드가능 확장자(배열) 												(선택)
 *								  	  ex)["jpg","png"]
 *  	10. oFileSerailNo 		: 파일순번																		(필수)
 *  	11. oFileCnt 			: 저장된 파일 갯수															(선택)
 *									  (	func의 args 대체 가능 poRtnFileInfo.strFileCnt)
 *									  리피트내 컬럼 지정시 updatable="False" 지정
 *  	12. oTmpFilePath 	: 임시폴더파일경로															(선택)
 *									  리피트일경우 null로 지정, TMP_FILE_PATH 데이터셋 생성됨
 *
 *		13.oFileDataChanged	: 파일업로드 변경 여부 판단											(필수)
 *									  (	func의 args 대체 가능 poRtnFileInfo.isFileDataChanged)
 *
 *  	14. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
 *									  args..
 * 									  poRtnFileInfo.IS_FILE_CHG 			파일업로드 리피트 변경 여부
 *															 FILE_CNT					업로드 파일 갯수
 *															 TMP_FILE_PATH		임시파일경로
 *									  						 FILE_SERAIL_NO		파일순번
 *******************************************************************************************************/

var moIdsForStdCmnFileUtil = [{
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

var stdCmnPNoticeDetail = function() {
	var moPage = new Page();
	// html 텍스트(내용)
	var msContent = "";
	
	moPage.onModelConstructDone_StdCmnPNoticeDetail = function() {
		doOnLoad();
	};
	
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
		
	/**
		 * @desc  공지사항의 내용 값 설정
		 * @param psContent
		 * @return void
		 * @author 강현우2016.02.02
		 */		
		moPage.setTxtContent = function(psContent) {
			msContent = psContent;
		};
		
	/**
	 * @desc ModelConstructDone event
	 * @return void
	 * @author 강현우 2016. 02. 18.
	 */
	function doOnLoad() {
				
		// 호출한 페이지에서 파라미터 받기.													
		var vnNoticeSeq =  ExtPopUp.getParentVal("mnNoticeSeq");
		util.DataMap.setValue(app, "dmReqKey", "SEQ", vnNoticeSeq);
		
		//서브미션 실행
		//strCommand: listDetail 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				//컨트롤 rebuild
				moPage.reDrawNoticeGrp();
				util.Control.redraw(app, "grpDataImp");

			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
			}
		}, true);
	}
		
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
			setTxtContent(vsContent);
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
	
	
	moPage.onClick_BtnClose = function() {
		app.close();
		
	};
	
	/**
		 * @desc  목록보기 버튼 클릭
		 * @param
		 * @return void
		 * @author 강현우2016.02.02
		 */		
	moPage.onClick_BtnList = function() {
		//ExtPopUp.closeLayeredPopup();
		// 부모함수 호출(공지사항 전체목록 팝업)
		model.load("/xtm/cmn/stdCmnPNoticeList.xtm", null);
	};
	return moPage;
};
