// A class to indicate how two pieces connect in a set.
// 
// Author Jodie Muller

class Join
{	
    A: string;       // Attaching Piece
    B: string;       // Base Piece
    Set: string;       // Set Belonging To

    // Join Positions (Set at A rts = 0, B rts = 0 respectively; B --> Join, Join --> A)
    AX: number;
    AY: number;
    AXRight: number;
    AYDown: number;

    BX: number;
    BY: number;
    BXRight: number;
    BYDown: number;

    // Depth Variables
    FlipAngle: number;
    IndexSwitch: number;                     


    constructor(a: string, b: string, set: string, ax?: number, ay?: number, axright?: number, aydown?: number,
        bx?: number, by?: number, bxright?: number, bydown?: number, flipAngle?: number, indexSwitch?: number)
    {
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
    ToString() : string
    {
        return this.AX + "," + this.AY + "," + this.AXRight + "," + this.AYDown + ";" +
            this.BX + "," + this.BY + "," + this.BXRight + "," + this.BYDown + ";" +
            this.FlipAngle + ";" + this.IndexSwitch;
    }
}