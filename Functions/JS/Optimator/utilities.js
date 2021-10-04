// Additional functions relevant more broadly.
// 
// Author Jodie Muller
// ----- ARRAYS -----
// Goes to next item in array, overlapping if necessary
function NextIndex(array, index, forward) {
    forward = typeof forward === "undefined" ? true : forward;
    if (forward) {
        index++;
        if (index >= array.length) {
            index = index % array.length;
        }
        return index;
    }
    else {
        index--;
        while (index < 0) {
            index += array.length;
        }
        return index;
    }
}
// Returns last item in an array
function LastItem(array) {
    return array[array.length - 1];
}
// Swaps Two Items in an Array
function ArraySwap(array, one, two) {
    var holdingBay = array[one];
    array[one] = array[two];
    array[two] = holdingBay;
}
// ----- CLICK FUNCTIONS -----
/// Checks if a spot has been clicked within a piece
function FindSpotClicked(base, x, y) {
    for (var _i = 0, ClickPrecisions_1 = ClickPrecisions; _i < ClickPrecisions_1.length; _i++) {
        var precision = ClickPrecisions_1[_i];
        for (var _a = 0, _b = base.Data; _a < _b.length; _a++) {
            var spot = _b[_a];
            if (spot.X + precision > x && spot.X - precision < x &&
                spot.Y + precision > y && spot.Y - precision < y) {
                return spot;
            }
        }
    }
    return null;
}
/// Checks if a piece has been clicked
function FindPieceClicked(ctx, base, x, y, topFirst) {
    if (topFirst === void 0) { topFirst = true; }
    for (var i = topFirst ? base.PiecesList.length - 1 : 0; topFirst ? i >= 0 : i < base.PiecesList.length; topFirst ? i-- : i++) {
        base.PiecesList[i].GetPath(ctx);
        ctx.closePath();
        if (ctx.isPointInPath(x, y)) {
            return base.PiecesList[i];
        }
    }
    return null;
}
// ----- OTHER FUNCTIONS -----
// Converts hexidecimal value to colour
function ConvertFromHexi(hexi, a) {
    var r = hexi.slice(1, 3);
    var g = hexi.slice(3, 5);
    var b = hexi.slice(5, 7);
    var aVal = a || 1;
    return new Colour(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), aVal);
}
// Converts RGBA value to colour
function ConvertToHexi(colour) {
    var R = colour.R.toString(16).length > 1 ? colour.R.toString(16) : "0" + colour.R.toString(16);
    var G = colour.G.toString(16).length > 1 ? colour.G.toString(16) : "0" + colour.G.toString(16);
    var B = colour.B.toString(16).length > 1 ? colour.B.toString(16) : "0" + colour.B.toString(16);
    return '#' + R + G + B;
}
// Generates a random number, both min and max inclusive
function RandomInt(max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=utilities.js.map