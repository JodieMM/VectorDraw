// Additional functions relevant more broadly.
// 
// Author Jodie Muller



// ----- ARRAYS -----

// Goes to next item in array, overlapping if necessary
function NextIndex(array: Array<any>, index: number, forward?: boolean)
{
    forward = typeof forward === "undefined" ? true : forward;
    if (forward)
    {
        index++;
        if (index >= array.length)
        {
            index = index % array.length;
        }
        return index;
    }
    else
    {
        index--;
        while (index < 0)
        {
            index += array.length;
        }
        return index;
    }
}

// Returns last item in an array
function LastItem(array: Array<any>)
{
    return array[array.length - 1];
}

// Swaps Two Items in an Array
function ArraySwap(array: Array<any>, one: number, two: number)
{
    let holdingBay = array[one];
    array[one] = array[two];
    array[two] = holdingBay;
}



// ----- CLICK FUNCTIONS -----

/// Checks if a spot has been clicked within a piece
function FindSpotClicked(base: Piece, x: number, y: number) : Spot
{
    for (let precision of ClickPrecisions)
    {
        for (let spot of base.Data)
        {
            if (spot.X + precision > x && spot.X - precision < x &&
                spot.Y + precision > y && spot.Y - precision < y)
            {
                return spot;
            }
        }
    }
    return null;
}

/// Checks if a piece has been clicked
function FindPieceClicked(ctx: CanvasRenderingContext2D, base: Scene, x: number, y: number, 
    topFirst: boolean = true) : Piece
{
    for (var i: number = topFirst ? base.PiecesList.length - 1 : 0; 
        topFirst? i >= 0 : i < base.PiecesList.length; topFirst ? i-- : i++)
    {
        base.PiecesList[i].GetPath(ctx);
        ctx.closePath();
        if (ctx.isPointInPath(x, y))
        {
            return base.PiecesList[i];
        }
    }
    return null;
}



// ----- OTHER FUNCTIONS -----

// Converts hexidecimal value to colour
function ConvertFromHexi(hexi: string, a?: number)
{
    var r = hexi.slice(1, 3);
    var g = hexi.slice(3, 5);
    var b = hexi.slice(5, 7);
    var aVal = a || 1;
    return new Colour(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), aVal);
}

// Converts RGBA value to colour
function ConvertToHexi(colour: Colour) : string
{
    var R = colour.R.toString(16).length > 1 ? colour.R.toString(16) : "0" + colour.R.toString(16);
    var G = colour.G.toString(16).length > 1 ? colour.G.toString(16) : "0" + colour.G.toString(16);
    var B = colour.B.toString(16).length > 1 ? colour.B.toString(16) : "0" + colour.B.toString(16);
    return '#' + R + G + B;
}

// Generates a random number, both min and max inclusive
function RandomInt(max: number, min?: number) 
{
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
}