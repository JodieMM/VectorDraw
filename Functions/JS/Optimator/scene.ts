// A class to hold information about a visual page.
// 
// Author Jodie Muller

class Scene 
{	
    Name: string;
    Version: string;

    TimeLength: number;
    Width: number;
    Height: number;
    BackgroundColour: ColourState;
    PiecesList: Piece[];
    Sets: Set[];


    constructor(version?: string, name?: string, timeLength?: number, width?: number, 
        height?: number, backgroundColour?: ColourState, piecesList?: Piece[], sets?: Set[])
    {
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
    ToString(full: boolean = false) : string[]
    {
        let saveData: string[] = ['*Scene;' + this.Name + ";" + this.Version,
            this.TimeLength.toString() + ";" + this.Width.toString() + ":" + this.Height.toString(),
            this.BackgroundColour.ToString()];

        for (let piece of this.PiecesList)
        {
            // Remove pieces with no spots
            if (piece.Data.length > 0)
            {
                for (let line of piece.ToString())
                {
                    saveData.push(line);
                }     
            }       
        }
        for (let set of this.Sets)
        {
            for (let line of set.ToString())
            {
                saveData.push(line);
            }
        }
        if (full)
        {
            // TODO
            // Document originals and changes for a moving scene
        }        
        return saveData;
    }
}