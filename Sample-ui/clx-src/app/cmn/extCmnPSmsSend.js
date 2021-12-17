//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCmnPSmsSend.xtm"/>


var extCmnPSmsSend = function() {
	var moPage = new Page();
	//임포트용 데이터 통신 오브젝트
	var moPObject = new PObject();
	
	var moExtCmnSender;
	
	/**
	 * @desc  Header Import onLoad
	 * @return void
	 * @author Park. ju wan 2016. 2. 11.
	 */
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	/**
	 * @desc  ModelConstructDone onLoad
	 * @return void
	 * @author Park. ju wan 2016. 2. 11.
	 */
	moPage.onModelConstructDone_ExtCmnPSmsSend = function() {
		
		moExtCmnSender =  ExtPopUp.getParentVal("moExtCmnSender");
		
		util.DataMap.setValue(app, "dmReqKey", "strEmailDivCd", moExtCmnSender.smsEmailDivCd);
		util.DataMap.setValue(app, "dmReqKey", "strSndId", moExtCmnSender.sndId);
		
		moPage.getSenderInfo();
		
	};
	
	/**
	 * @desc  부모창의 SMS 설정 정보로 보내는사람, 발송제목, 전송유형, 예약일, SMS 리피트 다이나믹 생성
	 * @return void
	 * @author Park. ju wan 2016. 2. 11.
	 */
	moPage.getSenderInfo = function(){
		
		var vsRptId 							= moExtCmnSender.rptId;
		var vsPhoneNo 					= moExtCmnSender.phoneNo;
		var vsRepNm 					= moExtCmnSender.repNm;
		var vsSenderSms 				= moExtCmnSender.defSenderSms;			//보내는이(sms)
		var vsSendDivCharStr 			= moExtCmnSender.sendDivCharStr; 			//발송문구구분값
		var vsSendMsgContSms 		= moExtCmnSender.sendMsgContSms;		// SMS발송내용
		var vsTitleSms 					= moExtCmnSender.sendTitleSms;				// SMS발송제목
				
		doDynamicRptRender(moExtCmnSender);
		
		util.DataMap.setValue(app, "dmReqSmsKey", "strSenderSms", vsSenderSms);
		util.DataMap.setValue(app, "dmReqSmsKey", "strTitle", vsTitleSms);
		util.Control.setValue(app, "txtSmsCont", vsSendMsgContSms);
		util.Control.setValue(app, "rdbReservedFg", "0");
		util.Control.setVisible(app, false,["lblReservedDt", "dipReservedDt"]);
		util.Control.setValue(app, "ipbSendDivSms", vsSendDivCharStr);
		util.Control.redraw(app, ["ipbSenderSms","ipbSendTitle"]);
	};
	
	/**
	 * @desc  SMS 리피트 다이나믹 생성
	 * @param  moExtCmnSender
	 * @return void
	 * @author Park. ju wan 2016. 2. 11.
	 */
	function doDynamicRptRender(moExtCmnSender){
		
		var dyRpt = new DynRepeat();
		dyRpt.init("rptSmsMst");
		//디테일 노드 정보
		var vaInsTemp = new Array();
		//헤더 text
		var vaHeaderText = new Array();
		
		var vsUptcols = "PHONE_NO:PHONE_NO,REP_NM:REP_NM,";
		
		for( var i = 0 ; i < moExtCmnSender.sendDivChar.length ; i++){
				
			var vcHeaderCtl  = ExtPopUp.getParentViewer().model.getControl(moExtCmnSender.sendDivChar[i]);
			var vsDtlId = ExtPopUp.getParentVal("ExtRepeat").getDetailColName(moExtCmnSender.sendDivChar[i]);
			var vsDtlNode = 	ExtPopUp.getParentVal("ExtRepeat").getRefByColId(vsDtlId);		
			
			vaHeaderText.push(vcHeaderCtl.textValue);
			vaInsTemp.push(vsDtlNode);
//			var vsInsNode = "___" + Number(i+1);
//			vaInsTemp.push(vsInsNode);
			vsUptcols += vsDtlNode + ":" + vsDtlNode + ","; 
					
		}
		vsUptcols = vsUptcols.substring(0, vsUptcols.length-1);
		model.getControl("rptSmsMst").dataSet.setKeyData("SMS", vsUptcols);	
		
		var vnLeft = 188;
		
		var vaHeader = new Array();
		var vaDtl = new Array();
		
		for( var i = 0 ; i < vaInsTemp.length ; i++){
		
			var voHeaderDynCtl  = new DynRepeatControl();
			voHeaderDynCtl.ID = "rh_" + vaInsTemp[i];
			voHeaderDynCtl.Class = "rptHeader";
			voHeaderDynCtl.Title	= vaHeaderText[i];
			voHeaderDynCtl.width	= 80;
			voHeaderDynCtl.height	= 25;
			voHeaderDynCtl.left	= vnLeft ; 
		
				
			var voDtlDynCtl  = new DynRepeatControl();
			voDtlDynCtl.Tag = "input";
			voDtlDynCtl.ID = "rd_" + vaInsTemp[i];
			voDtlDynCtl.Class = "ipbRpt";
			voDtlDynCtl.Ref = "/root/resList/rptSmsMst/row/" + vaInsTemp[i];
			
			
			voDtlDynCtl.width	= 80;
			voDtlDynCtl.height	= 23;
			voDtlDynCtl.left	=vnLeft;
			voDtlDynCtl.ReadOnly	="True";
				

			vnLeft += (voHeaderDynCtl.width -1 );
			vaHeader.push(voHeaderDynCtl);
			vaDtl.push(voDtlDynCtl);
		}
		
		dyRpt.setItem("header", vaHeader);
		dyRpt.setItem("detail", vaDtl);
		
		dyRpt.create();
		
		var vsIdxs = ExtPopUp.getParentVal("ExtRepeat").getSelIdxOrFRowIdx(moExtCmnSender.rptId);	
		var vaIdxs = vsIdxs.split(",");

		if(vaIdxs == null) {
			util.Control.setEnable(app, false, "btnSend");
			return false;
		}
		
		for(var i=0; i<vaIdxs.length; i++){
			
			
			var vsDtlId = ExtPopUp.getParentVal("ExtRepeat").getDetailColName(moExtCmnSender.phoneNo);
			var vsDtlRepNmId = ExtPopUp.getParentVal("ExtRepeat").getDetailColName(moExtCmnSender.repNm);
			var vsSmsNo  =  ExtPopUp.getParentVal("ExtRepeat").getValue(moExtCmnSender.rptId, vsDtlId,vaIdxs[i]);
			var vsRepNm  =  ExtPopUp.getParentVal("ExtRepeat").getValue(moExtCmnSender.rptId, vsDtlRepNmId,vaIdxs[i]);
			var vnIdx = util.Grid.insertRow(app, "grdSmsMst");
			
			util.Grid.setCellValue(app, "grdSmsMst", "PHONE_NO", vsSmsNo, vnIdx);
			util.Grid.setCellValue(app, "grdSmsMst", "REP_NM", vsRepNm, vnIdx);
			
			//for( var k = 0 ; k < moExtCmnSender.sendDivChar.length ; k++){
			for( var k = 0 ; k < vaInsTemp.length ; k++){	
				var vcHeaderCtl  = ExtPopUp.getParentViewer().model.getControl(moExtCmnSender.sendDivChar[k]);
				var vsDtlId = ExtPopUp.getParentVal("ExtRepeat").getDetailColName(moExtCmnSender.sendDivChar[k]);
				var vsDtlNode = 	ExtPopUp.getParentVal("ExtRepeat").getRefByColId(vsDtlId);		
				var vsDtlValue = ExtPopUp.getParentVal("ExtRepeat").getValue(moExtCmnSender.rptId, vsDtlNode, vaIdxs[i]);
				model.addNode("/root/resList/rptSmsMst/row["+vnIdx+"]", vaInsTemp[k], vsDtlValue, "element");
			}
			
			if(ValueUtil.isNull(vsSmsNo)){
				util.Msg.alert("NLS-ERR-EXT020", ["SMS"]);
				util.Control.setEnable(app, false, "btnSend");
				return false;
			}
		}
		
		
		
		util.Control.redraw(app, "grdSmsMst");
	}
	
	/**
	 * @desc  전송유형 ValueChanged event
	 * @param
	 * @return void
	 * @author Park. ju wan 2016. 2. 11.
	 */
	moPage.onValueChanged_RdbReservedFg = function() {
		
		var vsReservedFg = util.Control.getValue(app, "rdbReservedFg");
				
		//예약전송
		if(vsReservedFg == "1"){
			util.Control.setVisible(app, true,["lblReservedDt", "dipReservedDt"]);
		//즉시전송	
		}else{
			util.Control.setVisible(app, false,["lblReservedDt", "dipReservedDt"]);
		}
	};
	
	/**
	 * @desc  SMS 발송
	 * @param
	 * @return void
	 * @author Park. ju wan 2016. 2. 11.
	 */
	moPage.onClick_BtnSend = function() {
		if (util.Grid.getRowCount(app, "grdSmsMst") < 1) return;
		
		var voCheckValid;
		var vsReservedFg = util.Control.getValue(app, "rdbReservedFg");
		//예약전송
		if(vsReservedFg == "1"){
			voCheckValid = ["ipbSenderSms", "ipbSendTitle", "txtSmsCont", "dipReservedDt"];
		//즉시전송	
		}else{
			voCheckValid = ["ipbSenderSms", "ipbSendTitle", "txtSmsCont"];
		}
		
		if(!util.validate(app, voCheckValid)) return false;	
		
		if(!util.Msg.confirm("NLS-CRM-M069") ) return;
					
		ExtRepeat.setCRUDAttr("rptSmsMst", "alltype", "true");
		
		//strCommand: smsSend 
		util.Submit.send(app, "subSmsSend", function(pbSuccess){
			if(pbSuccess){
				util.Msg.alert("NLS-CMM-M044", ["SMS"]);	
				
				if (ExtPopUp.getParentVal("moIdsForExtCmnSender").callBackfunc) {
					
					var vaIdxs = ExtPopUp.getParentVal("ExtRepeat").getSelIdxOrFRowIdx(moExtCmnSender.rptId);
					
					ExtPopUp.getParentVal("moIdsForExtCmnSender").callBackfunc(pbSuccess, moExtCmnSender.smsEmailDivCd, vaIdxs);
					
				}		
				app.close();
					
			}
		});
	};
	
	
	moPage.onClick_BtnClose = function() {
		app.close();
	};
	
	moPage.onClick_BtnDel = function() {
		var vcRpt = ExtControl.getControl("rptSmsMst");
		vcRpt.setRowStatus(vcRpt.getIndex(), "delete");
		vcRpt.deleteRow(vcRpt.getIndex(), vcRpt.getAttr("nodeset"));
		vcRpt.refresh();
	}
	return moPage;
};
