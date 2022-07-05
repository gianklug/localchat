<Geolocation getPosition bind:coords />
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

<form class="chatbar"  on:submit|preventDefault> 
    <!-- svelte-ignore a11y-autofocus -->
    <input autofocus type="text" bind:value={currentMessage} class="input" placeholder="Enter a message..."/>
    <button type="submit" class="submit" on:click={sendMessage}>Send</button>
</form>

<style>
    
    .chat {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1em;
        background-color: #DDDDFF;
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
    }

    .bubble-right {
        background-color: green;
    }

    .message-right {

        flex-direction: row-reverse;

    }

    .time {
        font-size: 0.7em;
        color: #CCCCCC;
        grid-row: 3;
        margin-top: 5px;
        justify-self: end;
       
    }

    .user {
        font-size: 0.9em;
        color: #CCCCCC;    
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
        background-color: #EEEEEE;
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
    
</style>

<script lang="ts">
import Geolocation from "svelte-geolocation";
import * as animateScroll from "svelte-scrollto";
import { username, range } from '../stores.js';


let coords: [number, number] = [0, 0];

let user = '';
username.subscribe(value => user = value)

function tsToDate(timestamp: number) {
    const currentTimeStamp = new Date(timestamp);
    const hour = currentTimeStamp.getHours().toString().padStart(2, '0')
    const minute = currentTimeStamp.getMinutes().toString().padStart(2, '0');
    return(`${hour}:${minute}`)
}

function scrollDown() {
    if (typeof document !== 'undefined'){
    animateScroll.scrollToBottom()
}
}


async function sendMessage() {
    if (currentMessage == "") {
        return;
    };
    const timestamp = new Date().getTime();
    const res = await fetch(`http://192.168.98.43:8000/messages/send?user=${user}&timestamp=${timestamp}&content=${currentMessage}`)
    currentMessage = "";
    scrollDown()
    console.log(coords);
}

async function getMessages() {
    const preMessages = messages;
    messages = await (await fetch(`http://192.168.98.43:8000`)).json();  
    if (messages !== preMessages) {
        scrollDown()
    }
}

let currentMessage = "";

let messages = [
    {
        "user": "localhost",
        "timestamp": 1656951421000,
        "content": "Hey"
    },
    {
        "user": "uwunator",
        "timestamp": 1656952421000,
        "content": "Ho"
    },
    {
        "user": "testeroni",
        "timestamp": 1656953421000,
        "content": "Heyy! Das isch mol e längeri Nochricht zum Linebreaks und so teste :)"
    }
]

setInterval(function() {getMessages()}, 1000);


</script>

