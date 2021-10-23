
class Level
{
	constructor(name, map)
	{
		this.name = name;
		this.map = map;
	}

	updateForTimerTick()
	{
		Globals.Instance.displayHelper.drawLevel(this);

		var inputHelper = Globals.Instance.inputHelper;

		if (inputHelper.keyCodePressed == 65) // a
		{
			this.updateForTimerTick_PlayerMove
			(
				new Coords(-1, 0)
			);
		}
		else if (inputHelper.keyCodePressed == 68) // d
		{
			this.updateForTimerTick_PlayerMove
			(
				new Coords(1, 0)
			);
		}
		else if (inputHelper.keyCodePressed == 83) // s
		{
			this.updateForTimerTick_PlayerMove
			(
				new Coords(0, 1)
			);
		}
		else if (inputHelper.keyCodePressed == 87) // w
		{
			this.updateForTimerTick_PlayerMove
			(
				new Coords(0, -1)
			);
		}
	}

	updateForTimerTick_PlayerMove(directionToMove)
	{
		var playerToMove = this.map.player;
		var playerPosNext = playerToMove.pos.clone().add
		(
			directionToMove
		);
		var map = this.map;
		var cellAtPlayerPosNext = map.cellAtPos(playerPosNext);

		if (cellAtPlayerPosNext.isPassable == true)
		{
			var sliderAtPlayerPosNext = map.sliderAtPos(playerPosNext);

			if (sliderAtPlayerPosNext == null)
			{
				playerToMove.pos.add(directionToMove);
			}
			else
			{
				var canSliderSlide = true;

				var sliderPosNext = playerPosNext.clone().add
				(
					directionToMove
				);
				var cellAtSliderPosNext = map.cellAtPos(sliderPosNext);
				if (cellAtSliderPosNext.isPassable == false)
				{
					canSliderSlide = false;
				}
				else
				{
					var sliderOtherAtSliderPosNext = this.map.sliderAtPos
					(
						sliderPosNext
					);
					if (sliderOtherAtSliderPosNext != null)
					{
						canSliderSlide = false;
					}
				}

				if (canSliderSlide == true)
				{
					playerToMove.pos.add(directionToMove);
					sliderAtPlayerPosNext.pos.add(directionToMove);

					if (cellAtSliderPosNext.name == "Goal")
					{
						this.victoryCheck();
					}
				}
			}
		}
	}

	victoryCheck()
	{
		var areAllGoalCellsOccupiedBySliders = true;

		var map = this.map;
		var terrainGoal = map.terrains["Goal"];
		var cellPos = new Coords(0, 0);

		for (var y = 0; y < map.sizeInCells.y; y++)
		{
			cellPos.y = y;

			for (var x = 0; x < map.sizeInCells.x; x++)
			{
				cellPos.x = x;

				var terrainAtPos = map.cellAtPos(cellPos);
				if (terrainAtPos == terrainGoal)
				{
					var sliderAtPos = map.sliderAtPos(cellPos);
					if (sliderAtPos == null)
					{
						areAllGoalCellsOccupiedBySliders = false;
						y = map.sizeInCells.y;
						break;
					}
				}
			}
		}

		if (areAllGoalCellsOccupiedBySliders == true)
		{
			Globals.Instance.inputHelper.finalize();
			Globals.Instance.displayHelper.drawLevel(this);

			var divWinMessage = document.createElement("div");
			divWinMessage.innerHTML = "You win!";
			document.body.appendChild(divWinMessage);
		}
	}
}
