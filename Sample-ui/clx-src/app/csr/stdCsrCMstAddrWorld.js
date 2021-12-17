//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./stdCsrCMstAddrWorld.xtm"/>


var stdCsrCMstAddrWorld = function() {
	var moPage = new Page();
	var moPObject 	= new PObject();
		
	var msStudId = "";
	var msUseTabNm = "";
	
	/**
	 * 우편번호검색팝업 관련 설정사항
	 * 각 변수별 설명
	 *  iXXX : 팝업으로 input 전달될 파라미터
	 *  oXXX : 팝업에서 선택한 값을 받을 컬럼 아이디
	 *  [IN]
	 *   1. controlId					: (필수) 최초 이벤트의 버튼id
	 *  [OUT]
	 *  2. oZipCode					: 우편번호
	 *  3. oZipSeq					: 우편일련번호
	 *  4. oBdMno                    : 건물번호
	 *  5. oAddr						: 주소
	 *  6. func						: 팝업에서 선택한 값을 받은 후 추가 로직이 필요한 경우 함수 작성
	 * @member impStdCmnPZipSearch
	 * @type Array
	 * @author Choi In Seong at 2016. 6. 20
	 */ 
	moPObject.moIdsForStdCmnPZipSearch = [
		 { 
			 controlId					: "btnPopZipcodeSearch",		//(필수)우편번호검색
			 oZipCode					: "ipbFrfZipcode",	//리턴 우편번호
			 oAddr						: "ipbFrfAddr1",		//리턴 주소
			 oAddrDtl					: "ipbFrfAddr2",		//리턴 주소
			 func				 			: null
		 }
	 ];
	
	moPage.onLoadImportDone_impSbpHeader = function() {
		doSbpHeaderOnLoad();
	};
	
	moPage.onModelConstructDone_StdCsrCMstEntr = function() {
		doOnLoad();
	};
	
	/**
	 * @desc 프리폼 변경여부 반환
	 * @param 
	 * @return boolean 변경여부
	 * @author Choi In Seong 2016. 6. 20
	 */
	function doCheckDataChange() {
		if(util.Grid.isModified(app, ["grdCmnAddr"], "CRM") ){
			return false;
		}else{
			return true;
		}
	};
	
	/**
	 * @desc doOnLoad 화면 초기화
	 * @param 
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	function doOnLoad(){

//TO-BE: <ExtGroup.initSearchBox> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtGroup.initSearchBox("grpSearchAddr", ["grp_rptCmnAddr"]);
		//리피트 초기화
//TO-BE: <ExtRepeat.init> 전환작업시 불필요하여 주석처리함(삭제 필요)(2020-12-21 : SULMOIHO)
//		ExtRepeat.init(["rptCmnAddr", "frfCmnAddr"]);

		//메인 프레임에서 학생의 id를 받아 해당 기본정보 추출
		//strCommand: onLoad 
		util.Submit.send(app, "subOnLoad", function(pbSuccess) {
			
				if (pbSuccess) {
					
					// 부모멤버변수에담긴학번받음
					msStudId = moPage.parent.moParentObj.studId;
					msUseTabNm = moPage.parent.moParentObj.USE_TAB_NM;
					
					// 기준일자 셋팅(현재일자)
					util.Control.setValue(app, "dipStdDt", util.DataMap.getValue(app, "dmResOnLoad", "keyDt"));
					
					util.Control.redraw(app, ["frfCmnAddr", "cbbSchAddrPrpDivRcd", "dipStdDt", "cbbFrfNatRcd"]);
					util.Control.redraw(app, ["cbbFrfNatRcd"]);
					
					if (ValueUtil.isNull(msStudId)) {
						util.coverPage(app);
						return false;
					}else{
						//LIST CALL 
						util.Header.clickSearch(app);
					}
				}
			}
		);
	};
	
	/**
	 * @desc 해당 학생의 기본정보 데이터를 가져온다.
	 * @param poFunc 콜백함수
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	function doList(poFunc) {
		
		var vsPrpDivRcd = util.Control.getValue(app, "cbbSchAddrPrpDivRcd");

		util.DataMap.setValue(app, "dmReqList", "strStudId", msStudId);
		util.DataMap.setValue(app, "dmReqList", "strUseTabNm", msUseTabNm);
		util.DataMap.setValue(app, "dmReqList", "strPrpDivRcd", vsPrpDivRcd);
		
		// submission call 
		//strCommand: list 
		util.Submit.send(app, "subList",  function(pbSuccess) {
			if(pbSuccess){
				//화면에 rebuild
				util.Control.redraw(app, ["rptCmnAddr"]);
				doCompareFrfEnable();
				// 조회 내역이 없으면 프리폼 초기화
				var vnRptCnt = util.DataSet.getRowCount(app, "dsRptCmnAddr");
				if(vnRptCnt == 0){
					util.Control.reset(app, "frfCmnAddr");
				}
				util.Control.redraw(app, "lblRowCnt_rptCmnAddr");
			}
			
			if(util.isFunc(poFunc)) poFunc(pbSuccess);
		});
			
	};
	
	/**
	 * @desc 주소정보 신규
	 * @param
	 * @return void
	 * @author Choi In Seong 2016. 6. 20
	 */
	moPage.onClick_BtnNew = function() {
		
		var vsPrpDivRcd = util.Control.getValue(app, "cbbSchAddrPrpDivRcd");
		var vsPath = "/root/resList/rptCmnAddr/row[ child:: ADDR_PRP_DIV_RCD ='"+vsPrpDivRcd+"' and UPT_STATUS != 'N' ]";
