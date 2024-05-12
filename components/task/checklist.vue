<template>
    <div id="ch">
        <ul id="checklist" >
            <div id="header_checkbox">
                <img  v-if="this.checklistIsFinished == true" id="correct" src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png" alt="CheckBox" > <input id="title_checklist" type="text" v-model="this.checklist.title">
                <button class="btn_checklist" @click="AddTask"> Add </button> <button class="btn_checklist" @click="DeleteChecklist(this.checklist.id)"> Delete </button>
            </div>
            <li v v-for="(task) in this.list_tasks" class="li_task">
                <input v-model="task.isFinished" type="checkbox" @change="ChangeCheckbox(task.isFinished, task.id)"> <input type="text" v-model="task.title"> <button class="btn_checklist" @click="DeleteTask(task.id)"> Delete Task </button>
            </li>
        </ul>
    </div>
</template>

<!-- <script setup>

</script> -->

<script>
export default {
    async mounted(){
        await this.GetTaskByChecklistId()
    },
    props: {
        checklist: Object
    },
    data(){
        return {
            list_tasks: [],
            checklistIsFinished: false
        }
    },
    methods: {
        async ChangeCheckbox(Finished, id){
            this.list_tasks.forEach((obj) => {
                let index = null;
                if (obj.id == id){
                    index = this.list_tasks.indexOf(obj)
                    if (Finished === true) {
                        this.list_tasks[index].isFinished =  true
                    } else {
                        this.list_tasks[index].isFinished =  false
                    }
                }})
            const checking = this.AllCheckboxIsChecked()
                if (checking){
                    this.checklistIsFinished = true
                } else {
                    this.checklistIsFinished = false
                }
                await this.ChangeCheckboxAPI(id, this.list_tasks[index].isFinished)
        },
        async ChangeCheckboxAPI(taskid, bool) {
            try {
                const card_upd = await $fetch("/api/task/task", {
                method: "PUT",
                body: {
                    id: taskid,
                    isFinished: bool
                }
                })
            } catch (error){
                console.log(error)
            }
        },
        AllCheckboxIsChecked(){
            var result = true
            for (var obj of this.list_tasks) {
                if (!obj.isFinished) {
                    result = false; 
                    break;
                }
            }
            return result;
        },
        async DeleteChecklist(id) {
            this.$emit('DeleteChecklist', id)
        },
        async GetTaskByChecklistId(){
            try {
                const GetTasks = await $fetch("/api/task/task", {
                    method: "GET",
                    params: {
                        checklistId: this.checklist.id
                    }
                })
                this.list_tasks = GetTasks
            } catch (error) {
                console.log(error)
            }
        },
        async AddTask(){
            this.list_tasks.push({
                task: "",
                isFinished: false,
                checklistId: this.checklist.id,
                id: null
            }
            )
            try {
                const addTask = await $fetch("/api/task/task", {
                    method: "POST",
                    body: {
                        checklistId: this.checklist.id
                    }
                })
                this.list_tasks[this.list_tasks.length - 1].id = addTask.id;
                console.log(this.list_tasks)
                this.GetTaskByChecklistId()
            }catch (error) {
                console.log(error)
            }
        },
        async DeleteTask(taskId){
            console.log(taskId)
            this.list_tasks.forEach((obj) => {
                    if (obj.id == taskId){
                        const index = this.list_tasks.indexOf(obj)
                        const debug = this.list_tasks.splice(index, 1)
                        console.log(this.list_tasks)
                    }})
            try {
                const deleteTask = await $fetch("/api/task/task", {
                    method: "DELETE",
                    body: {
                        id: taskId
                    }
                })
            }catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
#ch {
    height: 20px;
    background-color: white;
}

input[type="text"]{
    width: auto;
    height: 25px;
    text-align: center;
    border-radius: 10px;
    border: none;
    box-shadow: 0 0 10px rgba(0,0,0,0.1); 
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
}

button

#checklist{
    box-shadow: 0 0 10px rgba(0,0,0,0.5); 
    padding: 10px;
    background-color: white;
    border-radius: 10px;
}

.li_task {
    margin: 5px 5px 0;
}

#title_checklist {
    font-weight: bold;
}

.btn_checklist{
    height: 20px;
    font-size: 100%;
    border: 1px solid black;
    border-radius: 10px;
    line-height: 50%;
    padding: 5px;
}

#correct {
    width: 25px;
    height: 25px;
}

#header_checkbox{
    display: flex;
    justify-content: center;
    vertical-align: center;
    align-items: center;
}
</style>