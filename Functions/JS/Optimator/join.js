// A class to indicate how two pieces connect in a set.
// 
// Author Jodie Muller
var Join = /** @class */ (function () {
    function Join(a, b, set, ax, ay, axright, aydown, bx, by, bxright, bydown, flipAngle, indexSwitch) {
        this.A = a;
        this.B = b;
        this.Set = set;
        this.AX = ax || 0;
        this.AY = ay || 0;
        this.AXRight = axright || 0;
        this.AYDown = aydown || 0;
        this.BX = bx || 0;
        this.BY = by || 0;
        this.BXRight = bxright || 0;
        this.BYDown = bydown || 0;
        this.FlipAngle = flipAngle || -1;
        this.IndexSwitch = indexSwitch || 0;
    }
    // ----- GENERAL FUNCTIONS -----
    // Converts the join's data into a string for saving.
    Join.prototype.ToString = function () {
        return this.AX + "," + this.AY + "," + this.AXRight + "," + this.AYDown + ";" +
            this.BX + "," + this.BY + "," + this.BXRight + "," + this.BYDown + ";" +
            this.FlipAngle + ";" + this.IndexSwitch;
    };
    return Join;
}());
//# sourceMappingURL=join.js.map