<template>
    <div class="home-section">
        <div class="top-section">
            <h1>Users CRUD</h1><br/>
            <input type="text" v-model="searchData" class="search-input" placeholder="Enter User Name" />
            <button class="search-btn" @click="searchUser">Search</button>
        </div>
        <div class="bottom-section">
            <table style="width:100%">
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="(user, index) in users" :key="index">
                    <td>
                        <img :src="user.avatar" width="60" height="60" />
                    </td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ dateFormat(user.createdAt) }}</td>
                    <td>
                        <button class="edit-btn" @click="editUser(user)">Edit</button><br/>
                        <button class="delete-btn" @click="deleteUser(user)">Delete</button>
                    </td>
                </tr>
                <tr v-if="users.length < 1">
                    <td colspan="5">
                        No User Found.
                    </td>
                </tr>
            </table>
        </div>

        <div id="usersEditModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <br/><br/><br/>
                <div class="user-form">
                    <form @submit.prevent="updateUser">
                        <div class="form-group">
                            <label>Name*</label><br/>
                            <input type="text" v-model="user.name" required/>
                        </div>

                        <div class="form-group">
                            <label>Email*</label><br/>
                            <input type="text" v-model="user.email" required/>
                        </div>

                        <div class="form-group">
                            <label>Avatar*</label><br/>
                            <input type="text" v-model="user.avatar" required/>
                        </div>

                        <div class="form-group">
                            <label>Crated At*</label><br/>
                            <input type="date" v-model="user.date" required/>
                        </div>
                        <br/>
                        <button type="submit" class="submit-btn">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return  {
                searchData: '',
                debounce: null,
                user: {
                    id: '',
                    name: '',
                    email: '',
                    avatar: '',
                    createdAt: ''
                }
            }
        },

        mounted() {
            // this.$store.dispatch('getUsers');
        },

        computed: {
            users() {
                return this.$store.getters.users;
            }
        },

        methods: {
            searchUser() {
                if(this.searchData) {
                    this.$store.dispatch('searchUserByName', this.searchData);
                } else {
                    alert("Please enter search data");
                }
            },

            editUser(user) {
                let modal = document.getElementById("usersEditModal");
                modal.style.display = "block";
                this.user = user;
                this.user.date = this.dateFormat(user.createdAt);
            },

            updateUser() {
                this.$store.dispatch('updateUser', this.user);
                let modal = document.getElementById("usersEditModal");
                modal.style.display = "none";
            },

            deleteUser(user) {
                if(confirm('Are you sure want to delete this user?')) {
                    this.$store.dispatch('deleteUser', user.id);
                }
            },

            closeModal() {
                let modal = document.getElementById("usersEditModal");
                modal.style.display = "none";
            },

            dateFormat(date) {
                const formatYmd = date => date.toISOString().slice(0, 10);
                return formatYmd(new Date(date));
            }
        }
    }
</script>

<style scoped lang="scss">
    .top-section {
        background-color: #FBC1CE;
        padding: 100px;
        h1 {
            margin: 0px; 
            color: #333333;
        }
        text-align: center;

        .search-input {
            padding: 10px;
            border: 0px;
            border-radius: 3px 0px 0px 3px;
        }

        .search-input:focus {
            border: 0px;
        }

        .search-btn {
            padding: 10px;
            background-color: #353535;
            color: white;
            border: 0px;
            border-radius: 0px 3px 3px 0px;
            cursor: pointer;
        }
    }

    .bottom-section {
        overflow-x: auto; 
        padding:35px 0px;
        width: 60%;
        margin: 0 auto;
        table, th, td {
            border: 1px solid #EAEAEA;
            border-collapse: collapse;
        }
        th, td {
            padding: 15px;
            text-align: center;
        }
        th {
            font-weight: bold;
        }

        .edit-btn {
            background-color: #2F80F2;
            color: white;
            border: 0px;
            cursor: pointer;
            width: 70px;
            padding: 5px;
        }

        .delete-btn {
            margin-top: 5px;
            background-color: #B22124;
            color: white;
            border: 0px;
            cursor: pointer;
            width: 70px;
            padding: 5px;
        }

        table {
            
            h5 {
                text-align: center;
            }
        }
    }

    .modal {
        display: none; 
        position: fixed;
        z-index: 1; 
        padding-top: 100px; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%;
        overflow: auto; 
        background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 40%;
        padding-bottom: 60px;
    }
    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    .user-form {
        padding-top: 50px;
        width: 90%;
        margin: 0 auto;
        border-radius: 10px;
        padding: 20px;
        border: 1px solid #ccc;

        .form-group {
            margin: 10px 0px;
        }

        label {
            
            color: #999;
        }

        input {
            width: 97%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .submit-btn {
            background-color: #2F80F2;
            color: white;
            padding: 10px 15px;
            border: 0px;
            cursor: pointer;
            border-radius: 5px;
        }
    }

    @media only screen and (max-width: 1300px) { 
        .bottom-section {
            width: 80%;
        }
    }

    @media only screen and (max-width: 768px) { 
        .top-section {
            padding: 50px 20px;
         }
        .bottom-section {
            width: 90%;
        }

        .modal-content {
            width: 85%;
        }
    }
</style>