<template>
    <div class="Home">
        <div class="channel">
            <div class="channelvfor scrollbar1" id="style-2">
                <div id='addnew'>
                <h1>Membres </h1>
                <button type="button" class="btn btn-2"@click="route_member()">Liste des membres</button>
            </div>
            <div id='addnew'>
                <h1>Channel </h1>
                <button type="button" class="btn btn-2"@click="create_channel">Ajouter channel !</button>
            </div>
            <div v-for="chan in channels"
				:channels="chan"
				:key="chan._id">
                <div class="ext" ><button type="button" class="btn btn-5 btn-long" @click="co_channel(chan)" :id="chan._id" >{{ chan.label }}</button>
                <button type="button" class="btn btn-6" @click="supp_channel(chan)" :id="chan._id" >Delete</button>
                <p class="topic">Topic : {{ chan.topic }}</p>
                </div>
            </div>
            
            </div>
        </div>
        <div class="chats" v-if="channel_actuel != 0">
            <div class="info">
                <h1>{{ channel_actuel.label }}</h1>
                <button type="button" class="btn btn-6 deco" @click="logout()" >Se deconnecter</button>
            </div>
            <div class="scrollbar historique" ref="histo" >
                <div v-for="post in channels_post"
				:channels_post="post"
				:key="post._id">
                    <div v-for="mem in members"
				        :members="mem"
				        :key="mem._id">
                        <div v-if="mem._id === post.member_id" class='message'>
                            <div class='message1'>
                                <p class= "member"> {{ mem.fullname }} :</p>
                                <p class= "message" ref="message"> {{ post.message }}</p>
                                <p class= "date"> {{ post.updated_at }}</p>
                            </div>
                            <div class='message2'>
                                <button type="button" class="btn btn-6"@click="delete_mes(post)">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <br>
            </div>
            <div id="message">
                <form>
                    <input id="champs_text" ref="champs_text" type="text" value="Votre message" onfocus="if (this.value=='Votre message') this.value='';" onblur="if (this.value=='') this.value='Votre message';"/>
                    <input type="submit" class="btn btn-5" value="Envoyer"  id="bouton_envoi" @click="send ()"/>
                </form>
            </div>
        </div>
        <div class="chats" v-if="channel_actuel === 0">
            <div id="historique">
                <p>Veuillez séléctionner un channel sur le coté</p>
            </div>
        </div>
    </div>
</template>


