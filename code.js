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
	
	// If time has expired, cancel the countdown functionality, indicate expiration and overall result, and disable gameplay
	if (($("#minutes").val() == "0" || $("#minutes").val() == "") && $("#seconds").val() == "0")
	{
		// Cancel the countdown functionality
		clearInterval(counter);
		
		// Indicate expiration and overall result
		if (parseInt($("#wins").val()) == parseInt($("#losses").val()))
			$("#feedback").html("Time has expired. You drew with your opponent.");
		else if (parseInt($("#wins").val()) > parseInt($("#losses").val()))
			$("#feedback").html("Time has expired. You won!");
		else
			$("#feedback").html("Time has expired. You lost.");
		
		// Disable gameplay
		$("#minutes").parent().hide();
		$("#seconds").parent().hide();
		$("#seconds").parent().parent().children().first().hide();
		$("#player").parent().parent().hide();
		$("#rock").parent().hide();
		
		// Allow for the game clock to be reset
		$("#reset").show();
	}
}

function StartTimer()
{
	// Set blank input values to zero
	if ($("#minutes").val() == ""  || parseInt($("#minutes").val()) < 0)
		$("#minutes").val("0");
	
	if ($("#seconds").val() == "" || parseInt($("#seconds").val()) < 0)
		$("#seconds").val("00");
	
	// Split time if seconds value exceeds 59
	if (parseInt($("#seconds").val()) > 59)
	{
		$("#minutes").val(Math.floor(parseInt($("#minutes").val()) + (parseInt($("#seconds").val()) / 60)))
		$("#seconds").val(parseInt($("#seconds").val()) % 60);
	}
	
	// Ensure input has been provided for the game clock prior to beginning.
	if ($("#minutes").val() == "0" && ($("#seconds").val() == "00" || $("#seconds").val() == "0"))
	{
		$("#feedback").html("Please enter a desired game duration before starting.");
		$("#minutes").val("");
		$("#seconds").val("");
		$("#minutes").focus();
	}
	else
	{
		// Initialize feedback value
		if (($("#minutes").val() == "0" || $("#minutes").val() == "") && parseInt($("#seconds").val()) <= 10)
			$("#feedback").html("Warning! You have ten seconds or less remaining in the game!");
		else
			$("#feedback").html("&nbsp;");
		
		// Initialize the visability and editability of timer related functionality
		$("#start").hide();
		$("#restart").show();
		$("#minutes, #seconds").prop("disabled", true);
		
		// Store desired game time to facilitate clock restart functionality
		minutes = $("#minutes").val();
		seconds = $("#seconds").val();
		
		// Reveal game playing and score tracking elements
		$("#player").parent().parent().show();
		$("#rock").parent().show();
		$("#wins").parent().parent().show();
		
		// Initiate countdown each second to facilitate game clock
		counter = setInterval(Countdown, 1000);
	}
}

function RestartTimer()
{
	// Reinitialize game clock to initial input
	$("#minutes").val(minutes);
	$("#seconds").val(seconds);
	
	// Initialize feedback value
	if (($("#minutes").val() == "0" || $("#minutes").val() == "") && parseInt($("#seconds").val()) <= 10)
		$("#feedback").html("Warning! You have ten seconds or less remaining in the game!");
	else
		$("#feedback").html("&nbsp;");
	
	// Hide reset functionality
	$("#reset").hide();
	
	// Clear final play of the previous game
	$("#player, #opponent").html("");
	
	// Reveal game playing and score tracking elements
	$("#minutes").parent().show();
	$("#seconds").parent().show();
	$("#seconds").parent().parent().children().first().show();
	$("#player").parent().parent().show();
	$("#rock").parent().show();
	
	// Reinitialize score values to zero
	$("#wins, #losses, #draws").val("0");
	
	// Cancel timer and reinitiate the countdown functionality
	clearInterval(counter);
	counter = setInterval(Countdown, 1000);
}

function ResetTimer()
{
	// Reinitialize feedback mechanism
	$("#feedback").html("&nbsp;");
	
	// Reinitialize the game clock and make it visible and editable
	$("#minutes").val("");
	$("#seconds").val("");
	$("#minutes, #seconds").prop("disabled", false);
	$("#minutes").parent().show();
	$("#seconds").parent().show();
	$("#seconds").parent().parent().children().first().show();
	
	// Make the start button the only available option
	$("#start").show();
	$("#restart").hide();
	$("#reset").hide();
	
	// Clear final play of the previous game
	$("#player, #opponent").html("");
	
	// Reinitialize score values to zero and hide them
	$("#wins, #losses, #draws").val("0");
	$("#wins").parent().parent().hide();
	
	// Place focus on timer input
	$("#minutes").focus();
}

function Play(choice)
{
	// Render the player's indicate choice
	switch(choice)
	{
		case 0:
			$("#player").html("<img src='rock.png' /><div>Rock</div>");
			break;
		case 1:
			$("#player").html("<img src='paper.png' /><div>Paper</div>");
			break;
		case 2:
			$("#player").html("<img src='scissors.png' /><div>Scissors</div>");
			break;
		default:
			break;
	}
	
	// Determine the opponent's random choice and the resulting outcome
	switch(Math.round(Math.random() * 2))
	{
		case 0:
			$("#opponent").html("<img src='rock.png' /><div>Rock</div>");
			if (choice == 0)
				$("#draws").val(parseInt($("#draws").val()) + 1);
			else if (choice == 1)
				$("#wins").val(parseInt($("#wins").val()) + 1);
			else
				$("#losses").val(parseInt($("#losses").val()) + 1);
			break;
		case 1:
			$("#opponent").html("<img src='paper.png' /><div>Paper</div>");
			if (choice == 0)
				$("#losses").val(parseInt($("#losses").val()) + 1);
			else if (choice == 1)
				$("#draws").val(parseInt($("#draws").val()) + 1);
			else
				$("#wins").val(parseInt($("#wins").val()) + 1);
			break;
		case 2:
			$("#opponent").html("<img src='scissors.png' /><div>Scissors</div>");
			if (choice == 0)
				$("#wins").val(parseInt($("#wins").val()) + 1);
			else if (choice == 1)
				$("#losses").val(parseInt($("#losses").val()) + 1);
			else
				$("#draws").val(parseInt($("#draws").val()) + 1);
			break;
		default:
			break;
	}
}

$(document).ready(
	function()
	{
		// Set the proper initial visibility and default values of certain elements
		$("#restart").hide();
		$("#reset").hide();
		$("#player").parent().parent().hide();
		$("#rock").parent().hide();
		$("#wins").parent().parent().hide();
		$("#wins, #losses, #draws").val("0");
		
		// Bind button click events to their respective functions
		$("#start").click(StartTimer);
		$("#restart").click(RestartTimer);
		$("#reset").click(ResetTimer);
		$("#rock").click(function() {Play(0);});
		$("#paper").click(function() {Play(1);});
		$("#scissors").click(function() {Play(2);});
		
		// Place focus on timer input
		$("#minutes").focus();
	}
);