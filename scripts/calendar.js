var dayOffset = 3;
var month_names = {
	'bn':{
		1: 'জানুয়ারি',
  2: 'ফেব্রুয়ারি',
  3: 'মার্চ',
  4: 'এপ্রিল',
  5: 'মে',
  6: 'জুন',
  7: 'জুলাই',
  8: 'আগস্ট',
  9: 'সেপ্টেম্বর',
  10: 'অক্টোবর',
  11: 'নভেম্বর',
  12: 'ডিসেম্বর'
		},
	'en':{
		1:'January',
		2:'February',
		3:'March',
		4:'April',
		5:'May',
		6:'June',
		7:'July',
		8:'August',
		9:'September',
		10:'October',
		11:'November',
		12:'December'
		}
	};
	
var mDays = new Array(13);
	mDays[1] = 31;
	mDays[2] = 29;
	mDays[3] = 31;
	mDays[4] = 30;
	mDays[5] = 31;
	mDays[6] = 30;
	mDays[7] = 31;
	mDays[8] = 31;
	mDays[9] = 30;
	mDays[10] = 31;
	mDays[11] = 30;
	mDays[12] = 31;

var bDays = new Array(11);
	bDays[0] = '০';
	bDays[1] = '১';
	bDays[2] = '২';
	bDays[3] = '৩';
	bDays[4] = '৪';
	bDays[5] = '৫';
	bDays[6] = '৬';
	bDays[7] = '৭';
	bDays[8] = '৮';
	bDays[9] = '৯';

function banglaNumber(v){
	//IE7 FIX, IE7 does not index string
	v = v.toString();
	v = v.split("");
	var bangla = "";
	$(v).each(function(index, element) {
		if(parseInt(element)>=0 && parseInt(element)<=9)
			bangla += bDays[element];
		else
			bangla += element;
		});
	return bangla;
	}

function languageNumber(v,l){
	if( l == 'bn' ){
		return banglaNumber(v);
		}
	else{
		return v;
		}
	}

//IE 8 and 7 FIX
/**Parses string formatted as YYYY-MM-DD to a Date object.
 * If the supplied string does not match the format, an 
 * invalid Date (value NaN) is returned.
 * @param {string} dateStringInRange format YYYY-MM-DD, with year in
 * range of 0000-9999, inclusive.
 * @return {Date} Date object representing the string.
 */
function parseISO8601(dateStringInRange) {
	var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
		date = new Date(NaN), month,
		parts = isoExp.exec(dateStringInRange);

	if(parts) {
		month = +parts[2];
		date.setFullYear(parts[1], month - 1, parts[3]);
		if(month != date.getMonth() + 1){
			date.setTime(NaN);
			}
		}
	return date;
	}



