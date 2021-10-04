// All of the drawing functions.
// 
// Author Jodie Muller
// Draws a + at the given coordinate
function DrawCross(ctx, xcoord, ycoord, colour) {
    if (typeof colour === 'undefined') {
        colour = blackShade;
    }
    ctx.strokeStyle = colour.Use();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xcoord - 4, ycoord);
    ctx.lineTo(xcoord + 4, ycoord);
    ctx.moveTo(xcoord, ycoord - 4);
    ctx.lineTo(xcoord, ycoord + 4);
    ctx.stroke();
}
// Draws a x at the given coordinate
function DrawX(ctx, xcoord, ycoord, colour) {
    if (typeof colour === 'undefined') {
        colour = blackShade;
    }
    ctx.strokeStyle = colour.Use();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xcoord - 4, ycoord - 4);
    ctx.lineTo(xcoord + 4, ycoord + 4);
    ctx.moveTo(xcoord + 4, ycoord - 4);
    ctx.lineTo(xcoord - 4, ycoord + 4);
    ctx.stroke();
}
// Draws a line segment with a set width and colour
function DrawCircle(ctx, xcoord, ycoord, width, colour) {
    ctx.beginPath();
    ctx.arc(xcoord, ycoord, width / 2.0, 0, 2 * Math.PI);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
}
// Draws a full line of gradient width and colour
function DrawLine(ctx, xcoord, ycoord, x2coord, y2coord, width, width2, colour, colour2) {
    // Input Validation
    if (xcoord == x2coord && ycoord == y2coord) {
        //DrawCircle(ctx, xcoord, ycoord, width2, colour.Use());
        return;
    }
    // Function settings
    var pixelLength = Math.sqrt(Math.pow(Math.abs(x2coord - xcoord), 2) + Math.pow(Math.abs(y2coord - ycoord), 2));
    var steps = pixelLength * SegmentPixelWidth;
    // Draw mini-lines
    var xIncrement = (x2coord - xcoord) / steps;
    var yIncrement = (y2coord - ycoord) / steps;
    var widthIncrement = (width2 - width) / steps;
    var colRIncrement = (colour2.R - colour.R) / steps;
    var colGIncrement = (colour2.G - colour.G) / steps;
    var colBIncrement = (colour2.B - colour.B) / steps;
    var colAIncrement = (colour2.A - colour.A) / steps;
    for (var i = 0; i < steps; i++) {
        DrawCircle(ctx, xcoord + xIncrement * i, ycoord + yIncrement * i, +width + +(widthIncrement * i), "rgba(" + (+colour.R + +colRIncrement * i) + ", " + (+colour.G + +colGIncrement * i) + ", " +
            (+colour.B + +colBIncrement * i) + ", " + (+colour.A + +colAIncrement * i) + ")");
    }
}
// Draws a Cardinal Spline curve through the provided coordinates
function DrawCurve(ctx, originalPoints, tension, isClosed, numOfSegments) {
    if (tension === void 0) { tension = 0.5; }
    if (isClosed === void 0) { isClosed = false; }
    if (numOfSegments === void 0) { numOfSegments = 32; }
    // Convert Points
    var transformedPoints = [];
    for (var _i = 0, originalPoints_1 = originalPoints; _i < originalPoints_1.length; _i++) {
        var spot = originalPoints_1[_i];
        transformedPoints.push(spot.X);
        transformedPoints.push(spot.Y);
    }
    // Cardinal Calculations
    var pts = GetCurvePoints(transformedPoints, tension, isClosed, numOfSegments);
    // Draw Points
    var pointIndex = 1;
    var width = originalPoints[pointIndex].LineWidth;
    var widthIncrement = (originalPoints[pointIndex + 1].LineWidth - width) / numOfSegments;
    var colour = originalPoints[pointIndex].LineColour;
    var colRIncrement = (originalPoints[pointIndex + 1].LineColour.R - colour.R) / numOfSegments;
    var colGIncrement = (originalPoints[pointIndex + 1].LineColour.G - colour.G) / numOfSegments;
    var colBIncrement = (originalPoints[pointIndex + 1].LineColour.B - colour.B) / numOfSegments;
    var colAIncrement = (originalPoints[pointIndex + 1].LineColour.A - colour.A) / numOfSegments;
    for (var i = 2; i < pts.length - 1; i += 2) {
        // Width
        var width1 = width;
        width += widthIncrement;
        var width2 = width;
        // Colour
        var col1 = new Colour(colour.R, colour.G, colour.B, colour.A);
        colour.R += colRIncrement;
        colour.G += colGIncrement;
        colour.B += colBIncrement;
        colour.A += colAIncrement;
        var col2 = colour;
        // Increase Increment
        if (i % ((numOfSegments) * 2) == 0) {
            pointIndex++;
            if (pointIndex != originalPoints.length - 1) {
                widthIncrement = (originalPoints[pointIndex + 1].LineWidth - originalPoints[pointIndex].LineWidth) / numOfSegments;
                colRIncrement = (originalPoints[pointIndex + 1].LineColour.R - originalPoints[pointIndex].LineColour.R) / numOfSegments;
                colGIncrement = (originalPoints[pointIndex + 1].LineColour.G - originalPoints[pointIndex].LineColour.G) / numOfSegments;
                colBIncrement = (originalPoints[pointIndex + 1].LineColour.B - originalPoints[pointIndex].LineColour.B) / numOfSegments;
                colAIncrement = (originalPoints[pointIndex + 1].LineColour.A - originalPoints[pointIndex].LineColour.A) / numOfSegments;
            }
        }
        DrawLine(ctx, pts[i - 2], pts[i - 1], pts[i], pts[i + 1], width1, width2, col1, col2);
    }
}
// Gets the points needed for Cardinal Spline Draw Curve
function GetCurvePoints(pts, tension, isClosed, numOfSegments) {
    // This function is based on an answer by user1693593 on StackOverflow
    // https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through
    // -n-points-using-javascript-html5-canvas
    var _pts = [], res = [], // Clone array
    x, y, // Our x,y coords
    t1x, t2x, t1y, t2y, // Tension vectors
    c1, c2, c3, c4, // Cardinal points
    st, t, i; // Steps based on num. of segments
    // Clone Array
    _pts = pts.slice(0);
    if (isClosed) {
        // Copy first point to the end to make a closed shape, then copy last to
        // front and second to end to create required 'curving-to' start/end points
        _pts.push(pts[0]);
        _pts.push(pts[1]);
        _pts.push(pts[2]);
        _pts.push(pts[3]);
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
    }
    // ok, lets start..
    // 1. loop goes through point array
    // 2. loop goes through each segment between the 2 pts + 1e point before and after
    for (i = 2; i < (_pts.length - 4); i += 2) {
        for (t = 0; t <= numOfSegments; t++) {
            // calc tension vectors
            t1x = (_pts[i + 2] - _pts[i - 2]) * tension;
            t2x = (_pts[i + 4] - _pts[i]) * tension;
            t1y = (_pts[i + 3] - _pts[i - 1]) * tension;
            t2y = (_pts[i + 5] - _pts[i + 1]) * tension;
            // calc step
            st = t / numOfSegments;
            // calc cardinals
            c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
            c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
            c4 = Math.pow(st, 3) - Math.pow(st, 2);
            // calc x and y cords with common control vectors
            x = c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x;
            y = c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y;
            //store points in array
            res.push(x);
            res.push(y);
        }
    }
    return res;
}
// Draws the constant colour section of a piece.
function DrawShape(ctx, piece, fill) {
    piece.GetPath(ctx);
    for (var _i = 0, fill_1 = fill; _i < fill_1.length; _i++) {
        var brush = fill_1[_i];
        ctx.fillStyle = brush;
        ctx.fill();
    }
    ctx.closePath();
}
// Draws the outline of the piece.
function DrawOutline(ctx, pts, connected) {
    if (connected === void 0) { connected = true; }
    if (!connected) {
        pts[0].Connection = Connector.Corner;
    }
    ctx.beginPath();
    ctx.moveTo(pts[0].GetPoints()[0], pts[0].GetPoints()[1]);
    var maxIndex = connected ? pts.length : pts.length - 1;
    for (var index = 0; index < maxIndex; index++) {
        // Line is Visible
        if (pts[index].IsVisible()) {
            ctx.beginPath();
            var nextIndex = NextIndex(pts, index);
            var start = pts[index].GetPoints();
            var end = pts[nextIndex].GetPoints();
            ctx.moveTo(start[0], start[1]);
            // Connected by Line
            if (pts[index].Connection == Connector.Corner &&
                pts[nextIndex].Connection == Connector.Corner) {
                DrawLine(ctx, start[0], start[1], end[0], end[1], pts[index].LineWidth, pts[nextIndex].LineWidth, pts[index].LineColour, pts[nextIndex].LineColour);
            }
            // Starts with Curve
            else if (pts[index].Connection == Connector.Curve) {
                var count = 0;
                var foundNonCurve = false;
                while (count < pts.length && !foundNonCurve) {
                    if (pts[count].Connection != Connector.Curve) {
                        foundNonCurve = true;
                    }
                    count++;
                }
                // All Curve - ClosedCurve Required
                if (!foundNonCurve) {
                    index = maxIndex - 1;
                    DrawCurve(ctx, pts, pts[0].Tension, true);
                }
                // Else skip- will be drawn in a curve loop
            }
            // Start of Curve
            else if (pts[index].Connection == Connector.Corner &&
                pts[nextIndex].Connection == Connector.Curve) {
                // Add previous point as 'curving-from'
                var curvePoints = [pts[NextIndex(pts, index, false)], pts[index], pts[nextIndex]];
                var newIndex = nextIndex;
                while (pts[newIndex].Connection == Connector.Curve) {
                    newIndex = NextIndex(pts, newIndex);
                    if (connected || newIndex != 0) {
                        curvePoints.push(pts[newIndex]);
                    }
                }
                // Add next point as 'curving-to'
                curvePoints.push(pts[NextIndex(pts, newIndex)]);
                index = newIndex <= index ? maxIndex - 1 : newIndex - 1;
                DrawCurve(ctx, curvePoints, pts[nextIndex].Tension);
            }
        }
    }
}
// Draws all pieces in a list.
function DrawPiecesList(ctx, piecesList) {
    for (var _i = 0, piecesList_1 = piecesList; _i < piecesList_1.length; _i++) {
        var part = piecesList_1[_i];
        part.Draw(ctx);
    }
}
//# sourceMappingURL=visuals.js.map