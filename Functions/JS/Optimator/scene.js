// A class to hold information about a visual page.
// 
// Author Jodie Muller
var Scene = /** @class */ (function () {
    function Scene(version, name, timeLength, width, height, backgroundColour, piecesList, sets) {
        this.Name = name || "New Scene";
        this.Version = version || ThisVersion;
        this.TimeLength = timeLength || 0;
        this.Width = width || defaultDrawingBoardWidth;
        this.Height = height || defaultDrawingBoardHeight;
        this.BackgroundColour = backgroundColour || new ColourState();
        this.PiecesList = piecesList || [];
        this.Sets = sets || [];
    }
    // ----- GENERAL FUNCTIONS -----
    // Gets scene's current details in a string format.
    Scene.prototype.ToString = function (full) {
        if (full === void 0) { full = false; }
        var saveData = ['*Scene;' + this.Name + ";" + this.Version,
            this.TimeLength.toString() + ";" + this.Width.toString() + ":" + this.Height.toString(),
            this.BackgroundColour.ToString()];
        for (var _i = 0, _a = this.PiecesList; _i < _a.length; _i++) {
            var piece = _a[_i];
            // Remove pieces with no spots
            if (piece.Data.length > 0) {
                for (var _b = 0, _c = piece.ToString(); _b < _c.length; _b++) {
                    var line = _c[_b];
                    saveData.push(line);
                }
            }
        }
        for (var _d = 0, _e = this.Sets; _d < _e.length; _d++) {
            var set = _e[_d];
            for (var _f = 0, _g = set.ToString(); _f < _g.length; _f++) {
                var line = _g[_f];
                saveData.push(line);
            }
        }
        if (full) {
            // TODO
            // Document originals and changes for a moving scene
        }
        return saveData;
    };
    return Scene;
}());
//# sourceMappingURL=scene.js.map