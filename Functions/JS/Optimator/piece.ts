// A class to hold information about each piece. 
// A piece is an object that cannot be seperated further.
// 
// Author Jodie Muller

class Piece 
{	
    Name: string;
    Version: string;

    State: State;
    Type: PieceOption = PieceOption.Constant;
    DrawStyle: DrawType;
    Line: boolean = false;
    Colours: ColourState;
    Data: Spot[] = [];


    constructor(version?: string, name?: string, state?: State, type?: PieceOption, 
        drawStyle?: DrawType, line?: boolean, colours?: ColourState, data?: Spot[])
    {
        this.Name = name || "New Piece";
        this.Version = version || ThisVersion;
        this.State = state || new State();
        this.Type = type || PieceOption.Constant;
        this.DrawStyle = drawStyle || DrawType.Full;
        this.Line = typeof line === "undefined" ? false : line;
        this.Colours = colours || new ColourState();
        this.Data = data || [];
    }


    // ----- GENERAL FUNCTIONS -----

    // Gets piece's current details in a string format.
    ToString() : string[]
    {
        let saveData: string[] = ['*Piece;' + this.Name + ";" + this.Version, this.Type + ";" + this.Line, this.Colours.ToString()];
        this.Data.forEach(function (value) {
            saveData.push(value.ToString());
        });
        return saveData;
    }

    // Sets data based on string input
    FromString(data: string[])
    {
        // *Piece;PieceName;X.Y.Z
        // Name;Location;PieceType;Line
        // ColourState
        // Spot [1 per line]
        let line1 = data[0].split(';');
        this.Name = line1[1];
        this.Version = line1[2];

        let line2 = data[1].split(';');
        this.Type = Number(line2[0]);
        this.Line = Boolean(line2[1]);

        let colour = new ColourState();
        colour.FromString(data[2]);
        this.Colours = colour;

        this.Data = [];
        for (let i = 3; i < data.length; i++)
        {

        }

    }

    // Draws the piece.
    Draw(ctx: CanvasRenderingContext2D, colourState?: ColourState)
    {
        var currentPoints = this.GetPoints();
        if (currentPoints.length < 2)
        {
            return;
        }

        // Prepare for Drawing
        if (colourState == null)
        {
            colourState = this.Colours;
        }

        // Draw
        if (currentPoints.length > 2 && !this.Line && this.Colours.Layers[0].Colours.length > 0)
        {
            DrawShape(ctx, this, colourState.GetFillStyles());
        }
        if (currentPoints.length > 1)
        {
            DrawOutline(ctx, currentPoints, !this.Line);
        }
    }

    // Finds the points to print based on the rotation, turn, spin and size of the piece.
    GetPoints(state?: State): Spot[]
    {
        return this.Data;
    }

    // Gets the Shape's Outline in Web Form
    GetPath(context: CanvasRenderingContext2D)
    {
        if (this.Data.length < 1)
        {
            return;
        }        
        context.moveTo(this.Data[0].GetPoints()[0], this.Data[0].GetPoints()[1]);
        context.beginPath();
        for (var index = 0; index < this.Data.length; index++)
        {
            var nextIndex = NextIndex(this.Data, index);
            var start = this.Data[index].GetPoints();
            var end = this.Data[nextIndex].GetPoints();

            // Connected by Line
            if (this.Data[index].Connection == Connector.Corner &&
                this.Data[nextIndex].Connection == Connector.Corner)
            {            
                context.lineTo(end[0], end[1]);
            }
            // Starts with Curve
            else if (this.Data[index].Connection == Connector.Curve)
            {
                var count = 0;
                var foundNonCurve = false;
                while (count < this.Data.length && !foundNonCurve)
                {
                    if (this.Data[count].Connection != Connector.Curve)
                    {
                        foundNonCurve = true;
                    }
                    count++;
                }
                // All Curve - ClosedCurve Required
                if (!foundNonCurve)
                {
                    index = this.Data.length;
                    DrawCurve(ctx, this.Data, this.Data[0].Tension, true);
                }
                // Else skip- will be drawn in a curve loop
            }
            // Start of Curve
            else if (this.Data[index].Connection == Connector.Corner &&
                this.Data[nextIndex].Connection == Connector.Curve)
            {
                // Add previous point as 'curving-from'
                let curvePoints: Spot[] = [this.Data[NextIndex(this.Data, index, false)], 
                    this.Data[index], this.Data[nextIndex]];
                var newIndex = nextIndex;
                while (this.Data[newIndex].Connection == Connector.Curve)
                {
                    newIndex = NextIndex(this.Data, newIndex);
                    curvePoints.push(this.Data[newIndex]);
                }
                // Add next point as 'curving-to'
                curvePoints.push(this.Data[NextIndex(this.Data, newIndex)]);
                index = newIndex <= index ? this.Data.length : newIndex - 1;
                DrawCurve(ctx, curvePoints, this.Data[nextIndex].Tension);
            }
        }
    }
}