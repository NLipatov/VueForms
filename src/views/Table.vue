<script setup>
    import config from '../../public/config.json';
    import {ref} from 'vue'
import { forEach } from 'lodash';
    const columns = ref(null);
    const rawOwners = ref(null);
    const owners = ref([]);

    const fetchColumns = fetch(`${config.BackendService}/VueForms/DefineTableColumns`)
    .then((response) => response.json())
    .then((data) => {
        columns.value = data;
    });

    const fetchOwners = fetch(`${config.BackendService}/VueForms/LoadAllOwners`)
    .then((response) => response.json())
    .then((data) => {
        rawOwners.value = data;
        parseServerOwnersResponse(data)
    });

    const parseServerOwnersResponse = (response) => {
        for(let i = 0; i < response.length; i++) {
            const owner = JSON.parse(response[i].jsonString);
            owners.value.push(owner);
        }
        console.log(owners.value[0]['firstnamee'])
    }


</script>

<template>
    <uspense>
        <div class="view-container">
        <div class="up-divider">
        </div>
        <div class="table-container">
            <div class="table-content">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th v-for="item in columns" scope="col">{{item}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(owner, ownerIndex) in owners">
                            <td>{{ownerIndex.valueOf()+1}}</td>
                            <td v-for="column in columns">
                                {{owners[ownerIndex][column] !== undefined ? owners[ownerIndex][column] : 'NULL'}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </uspense>
</template>

<style>
    .view-container {
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .table-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .up-divider {
        position: absolute;
        height: 50vh;
        width: 100vw;
        background-color: #41B883;
        z-index: -1;
    }
    .table-content {
        width: 70vw;
        height: 60vh;
        box-shadow: 0px 0px 60px 40px rgb(34 60 80 / 20%);
        background-color: white;
        overflow: auto;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
    }
</style>