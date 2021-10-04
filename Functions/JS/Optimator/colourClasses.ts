// A class to hold a colour's argb values.
// 
// Author Jodie Muller

class Colour
{
    R: number;
    G: number;
    B: number;
    A: number;

    constructor(r: number, g: number, b: number, a?: number)
    {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a || 1;
        this.Validate();
    }

    // Converts the colour into saveable string format.
    ToString(): string
    {
        return this.R + "." + this.G + "." + this.B + "." + this.A;
    }

    // Converts the colour into a string used in HTML
    Use(): string
    {
        return "rgba(" + this.R + ", " + this.G + ", " + this.B + ", " + this.A + ")";
    }

    // Ensures all RGBA values are in acceptable ranges
    Validate()
    {
        if (this.R > 255) this.R = 255;
        if (this.G > 255) this.G = 255;
        if (this.B > 255) this.B = 255;
        if (this.A > 1) this.A = 1;

        if (this.R < 0) this.R = 0;
        if (this.G < 0) this.G = 0;
        if (this.B < 0) this.B = 0;
        if (this.A < 0) this.A = 0;
    }
}



// A class to hold a single colour layer
//
// Author Jodie Muller
class ColourLayer
{
    FillOption: FillOption;
    Colours: Colour[];
    Direction: number[];
    Details: string;

    constructor(fillOption?: FillOption, colours?: Colour[], direction?: number[], details?: string)
    {
        this.FillOption = fillOption || FillOption.Fill;
        this.Colours = colours || [defaultFills[RandomInt(defaultFills.length - 1)]];
        this.Direction = direction || [0];
        this.Details = details || "";
    }

    // Converts the colour layer into saveable string format.
    ToString(): string
    {
        let saveData: string = this.FillOption + ":";
        for (let i of this.Colours)
        {
            saveData += i.ToString() + (i == this.Colours[this.Colours.length - 1] ? ":" : ",");
        }
        for (let i of this.Direction)
        {
            saveData += i + (i == this.Direction[this.Direction.length - 1] ? ":" : ",");
        }
        return saveData + this.Details + ";";
    }

    // Sets data based on string input
    FromString(data: string)
    {
        let info = data.split(':');
        this.FillOption = Number(info[0]);

        this.Colours = [];
        let colours = info[1].split(',');
        for (let colour of colours)
        {
            if (colour != "")
            {
                let rgba = colour.split('.');
                this.Colours.push(new Colour(Number(rgba[0]), Number(rgba[1]), Number(rgba[2]),
                    Number(rgba[3])));
            }
        }

        this.Direction = [];
        let direct = info[2].split(',');
        for (let direc of direct)
        {
            if (direc != "")
            {
                this.Direction.push(Number(direc));
            }
        }

        this.Details = info[3];
    }

    // Returns the fillStyle to draw this ColourLayer
    GetFillStyle()
    {
        switch (this.FillOption)
        {
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
    }
}



// A class to hold the dynamic fill colouring of a piece.
// 
// Author Jodie Muller

class ColourState
{
    Layers: ColourLayer[];

    constructor(layers?: ColourLayer[])
    {
        this.Layers = layers || [new ColourLayer()];
    }

    // Converts the colour state into saveable string format.
    ToString(): string
    {
        let saveData: string = "";
        for (let i of this.Layers)
        {
            saveData += i.ToString();
        }
        return saveData;
    }

    // Sets data based on string input
    FromString(data: string)
    {
        let info = data.split(';');
        this.Layers = [];
        for (let layer of info)
        {
            if (layer != "")
            {
                let colour = new ColourLayer();
                colour.FromString(layer);
                this.Layers.push(colour);
            }
        }
    }


    // Returns an array of fillStyles to use when drawing this ColourState
    GetFillStyles()
    {
        var fillStyles = [];
        for (let i of this.Layers)
        {
            fillStyles.push(i.GetFillStyle());
        }
        return fillStyles;
    }
}