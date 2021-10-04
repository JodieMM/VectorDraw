// A class to hold information about groups of pieces. 
// A set is a collection of pieces and how they interconnect.
// 
// Author Jodie Muller
var Set = /** @class */ (function () {
    function Set(name, version, piecesList, basePiece) {
        this.Name = name || "New Set";
        this.Version = version || ThisVersion;
        this.PiecesList = piecesList || [];
        this.BasePiece = basePiece || undefined;
    }
    // ----- GENERAL FUNCTIONS -----
    // Gets set's current details in a string format.
    Set.prototype.ToString = function (full) {
        if (full === void 0) { full = false; }
        var saveData = ['*Set;' + this.Name + ";" + this.Version];
        for (var _i = 0, _a = this.PiecesList; _i < _a.length; _i++) {
            var entry = _a[_i];
            saveData.push(entry.Name + ";" + this.PersonalStates[entry.Name].ToString());
        }
        saveData.push("Joins");
        for (var entry in this.JoinsIndex) {
            saveData.push(this.JoinsIndex[entry].ToString());
        }
        // Save Pieces
        if (full) {
            for (var _b = 0, _c = this.PiecesList; _b < _c.length; _b++) {
                var entry = _c[_b];
                // Remove pieces with no spots
                if (entry.Data.length > 0) {
                    for (var _d = 0, _e = entry.ToString(); _d < _e.length; _d++) {
                        var line = _e[_d];
                        saveData.push(line);
                    }
                }
            }
        }
        return saveData;
    };
    return Set;
}());
//# sourceMappingURL=set.js.map