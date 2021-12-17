//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCssCScalStudCntiStud.xtm"/>


var stdCssCScalStudCntiStud = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	/* 
	 * 장학금 검색팝업 관련 설정사항
	 */
	moPObject.moIdsForStdCssPScalFeeSch = [
	{
		controlId 	: "rdBtnScalFeeNm",
		iCd 		: null,
		iNm 		: "rdIpbScalFeeNm",
		iObjDivRcd 	: "CC009SS",
		iLanDivRcd 	:  "/root/resList/strDefLanDivRcd",
		iKeyDate	: null,
		iCntiScalYn : "Y",
		oScalFeeCd 	: "rdIpbScalFeeCd",
		oScalFeeNm 	: "rdIpbScalFeeNm",
		oObjDivRcd 	: "rdIpbSsObjDivRcd",
		oPmntCnt	: "rdIpbPmntCnt",
		func : function() {}
	}
	];

	/**
	 * doOnLoad  화면 오픈 시 서브미션 
	 * @member stdCssPFndPop
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */
	function doOnLoad(){
		//리피트 초기 설정
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCssCntiScalStud"]);
		
		// 부모창에 있는 값 셋팅
		var voParentInfo = moPage.parent.moCmnInfo;
		util.DataMap.setValue(app, "dmSchedule", "strSchYearRcd", voParentInfo.schYearRcd);
		util.DataMap.setValue(app, "dmSchedule", "strSmtRcd"	  , voParentInfo.smtRcd);
		util.DataMap.setValue(app, "dmSchedule", "strStDt"	  , voParentInfo.stDt);
		util.DataMap.setValue(app, "dmSchedule", "strEndDt"	  , voParentInfo.endDt);
		util.DataMap.setValue(app, "dmReqKey", "strStudId"	 		  , voParentInfo.studId);
		
		// 조회
		doList(function(pbSuccess) {
			if (pbSuccess){
				// "조회되었습니다."
				this.setParentMsg(NLS.INF.M024);		
			}
		});
	};

	/**
	 * @desc 연속장학생을 조회한다.
	 * @param poCallBackFunc 콜백 함수
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doList(poCallBackFunc) {
		
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			if (pbSuccess) {
				util.Control.redraw(app, ["rptCssCntiScalStud"]);
			}
			
			if(util.isFunc(poCallBackFunc)) poCallBackFunc(pbSuccess);
		});
	};
	
	/**
	 * onClick_BtnNew 신규버튼 클릭이벤트
	 * @member stdCssPFndPop
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onClick_BtnNew = function(){
		var vnNewRow = util.Grid.insertRow(app, "grdCssCntiScalStud", "rdDipStDt");
		util.Grid.setCellValue(app, "grdCssCntiScalStud", "STUD_ID", util.DataMap.getValue(app, "dmReqKey", "strStudId"), vnNewRow);
	};
	
	/**
	 * @desc 삭제버튼 클릭 이벤트
	 * @param   
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_BtnDel = function() {
		var vnRowIdx = util.Grid.getCheckOrSelectedRowIndex(app, "grdCssCntiScalStud");
		if(ValueUtil.isNull(vnRowIdx)){
			var vsMsgParam = util.Grid.getTitle(app, "grdCssCntiScalStudCssCntiScalStud");
			// "@(을)를 선택해주세요" 메시지 출력
			util.Msg.alert("NLS-INF-M045", [vsMsgParam]);
			return;
		}	
		
		// 장학생여부
		// 장학생테이블에 해당 학번/장학금코드/장학금객체코드 에 해당하는 자료가 있는 경우 삭제불가
		var vsScalStudYn = util.Grid.getCellValue(app, "grdCssCntiScalStud", "SCAL_STUD_YN", vnRowIdx);
		if (vsScalStudYn != "Y") {
			util.Grid.deleteRow(app, "grdCssCntiScalStud");
		} else {
			// 학기 장학생자료가 존재하는 장학금입니다. 삭제 불가능합니다.
			util.Msg.alert("NLS-CSS-M090");
		}
	};
	
	/**
	 * onClick_BtnNew 작업취소버튼 클릭이벤트
	 * @member stdCssPFndPop
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onClick_BtnRestore = function(){
		util.Grid.restoreRow(app, "grdCssCntiScalStud");
	};

	 /**
	 * onClick_BtnSave 작업저장버튼 클릭이벤트
	 * @member stdCssPFndPop
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */
	moPage.onClick_BtnSave = function(){
		// 변경사항 체크
		if(!util.Grid.isModified(app, ["grdCssCntiScalStud"], null)){
			moPage.setParentMsg(NLS.WRN.M007);
			return false;
		}
		
		// Validation Check
		if(!util.validate(app, ["grdCssCntiScalStud"])) return false;
		
		// 외부지급횟수 체크
		if(!doCheckPmntCnt()) return false;
		
		// 저장서브미션
		//strCommand: save 
		util.Submit.send(app, "subSave", function(pbSuccess) {
					
			if(pbSuccess){
				
				var vsUnValidScalFeeCd = util.DataMap.getValue(app, "dmResList", "unValidScalFeeCd");
                var vbUnValidMsg = util.DataMap.getValue(app, "dmResList", "unValidMsg");
                if (!ValueUtil.isNull(vsUnValidScalFeeCd)) {
					var vnIdx = util.Grid.selectRowByCondition(app, "grdCssCntiScalStud" , "/root/resList/rptCssCntiScalStud/row/SCAL_FEE_CD", "==", vsUnValidScalFeeCd, 0);

					ExtRepeat.setColFocus("rptCssCntiScalStud", Number(vnIdx) + 1, "rdDipStDt");
					// 연속장학생의 @1번째 데이타에서 @2
					util.Msg.alert("NLS-CSS-M065", [Number(vnIdx) + 1, vbUnValidMsg]);
					return false;					
                } else {
                     //저장성공 메세지 출력
					doList(function(pbSuccessList) {
						// "갱신된 데이터가 조회되었습니다."
						if(pbSuccessList) {
							this.setParentMsg(NLS.INF.M025);
						}
					});
                }
			}	
		});
	};

	/**
	 * doCheckPmntCnt 외부지급횟수 체크
	 * @member stdCssPFndPop
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	function doCheckPmntCnt(){
		for (var i = 1; i <= util.Grid.getRowCount(app, "grdCssCntiScalStud"); i++) {
				
			var vbPmntCnt = Number(util.Grid.getCellValue(app, "grdCssCntiScalStud", "PMNT_CNT", i));
			var vbOutPmntCnt = Number(util.Grid.getCellValue(app, "grdCssCntiScalStud", "OUT_PMNT_CNT", i));
			var vbUptStatus = util.Grid.getRowState(app, "grdCssCntiScalStud", i);
			
			if(vbUptStatus != "delete" && (!ValueUtil.isNull(vbOutPmntCnt))){
				if(vbPmntCnt < vbOutPmntCnt){
					// 연속장학생의 @1번째 데이타에서 외부지급횟수는 지급횟수보다 클 수 없습니다
                    util.Msg.alert("NLS-CSS-M062", [i]);
					ExtRepeat.setColFocus("rptCssCntiScalStud", i, "rdIpbOutPmntCnt");
                    return false;
                }
			}
		}
		return true;
	};
	
	/**
	 * onValueChanged_RptCssCntiScalStud 연속장학생 
	 *	- 장학금변경 : 장학금검색
	 *  - 시작일자, 종료일자 유효성 체크
	 * @member stdCssPFndPop
	 * @type void
	 * @author AeyoungLee 2016. 2. 23.
	 */	
	moPage.onValueChanged_RptCssCntiScalStud = function(sender, psColDiv){
		
		var vnIdx = util.Grid.getIndex(app, "grdCssCntiScalStud");
		var vsStDt = util.Grid.getCellValue(app, "grdCssCntiScalStud", "ST_DT", vnIdx);
        var vsEndDt = util.Grid.getCellValue(app, "grdCssCntiScalStud", "END_DT", vnIdx);
		
		if(psColDiv == "SCAL_FEE_NM") {
            if(doSetCiiDt()) doOnChangeStdCssPScalFeePop(sender);;
            
        } else if(psColDiv == "ST_DT"){
            if ((!ValueUtil.isNull(vsStDt)) && (!ValueUtil.isNull(vsEndDt))){
                if(vsStDt > vsEndDt){
					util.Grid.setCellValue(app, "grdCssCntiScalStud", "ST_DT", null, vnIdx);
					// 시작일이 종료일 보다 클 수 없습니다
                    util.Msg.alert("NLS-CSS-M063");
                }
            }
                    
        } else if(psColDiv == "END_DT"){
            if ((!ValueUtil.isNull(vsStDt)) && (!ValueUtil.isNull(vsEndDt))){
                if(vsStDt > vsEndDt){
					util.Grid.setCellValue(app, "grdCssCntiScalStud", "ST_DT", null, vnIdx);
					// 시작일이 종료일 보다 클 수 없습니다
                    util.Msg.alert("NLS-CSS-M063");
                }
            }
        }
		
	};
	
	/**
	 * rowChage_RptCssCntiScalStud - 연속장학생 로우체인지 이벤트
	 * @desc 신규일 경우에만 장학금검색 되도록 함.
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.rowChage_RptCssCntiScalStud = function(){
		var vnIdx = util.Grid.getIndex(app, "grdCssCntiScalStud");
		var vsStatus = util.Grid.getRowState(app, "grdCssCntiScalStud", vnIdx);
		
		if(vsStatus == "insert"){
			util.Control.setReadOnly(app, false, ["rdIpbScalFeeNm","rdBtnScalFeeNm"]);	
		}else{
			util.Control.setReadOnly(app, true, ["rdIpbScalFeeNm","rdBtnScalFeeNm"]);	
		}	
		
	};
	
	/**
	 * @desc 장학금검색시 기준일자 셋팅
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doSetCiiDt() {
		var vnIdx = util.Grid.getIndex(app, "grdCssCntiScalStud");
		var vsStDt = util.Grid.getCellValue(app, "grdCssCntiScalStud", "ST_DT", vnIdx);
        var vsEndDt = util.Grid.getCellValue(app, "grdCssCntiScalStud", "END_DT", vnIdx);
		
		if(ValueUtil.isNull(vsStDt)){
            util.Msg.alert("NLS-CSS-M066");
			util.Grid.setCellValue(app, "grdCssCntiScalStud", "SCAL_FEE_CD", null, vnIdx);
			util.Grid.setCellValue(app, "grdCssCntiScalStud", "SCAL_FEE_NM", null, vnIdx);
			util.Grid.setCellValue(app, "grdCssCntiScalStud", "SS_OBJ_DIV_RCD", null, vnIdx);
			util.Grid.setCellValue(app, "grdCssCntiScalStud", "PMNT_CNT", null, vnIdx);
			
			ExtRepeat.setColFocus("rptCssCntiScalStud", vnIdx, "rdDipStDt");
            return false;
			
        } else if(ValueUtil.isNull(vsEndDt)){
            util.Msg.alert("NLS-CSS-M067");
            util.Grid.setCellValue(app, "grdCssCntiScalStud", "SCAL_FEE_CD", null, vnIdx);
			util.Grid.setCellValue(app, "grdCssCntiScalStud", "SCAL_FEE_NM", null, vnIdx);
			util.Grid.setCellValue(app, "grdCssCntiScalStud", "SS_OBJ_DIV_RCD", null, vnIdx);
			util.Grid.setCellValue(app, "grdCssCntiScalStud", "PMNT_CNT", null, vnIdx);
			
			ExtRepeat.setColFocus("rptCssCntiScalStud", vnIdx, "rdDipEndDt");
            return false;
			
        } else {
			moPObject.moIdsForStdCssPScalFeeSch[0].iKeyDate = vsEndDt;
            return true;
        }
	};
	
	/**
	 * @desc 장학금검색 버튼 클릭 이벤트
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.onClick_RdBtnScalFeeNm = function(sender) {
		if(doSetCiiDt()) {
			doOnClickStdCssPScalFeePop(sender);
		}
	};
	
	/**
	 * @desc 부모 헤더에 메세지 뿌리기
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	moPage.setParentMsg = function(psMsgCode) {
		util.Msg.notify(app, psMsgCode);	
	};
	
	/**
	 * @desc 변경사항체크 - 부모창에서 호출용
	 * @param psCtrlId 
	 * @param psMsgCode 
	 * @return void
	 * @author Aeyoung Lee 2016. 3. 3.
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCssCntiScalStud"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	return moPage;
};
