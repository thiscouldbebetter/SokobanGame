
class ArrayHelper
{
	static addLookupsToArray(array, keyName)
	{
		for (var i = 0; i < array.length; i++)
		{
			var item = array[i];
			var key = item[keyName];
			array[key] = item;
		}
	}
}
