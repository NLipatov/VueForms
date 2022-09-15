<template>
    <div class="header-container">
        <h1 style="font-size: 30pt;">VueForm</h1>
        <div class="header-controls">
            <router-link to="/Form">
                <div  class="control-item">
                    <font-awesome-icon class="fa-icon" icon="fa-solid fa-pen-to-square" />
                    <span>Fill A Form</span>
                </div>
            </router-link>
            <router-link to="/Table">
                <div class="control-item">
                    <font-awesome-icon class="fa-icon" icon="fa-solid fa-table" />
                    <span>Table</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style>
    .header-container {
        background-color: #34495E;
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
        align-items: center;
        gap: 10px;
    }
    .fa-icon {
        font-size: 20pt;
        color: #41b883ac;
    }
    .header-controls {
        display: flex;
        gap: 10px;
    }
    .control-item {
        display: flex;
        flex-direction: column;
        padding: 10px;
        cursor: pointer;
    }
    .control-item span{
        color: #d8d8d8;
    }
    a{
        text-decoration: unset !important;
    }
</style>

<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>