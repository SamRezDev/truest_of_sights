const InputCity = document.getElementById('InputCity');
const ButtonGet = document.getElementById('ButtonGet');
const query = document.getElementById('query');
const nameofquery = document.getElementById('nameofquery');
const Resultofquery = document.getElementById('Resultofquery');
const AccountName = document.getElementById('AccountName');
const AccountImage = document.getElementById('AccountImage');
const TotalDuration = document.getElementById('TotalDuration');
const EZCounter = document.getElementById('EZCounter');
const wordselected = document.getElementById('wordselected');

ButtonGet.addEventListener('click', () => {
	var account_id = InputCity.value;
	fetch(`https://api.opendota.com/api/players/${account_id}/recentMatches`)
		.then((response) => response.json())
		.then((data) => {
			var result = data.reduce(function(sum, item) {
				return (sum = sum + item.duration);
			}, 0);

			var AVGGPM = data.reduce(function(sum, item) {
				return (sum = sum + item.gold_per_min);
			}, 0);
			AVGGPM = AVGGPM / data.length;

			console.log('AVG GPM IS ' + AVGGPM);
			nameofquery.innerHTML = AVGGPM;

			data.radiant_win
				? (Resultofquery.innerHTML = 'RADIANT VICTORY')
				: (Resultofquery.innerHTML = 'DIRE VICTORY');
			Resultofquery.innerHTML ? (Resultofquery.style.color = 'green') : (Resultofquery.style.color = 'red');
		});

	fetch(`https://api.opendota.com/api/players/${account_id}/wordcloud`)
		.then((response) => response.json())
		.then((data) => {
			data.map((data) => {
				console.log('the player said this :o ' + data);
			});
		});

	fetch(`https://api.opendota.com/api/players/${account_id}/wordcloud`)
		.then((response) => response.json())
		.then((data) => {
			var command = 'data.my_word_counts';
			var word = wordselected.value;

			console.log('This guy said ez :' + data.my_word_counts.ez + ' times');
			if (word === 'ez') {
				EZCounter.innerHTML = data.my_word_counts.ez + ' times !';
			} else if (word === 'gg') {
				EZCounter.innerHTML = data.my_word_counts.gg + ' times !';
			}
		});
	fetch(`https://api.opendota.com/api/players/${account_id}`).then((response) => response.json()).then((data) => {
		AccountName.innerHTML = 'Account name: ' + data.profile.personaname + '  ';
		AccountImage.src = data.profile.avatarmedium;
	});

	fetch(`https://api.opendota.com/api/players/${account_id}/matches`)
		.then((response) => response.json())
		.then((data) => {
			var result = data.reduce(function(sum, item) {
				return (sum = sum + item.duration);
			}, 0);
			result = result / 3600;

			result = parseInt(result);
			TotalDuration.innerHTML = result + ' hours';
		});

	wordselected.addEventListener('change', () => {
		fetch(`https://api.opendota.com/api/players/${account_id}/wordcloud`)
			.then((response) => response.json())
			.then((data) => {
				var command = 'data.my_word_counts';
				var word = wordselected.value;

				console.log('This guy said ez :' + data.my_word_counts.ez + ' times');
				if (word === 'ez') {
					EZCounter.innerHTML = data.my_word_counts.ez + ' times !';
				} else if (word === 'gg') {
					EZCounter.innerHTML = data.my_word_counts.gg + ' times !';
				}
			});
	});
	console.log(data.rotation_period);

	query.innerHTML = InputCity.value;
});
