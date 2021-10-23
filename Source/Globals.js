
class Globals
{
	static Instance = new Globals();

	initialize(viewSizeInPixels, level)
	{
		this.level = level;

		this.displayHelper = new DisplayHelper();
		this.displayHelper.initialize(viewSizeInPixels);

		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this),
			150 // millisecondsPerTimerTick
		);

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();
	}

	// events

	handleEventTimerTick()
	{
		this.level.updateForTimerTick();
	}
}
