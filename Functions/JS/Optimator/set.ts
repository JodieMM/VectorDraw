// A class to hold information about groups of pieces. 
// A set is a collection of pieces and how they interconnect.
// 
// Author Jodie Muller

class Set 
{	
    Name: string;
    Version: string;

    PiecesList: Piece[];
    BasePiece: Piece;
    JoinedPieces: { [key: string]: string[]};                  // Base Piece --> Attached Pieces
    JoinsIndex: { [key: string]: Join};                        // Attached Piece --> Join
    PersonalStates: { [key: string]: State};                   // Piece --> Original State Position                       


    constructor(name?: string, version?: string, piecesList?: Piece[], basePiece?: Piece)
    {
        this.Name = name || "New Set";
        this.Version = version || ThisVersion;

        this.PiecesList = piecesList || [];
        this.BasePiece = basePiece || undefined;
    }


    // ----- GENERAL FUNCTIONS -----

    // Gets set's current details in a string format.
    ToString(full: boolean = false) : string[]
    {
        let saveData: string[] = ['*Set;' + this.Name + ";" + this.Version];
        for (let entry of this.PiecesList)
        {
            saveData.push(entry.Name + ";" + this.PersonalStates[entry.Name].ToString())
        }
        saveData.push("Joins");
        for (let entry in this.JoinsIndex)
        {
            saveData.push(this.JoinsIndex[entry].ToString())
        }

        // Save Pieces
        if (full)
        {
            for (let entry of this.PiecesList)
            {
                // Remove pieces with no spots
                if (entry.Data.length > 0)
                {
                    for (let line of entry.ToString())
                    {
                        saveData.push(line);
                    }     
                }       
            }
        }
        return saveData;
    }
}