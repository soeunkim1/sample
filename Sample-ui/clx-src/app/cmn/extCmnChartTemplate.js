//아래 주석의 <xtmlink> 는 인텔리센스 기능을 위한 링크입니다. 지우지 마십시오.
/// <xtmlink path="./extCmnChartTemplate.xtm"/>


var extCmnChartTemplate = function() {
	var moPage = new Page();
	
	
			
	moPage.onLoadImportDone_ImpTitle = function() {
		doHeaderOnLoad();
	}
	
	
	moPage.onModelConstructDone_ExtCmnChartTemplate = function() {
		
		//1차원 bar X	
		var poChartBarX = {
			  TYPE : "barX" 											// 차트타입(barX, barY, line, pie)
			, IMP_ID : "impBarX" 									//임포트ID
			, AXIS_DATA : "SA_NM" 								//기준축 데이터명(인스턴스 노드)
			, SERIES_DATA : "PER" 								//차트 데이터명(인스턴스 노드)
			, INSTANCE : "/root/resList/barXChart/row" //인스턴스명
			, TITLE : "BAR-CHART-X" 							//차트 타이틀
			, AXIS_FORMATTER : "%" 							//데이터 포멧
			, BAR_WIDTH : 40										//바 넓이
		};
		
		ExtChart.draw(poChartBarX);
		
		//1차원 bar Y
		var poChartBarY = {
			  TYPE : "barY" 											// 차트타입(barX, barY, line, pie)
			, IMP_ID : "impBarY" 									//임포트ID
			, AXIS_DATA : "SA_NM" 								//기준축 데이터명(인스턴스 노드)
			, SERIES_DATA : "PER" 								//차트 데이터명(인스턴스 노드)
			, INSTANCE : "/root/resList/barXChart/row" //인스턴스명
			, TITLE : "BAR-CHART-Y" 							//차트 타이틀
			, AXIS_FORMATTER : "%" 							//데이터 포멧
			, BAR_WIDTH : 40										//바 넓이
		};
		
		ExtChart.draw(poChartBarY);
		
		//1차원 Line
		var poChartLine = {
			  TYPE : "line" 											// 차트타입(barX, barY, line, pie)
			, IMP_ID : "impLine" 									//임포트ID
			, AXIS_DATA : "SA_NM" 								//기준축 데이터명(인스턴스 노드)
			, SERIES_DATA : "PER" 								//차트 데이터명(인스턴스 노드)
			, INSTANCE : "/root/resList/barXChart/row" //인스턴스명
			, TITLE : "BAR-CHART-Line" 						//차트 타이틀
			, AXIS_FORMATTER : "%" 							//데이터 포멧
		};
		
		ExtChart.draw(poChartLine);
		
		//1차원 Pie
		var poChartPie = {
			  TYPE : "pie" 											// 차트타입(barX, barY, line, pie)
			, IMP_ID : "impPie" 									//임포트ID
			, AXIS_DATA : "SA_NM" 								//기준축 데이터명(인스턴스 노드)
			, SERIES_DATA : "PER" 								//차트 데이터명(인스턴스 노드)
			, INSTANCE : "/root/resList/barXChart/row" //인스턴스명
			, TITLE : "BAR-CHART-Pie" 						//차트 타이틀
			, AXIS_FORMATTER : "%" 							//데이터 포멧
		};
		
		ExtChart.draw(poChartPie);
		
		//2차원 Bar X
		var poChartDimBarX = {
			  TYPE : "barX" 																	//차트타입 (barX, barY, line)
			, IMP_ID : "impDimBarX" 														//임포트ID
			, AXIS_DATA : "MONTH" 													//기준축 데이터명(인스턴스 노드)
			, SERIES_DATA : ["MALE:남", "FEMALE:여", "TOTAL:전체"]  	//차트 데이터명(인스턴스 노드)
			, INSTANCE : "/root/resList/bar2Chart/row" 							//인스턴스명
			, TITLE : "BAR-CHART-DimBarX" 										//차트 타이틀
			, AXIS_FORMATTER : "건" 													//데이터 포멧
			, BAR_WIDTH : 20																//바 넓이
		};
		
		ExtChart.draw(poChartDimBarX);
		
		//2차원 Bar Y
		var poChartDimBarY = {
			  TYPE : "barY" 																	//차트타입 (barX, barY, line)
			, IMP_ID : "impDimBarY" 														//임포트ID
			, AXIS_DATA : "MONTH" 													//기준축 데이터명(인스턴스 노드)
			, SERIES_DATA : ["MALE:남", "FEMALE:여", "TOTAL:전체"]  	//차트 데이터명(인스턴스 노드)
			, INSTANCE : "/root/resList/bar2Chart/row" 							//인스턴스명
			, TITLE : "BAR-CHART-DimBarY" 										//차트 타이틀
			, AXIS_FORMATTER : "건" 													//데이터 포멧
			, BAR_WIDTH : 15																//바 넓이
		};
		
		ExtChart.draw(poChartDimBarY);
		
		//2차원 Bar Line
		var poChartDimLine = {
			  TYPE : "line" 																	//차트타입 (barX, barY, line)
			, IMP_ID : "impDimLine" 														//임포트ID
			, AXIS_DATA : "MONTH" 													//기준축 데이터명(인스턴스 노드)
			, SERIES_DATA : ["MALE:남", "FEMALE:여", "TOTAL:전체"]  	//차트 데이터명(인스턴스 노드)
			, INSTANCE : "/root/resList/bar2Chart/row" 							//인스턴스명
			, TITLE : "BAR-CHART-DimLine" 										//차트 타이틀
			, AXIS_FORMATTER : "건" 													//데이터 포멧
		};
		
		ExtChart.draw(poChartDimLine);
	
		
	};
	
	
	
	
	return moPage;
};