<script>
    import api from '@/api'
    import Vuex from 'vuex'
    import {
        mapActions
    } from 'vuex'
    import {
        mapState
    } from 'vuex'

    export default {

        computed: {
            ...mapState(['channels_post', 'channel_actuel', 'channels', 'members'])
        },

        created() {
            api.get('/channels').then((response) => {
                this.$store.dispatch('fillChannel', response.data)
            });

            api.get('/members').then((response) => {
                this.$store.dispatch('fillMembers', response.data)
            });

            var intervalle = setInterval(() => {
                this.$store.dispatch('update_post')
                console.log('update data')
                this.$refs.histo.scrollTop = this.$refs.histo.scrollHeight
            }, 15000);
        },
        methods: {

            send() {
                this.$store.dispatch('send_channel', this.$refs.champs_text.value)
                this.$refs.champs_text.value = "";
                this.$refs.histo.scrollTop = this.$refs.histo.scrollHeight;
            },

            logout() {
                this.$store.dispatch('auth/logout', true, {
                    root: true
                })
            },


            route_member() {
                console.log('ok')
                this.$router.push({
                    name: "members"
                })
            },

            delete_mes(post) {
                this.$store.dispatch('delete_post', post)
            },

            ...mapActions(['co_channel']),
            ...mapActions(['supp_channel']),
            ...mapActions(['create_channel'])
        }
    }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .message {
        display: flex;
        flex-wrap: wrap;
    }

    .message1 {
        flex-basis: 80%;
    }

    .message2 {
        flex-basis: 20%;
    }

    .info {
        background-color: lightskyblue;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        border-style: solid;
        border-radius: 10px 10px 10px 10px;
        border-color: lightskyblue;
    }

    .ext {

        color: black;
        margin: 2%;
    }

    .member {
        color: chocolate;
        font-size: 20px;
    }

    .message {
        color: dimgray;
    }

    .date {
        font-size: 8px;
    }

    .Home {
        display: flex;
        flex-wrap: wrap;
    }

    .chats {
        display: flex;
        flex-wrap: wrap;
        flex-basis: 65%;
        flex-grow: 3;
        background-color: whitesmoke;
    }

    .channel {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        flex-basis: 25%;
        flex-grow: 1;
        background-color: lightskyblue;
    }



    .channelvfor {
        width: 100%;
    }

    .topic {
        color: brown,

    }

    .historique {

        margin: 40px;
        width: 90%;
        height: 500px;
        padding: 5px;
        border: 3px solid lightskyblue;
        background-color: whitesmoke;
        -moz-border-radius: 20px;
        -khtml-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;


    }

    #message {
        width: 100%;

    }

    #champs_text {
        margin-bottom: 20px;
        margin-left: 20px;
        width: 80%;
    }


    #style-2::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: grey;
    }

    #style-2::-webkit-scrollbar {
        width: 12px;
        background-color: lightskyblue;
    }

    #style-2::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: white;
    }

    header {
        font-family: 'Lobster', cursive;
        text-align: center;
        font-size: 25px;
    }

    #info {
        font-size: 18px;
        color: #555;
        text-align: center;
        margin-bottom: 25px;
    }

    a {
        color: #074E8C;
    }

    .scrollbar {
        height: 400px;
        overflow-y: scroll;
        margin-bottom: 25px;
    }

    .scrollbar1 {
        height: 600px;
        overflow-y: scroll;
        margin-bottom: 25px;
    }

    .force-overflow {
        min-height: 450px;
    }

    #wrapper {
        text-align: center;
        width: 500px;
        margin: auto;
    }

    html,
    body {
        height: 100%;
    }


    body {
        margin: 0px;
        padding: 0px;
    }

    body {
        background-color: whitesmoke;
        color: whitesmoke;
        font: 700 14px Montserrat, sans-serif;
        letter-spacing: 0.125em;
        text-align: center;
        text-transform: uppercase;
    }

    .btn {
        background: none;
        border: 2px solid;
        border-bottom-width: 4px;
        font: inherit;
        letter-spacing: inherit;
        margin: 1em;
        padding: 3 0px;
        text-transform: inherit;
        transition: color 1s;
    }

    .btn-1 {
        color: #9c89f7;
    }

    .btn-1:hover {
        animation: halftone 1s forwards;
        background: radial-gradient(circle, #9c89f7 0.2em, transparent 0.25em) 0 0 / 1.25em 1.25em, radial-gradient(circle, #9c89f7 0.2em, transparent 0.25em) 6.25em 6.25em / 1.25em 1.25em;
        color: #e4f789;
    }

    @keyframes halftone {
        100% {
            background-size: 2.375em 2.375em, 0.1em 0.1em;
        }
    }

    .btn-2 {
        color: #82f6d8;
    }

    .btn-2:hover {
        animation: stripes-move 0.75s infinite linear;
        background: repeating-linear-gradient(45deg, #82f6d8 0, #82f6d8 0.25em, transparent 0.25em, transparent 0.5em);
        color: #f682a0;
    }

    @keyframes stripes-move {
        100% {
            background-position: 5em 0px;
        }
    }

    .btn-3 {
        color: #d3f169;
    }

    .btn-3:hover {
        animation: sawtooth 0.35s infinite linear;
        background: linear-gradient(45deg, #d3f169 0.5em, transparent 0.5em) 0 0 / 1em 1em, linear-gradient(-45deg, #d3f169 0.5em, transparent 0.5em) 0 0 / 1em 1em;
        color: #8769f1;
    }

    @keyframes sawtooth {
        100% {
            background-position: 1em 0;
        }
    }

    .btn-4 {
        color: #eea163;
    }

    .btn-4:hover {
        animation: zigzag 1s linear infinite;
        background: linear-gradient(135deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) -0.5em 0, linear-gradient(225deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) -0.5em 0, linear-gradient(315deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) 0 0, linear-gradient(45deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) 0 0;
        background-size: 0.75em 0.75em;
        color: #63b0ee;
    }

    @keyframes zigzag {
        100% {
            background-position: 1em 0, 1em 0, -0.75em 0, -0.75em 0;
        }
    }

    .btn-5 {
        color: #7cf07f;
    }

    .btn-5:hover {
        animation: blinds 0.75s linear forwards;
        background: linear-gradient(0deg, #7cf07f 25%, transparent 25%) 0 0 / 0.5em 0.5em, linear-gradient(0deg, #88d6f3 50%, transparent 50%) 0 0 / 1em 1em;
        color: #f07ced;
    }

    @keyframes blinds {
        100% {
            background-position: 0 0, 0 -3em;
            background-size: 0 0, 1em 6em;
        }
    }

    .btn-6 {
        color: #f9879b;
    }

    .btn-6:hover {
        animation: pulse 1s ease-in infinite;
        background: radial-gradient(circle, rgba(249, 135, 155, 0.25) 43%, transparent 50%) 0 0 / 1em 1em, radial-gradient(circle, rgba(249, 135, 155, 0.25) 43%, transparent 50%) 0.5em 0.5em / 2em 2em;
        color: #0bdcb7;
    }

    @keyframes pulse {
        50% {
            background-position: 0.66em 0.66em, -0.33em -0.33em;
        }
        100% {
            background-size: 2em 2em, 1em 1em;
            background-position: -1.5em -1.5em, -1em -1em;
        }
    }

    h1 {
        color: white;
    }

</style>
