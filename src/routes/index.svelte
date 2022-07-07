<script lang="ts">
	import Geolocation from 'svelte-geolocation';
	import * as animateScroll from 'svelte-scrollto';
	import { username, range } from '../stores.js';
    import { SvelteToast, toast } from '@zerodevx/svelte-toast';


	let coords: [number, number] = [null, null];

	let user = '';
	username.subscribe((value) => (user = value));

	function tsToDate(timestamp: number) {
		const currentTimeStamp = new Date(timestamp);
		const hour = currentTimeStamp.getHours().toString().padStart(2, '0');
		const minute = currentTimeStamp.getMinutes().toString().padStart(2, '0');
		return `${hour}:${minute}`;
	}

	function scrollDown() {
		if (typeof document !== 'undefined') {
			animateScroll.scrollTo({ element: '#end' });
		}
	}

	async function sendMessage() {
		if (currentMessage == '') {
			return;
		}
        console.log(coords)

        if (coords[0] == null) {
            toast.pop(0)
            toast.push('Error: No location found.');
            return
        }
		const timestamp = new Date().getTime();
        const lat = coords[0];
        const long = coords[1];
		const res = await fetch(
			`http://localhost:8000/messages/send?user=${user}&timestamp=${timestamp}&content=${currentMessage}&lat=${lat}&long=${long}`
		);
		currentMessage = '';
		scrollDown();
	}

	async function getMessages() {
		const lenMsg = messages.length;
    
        const lat = coords[0];
        const long = coords[1];
        
		messages = await (await fetch(`http://localhost:8000/messages/get?lat=${lat}&long=${long}`)).json();

		if (messages.length != lenMsg) {
			scrollDown();
		}
	}

	let currentMessage = '';

	let messages = [];

	setInterval(function () {
		getMessages();
	}, 1000);
</script>

<Geolocation getPosition bind:coords />
<SvelteToast />
<div class="chat">
	{#each messages as message}
		<div class="message-outer">
			{#if message.user == user}
				<div class="message-inner message-right">
					<div class="bubble bubble-right">
						<span class="text">{message.content}</span>
						<span class="time">{tsToDate(message.timestamp)}</span>
					</div>
				</div>
			{:else}
				<div class="message-inner">
					<div class="bubble">
						<div class="user">{message.user}</div>
						<span class="text">{message.content}</span>
						<span class="time">{tsToDate(message.timestamp)}</span>
					</div>
				</div>
			{/if}

			<div />
		</div>
	{/each}
</div>
<span id="end" />

<form class="chatbar" on:submit|preventDefault>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		autofocus
		type="text"
		bind:value={currentMessage}
		class="input"
		placeholder="Enter a message..."
	/>
	<button type="submit" class="submit" on:click={sendMessage}>Send</button>
</form>

<style>
	.chat {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1em;
		background-color: #ddddff;
		padding: 1em;
		height: 100%;
	}

	.message-outer {
		display: flex;
	}

	.message-inner {
		display: flex;
		flex: 1;
	}

	.bubble {
		background-color: gray;
		border-radius: 15px;
		color: white;
		padding: 10px;
		margin: 10px;
		display: grid;
		min-width: 2em;
		max-width: calc(100% - 67px);
		overflow-wrap: break-word;
		animation: fadein 0.5s;
	}

	.bubble-right {
		background-color: green;
	}

	.message-right {
		flex-direction: row-reverse;
	}

	.time {
		font-size: 0.7em;
		color: #cccccc;
		grid-row: 3;
		margin-top: 5px;
		justify-self: end;
	}

	.user {
		font-size: 0.9em;
		color: #cccccc;
		grid-row: 1;
	}

	.text {
		grid-row: 2;
	}

	.chatbar {
		position: sticky;
		bottom: 0;
		width: calc(100% - 0.9em);
		display: flex;
		background-color: #eeeeee;
		font-family: Arial, Helvetica, sans-serif;
		padding: 5px;
		align-items: center;
	}
	.input {
		display: flex;
		flex-grow: 1;
		padding: 15px;
		border: 0;
	}
	.submit {
		display: flex;
		text-decoration: underline;
		cursor: pointer;
		float: right;
		padding: 15px;
		height: 100%;
		border: 0;
	}

	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
