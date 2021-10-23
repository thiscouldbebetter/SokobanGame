
class Map
{
	constructor(terrains, cellsAsStrings)
	{
		this.terrains = terrains;
		ArrayHelper.addLookupsToArray(this.terrains, "name");
		ArrayHelper.addLookupsToArray(this.terrains, "symbol");
		this.cellsAsStrings = cellsAsStrings;

		this.sizeInCells = new Coords
		(
			this.cellsAsStrings[0].length,
			this.cellsAsStrings.length
		);

		this.movablesInitialize();
	}

	cellAtPos(cellPos)
	{
		var terrainSymbol = this.cellsAsStrings[cellPos.y].charAt(cellPos.x);
		var terrain = this.terrains[terrainSymbol];
		return terrain;
	}

	movablesInitialize()
	{
		this.sliders = [];

		var terrainSymbolForFloor = this.terrains["Floor"].symbol;
		var cellPos = new Coords(0, 0);

		for (var y = 0; y < this.sizeInCells.y; y++)
		{
			cellPos.y = y;
			var cellRowAsString = this.cellsAsStrings[y];

			for (var x = 0; x < this.sizeInCells.x; x++)
			{
				cellPos.x = x;
				var terrainSymbol = cellRowAsString.charAt(x);
				var terrain = this.terrains[terrainSymbol];
				if (terrain.isMovable == true)
				{
					cellRowAsString = 
						cellRowAsString.substr(0, x)
						+ terrainSymbolForFloor
						+ cellRowAsString.substr(x + 1)
				}

				if (terrain.name == "Player")
				{
					this.player = new Player(cellPos.clone());
				}
				else if (terrain.name == "Slider")
				{
					var slider = new Slider(cellPos.clone());
					this.sliders.push(slider);
				}
			}

			this.cellsAsStrings[y] = cellRowAsString;
		} 
	}

	sliderAtPos(cellPos)
	{
		var returnValue = null;

		for (var i = 0; i < this.sliders.length; i++)
		{
			var slider = this.sliders[i];
			if (slider.pos.equals(cellPos) == true)
			{
				returnValue = slider;
				break;
			}
		}

		return returnValue;
	}
}
