<template>
    <div>
        <h1 class="text-center">CRUD</h1>
    </div>

    <div class="container">
        <!-- Show Add / deleteAll Student Button -->
        <div class="col-lg-12">
            <button
                class="float-end btn btn-info"
                @click="addModalDialog(true)"
            >
                <FIcons :icon="['fas', 'user-plus']" /> Tambah siswa
            </button>
            <button
                class="float-start btn btn-danger"
                v-if="studentsData.length > 0"
                @click="deleteAllModalDialog(true)"
            >
                <FIcons :icon="['fas', 'user-times']" /> Hapus seluruh siswa
            </button>
            <div class="clearfix"></div>
        </div>
        <hr class="bg-info" />

        <!-- Show Error Message-->
        <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
            v-if="errMsg"
        >
            {{ errMsg }}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="close"
            ></button>
        </div>

        <!-- Show Success Message-->
        <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
            v-if="successMsg"
        >
            {{ successMsg }}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="close"
            ></button>
        </div>

        <!-- Show  Student Details : Tables -->
        <table class="table table-border table-striped caption-top">
            <caption>
                Jumlah siswa ({{
                    studentsData.length
                }})
            </caption>
            <thead>
                <tr class="bg-success text-light text-center">
                    <th>NIS</th>
                    <th>NISN</th>
                    <th>Nama</th>
                    <th>Tanggal Lahir</th>
                    <th>Agama</th>
                    <th>Alamat</th>
                    <th><FIcons :icon="['fas', 'cog']" />Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="text-center"
                    v-for="(students, i) in studentsData"
                    :key="i"
                >
                    <td>{{ students.nis }}</td>
                    <td>{{ students.nisn }}</td>
                    <td>{{ students.nama }}</td>
                    <td>{{ students.tanggal_lahir }}</td>
                    <td>{{ students.agama }}</td>
                    <td>{{ students.alamat }}</td>
                    <td>
                        <button
                            class="btn btn-danger"
                            @click="
                                deleteModalDialog(true);
                                selectStudent(students);
                            "
                        >
                            <FIcons :icon="['fas', 'user-times']" />Hapus
                        </button>
                        <button
                            class="btn btn-warning"
                            @click="
                                updateModalDialog(true);
                                selectStudent(students);
                            "
                        >
                            <FIcons :icon="['fas', 'user-edit']" />Update
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Show  Add New Student Modal -->
        <div id="overlay" v-if="showAddModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-info">Tambah siswa</h5>
                        <button
                            arial-hidden="true"
                            @click="addModalDialog(false)"
                        >
                            <FIcons :icon="['fas', 'times']" />
                        </button>
                    </div>
                    <div class="modal-body p-4">
                        <form action="#" method="post" @click.prevent>
                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newStudent.nis.$error,
                                }"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="studentNisFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="newStudent.nis"
                                />
                                <label for="studentNisFloat"> NIS </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newStudent.nis.$error"
                                    >{{
                                        v$.newStudent.nis.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newStudent.nisn.$error,
                                }"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="studentNisnFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="newStudent.nisn"
                                />
                                <label for="studentNisnFloat"> NISN </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newStudent.nisn.$error"
                                    >{{
                                        v$.newStudent.nisn.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newStudent.nama.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentNameFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="newStudent.nama"
                                />
                                <label for="studentNameFloat">
                                    Nama siswa</label
                                >
                                <span
                                    class="error-feedback"
                                    v-if="v$.newStudent.nama.$error"
                                    >{{
                                        v$.newStudent.nama.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newStudent.tanggal_lahir.$error,
                                }"
                            >
                                <input
                                    type="date"
                                    class="form-control"
                                    id="studentTLFloat"
                                    placeholder="2002-10-20"
                                    v-model.trim="newStudent.tanggal_lahir"
                                />
                                <label for="studentTLFloat">
                                    Tanggal Lahir
                                </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newStudent.tanggal_lahir.$error"
                                    >{{
                                        v$.newStudent.tanggal_lahir.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newStudent.agama.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentAgamaFloat"
                                    placeholder="Islam"
                                    v-model.trim="newStudent.agama"
                                />
                                <label for="studentAgamaFloat"> Agama</label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newStudent.agama.$error"
                                    >{{
                                        v$.newStudent.agama.$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-6"
                                :class="{
                                    'form-group-error':
                                        v$.newStudent.alamat.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentAlamatFloat"
                                    placeholder="Pekanbaru"
                                    v-model.trim="newStudent.alamat"
                                />
                                <label for="studentAlamatFloat"> Alamat</label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.newStudent.alamat.$error"
                                    >{{
                                        v$.newStudent.alamat.$errors[0].$message
                                    }}</span
                                >
                            </div>
                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-info"
                                    @click="addNewUser()"
                                >
                                    Tambah siswa</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Show  Edit Student Modal -->
        <div id="overlay" v-if="showUpdateModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-warning">Update Siswa</h5>
                        <button
                            arial-hidden="true"
                            @click="updateModalDialog(false)"
                        >
                            <FIcons :icon="['fas', 'times']" />
                        </button>
                    </div>
                    <div class="modal-body p-4">
                        <form action="#" method="post" @click.prevent>
                            <div
                                class="form-floating mb-3"
                                :class="{
                                    'form-group-error':
                                        v$.currentStudent.nis.$error,
                                }"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="studentNisFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="currentStudent.nis"
                                />
                                <label for="studentNisFloat"> NIS </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentStudent.nis.$error"
                                    >{{
                                        v$.currentStudent.nis.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-3"
                                :class="{
                                    'form-group-error':
                                        v$.currentStudent.nisn.$error,
                                }"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="studentNisnFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="currentStudent.nisn"
                                />
                                <label for="studentNisnFloat"> NISN </label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentStudent.nisn.$error"
                                    >{{
                                        v$.currentStudent.nisn.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-3"
                                :class="{
                                    'form-group-error':
                                        v$.currentStudent.nama.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentNameFloat"
                                    placeholder="Jonh Doe"
                                    v-model.trim="currentStudent.nama"
                                />
                                <label for="studentNameFloat">
                                    Nama siswa</label
                                >
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentStudent.nama.$error"
                                    >{{
                                        v$.currentStudent.nama.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-3"
                                :class="{
                                    'form-group-error':
                                        v$.currentStudent.tanggal_lahir.$error,
                                }"
                            >
                                <input
                                    type="date"
                                    class="form-control"
                                    id="studentTLFloat"
                                    placeholder="2002-10-20"
                                    v-model.trim="currentStudent.tanggal_lahir"
                                />
                                <label for="studentTLFloat">
                                    Tanggal Lahir
                                </label>
                                <span
                                    class="error-feedback"
                                    v-if="
                                        v$.currentStudent.tanggal_lahir.$error
                                    "
                                    >{{
                                        v$.currentStudent.tanggal_lahir
                                            .$errors[0].$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-3"
                                :class="{
                                    'form-group-error':
                                        v$.currentStudent.agama.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentAgamaFloat"
                                    placeholder="Islam"
                                    v-model.trim="currentStudent.agama"
                                />
                                <label for="studentAgamaFloat"> Agama</label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentStudent.agama.$error"
                                    >{{
                                        v$.currentStudent.agama.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <div
                                class="form-floating mb-3"
                                :class="{
                                    'form-group-error':
                                        v$.currentStudent.alamat.$error,
                                }"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="studentAlamatFloat"
                                    placeholder="Pekanbaru"
                                    v-model.trim="currentStudent.alamat"
                                />
                                <label for="studentAlamatFloat"> Alamat</label>
                                <span
                                    class="error-feedback"
                                    v-if="v$.currentStudent.alamat.$error"
                                    >{{
                                        v$.currentStudent.alamat.$errors[0]
                                            .$message
                                    }}</span
                                >
                            </div>

                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-warning"
                                    @click="updateUser()"
                                >
                                    Update data siswa</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Show  Delete Student Modal -->
        <div id="overlay" v-if="showDeleteModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">
                            Hapus data siswa
                        </h5>
                        <button
                            arial-hidden="true"
                            @click="deleteModalDialog(false)"
                        >
                            <FIcons :icon="['fas', 'times']" />
                        </button>
                    </div>
                    <div class="modal-body p-4">
                        <form action="#" method="post" @click.prevent>
                            <h6 class="text-danger">
                                Apakah kamu yakin menghapus data siswa?
                            </h6>

                            <p>
                                <span>NIS : {{ currentStudent.nis }}</span
                                ><br />
                                <span>NISN : {{ currentStudent.nisn }}</span
                                ><br />
                                <span
                                    >Nama siswa :
                                    {{ currentStudent.nama }}</span
                                ><br />
                                <span
                                    >Tanggal lahir :
                                    {{ currentStudent.tanggal_lahir }}</span
                                ><br />
                                <span>Agama : {{ currentStudent.agama }}</span
                                ><br />
                                <span>Alamat : {{ currentStudent.alamat }}</span
                                ><br />
                            </p>
                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-danger"
                                    @click="deleteUsers()"
                                >
                                    Hapus siswa</buttn
                                >
                                <buttn
                                    class="btn btn-success"
                                    @click="deleteModalDialog(false)"
                                >
                                    Tidak, jangan hapus</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Show  Delete All Student Modal -->
        <div id="overlay" v-if="showDeleteAllModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">
                            Hapus seluruh data siswa
                        </h5>
                        <button
                            arial-hidden="true"
                            @click="deleteAllModalDialog(false)"
                        >
                            <FIcons :icon="['fas', 'times']" />
                        </button>
                    </div>
                    <div class="modal-body p-4">
                        <form action="#" method="post" @click.prevent>
                            <h6 class="text-danger">
                                Apakah kamu yakin menghapus seluruh data siswa?
                            </h6>

                            <p>Seluruh data siswa akan hilang permanen</p>
                            <hr class="bg-info" />
                            <div class="d-grid gap-2">
                                <buttn
                                    class="btn btn-danger"
                                    @click="deleteAllUsers()"
                                >
                                    Hapus seluruh data</buttn
                                >
                                <buttn
                                    class="btn btn-success"
                                    @click="deleteAllModalDialog(false)"
                                >
                                    Tidak, jangan hapus</buttn
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import useValidate from "@vuelidate/core";
    import { required, minLength, maxLength } from "@vuelidate/validators";
    export default {
        name: "RegisterUser",
        data() {
            return {
                v$: useValidate(),
                errMsg: "",
                successMsg: "",
                isDBConnected: "",
                isDBConnectedMsg: "",
                studentsData: [],
                showAddModal: false,
                showUpdateModal: false,
                showDeleteModal: false,
                showDeleteAllModal: false,
                newStudent: {
                    nis: "",
                    nisn: "",
                    nama: "",
                    tanggal_lahir: "",
                    agama: "",
                    alamat: "",
                },
                currentStudent: {},
            };
        },

        validations() {
            return {
                newStudent: {
                    nis: {
                        required,
                        minLength: minLength(5),
                        maxLength: maxLength(20),
                    },
                    nisn: {
                        required,
                        minLength: minLength(5),
                        maxLength: maxLength(20),
                    },
                    nama: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(100),
                    },
                    tanggal_lahir: { required, minLength: minLength(8) },
                    agama: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(50),
                    },
                    alamat: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(200),
                    },
                },
                currentStudent: {
                    nis: { required, minLength: minLength(5) },
                    nisn: { required, minLength: minLength(5) },
                    nama: { required, minLength: minLength(3) },
                    tanggal_lahir: { required, minLength: minLength(8) },
                    agama: { required, minLength: minLength(3) },
                    alamat: { required, minLength: minLength(3) },
                },
            };
        },

        mounted() {
            //this.dbConnection();
            this.getStudentsData();
        },

        methods: {
            addModalDialog(val) {
                this.showAddModal = val;
            },
            updateModalDialog(val) {
                this.showUpdateModal = val;
            },
            deleteModalDialog(val) {
                this.showDeleteModal = val;
            },
            deleteAllModalDialog(val) {
                this.showDeleteAllModal = val;
            },

            toFormData(obj) {
                var fd = new FormData();
                for (var i in obj) {
                    fd.append(i, obj[i]);
                }
                return fd;
            },

            clearOldMsgs() {
                this.errMsg = "";
                this.successMsg = "";
            },

            selectStudent(std) {
                this.currentStudent = std;
            },

            async getStudentsData() {
                let res = await axios.get(
                    `https://appmobyes.000webhostapp.com/crud/read.php`
                );
                const restData = res.data;
                console.log(restData);
                if (res.status == 200) {
                    if (restData.error) {
                        this.errMsg = restData.message;
                    } else {
                        this.studentsData = restData.students;
                        this.errMsg = restData.messages;
                    }
                }
            },

            async dbConnection() {
                let res = await axios.get(
                    `https://appmobyes.000webhostapp.com/crud/koneksi.php`
                );
                const restData = res.data;
                console.log(restData);
                this.isDBConnected = restData.is_db_connected;
                this.isDBConnectedMsg = restData.connection_msg;
            },

            async deleteAllUsers() {
                this.deleteAllModalDialog(false);
                this.clearOldMsgs();
                let res = await axios.post(
                    `https://appmobyes.000webhostapp.com/crud/deleteAll.php`
                );
                const restData = res.data;
                if (res.status == 200) {
                    if (restData.error) {
                        this.errMsg = restData.message;
                    } else {
                        this.errMsg = restData.messages;
                        this.successMsg = restData.message;
                        this.studentsData = "";
                    }
                }
            },

            async deleteUsers() {
                var formData = this.toFormData(this.currentStudent);
                this.deleteModalDialog(false);
                this.clearOldMsgs();
                let res = await axios.post(
                    `https://appmobyes.000webhostapp.com/crud/delete.php`,
                    formData
                );
                const restData = res.data;
                if (res.status == 200) {
                    if (restData.error) {
                        this.errMsg = restData.message;
                    } else {
                        let newStudentData = this.studentsData.filter(
                            (ele) => ele.id != this.currentStudent.nis
                        );
                        this.successMsg = restData.message;
                        this.currentStudent = {};
                        this.studentsData = newStudentData;
                        this.getStudentsData();
                    }
                }
            },

            async addNewUser() {
                this.clearOldMsgs();
                this.v$.newStudent.$validate();
                if (!this.v$.newStudent.$error) {
                    this.addModalDialog(false);
                    console.log("validated");
                    let formData = this.toFormData(this.newStudent);
                    let res = await axios.post(
                        `https://appmobyes.000webhostapp.com/crud/create.php`,
                        formData
                    );
                    const restData = res.data;
                    if (res.status == 200) {
                        if (restData.error) {
                            this.errMsg = restData.message;
                        } else {
                            this.newStudent = {
                                nis: "",
                                nisn: "",
                                nama: "",
                                tanggal_lahir: "",
                                agama: "",
                                alamat: "",
                            };
                            this.successMsg = restData.message;
                            this.getStudentsData();
                            this.v$.currentStudent.reset;
                        }
                    }
                } else {
                    console.log("failed");
                }
            },

            async updateUser() {
                this.v$.currentStudent.$validate();
                if (!this.v$.currentStudent.$error) {
                    this.updateModalDialog(false);
                    this.clearOldMsgs();
                    let formData = this.toFormData(this.currentStudent);

                    let res = await axios.post(
                        `https://appmobyes.000webhostapp.com/crud/update.php`,
                        formData
                    );
                    const restData = res.data;

                    if (res.status == 200) {
                        if (restData.error) {
                            alert(restData.message);
                            // this.errMsg =
                            window.location.reload();

                            //this.v$.currentStudent.reset;
                        } else {
                            //this.currentStudent = {};
                            this.successMsg = restData.message;
                            this.getStudentsData();
                            this.v$.currentStudent.reset;
                        }
                    }

                    console.log("updated user");
                } else {
                    console.log("failed to update");
                }
            },
        },
    };
</script>

<style scoped>
    h1 {
        color: white;
        padding: 8px;
        margin-top: 0;
        margin-bottom: 50px;
    }

    #overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgb(0 0 0 / 47%);
    }

    .form-group-error {
        color: red;
    }

    .form-group-error input {
        color: red;
    }
</style>
