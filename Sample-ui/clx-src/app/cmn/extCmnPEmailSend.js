//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCmnPEmailSend.xtm"/>


var extCmnPEmailSend = function() {
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
	moPage.onModelConstructDone_ExtCmnPEmailSend = function() {
		
		moExtCmnSender =  ExtPopUp.getParentVal("moExtCmnSender");
		
		util.DataMap.setValue(app, "dmReqKey", "strEmailDivCd", moExtCmnSender.smsEmailDivCd);
		util.DataMap.setValue(app, "dmReqKey", "strSndId", moExtCmnSender.sndId);
		
		moPage.getSenderInfo();
	};
	
	/**
	 * @desc  부모창의 Email 설정 정보로 보내는사람, 발송제목, 전송유형, 예약일, Email 리피트 다이나믹 생성
	 * @return void
	 * @author Park. ju wan 2016. 2. 11.
	 */
	moPage.getSenderInfo = function(){
		
		var vsRptId 						= moExtCmnSender.rptId;
		var vsEmail 						= moExtCmnSender.email;
		var vsRepNm 						= moExtCmnSender.repNm;
		var vsSenderEmail 			= moExtCmnSender.defSenderEmail;			//보내는이(Email)
		var vsSendDivCharStr 		= moExtCmnSender.sendDivCharStr; 		//발송문구구분값
		var vsPersonalNmEmail 		= moExtCmnSender.defPersonalNmEmail;	//보내는이명
		var vsSendMsgContEmail 	= moExtCmnSender.sendMsgContEmail;	// Email발송내용
		var vsTitleEmail 				= moExtCmnSender.sendTitleEmail;			// Email발송제목
				
		var vaIdxs = ExtPopUp.getParentVal("ExtRepeat").getSelIdxOrFRowIdx(vsRptId);
				
		callEditorSetPage("htmlEmailCont", false, moPageInfo.menuId, null, function(){
							
			callEditorSetEditorContent("htmlEmailCont", vsSendMsgContEmail);
			callEditorSetEnableEditor("htmlEmailCont", true);		
							
		});
		
		doDynamicRptRender(moExtCmnSender);
		
		util.Control.setValue(app, "ipbSendDivEmail", vsSendDivCharStr);
		//UtilControl.setHtmlEditorValue("htmlEmailCont",vsSendMsgContEmail);
		util.DataMap.setValue(app, "dmReqEmailKey", "strSenderEmail", vsSenderEmail);
		util.DataMap.setValue(app, "dmReqEmailKey", "strTitle", vsTitleEmail);
		util.DataMap.setValue(app, "dmReqEmailKey", "strPersonalNmEmail", vsPersonalNmEmail);
		util.Control.redraw(app, ["ipbSenderEmail","ipbEmailSendTitle", "ipbPersonalEmail"]);
		
		
	};
	
	/**
	 * @desc Eamil 리피트 다이나믹 생성
	 * @param  moExtCmnSender
	 * @return void
	 * @author Park. ju wan 2016. 2. 11.
	 */
	function doDynamicRptRender(moExtCmnSender){
		
		var dyRpt = new DynRepeat();
		dyRpt.init("rptEmailMst");
				
		var vaInsTemp = new Array();
		var vaHeaderText = new Array();
		var vsUptcols = "EMAIL:EMAIL,REP_NM:REP_NM,";
		
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
		model.getControl("rptEmailMst").dataSet.setKeyData("EMAIL", vsUptcols);	
		
		var vnLeft = 317;
		
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
			voDtlDynCtl.Ref = "/root/resList/rptEmailMst/row/" + vaInsTemp[i];
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
			
			
			var vsDtlId = ExtPopUp.getParentVal("ExtRepeat").getDetailColName(moExtCmnSender.email);			
			var vsDtlRepNmId = ExtPopUp.getParentVal("ExtRepeat").getDetailColName(moExtCmnSender.repNm);
			var vsEmail  =  ExtPopUp.getParentVal("ExtRepeat").getValue(moExtCmnSender.rptId, vsDtlId,vaIdxs[i]);
			var vsRepNm  =  ExtPopUp.getParentVal("ExtRepeat").getValue(moExtCmnSender.rptId, vsDtlRepNmId,vaIdxs[i]);
			var vnIdx = util.Grid.insertRow(app, "grdEmailMst");
			util.Grid.setCellValue(app, "grdEmailMst", "EMAIL", vsEmail, vnIdx);
			util.Grid.setCellValue(app, "grdEmailMst", "REP_NM", vsRepNm, vnIdx);

			//for( var k = 0 ; k < moExtCmnSender.sendDivChar.length ; k++){
				for( var k = 0 ; k < vaInsTemp.length ; k++){	
				
				var vcHeaderCtl  = ExtPopUp.getParentViewer().model.getControl(moExtCmnSender.sendDivChar[k]);
				var vsDtlId = ExtPopUp.getParentVal("ExtRepeat").getDetailColName(moExtCmnSender.sendDivChar[k]);
				var vsDtlNode = 	ExtPopUp.getParentVal("ExtRepeat").getRefByColId(vsDtlId);		
				var vsDtlValue = ExtPopUp.getParentVal("ExtRepeat").getValue(moExtCmnSender.rptId, vsDtlNode, vaIdxs[i]);
				model.addNode("/root/resList/rptEmailMst/row["+vnIdx+"]", vaInsTemp[k], vsDtlValue, "element");
			}
			
			if(ValueUtil.isNull(vsEmail)){
				util.Msg.alert("NLS-ERR-EXT020", ["E-MAIL"]);
				util.Control.setEnable(app, false, "btnSend");
				return false;
			}
		}
	
		util.Control.redraw(app, "grdEmailMst");
	}
	
	/**
	 * @desc  Email 발송
	 * @param
	 * @return void
	 * @author Park. ju wan 2016. 2. 11.
	 */
	moPage.onClick_BtnSend = function() {
		if(!util.validate(app, ["ipbEmailSendTitle", "ipbSenderEmail"])) return false;	
		if(!util.Msg.confirm("NLS-CRM-M069") ) return;
			
		ExtRepeat.setCRUDAttr("rptEmailMst", "alltype", "true");
		ExtRepeat.setCRUDAttr("rptFile", "alltype", "true");
		var ifrSE = document.getElementById("htmlEmailCont");
		
		util.DataMap.setValue(app, "dmReqEmailKey", "strEmailCont", ifrSE.contentWindow.getEditorContent());
		
		//strCommand: emailSend 
		util.Submit.send(app, "subEmailSend", function(pbSuccess){
			if(pbSuccess){
				
				util.Msg.alert("NLS-CMM-M044", ["Email"]);	
					
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
	
	
	moPage.onClick_BtnFile = function() {
		FileUtil.getFileName(false, null, function(psFileName){
			
			if(!ValueUtil.isNull(psFileName)){
				
					
					//strCommand: tmpFileUpLoad 
					util.Submit.send(app, "subTmpFileUpLoad", function(pbSuccess){
											
					if(pbSuccess){
						
						var vsTmpFileNms = util.DataMap.getValue(app, "dmResList", "strTmpFileNms");
						var vaTmpFileNms = vsTmpFileNms.split(";");
						
						var vaFileNm = psFileName.split(",");
						
						for(var i = 0 ; i <= vaTmpFileNms.length ; i++){
					
						if(ValueUtil.isNull(vaTmpFileNms[i])) continue;
					
						var vnIdx = util.Grid.insertRow(app, "grdFile");
						util.Grid.setCellValue(app, "grdFile", "FILE_NM", vaFileNm[i]);
						util.Grid.setCellValue(app, "grdFile", "FILE_PATH", vaTmpFileNms[i]);
					
					}
						
					}
				});
										
					
					//model.getControl("rptFile").insertRow(
					
				
			}
			
		});
	};
	
	
	moPage.onClick_RdbtnFileDel = function() {
		var vnIdx = util.Grid.getIndex(app, "grdFile");
		var vsFilePath = util.Grid.getCellValue(app, "grdFile", "FILE_PATH", vnIdx);
		util.DataMap.setValue(app, "dmReqFileDelKey", "strTmpFilePath", vsFilePath);
		
		//strCommand: delTmpFile 
		util.Submit.send(app, "subTmpFileDel", function(pbSuccess){
										
				if(pbSuccess){
					
					var vcRpt = model.getControl("rptFile");
				
					vcRpt.deleteRow(vnIdx, vcRpt.getAttr("nodeset"));
				}
			});
	};
	return moPage;
};
