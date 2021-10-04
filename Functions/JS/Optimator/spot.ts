/// A class to hold information about an individual coordinate.
/// 
/// Author Jodie Muller

class Spot {
    X: number;
    XRight: number;
    Y: number;
    YDown: number;

    Connection: Connector;
    Tension: number;
    LineWidth: number;
    LineColour: Colour;


    constructor(x?: number, y?: number, xr?: number, yd?: number, connection?: Connector, tension?: number,
        lineWidth?: number, lineColour?: Colour)
    {
        this.X = x || 0;
        this.Y = y || 0;
        this.XRight = xr || x || 0;
        this.YDown = yd || y || 0;

        this.Connection = connection || Connector.Corner;
        this.Tension = tension || 0.5;
        this.LineWidth = lineWidth || defaultOutlineWidth;
        this.LineColour = lineColour || defaultOutline;
    }



    // ----- FUNCTIONS -----

    // Converts the spot data into saveable string format.
    ToString(): string
    {
        let saveData: string = this.X + ":" + this.Y + ":" + this.XRight + ":" + this.YDown + ";" 
        + this.Connection + ";" + this.Tension + ";" + this.LineWidth + ";" + this.LineColour;
        return saveData
    }

    // Sets data based on string input
    FromString(data: string)
    {
        let info = data.split(';');
        let line1 = info[0].split(':');
        this.X = Number(line1[0]);
        this.Y = Number(line1[1]);
        this.XRight = Number(line1[2]);
        this.YDown = Number(line1[3]);

        this.Tension = Number(info[1]);
        this.LineWidth = Number(info[2]);

        let rgba = info[3].split('.');
        this.LineColour = new Colour(Number(rgba[0]), Number(rgba[1]), Number(rgba[2]), Number(rgba[3]));
    }

    // Draws the spot to the screen.
    Draw(ctx: CanvasRenderingContext2D, colour: Colour = blackShade)
    {
        DrawCross(ctx, this.X, this.Y, colour);
    }

    // Returns the x/y coordinates of the spot
    GetPoints()
    {
        return [this.X, this.Y];
    }

    // Checks whether the line is visible
    IsVisible()
    {
        if (this.LineWidth > 0 && this.LineColour.A > 0)
        {
            return true;
        }
        return false;
    }
}