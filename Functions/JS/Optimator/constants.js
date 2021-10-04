/// Holds all of the unchanging values.
/// 
/// Author Jodie Muller
// Version
var ThisVersion = "1.0.0W";
// File Extensions
var PieceExt = ".optrp";
var SetExt = ".optrs";
var SceneExt = ".optrc";
var VideoExt = ".optrv";
var PngExt = ".png";
var Mp4Ext = ".mp4";
var AviExt = ".avi";
var GifExt = ".gif";
// File Filters
var PieceFilter = "Piece Files (*" + PieceExt + ")|*" + PieceExt;
var SetFilter = "Set Files (*" + SetExt + ")|*" + SetExt;
var SceneFilter = "Scene Files (*" + SceneExt + ")|*" + SceneExt;
var VideoFilter = "Video Files (*" + VideoExt + ")|*" + VideoExt;
var AviFilter = "Avi File (*" + AviExt + ")|*" + AviExt;
var PartFilter = "Part Files (*" + PieceExt + ";*" + SetExt + ")|*" + PieceExt + ";*" + SetExt;
var OptiFilter = "Optimator Files (*" + PieceExt + ";*" + SetExt + ";*" + SceneExt + ";*" + VideoExt +
    ")|*" + PieceExt + ";*" + SetExt + ";*" + SceneExt + ";*" + VideoExt;
// UI Precision
var ClickPrecisions = [0, 1, 3, 5, 9];
var DragPrecision = 5;
var SegmentPixelWidth = 2;
// Piece Defaults
var defaultFills = [new Colour(255, 204, 240, 1), new Colour(153, 153, 255, 1),
    new Colour(255, 153, 102, 1), new Colour(153, 255, 153, 1), new Colour(51, 204, 255, 1)];
var defaultOutline = new Colour(0, 0, 0, 1);
var defaultOutlineWidth = 2;
// Piece Options
var FillOption;
(function (FillOption) {
    FillOption[FillOption["Fill"] = 0] = "Fill";
    FillOption[FillOption["LinearGradient"] = 1] = "LinearGradient";
    FillOption[FillOption["CenterGradient"] = 2] = "CenterGradient";
})(FillOption || (FillOption = {}));
var Connector;
(function (Connector) {
    Connector[Connector["Corner"] = 0] = "Corner";
    Connector[Connector["Curve"] = 1] = "Curve";
})(Connector || (Connector = {}));
var PieceOption;
(function (PieceOption) {
    PieceOption[PieceOption["Moveable"] = 0] = "Moveable";
    PieceOption[PieceOption["Flat"] = 1] = "Flat";
    PieceOption[PieceOption["Constant"] = 2] = "Constant";
})(PieceOption || (PieceOption = {}));
var DrawType;
(function (DrawType) {
    DrawType[DrawType["Full"] = 0] = "Full";
    DrawType[DrawType["Decal"] = 1] = "Decal";
    DrawType[DrawType["Cutout"] = 2] = "Cutout";
})(DrawType || (DrawType = {}));
// Colours
var blackShade = new Colour(0, 0, 0, 1);
var whiteShade = new Colour(255, 255, 2555, 1);
var shadowShade = new Colour(169, 169, 169, 1);
var invisibleShade = new Colour(0, 0, 0, 0);
var highlightShade = new Colour(34, 139, 34, 1);
var backgroundDrawingBoardShade = new Colour(108, 108, 108, 1);
//const select: Colour = new Colour(255, 255, 0, 0);
//const lowlight: Colour = new Colour(255, 95, 158, 160);
//const option1: Colour = new Colour(255, 139, 69, 19);
//const option2: Colour = new Colour(255, 128, 0, 128);
//const activeAnimation: Colour = new Colour(255, 153, 204, 255);
//const finishedAnimation: Colour = new Colour(255, 77, 166, 255);
//const toDoAnimation: Colour = new Colour(255, 204, 230, 255);
// Drawing Board Sizes and Styles
var defaultDrawingBoardWidth = 1754; //8419;
var defaultDrawingBoardHeight = 1240; //5953;
// Maximum Values
var MaximumSize = 1000;
var MaximumXY = 6000;
// Scene Options
var Action;
(function (Action) {
    Action[Action["None"] = 0] = "None";
    Action[Action["X"] = 1] = "X";
    Action[Action["Y"] = 2] = "Y";
    Action[Action["Rotation"] = 3] = "Rotation";
    Action[Action["Turn"] = 4] = "Turn";
    Action[Action["Spin"] = 5] = "Spin";
    Action[Action["Size"] = 6] = "Size";
})(Action || (Action = {}));
//# sourceMappingURL=constants.js.map