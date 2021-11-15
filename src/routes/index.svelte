<script lang="ts">
	let pattern
	let patterns
	let settings

	let patternName

	async function getInfo() {
		const response = await (await fetch(`/api/lights/e`, {method: 'get'})).json();;
		console.log(response);
		response.patterns.forEach(pat => {
			if(pat.name == response.active) {
				pattern = pat;
				patternName = response.active;
			}
		});
		patterns = response.patterns;
		settings = response.settings;
		return response;
	}

	async function setPattern(e) {
		patterns.forEach(pat => {
			if(pat.name == e.target.value) {
				pattern = pat
			}
		})
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
	<select bind:value={patternName} on:change={setPattern}>
		{#each data.patterns as pattern}
		<option value={pattern.name}>{pattern.name}</option>
		{/each}
	</select>
	{#each pattern.settings as setting}
		<h3>{setting.name}</h3>
		{#if setting.type == 'color'}
			<input type="color" value={`#${settings.color}`} on:change={(e) => {updateSetting(setting.name, e.target.value.replace('#', ''))}}>
		{:else if setting.type == 'range'}
			<input type="range" min={setting.min} max={setting.max} on:change={(e) => {updateSetting(setting.name, e.target.value)}}>
		{/if}
	{/each}
{:catch}
<h2>Error</h2>
<p>Try reloading</p>
{/await}