//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPExhPopup.xtm"/>


var stdCsrPExhPopup = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	//팝업 오픈시 조회가능여부
	var mbSearchYn = true;
		
	moPObject.moStdCsrPExhPopup = {
		// 팝업 작동 내부사용
		controlId 						: "",			//  최초 이벤트의 버튼이나 그리드 id
		openedByChange 			: false,		
		skipOnChange 				: false,
		// 선택가능 범위를 제한함.
		KeyDate                		: "",
		StDt								: "",
		EndDt							: "",
		pgmCd 							: "", 		//교환프로그램 코드 
		pgmNm 						: "", 		//교환프로그램명 
		pgmDivRcd 					: [], 	//["CT80101","CT80102","CT80103"],
		pgmTypeRcd 				: [],	//["CT80301"],
		// 선택열 결과 리턴
		Result : {
			EXH_PGM_CD 				: "",
			EXH_PGM_NM 				: "",
			EXH_PGM_DIV_RCD 		: "",
			EXH_PGM_DIV_NM		 	: "",
			EXH_PGM_TYPE_RCD 	: "",
			EXH_PGM_TYPE_NM		: "",
			PGM_MIN_TERM			: "",
			PGM_MAX_TERM 			: "",
			FIRSR_DIV_RCD 			: "",
			FIRSR_DIV_NM				: "",
			TERM_UNIT_RCD 			: "",
			TERM_UNIT_NM			: "",
			REF_KEY 						: ""
		}
	};

	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 7. 8.
	 */
	moPage.onModelConstructDone_StdCsrPStSearch = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("rptCsrExhPgm");
		//검색조건 초기 설정
