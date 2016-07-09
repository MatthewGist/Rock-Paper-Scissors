var counter;
var minutes;
var seconds;

function Countdown()
{
	// Decrement the seconds value, or instead if it is zero, decrement the minutes value and reset the seconds value to 59 seconds
	if (parseInt($("#seconds").val()) != 0)
		$("#seconds").val(parseInt($("#seconds").val()) - 1);
	else
	{
		$("#minutes").val(parseInt($("#minutes").val()) - 1);
		$("#seconds").val("59");
	}
	
	// Provide warning if the game clock has ten seconds or less remaining
	if (($("#minutes").val() == "0" || $("#minutes").val() == "") && parseInt($("#seconds").val()) == 10)
		$("#feedback").html("Warning! You have ten seconds or less remaining in the game!");
	
	// If time has expired, cancel the countdown functionality, indicate expiration, and disable gameplay
	if (($("#minutes").val() == "0" || $("#minutes").val() == "") && $("#seconds").val() == "0")
	{
		clearInterval(counter);
		$("#feedback").html("Time has expired. Game over.");
	}
}

function StartTimer()
{
	// Set blank input values to zero
	if ($("#minutes").val() == "")
		$("#minutes").val("0");
	
	if ($("#seconds").val() == "")
		$("#seconds").val("00");
	
	// Split time if seconds value exceeds 59
	if (parseInt($("#seconds").val()) > 59)
	{
		$("#minutes").val(Math.floor(parseInt($("#minutes").val()) + (parseInt($("#seconds").val()) / 60)))
		$("#seconds").val(parseInt($("#seconds").val()) % 60);
	}
	
	// Ensure input has been provided for the game clock prior to beginning.
	if ($("#minutes").val() == "0" && $("#seconds").val() == "0")
	{
		$("#feedback").html("Please enter a desired game duration before starting.");
		$("#minutes").val("");
		$("#seconds").val("");
		$("#minutes").focus();
	}
	else
	{
		// Clear feedback text
		$("#feedback").html("&nbsp;");
		
		// Initialize the visability and editability of timer related functionality
		$("#start").hide();
		$("#restart").show();
		$("#minutes, #seconds").attr("disabled", "true");
		
		// Store desired game time to facilitate clock restart functionality
		minutes = $("#minutes").val();
		seconds = $("#seconds").val();
		
		// Initiate countdown each second to facilitate game clock
		counter = setInterval(Countdown, 1000);
	}
}

function RestartTimer()
{
	// Reinitialize feedback mechanism to blank state
	$("#feedback").html("&nbsp;");
	
	// Reinitialize game clock to initial input
	$("#minutes").val(minutes);
	$("#seconds").val(seconds);
	
	// Cancel timer and reinitiate the countdown functionality
	clearInterval(counter);
	counter = setInterval(Countdown, 1000);
	
	// Reinitialize score values to zero
	$("#wins, #losses, #draws").val("0");
}

$(document).ready(
	function()
	{
		// Set the proper initial visibility and values of certain elements
		$("#restart").hide();
		$("#wins, #losses, #draws").val("0");
		
		// Bind button click events to their respective functions
		$("#start").click(StartTimer);
		$("#restart").click(RestartTimer);
		
		// Place focus on timer input
		$("#minutes").focus();
	}
);