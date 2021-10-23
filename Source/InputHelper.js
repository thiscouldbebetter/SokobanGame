
class InputHelper
{
	finalize()
	{
		this.keyCodePressed = null;
		document.body.onkeydown = null;
		document.body.onkeyup = null;
	}
	
	initialize()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	// events

	handleEventKeyDown(event)
	{
		this.keyCodePressed = event.keyCode;
	}

	handleEventKeyUp(event)
	{
		this.keyCodePressed = null;
	}
}
