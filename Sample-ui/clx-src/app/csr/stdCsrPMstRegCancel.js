//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrPMstRegCancel.xtm"/>


var stdCsrPMstRegCancel = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();

	/**
	 * @desc onModelConstructDone 이벤트
	 * @param 
	 * @return void
	 * @author	 Choi In Seong 2016. 2. 2.
	 */
	moPage.onModelConstructDone_StdCsrPMstRegCancel = function() {
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init("frfCsrEnroll");

		//화면 온로드 서브미션 호출
		doOnLoad();
	};
	
	/**
	 * @desc 학적등록정보 조회
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doOnLoad() {
		var voRegiObj = ExtPopUp.getParentVal("moRegiObj");
		// 부모멤버변수에담긴학번받음

		var vsStudId 			= voRegiObj["studId"];
		var vsStudNo 		= voRegiObj["studNo"];
		var vsHeaderStud 	= voRegiObj["headerStud"];
		
		util.DataMap.setValue(app, "dmReqKey", "strStudNo", vsStudNo);
		util.DataMap.setValue(app, "dmReqKey", "strStudInfo", vsHeaderStud);
		util.DataMap.setValue(app, "dmReqKey", "strStudId", vsStudId);
		
		// 등록정보에서 가져온 학번과 학생 정보 화면에 매핑 
		util.Control.setValue(app, "optStudNo", vsStudNo);
		util.Control.setValue(app, "optStud", vsHeaderStud);
		
		//키값에 매핑되는 학생의 등록정보 GET, 학년도 학기의 시작일 GET, 취소사유 List
		//등록정보 
		var vsEnrollDiv 		= voRegiObj["enrollDivRcd"];
		var vsSpDiv 			= voRegiObj["spDivRcd"];
		var vsRegStatRcd 	= voRegiObj["regStatRcd"];
		var vsSaCd 			= voRegiObj["saCd"];
		var vsSpCd 			= voRegiObj["spCd"];
		var vsProcDt 			= voRegiObj["procDt"];
		
		util.DataMap.setValue(app, "dmReqKey", "strStudId", vsStudId);
		util.DataMap.setValue(app, "dmReqKey", "strEnrollDivRcd", vsEnrollDiv);
		util.DataMap.setValue(app, "dmReqKey", "strSpDivRcd", vsSpDiv);
		util.DataMap.setValue(app, "dmReqKey", "strRegStatRcd", vsRegStatRcd);
		util.DataMap.setValue(app, "dmReqKey", "strSaCd", vsSaCd);
		util.DataMap.setValue(app, "dmReqKey", "strSpCd", vsSpCd);
		util.DataMap.setValue(app, "dmReqKey", "strProcDt", vsProcDt);
		
		//학년도 학기의 시작일 
		var vsYear 			= voRegiObj["schYearRcd"];
		var vsSmt 				= voRegiObj["smtRcd"];
		
		util.DataMap.setValue(app, "dmReqKey", "strSchYearRcd", vsYear);
		util.DataMap.setValue(app, "dmReqKey", "strSmtRcd", vsSmt);
		
		// onLoad submission call
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if(pbSuccess){
				util.Control.redraw(app, ["frfCsrEnroll"]);
				
				var vsEnrollStat = util.FreeForm.getValue(app, "frfCsrEnroll", "REG_STAT_RCD");
				// 등록상태가 아니면 취소 불가
				if (vsEnrollStat != "CT109ENRO") {
					var vsEnrollStatNm =  NLS.CSR.M114; //등록
					var vsRegiCls = NLS.CSR.M054; //취소
					util.Msg.alert("NLS-CSR-M002", [vsEnrollStatNm, vsRegiCls]);
					ExtPopUp.closeLayeredPopup("onClick_BtnSearch");
				}
					
				// 종료일은 학년도학기의 시작일로 setting 
				var vsStDt = util.DataMap.getValue(app, "dmResOnLoad", "stDt");
				util.FreeForm.setValue(app, "frfCsrEnroll", "END_DT", vsStDt);
				
				// 등록상태를 취소로 setting
				util.FreeForm.setValue(app, "frfCsrEnroll", "REG_STAT_RCD", "CT109CANC");
				
				//취소TEXT세팅 
				var vsStatNm = page.doInitStatNm("CT109CANC");
				util.FreeForm.setValue(app, "frfCsrEnroll", "REG_STAT_NM", vsStatNm);
				
				// 2012.01.10 취소일자(CANCEL_DT)컬럼추가에 의한 로직 추가, 취소일은 현재일자로 setting 
				var vsCanDt = util.DataMap.getValue(app, "dmResOnLoad", "canDt");
				util.FreeForm.setValue(app, "frfCsrEnroll", "CANCEL_DT", vsCanDt);
				
				util.Control.redraw(app, ["cbbFrfEnrollCancelRsnRcd"]);
			} else {
				//2013.12.16. onLoad실패시 팝업닫기
				ExtModel.dispatch("btnCloseCancel", "DOMActivate");
			}
		});
	}

	/**
	 * @desc 등록취소코드 명 반환
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 01. 12.
	 */
	function doInitStatNm(psCd) {
		//등록상태 취소 초기값 세팅 
		var vnSize = util.DataSet.getRowCount(app, "dsStatList");
		var vsCdNm = "";
		if(vnSize>0){
			vsCdNm = ExtInstance.getValue("/root/resOnLoad/statList/row", "CD_NM", "child::CD ='"+psCd+"'");
		}
		return vsCdNm;
	};
	
	/**
	 * @desc 학적등록 저장
	 * @param 
	 * @return boolean
	 * @author Choi In Seong 2016. 2. 2.
	 */
	function doSave() {
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {
			if (pbSuccess) {
				// 저장완료시 성공이면, 팝업 닫고, 기본정보 Refresh.
				//팝업창 닫기
				ExtPopUp.closeLayeredPopup("doPopCallList");
			}
		});
	};
	
	
	/**
	 * @desc 학적등록 저장 버튼 event
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnSave = function() {
		
		// 리피터 변경사항 체크
		if(!util.Grid.isModified(app, ["frfCsrEnroll"], "MSG")){
			return false;
		}
		
		//리피트 validation check
		if(!util.validate(app, "frfCsrEnroll")){
			return false;
		}
		
		doSave();
	};
	
	/**
	 * @desc 선택닫기 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnCloseOk = function() {
		doCloseOk();
	};
	
	/**
	 * @desc 헤더 온로드 실행
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	};
	
	/**
	 * @desc 화면닫기 버튼 클릭
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 2. 2.
	 */
	moPage.onClick_BtnCloseCancel = function() {
		app.close();
	};

	return moPage;
};
