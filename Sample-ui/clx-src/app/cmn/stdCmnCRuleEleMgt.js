//공통 모듈 사용
var util = new ComUtil(app);

/*
 * 그룹에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onGrpSearchKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grpSearch = e.control;
	// 엔터키 입력시 조회
	if (e.keyCode == 13) {
		app.lookup("btnSearch").click();
	}

}
/*
 * "" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSearch = e.control;
	// 데이터 변경상태 체크 메시지(기본, 임베디드 앱 존재 할 경우 isChangedFormData())
	if (util.Grid.isModified(app, "grdCmnRuleEle", "CRM")) {
		return false;
	}
	doList(function(pbSuccess) {
		util.Msg.notify(app, "NLS-INF-M024");
	});
}

function doList(poCallBackFunc){
	util.Submit.send(app, "subList", function(pbSuccess){
		if(pbSuccess){
			util.Control.redraw(app, "grdCmnRuleEle");
			if (util.isFunc(poCallBackFunc)) {
				poCallBackFunc(pbSuccess);	
			} 
		}
	});
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){

	util.Submit.send(app, "subOnLoad", function(pbSuccess) {
		if (pbSuccess) {
			util.Control.setFocus(app, "ipbRuleEmtNm");
		}
	}, true);
}

/*
 * 사용자 정의 컨트롤에서 save 이벤트 발생 시 호출.
 */
function onGrid_ids_btn1Save(/* cpr.event.CUIEvent */ e){
	/** 
	 * @type udc.com.grid_IDS_Btn
	 */
	var grid_ids_btn1 = e.control;
	doSave();
}

function doSave() {

	// 그리드 변경사항 체크
	if(!util.Grid.isModified(app, "grdCmnRuleEle","MSG")){
		return false;
	}
	//그리드 유효성 검증
	if(!util.validate(app, "grdCmnRuleEle")){
		return false;
	}
	
	util.Submit.send(app, "subSave", function(pbSuccess) {
		if (pbSuccess) {
			doList(function(pbListSuccess) {
				if (pbListSuccess) {
					// "갱신된 데이터가 조회되었습니다." 메시지 출력
					util.Msg.notify(app, "NLS-INF-M025");
				}
			});
		}
	});
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onGdIpbRuleEmtIdValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var gdIpbRuleEmtId = e.control;
	
	var vnIdx = util.Grid.getIndex(app, "grdCmnRuleEle");
	var vsRuleEmtId = util.Grid.getCellValue(app, "grdCmnRuleEle", "RULE_EMT_ID", vnIdx);

	if(!ValueUtil.isNull(vsRuleEmtId)){
		//ValueUtil.checkType("AN", vsRuleEmtId);
		//위에 공통함수 사용을 하면 숫자값만 제외되고 한글과 영문자는 실행 됨 
		var data = vsRuleEmtId.toUpperCase();
		for ( var i=0; i < data.length; i++ ) {
			if (( data.charCodeAt(i) < 48 || data.charCodeAt(i) > 57)&& ( data.charCodeAt(i) != 32)) {
				if ( data.charCodeAt(i) < 65 || data.charCodeAt(i) > 90 ) {
					//"룰ID는 영문자와 숫자로만 구성할 수 있습니다. 다시 입력해주세요."메시지 출력
					util.Msg.warn("M219");
					//룰요소ID value값 초기화
					util.Grid.setCellValue(app, "grdCmnRuleEle", "RULE_EMT_ID", "", vnIdx);

					util.Control.redraw(app, "gdIpbRuleEmtId");
					
					util.Control.setFocus(app, "gdIpbRuleEmtId");
					
					return false;
				}
			}
		}
	}
}
