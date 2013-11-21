/// <reference path="./jquery.d.ts" />


module yapl {
	export class Panel {
		element: JQuery;
		opened: boolean;
		active: boolean;
		present: boolean;

		onOpen: () => void;
		onClose: () => void;

		constructor(element : JQuery, present : boolean) {
			this.element = element;
			this.active = present;
			this.opened = false;
			this.present = present;
		}

		width() {
			if (this.active) {
				return this.element.width();
			}
			else {
				return 0;
			}
		}

		height() {
			if (this.active) {
				return this.element.height();
			} else {
				return 0;
			}
		}

		show() {
			this.active = true;
			this.element&&this.element.show();
		}

		hide() {
			this.active = false;
			this.opened = false;
			this.element&&this.element.hide();
		}

		whenOpened() {
			if (!this.opened) {
				this.opened = true;
				if (this.onOpen) {
					this.onOpen();
				}
			}
		}

		whenClosed() {
			if (this.opened) {
				this.opened = false;
				if (this.onClose) {
					this.onClose();
				}
			}
		}

	}

	export interface options {
		autoHideOnClose?: boolean;
		mainPanelMask?: boolean;
		animationDuration?:number;
		bounceTime?: number;
		bounceEasing?:string;
		preventDefaultException?:any;
	}
}

declare var IScroll;

class yetAnotherPanelsLibrary {

	private mainPanel: yapl.Panel;
	private topPanel: yapl.Panel;
	private rightPanel: yapl.Panel;
	private bottomPanel: yapl.Panel;
	private leftPanel: yapl.Panel;

	private scroller : JQuery;
	private wrapper : JQuery;

	private iscroll : any;

	public autoHideOnClose : boolean;

	private mainPanelMask : JQuery;

	private options : yapl.options;

	constructor(mainPanel: JQuery, options?:yapl.options) {

		// Default parameters
		this.options = $.extend({
			autoHideOnClose: true,
			mainPanelMask: true,
			animationDuration: 300
			}, options);

		mainPanel.show();
		mainPanel.addClass("yapl_panel");
		this.scroller = mainPanel.parent();
		this.wrapper = this.scroller.parent();
		this.mainPanel =new yapl.Panel(mainPanel, true);
		this.topPanel = new yapl.Panel(null, false);
		this.rightPanel = new yapl.Panel(null, false);
		this.bottomPanel = new yapl.Panel(null, false);
		this.leftPanel = new yapl.Panel(null, false);

		this.autoHideOnClose = this.options.autoHideOnClose;
		var autoHideOnClose = this.autoHideOnClose;

		this.updateView();

		this.iscroll = new IScroll(this.wrapper.get(0), $.extend(
		{
			mouseWheel: false,
			scrollX: true,
			scrollY: true,
			snap: '.yapl_panel',
			// tap:true
		}, {
			bounceTime: options.bounceTime,
			bounceEasing: options.bounceEasing,
			preventDefaultException: options.preventDefaultException
			}));

		var obj = this;
		$(window).on('resize ready', function() {
			obj.updateView();
			obj.iscroll.scrollToElement(mainPanel.get(0));
		});

		if (this.options.mainPanelMask) {
			this.mainPanelMask = $('<div class="yapl_mask"></div>')
				.css({
					position:'absolute',
					// background: 'rgba(255,0,0,0.5)',
					zIndex: 10000
					})
				.hide()
				.on('click touchstart', function(e) {
					e.preventDefault();
					// console.log("canard");
					// obj.iscroll.scrollToElement(mainPanel.get(0), 300);
					// obj.mainPanelMask.hide();
					})
				.appendTo(this.scroller);
		} else {
			this.mainPanelMask = $();
		}

		this.iscroll.on('scrollEnd', function() {
			var aClose = false, anOpen = false;

			if (obj.leftPanel.active) {
				if (this.x == 0 && !obj.leftPanel.opened) {
					obj.leftPanel.whenOpened();
					anOpen = true;
				} else if (this.x != 0 && obj.leftPanel.opened) {
					obj.leftPanel.whenClosed();
					aClose = true;
					if (autoHideOnClose && !obj.leftPanel.present) {
						obj.leftPanel.hide();
					}
				}
			}
			if (obj.topPanel.active) {
				if (this.y == 0 && !obj.topPanel.opened) {
					obj.topPanel.whenOpened();
					anOpen = true;
				} else if (this.y != 0 && obj.topPanel.opened) {
					obj.topPanel.whenClosed();
					aClose = true;
					if (autoHideOnClose && !obj.topPanel.present) {
						obj.topPanel.hide();
					}
				}
			}
			if (obj.rightPanel.active) {
				if (this.x < 0 && !obj.rightPanel.opened) {
					obj.rightPanel.whenOpened();
					anOpen = true;
				} else if (this.x >= 0 && obj.rightPanel.opened) {
					obj.rightPanel.whenClosed();
					aClose = true;
					if (autoHideOnClose && !obj.rightPanel.present) {
						obj.rightPanel.hide();
					}
				}
			}
			if (obj.bottomPanel.active) {
				if (this.y < 0 && !obj.bottomPanel.opened) {
					obj.bottomPanel.whenOpened();
					anOpen = true;
				} else if (this.y >= 0 && obj.bottomPanel.opened) {
					obj.bottomPanel.whenClosed();
					aClose = true;
					if (autoHideOnClose && !obj.bottomPanel.present) {
						obj.bottomPanel.hide();
					}
				}
			}

			if (anOpen) {
				obj.mainPanelMask.show();
			}

			if (aClose) {
				obj.mainPanelMask.hide();

				if (obj.topPanel.present && !obj.topPanel.active) {
					obj.topPanel.show();
				}
				if (obj.rightPanel.present && !obj.rightPanel.active) {
					obj.rightPanel.show();
				}
				if (obj.bottomPanel.present && !obj.bottomPanel.active) {
					obj.bottomPanel.show();
				}
				if (obj.leftPanel.present && !obj.leftPanel.active) {
					obj.leftPanel.show();
				}

				obj.updateView();
			}
		});

	}

