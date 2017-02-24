var Dcalendar = (function () {
	var Calendar = function (config={}) {
		this.el = config.el || document.querySelector('.dcalendar');
	};
    
    
	function _bind (el, type, callback) {el.addEventListener(type, callback, false);}

	function selectDay (day) {return this.el.querySelector(`[data-day="${day}"]`);}
    
    // 判定是否是闰年
	function _isLeap (year) {
		return (year % 100 === 0 ? res = (year % 400 === 0 ? 1 : 0) : res = (year % 4 === 0 ? 1 : 0));
	}
    
    // 返回指定年某月有多少天
	function _getDayCounts (year, month) {
		const arr = [null, 31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (month === 2) {
			if (_isLeap(year)) {return 29;}
		    else {return 28;}
		}
		else {return arr[month];}
	}
    
    /**
     *渲染日历day部分
     *@param {str} date e.g:'2017.02'
     *@param {arr} days 需要标注的日期
    */
    function render (date, days) {
    	
    	if (!date) {date = Date.now();};

    	const dateObj   = new Date(date);
    	const year      = dateObj.getFullYear();
    	const month     = dateObj.getMonth() + 1;
    	const day       = dateObj.getDate();
    	const dayCounts = _getDayCounts(year, month);
    	const firstDayWeek = new Date(`${year}.${month}`).getDay();
    	let count     = firstDayWeek;
    	let blank       = '';
    	let dayHTML     = '';

    	for (let i = 0;i < firstDayWeek;i++) {blank += `<td></td>`}

        for (let i = 0;i < dayCounts;i++) {
            
            if (count < 7) {
            	dayHTML += `<td data-day=${i + 1}>${i + 1}</td>`
            	count++;
            }
            else {
            	dayHTML += `</tr><tr><td data-day=${i + 1}>${i + 1}</td>`
            	count = 1;
            }
        }
        dayHTML = '<tr>' + blank + dayHTML + '</tr>';

        this.el.querySelector('.dcalendar-time').innerHTML = `${year}.${month > 9 ? month : '0' + month}`;
        this.el.querySelector('.dcalendar-day').innerHTML = dayHTML;
        this.selectDay(day).classList.add('active');
        this.markDay(days);
    }

    // 标记日期
    function markDay (days=[]) {
    	for (let i = 0;i < days.length;i++) {
    		this.selectDay(day).classList.add('mark');
    	}
    }

    // 给某一天绑定事件
    function addEvent (day, type, callback) {
    	const target = this.selectDay(day);
    	_bind(target, type, callback);
    }

    // switch next month
    function nextMonth (that) {
    	const date  = that.el.querySelector('.dcalendar-time').innerHTML.split('.');
    	let year  = +date[0];
    	let month = +date[1] + 1;

        year = month > 12 ? year + 1 : year;
        month = month > 12 ? 1 : month;

        that.render(`${year}.${month}`);
    }

    //switch next month
    function prevMonth (that) {
        const date  = that.el.querySelector('.dcalendar-time').innerHTML.split('.');
    	let year  = +date[0];
    	let month = +date[1] - 1;

        year = month < 1 ? year - 1 : year;
        month = month < 1 ? 12 : month;

        that.render(`${year}.${month}`);
    }

	function init (date) {

		if (!this.el) return;

		let elHTML = `<div class="dcalendar-container">
	                      <table>
	                          <thead>
	        		              <tr class="dcalendar-operate">
	        		                  <th class="dcalendar-prev"><</th>
	        		                  <th class="dcalendar-time" colspan="5"></th>
	        		                  <th class="dcalendar-next">></th>
	        		              </tr>
	        	                  <tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>
	        	              </thead>
	        	          <tbody class="dcalendar-day"></tbody>
	                      </table>
		               </div>`;

		this.el.innerHTML = elHTML;
		this.render(date);

		this.el.querySelector('.dcalendar-prev').addEventListener('click', () => {prevMonth(this)}, false);
		this.el.querySelector('.dcalendar-next').addEventListener('click', () => {nextMonth(this)}, false);
	}

	Calendar.prototype.init = init;
	Calendar.prototype.render = render;
	Calendar.prototype.selectDay = selectDay;
	Calendar.prototype.markDay = markDay;
	Calendar.prototype.addEvent = addEvent;

    return Calendar;
})();