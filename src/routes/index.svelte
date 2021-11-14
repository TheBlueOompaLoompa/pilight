<script lang="ts">
	let pattern
	let settings
	async function getInfo() {
		const response = await (await fetch(`/api/lights/e`, {method: 'get'})).json();;
		console.log(response);
		pattern = response.patterns[0];
		settings = response.settings;
		return response;
	}

	async function setPattern(e) {
		await fetch(`/api/lights/pattern,${e.target.value}`, {method: 'post'})
	}

	async function updateSetting(setting, value) {
		console.log(`/api/lights/setting,${setting},${value}`)
		await fetch(`/api/lights/setting,${setting},${value}`, {method: 'post'})
	}
</script>

{#await getInfo()}
	<p>Loading...</p>
{:then data}
	<select on:change={setPattern}>
		{#each data.patterns as pattern}
		<option value={pattern.name}>{pattern.name}</option>
		{/each}
	</select>
	{#each pattern.settings as setting}
		<h3>{setting.name}</h3>
		{#if setting.type == 'color'}
			<input type="color" value={`#${settings.color}`} on:change={(e) => {updateSetting(setting.name, e.target.value.replace('#', ''))}}>
		{/if}
	{/each}
{:catch}
<h2>Error</h2>
<p>Try reloading</p>
{/await}