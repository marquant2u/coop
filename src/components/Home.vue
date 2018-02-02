<template>
    <div class="Home">
        <div class="channel">
            <div id=titre>Channel :</div>
            <div class="channelvfor scrollbar" id="style-2">
            <div v-for="chan in channels"
				:channels="chan"
				:key="chan._id">
                <button type="button" class="button" @click="co_channel(chan)" :id="chan._id" >{{ chan.label }}</button>
                <button type="button" class="button-supp" @click="supp_channel(chan)" :id="chan._id" >X</button>
                <p class="topic">Topic : {{ chan.topic }}</p>
                
            </div>
            </div>
        <div id='addnew'><button type="button" @click="create_channel">Ajouter channel !</button></div>
        </div>
        <div class="chats" v-if="channel_actuel != 0">
            <div id="titre">Chats :</div>
            <button type="button" class="button-deco" @click="logout()" >Se deconnecter</button>
            <div class="scrollbar historique" ref="histo" id="style-2">
                <div v-for="post in channels_post"
				:channels_post="post"
				:key="post._id">
                    <p class= "member"> {{ post.member_id }} :</p>
                    <p class= "message"> {{ post.message }}</p>
                    <p class= "date"> {{ post.updated_at }}</p>
                </br>
                </div>
            </div>
            <div id="message">
                <form>
                    <input id="champs_text" ref="champs_text" type="text" value="Votre message" onfocus="if (this.value=='Votre message') this.value='';" onblur="if (this.value=='') this.value='Votre message';"/>
                    <input type="submit" value="Envoyer"  id="bouton_envoi" @click="send ()"/>
                </form>
            </div>
        </div>
        <div class="chats" v-if="channel_actuel === 0">
            <div id="titre">Chats :</div>
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
            ...mapState(['channels_post', 'channel_actuel', 'channels'])
        },

        created() {
            api.get('/channels').then((response) => {
                this.$store.dispatch('fillChannel', response.data)
            });
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

            ...mapActions(['co_channel']),
            ...mapActions(['supp_channel']),
            ...mapActions(['create_channel'])
        }
    }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
        background-color: lightgray;
    }

    .channel {
        display: flex;
        flex-wrap: wrap;
        flex-basis: 25%;
        flex-grow: 1;
        background-color: lightslategrey;
    }

    .button {
        width: 80%;
    }

    .button-supp {
        width: 10%;
    }

    .channelvfor {
        height: 88%;
        width: 100%;
    }

    #addnew {}

    .topic {
        color: brown
    }

    .historique {
        margin: 40px;
        width: 90%;
        height: 500px;
        padding: 5px;
        border: 8px solid #67ab9f;
        background-color: #b3d8d2;
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

    #titre {
        width: 80%;
        height: 40px;
        font-size: 20px;
        font-style: italic;
        font-family: verdana;
        justify-content: center;
        border-radius: 10px 10px 10px 10px;
        padding-left: 20px;
        padding-top: 5px;
    }


    #style-2::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: dimgrey;
    }

    #style-2::-webkit-scrollbar {
        width: 12px;
        background-color: dimgrey;
    }

    #style-2::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: dimgrey;
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
        margin-left: 30px;
        float: left;
        height: 400px;
        width: 90%;
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

    .button-deco {
        color: red;
    }

</style>
