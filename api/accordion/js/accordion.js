var bshare = bshare || {};

(function(BS) {
	BS.Accordion = function(option) {
		var self = this;
		this.settings = $.extend({
			allClose: true,
			selecteIndex: [0, 0]
		}, option || {});
		this.container = option.container;
		this.data = option.items;
		this.items = [];
		self.selectItem = null;
		if (this.settings.width) this.container.css({
				width: this.settings.width
			})
		this.dom = $('<ul class="accordion"></ul>').appendTo(this.container);
		for (var i = 0, n = this.data.length; i < n; i++) {
			self.createItem(this.data[i]);
		}
		self.selectByIndex(self.settings.selecteIndex);
	}
	BS.Accordion.prototype = {
		show: function(item) {
			var self = this;
			item.title.addClass("selected");
			item.body.stop();
			item.body.slideDown(300);
		},
		hide: function(item) {
			item.title.removeClass("selected");
			item.body.stop();
			item.body.slideUp(300);
		},
		createItem: function(d) {
			var self = this;
			var item = {};
			var d = item.data = d;
			item.items = [];
			item.dom = $('<li></li>');
			item.title = $('<div class="title">' + d.title + '</div>').appendTo(item.dom);
			item.body = $('<ul class="body"></ul>').appendTo(item.dom);
			item.crateItem = function(d) {
				var cItem = {};
				cItem.parent = item;
				cItem.dom = $('<li>' + d.title + '</li>').appendTo(item.body);
				cItem.dom.click(function() {
					item.selectItem(cItem);
					if (d.href != "") {
						if (self.settings.iframeId) {
							parent.$(self.settings.iframeId).attr("src","./"+d.href);
						} else if (self.settings.loadCon) {
							self.settings.loadCon.load(d.href);
						}
					}
					self.selectItem = cItem;
				});

				item.items.push(cItem);
			}
			if (d.items) {
				for (var i = 0, n = d.items.length; i < n; i++) {
					item.crateItem(d.items[i]);
				}
			}
			item.dom.appendTo(self.dom);
			if (self.settings.allClose) {
				item.body.css("display", "none");
			}

			self.items.push(item);
			item.title.click(function() {
				if (item.selected) {
					self.hide(item);
					item.selected = false;
				} else {
					self.show(item);
					item.selected = true;
				}
			})
			item.selectItem = function(item) {
				if (self.selectItem) {
					self.selectItem.dom.removeClass("selected");
				}
				item.dom.addClass("selected");
			}
		},
		selectByIndex: function(index) {
			var self = this;
			for (var i = 0; i < self.items.length; i++) {
				//self.items[i].body.css("display","none");
				self.hide(self.items[i]);
				self.items[i].selected = false;
			}
			if (!$.isArray(index)) {
				self.show(self.items[index]);
			} else {
				self.show(self.items[index[0]]);
				self.items[index[0]].selectItem(self.items[index[0]].items[index[1]]);
				self.selectItem = self.items[index[0]].items[index[1]];
			}
			self.items[index[0]].selected = true;
		},
		getByTitle: function(title) {
			var self = this;
			for (var i = 0; i < self.items.length; i++) {
				var temp = self.items[i].data.items;
				for (var j = 0; j < temp.length; j++) {
					if (temp[j].title == title) {
						return [i, j];
					}
				}
			}
		},
		selectByTitle: function(title) {
			var self = this;
			var temp = self.getByTitle(title);
			self.selectByIndex(temp);
		}


	}

})(bshare)