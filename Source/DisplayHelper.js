
class DisplayHelper
{
	clear()
	{
		this.graphics.fillStyle = "White";
		this.graphics.fillRect
		(
			0, 
			0,
			this.viewSizeInPixels.x,
			this.viewSizeInPixels.y
		);

		this.graphics.strokeStyle = "Gray";
		this.graphics.strokeRect
		(
			0, 
			0,
			this.viewSizeInPixels.x,
			this.viewSizeInPixels.y
		);
	}

	drawLevel(level)
	{
		this.clear();
		this.drawMap(level.map);
	}

	drawMap(map)
	{
		var mapSizeInCells = map.sizeInCells;
		var mapCellSizeInPixels = this.viewSizeInPixels.clone().divide
		(
			mapSizeInCells
		);
		var cellPos = new Coords(0, 0);
		var drawPos = new Coords(0, 0);

		for (var y = 0; y < mapSizeInCells.y; y++)
		{
			cellPos.y = y;

			for (var x = 0; x < mapSizeInCells.x; x++)
			{
				cellPos.x = x;

				var cellToDraw = map.cellAtPos(cellPos);

				if (cellToDraw.color != null)
				{
					drawPos.overwriteWith
					(
						cellPos
					).multiply
					(
						mapCellSizeInPixels
					);
	
					this.graphics.fillStyle = cellToDraw.color;
		
					this.graphics.fillRect
					(
						drawPos.x, drawPos.y,
						mapCellSizeInPixels.x,
						mapCellSizeInPixels.y
					);
				}
			}
		}

		var colorSlider = map.terrains["Slider"].color;

		for (var i = 0; i < map.sliders.length; i++)
		{
			var slider = map.sliders[i];

			drawPos.overwriteWith
			(
				slider.pos
			).multiply
			(
				mapCellSizeInPixels
			);
			
			this.graphics.fillStyle = colorSlider;
		
			this.graphics.fillRect
			(
				drawPos.x, drawPos.y,
				mapCellSizeInPixels.x,
				mapCellSizeInPixels.y
			);
		}

		var colorPlayer = map.terrains["Player"].color;

		drawPos.overwriteWith
		(
			map.player.pos
		).multiply
		(
			mapCellSizeInPixels
		);

		this.graphics.fillStyle = colorPlayer;
		
		this.graphics.fillRect
		(
			drawPos.x, drawPos.y,
			mapCellSizeInPixels.x,
			mapCellSizeInPixels.y
		);
	}

	initialize(viewSizeInPixels)
	{
		this.viewSizeInPixels = viewSizeInPixels;
		
		var canvas = document.createElement("canvas");
		canvas.width = viewSizeInPixels.x;
		canvas.height = viewSizeInPixels.y;
		
		this.graphics = canvas.getContext("2d");

		var divMain = document.getElementById("divMain");
		divMain.appendChild(canvas);
	}
}