//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearch", "grp_rptCsrExhPgm");
		//호출한 페이지에서 파라미터 받기.
		doParentGet();
		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc 부모창에서 보낸 변수 받기
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 7. 8.
	 */
	function doParentGet() {
		if(ExtPopUp.isPopUp()) {
			// 호출한 페이지에서 파라미터 받기.													
			var voStdCsrPExhPopup =  ExtPopUp.getParentVal("moStdCsrPExhPopup");
			// 파라미터  값복사 (deep copy)
			for (var key in voStdCsrPExhPopup) {
				if (key == "Result") {
					// 결과 값은 복사하지 않음.
					continue;
				}
				moPObject.moStdCsrPExhPopup [key] = voStdCsrPExhPopup [key];
			}
			// 팝업이 뜬후에는 false로 고침.
			voStdCsrPExhPopup.openedByChange = false;
		}
	}
	
	/**
	 * @desc 받아온 변수 조회조건에 셋팅
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 7. 8.
	 */
	function doOnLoad() {
		
		// 파라미터 받아서 초기 검색조건 세팅.
		var voParam = moPObject.moStdCsrPExhPopup;
		
		//pgmCd : "", //교환프로그램 코드
		if (!ValueUtil.isNull(voParam.pgmCd)) {
			util.Control.setValue(app, "ipbExhPgmCd", voParam.pgmCd);
		}
		
		//pgmNm : "", //교환프로그램명 
		if (!ValueUtil.isNull(voParam.pgmNm)) {
			util.Control.setValue(app, "ipbExhPgmNm", voParam.pgmNm);
		}
		
		//날짜
		if (!ValueUtil.isNull(voParam.StDt)) {
			util.DataMap.setValue(app, "dmReqKey", "strKeyDate",  voParam.StDt);
		}
		
		// 서브미션 호출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess){
			if (pbSuccess) {
				util.Control.redraw(app, ["cbbExhPgmDivRcd", "cbbExhPgmTypeRcd"]);
				
				if (voParam.pgmDivRcd) {
					//교환프로그램 구분 
					if (typeof (voParam.pgmDivRcd) == "string") {
						voParam.pgmDivRcd = [voParam.pgmDivRcd];
					} else {
						var vaTempArray = new Array();
						var vsTemp = "";
						for (var i = 0; i < voParam.pgmDivRcd.length; i++) {
							vaTempArray.push(voParam.pgmDivRcd [i]);
							vsTemp += voParam.pgmDivRcd [i] + ",";
						}
						voParam.pgmDivRcd = vaTempArray;
					}
					
					if (voParam.pgmDivRcd.length == 1) {
						util.Control.setValue(app, "cbbExhPgmDivRcd", voParam.pgmDivRcd [0]);
						util.Control.setVisible(app, false, "ipbExhPgmDivRcd");
					}else if (voParam.pgmDivRcd.length == 0) {
						util.Control.setVisible(app, false, "ipbExhPgmDivRcd");
					}else{
						util.DataMap.setValue(app, "dmReqKey", "strPgmDiv", vsTemp.substring(0 , vsTemp.length - 1));
						util.Control.setVisible(app, true, "ipbExhPgmDivRcd");
					}
					
					if(!ValueUtil.isNull(voParam.pgmDivRcd)){
						util.Control.setEnable(app, false, ["cbbExhPgmDivRcd"]);	
					}
				}
				
				var vsPgmDiv = util.DataMap.getValue(app, "dmReqKey", "strPgmDiv");
				
				 var vaObjDivRcd =  vsPgmDiv.split(",");
				 var vsTObjDivRcd = "";
				 for(var o = 0 ; o < vaObjDivRcd.length ; o++){
					  vsTObjDivRcd += ExtControl.getControl("cbbExhPgmDivRcd").getLabelFromValue(vaObjDivRcd[o]) + ",";
				 }
				 
				util.Control.setValue(app, "ipbObjDivRcd", vsTObjDivRcd.substring(0 , vsTObjDivRcd.length -1));
					
					
				//교환프로그램 유형코드 pgmTypeRcd
				if (voParam.pgmTypeRcd) {
					if (typeof (voParam.pgmTypeRcd) == "string") {
						voParam.pgmTypeRcd = [voParam.pgmTypeRcd];
					} else {
						var vaTempArray = new Array();
						var vsTempType = "";
						for (var i = 0; i < voParam.pgmTypeRcd.length; i++) {
							vaTempArray.push(voParam.pgmTypeRcd [i]);
							vsTempType += voParam.pgmDivRcd [i] + ",";
						}
						voParam.pgmTypeRcd = vaTempArray;
					}
					
					if (voParam.pgmTypeRcd.length == 1) {
						util.Control.setValue(app, "cbbExhPgmTypeRcd", voParam.pgmTypeRcd [0]);
						util.Control.setVisible(app, false, "ipbExhPgmTypeRcd");
					}else if (voParam.pgmTypeRcd.length == 0) {
						util.Control.setVisible(app, false, "ipbExhPgmTypeRcd");
					}else{
						util.DataMap.setValue(app, "dmReqKey", "strPgmType", vsTemp.substring(0 , vsTemp.length - 1));
						util.Control.setVisible(app, true, "ipbExhPgmTypeRcd");
					}
					
					if(!ValueUtil.isNull(voParam.pgmTypeRcd)){
						util.Control.setEnable(app, false, ["cbbExhPgmTypeRcd"]);	
					}
				}
					
				var vsPgmType = util.DataMap.getValue(app, "dmReqKey", "strPgmType");
				
				 var vaObjTypeRcd =  vsPgmType.split(",");
				 var vsTObjTypeRcd = "";
				 for(var o = 0 ; o < vaObjTypeRcd.length ; o++){
					  vsTObjTypeRcd += ExtControl.getControl("cbbExhPgmTypeRcd").getLabelFromValue(vaObjTypeRcd[o]) + ",";
				 }
				 
				util.Control.setValue(app, "ipbExhPgmTypeRcd", vsTObjTypeRcd.substring(0 , vsTObjTypeRcd.length -1));
					
					
				// 교환프로그램코드, 명이 입력되어 있는 경우 바로 검색 실행
				if (voParam.pgmCd || voParam.pgmNm) {
					util.Header.clickSearch(app);
				}
			}
		});
	}
	
	/**
	 * @desc 교환프로그램 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 7. 8.
	 */
	function doList() {
		
		var voParam = moPObject.moStdCsrPExhPopup;
		
		util.DataMap.setValue(app, "dmReqKey", "strStDt", voParam.StDt);
		util.DataMap.setValue(app, "dmReqKey", "strEndDt", voParam.EndDt);
		
		//strCommand: list 
		util.Submit.send(app, "subList", function(pbSuccess){
			if (pbSuccess) {
				util.Control.redraw(app, "grdCsrExhPgm");
				
				var vnCnt = util.Grid.getRowCount(app, "grdCsrExhPgm");
				if(vnCnt == 0)	util.Msg.notify(app, "NLS.WRN.M005"); // 조회된 내역이 없습니다.
				else util.Msg.notify(app, "NLS.INF.M024"); // 조회되었습니다.
			}
		});
	}
	
	/**
	 * @desc 조회 버튼 클릭
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 7. 8.
	 */
	moPage.onClick_BtnSearch = function() {
		doList();
	};
	
	/**
	 * @desc 선택 행의 교환프로그램 정보 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 7. 8.
	 */
	moPage.onRowDoubleClick_RptCsrShreg = function() {
		doCloseOk();
	};
	
	/**
	 * @desc 교환프로그램정보 반환 이벤트
	 * @param 
	 * @return boolean 데이터 존재 여부
	 * @author Choi In Seong 2016. 7. 8.
	 */
	function doCloseOk() {
		// 선택된 데이터가 없을 시 
		if(ValueUtil.isNull(util.Grid.getCheckOrSelectedRowIndex(app, "grdCsrExhPgm"))){
			util.Msg.alert("NLS-WRN-M008"); //선택된 데이터가 없습니다.
			return false;
		}
		//선택된 행
		var vnIdx = util.Grid.getIndex(app, "grdCsrExhPgm");
		
