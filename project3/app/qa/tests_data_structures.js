var assertions = require("chai").assert;

suiteSetup("setup of A", function()
{
	var array01 = [6, 7, 8];

	suite("A", function()
	{
		setup("setup of A.A", function()
		{
			var array02 = ["nothing", "something"];

			test("A.A", function()
			{
				array02.pop();

				assert.deepEqual(array02, ["nothing"]);
				teardown("teardown of A.A", function()
				{
					array02 = null;
				});
			});
		});

		suiteTeardown("teardown of A", function()
		{
			array01 = null;
		});
	});
});


