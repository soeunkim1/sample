//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
///<xtmlink path="./extCsrCStudImageBatch.xtm"/>

var extCsrCStudImageBatch = function() {

	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/******************************************************************************************************
	 *  객체검색팝업 관련 설정사항
	 *  ▶ 설정가능 유형
	 *      1. 인스턴스
	 *      2. 리피트 디테일 셀 ID
	 *      3. 컨트롤 ID
	 *  ▶ 각 변수별 설명
	 *      iXXX : 팝업에 전달될  input 파라미터
	 *      oXXX : 팝업에서 선택한 값을 받을 데이터
	 *  	1. controlId 		: 최초 이벤트의 버튼이나 그리드 id             (필수)
	 *  	2. iCd 				: 검색조건 부서코드                                 (선택) 
	 *  	3. iNm 				: 검색조건 부서명									(선택)	
	 *  	4. iObjDivRcd 	: 검색될 객체구분코드 종류						(필수)
	 *								  (CC009OG : "행정부서", CC009SA : "학사부서", CC009SP : "이수과정", CC009CU : "교과그룹", CC009OT : "외부부서")
	 *  	5. iStartObject 	: 검색시작부서 										(선택)
	 *								  ("CC009OG20000,CC009OG70000",) 
	 *		6. iOtDivRcd 		: 외부부서구분코드 									(선택)
	 *								  (외부부서[CC009OT]일때 사용) ("CB008UNIV, CB008HSCL")
	 *		7. iOtIsTreeView	: 트리보이기 유무 									(선택)
	 *								  default : N (외부부서[CC009OT]일때 사용) "Y" 
	 *  	8. iLanDivRcd 	: 언어키													(선택)
	 *  	9. iKeyDate 		: 기준일													(필수)
	 *  	10. oObjDivRcd 	: 객체구분코드 
	 *  	11. oCd 			: 부서코드
	 *  	12. oCdNm 		: 부서명
	 *  	13. oBegDt 		: 시작일
	 *  	14. oEndDt 		: 종료일
	 *  	15. oLanDivRcd 	: 언어키
	 *  	16. func 			: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수
	 *									  
	 *******************************************************************************************************/	
	moPObject.moIdsForStdCmnPObjSch = [
		{   //조회조건 행정부서 학사부서
			controlId			:	"btnPopSearch",
			iCd					:	"",
			iNm					:	"ipbSaNm",
			iObjDivRcd			:	["CC009SA", "CC009OG"],
			iStartObject    	:   "",
			iOtDivRcd			:	"",
			iOtIsTreeView	:	"",
			iLanDivRcd		:	"",
			iKeyDate			:	"/root/reqList/strKeyDate",
			iKeyEndDate		:	"",
			oObjDivRcd		:	"/root/reqList/strObjDivRcd",
			oCd					:	"/root/reqList/strSaCd",
			oCdNm				:	"ipbSaNm",
			oBegDt				:	"",
			oEndDt				:	"",
			oLanDivRcd		:	"",
			func 					:  null
		}
	];
	
	
	/**
	 * 학생검색팝업 관련 설정사항
	 * 설정가능 유형 : 
	 *   1. 인스턴스((/root/시작))
	 *   2. 그리드의 셀 (ghc시작)
	 *   3. 컨트롤 id
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  1. controlId 			: 최초 이벤트의 버튼이나 그리드 id	(필수)
	 *  2. iStudNo 			: 검색조건 학번								(선택) (값이 존재할 경우 4자리 이상)
	 *  3. iStudId 				: 검색조건 학번오브젝트					(선택)
	 *  4. iStudNm 			: 이름        									(선택) (값이 존재할 경우 2자리 이상)
	 *  5. iKeyDate 			: 기준일 										(필수)
	 *  6. iObjDivRcd 		: 객체구분코드 								(선택)
	 *  7. iObjCd 				: 부서코드										(선택)
	 *  8. iObjNm 			: 부서명											(선택) 
	 *  10. iStatRcd			: 학적상태										(선택) 
	 *  11. iStudDivRcd		: 학생구분										(선택) 
	 *  12. oStudId			: 학번오브젝트
	 *  13. oStudNo 			: 학번
	 *  14. oStudNm 		: 이름
	 *  15. oStatNm 			: 학적상태명
	 *  16. oStatRcd 			: 학적상태코드
	 *  17. oProcRslt 		: 진급학기
	 *  18. oProcRsltYear 	: 진급학년
	 *  19. oSaCd 			: 학사부서코드명
	 *  20. oSaNm 			: 학사부서명
	 *  21. oSpCd 			: 이수과정코드명
	 *  22. oSpNm 			: 이수과정명
	 *  23. oOgCd 			: 행정부서코드명
	 *  24. oOgNm 			: 행정부서명
	 *  25. oStudDivRcd		: 학생구분코드
	 *  26. oStudDivNm		: 학생구분명
	 *  27. oBirthday			: 생년월일
	 *  28. oGenderRcd		: 성별코드
	 *  29. oGenderNm		: 성별명
	 *  30. func 				: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 */
	moPObject.moIdsForStdCsrPStSearch = [
	{
		controlId 					: "btnPopStudSearch",
		iStudNo 					: "ipbStudNo",	
		iStudId 						: "",
		iStudNm 					: "",
		iKeyDate 					: "/root/reqList/strKeyDate", 
		iObjDivRcd 				: "",
		iObjCd 						: "",
		iObjNm 					: "",
		iStatRcd 					:"",
		iStudDivRcd				: "",
		oStudId 					: "/root/reqList/strStudId",
		oStudNo 					: "ipbStudNo",
		oStudNm 					: "",
		oStatNm 					: "",
		oStatRcd 					: "",
		oProcRslt 					: "",
		oProcRsltYear 			: "",
		oSaNm						: "",
		oSaCd 						: "",
		oSpNm 					: "",
		oSpCd 						: "",
		oOgNm 					: "",
		oOgCd 						: "",
		oStudDivRcd				: "",
		oStudDivNm				: "",
		oBirthday					: "",
		oGenderRcd				: "",
		oGenderNm				: "",
		func : function() {
			//팝업끝난후  후처리가 필요할때 입력 
			var vsStudId = util.DataMap.getValue(app, "dmReqList", "strStudId");
			if(!ValueUtil.isNull(vsStudId)) {
				util.SelectCtl.selectItem(app, "cbbProcRslt", 0);
				util.SelectCtl.selectItem(app, "cbbNight", 0);
				util.SelectCtl.selectItem(app, "cbbClass", 0);
				util.SelectCtl.selectItem(app, "cbbStatRcd", 0);
			}
		}
	}
	];
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
     * @author Choi In Seong at 2016.08.17
     */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
				
	/**
	 * @desc 화면 온로드
	 * @return 
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onModelConstructDone_extCsrCStudImageBatch = function() {

		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCsrShreg", "frfCsrShreg"]);
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grpData");
		//서브미션 실행 (실패시 cover page)
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if(pbSuccess){
					ExtRepeat.refresh(["rptCsrShreg"]);
					util.Control.redraw(app, ["frfCsrShreg"]);
					util.Control.redraw(app, ["cbbStatRcd", "cbbNight", "cbbClass", "dipKeyDate"]);
			}
		});
	}

   /**
	 * @desc 학생목록 조회버튼 클릭
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onClick_BtnSearch = function() {
		 //작업영역 리피트 변경 내역 체크
		if(!doSearchChk()){
			return false;
		}
		
		if(!util.validate(app, ["ipbSaNm", "dipKeyDate"])){
			return false;
		}
		
		doList(function(pbSuccess) {
			// 조회 : "조회되었습니다." header 메세지 표시
			if (pbSuccess) util.Msg.notify(app, "NLS.INF.M024");
		});
	};

	/**
	 * @desc 학생목록 조회
	 * @param 
	 * @return 
	 * @author Choi In Seong 2016.08.17
	 */
	function doList(poCallBackFunc) {

		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if(pbSuccess){
				util.Control.redraw(app, "grdCsrShreg");
				//프리폼 비활성화 제어
				doCompareFrfEnable();
				
				var vnRptCnt = util.DataSet.getRowCount(app, "dsRptCsrShreg");
				if(vnRptCnt == 0){
					util.Control.reset(app, "frfCsrShreg");
				}
				// 조회 후 콜백함수 수행
				if (util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
			}
		});
	}


   /**
	 * @desc 학생 사진 일괄 업로드 버튼 클릭
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onClick_BtnSave = function() {
		var voCallbackFunc = function(poFileBuilder) {
			var vaFileNm = poFileBuilder.split(",");
			
			if(vaFileNm.length > 2){
				util.Msg.alert("NLS-ERR-M008");
			} else {
				// image upload
				doSave();
			}
		};
		FileUtil.getFileName(true , ['zip'], voCallbackFunc, "", false);
	};
	
	/**
	 * @desc 학생 사진 일괄 업로드
	 *            학생 파일이 들어있는 압축파일을 올린다. ex) 사진명 : 1600001.jpg 
	 * @return 
	 * @author Choi In Seong 2016.08.17
	 */
	function doSave() {
		//strCommand: batchStudImage 
		util.Submit.send(app, "subBatch", function(pbSuccess) {
			
			if(pbSuccess) {
				//업로드 성공건수
				var vnTotCnt = util.DataMap.getValue(app, "dmResProc", "iTotCnt");
				var vnSuccessCnt = util.DataMap.getValue(app, "dmResProc", "iSuccessCnt");
				var vnFailCnt = util.DataMap.getValue(app, "dmResProc", "iFailCnt");
				
				//처리하였습니다.(총:@, 성공:@, 실패:@)
				util.Msg.alert("NLS-CSR-M017", [vnTotCnt, vnSuccessCnt, vnFailCnt]);
				
				//저장성공 메세지 출력
				doList(function(pbSuccessList) {
					// 조회 : "조회되었습니다." header 메세지 표시
					if(pbSuccessList) {
						util.Msg.notify(app, "NLS.INF.M025");
						
						//파일디렉토리경로
						var vsErrorFileDir = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileDir");
						//파일명
						var vsErrorFileNm = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileNm");
						//변환파일명(실제 서버에 저장된 파일명)
						var vsErrorFileChgNm = util.DataMap.getValue(app, "dmErrorFileInfo", "strFileChgNm");
						var vsTmpFilePath = util.DataMap.getValue(app, "dmErrorFileInfo", "strTmpFilePath");
						// 에러파일 다운로드
						if(!(ValueUtil.isNull(vsErrorFileNm) || vsErrorFileNm=="")){
							var voParam = {
										"strFileSubPath" : "",
										"strFileNm" : vsErrorFileChgNm,
										"strOriFileNm" : vsErrorFileNm,
										"strTmpFilePath" : vsTmpFilePath,
										"strCommand" : "fileDownLoad"
							}								
							FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex", voParam);								
								// 에러파일 초기화
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath","");
						} else{
							// 에러파일 초기화
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileDir","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileNm","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strFileChgNm","");
							util.DataMap.setValue(app, "dmErrorFileInfo", "strTmpFilePath","");
							return false;
						}
					}
				});
			}
		});
	}

	/**
	 * @desc 마스터 리피트 상태에 따른 프리폼 비활성화 제어
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	function doCompareFrfEnable() {

		if( (!util.Grid.getIndex(app, "grdCsrShreg"))
			|| util.Grid.getRowState(app, "grdCsrShreg") == cpr.data.tabledata.RowState.DELETED) {
			util.Control.setEnable(app, false, ["frfCsrShreg"]);	
		} else {
			util.Control.setEnable(app, true, ["frfCsrShreg"]);	
		}
	}

	/**
	 * @desc 리피트 rowSelect event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onRowSelect_RptCsrShreg = function() {
		// 리피트 현재 행 파일 경로
		var vsImgSrc = "";
		var strPhoto = util.Grid.getCellValue(app, "grdCsrShreg", "PHOTO_FILE_PATH");
		util.DataMap.setValue(app, "dmReqFileDown", "strPhoto", strPhoto);
		
		// 파일존재여부 메시지 호출 여부
		util.DataMap.setValue(app, "dmReqFileDown", "strMsgYn", "N");
		
		//strCommand: fileExistCheck 
		util.Submit.send(app, "subFileDown", function(pbSuccess) {
			if(pbSuccess) {
				var vsExistYn = util.DataMap.getValue(app, "dmReqFileDown", "strExistYn");
				if (vsExistYn=="N") {
					vsImgSrc = "../../images/imgs/noimages.png";
				} else {
					vsImgSrc = "std.csr.StdCsrImage.ex?strCommand=getStudImage&imgName=" + strPhoto + "&seed=" + Math.random();
				}
				ExtControl.setAttr("imgPhoto_Imp","src",vsImgSrc);
				util.Control.redraw(app, ["frfCsrShreg"]);
				//프리폼 비활성화 제어
				doCompareFrfEnable();
			}
		});
	};
	
	/**
	 * @desc 학과조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onValueChanged_IpbSaCd = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 학과조회 팝업 호출
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onClick_BtnPopSearch = function(sender) {
		doOnClickStdCmnPObjSch(sender);
	}
	
	/**
	 * @desc 학과조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onValueChanged_IpbSaNm = function(sender) {
		doOnChangeStdCmnPObjSch(sender);
	}

	/**
	 * @desc 학생조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onValueChanged_IpbStudNo = function(sender) {
		doOnChangeStdCsrPStSearch(sender);
	}
	
	/**
	 * @desc 학생검색 팝업 호출
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onClick_BtnPopStudSearch = function(sender) {
		doOnClickStdCsrPStSearch(sender);
	};
	
	
	moPage.onLoadImportDone_ImpStdCmnPobjSch = function() {
		setStdCmnPObjSchObjInfo();
	};
	
	/**
	 * @desc 학생사진 개별 업로드
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onClick_BtnUploadStudImg = function() {
		var voCallbackFunc = function(poFileBuilder) {
			var vaFileNm = poFileBuilder.split(",");
			
			if(vaFileNm.length > 2){
				util.Msg.alert("NLS-ERR-M008");
			} else {
				// image upload
				if(ValueUtil.isNull(vaFileNm[0])) return false;
				
				util.DataMap.setValue(app, "dmReqUpload", "strStudId", util.Grid.getCellValue(app, "grdCsrShreg", "STUD_ID"));
				
				//strCommand: saveStudImage 
				util.Submit.send(app, "subUploadStudImg", function(pbSuccess) {
					
					if(pbSuccess) {
						var strPhoto = util.DataMap.getValue(app, "dmReqUpload", "fileName");
						if (!!strPhoto) {
							
							var vsImgName = "std.csr.StdCsrImage.ex?strCommand=getStudImage&imgName=" + strPhoto + "&seed=" + Math.random();
							
							// src 값이 이전과 같을지라도 캐시없이 서버로 새롭게 요청한다
							ExtControl.setAttr("imgPhoto_Imp","src",vsImgName);
							util.Control.redraw(app, ["frfCsrShreg"]);
							util.Grid.setCellValue(app, "grdCsrShreg", "FILE_EXIST_YN", "Y");
						}
					}
				});
			}
		};
		FileUtil.getFileName(true , ['jpg'], voCallbackFunc, "", false);
	};
	
	/**
	 * @desc 학생사진 다운로드
	 * @param
	 * @return void
	 * @author Choi In Seong 2016.08.17
	 */
	moPage.onClick_BtnDownStudImg = function() {
		//파일명
		var strPhoto = util.Grid.getCellValue(app, "grdCsrShreg", "PHOTO_FILE_PATH");
		util.DataMap.setValue(app, "dmReqFileDown", "strPhoto", strPhoto);
		
		//strCommand: fileExistCheck 
		util.Submit.send(app, "subFileDown", function(pbSuccess) {
			if(pbSuccess) {
				//파일 확장자
				var arrStr = strPhoto.split(".");
				var extStr = arrStr[arrStr.length - 1];
				
				//학번
				var strStudNo = util.Grid.getCellValue(app, "grdCsrShreg", "STUD_NO");
				var strFileNm = strStudNo + "." + extStr;
				
				var voParam = {
							"strFileSubPath" :"stdCsrImage",
							"strFileNm" :strPhoto,
							"strOriFileNm" : strFileNm,
							"strTmpFilePath" :"",
							"strCommand" : "fileDownLoad"
				}
				//다운로드 받을 파일 위치, 다운로드받을 파일이름, 프로그래스동작여부(일단 ""), actionUrl
				FileUtil.downloadFile( "/std.cmn.StdCmnFileTransUtil.ex",voParam);
			}
		});
	};
	
	/**
	 * @desc 조회조건 체크
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 08. 10.
	 */
	function doSearchChk() {
		var vsDayNight = util.Control.getValue(app, "cbbNight");
		var vsStatus = util.Control.getValue(app, "cbbStatRcd");
		var vsProcYear = util.Control.getValue(app, "cbbProcRslt");
		var vsClass = util.Control.getValue(app, "cbbClass");
		var vsStudNo = util.Control.getValue(app, "ipbStudNo");
		
		var iSchCnt = 0;
		var iSchCnt2 = 0;

		if(!ValueUtil.isNull(vsDayNight)){
			iSchCnt = iSchCnt +1;
		}
		
		if(!ValueUtil.isNull(vsStatus)){
			iSchCnt = iSchCnt +1;
		}
		
		if(!ValueUtil.isNull(vsProcYear)){
			iSchCnt = iSchCnt +1;
		}
		
		if(!ValueUtil.isNull(vsClass)){
			iSchCnt = iSchCnt +1;
		}
		
		if(!ValueUtil.isNull(vsStudNo)){
			iSchCnt2 = iSchCnt2 +1;
		}

		if (iSchCnt < 2 && iSchCnt2 < 1) {
			util.Msg.alert("NLS-CSR-EXT026"); // 3가지는 필수 입력해야 합니다.
			return false;
		}
		
		return true;
	}
	
	
	moPage.onValueChanged_DipKeyDate = function() {
		//전체권한일시 최상위 부서가 셋팅 되어 있으면 초기화 하지 않음
		var stDeptCd = util.DataMap.getValue(app, "dmReqList", "strSaCd");
		if(moPageInfo.authRngRcd == "CC00102"){
			if(stDeptCd != ExtInstance.getValue("instance('insStdCmnPObjSch')/root/resListObjInfo/strObjCd")){
				util.Control.reset(app, ["ipbSaNm", "ipbSaCd"]);
				util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");
			}
		// 전체권한 이외의 권한일시 자신의 소속 부서가 셋팅되어 있으면 초기화 하지 않음
		}else if(moPageInfo.authRngRcd == "CC00101" || moPageInfo.authRngRcd == "CC00105" || moPageInfo.authRngRcd == "CC00106" || moPageInfo.authRngRcd == "CC00107"){
			if(strSaCd != moUserInfo.asgnDeptCd){
				util.Control.reset(app, ["ipbSaNm", "ipbSaCd"]);
				util.DataMap.setValue(app, "dmReqList", "strObjDivRcd", "");				
			}
		}
		util.Control.reset(app, ["ipbStudNo", "ipbStudId"]);
	}
	return moPage;
};

