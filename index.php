<html>
<head>
    <title>Optimator | Opti Technology</title>			
<?php
	session_start();
	include 'Design/SectorConstants/headerOptimator.php';
?>
<body>
	<div class="optionMenu">
		<!-- Opti Icon -->
		<div id="optiIcon">
			<a href="index" target="_blank"><img src="Design/Images/header_logo.png" alt="Optimator Logo"></a>
		</div>
		<div class="spacer"></div>

		<!-- File -->
		<div class="optionMenuBtn" id="b1">
			<i class="far fa-lg fa-save"></i>
		</div>
		<div class="spacer"></div>

		<!-- Draw -->
		<div class="optionMenuSwap active" id="s1a">
			<i class="fas fa-lg fa-paint-brush"></i>
		</div>
		<!-- Select -->
		<div class="optionMenuSwap" id="s1b">
			<i class="fas fa-lg fa-mouse-pointer"></i>
		</div>
		<div class="spacer"></div>

		<!-- Spot -->
		<div class="optionMenuBtn" id="b2">
			<i class="fas fa-lg fa-plus"></i>
		</div>
		<!-- Piece -->
		<div class="optionMenuBtn" id="b3">
			<i class="fas fa-lg fa-square"></i>
		</div>	
		<!-- Set -->
		<div class="optionMenuBtn" id="b4">
			<i class="fas fa-lg fa-shapes"></i>
		</div>	
		<div class="spacer"></div>	

		<!-- Settings -->
		<div class="optionMenuBtn" id="b5">
			<i class="fas fa-lg fa-cog"></i>
		</div>
		<!-- Help -->
		<div class="optionMenuBtn" id="b6">
			<i class="fas fa-lg fa-question"></i>
		</div>
	</div>

	<div class="middleDisplay">
		<div class="canvas">
			<div id="undoZoom" class="fa-lg"></div>
			<canvas id="drawingBoard"></canvas>
		</div>	

		<div class="panel" id="sidePanel">

			<!-- File Panel -->
			<div id="p1" class="panelPane">
				<div class="panelPaneHeader">
					<p>File</p>
				</div>
				<div class="panelPaneScroll">

					<!-- Open Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Open</p>
						<button id='saveOpenBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>						
					</div>

					<div id='saveOpen' class='panelPaneHidePanel active'>
						<input type="file" id="saveOpenFileInput" accept=".txt"/>
					</div>

					<!-- Export Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Export</p>
						<button id='saveExportBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
					</div>

					<div id='saveExport' class='panelPaneHidePanel active'>
						<a id="savePngBtn" download="myImage.png" href="">PNG</a><br>
						<a id="saveJpgBtn" download="myImage.jpg" href="">JPG</a>
					</div>

					<!-- Save Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Save</p>
						<button id='saveSaveBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
					</div>

					<div id='saveSave' class='panelPaneHidePanel active'>
						<button id="saveWIPBtn">WIP File</button><br>
						<button id="saveModelsBtn">Models</button>
					</div>							
				</div>
			</div>

			<!-- Spot Panel -->
			<div id="p2" class="panelPane">
				<div class="panelPaneHeader">
					<p>Spot</p>
				</div>
				<div class="panelPaneScroll">

					<!-- Type Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Type</p>
						<button id='spotTypeBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
					</div>

					<div id='spotType' class='panelPaneHidePanel active'>
						<div class="toggleSwitch">
							<span id="spotTypeConnect" class="toggleSwitchBtn">Corner</span>
						</div>
						<div id='spotTypeTension' class="folded">
							<div class="inputBreak"></div>
							<label for="spotTypeTensionNumber">Curve Tension</label>
							<input type="number" id="spotTypeTensionNumber" class="numberInput" min='0' step='0.1'>
						</div>
					</div>

					<!-- Outline Colour Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Outline Colour</p>
						<button id='spotColourBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
					</div>

					<div id='spotColour' class='panelPaneHidePanel active'>
						<div id="spotColourFillBox">
							<input type="color" id="spotColourFill"></input>
						</div>						
					</div>
					
					<!-- Outline Width Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Outline Width</p>
						<button id='spotOutlineWidthBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
					</div>

					<div id='spotOutlineWidth' class='panelPaneHidePanel active'>
						<label for="spotOutlineWidthNumber">Outline Width</label>
						<input type="number" id="spotOutlineWidthNumber" class="numberInput" min='0'>
					</div>

				</div>
			</div>

			<!-- Piece Panel -->
			<div id="p3" class="panelPane">
				<div class="panelPaneHeader">
					<p>Piece</p>
				</div>
				<div class="panelPaneScroll">

					<!-- Type Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Type</p>
						<button id='pieceTypeBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
					</div>

					<div id='pieceType' class='panelPaneHidePanel active'>
						<div class="toggleSwitch">
							<span id="pieceTypeLine" class="toggleSwitchBtn">Shape</span>
						</div>
						<div class="inputBreak"></div>
						<input type="radio" id="PTfull" name="pieceType" value="Full" checked>
							<label for="PTfull">Full</label><br>
						<input type="radio" id="PTdecal" name="pieceType" value="Decal">
							<label for="PTdecal">Decal</label><br>
						<input type="radio" id="PTcutout" name="pieceType" value="Cutout">
							<label for="PTcutout" id="PTcutoutLbl">Cutout</label>
					</div>

					<!-- Position Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Position</p>
						<button id='piecePositionBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
					</div>

					<div id='piecePosition' class='panelPaneHidePanel active'>
						<button id="piecePositionOrderUp">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
						<button id="piecePositionOrderDown">
							<i class="fas fa-lg fa-caret-down"></i>
						</button>
					</div>

					<!-- Colours Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Colour</p>
						<button id='pieceColourBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
					</div>

					<div id='pieceColour' class='panelPaneHidePanel active'>
						<input type="radio" id="PCnone" name="pieceColour" value="none">
							<label for="PCnone">None</label><br>
						<input type="radio" id="PCfill" name="pieceColour" value="fill" checked>
							<label for="PCfill">Fill</label><br>
						<input type="radio" id="PCgradient" name="pieceColour" value="gradient">
							<label for="PCgradient">Gradient</label>

						<div class="inputBreak"></div>
						<div id="PieceColourGradientBox" class="folded">
							
						</div>

						<div id="PieceColourFillBox">
							<input type="color" id="pieceColourFill"></input>
						</div>	
					</div>
				</div>
			</div>

			<!-- Set Panel -->
			<div id="p4" class="panelPane">
				<div class="panelPaneHeader">
					<p>Set</p>
				</div>
				<div class="panelPaneScroll">

				</div>
			</div>

			<!-- Settings Panel -->
			<div id="p5" class="panelPane">
				<div class="panelPaneHeader">
					<p>Settings</p>
				</div>
				<div class="panelPaneScroll">

					<!-- Drawing Board Sub-Panel -->
					<div class="panelPaneHideHeader">
						<p>Drawing Board</p>
						<button id='settingsDrawingBoardBtn' class="panelPaneHideHeaderBtn active">
							<i class="fas fa-lg fa-caret-up"></i>
						</button>
					</div>

					<div id='settingsDrawingBoard' class='panelPaneHidePanel active'>
						<input type="color" id="settingsDrawingBoardColourFill" value='#FFFFFF'></input>
						<div class="inputBreak"></div>

						<label for="settingsDrawingBoardWidth">Image Width</label>
						<input type="number" id="settingsDrawingBoardWidth" class="numberInput" min='1'>
						<div class="inputBreak"></div>
						<label for="settingsDrawingBoardHeight">Image Height</label>
  						<input type="number" id="settingsDrawingBoardHeight" class="numberInput" min='1'>
					</div>

				</div>
			</div>

			<!-- Help Panel -->
			<div id="p6" class="panelPane">
				<div class="panelPaneHeader">
					<p>Help</p>
				</div>
				<div class="panelPaneScroll">

				</div>
			</div>
		</div>
	</div>
	<canvas id="saveCanvas" class="folded"></canvas>	
	
	<?php
		include 'Design/SectorConstants/footer.php';
	?>
	<!--<script type="text/javascript" src="Functions/JS/Optimator/Forms/modelForm.js"></script>-->
</body>