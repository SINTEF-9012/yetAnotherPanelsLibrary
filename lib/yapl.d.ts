declare module yapl {
    class Panel {
        public element: JQuery;
        public opened: boolean;
        public active: boolean;
        public present: boolean;
        public onOpen: () => void;
        public onClose: () => void;
        constructor(element: JQuery, present: boolean);
        public width(): number;
        public height(): number;
        public show(): void;
        public hide(): void;
        public whenOpened(): void;
        public whenClosed(): void;
    }
    interface options {
        autoHideOnClose?: boolean;
        mainPanelMask?: boolean;
        animationDuration?: number;
        bounceTime?: number;
        snapSpeed?: number;
        bounceEasing?: any;
        preventDefaultException?: any;
    }
}
declare class yetAnotherPanelsLibrary {
    private mainPanel;
    private topPanel;
    private rightPanel;
    private bottomPanel;
    private leftPanel;
    private scroller;
    private wrapper;
    private iscroll;
    public autoHideOnClose: boolean;
    private mainPanelMask;
    private options;
    constructor(mainPanel: JQuery, options?: yapl.options);
    private generatePanel(panel, active, onOpen?, onClose?);
    public updateView(): yetAnotherPanelsLibrary;
    public setTopPanel(panel: JQuery, active?: boolean, onOpen?: () => void, onClose?: () => void): yetAnotherPanelsLibrary;
    public setRightPanel(panel: JQuery, active?: boolean, onOpen?: () => void, onClose?: () => void): yetAnotherPanelsLibrary;
    public setBottomPanel(panel: JQuery, active?: boolean, onOpen?: () => void, onClose?: () => void): yetAnotherPanelsLibrary;
    public setLeftPanel(panel: JQuery, active?: boolean, onOpen?: () => void, onClose?: () => void): yetAnotherPanelsLibrary;
    private showPanel(panel);
    public showMainPanel(): void;
    public showTopPanel(): void;
    public showRightPanel(): void;
    public showBottomPanel(): void;
    public showLeftPanel(): void;
    private disablePanels();
}