var js_calender = function(st){
		var ths = new Object;		
		ths.container = st.container?st.container:'';
		// ths.language = st.language?st.language:'en';
  ths.language = (st.language === 'bn') ? 'bn' : 'en';
		ths.lowest_year = st.lowest_year?st.lowest_year:'2000';
		ths.current_date = st.current_date?st.current_date:'';
		ths.last_date = st.last_date?st.last_date:'';
		ths.url_prefix = st.url_prefix?st.url_prefix:'';
		ths.url_postfix = st.url_postfix?st.url_postfix:'';		
		ths.afterresizeinterval = null;		
		ths.init = function(){			
			var total_width = $(ths.container).parent().width() - 1;			
			var each_cell_width = parseInt(total_width / 7);
			ths.fixed_cell_width = each_cell_width - 3;
			
			$(ths.container + " .dayZone dt").width(ths.fixed_cell_width);
			$(ths.container + " .dayZone dt").height(ths.fixed_cell_width);
			$(ths.container + " .dayZone dt").css('line-height',ths.fixed_cell_width + "px");
			
			$(ths.container).width((each_cell_width*7) + 1);
			ths.calenderRender('init');
			
			$(ths.container + " .year-selector").change(ths.YearcalenderRender)
			$(ths.container + " .month-selector").change(ths.MonthcalenderRender);
						
			}
		
		ths.YearcalenderRender = function(){
			ths.calenderRender('year');
			}
		ths.MonthcalenderRender = function(){
			ths.calenderRender('month');
			}
		ths.calenderRender = function(status){
			var month;
			var year;
			var last_month;
			var last_year;
			var d_last = new Date(parseISO8601(ths.last_date));
			var d = new Date(parseISO8601(ths.current_date));
			var d_lowest = new Date(parseISO8601(ths.lowest_year));
			//console.log(d_lowest.getMonth());

			if( status == 'init' ){
				last_month = d_last.getMonth();
				last_year = d_last.getFullYear();
				month = d.getMonth();
				year = d.getFullYear();
				
				if( d > d_last ){
					month = last_month;
					year = last_year;
					}
				
				$(ths.container + " .archive-date-selector .month-selector").html("");
				
				if(d_last.getFullYear() == d.getFullYear() && false){
					for(i=1;i<=d_last.getMonth()+1;i++){
						$(ths.container + " .archive-date-selector .month-selector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				else if(d_lowest.getFullYear() == d.getFullYear()){
					for(i=d_lowest.getMonth()+1;i<=12;i++){
						$(ths.container + " .archive-date-selector .month-selector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				else{
					for(i=1;i<=12;i++){
						$(ths.container + " .archive-date-selector .month-selector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				
				$(ths.container + " .archive-date-selector .year-selector").html("");
				for(i=d_lowest.getFullYear();i<=d_last.getFullYear();i++){
					var bang_year = languageNumber(i,ths.language);
					$(ths.container + " .archive-date-selector .year-selector").append("<option value="+i+">"+ bang_year +"</option>");
					}
				
				$(ths.container + " .month-selector").val(month+1);
				$(ths.container + " .year-selector").val(year);

				}
			else if( status == 'year' || status == 'init' ){
				$(ths.container + " .archive-date-selector .month-selector").html("");
				//var d_last = new Date(parseISO8601(ths.last_date));
				
				if(d_last.getFullYear() == $(ths.container + " .year-selector").val()){
					for(i=1;i<=d_last.getMonth()+1;i++){
						$(ths.container + " .archive-date-selector .month-selector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				else if(d_lowest.getFullYear() == $(ths.container + " .year-selector").val()){
					for(i=d_lowest.getMonth()+1;i<=12;i++){
						$(ths.container + " .archive-date-selector .month-selector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				else{
					for(i=1;i<=12;i++){
						$(ths.container + " .archive-date-selector .month-selector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				}
			
			month = $(ths.container + " .month-selector").val();
			year = $(ths.container + " .year-selector").val();
			
			tmpD = new Date(year,month-1,1);
			var startDay = tmpD.getDay()+dayOffset;
			
			var tDays = mDays[month];
			
			if( year % 4 && month == 2 ){
				tDays = 28;
				}
			
			if( startDay > 7 ){
				startDay = startDay % 7;
				}
			
			$(ths.container + " .dayHolder").html(ths.jFillDay(tDays,startDay,year,month));
			$(ths.container + " .dayZone dd, " + ths.container + " .dateZone dd, " + ths.container + " .dateZone dt, " + ths.container + " .dateZone b").width(ths.fixed_cell_width);
			$(ths.container + " .dayZone dd, " + ths.container + " .dateZone dd, " + ths.container + " .dateZone dt, " + ths.container + " .dateZone b").height(ths.fixed_cell_width);
			$(ths.container + " .dayZone dd, " + ths.container + " .dateZone dd, " + ths.container + " .dateZone dt, " + ths.container + " .dateZone b").css('line-height',ths.fixed_cell_width + "px");
			
		}
		
		ths.jFillDay = function(month_length,startDay,y,m){
			
			var day = 1
			var tBox = 42;
			var html = "";
			//var curDate = new Date(parseISO8601(__jwArchiveDate));
			var curDate = new Date(parseISO8601(ths.current_date));
			var d_lowest = new Date(parseISO8601(ths.lowest_year));
			//last published date will be archived too, purpose will not server if arvhived date
			//var lDate = new Date(); //new Date(__jwLastPublishedDate);
			var lDate = new Date(parseISO8601(ths.last_date));
			var d = y+"-"+( m < 10 ? '0' : '' )+m+"-";
			// blank day before 1st day
			for (var i=1;i<startDay;i++){	
				html += '<div class="d-flex justify-content-center align-items-center py-1 border-end border-bottom"><span class="disabled opacity-25">•</span></div>';
				tBox--;
				}
			
			// fill days
			tmp2 = new Date(parseISO8601(d + "01"));

			if(d_lowest.getFullYear() == y && d_lowest.getMonth()+1 == m){
				while(day < d_lowest.getDate()) {
					t = ( day < 10 ? '0' : '' ) + day;
      // before lowest year date
					html += '<div class="d-flex justify-content-center align-items-center py-1 border-end border-bottom"><span class="disabled opacity-25">'+languageNumber(t,ths.language)+'</spna></div>';
					day++
					tBox--;
					}
				}
			
			
			while( day <= month_length && ( tmp2.getFullYear() == lDate.getFullYear() && tmp2.getMonth() <= lDate.getMonth() || tmp2.getFullYear() < lDate.getFullYear() ) ){
				t = ( day < 10 ? '0' : '' ) + day;
				tmp = d + t;
				
				tmp2 = new Date(parseISO8601(tmp));
				if( tmp2.getFullYear() == lDate.getFullYear() && tmp2.getMonth() == lDate.getMonth() && lDate.getDate() < tmp2.getDate() ) break;
				
				classs = '';
     // today active day
				if( tmp2.getFullYear() == curDate.getFullYear() && tmp2.getMonth() == curDate.getMonth() && curDate.getDate() == tmp2.getDate() ) classs = "active";
				// working day with link
				html += '<div class="d-flex justify-content-center align-items-center py-1 border-end border-bottom"><span><a rel="nofollow" href="' + ths.url_prefix + tmp.replace(/-/g, "_") + ths.url_postfix + '" class="text-reset p-1 rounded-circle ' + classs + '">' + languageNumber(t,ths.language) + '</a></span></div>';
				day++
				tBox--;
				}
				
			// future date			
			while(day <= month_length) {
				t = ( day < 10 ? '0' : '' ) + day;
				html += '<div class="d-flex justify-content-center align-items-center py-1 border-end border-bottom"><span class="disabled opacity-25">'+languageNumber(t,ths.language)+'</span></div>';
				day++
				tBox--;
				}
			
			// empty box after 30th/31th
			while(tBox){
				html += '<div class="d-flex justify-content-center align-items-center py-1 border-end border-bottom"><span class="disabled opacity-25">•</span></div>';
				tBox--;
				}
			return html;
			}
		
		ths.resizeinit = function(){
			if( !ths.afterresizeinterval ) return;
			clearInterval(ths.afterresizeinterval);
			ths.init();
			}
		ths.resize_event = function(){
			clearInterval(ths.afterresizeinterval);
			ths.afterresizeinterval = setInterval(ths.resizeinit,500);
			}
			
		ths.afterresizeinterval = setInterval(ths.resizeinit,100);
		$(window).resize(ths.resize_event);
	}


function BanglaDayZones() {
  document.querySelectorAll('.dayZone').forEach(dayZone => {
    dayZone.innerHTML = `
      <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">শুক্র</div>
      <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">শনি</div>
      <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">রবি</div>
      <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">সোম</div>
      <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">মঙ্গল</div>
      <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">বুধ</div>
      <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">বৃহ</div>
    `;
  });
}

function EnglishDayZones() {
  document.querySelectorAll('.dayZone').forEach(dayZone => {
    dayZone.innerHTML = `
      <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">Fri</div>
  <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">Sat</div>
  <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">Sun</div>
  <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">Mon</div>
  <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">Tue</div>
  <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">Wed</div>
  <div class="col d-flex justify-content-center align-items-center py-1 border-end border-bottom">Thu</div>
    `;
  });
}
