var bshare = bshare || {};
(function(BS) {
	BS.city = function(option) {
		var self = this;
		this.items = [];
		this.settings = $.extend({
			clickCallback: function() {

			},
			cancelCallback: function() {

			}
		}, option || {});
		this.selectedItem = {};
		this.selectedCity = [];
		this.container = option.container;
		this.cityData = [{
				name: "hot",
				items: [{
						title: "beijing",
						name: "北京"
					}, {
						title: "shanghai",
						name: "上海"
					}, {
						title: "guangdong",
						name: "广东"
					}, {
						title: "jiangsu",
						name: "江苏"
					}, {
						title: "zhejiang",
						name: "浙江"
					}
				]
			}, {
				name: "省/直辖市/自治区/特别行政区",
				items: [{
						title: "bejing",
						name: "北京"
					}, {
						title: "shanghai",
						name: "上海"
					}, {
						title: "guangdong",
						name: "广东"
					}, {
						title: "jiangsu",
						name: "江苏"
					}, {
						title: "zhejiang",
						name: "浙江"
					}, {
						title: "hainan",
						name: "海南"
					}, {
						title: "ningxia",
						name: "宁夏"
					}, {
						title: "anhui",
						name: "安徽"
					}, {
						title: "aomen",
						name: "澳门"
					}, {
						title: "chongqing",
						name: "重庆"
					}, {
						title: "fujian",
						name: "福建"
					}, {
						title: "gansu",
						name: "甘肃"
					}, {
						title: "guizhou",
						name: "贵州"
					}, {
						title: "guangxi",
						name: "广西"
					}, {
						title: "hebei",
						name: "河北"
					}, {
						title: "henan",
						name: "河南"
					}, {
						title: "hubei",
						name: "湖北"
					}, {
						title: "hunan",
						name: "湖南"
					}, {
						title: "heilongjiang",
						name: "黑龙江"
					}, {
						title: "jiangxi",
						name: "江西"
					}, {
						title: "jilin",
						name: "吉林"
					}, {
						title: "liaoning",
						name: "辽宁"
					}, {
						title: "neimeng",
						name: "内蒙"
					}, {
						title: "qinghai",
						name: "青海"
					}, {
						title: "sichuan",
						name: "四川"
					}, {
						title: "shanxi",
						name: "山西"
					}, {
						title: "shanxi",
						name: "陕西"
					}, {
						title: "shandong",
						name: "山东"
					}, {
						title: "tianjin",
						name: "天津"
					}, {
						title: "taiwan",
						name: "台湾"
					}, {
						title: "xinjiang",
						name: "新疆"
					}, {
						title: "xizang",
						name: "西藏"
					}, {
						title: "xianggang",
						name: "香港"
					}, {
						title: "yunnan",
						name: "云南"
					}

				]
			}
		]
		//creak dom
		this.domWarp = $('<div class="domwarp "><div class="dom"></div></div>');
		this.dom = this.domWarp.find(".dom");
		//this.hotCityDom=$('<div class="hotCityDom"><span>热门城市:</span><span class="hotCon"></span></div>').appendTo(this.dom);
		//this.hotCon=this.hotCityDom.find(".hotCon");// hot city of container
		this.cityDom = $('<span class="heading1 left">省/直辖市</span><div class="clear spacer10"></div><div class="cityDom left"><span class="cityCon"></span></div>').appendTo(this.dom);
		this.cityCon = this.cityDom.find(".cityCon"); // city of container
		for (var i = 0, n = self.cityData.length; i < n; i++) {
			self.createItem(self.cityData[i]);
		}
		this.btnCon = $('<div class="btnCon left"></div>').appendTo(this.dom);
		this.addBtn = $('<input class="addbtn bButton center" type="button" value="添加 》"  />').appendTo(this.btnCon);
		this.removeBtn = $('<input class="remove bButton center" type="button" value="《 移除"  />').appendTo(this.btnCon);
		this.chooseDom = $('<div class="chooseDom"><span class="chooseCon"></span></div>').appendTo(this.dom);
		this.chooseCon = this.chooseDom.find(".chooseCon"); //choose of city container
		this.btnDom = $('<div class="btnDom"><input type="button" class="ok bButton center lightOrange" value="确认" /><input type="button" class="cancel bButton center" value="取消" /></div>').appendTo(this.dom);
		this.okbtn = this.btnDom.find(".ok");
		this.cancelBtn = this.btnDom.find(".cancel");
		this.dom.delegate("a", "click", function() { //click event of city
			var obj = {};
			obj.dom = $(this);
			obj.name = $(this).html();
			self.selected(obj);
		});
		this.dom.delegate("a", "dblclick", function() { //click event of city
			var obj = {};
			obj.dom = $(this);
			obj.name = $(this).html();
			self.selected(obj);
			if ($(this).attr("alt") != "1") {
				self.add(self.selectedItem);
			} else {
				self.remove(self.selectedItem);
			}
		});
		this.addBtn.click(function() { //add choose of city
			self.add(self.selectedItem);
		});
		this.removeBtn.click(function() { //remove choose of city
			self.remove(self.selectedItem);
		});
		this.okbtn.click(function() { //confirm choose of city
			self.settings.clickCallback.call(self);
		});
		this.cancelBtn.click(function() {
			self.settings.cancelCallback.call(self);
		});
		this.domWarp.appendTo(this.container);
	}

	BS.city.prototype = {
		remove: function(obj) {
			var self = this;
			self.selectedCity = $.grep(self.selectedCity, function(n, j) {
				return n == obj.name;
			}, true);
			obj.dom.removeAttr("alt");
			self.cityCon.append(obj.dom);
			var lastItem = $(".chooseDom .tempDom:last");
			if (lastItem) {
				var obj = {};
				obj.dom = $(lastItem);
				obj.name = $(lastItem).html();
				self.selected(obj);
			}
		},
		add: function(obj) {
			var self = this;
			var isSame = true;
			$.grep(self.selectedCity, function(n, j) {
				if (n == obj.name) {
					isSame = false;
					return;
				}
			})
			if (isSame) {
				obj.dom.attr("alt", "1");
				self.chooseCon.append(obj.dom);
				self.selectedCity.push(obj.name);
			}
		},
		selected: function(obj) {
			var self = this;
			if (self.selectedItem) $(self.selectedItem.dom).removeClass("selected");
			obj.dom.addClass("selected");
			self.selectedItem = obj;
		},
		getItemByName: function(name) {
			var self = this;
			var citys = $(".cityCon").find(".tempDom");
			var sCity = "";
			$.each(citys, function(i, n) {
				if ($(n).html() == name) {
					sCity = n;
				}
			});
			return sCity;
		},
		selectByName: function(name) {
			var self = this;
			var temp = name.split(",");
			for (var i = 0; i < temp.length; i++) {
				//get selected item
				var s = self.getItemByName(temp[i]);
				var obj = {};
				obj.dom = $(s);
				obj.name = $(s).html();
				self.selected(obj);
				self.add(self.selectedItem);
			}
		},
		createCity: function(d) { //create city dom
			var self = this;
			var citem = {};
			citem.data = d;
			citem.tempDoms = "";
			for (var i = 0, n = d.length; i < n; i++) {
				citem.tempDoms += '<a class="tempDom" href="javascript:void(0)">' + d[i].name + '</a>';
			}
			return citem;
		},
		createItem: function(d) { //create city item
			var self = this;
			var item = {};
			item.data = d;
			item.cdom = self.createCity(d.items);
			if (d.name == "hot") {
				//self.hotCon.html(item.cdom.tempDoms);
			} else if (d.type == "add") {
				self.chooseCon.append(item.cdom.tempDoms);
			} else {
				self.cityCon.html(item.cdom.tempDoms);
			}
			self.items.push(item);
		}
	}

})(bshare)