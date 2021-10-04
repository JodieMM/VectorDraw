// Layout for Building Models
// 
// Author Jodie Muller
var WIP = new Scene();
var selectedSpots = [];
var selectedPieces = [];
// Canvas Sizing
var dpr = window.devicePixelRatio || 1;
var canvas = document.getElementById("drawingBoard");
var ctx = canvas.getContext("2d");
var drawingBoardWidth = defaultDrawingBoardWidth;
var drawingBoardHeight = defaultDrawingBoardHeight;
var drawingBoardBackColour = whiteShade;
var scrollOffset = [0, 0, 1];
var resizeOffset = [0, 0];
var canvasSize;
var panelWidth;
var panelMoving = -1;
var originalPanelWidth;
var mouseMovement = null;
var mouseMoved = false;
var colourChanged = false;
// Actions
$(document).on('keydown', KeyPress);
$(document).on('mousemove', SidePanelDrag);
$(document).on('mouseup', SidePanelRelease);
$('#undoZoom').on('click', UndoZoomClick);
canvas.addEventListener('mousedown', CanvasClick, false);
canvas.addEventListener('mouseup', CanvasMouseup, false);
canvas.addEventListener('mousemove', CanvasMousemove, false);
canvas.addEventListener('DOMMouseScroll', HandleScroll, false);
canvas.addEventListener('mousewheel', HandleScroll, false);
$('.panel').on('mousemove', SidePanelHover);
$('.panel').on('mousedown', SidePanelClick);
$(".optionMenuBtn").on('click', TopMenuSelect);
$(".optionMenuSwap").on('click', TopMenuSwap);
$(".panelPaneHideHeaderBtn").on('click', SubHeaderShow);
$(".toggleSwitchBtn").on('click', ToggleSwitchControl);
$("#spotColourFill").on('input', SpotColourSelect);
$("#pieceColourFill").on('input', PieceColourSelect);
$("#settingsDrawingBoardColourFill").on('input', DrawingBoardColourSelect);
$("#saveOpenFileInput").on('change', OpenFileActivate);
$("#savePngBtn").on('click', SaveImage);
$("#saveJpgBtn").on('click', SaveImage);
$("#saveWIPBtn").on('click', SaveWIP);
$(".numberInput").on('input', NumberInputReact);
$("#piecePositionOrderUp").on('click', MoveOrder);
$("#piecePositionOrderDown").on('click', MoveOrder);
// ----- I/O -----
// Key Pressed
function KeyPress(action) {
    var keycode = action.keyCode || action.which;
    switch (keycode) {
        // Tab
        case 9:
            // Selects the next or first option in the top menu bar
            // The reverse is true if the shift key is pressed, starting at the end option
            var tabOptions = [$("#s1a"), $("#s1b")];
            for (var i = 0; i < tabOptions.length; i++) {
                if (tabOptions[i].hasClass('active')) {
                    tabOptions[NextIndex(tabOptions, i, !action.shiftKey)].trigger('click');
                    tabOptions[i].removeClass('active');
                    i = tabOptions.length;
                }
            }
            return action.preventDefault() && false;
        // Enter
        case 13:
            break;
        // Shift
        case 16:
            break;
        // Space
        case 32:
            if ($('#s1a').hasClass('active')) {
                // Shifts to a new shape
                if (LastItem(WIP.PiecesList).Data.length != 0) {
                    WIP.PiecesList.push(new Piece());
                    selectedPieces = [LastItem(WIP.PiecesList)];
                    selectedSpots = [];
                    Redraw();
                }
            }
            else if ($('#s1b').hasClass('active') && selectedPieces.length == 1
                && selectedSpots.length == 1) {
                // Add point mid-way between this and next point
                var WIPData = selectedPieces[0].Data;
                var nextIndex = NextIndex(WIPData, WIPData.indexOf(selectedSpots[0]));
                var nextPoint = WIPData[nextIndex];
                WIPData.splice(nextIndex, 0, new Spot((selectedSpots[0].X + nextPoint.X) / 2, (selectedSpots[0].Y + nextPoint.Y) / 2, (selectedSpots[0].XRight + nextPoint.XRight) / 2, (selectedSpots[0].YDown + nextPoint.YDown) / 2, nextPoint.Connection == Connector.Curve || selectedSpots[0].Connection == Connector.Curve ?
                    Connector.Curve : Connector.Corner, nextPoint.Connection == Connector.Curve ? nextPoint.Tension : selectedSpots[0].Tension, selectedSpots[0].LineWidth, selectedSpots[0].LineColour));
                Redraw();
            }
            return action.preventDefault() && false;
        // Delete
        case 46:
            // Delete Selected
            if (selectedSpots.length > 0) {
                for (var i = 0; i < selectedSpots.length; i++) {
                    selectedPieces[0].Data.splice(selectedPieces[0].Data.indexOf(selectedSpots[i]), 1);
                }
                selectedSpots = [];
                var index = 0;
                while (index < WIP.PiecesList.length && WIP.PiecesList.length != 0) {
                    if (WIP.PiecesList[index].Data.length < 1) {
                        WIP.PiecesList.splice(index, 1);
                    }
                    else {
                        index++;
                    }
                }
                Redraw();
            }
            else {
                for (var i = 0; i < selectedPieces.length; i++) {
                    WIP.PiecesList.splice(WIP.PiecesList.indexOf(selectedPieces[i]), 1);
                }
                selectedPieces = [];
                Redraw();
            }
            return action.preventDefault() && false;
        // A
        case 65:
            // Select All
            if (action.ctrlKey) {
                if (selectedPieces.length == 1) {
                    selectedSpots = selectedPieces[0].Data;
                }
                else {
                    selectedPieces = WIP.PiecesList;
                }
                Redraw();
            }
            return action.preventDefault() && false;
    }
}
// Undo Zoom Click
function UndoZoomClick(action) {
    ctx.translate(scrollOffset[0], scrollOffset[1]);
    ctx.scale(1 / scrollOffset[2], 1 / scrollOffset[2]);
    resizeOffset[0] *= scrollOffset[2];
    resizeOffset[1] *= scrollOffset[2];
    scrollOffset = [0, 0, 1];
    Redraw();
    $(this).css('display', 'none');
}
// Canvas Click (Mouse Down)
function CanvasClick(action) {
    if (action.buttons != 1) {
        return;
    }
    var x = action.offsetX / scrollOffset[2] + scrollOffset[0] - resizeOffset[0];
    var y = action.offsetY / scrollOffset[2] + scrollOffset[1] - resizeOffset[1];
    // Place Spot
    if ($('#s1a').hasClass('active')) {
        if (selectedPieces.length < 1) {
            var WIPPiece = new Piece();
            // TODO: Assign based on current UI options
            WIP.PiecesList.push(WIPPiece);
            selectedPieces.push(WIPPiece);
        }
        var newSpot = new Spot(x, y);
        selectedPieces[0].Data.push(newSpot);
        if (selectedPieces[0].Data.length > 1) {
            var secondLast = selectedPieces[0].Data[selectedPieces[0].Data.length - 2];
            newSpot.Tension = secondLast.Tension;
            newSpot.LineWidth = secondLast.LineWidth;
            newSpot.LineColour = secondLast.LineColour;
        }
        if (action.shiftKey) {
            newSpot.Connection = Connector.Curve;
        }
    }
    // Select
    else {
        // Select Spot
        var clickedSpot = null;
        if (selectedPieces.length == 1) {
            clickedSpot = FindSpotClicked(selectedPieces[0], x, y);
        }
        if (clickedSpot != null) {
            if (selectedSpots.indexOf(clickedSpot) != -1) {
                if (action.shiftKey) {
                    selectedSpots.splice(selectedSpots.indexOf(clickedSpot), 1);
                }
                else {
                    mouseMovement = [x, y];
                }
            }
            else {
                action.shiftKey ? selectedSpots.push(clickedSpot) : selectedSpots = [clickedSpot];
                mouseMovement = [x, y];
            }
        }
        // Select Piece
        else {
            var clickedPiece = FindPieceClicked(ctx, WIP, action.offsetX * dpr, action.offsetY * dpr);
            if (clickedPiece != null) {
                if (selectedPieces.indexOf(clickedPiece) != -1) {
                    if (action.shiftKey) {
                        selectedPieces.splice(selectedPieces.indexOf(clickedPiece), 1);
                    }
                    else {
                        mouseMovement = [x, y];
                    }
                }
                else {
                    action.shiftKey ? selectedPieces.push(clickedPiece) : selectedPieces = [clickedPiece];
                    mouseMovement = [x, y];
                }
                selectedSpots = [];
            }
            // Nothing Selected
            else if (!action.shiftKey) {
                selectedPieces = [];
                selectedSpots = [];
            }
        }
    }
    UISelect();
    Redraw();
}
// Canvas Mouse Moves (Drag)
function CanvasMousemove(action) {
    if (mouseMovement != null) {
        var x = action.offsetX / scrollOffset[2] + scrollOffset[0] - resizeOffset[0];
        var y = action.offsetY / scrollOffset[2] + scrollOffset[1] - resizeOffset[1];
        if (!mouseMoved) {
            mouseMoved = x > mouseMovement[0] + DragPrecision || x < mouseMovement[0] - DragPrecision ||
                y > mouseMovement[1] + DragPrecision || y < mouseMovement[1] - DragPrecision;
        }
        if (mouseMoved) {
            var diffX = x - mouseMovement[0];
            var diffY = y - mouseMovement[1];
            Redraw();
            if (selectedSpots.length > 0) {
                // Draw Shadow Spots at New Location
                for (var _i = 0, selectedSpots_1 = selectedSpots; _i < selectedSpots_1.length; _i++) {
                    var spot = selectedSpots_1[_i];
                    DrawCross(ctx, spot.X + diffX, spot.Y + diffY, shadowShade);
                }
            }
            else {
                // Draw Shadow Pieces at New Location
                ctx.translate(diffX, diffY);
                for (var _a = 0, selectedPieces_1 = selectedPieces; _a < selectedPieces_1.length; _a++) {
                    var piece = selectedPieces_1[_a];
                    DrawShape(ctx, piece, [ConvertToHexi(shadowShade)]);
                }
                ctx.translate(-diffX, -diffY);
            }
        }
    }
}
// Canvas Mouse Up (Release Drag)
function CanvasMouseup(action) {
    if (mouseMoved) {
        var x = action.offsetX / scrollOffset[2] + scrollOffset[0] - resizeOffset[0];
        var y = action.offsetY / scrollOffset[2] + scrollOffset[1] - resizeOffset[1];
        var diffX = x - mouseMovement[0];
        var diffY = y - mouseMovement[1];
        if (selectedSpots.length > 0) {
            // Update Spots' Locations
            for (var _i = 0, selectedSpots_2 = selectedSpots; _i < selectedSpots_2.length; _i++) {
                var spot = selectedSpots_2[_i];
                spot.X = spot.XRight += diffX;
                spot.Y = spot.YDown += diffY;
            }
        }
        else {
            // Update Pieces' Spots Locations
            for (var _a = 0, selectedPieces_2 = selectedPieces; _a < selectedPieces_2.length; _a++) {
                var piece = selectedPieces_2[_a];
                for (var _b = 0, _c = piece.Data; _b < _c.length; _b++) {
                    var spot = _c[_b];
                    spot.X = spot.XRight += diffX;
                    spot.Y = spot.YDown += diffY;
                }
            }
        }
        Redraw();
    }
    mouseMovement = null;
    mouseMoved = false;
}
// Canvas Scroll
function HandleScroll(action) {
    var scrollIn = action.deltaY < 0 ? 1 : -1;
    var zoom = Math.exp(scrollIn * 0.2);
    // X/Y Offset
    ctx.translate(scrollOffset[0], scrollOffset[1]);
    // Zoom
    ctx.scale(zoom, zoom);
    // X/Y Realign Offset
    var mouseX = action.offsetX;
    var mouseY = action.offsetY;
    scrollOffset[0] -= (mouseX / (scrollOffset[2] * zoom) - resizeOffset[0] / zoom) - (mouseX / scrollOffset[2] - resizeOffset[0]);
    scrollOffset[1] -= (mouseY / (scrollOffset[2] * zoom) - resizeOffset[1] / zoom) - (mouseY / scrollOffset[2] - resizeOffset[1]);
    ctx.translate(-scrollOffset[0], -scrollOffset[1]);
    // Update Zoom
    scrollOffset[2] *= zoom;
    resizeOffset[0] /= zoom;
    resizeOffset[1] /= zoom;
    $('#undoZoom').removeClass('fas fa-search-minus');
    $('#undoZoom').removeClass('fas fa-search-plus');
    scrollOffset[2] > 1 ? $('#undoZoom').addClass('fas fa-search-minus') :
        $('#undoZoom').addClass('fas fa-search-plus');
    $('#undoZoom').css('display', 'block');
    Redraw();
    return action.preventDefault() && false;
}
;
// Top Menu Button/Toggle Click
function TopMenuSelect(action) {
    var alreadyOn = $(this).hasClass('active');
    // Deselect old selected
    $('.optionMenuBtn').removeClass('active');
    $('.panelPane').css('display', 'none');
    // Select new if not already selected
    if (!alreadyOn) {
        $(this).addClass('active');
        var selectedPanel = $(this).attr('id');
        $('.canvas').css('width', $(window).width() * (1 - panelWidth));
        $('.panel').css('width', $(window).width() * panelWidth);
        $('.panel').css('display', 'block');
        $('#' + selectedPanel.replace("b", "p")).css('display', 'block');
        $(window).trigger('resize');
    }
    // Hide Side Panel
    else {
        $('.panel').css('display', 'none');
        $('.canvas').css('width', '100%');
        $(window).trigger('resize');
    }
}
// Top Menu Swap/Toggle Click
function TopMenuSwap(action) {
    $('.optionMenuSwap').removeClass('active');
    $(this).addClass('active');
}
// Side Panel Resize
function SidePanelHover(action) {
    if (action.offsetX <= 3) {
        $(this).css('cursor', 'col-resize');
    }
    else {
        $(this).css('cursor', 'default');
    }
}
// Side Panel Resize
function SidePanelClick(action) {
    if (action.offsetX <= 3) {
        originalPanelWidth = panelWidth;
        panelMoving = action.pageX;
    }
}
// Side Panel Resize Drag
function SidePanelDrag(action) {
    if (panelMoving > 0) {
        panelWidth = originalPanelWidth - (action.pageX - panelMoving);
        $(window).trigger('resize');
    }
}
// Side Panel Release
function SidePanelRelease(action) {
    panelMoving = -1;
}
// Side Panel Sub Header Hide/Show
function SubHeaderShow(action) {
    if ($(this).hasClass('active')) {
        $(this).html('<i class="fas  fa-lg fa-caret-down"></i>');
        $(this).removeClass('active');
        $('#' + $(this).attr('id').replace('Btn', '')).removeClass('active');
    }
    else {
        $(this).html('<i class="fas fa-lg fa-caret-up"></i>');
        $(this).addClass('active');
        $('#' + $(this).attr('id').replace('Btn', '')).addClass('active');
    }
}
// ----- CONTROLS -----
// Open Button Click
function OpenFileActivate(action) {
    var file = action.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var readerSingleLine = event.target.result.split("\n");
            OpenFile(readerSingleLine);
        };
        reader.readAsText(file, 'UTF-8');
    }
}
// Open File
function OpenFile(data) {
    var dataIndex = 0;
    while (dataIndex < data.length) {
        var dataLine = data[dataIndex];
        if (dataLine[0] == '*') {
            if (dataLine.substring(0, 6) == "*Scene") {
                var line1 = dataLine.split(';');
                var line2 = data[dataIndex + 1].split(';');
                var line3 = data[dataIndex + 2];
                var colourState = new ColourState();
                colourState.FromString(line3);
                WIP = new Scene(line1[2], line1[1], Number(line2[0]), Number(line2[1].split(':')[0]), Number(line2[1].split(':')[1]), colourState);
                dataIndex += 3;
            }
            else if (dataLine.substring(0, 4) == "*Set") {
                // TODO
            }
            else if (dataLine.substring(0, 6) == "*Piece") {
                var toSend = [dataLine];
                dataIndex++;
                while (dataIndex < data.length && data[dataIndex] != '*') {
                    toSend.push(data[dataIndex + 1]);
                    dataIndex++;
                }
                var piece = new Piece();
                piece.FromString(toSend);
                WIP.PiecesList.push(piece);
            }
        }
    }
    Redraw();
}
// Save Button Click
function SaveImage(action) {
    var saveCanvas = document.getElementById("saveCanvas");
    saveCanvas.width = drawingBoardWidth;
    saveCanvas.height = drawingBoardHeight;
    var saveCtx = saveCanvas.getContext("2d");
    saveCtx.fillStyle = drawingBoardBackColour.Use();
    saveCtx.fillRect(0, 0, drawingBoardWidth, drawingBoardHeight);
    saveCtx.translate(drawingBoardWidth / 2, drawingBoardHeight / 2);
    for (var _i = 0, _a = WIP.PiecesList; _i < _a.length; _i++) {
        var piece = _a[_i];
        piece.Draw(saveCtx);
    }
    var isPng = $(this).attr('id') == "savePngBtn";
    $(this).attr('href', saveCanvas.toDataURL(isPng ? 'image/png' : 'image/jpg', 1.0));
    $(this).attr('download', 'image' + (isPng ? '.png' : '.jpg'));
    // TODO: Allow for name to be set
}
// Save WIP Image
function SaveWIP(action) {
    var info = WIP.ToString();
    var data = "";
    for (var _i = 0, info_1 = info; _i < info_1.length; _i++) {
        var line = info_1[_i];
        data += line + "\n";
    }
    var saveLink = document.createElement('a');
    saveLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    saveLink.setAttribute('download', "WIPFile");
    saveLink.style.display = 'none';
    document.body.appendChild(saveLink);
    saveLink.click();
    document.body.removeChild(saveLink);
}
// Change a Toggle's Options
function ToggleSwitchControl(action) {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parent().removeClass('active');
    }
    else {
        $(this).addClass('active');
        $(this).parent().addClass('active');
    }
    // Change Text and React based on ID
    switch ($(this).attr('id')) {
        case 'pieceTypeLine':
            {
                $(this).hasClass('active') ? $(this).html('Line') : $(this).html('Shape');
                $('#PTcutout').css('display', $(this).hasClass('active') ? 'none' : 'inline-block');
                $('#PTcutoutLbl').css('display', $('#PTcutout').css('display'));
                for (var _i = 0, selectedPieces_3 = selectedPieces; _i < selectedPieces_3.length; _i++) {
                    var piece = selectedPieces_3[_i];
                    piece.Line = $(this).hasClass('active');
                }
                Redraw();
                break;
            }
        case 'spotTypeConnect':
            {
                $(this).hasClass('active') ? $('#spotTypeTension').removeClass('folded') :
                    $('#spotTypeTension').addClass('folded');
                $(this).hasClass('active') ? $(this).html('Curve') : $(this).html('Corner');
                // Whole Piece
                if (selectedSpots.length < 1) {
                    for (var _a = 0, selectedPieces_4 = selectedPieces; _a < selectedPieces_4.length; _a++) {
                        var piece = selectedPieces_4[_a];
                        for (var _b = 0, _c = piece.Data; _b < _c.length; _b++) {
                            var spot = _c[_b];
                            spot.Connection = $(this).hasClass('active') ? Connector.Curve : Connector.Corner;
                        }
                    }
                }
                // Selected Spots
                else {
                    for (var _d = 0, selectedSpots_3 = selectedSpots; _d < selectedSpots_3.length; _d++) {
                        var spot = selectedSpots_3[_d];
                        spot.Connection = $(this).hasClass('active') ? Connector.Curve : Connector.Corner;
                    }
                }
                Redraw();
                break;
            }
    }
}
// Updates a Value based on Number Input
function NumberInputReact(action) {
    switch ($(this).attr('id')) {
        case 'settingsDrawingBoardWidth':
            drawingBoardWidth = $(this).val();
            break;
        case 'settingsDrawingBoardHeight':
            drawingBoardHeight = $(this).val();
            break;
        case 'spotOutlineWidthNumber':
            if (selectedSpots.length < 1) {
                for (var _i = 0, selectedPieces_5 = selectedPieces; _i < selectedPieces_5.length; _i++) {
                    var piece = selectedPieces_5[_i];
                    for (var _a = 0, _b = piece.Data; _a < _b.length; _a++) {
                        var spot = _b[_a];
                        spot.LineWidth = $(this).val();
                    }
                }
            }
            else {
                for (var _c = 0, selectedSpots_4 = selectedSpots; _c < selectedSpots_4.length; _c++) {
                    var spot = selectedSpots_4[_c];
                    spot.LineWidth = $(this).val();
                }
            }
            break;
        case 'spotTypeTensionNumber':
            if (selectedSpots.length < 1) {
                for (var _d = 0, selectedPieces_6 = selectedPieces; _d < selectedPieces_6.length; _d++) {
                    var piece = selectedPieces_6[_d];
                    for (var _e = 0, _f = piece.Data; _e < _f.length; _e++) {
                        var spot = _f[_e];
                        spot.Tension = $(this).val();
                    }
                }
            }
            else {
                for (var _g = 0, selectedSpots_5 = selectedSpots; _g < selectedSpots_5.length; _g++) {
                    var spot = selectedSpots_5[_g];
                    spot.Tension = $(this).val();
                }
            }
            break;
    }
    Redraw();
}
// Change a Spot Colour
function SpotColourSelect(action) {
    if (selectedSpots.length < 1) {
        for (var _i = 0, selectedPieces_7 = selectedPieces; _i < selectedPieces_7.length; _i++) {
            var piece = selectedPieces_7[_i];
            for (var _a = 0, _b = piece.Data; _a < _b.length; _a++) {
                var spot = _b[_a];
                spot.LineColour = ConvertFromHexi(String($(this).val()));
            }
        }
    }
    else {
        for (var _c = 0, selectedSpots_6 = selectedSpots; _c < selectedSpots_6.length; _c++) {
            var spot = selectedSpots_6[_c];
            spot.LineColour = ConvertFromHexi(String($(this).val()));
        }
    }
    Redraw();
}
// Change a Piece Colour
function PieceColourSelect(action) {
    colourChanged = true;
    for (var _i = 0, selectedPieces_8 = selectedPieces; _i < selectedPieces_8.length; _i++) {
        var piece = selectedPieces_8[_i];
        piece.Colours.Layers[0].Colours[0] = ConvertFromHexi(String($(this).val()));
    }
    Redraw();
}
// Change the Drawing Board's Back Colour
function DrawingBoardColourSelect(action) {
    drawingBoardBackColour = ConvertFromHexi(String($(this).val()));
    Redraw();
}
// Move the Selected Piece Up or Down in Order
function MoveOrder(action) {
    if (selectedPieces.length == 1) {
        var orderIndex = WIP.PiecesList.indexOf(selectedPieces[0]);
        if ($(this).attr('id') == "piecePositionOrderUp") {
            if (orderIndex < WIP.PiecesList.length - 1) {
                ArraySwap(WIP.PiecesList, orderIndex, orderIndex + 1);
                Redraw();
            }
        }
        else {
            if (orderIndex > 0) {
                ArraySwap(WIP.PiecesList, orderIndex, orderIndex - 1);
                Redraw();
            }
        }
    }
}
// Change UI to Match Selected
function UISelect() {
    if (selectedSpots.length > 0 || selectedPieces.length >= 1 && selectedPieces[0].Data.length > 0) {
        // Select 1st Spot in all UI Options
        var firstSpot = selectedSpots.length >= 1 ? selectedSpots[0] : selectedPieces[0].Data[0];
        // Spot Type
        if ($('#spotTypeConnect').hasClass('active') && (firstSpot.Connection == Connector.Corner) ||
            !$('#spotTypeConnect').hasClass('active') && (firstSpot.Connection == Connector.Curve)) {
            if ($('#spotTypeConnect').hasClass('active')) {
                $('#spotTypeConnect').removeClass('active');
                $('#spotTypeConnect').parent().removeClass('active');
                $('#spotTypeTension').addClass('folded');
            }
            else {
                $('#spotTypeConnect').addClass('active');
                $('#spotTypeConnect').parent().addClass('active');
                $('#spotTypeTension').removeClass('folded');
            }
            $('#spotTypeConnect').hasClass('active') ? $('#spotTypeConnect').html('Curve') :
                $('#spotTypeConnect').html('Corner');
        }
        $('#spotTypeTensionNumber').val(firstSpot.Tension);
        // Spot Colour
        $('#spotColourFill').val(ConvertToHexi(firstSpot.LineColour));
        // Spot Outline Width
        $('#spotOutlineWidthNumber').val(firstSpot.LineWidth);
    }
    else {
        // Deselect Spot UI
    }
    if (selectedPieces.length > 0) {
        // Select 1st Piece in all UI Options
        var firstPiece = selectedPieces[0];
        if (!$('#pieceTypeLine').hasClass('active') && firstPiece.Line ||
            $('#pieceTypeLine').hasClass('active') && !firstPiece.Line) {
            $('#pieceTypeLine').trigger('click');
        }
        if (firstPiece.DrawStyle == DrawType.Full) {
            $('#PTfull').trigger('click');
        }
        else if (firstPiece.DrawStyle == DrawType.Decal) {
            $('#PTdecal').trigger('click');
        }
        else {
            $('#PTcutout').trigger('click');
        }
        if (firstPiece.Colours.Layers[0].FillOption == FillOption.Fill) {
            $('#PCfill').trigger('click');
        }
        else {
            $('#PCgradient').trigger('click');
        }
        $('#pieceColourFill').val(ConvertToHexi(firstPiece.Colours.Layers[0].Colours[0]));
        // Set 1st Spot of Piece for Spot UI Options
    }
    else {
        // Deselect Piece UI
    }
}
// ----- FUNCTIONS -----
// Resize the panels
window.onresize = function () {
    var currentTransform = ctx.getTransform();
    // Panel Resize
    if ($('.panel').css('display') != 'none') {
        $('.canvas').css('width', $(window).width() - panelWidth);
        $('.panel').css('width', panelWidth);
    }
    // DPR Offset
    var rect = $(".canvas")[0].getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.resetTransform();
    ctx.setTransform(currentTransform);
    // Zoom Offset
    var xAdjust = ((canvasSize[0] - canvas.width) / 2) / currentTransform.a;
    var yAdjust = ((canvasSize[1] - canvas.height) / 2) / currentTransform.d;
    resizeOffset[0] -= xAdjust;
    resizeOffset[1] -= yAdjust;
    ctx.translate(-xAdjust, -yAdjust);
    canvasSize = [canvas.width, canvas.height];
    Redraw();
};
// Canvas Redraw
function Redraw() {
    ctx.fillStyle = backgroundDrawingBoardShade.Use();
    ctx.fillRect(scrollOffset[0] - resizeOffset[0], scrollOffset[1] - resizeOffset[1], canvas.width / scrollOffset[2], canvas.height / scrollOffset[2]);
    ctx.fillStyle = drawingBoardBackColour.Use();
    ctx.fillRect(drawingBoardWidth * -1 / 2, drawingBoardHeight * -1 / 2, drawingBoardWidth, drawingBoardHeight);
    // Pieces
    for (var _i = 0, _a = WIP.PiecesList; _i < _a.length; _i++) {
        var piece = _a[_i];
        piece.Draw(ctx);
    }
    // Spots				(Separate from above to ensure points are drawn above lines)
    for (var _b = 0, selectedPieces_9 = selectedPieces; _b < selectedPieces_9.length; _b++) {
        var piece = selectedPieces_9[_b];
        for (var _c = 0, _d = piece.Data; _c < _d.length; _c++) {
            var spot = _d[_c];
            spot.Draw(ctx);
        }
    }
    // Selected Spots
    for (var _e = 0, selectedSpots_7 = selectedSpots; _e < selectedSpots_7.length; _e++) {
        var spot = selectedSpots_7[_e];
        spot.Draw(ctx, highlightShade);
    }
}
// ----- After Function Load Actions -----
var rect = $(".canvas")[0].getBoundingClientRect();
canvas.width = Math.round(rect.width * dpr);
canvas.height = Math.round(rect.height * dpr);
canvasSize = [canvas.width, canvas.height];
ctx = canvas.getContext("2d");
ctx.scale(dpr, dpr);
panelWidth = $(window).width() * 0.2;
$('.panel').css('width', panelWidth);
Redraw();
$('#settingsDrawingBoardWidth').val(drawingBoardWidth);
$('#settingsDrawingBoardHeight').val(drawingBoardHeight);
$('#spotOutlineWidthNumber').val(defaultOutlineWidth);
//# sourceMappingURL=modelForm.js.map