	private generatePanel(panel : JQuery, active : boolean, onOpen: () => void = null, onClose: () => void = null) : yapl.Panel {
		if(active) {
			panel.show();
		} else {
			panel.hide();
		}
		panel.addClass("yapl_panel");

		var obj = new yapl.Panel(panel, active);
		obj.onOpen = onOpen;
		obj.onClose = onClose;

		return obj;
	}

	updateView() {
		var leftWidth = this.leftPanel.width(),
			rightWidth = this.rightPanel.width(),
			topHeight = this.topPanel.height(),
			bottomHeight = this.bottomPanel.height(),
			wrapperWidth = this.wrapper.width(),
			wrapperHeight = this.wrapper.height();

		$(this.mainPanel.element).add(this.mainPanelMask).width(wrapperWidth)
			.height(wrapperHeight)
			.css({
				top: topHeight,
				left: leftWidth
				});

		if (this.leftPanel.active) {
			this.leftPanel.element.height(wrapperHeight)
				.css('top',topHeight);
		}

		if (this.rightPanel.active) {
			this.rightPanel.element.height(wrapperHeight)
				.css({
					top: topHeight,
					left: leftWidth+wrapperWidth
					});
		}

		if (this.topPanel.active) {
			this.topPanel.element.width(wrapperWidth)
				.css('left', leftWidth);
		}

		if (this.bottomPanel.active) {
			this.bottomPanel.element.width(wrapperWidth)
				.css({
					top: topHeight+wrapperHeight,
					left: leftWidth
					});
		}


		this.scroller.width(leftWidth + wrapperWidth + rightWidth)
			.height(topHeight + wrapperHeight + bottomHeight);

		if (this.iscroll) {
			var scroll = this.iscroll;
			window.setTimeout(function(){
				scroll.refresh();
			}, 0);
		}

		return this;
	}

	setTopPanel(panel : JQuery, active : boolean = false, onOpen: () => void = null, onClose: () => void = null) {
		this.topPanel = this.generatePanel(panel, active, onOpen, onClose);
		return this;
	}
	setRightPanel(panel : JQuery, active : boolean = false, onOpen: () => void = null, onClose: () => void = null) {
		this.rightPanel = this.generatePanel(panel, active, onOpen, onClose);
		return this;
	}
	setBottomPanel(panel : JQuery, active : boolean = false, onOpen: () => void = null, onClose: () => void = null) {
		this.bottomPanel = this.generatePanel(panel, active, onOpen, onClose);
		return this;
	}
	setLeftPanel(panel : JQuery, active : boolean = false, onOpen: () => void = null, onClose: () => void = null) {
		this.leftPanel = this.generatePanel(panel, active, onOpen, onClose);
		return this;
	}

	private showPanel(panel : yapl.Panel) {
		panel.show();
		this.updateView();

		var scroll = this.iscroll,
			mask = this.mainPanelMask,
			duration = this.options.animationDuration,
			easing = scroll.options.bounceEasing;

		window.setTimeout(function() {
			scroll.scrollToElement(panel.element.get(0), duration, undefined, undefined, easing);

			panel.whenOpened();
			mask.show();

		}, 0);
	}

	showTopPanel() {
		if (!this.topPanel.opened) {
			this.disablePanels();
			this.showPanel(this.topPanel);
		}
	}

	showRightPanel() {
		if (!this.rightPanel.opened) {
			this.disablePanels();
			this.showPanel(this.rightPanel);
		}
	}

	showBottomPanel() {
		if (!this.bottomPanel.opened) {
			this.disablePanels();
			this.showPanel(this.bottomPanel);
		}
	}

	showLeftPanel() {
		if (!this.leftPanel.opened) {
			this.disablePanels();
			this.showPanel(this.leftPanel);
		}
	}



	private disablePanels() {
		this.topPanel.hide();
		this.rightPanel.hide();
		this.bottomPanel.hide();
		this.leftPanel.hide();
	}
}