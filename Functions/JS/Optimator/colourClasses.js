// A class to hold a colour's argb values.
// 
// Author Jodie Muller
var Colour = /** @class */ (function () {
    function Colour(r, g, b, a) {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a || 1;
        this.Validate();
    }
    // Converts the colour into saveable string format.
    Colour.prototype.ToString = function () {
        return this.R + "." + this.G + "." + this.B + "." + this.A;
    };
    // Converts the colour into a string used in HTML
    Colour.prototype.Use = function () {
        return "rgba(" + this.R + ", " + this.G + ", " + this.B + ", " + this.A + ")";
    };
    // Ensures all RGBA values are in acceptable ranges
    Colour.prototype.Validate = function () {
        if (this.R > 255)
            this.R = 255;
        if (this.G > 255)
            this.G = 255;
        if (this.B > 255)
            this.B = 255;
        if (this.A > 1)
            this.A = 1;
        if (this.R < 0)
            this.R = 0;
        if (this.G < 0)
            this.G = 0;
        if (this.B < 0)
            this.B = 0;
        if (this.A < 0)
            this.A = 0;
    };
    return Colour;
}());
// A class to hold a single colour layer
//
// Author Jodie Muller
var ColourLayer = /** @class */ (function () {
    function ColourLayer(fillOption, colours, direction, details) {
        this.FillOption = fillOption || FillOption.Fill;
        this.Colours = colours || [defaultFills[RandomInt(defaultFills.length - 1)]];
        this.Direction = direction || [0];
        this.Details = details || "";
    }
    // Converts the colour layer into saveable string format.
    ColourLayer.prototype.ToString = function () {
        var saveData = this.FillOption + ":";
        for (var _i = 0, _a = this.Colours; _i < _a.length; _i++) {
            var i = _a[_i];
            saveData += i.ToString() + (i == this.Colours[this.Colours.length - 1] ? ":" : ",");
        }
        for (var _b = 0, _c = this.Direction; _b < _c.length; _b++) {
            var i = _c[_b];
            saveData += i + (i == this.Direction[this.Direction.length - 1] ? ":" : ",");
        }
        return saveData + this.Details + ";";
    };
    // Sets data based on string input
    ColourLayer.prototype.FromString = function (data) {
        var info = data.split(':');
        this.FillOption = Number(info[0]);
        this.Colours = [];
        var colours = info[1].split(',');
        for (var _i = 0, colours_1 = colours; _i < colours_1.length; _i++) {
            var colour = colours_1[_i];
            if (colour != "") {
                var rgba = colour.split('.');
                this.Colours.push(new Colour(Number(rgba[0]), Number(rgba[1]), Number(rgba[2]), Number(rgba[3])));
            }
        }
        this.Direction = [];
        var direct = info[2].split(',');
        for (var _a = 0, direct_1 = direct; _a < direct_1.length; _a++) {
            var direc = direct_1[_a];
            if (direc != "") {
                this.Direction.push(Number(direc));
            }
        }
        this.Details = info[3];
    };
    // Returns the fillStyle to draw this ColourLayer
    ColourLayer.prototype.GetFillStyle = function () {
        switch (this.FillOption) {
            case FillOption.Fill:
                {
                    return this.Colours[0].Use();
                }
            case FillOption.LinearGradient:
                {
                    return this.Colours[0].Use();
                }
            case FillOption.CenterGradient:
                {
                    return this.Colours[0].Use();
                }
        }
    };
    return ColourLayer;
}());
// A class to hold the dynamic fill colouring of a piece.
// 
// Author Jodie Muller
var ColourState = /** @class */ (function () {
    function ColourState(layers) {
        this.Layers = layers || [new ColourLayer()];
    }
    // Converts the colour state into saveable string format.
    ColourState.prototype.ToString = function () {
        var saveData = "";
        for (var _i = 0, _a = this.Layers; _i < _a.length; _i++) {
            var i = _a[_i];
            saveData += i.ToString();
        }
        return saveData;
    };
    // Sets data based on string input
    ColourState.prototype.FromString = function (data) {
        var info = data.split(';');
        this.Layers = [];
        for (var _i = 0, info_1 = info; _i < info_1.length; _i++) {
            var layer = info_1[_i];
            if (layer != "") {
                var colour = new ColourLayer();
                colour.FromString(layer);
                this.Layers.push(colour);
            }
        }
    };
    // Returns an array of fillStyles to use when drawing this ColourState
    ColourState.prototype.GetFillStyles = function () {
        var fillStyles = [];
        for (var _i = 0, _a = this.Layers; _i < _a.length; _i++) {
            var i = _a[_i];
            fillStyles.push(i.GetFillStyle());
        }
        return fillStyles;
    };
    return ColourState;
}());
//# sourceMappingURL=colourClasses.js.map