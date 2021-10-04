// A class to maintain the current position, angle and size of a part.
// 
// Author Jodie Muller
var State = /** @class */ (function () {
    function State(x, y, r, t, s, sm) {
        this.X = x || 0;
        this.Y = y || 0;
        this.R = r || 0;
        this.T = t || 0;
        this.S = s || 0;
        this.SM = sm || 1;
    }
    // ----- FUNCTIONS -----
    // Sets the middle of the piece to the centre of its display window.
    State.prototype.SetCoordsBasedOnBoard = function (width, height) {
        this.X = width / 2.0;
        this.Y = height / 2.0;
    };
    // Convert state to string
    State.prototype.ToString = function () {
        return this.X.toString() + ":" + this.Y.toString() + ":" + this.R.toString() + ":" +
            this.T.toString() + ":" + this.S.toString() + ":" + this.SM.toString();
    };
    return State;
}());
//# sourceMappingURL=state.js.map